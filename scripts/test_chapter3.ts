import { CHAPTER3_SCHEDULE } from "../src/data/chapter3Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { applyHintAction, findHint } from "../src/utils/hint-engine";
import { isRuleLevelSolved, solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;
const levels = DEFAULT_LEVELS.filter((level) => level.id >= 41 && level.id <= 60);
const pars: number[] = [];

if (levels.length !== 20) {
  failed++;
  console.error(`✗ 第 3 章应有 20 关，实际 ${levels.length} 关`);
}

for (const spec of CHAPTER3_SCHEDULE) {
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

  const switches = level.tiles.filter((tile) => tile.type === "switch").length;
  const diodes = level.tiles.filter((tile) => tile.type === "diode").length;
  const sources = level.tiles.filter((tile) => tile.type === "battery").length;
  const gears = level.tiles.filter((tile) => tile.axisDir).length;
  const bulbs = level.tiles.filter((tile) => tile.type === "bulb").length;

  if (spec.mechanicTags.includes("weld") && !level.rules?.weld) {
    failed++;
    console.error(`✗ L${spec.id} 缺少焊死规则`);
  }
  if (spec.mechanicTags.includes("wrap") && !level.rules?.wrap) {
    failed++;
    console.error(`✗ L${spec.id} 缺少环面规则`);
  }
  if (spec.mechanicTags.includes("gear") && gears === 0) {
    failed++;
    console.error(`✗ L${spec.id} 缺少齿轮`);
  }
  if (spec.mechanicTags.includes("switch") && switches === 0) {
    failed++;
    console.error(`✗ L${spec.id} 缺少能量闸`);
  }
  if (spec.mechanicTags.includes("diode") && diodes === 0) {
    failed++;
    console.error(`✗ L${spec.id} 缺少单向阀`);
  }
  if (spec.mechanicTags.includes("multi-source") && sources < 2) {
    failed++;
    console.error(`✗ L${spec.id} 缺少多源`);
  }
  if (spec.mechanicTags.includes("goal") && (level.goal === undefined || level.goal >= bulbs)) {
    failed++;
    console.error(`✗ L${spec.id} 不是真实取舍关`);
  }
  if (spec.id === 59 && level.maxSteps !== solution.par) {
    failed++;
    console.error(`✗ L59 预算 ${level.maxSteps} 不等于 par ${solution.par}`);
  }
}

if (pars.length === 20) {
  const mean = pars.reduce((sum, par) => sum + par, 0) / pars.length;
  for (let index = 1; index < pars.length; index++) {
    const maxJump = index === pars.length - 1 ? 5 : 3;
    if (Math.abs(pars[index] - pars[index - 1]) > maxJump) {
      failed++;
      console.error(`✗ L${index + 41} 相邻 par 跳变过大`);
    }
  }
  if (pars.filter((par) => par >= mean + 2).length < 2) {
    failed++;
    console.error(`✗ 第 3 章峰关不足，章均 ${mean.toFixed(2)}`);
  }
  if (pars.filter((par) => par <= mean - 2).length < 1) {
    failed++;
    console.error(`✗ 第 3 章谷关不足，章均 ${mean.toFixed(2)}`);
  }
  const nonBossMax = Math.max(...pars.slice(0, -1));
  if (pars.at(-1)! < nonBossMax + 2) {
    failed++;
    console.error(`✗ L60 boss ${pars.at(-1)} 未高于次高 ${nonBossMax} + 2`);
  }
  console.log(`第 3 章 par：${pars.join(" / ")}；章均 ${mean.toFixed(2)}`);
}

if (!failed) console.log("[PASS] 第 3 章 20 关机制、曲线与提示通关通过");
process.exitCode = failed ? 1 : 0;
