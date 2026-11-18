import { CHAPTER5_SCHEDULE } from "../src/data/chapter5Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { applyHintAction, findHint } from "../src/utils/hint-engine";
import { applyRuleSolution, isRuleLevelSolved, solveRuleLevel } from "../src/utils/rule-solver";
import { simulateCircuit } from "../src/utils/circuit";

let failed = 0;
const levels = DEFAULT_LEVELS.filter((level) => level.id >= 81 && level.id <= 99);
const pars: number[] = [];

if (levels.length !== 19) {
  failed++;
  console.error(`✗ 第 5 章应有 19 关，实际 ${levels.length} 关`);
}

for (const spec of CHAPTER5_SCHEDULE) {
  const level = levels.find((item) => item.id === spec.id);
  if (!level) {
    failed++;
    console.error(`✗ L${spec.id} 缺失`);
    continue;
  }
  const solution = solveRuleLevel(level);
  if (!solution) {
    failed++;
    console.error(`✗ L${spec.id} 无规则解`);
    continue;
  }
  if (solution.par < spec.parMin || solution.par > spec.parMax) {
    failed++;
    console.error(`✗ L${spec.id} par ${solution.par} 超出 ${spec.parMin}–${spec.parMax}`);
  }
  pars.push(solution.par);

  const applied = applyRuleSolution(level, solution);
  if (!isRuleLevelSolved(level, applied)) {
    failed++;
    console.error(`✗ L${spec.id} 规则解回放失败`);
  }
  const sim = simulateCircuit(applied, level.gridRows, level.gridCols, level.rules);
  const seamCount = [...sim.poweredEdges].filter((edge) => {
    const [from, to] = edge.split("->");
    const [r1, c1] = from.split(",").map(Number);
    const [r2, c2] = to.split(",").map(Number);
    return Math.abs(r1 - r2) > 1 || Math.abs(c1 - c2) > 1;
  }).length;

  let tiles = level.tiles.map((tile) => ({ ...tile }));
  let steps = 0;
  while (!isRuleLevelSolved(level, tiles)) {
    const move = findHint(level, tiles, level.maxSteps - steps);
    if (!move) {
      failed++;
      console.error(`✗ L${spec.id} 第 ${steps} 步失去提示`);
      break;
    }
    tiles = applyHintAction(level, tiles, move);
    steps++;
  }
  if (steps !== solution.par) {
    failed++;
    console.error(`✗ L${spec.id} 提示 ${steps} 步，par ${solution.par}`);
  }

  const gears = level.tiles.filter((tile) => tile.axisDir).length;
  const bulbs = level.tiles.filter((tile) => tile.type === "bulb").length;
  if (spec.mechanicTags.includes("wrap") && (!level.rules?.wrap || seamCount === 0)) {
    failed++;
    console.error(`✗ L${spec.id} 缺少真实穿缝`);
  }
  if (spec.mechanicTags.includes("weld") && !level.rules?.weld) {
    failed++;
    console.error(`✗ L${spec.id} 缺少焊死`);
  }
  if (spec.mechanicTags.includes("colors") && !level.rules?.colors) {
    failed++;
    console.error(`✗ L${spec.id} 缺少双色`);
  }
  if (spec.mechanicTags.includes("gear") && gears === 0) {
    failed++;
    console.error(`✗ L${spec.id} 缺少齿轮`);
  }
  if (spec.mechanicTags.includes("goal") && (level.goal === undefined || level.goal >= bulbs)) {
    failed++;
    console.error(`✗ L${spec.id} 不是真实取舍关`);
  }
  if (spec.mechanicTags.includes("7x7") && (level.gridRows !== 7 || level.gridCols !== 7)) {
    failed++;
    console.error(`✗ L${spec.id} 不是 7×7 盘面`);
  }
}

if (pars.length === 19) {
  const mean = pars.reduce((sum, par) => sum + par, 0) / pars.length;
  for (let index = 1; index < pars.length; index++) {
    const maxJump = index === pars.length - 1 ? 5 : 3;
    if (Math.abs(pars[index] - pars[index - 1]) > maxJump) {
      failed++;
      console.error(`✗ L${index + 81} 相邻 par 跳变过大`);
    }
  }
  if (pars.filter((par) => par >= mean + 2).length < 2) {
    failed++;
    console.error(`✗ 第 5 章峰关不足，章均 ${mean.toFixed(2)}`);
  }
  if (pars.filter((par) => par <= mean - 2).length < 1) {
    failed++;
    console.error(`✗ 第 5 章谷关不足，章均 ${mean.toFixed(2)}`);
  }
  const nonBossMax = Math.max(...pars.slice(0, -1));
  if (pars.at(-1)! < nonBossMax + 2) {
    failed++;
    console.error(`✗ L99 boss ${pars.at(-1)} 未高于次高 ${nonBossMax} + 2`);
  }
  console.log(`第 5 章 par：${pars.join(" / ")}；章均 ${mean.toFixed(2)}`);
}

if (!failed) console.log("[PASS] 第 5 章 19 关机制、曲线与提示通关通过");
process.exitCode = failed ? 1 : 0;
