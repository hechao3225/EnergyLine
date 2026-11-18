import fs from "node:fs";
import type { LevelConfig } from "../src/types/game";
import { CHAPTER3_SCHEDULE, type Chapter3Spec } from "../src/data/chapter3Schedule";
import { LEGACY_LEVELS } from "../src/data/defaultLevels";
import { TORUS_TEST_LEVELS } from "../src/data/torusLevels";
import { solveRuleLevel } from "../src/utils/rule-solver";
import { generate as generateAxisLevel } from "./axis-gen";
import { generateWeldLevel } from "./weld-gen";
import {
  buildBasicFromBlueprint,
  buildMultiSourceLevel,
  tuneTorusDown,
  withScheduleMeta,
} from "./chapter-level-utils";

function specOf(id: number): Chapter3Spec {
  const spec = CHAPTER3_SCHEDULE.find((item) => item.id === id);
  if (!spec) throw new Error(`第 3 章缺少 L${id} 规格`);
  return spec;
}

function legacyLevel(
  spec: Chapter3Spec,
  sourceId: number,
  options: {
    goal?: number;
    weld?: boolean;
    exactBudget?: boolean;
  } = {},
): LevelConfig {
  const source = LEGACY_LEVELS.find((level) => level.id === sourceId);
  if (!source) throw new Error(`L${spec.id} 缺少旧拓扑 L${sourceId}`);
  const level: LevelConfig = {
    ...source,
    id: spec.id,
    tiles: source.tiles.map((tile) => ({ ...tile })),
    ...(options.goal !== undefined ? { goal: options.goal } : {}),
    ...(options.weld
      ? { rules: { ...(source.rules ?? {}), weld: true } }
      : {}),
  };
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`L${spec.id} 旧拓扑规则复核失败`);
  const tolerance = options.exactBudget ? 0 : 2;
  return withScheduleMeta(
    { ...level, parSteps: solution.par, maxSteps: solution.par + tolerance },
    spec,
    tolerance,
  );
}

function gearLevel(spec: Chapter3Spec, cells: number, seed: number): LevelConfig {
  const generated = generateAxisLevel({
    id: spec.id,
    code: String(spec.id),
    title: spec.title,
    hint: spec.hint,
    cells,
    bulbs: 4,
    groups: [2, 2],
    decoys: 1,
    par: [16, 16],
    tolerance: 2,
    seed,
    gear: true,
  });
  if (!generated) throw new Error(`L${spec.id} 齿轮回声生成失败`);
  const solution = solveRuleLevel(generated.level);
  if (!solution) throw new Error(`L${spec.id} 齿轮回声复核失败`);
  return withScheduleMeta(
    { ...generated.level, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
  );
}

function weldGoalLevel(
  spec: Chapter3Spec,
  options: { cells: number; bulbs: number; goal: number },
): LevelConfig {
  for (let seed = 1; seed <= 600; seed++) {
    const generated = generateWeldLevel(
      {
        id: spec.id,
        code: String(spec.id),
        title: spec.title,
        subtitle: "云端奇境",
        hint: spec.hint,
        win: "设施修复完成。",
        cells: options.cells,
        bulbs: options.bulbs,
        par: [spec.parMax, spec.parMax + 8],
        tolerance: 2,
        minTapped: 3,
      },
      seed,
    );
    if (!generated) continue;
    const level = { ...generated, goal: options.goal };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par < spec.parMin || solution.par > spec.parMax) {
      continue;
    }
    return withScheduleMeta(
      { ...level, parSteps: solution.par, maxSteps: solution.par + 2 },
      spec,
      2,
    );
  }
  throw new Error(`L${spec.id} 找不到目标焊死取舍盘面`);
}

function weldLevelTarget(
  spec: Chapter3Spec,
  options: { cells: number; bulbs: number },
): LevelConfig {
  for (let seed = 1; seed <= 1200; seed++) {
    const level = generateWeldLevel(
      {
        id: spec.id,
        code: String(spec.id),
        title: spec.title,
        subtitle: "云端奇境",
        hint: spec.hint,
        win: "设施修复完成。",
        cells: options.cells,
        bulbs: options.bulbs,
        par: [spec.targetPar, spec.targetPar],
        tolerance: 2,
        minTapped: 3,
      },
      seed,
    );
    if (!level) continue;
    const solution = solveRuleLevel(level);
    if (!solution || solution.par < spec.parMin || solution.par > spec.parMax) {
      continue;
    }
    return withScheduleMeta(
      { ...level, parSteps: solution.par, maxSteps: solution.par + 2 },
      spec,
      2,
    );
  }
  throw new Error(`L${spec.id} 找不到目标焊死盘面`);
}

function buildChapter3(): LevelConfig[] {
  return CHAPTER3_SCHEDULE.map((spec) => {
    switch (spec.id) {
      case 41:
        return legacyLevel(spec, 42, { weld: true });
      case 42:
        return legacyLevel(spec, 41, { weld: true });
      case 43:
        return legacyLevel(spec, 43, { weld: true });
      case 44:
        return buildBasicFromBlueprint(spec, 11);
      case 45:
        return legacyLevel(spec, 44, { weld: true });
      case 46:
        return weldLevelTarget(spec, { cells: 24, bulbs: 4 });
      case 47:
        return legacyLevel(spec, 50, { goal: 2 });
      case 48:
      case 53:
        return buildMultiSourceLevel(spec);
      case 49:
        return legacyLevel(spec, 49, { weld: true });
      case 50:
        return legacyLevel(spec, 48, { weld: true });
      case 51: {
        const level = tuneTorusDown({ ...TORUS_TEST_LEVELS[2] }, 14);
        const solution = solveRuleLevel({ ...level, id: 51 });
        if (!solution) throw new Error("L51 环面回声复核失败");
        return withScheduleMeta(
          { ...level, id: 51, parSteps: solution.par, maxSteps: solution.par + 2 },
          spec,
          2,
        );
      }
      case 52:
        return legacyLevel(spec, 44);
      case 54:
        return gearLevel(spec, 22, 28);
      case 55:
        return weldLevelTarget(spec, { cells: 26, bulbs: 4 });
      case 56:
        return weldGoalLevel(spec, { cells: 30, bulbs: 5, goal: 4 });
      case 57:
        return legacyLevel(spec, 53, { weld: true });
      case 58:
        return gearLevel(spec, 23, 10);
      case 59:
        return legacyLevel(spec, 70, { goal: 4, exactBudget: true });
      case 60:
        return weldGoalLevel(spec, { cells: 32, bulbs: 6, goal: 5 });
      default:
        throw new Error(`L${spec.id} 没有生成策略`);
    }
  }).sort((a, b) => a.id - b.id);
}

const chapter = buildChapter3();
for (const level of chapter) {
  const solution = solveRuleLevel(level);
  console.log(
    `L${String(level.id).padStart(2, "0")} ${level.primaryMechanic?.padEnd(12)} par ${String(solution?.par).padStart(2)} / ${level.parSteps}  ${specOf(level.id).title}`,
  );
}

if (process.argv.includes("--write")) {
  const text =
    '/** 由 scripts/chapter3-gen.ts 生成，勿手改。 */\n' +
    'import type { LevelConfig } from "../types/game";\n\n' +
    "export const CHAPTER3_LEVELS: LevelConfig[] = " +
    JSON.stringify(chapter, null, 2) +
    ";\n";
  fs.writeFileSync("src/data/chapter3Levels.ts", text, "utf8");
  console.log("写入 src/data/chapter3Levels.ts");
}
