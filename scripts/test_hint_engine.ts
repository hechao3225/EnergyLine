/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 提示引擎回归：给出的「下一步」必须落在最优解上。
 * 判据——照提示走一步后重新求解，最少步数应当正好少 1。
 * 如果提示把玩家带偏，这关的零容错预算会直接判死，所以这条必须守住。
 */

import assert from "node:assert/strict";
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import {
  applyHintAction,
  findHint,
  findHintSequence,
  describeHint,
  supportsHintEngine,
} from '../src/utils/hint-engine';
import { LAB_LEVELS } from '../src/data/labLevels';
import type { HintMove } from '../src/utils/hint-engine';
import { solveRuleLevel } from '../src/utils/rule-solver';
import type { LevelConfig, Tile } from '../src/types/game';

function expectOptimalStep(level: LevelConfig, tiles: Tile[], where: string) {
  const before = solveRuleLevel({ ...level, tiles })?.par;
  if (before === undefined) throw new Error(`${where} 没有规则解`);
  const move = findHint(level, tiles, level.maxSteps);
  if (!move) throw new Error(`${where} 没有给出提示`);
  if (move.stepsNeeded !== before) {
    throw new Error(`${where} 提示的剩余步数 ${move.stepsNeeded} 与最优解 ${before} 不一致`);
  }
  const after = solveRuleLevel({
    ...level,
    tiles: applyHintAction(level, tiles, move),
  })?.par;
  if (after !== before - 1) {
    throw new Error(`${where} 提示的那一步不在最优解上（${before} → ${after}）：${describeHint(move)}`);
  }
  return move;
}

function expectOptimalHintSequence(
  level: LevelConfig,
  tiles: Tile[],
  remainingSteps: number,
  count: number,
  where: string,
) {
  const sequence = findHintSequence(level, tiles, remainingSteps, count);
  assert.ok(sequence.length <= count, `${where} 返回了 ${sequence.length} 步，超过请求的 ${count} 步`);
  assert.ok(
    sequence.length <= remainingSteps,
    `${where} 返回了 ${sequence.length} 步，超过剩余预算 ${remainingSteps}`,
  );

  let currentTiles = tiles;
  let expectedPar = solveRuleLevel({ ...level, tiles: currentTiles })?.par;
  assert.notEqual(expectedPar, undefined, `${where} 没有规则解`);
  for (const [index, move] of sequence.entries()) {
    assert.equal(
      move.stepsNeeded,
      expectedPar,
      `${where} 第 ${index + 1} 步提示的剩余步数 ${move.stepsNeeded} 与最优解 ${expectedPar} 不一致`,
    );
    currentTiles = applyHintAction(level, currentTiles, move);
    const nextPar = solveRuleLevel({ ...level, tiles: currentTiles })?.par;
    assert.equal(
      nextPar,
      expectedPar! - 1,
      `${where} 第 ${index + 1} 步不在最优解上（${expectedPar} → ${nextPar}）`,
    );
    expectedPar = nextPar;
  }
  return sequence;
}

console.log('=== 1. 全部 99 关：提示都落在最优解上 ===');
let engineLevels = 0;
for (const level of DEFAULT_LEVELS) {
  if (!supportsHintEngine(level)) continue;
  expectOptimalStep(level, level.tiles, `L${level.id}`);
  engineLevels++;
}
console.log(`[PASS] ${engineLevels} 关逐步验证通过`);

console.log('=== 2. 乱盘：玩家偏离最优解后，提示仍然对应当前盘面 ===');
const scrambles: [number, number][] = [[5, 1], [10, 2], [30, 3]];
for (const [id, seed] of scrambles) {
  const level = DEFAULT_LEVELS.find((item) => item.id === id)!;
  let state = seed;
  const tiles = level.tiles.map((tile) => {
    if (tile.locked || tile.type === 'empty' || tile.type === 'cross' || tile.type === 'switch') return tile;
    state = (state * 1103515245 + 12345) % 2147483648;
    return { ...tile, rotation: tile.rotation + 90 * (state % 4) };
  });
  expectOptimalStep(level, tiles, `L${id}(乱盘)`);
  console.log(`[PASS] L${id} 乱盘后提示仍是最优下一步`);
}

console.log('=== 3. 剩余步数不够时如实告知 ===');
const tight = DEFAULT_LEVELS.find((item) => item.id === 5)!;
const shortMove = findHint(tight, tight.tiles, 0);
if (!shortMove || shortMove.reachable) throw new Error('剩余 0 步时不应判定为可达');
console.log(`[PASS] 剩余 0 步：提示说明还差 ${shortMove.stepsNeeded} 步，且不判定可达`);

console.log('=== 4. 规则关与联动轴进入提示引擎 ===');
const axisLevel = LAB_LEVELS.find((level) => level.tiles.some((tile) => tile.axis));
if (!axisLevel || !supportsHintEngine(axisLevel)) throw new Error('联动轴关卡应支持提示引擎');
const ruleLevel = LAB_LEVELS.find((level) => level.rules);
if (!ruleLevel || !supportsHintEngine(ruleLevel)) throw new Error('规则关卡应支持提示引擎');
if (!supportsHintEngine(DEFAULT_LEVELS[0])) throw new Error('主线关卡应当支持提示引擎');
expectOptimalStep(axisLevel, axisLevel.tiles, axisLevel.code);
expectOptimalStep(ruleLevel, ruleLevel.tiles, ruleLevel.code);
console.log('[PASS] 联动轴与规则关都能给出可执行最优提示');

console.log('=== 5. 连续提示按真实盘面连找最多三步 ===');
const sequenceLevels = [
  DEFAULT_LEVELS.find((level) => level.id === 1)!,
  DEFAULT_LEVELS.find((level) => level.primaryMechanic === 'switch')!,
  DEFAULT_LEVELS.find((level) => level.primaryMechanic === 'gear')!,
];
for (const level of sequenceLevels) {
  assert.ok(level, '连续提示所需默认主线关不存在');
  const sequence = expectOptimalHintSequence(
    level,
    level.tiles,
    level.maxSteps,
    3,
    `L${level.id}(${level.primaryMechanic})`,
  );
  assert.ok(sequence.length >= 1 && sequence.length <= 3, `L${level.id} 应返回 1 到 3 步`);
  console.log(`[PASS] L${level.id} 连续返回 ${sequence.length} 步，逐步保持最优`);
}

console.log('=== 6. 连续提示遵守剩余步数预算 ===');
assert.deepEqual(findHintSequence(tight, tight.tiles, 0, 3), []);
const twoStepBudget = expectOptimalHintSequence(tight, tight.tiles, 2, 3, 'L5(剩余 2 步)');
assert.ok(twoStepBudget.length <= 2, '只剩 2 步时不应返回第 3 步');
console.log('[PASS] 剩余 0 步返回空数组，剩余 2 步时返回不超过 2 步');

console.log('=== 提示引擎测试通过 ===');
