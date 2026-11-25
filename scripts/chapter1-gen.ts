import fs from "node:fs";
import type { LevelConfig, Tile, TileType } from "../src/types/game";
import { CHAPTER1_SCHEDULE, type Chapter1Spec } from "../src/data/chapter1Schedule";
import { TORUS_TEST_LEVELS } from "../src/data/torusLevels";
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from "../src/utils/circuit";
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
import { solveMinTaps } from "../src/utils/hint-solver";
import { generate as generateAxisLevel } from "./axis-gen";
import { scrambleSolved } from "./level-builders";
import { applyLevelRepairs } from "./chapter-repairs";
import { applyDecoyRevives } from "./decoy-revives";

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


/**
 * L3「售票亭」诱饵拓扑（2026-11-22 设计反馈落地 · 第二轮）。
 *
 * 上排长管是一条“看着像主路”的假主路，但**初始是断的**：三通把上排接进主干，
 * 末端 (0,4) 的弯管故意反着放，玩家要自己转 180° 才能把这条假主路接出去。
 * 接出去也只够点亮最右上那一盏灯；另外两盏仍要从 (3,4) 十字枢纽分流，
 * 而分流的代价是把 (2,2) 转 270°、主动放弃刚接好的上排。
 *
 * 上排不再放任何装饰锁：锁在上排没有任何约束意义，还会挡住玩家自己接线。
 */
function applyL3TopLineDecoy(level: LevelConfig): LevelConfig {
  if (level.id !== 3) return level;
  const tiles = level.tiles.map((tile) => ({ ...tile }));
  const at = (row: number, col: number) => {
    const tile = tiles.find((item) => item.row === row && item.col === col);
    if (!tile) throw new Error(`L3 缺少 (${row},${col}) 格`);
    return tile;
  };

  // (0,2)：直管改成三通，上排长管真的接进主干。
  const trunk = at(0, 2);
  trunk.type = "t_shape";
  trunk.basePorts = getDefaultBasePorts("t_shape");
  trunk.rotation = 0; // LEFT | RIGHT | DOWN
  trunk.locked = false;

  // (0,4)：弯管故意反着放（UP | RIGHT），上排在末端断开；
  // 玩家自己转两下（180°）成 LEFT | DOWN，才把假主路接到 (1,4) 竖管。
  const bend = at(0, 4);
  bend.type = "corner";
  bend.basePorts = getDefaultBasePorts("corner");
  bend.rotation = 270; // UP | RIGHT：初始断口
  bend.locked = false;

  // 上排不再放装饰锁：这里没有需要固定的东西，锁只会挡住玩家自己接线。
  at(0, 1).locked = false;

  // (2,2) 起手朝上：修好 (2,1) 后上排先亮起来，形成“上面这条是主路”的错觉。
  at(2, 2).rotation = 180; // LEFT | UP
  // (3,2) 预对齐主干，抵掉 (2,2) 多转的一下，par 维持 9。
  at(3, 2).rotation = 270; // UP | RIGHT

  const solution = solveRuleLevel({ ...level, tiles });
  if (!solution) throw new Error("L3 诱饵拓扑无解");
  const initial = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
  if (initial.litCount > 0) throw new Error("L3 诱饵拓扑不应开局点亮设施");
  return { ...level, tiles, parSteps: solution.par, maxSteps: solution.par + 3 };
}

/**
 * L4「气球摊」双源假主干（2026-11-22 设计反馈落地）。
 *
 * 旧盘面看着有两个能源头，但底源 (4,0) 被 (4,2) 的空格封死，一盏都点不亮；
 * 玩家扫一眼就知道“只有上面那条路”。现在把 (4,2) 补成可转直管：
 * - 顶源仍然能独亮全部 5 盏，par 不变；
 * - 底源也能接出一条真路，六步点亮 4 盏，只差最右下那一盏；
 * - 想补第 5 盏就必须放弃底路、改用顶源——(4,4) 的左边和右边只能二选一。
 * 先走底路的玩家会付一步代价（4★ → 3★），但不会被预算卡死。
 */
function applyL4DualSourceDecoy(level: LevelConfig): LevelConfig {
  if (level.id !== 4) return level;
  const tiles = level.tiles.map((tile) => ({ ...tile }));
  const at = (row: number, col: number) => {
    const tile = tiles.find((item) => item.row === row && item.col === col);
    if (!tile) throw new Error(`L4 缺少 (${row},${col}) 格`);
    return tile;
  };

  // (4,2)：空格改成可转直管，底源终于有一条能走的路；起手竖放，露一点“还没对准”的破绽。
  const lane = at(4, 2);
  lane.type = "line";
  lane.basePorts = getDefaultBasePorts("line");
  lane.rotation = 90; // UP | DOWN
  lane.locked = false;

  const decoy: LevelConfig = { ...level, tiles };
  const solution = solveRuleLevel(decoy);
  if (!solution) throw new Error("L4 双源诱饵拓扑无解");
  const initial = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
  if (initial.litCount > 0) throw new Error("L4 双源诱饵拓扑不应开局点亮设施");

  // 设计契约：顶源独亮全部，底源只差一盏。
  const batteries = tiles
    .filter((tile) => tile.type === "battery")
    .sort((a, b) => a.row - b.row);
  if (batteries.length !== 2) throw new Error("L4 应有两个能源头");
  const onlySource = (keepId: string): LevelConfig => ({
    ...decoy,
    tiles: tiles.map((tile): Tile =>
      tile.type === "battery" && tile.id !== keepId
        ? { ...tile, type: "empty", basePorts: 0, locked: false }
        : tile,
    ),
  });
  const bulbs = tiles.filter((tile) => tile.type === "bulb").length;
  const maxLitOf = (restricted: LevelConfig): number => {
    for (let need = bulbs; need >= 1; need--) {
      try {
        solveMinTaps({ ...restricted, goal: need });
        return need;
      } catch {
        // 这一档接不满，继续往下退
      }
    }
    return 0;
  };
  const topMax = maxLitOf(onlySource(batteries[0].id));
  const bottomMax = maxLitOf(onlySource(batteries[1].id));
  if (topMax !== bulbs) throw new Error(`L4 顶源应能独亮 ${bulbs} 盏，实际 ${topMax}`);
  if (bottomMax !== bulbs - 1) throw new Error(`L4 底源应只差一盏（${bulbs - 1}），实际 ${bottomMax}`);

  return { ...level, tiles, parSteps: solution.par, maxSteps: solution.par + 3 };
}

/**
 * L11「报时钟楼·报时」拓扑修复（2026-11-22 设计反馈落地）。
 *
 * 旧底盘复用了旧图谱 L6，而那份数据把中央「能量源」写成了四向端口（basePorts 15）。
 * 但美术与端口审计（scripts/audit_pipe_ports.py 的 EXPECTED.source）都规定能量源
 * 只有朝右的一个接口，玩家看到的就是“源朝右、上下左右却都能亮”的破规现象。
 *
 * 修法：
 * - 中央四向元件换成合法的十字管（十字管本来就四面同形、锁死不转的枢纽）；
 * - 能量源改成单口叶片，贴在枢纽左侧朝右供能；
 * - 左臂那盏设施挪到右支路的三通上，保留 4 设施 / 3 条诱饵死路 / par 9 的手感。
 */
const L11_SOLVED_GRID: Array<[number, number, TileType, number]> = [
  // [row, col, type, 解态端口]；端口掩码 UP=1 RIGHT=2 DOWN=4 LEFT=8
  [0, 1, "corner", 6], // DOWN | RIGHT
  [0, 2, "bulb", 15],
  [1, 1, "corner", 3], // UP | RIGHT
  [1, 2, "corner", 12], // LEFT | DOWN
  [1, 3, "corner", 12], // 诱饵：向左下探的断头弯管
  [2, 1, "battery", 2], // 单口能量源，朝右
  [2, 2, "cross", 15], // 中央枢纽
  [2, 3, "line", 10], // LEFT | RIGHT
  [2, 4, "t_shape", 14], // LEFT | RIGHT | DOWN：右通设施、下接设施
  [2, 5, "bulb", 15],
  [3, 1, "corner", 3], // 诱饵
  [3, 2, "line", 5], // UP | DOWN
  [3, 3, "corner", 9], // 诱饵：UP | LEFT
  [3, 4, "bulb", 15],
  [4, 2, "cross", 15],
  [5, 2, "bulb", 15],
];

function solvedRotationOf(type: TileType, wantPorts: number): number {
  const base = getDefaultBasePorts(type);
  for (let steps = 0; steps < 4; steps++) {
    if (rotatePorts(base, steps * 90) === wantPorts) return steps * 90;
  }
  throw new Error(type + " 转不出端口 " + wantPorts);
}

function buildL11SolvedTiles(): Tile[] {
  const tiles: Tile[] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const entry = L11_SOLVED_GRID.find(([r, c]) => r === row && c === col);
      if (!entry) {
        tiles.push({ id: "t-" + row + "-" + col, row, col, type: "empty", rotation: 0, basePorts: 0 });
        continue;
      }
      const [, , type, wantPorts] = entry;
      tiles.push({
        id: "t-" + row + "-" + col,
        row,
        col,
        type,
        rotation: solvedRotationOf(type, wantPorts),
        basePorts: getDefaultBasePorts(type),
        locked: type === "bulb" || type === "battery",
      });
    }
  }
  return tiles;
}

function buildL11(spec: Chapter1Spec): LevelConfig {
  const solved = buildL11SolvedTiles();
  const preview = simulateCircuit(solved, 6, 6);
  const bulbs = solved.filter((tile) => tile.type === "bulb").length;
  if (preview.litCount !== bulbs) {
    throw new Error("L11 解态只点亮 " + preview.litCount + "/" + bulbs + " 处设施");
  }
  // 目标 par 锁定成排期值，避免搜到 8/10 步把结算文案带偏。
  const level = scrambleSolved(
    { id: spec.id, targetPar: spec.targetPar, parMin: spec.targetPar, parMax: spec.targetPar },
    solved,
    { tolerance: 3 },
  );
  // 打乱会累出 450°/720° 这类朝向值，统一折回 0–270，盘面指纹和存档都干净。
  const normalized: LevelConfig = {
    ...level,
    tiles: level.tiles.map((tile) => ({
      ...tile,
      rotation: ((tile.rotation % 360) + 360) % 360,
    })),
  };
  // 本关没有领域规则，别让 scrambleSolved 塞进来的空对象污染盘面指纹。
  delete normalized.rules;
  return withScheduleMeta(normalized, spec, 3);
}
function buildChapter1(): LevelConfig[] {
  return CHAPTER1_SCHEDULE.map((spec) => {
    if (spec.id === 11) return buildL11(spec);
    if (spec.primaryMechanic === "axis") return buildAxis(spec);
    if (spec.mechanicTags.includes("wrap")) return buildWrap(spec);
    if (spec.primaryMechanic === "multi-source") {
      return buildMultiSourceLevel(spec);
    }
    return buildBasic(spec);
  })
    .sort((a, b) => a.id - b.id)
    .map(applyL3TopLineDecoy);
}

const chapter = applyDecoyRevives(applyLevelRepairs(buildChapter1()).map(applyL4DualSourceDecoy));
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
