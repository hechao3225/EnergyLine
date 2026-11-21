import fs from "node:fs";
import { pathToFileURL } from "node:url";
import type { LevelConfig, Tile, TileType } from "../src/types/game";
import { CHAPTER4_SCHEDULE, type Chapter4Spec } from "../src/data/chapter4Schedule";
import { LEGACY_LEVELS } from "../src/data/defaultLevels";
import { LAB_LEVELS } from "../src/data/labLevels";
import { getDefaultBasePorts, simulateCircuit } from "../src/utils/circuit";
import { applyRuleSolution, solveRuleLevel } from "../src/utils/rule-solver";
import {
  addSwitchToPlan,
  buildMultiSourceLevel,
  buildNoSpecialLevel,
  withScheduleMeta,
} from "./chapter-level-utils";
import { applyLevelRepairs } from "./chapter-repairs";
import {
  createScrambledLevel,
  generateAlgorithmLayout,
  requiredCellsOf,
} from "./generate-99-levels";
import { generateWeldLevel } from "./weld-gen";
import { generateTorusLevel } from "./torus-gen";

function specOf(id: number): Chapter4Spec {
  const spec = CHAPTER4_SCHEDULE.find((item) => item.id === id);
  if (!spec) throw new Error(`第 4 章缺少 L${id} 规格`);
  return spec;
}

function finalize(level: LevelConfig, spec: Chapter4Spec): LevelConfig {
  const solved = solveRuleLevel(level);
  if (!solved) throw new Error(`L${spec.id} 规则复核失败`);
  return withScheduleMeta(
    { ...level, parSteps: solved.par, maxSteps: solved.par + 2 },
    spec,
    2,
  );
}

function wrapLevel(
  spec: Chapter4Spec,
  _options: { cells: number; bulbs: number },
): LevelConfig {
  const source = LAB_LEVELS.find((level) => level.code === "T3");
  const torus = source
    ? { ...source, tiles: source.tiles.map((tile) => ({ ...tile })) }
    : null;
  const base = torus ?? null;
  if (!base) throw new Error(`L${spec.id} 缺少环面基础拓扑`);
  const movable = base.tiles.filter(
    (tile) => !tile.locked && tile.type !== "empty" && tile.type !== "cross",
  );

  for (let seed = 1; seed <= 12000; seed++) {
    let state = seed;
    const level: LevelConfig = {
      ...base,
      id: spec.id,
      rules: { wrap: true },
      tiles: base.tiles.map((tile) => {
        if (!movable.some((item) => item.id === tile.id)) return { ...tile };
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        if (state % 3 !== 0) return { ...tile };
        const delta = [-90, 90, 180][state % 3];
        return { ...tile, rotation: tile.rotation + delta };
      }),
    };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par !== spec.targetPar) continue;
    const initial = simulateCircuit(level.tiles, 6, 6, level.rules);
    if (initial.litCount > 0) continue;
    const applied = applyRuleSolution(level, solution);
    const done = simulateCircuit(applied, 6, 6, level.rules);
    const seams = [...done.poweredEdges].filter((edge) => {
      const [from, to] = edge.split("->");
      const [r1, c1] = from.split(",").map(Number);
      const [r2, c2] = to.split(",").map(Number);
      return Math.abs(r1 - r2) > 1 || Math.abs(c1 - c2) > 1;
    });
    if (seams.length === 0) continue;
    return finalize(level, spec);
  }
  throw new Error(`L${spec.id} 找不到目标环面盘面`);
}

function wrapSwitchLevel(spec: Chapter4Spec): LevelConfig {
  for (let seed = 1; seed <= 1200; seed++) {
    const generated = generateTorusLevel(
      {
        id: spec.id,
        code: String(spec.id),
        title: spec.title,
        subtitle: "虹彩天桥",
        hint: spec.hint,
        win: "设施修复完成。",
        cells: 20,
        bulbs: 3,
        par: [spec.targetPar - 1, spec.targetPar - 1],
        tolerance: 2,
        seed,
      },
      seed,
    );
    if (!generated) continue;
    try {
      return finalize(addSwitchToPlan(generated), spec);
    } catch {
      // 该盘面的最优解没有可替换直管，继续搜索。
    }
  }
  throw new Error(`L${spec.id} 找不到可加闸环面盘面`);
}

function wrapMultiSource(spec: Chapter4Spec): LevelConfig {
  const solved = colorTorusSolved().map(({ color: _color, ...tile }) => tile);
  const movable = solved.filter(
    (tile) => !tile.locked && tile.type !== "empty" && tile.type !== "cross",
  );
  const caps: Partial<Record<TileType, number>> = { line: 1, corner: 3 };
  for (let seed = 1; seed <= 4000; seed++) {
    let state = seed;
    const tiles = solved.map((tile) => {
      if (!movable.some((item) => item.id === tile.id)) return { ...tile };
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const cap = caps[tile.type] ?? 1;
      return { ...tile, rotation: tile.rotation + 90 * (1 + (state % cap)) };
    });
    const level: LevelConfig = {
      id: spec.id,
      code: String(spec.id),
      totalLevels: 99,
      maxSteps: spec.parMax + 2,
      parSteps: spec.targetPar,
      gridRows: 6,
      gridCols: 6,
      rules: { wrap: true },
      tiles,
    };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par !== spec.targetPar) continue;
    const initial = simulateCircuit(level.tiles, 6, 6, level.rules);
    if (initial.litCount > 0) continue;
    return finalize(level, spec);
  }
  throw new Error(`L${spec.id} 找不到双源环面盘面`);
}

function colorNoWrap(spec: Chapter4Spec): LevelConfig {
  const source = LEGACY_LEVELS.find((level) => level.id === 73);
  if (!source) throw new Error("缺少颜色拓扑 L73");
  const baseSolution = solveRuleLevel(source);
  if (!baseSolution) throw new Error("颜色拓扑 L73 无解");
  const solved = applyRuleSolution(source, baseSolution);
  const required = requiredCellsOf(73, solved);
  for (let target = spec.parMin - 1; target <= spec.parMax + 1; target++) {
    for (let seed = 1; seed <= 180; seed++) {
      const built = createScrambledLevel(
        73,
        spec.title,
        "虹彩天桥",
        spec.hint,
        "设施修复完成。",
        solved,
        73 * 7919 + spec.id * 131 + seed,
        { targetPar: target, requiredCells: required },
      );
      const level = { ...built.level, id: spec.id, rules: { colors: 2 } };
      const solution = solveRuleLevel(level);
      if (solution && solution.par >= spec.parMin && solution.par <= spec.parMax) {
        return finalize(level, spec);
      }
    }
  }
  throw new Error(`L${spec.id} 找不到双色盘面`);
}

export function colorTorusSolved(): Tile[] {
  const tiles: Tile[] = [];
  const put = (
    row: number,
    col: number,
    type: TileType,
    rotation: number,
    extra: Partial<Tile> = {},
  ) => {
    tiles.push({
      id: `ct-${row}-${col}`,
      row,
      col,
      type,
      rotation,
      basePorts: getDefaultBasePorts(type),
      ...extra,
    });
  };

  put(4, 0, "battery", 180, { locked: true, color: 0 });
  put(4, 5, "corner", 270);
  put(3, 5, "line", 90);
  put(2, 5, "corner", 90);
  put(2, 4, "line", 0);
  put(2, 3, "corner", 270);
  put(1, 3, "corner", 90);
  put(1, 2, "line", 0);
  put(1, 1, "line", 0);
  put(1, 0, "corner", 0);
  put(2, 0, "bulb", 0, { locked: true, color: 0 });

  put(0, 4, "battery", 270, { locked: true, color: 1 });
  put(5, 4, "corner", 90);
  put(5, 3, "line", 0);
  put(5, 2, "line", 0);
  put(5, 1, "corner", 270);
  put(4, 1, "line", 90);
  put(3, 1, "corner", 0);
  put(3, 2, "line", 0);
  put(3, 3, "corner", 90);
  put(4, 3, "corner", 270);
  put(4, 4, "bulb", 0, { locked: true, color: 1 });
  return tiles;
}

function colorTorus(spec: Chapter4Spec): LevelConfig {
  const solved = colorTorusSolved();
  const movable = solved.filter(
    (tile) => !tile.locked && tile.type !== "empty" && tile.type !== "cross",
  );
  const caps: Partial<Record<TileType, number>> = {
    line: 1,
    corner: 3,
    t_shape: 3,
    diode: 3,
  };
  let fallback: LevelConfig | null = null;
  let fallbackDistance = Infinity;
  for (let seed = 1; seed <= 6000; seed++) {
    let state = seed;
    const tiles = solved.map((tile) => {
      if (!movable.some((item) => item.id === tile.id)) return { ...tile };
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const cap = caps[tile.type] ?? 1;
      return { ...tile, rotation: tile.rotation + 90 * (1 + (state % cap)) };
    });
    const level: LevelConfig = {
      id: spec.id,
      code: String(spec.id),
      totalLevels: 99,
      maxSteps: spec.parMax + 2,
      parSteps: spec.targetPar,
      gridRows: 6,
      gridCols: 6,
      rules: { colors: 2, wrap: true },
      tiles,
    };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par < spec.parMin || solution.par > spec.parMax) {
      continue;
    }
    const initial = simulateCircuit(level.tiles, 6, 6, level.rules);
    if (initial.litCount > 0) continue;
    const distance = Math.abs(solution.par - spec.targetPar);
    if (distance === 0) return finalize(level, spec);
    if (distance < fallbackDistance) {
      fallbackDistance = distance;
      fallback = level;
    }
  }
  if (fallback) return finalize(fallback, spec);
  throw new Error(`L${spec.id} 找不到双色环面盘面`);
}

function noCycleLevel(spec: Chapter4Spec): LevelConfig {
  const level = buildNoSpecialLevel(spec, 1, 3, 4);
  const withRule = { ...level, rules: { noCycle: true } };
  return finalize(withRule, spec);
}

function legacyWeld(spec: Chapter4Spec, sourceId: number): LevelConfig {
  const source = LEGACY_LEVELS.find((level) => level.id === sourceId);
  if (!source) throw new Error(`L${spec.id} 缺少旧焊死拓扑 L${sourceId}`);
  const level = {
    ...source,
    id: spec.id,
    rules: { ...(source.rules ?? {}), weld: true },
  };
  return finalize(level, spec);
}

function weldGenerated(spec: Chapter4Spec): LevelConfig {
  for (let seed = 1; seed <= 1200; seed++) {
    const level = generateWeldLevel(
      {
        id: spec.id,
        code: String(spec.id),
        title: spec.title,
        subtitle: "虹彩天桥",
        hint: spec.hint,
        win: "设施修复完成。",
        cells: 24,
        bulbs: 4,
        par: [spec.targetPar, spec.targetPar],
        tolerance: 2,
        minTapped: 3,
      },
      seed,
    );
    if (level) return finalize(level, spec);
  }
  throw new Error(`L${spec.id} 找不到焊死回声盘面`);
}

function buildChapter4(): LevelConfig[] {
  return CHAPTER4_SCHEDULE.map((spec) => {
    switch (spec.id) {
      case 61:
      case 62:
      case 63:
      case 65:
      case 68:
      case 69:
      case 78:
      case 79:
        return wrapLevel(spec, { cells: spec.id >= 78 ? 27 : 24, bulbs: 4 });
      case 64:
        return buildNoSpecialLevel(spec, 1, 3, 4);
      case 66:
        return wrapMultiSource(spec);
      case 67:
        return wrapSwitchLevel(spec);
      case 70:
        return legacyWeld(spec, 48);
      case 71:
      case 72:
      case 74:
        return colorNoWrap(spec);
      case 73:
      case 80:
        return colorTorus(spec);
      case 75:
        return buildMultiSourceLevel(spec, 3, 4);
      case 76:
      case 77:
        return noCycleLevel(spec);
      default:
        throw new Error(`L${spec.id} 没有生成策略`);
    }
  }).sort((a, b) => a.id - b.id);
}

function main() {
  const chapter = applyLevelRepairs(buildChapter4());
  for (const level of chapter) {
    const solution = solveRuleLevel(level);
    console.log(
      `L${String(level.id).padStart(2, "0")} ${level.primaryMechanic?.padEnd(12)} par ${String(solution?.par).padStart(2)} / ${level.parSteps}  ${specOf(level.id).title}`,
    );
  }

  if (process.argv.includes("--write")) {
    const text =
      '/** 由 scripts/chapter4-gen.ts 生成，勿手改。 */\n' +
      'import type { LevelConfig } from "../types/game";\n\n' +
      "export const CHAPTER4_LEVELS: LevelConfig[] = " +
      JSON.stringify(chapter, null, 2) +
      ";\n";
    fs.writeFileSync("src/data/chapter4Levels.ts", text, "utf8");
    console.log("写入 src/data/chapter4Levels.ts");
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
