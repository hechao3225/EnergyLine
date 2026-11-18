import fs from "node:fs";
import { pathToFileURL } from "node:url";
import type { LevelConfig, LevelRules, Tile, TileType } from "../src/types/game";
import { CHAPTER5_SCHEDULE, type Chapter5Spec } from "../src/data/chapter5Schedule";
import { LEGACY_LEVELS } from "../src/data/defaultLevels";
import { LAB_LEVELS } from "../src/data/labLevels";
import { CHAPTER3_LEVELS } from "../src/data/chapter3Levels";
import { getDefaultBasePorts, simulateCircuit } from "../src/utils/circuit";
import { applyRuleSolution, solveRuleLevel } from "../src/utils/rule-solver";
import {
  addSwitchToPlan,
  withScheduleMeta,
} from "./chapter-level-utils";
import { colorTorusSolved } from "./chapter4-gen";
import { generateAlgorithmLayout } from "./generate-99-levels";
import { generateWeldLevel } from "./weld-gen";

function specOf(id: number): Chapter5Spec {
  const spec = CHAPTER5_SCHEDULE.find((item) => item.id === id);
  if (!spec) throw new Error(`第 5 章缺少 L${id} 规格`);
  return spec;
}

function finalize(level: LevelConfig, spec: Chapter5Spec, tolerance = 2): LevelConfig {
  const solution = solveRuleLevel(level);
  if (!solution) throw new Error(`L${spec.id} 规则复核失败`);
  return withScheduleMeta(
    { ...level, parSteps: solution.par, maxSteps: solution.par + tolerance },
    spec,
    tolerance,
  );
}

function countSeams(level: LevelConfig, tiles: Tile[]): number {
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
  return [...sim.poweredEdges].filter((edge) => {
    const [from, to] = edge.split("->");
    const [r1, c1] = from.split(",").map(Number);
    const [r2, c2] = to.split(",").map(Number);
    return Math.abs(r1 - r2) > 1 || Math.abs(c1 - c2) > 1;
  }).length;
}

function scrambleSolved(
  spec: Chapter5Spec,
  solved: Tile[],
  rules: LevelRules,
  options: {
    rows?: number;
    cols?: number;
    goal?: number;
    requireSeam?: boolean;
    seedLimit?: number;
  } = {},
): LevelConfig {
  const rows = options.rows ?? 6;
  const cols = options.cols ?? 6;
  const movable = solved.filter(
    (tile) => !tile.locked && tile.type !== "empty" && tile.type !== "cross",
  );
  const caps: Partial<Record<TileType, number>> = {
    line: 1,
    corner: 3,
    t_shape: 3,
    diode: 3,
    switch: 2,
  };
  let fallback: LevelConfig | null = null;
  let fallbackDistance = Infinity;
  for (let seed = 1; seed <= (options.seedLimit ?? 8000); seed++) {
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
      gridRows: rows,
      gridCols: cols,
      rules,
      ...(options.goal !== undefined ? { goal: options.goal } : {}),
      tiles,
    };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par < spec.parMin || solution.par > spec.parMax) {
      continue;
    }
    const initial = simulateCircuit(tiles, rows, cols, rules);
    if (initial.litCount > 0 || initial.overloaded) continue;
    const applied = applyRuleSolutionForCheck(level, solution);
    if (options.requireSeam && countSeams(level, applied) === 0) continue;
    const distance = Math.abs(solution.par - spec.targetPar);
    if (distance === 0) return finalize(level, spec);
    if (distance < fallbackDistance) {
      fallbackDistance = distance;
      fallback = level;
    }
  }
  if (fallback) return finalize(fallback, spec);
  throw new Error(`L${spec.id} 找不到目标组合盘面`);
}

function applyRuleSolutionForCheck(
  level: LevelConfig,
  solution: NonNullable<ReturnType<typeof solveRuleLevel>>,
): Tile[] {
  const phased = level.tiles.map((tile) => {
    const phase = tile.axis ? solution.phases[tile.axis] ?? 0 : 0;
    return tile.axis
      ? { ...tile, rotation: tile.rotation + phase * 90 * (tile.axisDir ?? 1) }
      : { ...tile };
  });
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

function colorTorusForCombo(spec: Chapter5Spec, rules: LevelRules): LevelConfig {
  const source = colorTorusSolved();
  const solved = rules.colors
    ? source
    : source.map(({ color: _color, ...tile }) => tile);
  return scrambleSolved(spec, solved, rules, {
    requireSeam: Boolean(rules.wrap),
  });
}

export function colorWeldSolved(): Tile[] {
  const tiles: Tile[] = [];
  const put = (
    row: number,
    col: number,
    type: TileType,
    rotation: number,
    color?: number,
    locked = false,
  ) => {
    tiles.push({
      id: `cw-${row}-${col}`,
      row,
      col,
      type,
      rotation,
      basePorts: getDefaultBasePorts(type),
      ...(color !== undefined ? { color } : {}),
      ...(locked ? { locked: true } : {}),
    });
  };

  put(0, 0, "battery", 0, 0, true);
  put(0, 1, "line", 0);
  put(0, 2, "line", 0);
  put(0, 3, "corner", 0);
  put(1, 3, "line", 90);
  put(2, 3, "corner", 180);
  put(2, 2, "line", 0);
  put(2, 1, "line", 0);
  put(2, 0, "bulb", 0, 0, true);

  put(3, 0, "battery", 0, 1, true);
  put(3, 1, "line", 0);
  put(3, 2, "line", 0);
  put(3, 3, "corner", 0);
  put(4, 3, "line", 90);
  put(5, 3, "corner", 270);
  put(5, 4, "line", 0);
  put(5, 5, "bulb", 0, 1, true);
  return tiles;
}

function wrapWeld(spec: Chapter5Spec): LevelConfig {
  const source = LAB_LEVELS.find((level) => level.code === "T3");
  if (!source) throw new Error("缺少环面焊死拓扑 T3");
  return scrambleSolved(spec, source.tiles, { wrap: true, weld: true }, {
    requireSeam: true,
    seedLimit: 4000,
  });
}

export function sevenSolved(
  spec: Chapter5Spec,
  variant: number,
  bulbs = 5,
  sources = 2,
): Tile[] {
  const config = {
    range: [81, 99] as [number, number],
    chapterName: "梦幻之巅",
    rows: 7,
    cols: 7,
    minSources: sources,
    maxSources: sources,
    minBulbs: bulbs,
    maxBulbs: bulbs,
    allowSwitch: false,
    allowDiode: false,
    allowCross: true,
    lockedObstacles: 0,
    parRange: [spec.parMin, spec.parMax] as [number, number],
    parFloor: spec.parMin,
    titles: [spec.title],
  };
  return generateAlgorithmLayout(spec.id, config, variant).solved;
}

export function forceSevenSourceToRight(solved: Tile[]): Tile[] | null {
  const tiles = solved.map((tile) => ({ ...tile }));
  const battery = tiles.find(
    (tile) =>
      tile.type === "battery" &&
      tiles.find((other) => other.row === tile.row && other.col === 6)?.type !==
        "bulb",
  );
  if (!battery) return null;
  const oldSource = tiles.find((tile) => tile.row === battery.row && tile.col === 0);
  const rightCell = tiles.find((tile) => tile.row === battery.row && tile.col === 6);
  if (!oldSource || !rightCell) return null;
  oldSource.type = "line";
  oldSource.basePorts = getDefaultBasePorts("line");
  oldSource.rotation = 0;
  oldSource.locked = false;
  rightCell.type = "battery";
  rightCell.basePorts = getDefaultBasePorts("battery");
  rightCell.rotation = 0;
  rightCell.locked = true;
  return tiles;
}

function sevenLevel(spec: Chapter5Spec): LevelConfig {
  let fallback: LevelConfig | null = null;
  for (let variant = 0; variant < 5; variant++) {
    try {
      return scrambleSolved(spec, sevenSolved(spec, variant), {}, {
        rows: 7,
        cols: 7,
      });
    } catch {
      // 换下一个 7×7 布局。
    }
  }
  if (fallback) return fallback;
  throw new Error(`L${spec.id} 找不到 7×7 盘面`);
}

function sevenWrap(spec: Chapter5Spec): LevelConfig {
  for (let variant = 0; variant < 5; variant++) {
    try {
      const solved = forceSevenSourceToRight(sevenSolved(spec, variant));
      if (!solved) continue;
      return scrambleSolved(spec, solved, { wrap: true }, {
        rows: 7,
        cols: 7,
        requireSeam: true,
      });
    } catch {
      // 换下一个 7×7 布局。
    }
  }
  throw new Error(`L${spec.id} 找不到 7×7 环面盘面`);
}

function wrapGoal(spec: Chapter5Spec): LevelConfig {
  for (let variant = 0; variant < 6; variant++) {
    const solved = forceSevenSourceToRight(
      sevenSolved({ ...spec, parMin: 22, parMax: 26 }, variant, 6),
    );
    if (!solved) continue;
    try {
      return scrambleSolved(spec, solved, { wrap: true }, {
        rows: 7,
        cols: 7,
        goal: 5,
        requireSeam: true,
      });
    } catch {
      // 换下一个高复杂度 7×7 布局。
    }
  }
  throw new Error(`L${spec.id} 找不到环面取舍盘面`);
}

function weldGoal(spec: Chapter5Spec): LevelConfig {
  const source = CHAPTER3_LEVELS.find((level) => level.id === 60);
  if (!source) throw new Error("缺少焊死取舍基础拓扑 L60");
  const level = {
    ...source,
    id: spec.id,
    goal: 5,
    rules: { weld: true },
    tiles: source.tiles.map((tile) => {
      if (tile.id === "t-5-3") return { ...tile, rotation: tile.rotation - 90 };
      return { ...tile };
    }),
  };
  return finalize(level, spec);
}

function weldLevel(spec: Chapter5Spec): LevelConfig {
  for (let seed = 1; seed <= 1800; seed++) {
    const level = generateWeldLevel(
      {
        id: spec.id,
        code: String(spec.id),
        title: spec.title,
        subtitle: "梦幻之巅",
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

function wrapGear(spec: Chapter5Spec): LevelConfig {
  const source = LAB_LEVELS.find((level) => level.code === "T3");
  const baseSolution = source ? solveRuleLevel(source) : null;
  if (!source || !baseSolution) throw new Error("缺少环面齿轮基础拓扑");
  const solved = applyRuleSolution(source, baseSolution);
  const movable = solved.filter(
    (tile) => !tile.locked && tile.type !== "empty" && tile.type !== "cross",
  );
  const pair = movable.find((tile, index) =>
    movable.slice(index + 1).some(
      (other) =>
        Math.abs(tile.row - other.row) + Math.abs(tile.col - other.col) === 1 &&
        tile.type === other.type,
    ),
  );
  const partner = pair
    ? movable.find(
        (tile) =>
          tile.id !== pair.id &&
          tile.type === pair.type &&
          Math.abs(tile.row - pair.row) + Math.abs(tile.col - pair.col) === 1,
      )
    : null;
  if (!pair || !partner) throw new Error("环面基础拓扑没有可配对的齿轮格");

  const caps: Partial<Record<TileType, number>> = {
    line: 1,
    corner: 3,
    t_shape: 3,
    diode: 3,
  };
  for (let seed = 1; seed <= 6000; seed++) {
    let state = seed;
    const phase = 1 + (state % 3);
    const tiles = solved.map((tile) => {
      if (tile.id === pair.id) {
        return { ...tile, axis: "g1", axisDir: 1 as const, rotation: tile.rotation - 90 * phase };
      }
      if (tile.id === partner.id) {
        return { ...tile, axis: "g1", axisDir: -1 as const, rotation: tile.rotation + 90 * phase };
      }
      if (!movable.some((item) => item.id === tile.id)) return { ...tile };
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const cap = caps[tile.type] ?? 1;
      return { ...tile, rotation: tile.rotation + 90 * (1 + (state % cap)) };
    });
    const level: LevelConfig = { ...source, id: spec.id, tiles, rules: { wrap: true } };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par !== spec.targetPar) continue;
    const applied = applyRuleSolutionForCheck(level, solution);
    if (countSeams(level, applied) === 0) continue;
    return finalize(level, spec);
  }
  throw new Error(`L${spec.id} 找不到环面齿轮盘面`);
}

function goalLevel(spec: Chapter5Spec): LevelConfig {
  const source = LEGACY_LEVELS.find((level) => level.id === 90);
  if (!source) throw new Error("缺少取舍终局拓扑 L90");
  const level = {
    ...source,
    id: spec.id,
    tiles: source.tiles.map((tile) =>
      spec.id === 91 && tile.id === "t-1-2"
        ? { ...tile, rotation: tile.rotation - 90 }
        : { ...tile },
    ),
    goal: 4,
  };
  return finalize(level, spec);
}

function tripleLevel(spec: Chapter5Spec): LevelConfig {
  const solved = forceSevenSourceToRight(
    sevenSolved({ ...spec, parMin: 22, parMax: 26 }, 17, 6, 2),
  );
  if (!solved) throw new Error("L99 无法制造 7×7 接缝");
  let strengthened = 0;
  for (const tile of solved) {
    if (strengthened >= 2 || tile.type !== "line" || tile.locked) continue;
    const rotation = ((tile.rotation % 360) + 360) % 360;
    const extra =
      rotation === 0 || rotation === 180
        ? { row: tile.row + 1, col: tile.col }
        : { row: tile.row, col: tile.col - 1 };
    const neighbor = solved.find(
      (other) => other.row === extra.row && other.col === extra.col,
    );
    if (!neighbor || neighbor.type !== "empty") continue;
    tile.type = "t_shape";
    tile.basePorts = getDefaultBasePorts("t_shape");
    strengthened++;
  }
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

  for (let seed = 1; seed <= 2400; seed++) {
    let state = seed;
    const tiles = solved.map((tile) => {
      if (!movable.some((item) => item.id === tile.id)) return { ...tile };
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const cap = caps[tile.type] ?? 1;
      return { ...tile, rotation: tile.rotation + 90 * (1 + (state % cap)) };
    });
    const loose: LevelConfig = {
      id: spec.id,
      code: String(spec.id),
      totalLevels: 99,
      maxSteps: spec.parMax + 2,
      parSteps: spec.targetPar,
      gridRows: 7,
      gridCols: 7,
      rules: { wrap: true },
      goal: 5,
      tiles,
    };
    const looseSolution = solveRuleLevel(loose);
    if (!looseSolution) continue;
    if (looseSolution.par < spec.parMin) continue;
    const strict: LevelConfig = {
      ...loose,
      rules: { wrap: true, weld: true },
    };
    const strictSolution = solveRuleLevel(strict);
    if (!strictSolution) continue;
    const initial = simulateCircuit(tiles, 7, 7, strict.rules);
    if (initial.litCount >= 5) continue;
    const applied = applyRuleSolutionForCheck(strict, strictSolution);
    if (countSeams(strict, applied) === 0) continue;
    const distance = Math.abs(strictSolution.par - spec.targetPar);
    if (distance === 0) return finalize(strict, spec);
    if (strictSolution.par === spec.targetPar - 1) {
      try {
        const withSwitch = addSwitchToPlan(strict);
        const switched = solveRuleLevel(withSwitch);
        if (switched?.par === spec.targetPar) return finalize(withSwitch, spec);
      } catch {
        // 该候选主路没有可替换直管，继续搜索。
      }
    }
    if (distance < fallbackDistance) {
      fallbackDistance = distance;
      fallback = strict;
    }
  }
  if (fallback) return finalize(fallback, spec);
  throw new Error("L99 找不到三机制终局盘面");
}

function basicLevel(spec: Chapter5Spec): LevelConfig {
  const sources: Record<number, number> = {
    86: 81,
    89: 57,
    92: 89,
    96: 92,
    98: 93,
  };
  const sourceId = sources[spec.id];
  const source = LEGACY_LEVELS.find((level) => level.id === sourceId);
  if (!source) throw new Error(`L${spec.id} 缺少基础拓扑 L${sourceId}`);
  return finalize(
    { ...source, id: spec.id, rules: undefined, goal: undefined },
    spec,
  );
}

function buildChapter5(): LevelConfig[] {
  return CHAPTER5_SCHEDULE.map((spec) => {
    switch (spec.id) {
      case 81:
      case 82:
        return wrapWeld(spec);
      case 83:
        return weldLevel(spec);
      case 84:
      case 85:
        return wrapGear(spec);
      case 86:
      case 89:
      case 92:
      case 96:
      case 98:
        return basicLevel(spec);
      case 87:
      case 88:
        return scrambleSolved(spec, colorWeldSolved(), { colors: 2, weld: true });
      case 90:
      case 91:
        return goalLevel(spec);
      case 93:
        return sevenLevel(spec);
      case 94:
        return sevenWrap(spec);
      case 95:
        return wrapGoal(spec);
      case 97:
        return weldGoal(spec);
      case 99: {
        return tripleLevel(spec);
      }
      default:
        throw new Error(`L${spec.id} 没有生成策略`);
    }
  }).sort((a, b) => a.id - b.id);
}

function main() {
  const chapter = buildChapter5();
  for (const level of chapter) {
    const solution = solveRuleLevel(level);
    console.log(
      `L${String(level.id).padStart(2, "0")} ${level.primaryMechanic?.padEnd(12)} par ${String(solution?.par).padStart(2)} / ${level.parSteps}  ${specOf(level.id).title}`,
    );
  }
  if (process.argv.includes("--write")) {
    const text =
      '/** 由 scripts/chapter5-gen.ts 生成，勿手改。 */\n' +
      'import type { LevelConfig } from "../types/game";\n\n' +
      "export const CHAPTER5_LEVELS: LevelConfig[] = " +
      JSON.stringify(chapter, null, 2) +
      ";\n";
    fs.writeFileSync("src/data/chapter5Levels.ts", text, "utf8");
    console.log("写入 src/data/chapter5Levels.ts");
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
