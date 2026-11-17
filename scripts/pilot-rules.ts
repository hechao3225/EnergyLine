/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 新机制小批量试点：只给 L73 加双色、L86 加禁环，其余 97 关不动。
 * 不换布局、不改 par/预算（只加规则/颜色字段），验证最优解在新规则下仍然成立。
 *
 * 用法：npx tsx scripts/pilot-rules.ts [--write]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { applyPlan, solveMinTaps } from '../src/utils/hint-solver';
import type { LevelConfig } from '../src/types/game';

const COLOR_LEVEL = 73;
const NO_CYCLE_LEVEL = 86;

function setColors(level: LevelConfig) {
  const batteries = level.tiles.filter((t) => t.type === 'battery');
  const bulbs = level.tiles.filter((t) => t.type === 'bulb');
  if (batteries.length !== 2 || bulbs.length !== 4) throw new Error('L73 期望 2 源 4 灯，实际 ' + batteries.length + '/' + bulbs.length);
  const bcolors = [0, 1];
  const ncolors = [0, 0, 1, 1];
  level.rules = { colors: 2 };
  level.tiles = level.tiles.map((tile) => {
    const bi = batteries.findIndex((b) => b.id === tile.id);
    if (bi >= 0) return { ...tile, color: bcolors[bi] };
    const ni = bulbs.findIndex((b) => b.id === tile.id);
    if (ni >= 0) return { ...tile, color: ncolors[ni] };
    return tile;
  });
}

function verify(level: LevelConfig) {
  const res = solveMinTaps(level);
  if (res.par !== level.parSteps) throw new Error('L' + level.id + ' par ' + res.par + ' != ' + level.parSteps);
  const applied = applyPlan(level, res.plan);
  const sim = simulateCircuit(applied.tiles, level.gridRows, level.gridCols, level.rules);
  const total = level.goal ?? sim.totalBulbs;
  if (sim.litCount < total) throw new Error('L' + level.id + ' 解在新规则下只亮 ' + sim.litCount + '/' + total);
  if (sim.overloaded) throw new Error('L' + level.id + ' 最优解在禁环规则下过载');
  const initial = simulateCircuit(level.tiles, level.gridRows, level.gridCols, level.rules);
  if (initial.litCount >= total) throw new Error('L' + level.id + ' 开局已通关');
  return { res, applied, sim, total, initial };
}

function teeth(level: LevelConfig, solvedTiles: any[], solvedLit: number) {
  const movable = level.tiles.filter((t) => !t.locked && t.type !== 'empty' && rotatePorts(getDefaultBasePorts(t.type), 90) !== getDefaultBasePorts(t.type));
  let overload = 0;
  let breakLit = 0;
  for (const tile of movable) {
    for (let k = 1; k <= 3; k++) {
      const next = solvedTiles.map((t: any) => (t.id === tile.id ? { ...t, rotation: t.rotation + 90 * k } : t));
      const sim = simulateCircuit(next, level.gridRows, level.gridCols, level.rules);
      if (sim.overloaded) overload++;
      if (sim.litCount < solvedLit) breakLit++;
    }
  }
  return { movable: movable.length, overload, breakLit };
}

for (const level of DEFAULT_LEVELS) {
  if (level.id !== COLOR_LEVEL && level.id !== NO_CYCLE_LEVEL) continue;
  if (level.id === COLOR_LEVEL) setColors(level);
  else level.rules = { noCycle: true };
  const v = verify(level);
  const t = teeth(level, v.applied.tiles, v.sim.litCount);
  console.log('L' + level.id + ' par ' + level.parSteps + '/' + level.maxSteps + '  解亮 ' + v.sim.litCount + '/' + v.total + '  开局 ' + v.initial.litCount + '  可转 ' + t.movable + '  过载齿 ' + t.overload + '  断灯齿 ' + t.breakLit + '  rules ' + JSON.stringify(level.rules));
}

if (process.argv.includes('--write')) {
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= [');
  const end = text.lastIndexOf('];');
  if (i < 0 || end < 0) throw new Error('array markers not found');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written ' + path);
} else {
  console.log('dry run (add --write)');
}