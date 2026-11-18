import fs from "node:fs";
import type { LevelConfig, Tile } from "../src/types/game";
import { CHAPTER2_SCHEDULE, type Chapter2Spec } from "../src/data/chapter2Schedule";
import { LEGACY_LEVELS } from "../src/data/defaultLevels";
import { TORUS_TEST_LEVELS } from "../src/data/torusLevels";
import { simulateCircuit } from "../src/utils/circuit";
import { solveRuleLevel } from "../src/utils/rule-solver";
import { generate as generateAxisLevel } from "./axis-gen";
import {
  addSwitchToPlan,
  buildBasicFromBlueprint,
  buildMultiSourceLevel,
  buildNoSpecialLevel,
  tuneTorusDown,
  withScheduleMeta,
} from "./chapter-level-utils";

function specOf(id: number): Chapter2Spec {
  const spec = CHAPTER2_SCHEDULE.find((item) => item.id === id);
  if (!spec) throw new Error(`第 2 章缺少 L${id} 规格`);
  return spec;
}

function generatedAxis(
  spec: Chapter2Spec,
  options: {
    cells: number;
    bulbs: number;
    groups: number[];
    par: number;
    seed: number;
    gear?: boolean;
    goal?: number;
    decoys?: number;
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
    decoys: options.decoys ?? 1,
    par: [options.par, options.par],
    tolerance: 2,
    seed: options.seed,
    gear: options.gear,
  });
  if (!generated) throw new Error(`L${spec.id} 轴/齿轮生成失败`);
  const generatedLevel = options.gear
    ? generated.level
    : {
        ...generated.level,
        tiles: generated.level.tiles.map(({ axisDir: _axisDir, ...tile }) => tile),
      };
  const level = options.goal
    ? { ...generatedLevel, goal: options.goal }
    : generatedLevel;
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`L${spec.id} 规则复核失败`);
  return withScheduleMeta(
    { ...level, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
  );
}

function legacyGoal(
  spec: Chapter2Spec,
  sourceId: number,
  goal: number,
  rotate?: { id: string; delta: number },
): LevelConfig {
  const source = LEGACY_LEVELS.find((level) => level.id === sourceId);
  if (!source) throw new Error(`L${spec.id} 缺少旧取舍拓扑 L${sourceId}`);
  const level = {
    ...source,
    goal,
    tiles: source.tiles.map((tile) =>
      rotate && tile.id === rotate.id
        ? { ...tile, rotation: tile.rotation + rotate.delta }
        : { ...tile },
    ),
  };
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`L${spec.id} 取舍解复核失败`);
  const initial = simulateCircuit(level.tiles, level.gridRows, level.gridCols, level.rules);
  if (initial.litCount >= goal) throw new Error(`L${spec.id} 开局已达标`);
  return withScheduleMeta(
    { ...level, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
  );
}

function buildBoss(spec: Chapter2Spec): LevelConfig {
  const source = LEGACY_LEVELS.find((level) => level.id === 90);
  if (!source) throw new Error("L40 缺少旧五灯取舍拓扑");
  const level: LevelConfig = {
    ...source,
    id: spec.id,
    tiles: source.tiles.map((tile): Tile => {
      if (tile.id === "t-5-2") return { ...tile, axis: "g-boss", axisDir: 1 };
      if (tile.id === "t-5-1") return { ...tile, axis: "g-boss", axisDir: -1 };
      if (tile.id === "t-1-2") return { ...tile, rotation: tile.rotation - 90 };
      return { ...tile };
    }),
  };
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error("L40 齿轮取舍解复核失败");
  return withScheduleMeta(
    { ...level, parSteps: solution.par, maxSteps: solution.par + 2 },
    spec,
    2,
  );
}

function buildChapter2(): LevelConfig[] {
  return CHAPTER2_SCHEDULE.map((spec) => {
    switch (spec.id) {
      case 21:
        return generatedAxis(spec, {
          cells: 18,
          bulbs: 3,
          groups: [2],
          par: 13,
          seed: 18,
          gear: true,
        });
      case 22:
        return generatedAxis(spec, {
          cells: 20,
          bulbs: 3,
          groups: [2, 1],
          par: 13,
          seed: 30,
          gear: true,
        });
      case 23:
      case 31:
      case 39:
        return buildMultiSourceLevel(spec);
      case 24:
        return generatedAxis(spec, {
          cells: 20,
          bulbs: 3,
          groups: [3],
          par: 15,
          seed: 20,
          gear: true,
        });
      case 25: {
        const base = generatedAxis(spec, {
          cells: 20,
          bulbs: 3,
          groups: [3],
          par: 14,
          seed: 30,
          gear: true,
        });
        const withSwitch = addSwitchToPlan(base);
        const solution = solveRuleLevel(withSwitch);
        if (!solution) throw new Error("L25 齿轮加闸解复核失败");
        return withScheduleMeta(
          { ...withSwitch, parSteps: solution.par, maxSteps: solution.par + 2 },
          spec,
          2,
        );
      }
      case 26: {
        const level = tuneTorusDown({ ...TORUS_TEST_LEVELS[2] }, 14);
        const solution = solveRuleLevel({ ...level, id: 26 });
        if (!solution) throw new Error("L26 环面回声解复核失败");
        return withScheduleMeta(
          { ...level, id: 26, parSteps: solution.par, maxSteps: solution.par + 2 },
          spec,
          2,
        );
      }
      case 27:
        return generatedAxis(spec, {
          cells: 21,
          bulbs: 4,
          groups: [2, 2],
          par: 17,
          seed: 30,
          gear: true,
        });
      case 28:
        return generatedAxis(spec, {
          cells: 20,
          bulbs: 3,
          groups: [3],
          par: 14,
          seed: 22,
        });
      case 29:
        return legacyGoal(spec, 50, 2);
      case 30:
        return legacyGoal(spec, 70, 3, { id: "t-4-4", delta: 90 });
      case 32:
        return generatedAxis(spec, {
          cells: 22,
          bulbs: 4,
          groups: [2, 2],
          par: 17,
          seed: 8,
          gear: true,
        });
      case 33:
        return legacyGoal(spec, 70, 3, { id: "t-1-4", delta: 90 });
      case 34:
        return buildNoSpecialLevel(spec, 1, 3, 3);
      case 35:
        return generatedAxis(spec, {
          cells: 23,
          bulbs: 4,
          groups: [2, 2],
          par: 16,
          seed: 10,
          gear: true,
        });
      case 36:
        return buildBasicFromBlueprint(spec, 53);
      case 37:
        return generatedAxis(spec, {
          cells: 20,
          bulbs: 4,
          groups: [2, 3],
          par: 19,
          seed: 52,
          goal: 3,
          gear: true,
        });
      case 38:
        return generatedAxis(spec, {
          cells: 18,
          bulbs: 3,
          groups: [3],
          par: 17,
          seed: 8,
        });
      case 40:
        return buildBoss(spec);
      default:
        throw new Error(`L${spec.id} 没有生成策略`);
    }
  }).sort((a, b) => a.id - b.id);
}

const chapter = buildChapter2();
for (const level of chapter) {
  const solution = solveRuleLevel(level);
  console.log(
    `L${String(level.id).padStart(2, "0")} ${level.primaryMechanic?.padEnd(12)} par ${String(solution?.par).padStart(2)} / ${level.parSteps}  ${specOf(level.id).title}`,
  );
}

if (process.argv.includes("--write")) {
  const text =
    '/** 由 scripts/chapter2-gen.ts 生成，勿手改。 */\n' +
    'import type { LevelConfig } from "../types/game";\n\n' +
    "export const CHAPTER2_LEVELS: LevelConfig[] = " +
    JSON.stringify(chapter, null, 2) +
    ";\n";
  fs.writeFileSync("src/data/chapter2Levels.ts", text, "utf8");
  console.log("写入 src/data/chapter2Levels.ts");
}
