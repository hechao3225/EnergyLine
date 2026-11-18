import fs from "node:fs";
import type { LevelConfig } from "../src/types/game";
import { CHAPTER1_SCHEDULE, type Chapter1Spec } from "../src/data/chapter1Schedule";
import { TORUS_TEST_LEVELS } from "../src/data/torusLevels";
import { simulateCircuit } from "../src/utils/circuit";
import {
  applyRuleSolution,
  isRuleLevelSolved,
  solveRuleLevel,
} from "../src/utils/rule-solver";
import {
  addSwitchToPlan,
  buildBasicFromBlueprint,
  buildMultiSourceLevel,
  tuneTorusDown,
  withScheduleMeta,
} from "./chapter-level-utils";
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

function buildBasic(spec: Chapter1Spec): LevelConfig {
  const blueprintId = BASIC_BLUEPRINTS[spec.id];
  if (!blueprintId) throw new Error(`L${spec.id} 缺少基础拓扑蓝图`);
  return buildBasicFromBlueprint(spec, blueprintId);
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
  return withScheduleMeta(
    { ...withGoal, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
  );
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
  return withScheduleMeta(
    { ...level, id: spec.id, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
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
  return withScheduleMeta(
    { ...withSwitch, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
  );
}

function buildChapter1(): LevelConfig[] {
  return CHAPTER1_SCHEDULE.map((spec) => {
    if (spec.primaryMechanic === "axis") return buildAxis(spec);
    if (spec.mechanicTags.includes("wrap")) return buildWrap(spec);
    if (spec.primaryMechanic === "multi-source") {
      return buildMultiSourceLevel(spec);
    }
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
