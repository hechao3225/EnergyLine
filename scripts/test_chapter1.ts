import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { CHAPTER1_SCHEDULE } from "../src/data/chapter1Schedule";
import { findHint, applyHintAction } from "../src/utils/hint-engine";
import { isRuleLevelSolved, solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;
const levels = DEFAULT_LEVELS.filter((level) => level.id <= 20);

if (levels.length !== 20) {
  failed++;
  console.error(`✗ 第 1 章应有 20 关，实际 ${levels.length} 关`);
}

const pars: number[] = [];
for (const spec of CHAPTER1_SCHEDULE) {
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
    console.error(
      `✗ L${spec.id} par ${solution.par} 超出目标 ${spec.parMin}–${spec.parMax}`,
    );
  }
  pars.push(solution.par);

  let tiles = level.tiles.map((tile) => ({ ...tile }));
  let steps = 0;
  while (!isRuleLevelSolved(level, tiles)) {
    const move = findHint(level, tiles, level.maxSteps - steps);
    if (!move) {
      failed++;
      console.error(`✗ L${spec.id} 在第 ${steps} 步失去提示`);
      break;
    }
    tiles = applyHintAction(level, tiles, move);
    steps++;
  }
  if (steps !== solution.par) {
    failed++;
    console.error(`✗ L${spec.id} 提示通关 ${steps} 步，求解 par ${solution.par}`);
  }

  const axisCount = new Set(level.tiles.map((tile) => tile.axis).filter(Boolean)).size;
  const switchCount = level.tiles.filter((tile) => tile.type === "switch").length;
  const diodeCount = level.tiles.filter((tile) => tile.type === "diode").length;
  const sourceCount = level.tiles.filter((tile) => tile.type === "battery").length;

  if (spec.primaryMechanic === "axis" && axisCount === 0) {
    failed++;
    console.error(`✗ L${spec.id} 主机制为联动轴，但没有轴组`);
  }
  if (spec.mechanicTags.includes("wrap") && !level.rules?.wrap) {
    failed++;
    console.error(`✗ L${spec.id} 标签含环面，但没有 wrap`);
  }
  if (spec.mechanicTags.includes("switch") && switchCount === 0) {
    failed++;
    console.error(`✗ L${spec.id} 标签含能量闸，但没有闸`);
  }
  if (spec.mechanicTags.includes("diode") && diodeCount === 0) {
    failed++;
    console.error(`✗ L${spec.id} 标签含单向阀，但没有阀`);
  }
  if (spec.mechanicTags.includes("multi-source") && sourceCount < 2) {
    failed++;
    console.error(`✗ L${spec.id} 标签含多源，但只有 ${sourceCount} 个源`);
  }
}

if (pars.length === 20) {
  const mean = pars.reduce((sum, par) => sum + par, 0) / pars.length;
  for (let i = 1; i < pars.length; i++) {
    const maxJump = i === pars.length - 1 ? 5 : 3;
    if (Math.abs(pars[i] - pars[i - 1]) > maxJump) {
      failed++;
      console.error(
        `✗ L${i + 1} 相邻 par 跳变 ${pars[i - 1]} → ${pars[i]}（上限 ${maxJump}）`,
      );
    }
  }
  if (pars.filter((par) => par >= mean + 2).length < 2) {
    failed++;
    console.error(`✗ 第 1 章峰关不足 2 个，章均 ${mean.toFixed(2)}`);
  }
  if (pars.filter((par) => par <= mean - 2).length < 1) {
    failed++;
    console.error(`✗ 第 1 章谷关不足 1 个，章均 ${mean.toFixed(2)}`);
  }
  console.log(`第 1 章 par：${pars.join(" / ")}；章均 ${mean.toFixed(2)}`);
}

if (!failed) console.log("[PASS] 第 1 章 20 关机制、曲线与提示通关通过");
process.exitCode = failed ? 1 : 0;
