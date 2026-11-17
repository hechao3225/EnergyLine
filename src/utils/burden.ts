import type { LevelConfig } from "../types/game";
import { simulateCircuit } from "./circuit";
import { applyRuleSolution, type RuleSolution } from "./rule-solver";

export interface BurdenScore {
  op: number;
  rule: number;
  irr: number;
  scan: number;
  challenge: number;
  seamCount: number;
  decoyCount: number;
  colorRegions: number;
  gearGroups: number;
}

const clamp = (value: number, min = 1, max = 5) =>
  Math.min(max, Math.max(min, Math.round(value * 100) / 100));

function countSeams(level: LevelConfig, solution: RuleSolution): number {
  const applied = applyRuleSolution(level, solution);
  const sim = simulateCircuit(applied, level.gridRows, level.gridCols, level.rules);
  let count = 0;
  for (const edge of sim.poweredEdges) {
    const [from, to] = edge.split("->");
    const [fromRow, fromCol] = from.split(",").map(Number);
    const [toRow, toCol] = to.split(",").map(Number);
    if (
      Math.abs(fromRow - toRow) > 1 ||
      Math.abs(fromCol - toCol) > 1
    ) {
      count++;
    }
  }
  return count;
}

function countDecoys(level: LevelConfig, solution: RuleSolution): number {
  const used = new Set(solution.usedCells);
  return level.tiles.filter(
    (tile) =>
      tile.type !== "empty" &&
      tile.type !== "battery" &&
      tile.type !== "bulb" &&
      !tile.locked &&
      !used.has(tile.id),
  ).length;
}

/**
 * 四类负担的唯一计算口径。
 *
 * par 只代表操作量；跨缝强度必须从最优解实际通电的穿边界边读取，
 * 不能把“有 wrap 规则”当成“读取负担已经很高”。
 */
export function scoreBurden(
  level: LevelConfig,
  solution: RuleSolution,
): BurdenScore {
  const tileCount = (type: string) =>
    level.tiles.filter((tile) => tile.type === type).length;
  const sources = tileCount("battery");
  const switches = tileCount("switch");
  const diodes = tileCount("diode");
  const bulbs = tileCount("bulb");
  const targets = level.goal ?? bulbs;
  const cellScale = (level.gridRows * level.gridCols) / 36;

  const axisGroups = new Set(
    level.tiles.map((tile) => tile.axis).filter(Boolean),
  );
  const gearGroups = new Set(
    level.tiles
      .filter((tile) => tile.axisDir)
      .map((tile) => tile.axis)
      .filter(Boolean),
  );
  const colorRegions = new Set(
    level.tiles
      .filter((tile) => tile.type === "battery" || tile.type === "bulb")
      .map((tile) => tile.color)
      .filter((color): color is number => color !== undefined),
  ).size;
  const seamCount = countSeams(level, solution);
  const decoyCount = countDecoys(level, solution);

  const op = clamp(
    1 +
      solution.par / (6 * cellScale || 1) +
      0.5 * Math.max(0, sources - 1) +
      0.3 * (switches + diodes) +
      0.5 * Math.max(0, targets - 1),
  );

  const ruleLabelCount =
    Number(Boolean(level.rules?.wrap)) +
    Number(Boolean(level.rules?.weld)) +
    Number(Boolean(level.rules?.colors)) +
    Number(Boolean(level.rules?.noCycle)) +
    Number(axisGroups.size > 0);
  const rule = clamp(
    1 +
      ruleLabelCount +
      0.5 * gearGroups.size +
      0.5 * Math.max(0, colorRegions - 1),
  );

  const zeroToleranceGoal =
    level.goal !== undefined && level.maxSteps === solution.par;
  const irr = clamp(
    1 +
      (level.rules?.weld ? 3 : 0) +
      (zeroToleranceGoal ? 2 : 0),
  );

  const scan = clamp(
    1 +
      0.5 * decoyCount +
      0.4 * seamCount +
      0.5 * Math.max(0, colorRegions - 1) +
      (level.gridRows >= 7 || level.gridCols >= 7 ? 1 : 0),
  );

  const challenge = Math.round(
    100 *
      (
        0.35 * (op / 5) +
        0.3 * (rule / 5) +
        0.2 * (irr / 5) +
        0.15 * (scan / 5)
      ),
  );

  return {
    op,
    rule,
    irr,
    scan,
    challenge: Math.min(100, Math.max(20, challenge)),
    seamCount,
    decoyCount,
    colorRegions,
    gearGroups: gearGroups.size,
  };
}
