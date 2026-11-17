import { PHASE0_SLICES } from "../src/data/phase0Levels";
import { scoreBurden } from "../src/utils/burden";
import { solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;

for (const slice of PHASE0_SLICES) {
  const solution = solveRuleLevel(slice.level);
  if (!solution) {
    failed++;
    console.error(`✗ ${slice.key} 没有规则解，无法评分`);
    continue;
  }
  const score = scoreBurden(slice.level, solution);
  for (const key of ["op", "rule", "irr", "scan"] as const) {
    if (score[key] < 1 || score[key] > 5) {
      failed++;
      console.error(`✗ ${slice.key} ${key}=${score[key]} 超出 1–5`);
    }
  }
  if (score.challenge < 20 || score.challenge > 100) {
    failed++;
    console.error(`✗ ${slice.key} challenge=${score.challenge} 超出 20–100`);
  }
  console.log(
    `${slice.key.padEnd(14)} op ${score.op.toFixed(1)} rule ${score.rule.toFixed(1)} irr ${score.irr.toFixed(1)} scan ${score.scan.toFixed(1)} challenge ${score.challenge} seams ${score.seamCount}`,
  );
}

const wrap = PHASE0_SLICES.find((slice) => slice.key === "wrap-weld");
const weld = PHASE0_SLICES.find((slice) => slice.key === "weld-order");
const colors = PHASE0_SLICES.find((slice) => slice.key === "colors");
const colorsWeld = PHASE0_SLICES.find((slice) => slice.key === "colors-weld");

if (!wrap || !weld || !colors || !colorsWeld) {
  failed++;
  console.error("✗ 缺少负担对比切片");
} else {
  const wrapSolution = solveRuleLevel(wrap.level)!;
  const weldSolution = solveRuleLevel(weld.level)!;
  const colorsSolution = solveRuleLevel(colors.level)!;
  const colorsWeldSolution = solveRuleLevel(colorsWeld.level)!;
  const wrapScore = scoreBurden(wrap.level, wrapSolution);
  const weldScore = scoreBurden(weld.level, weldSolution);
  const colorsScore = scoreBurden(colors.level, colorsSolution);
  const colorsWeldScore = scoreBurden(colorsWeld.level, colorsWeldSolution);

  if (wrapScore.seamCount < 1) {
    failed++;
    console.error("✗ 跨缝组合没有读到最优解的穿缝边");
  }
  if (wrapScore.rule <= weldScore.rule) {
    failed++;
    console.error("✗ 环面+焊死的规则负担没有高于纯焊死");
  }
  if (colorsWeldScore.irr <= colorsScore.irr) {
    failed++;
    console.error("✗ 双色+焊死的不可逆负担没有高于纯双色");
  }
}

if (!failed) console.log("[PASS] Phase 0 四类负担与跨缝强度评分通过");
process.exitCode = failed ? 1 : 0;
