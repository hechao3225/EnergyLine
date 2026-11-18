import type {
  LevelConfig,
  LevelRole,
  MechanicTag,
  QuestionType,
  Tile,
} from "../src/types/game";
import { LEGACY_LEVELS } from "../src/data/defaultLevels";
import { getDefaultBasePorts, simulateCircuit } from "../src/utils/circuit";
import { applyRuleSolution, solveRuleLevel } from "../src/utils/rule-solver";
import {
  createScrambledLevel,
  generateAlgorithmLayout,
  requiredCellsOf,
} from "./generate-99-levels";

export interface ScheduleMeta {
  id: number;
  title: string;
  hint: string;
  primaryMechanic: MechanicTag;
  mechanicTags: MechanicTag[];
  questionType: QuestionType;
  role: LevelRole;
  targetPar: number;
  parMin: number;
  parMax: number;
}

export function withScheduleMeta(
  level: LevelConfig,
  spec: ScheduleMeta,
  tolerance = 3,
): LevelConfig {
  const {
    title: _title,
    subtitle: _subtitle,
    hintText: _hintText,
    winText: _winText,
    ...core
  } = level;
  return {
    ...core,
    id: spec.id,
    code: String(spec.id).padStart(2, "0"),
    maxSteps: (level.parSteps ?? spec.targetPar) + tolerance,
    mechanicTags: spec.mechanicTags,
    primaryMechanic: spec.primaryMechanic,
    questionType: spec.questionType,
    role: spec.role,
  };
}

export function solvedBlueprint(id: number): Tile[] {
  const level = LEGACY_LEVELS.find((item) => item.id === id);
  if (!level) throw new Error(`缺少旧拓扑 L${id}`);
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`旧拓扑 L${id} 无解`);
  return applyRuleSolution(level, solution);
}

export function buildBasicFromBlueprint(
  spec: ScheduleMeta,
  blueprintId: number,
): LevelConfig {
  const solved = solvedBlueprint(blueprintId);
  const required = requiredCellsOf(blueprintId, solved);
  let best: LevelConfig | null = null;
  let bestDistance = Infinity;

  for (let target = Math.max(3, spec.parMin - 2); target <= spec.parMax + 2; target++) {
    for (let seed = 1; seed <= 120; seed++) {
      const built = createScrambledLevel(
        blueprintId,
        spec.title,
        "乐园",
        spec.hint,
        "设施修复完成。",
        solved,
        blueprintId * 7919 + seed,
        { targetPar: target, requiredCells: required },
      );
      const solution = solveRuleLevel(built.level);
      if (!solution) continue;
      if (solution.par < spec.parMin || solution.par > spec.parMax) continue;
      const initial = simulateCircuit(
        built.level.tiles,
        built.level.gridRows,
        built.level.gridCols,
        built.level.rules,
      );
      if (initial.litCount > 0 || initial.overloaded) continue;
      const distance = Math.abs(solution.par - spec.targetPar);
      if (distance >= bestDistance) continue;
      bestDistance = distance;
      best = {
        ...built.level,
        parSteps: solution.par,
        maxSteps: solution.par + 3,
      };
      if (distance === 0) break;
    }
    if (bestDistance === 0) break;
  }

  if (!best) {
    throw new Error(`L${spec.id} 找不到 ${spec.parMin}–${spec.parMax} 步基础盘面`);
  }
  return withScheduleMeta(best, spec);
}

export function addSwitchToPlan(level: LevelConfig): LevelConfig {
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`L${level.id} 添加能量闸前无解`);
  const candidate = solution.plan.find((item) => {
    if (item.toggle) return false;
    const tile = level.tiles.find((entry) => entry.id === item.id);
    return Boolean(tile && !tile.axis && tile.type === "line" && item.rotateTaps > 0);
  });
  if (!candidate) throw new Error(`L${level.id} 最优解中没有可改成能量闸的直管`);
  return {
    ...level,
    tiles: level.tiles.map((tile) =>
      tile.id === candidate.id
        ? {
            ...tile,
            type: "switch",
            basePorts: getDefaultBasePorts("switch"),
            switchClosed: false,
          }
        : tile,
    ),
  };
}

export function tuneTorusDown(level: LevelConfig, target: number): LevelConfig {
  const base = solveRuleLevel(level);
  if (!base) return level;
  for (const item of base.plan) {
    if (item.rotateTaps < 1 || item.toggle) continue;
    for (const delta of [-90, 90]) {
      const candidate = {
        ...level,
        tiles: level.tiles.map((tile) =>
          tile.id === item.id
            ? { ...tile, rotation: tile.rotation + delta }
            : tile,
        ),
      };
      const solution = solveRuleLevel(candidate);
      if (!solution || solution.par !== target) continue;
      const initial = simulateCircuit(
        candidate.tiles,
        candidate.gridRows,
        candidate.gridCols,
        candidate.rules,
      );
      if (initial.litCount === 0) return candidate;
    }
  }
  return level;
}

export function buildMultiSourceLevel(
  spec: ScheduleMeta,
  minBulbs = 2,
  maxBulbs = 3,
): LevelConfig {
  return buildNoSpecialLevel(spec, 2, minBulbs, maxBulbs);
}

export function buildNoSpecialLevel(
  spec: ScheduleMeta,
  sources: number,
  minBulbs = 2,
  maxBulbs = 3,
): LevelConfig {
  const config = {
    range: [1, 99] as [number, number],
    chapterName: "乐园",
    minSources: sources,
    maxSources: sources,
    minBulbs,
    maxBulbs,
    allowSwitch: false,
    allowDiode: false,
    allowCross: true,
    lockedObstacles: 2,
    parRange: [spec.parMin, spec.parMax] as [number, number],
    parFloor: spec.parMin,
    titles: [spec.title],
  };
  let best: LevelConfig | null = null;
  let bestDistance = Infinity;

  for (let variant = 0; variant < 10; variant++) {
    const layout = generateAlgorithmLayout(spec.id, config, variant);
    const required = requiredCellsOf(spec.id, layout.solved);
    for (let target = spec.parMin - 1; target <= spec.parMax + 1; target++) {
      for (let seed = 1; seed <= 100; seed++) {
        const built = createScrambledLevel(
          spec.id,
          spec.title,
          "乐园",
          spec.hint,
          "设施修复完成。",
          layout.solved,
          spec.id * 104729 + variant * 7919 + seed,
          { targetPar: target, requiredCells: required },
        );
        if (
          built.level.tiles.filter((tile) => tile.type === "battery").length !==
          sources
        ) {
          continue;
        }
        if (built.level.tiles.some((tile) => tile.type === "switch" || tile.type === "diode")) {
          continue;
        }
        const solution = solveRuleLevel(built.level);
        if (!solution || solution.par < spec.parMin || solution.par > spec.parMax) continue;
        const initial = simulateCircuit(
          built.level.tiles,
          built.level.gridRows,
          built.level.gridCols,
          built.level.rules,
        );
        if (initial.litCount > 0 || initial.overloaded) continue;
        const distance = Math.abs(solution.par - spec.targetPar);
        if (distance >= bestDistance) continue;
        bestDistance = distance;
        best = {
          ...built.level,
          parSteps: solution.par,
          maxSteps: solution.par + 3,
        };
        if (distance === 0) break;
      }
      if (bestDistance === 0) break;
    }
    if (bestDistance === 0) break;
  }

  if (!best) throw new Error(`L${spec.id} 找不到无特殊机制盘面`);
  return withScheduleMeta(best, spec);
}
