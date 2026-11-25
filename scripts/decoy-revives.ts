/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 假能源头复活配方（2026-11-22 双源体检）。
 *
 * 体检发现 14 关里 18 个能源头一盏灯都点不亮（纯装饰）。这里用显式补丁把假头接活：
 * - 多数关补 1～5 格“能亮一些、但差一盏”的支路（近失诱饵）；
 * - L30 / L33 补成两个源都能通关，但步数不同（次优双解）；
 * - L52 / L86 / L96 三个源里有两个是死的：复活一个、删掉另一个，保留两个真头；
 * - L59 第二颗头无论怎么接都会把主路 par 打下来，删掉，回到单源取舍关。
 *
 * 每个补丁在生成期强制验收：
 *   1) par 与关卡数据一致（不许把最少步数改便宜）；
 *   2) 开局 0 盏点亮（不许白送）；
 *   3) 每个能源头单独都能至少点亮一盏（不许再出现纯装饰头）。
 * 任何一条不满足，生成器直接报错，不会静默产出一张坏盘。
 */
import type { LevelConfig, Tile, TileType } from '../src/types/game';
import { solveRuleLevel } from '../src/utils/rule-solver';
import { solveMinTaps } from '../src/utils/hint-solver';
import { getDefaultBasePorts, simulateCircuit } from '../src/utils/circuit';

export interface ReviveOp {
  row: number;
  col: number;
  /** 'empty' = 删掉这颗能源头；其余 = 换成可转管件 */
  type: TileType | 'empty';
  rotation?: number;
}

const line = (row: number, col: number, rotation: number): ReviveOp => ({ row, col, type: 'line', rotation });
const corner = (row: number, col: number, rotation: number): ReviveOp => ({ row, col, type: 'corner', rotation });
const remove = (row: number, col: number): ReviveOp => ({ row, col, type: 'empty' });

/** 只列有假头要处理的关卡；键为关卡 id。 */
export const DECOY_REVIVES: Record<number, ReviveOp[]> = {
  // 第 1 章
  5: [line(1, 2, 90), corner(1, 3, 180), line(2, 3, 180), corner(3, 3, 0)],
  10: [line(1, 2, 180), corner(2, 2, 0), corner(2, 3, 270), corner(0, 3, 90), line(0, 4, 90)],
  19: [corner(5, 2, 270), corner(4, 3, 270), line(3, 3, 180)],
  // 第 2 章
  30: [corner(5, 2, 270), corner(4, 2, 180), corner(4, 1, 0)],
  33: [corner(0, 2, 180), line(1, 2, 180), corner(2, 2, 270), corner(2, 1, 90)],
  36: [remove(0, 0)],
  39: [corner(0, 2, 180), corner(1, 2, 0), corner(1, 3, 270)],
  // 第 3 章
  52: [corner(0, 1, 180), line(1, 1, 180), corner(2, 1, 0), corner(2, 3, 270), remove(2, 0)],
  53: [corner(1, 2, 180), corner(2, 2, 0), line(2, 3, 90)],
  59: [remove(4, 0)],
  // 第 4 章
  75: [line(4, 2, 90)],
  // 第 5 章
  86: [corner(5, 2, 270), line(4, 3, 90), remove(2, 0)],
  92: [remove(2, 0)],
  96: [corner(5, 2, 270), corner(4, 2, 90), corner(4, 3, 270), remove(0, 0)],
};

function applyOps(level: LevelConfig, ops: ReviveOp[]): LevelConfig {
  return {
    ...level,
    tiles: level.tiles.map((tile): Tile => {
      const op = ops.find((item) => item.row === tile.row && item.col === tile.col);
      if (!op) return { ...tile };
      if (op.type === 'empty') return { ...tile, type: 'empty', basePorts: 0, rotation: 0, locked: false };
      return {
        ...tile,
        type: op.type,
        basePorts: getDefaultBasePorts(op.type),
        rotation: op.rotation ?? 0,
        locked: false,
      };
    }),
  };
}

/** 只留一个源时，它能点亮几盏（1..bulbCount） */
function soloMaxLit(level: LevelConfig, sourceId: string): number {
  const bulbs = level.tiles.filter((tile) => tile.type === 'bulb').length;
  const solo: LevelConfig = {
    ...level,
    tiles: level.tiles.map((tile): Tile =>
      tile.type === 'battery' && tile.id !== sourceId
        ? { ...tile, type: 'empty', basePorts: 0, locked: false }
        : tile,
    ),
  };
  for (let need = bulbs; need >= 1; need--) {
    try {
      solveMinTaps({ ...solo, goal: need });
      return need;
    } catch {
      /* 这一档接不满，继续往下退 */
    }
  }
  return 0;
}

export function applyDecoyRevives(levels: LevelConfig[]): LevelConfig[] {
  return levels.map((level) => {
    const ops = DECOY_REVIVES[level.id];
    if (!ops) return level;
    const patched = applyOps(level, ops);
    const solution = solveRuleLevel(patched);
    if (!solution) throw new Error(`L${level.id} 诱饵补丁后无解`);
    if (level.parSteps !== undefined && solution.par !== level.parSteps) {
      throw new Error(`L${level.id} 诱饵补丁改变了 par（${level.parSteps} → ${solution.par}）`);
    }
    const initial = simulateCircuit(patched.tiles, patched.gridRows, patched.gridCols, patched.rules);
    if (initial.litCount > 0) throw new Error(`L${level.id} 诱饵补丁让开局点亮了 ${initial.litCount} 盏`);
    for (const source of patched.tiles.filter((tile) => tile.type === 'battery')) {
      if (soloMaxLit(patched, source.id) < 1) {
        throw new Error(`L${level.id} 诱饵补丁后 ${source.id} 仍是纯装饰头（一盏都点不亮）`);
      }
    }
    return patched;
  });
}
