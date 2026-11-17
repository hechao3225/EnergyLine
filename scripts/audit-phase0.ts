import { PHASE0_SLICES } from "../src/data/phase0Levels";
import { scoreBurden } from "../src/utils/burden";
import { applyRuleSolution, isRuleLevelSolved, solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;

for (const slice of PHASE0_SLICES) {
  const solution = solveRuleLevel(slice.level);
  const solved = solution
    ? isRuleLevelSolved(slice.level, applyRuleSolution(slice.level, solution))
    : false;
  if (!solution || !solved || solution.par !== slice.level.parSteps) {
    failed++;
    console.error(
      `[FAIL] ${slice.key} ${slice.level.code} par ${solution?.par ?? "-"} / ${slice.level.parSteps} solved=${solved}`,
    );
    continue;
  }
  const burden = scoreBurden(slice.level, solution);
  console.log(
    `[PASS] ${slice.key.padEnd(14)} ${slice.level.code.padEnd(3)} par ${String(solution.par).padStart(2)}  seams ${String(burden.seamCount).padStart(2)}  op ${burden.op.toFixed(1)}  rule ${burden.rule.toFixed(1)}  irr ${burden.irr.toFixed(1)}  scan ${burden.scan.toFixed(1)}  challenge ${String(burden.challenge).padStart(3)}`,
  );
}

console.log(`\nPhase 0 规则与负担审计：${PHASE0_SLICES.length - failed}/${PHASE0_SLICES.length} 通过`);
process.exitCode = failed ? 1 : 0;
