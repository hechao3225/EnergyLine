import { CHAPTER4_SCHEDULE } from "../src/data/chapter4Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { scoreBurden } from "../src/utils/burden";
import { solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;

for (const spec of CHAPTER4_SCHEDULE) {
  const level = DEFAULT_LEVELS.find((item) => item.id === spec.id);
  const solution = level ? solveRuleLevel(level) : null;
  if (!level || !solution || solution.par !== level.parSteps) {
    failed++;
    console.error(
      `[FAIL] L${spec.id} ${spec.title}：数据 ${level?.parSteps ?? "-"} / 求解 ${solution?.par ?? "-"}`,
    );
    continue;
  }
  const burden = scoreBurden(level, solution);
  console.log(
    `[PASS] L${String(spec.id).padStart(2, "0")} ${spec.primaryMechanic.padEnd(12)} par ${String(solution.par).padStart(2)}  op ${burden.op.toFixed(1)}  rule ${burden.rule.toFixed(1)}  irr ${burden.irr.toFixed(1)}  scan ${burden.scan.toFixed(1)}  ch ${String(burden.challenge).padStart(3)}  seams ${burden.seamCount}`,
  );
}

console.log(`\n第 4 章审计：${CHAPTER4_SCHEDULE.length - failed}/${CHAPTER4_SCHEDULE.length} 通过`);
process.exitCode = failed ? 1 : 0;
