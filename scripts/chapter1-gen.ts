import fs from "node:fs";
import type { LevelConfig, Tile } from "../src/types/game";
import { CHAPTER1_SCHEDULE, type Chapter1Spec } from "../src/data/chapter1Schedule";
import { LEGACY_LEVELS } from "../src/data/defaultLevels";
import { TORUS_TEST_LEVELS } from "../src/data/torusLevels";
import { getDefaultBasePorts, simulateCircuit } from "../src/utils/circuit";
import {
  applyRuleSolution,
  isRuleLevelSolved,
  solveRuleLevel,
} from "../src/utils/rule-solver";
import {
  createScrambledLevel,
  generateAlgorithmLayout,
  requiredCellsOf,
} from "./generate-99-levels";
import { generate as generateAxisLevel } from "./axis-gen";

const BASIC_BLUEPRINTS: Partial<Record<number, number>> = {
  1: 1,
  2: 4,
  3: 7,
  4: 4,
  6: 7,
  7: 7,
  8: 28,
  9: 41,
  11: 6,
  12: 53,
};

function specOf(id: number): Chapter1Spec {
  const spec = CHAPTER1_SCHEDULE.find((item) => item.id === id);
  if (!spec) throw new Error(`第 1 章缺少 L${id} 规格`);
  return spec;
}

function solvedBlueprint(id: number): Tile[] {
  const level = LEGACY_LEVELS.find((item) => item.id === id);
  if (!level) throw new Error(`缺少旧拓扑 L${id}`);
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`旧拓扑 L${id} 无解`);
  return applyRuleSolution(level, solution);
}

function withMeta(level: LevelConfig, spec: Chapter1Spec): LevelConfig {
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
    maxSteps: (level.parSteps ?? spec.targetPar) + (spec.role === "boss" ? 2 : 3),
    mechanicTags: spec.mechanicTags,
    primaryMechanic: spec.primaryMechanic,
    questionType: spec.questionType,
    role: spec.role,
  };
}

function buildBasic(spec: Chapter1Spec): LevelConfig {
  const blueprintId = BASIC_BLUEPRINTS[spec.id];
  if (!blueprintId) throw new Error(`L${spec.id} 缺少基础拓扑蓝图`);
  const solved = solvedBlueprint(blueprintId);
  const required = requiredCellsOf(blueprintId, solved);
  let best: LevelConfig | null = null;
  let bestDistance = Infinity;

  for (let target = Math.max(3, spec.parMin - 2); target <= spec.parMax + 2; target++) {
    for (let seed = 1; seed <= 120; seed++) {
      const built = createScrambledLevel(
        blueprintId,
        spec.title,
        "失落乐园",
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

  if (!best) throw new Error(`L${spec.id} 找不到 ${spec.parMin}–${spec.parMax} 步基础盘面`);
  return withMeta(best, spec);
}

function buildMultiSource(spec: Chapter1Spec): LevelConfig {
  const config = {
    range: [1, 20] as [number, number],
    chapterName: "失落乐园",
    minSources: 2,
    maxSources: 2,
    minBulbs: 2,
    maxBulbs: 3,
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
          "失落乐园",
          spec.hint,
          "设施修复完成。",
          layout.solved,
          spec.id * 104729 + variant * 7919 + seed,
          { targetPar: target, requiredCells: required },
        );
        if (built.level.tiles.filter((tile) => tile.type === "battery").length !== 2) {
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

  if (!best) throw new Error(`L${spec.id} 找不到无开关多源盘面`);
  return withMeta(best, spec);
}

function axisLevel(
  spec: Chapter1Spec,
  options: {
    cells: number;
    bulbs: number;
    groups: number[];
    par: number;
    seed: number;
    goal?: number;
  },
): LevelConfig {
  const generated = generateAxisLevel({
    id: spec.id,
    code: String(spec.id),
    title: spec.title,
    hint: spec.hint,
    cells: options.cells,
    bulbs: options.bulbs,
    groups: options.groups,
    decoys: 1,
    par: [options.par, options.par],
    tolerance: 2,
    seed: options.seed,
  });
  if (!generated) throw new Error(`L${spec.id} 联动轴生成失败`);
  const withGoal = options.goal
    ? { ...generated.level, goal: options.goal }
    : generated.level;
  const solution = solveRuleLevel(withGoal);
  if (!solution) throw new Error(`L${spec.id} 联动轴解复核失败`);
  return withMeta(
    { ...withGoal, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
  );
}

function tuneTorusDown(level: LevelConfig, target: number): LevelConfig {
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

function addSwitchToPlan(level: LevelConfig): LevelConfig {
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

function buildWrap(spec: Chapter1Spec): LevelConfig {
  let level: LevelConfig;
  if (spec.id === 16) {
    level = { ...TORUS_TEST_LEVELS[0] };
  } else if (spec.id === 17) {
    level = tuneTorusDown({ ...TORUS_TEST_LEVELS[1] }, spec.targetPar);
  } else {
    const source = { ...TORUS_TEST_LEVELS[0] };
    level = addSwitchToPlan(source);
  }
  const solution = solveRuleLevel({ ...level, id: spec.id });
  if (!solution || !isRuleLevelSolved({ ...level, id: spec.id }, applyRuleSolution({ ...level, id: spec.id }, solution))) {
    throw new Error(`L${spec.id} 环面解复核失败`);
  }
  return withMeta(
    { ...level, id: spec.id, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
  );
}

function buildAxis(spec: Chapter1Spec): LevelConfig {
  if (spec.id === 13) {
    return axisLevel(spec, { cells: 16, bulbs: 3, groups: [3], par: 9, seed: 5 });
  }
  if (spec.id === 14) {
    return axisLevel(spec, { cells: 18, bulbs: 3, groups: [3], par: 10, seed: 20 });
  }
  if (spec.id === 15) {
    return axisLevel(spec, {
      cells: 17,
      bulbs: 3,
      groups: [4],
      par: 11,
      seed: 50,
      goal: 2,
    });
  }

  const base = axisLevel(spec, {
    cells: 18,
    bulbs: 4,
    groups: [2, 2],
    par: 13,
    seed: 29,
  });
  const withSwitch = addSwitchToPlan(base);
  const solution = solveRuleLevel(withSwitch);
  if (!solution) throw new Error("L20 轴锁主路解复核失败");
  return withMeta(
    { ...withSwitch, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
  );
}

function buildChapter1(): LevelConfig[] {
  return CHAPTER1_SCHEDULE.map((spec) => {
    if (spec.primaryMechanic === "axis") return buildAxis(spec);
    if (spec.mechanicTags.includes("wrap")) return buildWrap(spec);
    if (spec.primaryMechanic === "multi-source") return buildMultiSource(spec);
    return buildBasic(spec);
  }).sort((a, b) => a.id - b.id);
}

const chapter = buildChapter1();
for (const level of chapter) {
  const solution = solveRuleLevel(level);
  const title = specOf(level.id).title;
  console.log(
    `L${String(level.id).padStart(2, "0")} ${level.primaryMechanic?.padEnd(12)} par ${String(solution?.par).padStart(2)} / ${level.parSteps}  ${title}`,
  );
}

if (process.argv.includes("--write")) {
  const text =
    '/** 由 scripts/chapter1-gen.ts 生成，勿手改。 */\n' +
    'import type { LevelConfig } from "../types/game";\n\n' +
    "export const CHAPTER1_LEVELS: LevelConfig[] = " +
    JSON.stringify(chapter, null, 2) +
    ";\n";
  fs.writeFileSync("src/data/chapter1Levels.ts", text, "utf8");
  console.log("写入 src/data/chapter1Levels.ts");
}
