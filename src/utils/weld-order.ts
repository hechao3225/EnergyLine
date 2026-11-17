import type { LevelConfig, Tile } from "../types/game";
import { simulateCircuit } from "./circuit";

export interface ClickStep {
  /** 联动轴组 id：点一下整组按各自方向转 90° */
  axis?: string;
  /** 单格 id */
  id?: string;
  taps: number;
  /** 能量闸：本项动作是切换开关，不是旋转 */
  toggle?: boolean;
}

function rotateByAxis(tiles: Tile[], axis: string): Tile[] {
  return tiles.map((tile) =>
    tile.axis === axis
      ? { ...tile, rotation: tile.rotation + 90 * (tile.axisDir ?? 1) }
      : tile,
  );
}

function applyStep(tiles: Tile[], step: ClickStep): Tile[] {
  if (step.axis) return rotateByAxis(tiles, step.axis);
  return tiles.map((tile) => {
    if (tile.id !== step.id) return tile;
    if (step.toggle) return { ...tile, switchClosed: tile.switchClosed === false };
    return { ...tile, rotation: tile.rotation + 90 };
  });
}

function stateKey(tiles: Tile[], remaining: number[]) {
  return (
    tiles
      .map(
        (tile) =>
          `${tile.id}:${((tile.rotation % 360) + 360) % 360}:${tile.switchClosed ?? ""}`,
      )
      .join(",") +
    "|" +
    remaining.join(",")
  );
}

/**
 * 按焊死规则给一组动作找合法顺序。
 *
 * 焊死不改变可行解，只限制执行顺序。找不到顺序时，这个方案不能作为
 * 规则关的最终方案；生成器和审计必须直接拒绝，而不是把 par 写进数据。
 */
export function weldStepsOrder(
  level: LevelConfig,
  steps: ClickStep[],
  cap = 300_000,
): ClickStep[] | null {
  const remaining = steps.map((step) => step.taps);
  const start = level.tiles.map((tile) => ({ ...tile }));
  const seen = new Set<string>();
  const path: ClickStep[] = [];
  let nodes = 0;

  const dfs = (tiles: Tile[], rem: number[]): boolean => {
    if (nodes++ > cap) return false;
    if (rem.every((value) => value <= 0)) return true;
    const key = stateKey(tiles, rem);
    if (seen.has(key)) return false;
    seen.add(key);

    const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
    for (let index = 0; index < steps.length; index++) {
      if (rem[index] <= 0) continue;
      const step = steps[index];
      const blocked = step.axis
        ? tiles.some((tile) => tile.axis === step.axis && sim.poweredTileIds.has(tile.id))
        : Boolean(step.id && sim.poweredTileIds.has(step.id));
      if (blocked) continue;

      const nextRemaining = [...rem];
      nextRemaining[index]--;
      path.push(step);
      if (dfs(applyStep(tiles, step), nextRemaining)) return true;
      path.pop();
    }
    return false;
  };

  return dfs(start, remaining)
    ? path.map((step) => ({ ...step, taps: 1 }))
    : null;
}

export function replayWeldSteps(level: LevelConfig, steps: ClickStep[]): Tile[] {
  let tiles = level.tiles.map((tile) => ({ ...tile }));
  for (const step of steps) tiles = applyStep(tiles, step);
  return tiles;
}
