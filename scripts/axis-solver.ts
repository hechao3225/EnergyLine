/**
 * 带联动轴的精确求解：枚举每组轴各自的相位（4^g），把该组格子按相位旋转后临时锁死，
 * 交给现成的 solveMinTaps 求其余格子的最少点击；总代价 = 各组相位之和 + 解。
 * 注意：每组相位互相独立——所有组一起转是错的。
 */
import type { LevelConfig, Tile } from '../src/types/game';
import { solveMinTaps } from './solve-min-par';

export interface AxisSolution {
  par: number;
  phases: Record<string, number>;
  tiles: Tile[];
  plan: { id: string; rotateTaps: number; toggle?: boolean }[];
}

export function solveWithAxes(level: LevelConfig): AxisSolution | null {
  const axes = [...new Set(level.tiles.map((t) => t.axis).filter(Boolean))] as string[];
  if (!axes.length) {
    try {
      const res = solveMinTaps(level);
      return { par: res.par, phases: {}, tiles: level.tiles, plan: res.plan as any };
    } catch {
      return null;
    }
  }
  const combos = 4 ** axes.length;
  let best: AxisSolution | null = null;
  for (let i = 0; i < combos; i++) {
    const phases: Record<string, number> = {};
    let rest = i;
    let cost = 0;
    for (const ax of axes) {
      const k = rest % 4;
      rest = Math.floor(rest / 4);
      phases[ax] = k;
      cost += k;
    }
    const tiles = level.tiles.map((t) =>
      t.axis
        ? {
            ...t,
            rotation: t.rotation + 90 * phases[t.axis] * (t.axisDir ?? 1),
            locked: true,
          }
        : { ...t },
    );
    try {
      const res = solveMinTaps({ ...level, tiles });
      const total = cost + res.par;
      if (!best || total < best.par) {
        best = { par: total, phases, tiles, plan: res.plan as any };
      }
    } catch {
      /* 该组合无解 */
    }
  }
  return best;
}
