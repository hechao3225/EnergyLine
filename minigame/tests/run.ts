/**
 * 逻辑层回归测试（M1 验收）。
 * 覆盖：99 关数据完整性、求解器算法（旋转/水闸/二极管）、评分、成就、进度持久化、花谱。
 */
import { setPlatform, resetPlatform } from '../src/adapter/platform';
import { MemoryPlatform } from './mock';
import { DEFAULT_LEVELS } from '../src/logic/data/defaultLevels';
import {
  simulateCircuit,
  rotatePorts,
  getDefaultBasePorts,
  generateEndlessLevel,
} from '../src/logic/circuit';
import { computeActiveWaterPaths } from '../src/logic/flowPaths';
import { getStarsForSteps, getStarThresholds, getParSteps } from '../src/logic/rating';
import { getFlowerForLevel, getAllFlowers } from '../src/logic/flowers';
import {
  loadUnlockedAchievements,
  checkVictoryAchievements,
  loadPlayerStats,
} from '../src/logic/achievements';
import { loadProgress, saveProgress, PROGRESS_VERSION } from '../src/logic/progress';
import { Direction, Tile, TileType } from '../src/types/game';

let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(cond: boolean, label: string): void {
  if (cond) {
    passed++;
  } else {
    failed++;
    failures.push(label);
    console.error(`  ✗ FAIL: ${label}`);
  }
}

function eq(actual: unknown, expected: unknown, label: string): void {
  assert(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${label} (actual=${JSON.stringify(actual)}, expected=${JSON.stringify(expected)})`
  );
}

function freshStorage(): void {
  setPlatform(new MemoryPlatform());
}

function makeTile(id: string, row: number, col: number, type: TileType, rotation = 0, extra: Partial<Tile> = {}): Tile {
  return {
    id,
    row,
    col,
    type,
    rotation,
    basePorts: getDefaultBasePorts(type),
    ...extra,
  };
}

// ============================================================
console.log('== T1: 99 关数据完整性 ==');
freshStorage();

assert(DEFAULT_LEVELS.length === 99, '关卡总数为 99');
eq(DEFAULT_LEVELS.map((l) => l.id), Array.from({ length: 99 }, (_, i) => i + 1), '关卡 id 为 1..99 连续');

const VALID_TYPES: TileType[] = ['empty', 'battery', 'bulb', 'line', 'corner', 't_shape', 'cross', 'switch', 'diode'];
let parCount = 0;
for (const level of DEFAULT_LEVELS) {
  const label = `第${level.id}关`;
  assert(level.gridRows > 0 && level.gridCols > 0, `${label} 网格尺寸`);
  assert(level.maxSteps >= 1, `${label} maxSteps`);
  assert(level.hintText.length > 0 && level.winText.length > 0, `${label} 文案`);
  assert(typeof level.title === 'string' && level.title.length > 0, `${label} 标题`);
  if (level.parSteps !== undefined) parCount++;

  const ids = new Set<string>();
  let batteries = 0;
  let bulbs = 0;
  for (const t of level.tiles) {
    const tl = `${label} tile ${t.id}`;
    assert(!ids.has(t.id), `${tl} id 唯一`);
    ids.add(t.id);
    assert(VALID_TYPES.includes(t.type), `${tl} 类型合法 (${t.type})`);
    assert(t.row >= 0 && t.row < level.gridRows, `${tl} 行界内`);
    assert(t.col >= 0 && t.col < level.gridCols, `${tl} 列界内`);
    assert(Number.isFinite(t.rotation) && t.rotation % 90 === 0 && t.rotation >= 0, `${tl} 旋转量合法`);
    if (t.type === 'battery') { batteries++; assert(t.locked === true, `${tl} 电池锁定`); }
    if (t.type === 'bulb') { bulbs++; assert(t.locked === true, `${tl} 花苞锁定`); }
  }
  assert(batteries >= 1, `${label} 至少 1 个灵泉`);
  assert(bulbs >= 1, `${label} 至少 1 个花苞`);

  // 求解器在初始乱序状态可运行且自洽
  const sim = simulateCircuit(level.tiles, level.gridRows, level.gridCols);
  assert(sim.litCount <= sim.totalBulbs, `${label} 点亮数 ≤ 总数`);
  assert(sim.poweredTileIds.size <= level.tiles.length, `${label} 通电瓦片数界内`);
}
console.log(`  （${parCount}/99 关带有 parSteps 字段）`);

// 水闸与二极管只在预期章节出现（第 2/3 卷起）
assert(
  DEFAULT_LEVELS.filter((l) => l.tiles.some((t) => t.type === 'switch')).every((l) => l.id >= 20),
  '水闸只出现在第 21 关以后'
);
assert(
  DEFAULT_LEVELS.filter((l) => l.tiles.some((t) => t.type === 'diode')).every((l) => l.id >= 40),
  '二极管只出现在第 41 关以后'
);

// ============================================================
console.log('== T2: 端口旋转算法 ==');
freshStorage();

const D = Direction;
eq(rotatePorts(D.LEFT | D.RIGHT, 0), D.LEFT | D.RIGHT, '直线 0°');
eq(rotatePorts(D.LEFT | D.RIGHT, 90), D.UP | D.DOWN, '直线 90°');
eq(rotatePorts(D.LEFT | D.RIGHT, 180), D.LEFT | D.RIGHT, '直线 180° 回原');
eq(rotatePorts(D.LEFT | D.RIGHT, 450), D.UP | D.DOWN, '直线 450°(=90°)');
eq(rotatePorts(D.DOWN | D.RIGHT, 90), D.LEFT | D.DOWN, '弯管 90°');
eq(rotatePorts(D.DOWN | D.RIGHT, 180), D.LEFT | D.UP, '弯管 180°');
eq(rotatePorts(D.DOWN | D.RIGHT, 270), D.RIGHT | D.UP, '弯管 270°');
const CROSS = D.UP | D.RIGHT | D.DOWN | D.LEFT;
eq(rotatePorts(CROSS, 90), CROSS, '十字旋转不变');
eq(rotatePorts(D.NONE, 135), D.NONE, '空格任意旋转不变');

// ============================================================
console.log('== T3: 求解器核心场景 ==');
freshStorage();

// 直通：电池 → 直管 → 花苞
{
  const tiles = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('l', 0, 1, 'line', 0),
    makeTile('x', 0, 2, 'bulb', 0, { locked: true }),
  ];
  const sim = simulateCircuit(tiles, 1, 3);
  assert(sim.isAllLit, '直通场景全亮');
  eq(sim.litCount, 1, '直通点亮 1 花');
}

// 直管转 90° 断路
{
  const tiles = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('l', 0, 1, 'line', 90),
    makeTile('x', 0, 2, 'bulb', 0, { locked: true }),
  ];
  const sim = simulateCircuit(tiles, 1, 3);
  assert(!sim.isAllLit, '直管 90° 断路');
}

// 水闸：断开 → 不亮；闭合 → 亮
{
  const closed = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('s', 0, 1, 'switch', 0, { switchClosed: true }),
    makeTile('x', 0, 2, 'bulb', 0, { locked: true }),
  ];
  const simC = simulateCircuit(closed, 1, 3);
  assert(simC.isAllLit, '水闸闭合导通');

  const open = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('s', 0, 1, 'switch', 0, { switchClosed: false }),
    makeTile('x', 0, 2, 'bulb', 0, { locked: true }),
  ];
  const simO = simulateCircuit(open, 1, 3);
  assert(!simO.isAllLit, '水闸断开阻断');
}

// 二极管：左→右 导通；右→左 阻断
{
  const forward = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('d', 0, 1, 'diode', 0),
    makeTile('x', 0, 2, 'bulb', 0, { locked: true }),
  ];
  assert(simulateCircuit(forward, 1, 3).isAllLit, '二极管正向导通');

  // 电池转向左（rot 180），从右向左流，被二极管阻断
  const backward = [
    makeTile('x', 0, 0, 'bulb', 0, { locked: true }),
    makeTile('d', 0, 1, 'diode', 0),
    makeTile('b', 0, 2, 'battery', 180, { locked: true }),
  ];
  const simB = simulateCircuit(backward, 1, 3);
  assert(!simB.isAllLit, '二极管反向阻断');
}

// 花苞不继续导电（末端）
{
  const tiles = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('x', 0, 1, 'bulb', 0, { locked: true }),
    makeTile('l', 0, 2, 'line', 0),
    makeTile('x2', 0, 3, 'bulb', 0, { locked: true }),
  ];
  const sim = simulateCircuit(tiles, 1, 4);
  assert(!sim.isAllLit, '花苞不串联导电');
  eq(sim.litCount, 1, '仅第一朵花亮');
}

// flowPaths：段生成
{
  const tiles = [
    makeTile('b', 0, 0, 'battery', 0, { locked: true }),
    makeTile('l', 0, 1, 'line', 0),
    makeTile('x', 0, 2, 'bulb', 0, { locked: true }),
  ];
  const sim = simulateCircuit(tiles, 1, 3);
  const flow = computeActiveWaterPaths(tiles, 1, 3, sim.poweredTileIds);
  eq(flow.segments.length, 2, '活水路径段数');
  eq(flow.sourceTiles.length, 1, '灵泉数');
  eq(flow.bulbTiles.length, 1, '花苞数');
}

// ============================================================
console.log('== T4: 评分模型 ==');
freshStorage();

{
  const level = { maxSteps: 15, parSteps: 8 };
  const t = getStarThresholds(level);
  assert(t.par === 8 && t.four === 8, 'par/four');
  assert(t.three > t.four && t.two > t.three, '阈值单调递增');
  eq(getStarsForSteps(8, level), 4, '8 步 4 星');
  eq(getStarsForSteps(9, level), 3, '9 步 3 星');
  eq(getStarsForSteps(t.two, level), 2, 'two 步 2 星');
  eq(getStarsForSteps(15, level), 1, '预算上限 1 星');
}
{
  const level = { maxSteps: 10 }; // 无 parSteps，回退 50%
  eq(getParSteps(level), 5, '无 par 回退 5');
}

// ============================================================
console.log('== T5: 成就系统 ==');
freshStorage();

{
  const r = checkVictoryAchievements({
    levelId: 1,
    stepsUsed: 6,
    remainingSteps: 9,
    maxSteps: 15,
    parSteps: 8,
    levelUndosUsed: 0,
    hasUsedTimelineJump: false,
    hasToggledSwitch: false,
  });
  const ids = r.newlyUnlocked.map((a) => a.id);
  assert(ids.includes('first_spark'), '首关通关解锁 first_spark');
  assert(ids.includes('ten_steps_clear'), '6 步解锁 ten_steps_clear');
  assert(ids.includes('speed_optimizer'), '≤par 4 星解锁 speed_optimizer');
  const stats = loadPlayerStats();
  eq(stats.clearedLevelIds, [1], '统计：通关第 1 关');
  eq(stats.threeStarLevelIds, [1], '统计：三星名单');

  const unlocked = loadUnlockedAchievements();
  assert(Boolean(unlocked['first_spark']), '成就持久化');
}

// ============================================================
console.log('== T6: 进度持久化与防作弊清洗 ==');
freshStorage();

{
  saveProgress([1, 2, 3], { 1: 5, 2: 7, 3: 9 });
  const p = loadProgress();
  eq(p.cleared, [1, 2, 3], '通关链保存读取');
  eq(p.best[2], 7, '最佳步数读取');
}
{
  // 非连续链 [1,3] → 只保留 [1]（写入当前版本标记，避开迁移清洗，专测截断逻辑）
  const platform = new MemoryPlatform();
  setPlatform(platform);
  platform.setStorage('honeycomb_progress_version', PROGRESS_VERSION);
  platform.setStorage('honeycomb_cleared_levels', JSON.stringify([1, 3]));
  // 步数必须 ≥ 该关 parSteps，否则会被「低于最少步数即不可信」的清洗丢掉
  const par1 = DEFAULT_LEVELS[0].parSteps!;
  const par3 = DEFAULT_LEVELS[2].parSteps!;
  platform.setStorage('honeycomb_best_steps', JSON.stringify({ 1: par1, 3: par3 }));
  const p = loadProgress();
  eq(p.cleared, [1], '非连续链被截断');
  assert(p.best[3] === undefined, '截断后的 best 被过滤');
}
{
  // 假 0 步记录被丢弃
  const platform = new MemoryPlatform();
  setPlatform(platform);
  platform.setStorage('honeycomb_cleared_levels', JSON.stringify([1]));
  platform.setStorage('honeycomb_best_steps', JSON.stringify({ 1: 0 }));
  const p = loadProgress();
  assert(p.best[1] === undefined, '0 步假记录丢弃');
  // 仅有第 1 关通关却无有效步数 → 遗留调试种子也被清
  eq(p.cleared, [], '调试种子被清理');
}

// ============================================================
console.log('== T7: 花谱数据 ==');
freshStorage();

{
  const all = getAllFlowers();
  eq(all.length, 99, '99 朵仙花');
  assert(getFlowerForLevel(99).name.includes('金莲'), '第 99 关永恒金莲');
  assert(getFlowerForLevel(1).name === '灵露初蕾', '第 1 关灵露初蕾');
  eq(getFlowerForLevel(21).chapter, 2, '第 21 关属于第二卷');
  eq(getFlowerForLevel(99).chapter, 5, '第 99 关属于第五卷');
}

// ============================================================
console.log('== T8: 无尽模式生成器 ==');
freshStorage();

for (let i = 1; i <= 3; i++) {
  const lvl = generateEndlessLevel(i);
  assert(lvl.tiles.length === 36, `无尽#${i} 36 瓦片`);
  assert(lvl.maxSteps >= 35, `无尽#${i} 步数预算`);
  assert(lvl.tiles.some((t) => t.type === 'battery'), `无尽#${i} 有灵泉`);
  const bulbCount = lvl.tiles.filter((t) => t.type === 'bulb').length;
  assert(bulbCount >= 2, `无尽#${i} 至少 2 花`);
  // 初始乱序状态不应已通关（瓦片全部被随机旋转过）
  const sim = simulateCircuit(lvl.tiles, 6, 6);
  assert(!sim.isAllLit, `无尽#${i} 初始未通关`);
}

// ============================================================
resetPlatform();
console.log('');
console.log('──────────────────────────────');
console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
if (failures.length > 0) {
  console.log('失败项:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
} else {
  console.log('ALL GREEN ✓');
}
