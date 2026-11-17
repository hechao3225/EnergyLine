/**
 * 齿轮咬合实验关生成器（G1–G3）。
 *
 * 复用 axis-gen 的「随机生长树 → 分轴组 → 打乱 → 精确求解」流水线，只把组内方向
 * 改成 ±1 交替：点任意一格，组内相邻两格反向转 90°，视觉上就是一对咬合的齿轮。
 *
 * 用法：
 *   npx tsx scripts/gear-gen.ts                 # 生成并写入 src/data/gearLevels.ts
 *   npx tsx scripts/gear-gen.ts --seeds=600     # 调大搜索深度
 *   npx tsx scripts/gear-gen.ts --dry           # 只打印，不写文件
 */
import fs from 'node:fs';
import path from 'node:path';
import type { LevelConfig, Tile } from '../src/types/game';
import { simulateCircuit, rotatePorts } from '../src/utils/circuit';
import { generate, type GenSpec } from './axis-gen';

interface GearSpec extends GenSpec {
  subtitle: string;
  win: string;
  brief: string;
  /** 最优解里至少要有一组转到第几下（0 表示这一关不逼玩家用齿轮） */
  minPhase: number;
}

const SPECS: GearSpec[] = [
  {
    id: 911,
    code: 'G1',
    title: '齿轮 · 一咬一反',
    subtitle: '咬合',
    hint: '带齿轮的两格是一对咬合的齿轮：点一下，一格顺时针、另一格逆时针。它们只能一起对，或者一起错。',
    win: '试验通过：一格顺、一格反，一起归位。',
    brief: '3 灯 · 1 组 2 齿 · 预算只够试一次',
    minPhase: 1,
    cells: 20,
    bulbs: 3,
    groups: [2],
    decoys: 3,
    par: [9, 12],
    tolerance: 2,
    seed: 1,
  },
  {
    id: 912,
    code: 'G2',
    title: '齿轮 · 两组各转各的',
    subtitle: '分工',
    hint: '两条齿轮组不在同一条路上：先把步数分给要转 3 下的那组，另一组只需 1 下。',
    win: '试验通过：两组各转各的，没有互相拖死。',
    brief: '4 灯 · 2 组（3 齿 + 2 齿）· 步数要分配',
    minPhase: 1,
    cells: 24,
    bulbs: 4,
    groups: [3, 2],
    decoys: 3,
    par: [13, 17],
    tolerance: 2,
    seed: 1,
  },
  {
    id: 913,
    code: 'G3',
    title: '齿轮 · 三个格子的一条命',
    subtitle: '承诺',
    hint: '最长的一组要连点三下：中途任何一下都不会亮，点满才通。别在第二下就以为走错了。',
    win: '试验通过：三下点满，齿才咬到位。',
    brief: '4 灯 · 2 组各 3 齿 · 差一步就断',
    minPhase: 2,
    cells: 26,
    bulbs: 4,
    groups: [3, 3],
    decoys: 2,
    par: [17, 23],
    tolerance: 3,
    seed: 1,
  },
];

const CHARS: Record<number, string> = {
  1: '╵', 2: '╶', 3: '└', 4: '╷', 5: '│', 6: '┌', 7: '├',
  8: '╴', 9: '┘', 10: '─', 11: '┴', 12: '┐', 13: '┤', 14: '┬', 15: '┼',
};

function ascii(level: LevelConfig): string {
  const rows: string[] = [];
  for (let r = 0; r < level.gridRows; r++) {
    let line = '';
    for (let c = 0; c < level.gridCols; c++) {
      const t = level.tiles.find((x) => x.row === r && x.col === c);
      if (!t || t.type === 'empty') { line += ' ·'; continue; }
      if (t.type === 'battery') { line += ' S'; continue; }
      if (t.type === 'bulb') { line += ' O'; continue; }
      line += ' ' + (CHARS[rotatePorts(t.basePorts, t.rotation) % 16] ?? '?');
    }
    rows.push(line);
  }
  return rows.join('\n');
}

const argSeeds = Number((process.argv.find((a) => a.startsWith('--seeds=')) ?? '--seeds=400').split('=')[1]);
const dry = process.argv.includes('--dry');

const levels: LevelConfig[] = [];
for (const spec of SPECS) {
  let hit: LevelConfig | null = null;
  let hitPhase = 0;
  let tries = 0;
  let rejected = 0;
  const started = Date.now();
  for (let seed = spec.seed; seed <= spec.seed + argSeeds && !hit; seed++) {
    tries += 1;
    const res = generate({ ...spec, seed, gear: true });
    if (!res) continue;
    const candidate = { ...res.level, subtitle: spec.subtitle, winText: spec.win };
    const init = simulateCircuit(candidate.tiles, candidate.gridRows, candidate.gridCols);
    const gears = candidate.tiles.filter((t: Tile) => t.axis);
    const dirs = new Set(gears.map((t: Tile) => t.axisDir ?? 1));
    const phase = Math.max(0, ...Object.values(res.phases ?? { ax: 0 }).map(Number));
    if (init.litCount !== 0 || dirs.size < 2 || phase < spec.minPhase) {
      rejected += 1;
      continue;
    }
    hit = candidate;
    hitPhase = phase;
  }
  if (!hit) {
    console.log('✗ ' + spec.code + ' 在 ' + tries + ' 个种子里没有找到合格盘面');
    process.exitCode = 1;
    continue;
  }
  // 复核：开局必须 0 灯，齿轮组必须真的有正反两向
  const init = simulateCircuit(hit.tiles, hit.gridRows, hit.gridCols);
  const gears = hit.tiles.filter((t: Tile) => t.axis);
  const dirs = new Set(gears.map((t: Tile) => t.axisDir ?? 1));
  if (init.litCount !== 0 || dirs.size < 2) {
    console.log('✗ ' + spec.code + ' 复核失败：初始点亮 ' + init.litCount + '，方向 ' + [...dirs].join('/'));
    process.exitCode = 1;
    continue;
  }
  levels.push(hit);
  console.log(
    '✓ ' + spec.code + ' ' + spec.title + ' —— par ' + hit.parSteps + ' / 预算 ' + hit.maxSteps +
    '，搜索 ' + tries + ' 个种子（否决 ' + rejected + '），' + ((Date.now() - started) / 1000).toFixed(1) + 's',
  );
  console.log('  ' + spec.brief);
  console.log('  齿轮格：' + gears.map((t: Tile) => '(' + (t.row + 1) + ',' + (t.col + 1) + ')' + (t.axisDir === -1 ? '↺' : '↻')).join(' '));
  console.log('  最优解里最长的一组要转 ' + hitPhase + ' 下');
  console.log(ascii(hit));
}

if (levels.length === SPECS.length && !dry) {
  const target = path.join(process.cwd(), 'src/data/gearLevels.ts');
  const text =
    '/** 由 scripts/gear-gen.ts 生成，勿手改。齿轮咬合实验关 G1–G3（id 911–913）。 */\n' +
    'import type { LevelConfig } from "../types/game";\n\n' +
    'export const GEAR_TEST_LEVELS: LevelConfig[] = ' +
    JSON.stringify(levels, null, 2) +
    ';\n';
  fs.writeFileSync(target, text);
  console.log('\n写入 ' + target + '（' + levels.length + ' 关）');
} else {
  console.log('\n未写文件：' + levels.length + '/' + SPECS.length + (dry ? '（--dry）' : ''));
}
