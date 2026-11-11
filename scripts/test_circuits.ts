/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 电路引擎与关卡数据回归测试。
 *
 * 说明：本文件只做两类检查
 *   1) 关卡数据的一致性（每关有泉眼/仙花、初始未通关、预算 ≥ 1.3×par）
 *   2) 电路引擎的机制（水闸开闭、水闸可旋转、单向灵梭的顺逆流）
 *
 * 机制用例使用**内联小棋盘**，不再依赖某一关的瓦片坐标——99 关的布局会随
 * 难度重新生成而改变，硬编码坐标的测试会无缘无故失败。每一关的可解性由
 * `scripts/generate-99-levels.ts` 在生成时用「顺时针回放」逐关验证（失败即抛错），
 * 这里不重复实现求解器。
 */

import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { getDefaultBasePorts, simulateCircuit } from '../src/utils/circuit';
import { Tile, TileType } from '../src/types/game';

function tile(row: number, col: number, type: TileType, rotation = 0, extra: Partial<Tile> = {}): Tile {
  return {
    id: `t-${row}-${col}`,
    row,
    col,
    type,
    rotation,
    basePorts: getDefaultBasePorts(type),
    ...extra,
  };
}

function replaceType(tiles: Tile[], type: TileType, patch: Partial<Tile>): Tile[] {
  return tiles.map((t) => (t.type === type ? { ...t, ...patch } : t));
}

console.log('=== 1. 验证 99 关数据完整性 ===');
let totalTiles = 0;
for (const lvl of DEFAULT_LEVELS) {
  const bats = lvl.tiles.filter((t) => t.type === 'battery');
  const bulbs = lvl.tiles.filter((t) => t.type === 'bulb');
  if (bats.length === 0) throw new Error(`关卡 #${lvl.id} 缺少泉眼源头`);
  if (bulbs.length === 0) throw new Error(`关卡 #${lvl.id} 缺少仙花终点`);
  if (!lvl.parSteps || lvl.parSteps <= 0) throw new Error(`关卡 #${lvl.id} 缺少 par（最少步数）`);
  const minBudget = Math.ceil(lvl.parSteps * 1.3);
  if (lvl.maxSteps < minBudget) {
    throw new Error(`关卡 #${lvl.id} 预算 ${lvl.maxSteps} 小于 1.3×par（${lvl.parSteps} → 至少 ${minBudget}）`);
  }
  const sim = simulateCircuit(lvl.tiles, lvl.gridRows, lvl.gridCols);
  if (sim.isAllLit) throw new Error(`关卡 #${lvl.id} 初始状态就已通关，必须打乱`);
  totalTiles += lvl.tiles.length;
}
console.log(
  `[PASS] 99 重关卡结构完整，包含 ${totalTiles} 枚水渠瓦片，全部包含合法泉眼与仙花，par 与预算匹配。`
);

console.log('=== 2. 验证 第 1 关“单线启明”旋转导通与胜利逻辑 ===');
const lvl1 = DEFAULT_LEVELS[0];
let sim1 = simulateCircuit(lvl1.tiles, lvl1.gridRows, lvl1.gridCols);
console.log(`[PASS] 初始打乱态：点亮花朵数 = ${sim1.litBulbIds.size} / ${sim1.totalBulbs}，通关状态 = ${sim1.isAllLit}`);

// 教学关的坐标是手工固定的，可以安全硬编码
const tiles1_solved = lvl1.tiles.map((t) => {
  if (t.row === 2 && t.col === 2) return { ...t, rotation: 0 };
  if (t.row === 2 && t.col === 3) return { ...t, rotation: 90 };
  if (t.row === 3 && t.col === 3) return { ...t, rotation: 90 };
  if (t.row === 4 && t.col === 3) return { ...t, rotation: 270 };
  return t;
});
sim1 = simulateCircuit(tiles1_solved, lvl1.gridRows, lvl1.gridCols);
console.log(`[PASS] 正确对齐水脉后：点亮花朵数 = ${sim1.litBulbIds.size} / ${sim1.totalBulbs}，通关状态 = ${sim1.isAllLit}`);
if (!sim1.isAllLit) throw new Error('第 1 关导通后应判定胜利！');

console.log('=== 3. 验证灵玉水闸：可旋转 + 需开启才通水 ===');
// 泉眼 ─ 水闸 ─ 仙花
const switchRow: Tile[] = [
  tile(0, 0, 'battery', 0, { locked: true }),
  tile(0, 1, 'switch', 0, { switchClosed: false }),
  tile(0, 2, 'bulb', 0, { locked: true }),
];
const swClosed = simulateCircuit(switchRow, 1, 3);
const swOpened = simulateCircuit(replaceType(switchRow, 'switch', { switchClosed: true }), 1, 3);
const swRotated = simulateCircuit(replaceType(switchRow, 'switch', { rotation: 90, switchClosed: true }), 1, 3);

console.log(
  `[PASS] 水闸闭合点亮 = ${swClosed.litCount}，开启后点亮 = ${swOpened.litCount}，` +
    `旋转成竖向后点亮 = ${swRotated.litCount}`
);
if (swClosed.litCount !== 0) throw new Error('水闸闭合时不应通水！');
if (swOpened.litCount !== 1) throw new Error('水闸开启后应通水点亮仙花！');
if (swRotated.litCount !== 0) throw new Error('水闸旋转成竖向后应与横向水渠断开！');
// 转回水平仍然导通（证明水闸可以被玩家自由旋转，不会形成死局）
const swRotatedBack = simulateCircuit(
  replaceType(switchRow, 'switch', { rotation: 360, switchClosed: true }),
  1,
  3
);
if (swRotatedBack.litCount !== 1) throw new Error('水闸转回水平后应恢复导通！');

console.log('=== 4. 验证单向灵梭的顺逆流机制 ===');
const diodeRow: Tile[] = [
  tile(0, 0, 'battery', 0, { locked: true }),
  tile(0, 1, 'diode', 0),
  tile(0, 2, 'bulb', 0, { locked: true }),
];
const diForward = simulateCircuit(diodeRow, 1, 3);
const diReverse = simulateCircuit(replaceType(diodeRow, 'diode', { rotation: 180 }), 1, 3);
console.log(
  `[PASS] 单向顺流点亮 = ${diForward.litCount}，逆向阻水点亮 = ${diReverse.litCount}`
);
if (diForward.litCount !== 1) throw new Error('灵梭顺流应通水点亮！');
if (diReverse.litCount !== 0) throw new Error('灵梭逆向应阻断水流！');

console.log('=== 5. 验证“水闸 + 三通分流”多花同时点亮 ===');
// 泉眼 ─ 水闸 ─ 三通 ─┬─ 上花
//                     ├─ 下花
//                     └─ 右花
const branchBoard: Tile[] = [
  tile(1, 0, 'battery', 0, { locked: true }),
  tile(1, 1, 'switch', 0, { switchClosed: false }),
  tile(1, 2, 'cross', 0),
  tile(0, 2, 'bulb', 0, { locked: true }),
  tile(2, 2, 'bulb', 0, { locked: true }),
  tile(1, 3, 'bulb', 0, { locked: true }),
];

const branchOpen = simulateCircuit(replaceType(branchBoard, 'switch', { switchClosed: true }), 3, 4);
const branchClosed = simulateCircuit(branchBoard, 3, 4);
console.log(
  `[PASS] 三花棋盘：水闸开启点亮 ${branchOpen.litCount}/${branchOpen.totalBulbs}，闭合点亮 ${branchClosed.litCount}/${branchClosed.totalBulbs}`
);
if (!branchOpen.isAllLit) throw new Error('水闸开启后三朵花应全部点亮！');
if (branchClosed.litCount !== 0) throw new Error('水闸闭合时不应点亮任何花朵！');

console.log('=== 全部测试通过 (5/5 PASS) ===');
