import type { LevelConfig, Tile } from "../types/game";
import { simulateCircuit } from "./circuit";
import { solveMinTaps, type SolveResult } from "./hint-solver";
import { weldStepsOrder, type ClickStep } from "./weld-order";

export interface RuleSolution extends SolveResult {
  phases: Record<string, number>;
  orderedSteps: ClickStep[];
}

function axisGroups(level: LevelConfig): string[] {
  return [...new Set(level.tiles.map((tile) => tile.axis).filter(Boolean))] as string[];
}

function withAxisPhase(level: LevelConfig, phases: Record<string, number>): LevelConfig {
  return {
    ...level,
    tiles: level.tiles.map((tile) => {
      const phase = tile.axis ? phases[tile.axis] ?? 0 : 0;
      return tile.axis
        ? {
            ...tile,
            rotation: tile.rotation + phase * 90 * (tile.axisDir ?? 1),
            locked: true,
          }
        : { ...tile };
    }),
  };
}

function stepsFrom(phases: Record<string, number>, plan: SolveResult["plan"]): ClickStep[] {
  const steps: ClickStep[] = [];
  for (const [axis, taps] of Object.entries(phases)) {
    if (taps > 0) steps.push({ axis, taps });
  }
  for (const item of plan) {
    if (item.rotateTaps > 0) steps.push({ id: item.id, taps: item.rotateTaps });
    if (item.toggle) steps.push({ id: item.id, taps: 1, toggle: true });
  }
  return steps;
}

export function applyRuleSolution(level: LevelConfig, solution: RuleSolution): Tile[] {
  const phased = withAxisPhase(level, solution.phases).tiles;
  const byId = new Map(solution.plan.map((item) => [item.id, item]));
  return phased.map((tile) => {
    const step = byId.get(tile.id);
    if (!step) return tile;
    return {
      ...tile,
      rotation: tile.rotation + step.rotateTaps * 90,
      switchClosed: step.toggle ? true : tile.switchClosed,
    };
  });
}

export function isRuleLevelSolved(level: LevelConfig, tiles: Tile[]): boolean {
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
  const goal = Math.max(1, Math.min(sim.totalBulbs, level.goal ?? sim.totalBulbs));
  return !sim.overloaded && sim.litCount >= goal;
}

/**
 * 统一精确求解：普通管道、环面、双色、禁环、达标关和联动轴共用同一入口。
 * 焊死只改变执行顺序，因此最终方案还必须通过 weldStepsOrder。
 */
export function solveRuleLevel(level: LevelConfig): RuleSolution | null {
  const groups = axisGroups(level);
  const combinations = 4 ** groups.length;
  let best: RuleSolution | null = null;

  for (let combination = 0; combination < combinations; combination++) {
    const phases: Record<string, number> = {};
    let rest = combination;
    let phaseCost = 0;
    for (const axis of groups) {
      const phase = rest % 4;
      rest = Math.floor(rest / 4);
      phases[axis] = phase;
      phaseCost += phase;
    }

    const phasedLevel = withAxisPhase(level, phases);
    let base: SolveResult;
    try {
      base = solveMinTaps(phasedLevel);
    } catch {
      continue;
    }

    const par = phaseCost + base.par;
    if (best && par >= best.par) continue;

    const candidate: RuleSolution = {
      ...base,
      par,
      phases,
      orderedSteps: stepsFrom(phases, base.plan),
    };
    const applied = applyRuleSolution(level, candidate);
    if (!isRuleLevelSolved(level, applied)) continue;

    if (level.rules?.weld) {
      const ordered = weldStepsOrder(level, candidate.orderedSteps);
      if (!ordered) continue;
      candidate.orderedSteps = ordered;
    }

    best = candidate;
  }

  return best;
}
