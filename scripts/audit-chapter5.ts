import { CHAPTER5_SCHEDULE } from "../src/data/chapter5Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { scoreBurden } from "../src/utils/burden";
import { solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;

for (const spec of CHAPTER5_SCHEDULE) {
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
    `[PASS] L${String(spec.id).padStart(2, "0")} ${spec.primaryMechanic.padEnd(12)} par ${String(solution.par).padStart(2)}  op ${burden.op.toFixed(1)}  rule ${burden.rule.toFixed(1)}  irr ${burden.irr.toFixed(1)}  scan ${burden.scan.toFixed(1)}  ch ${String(burden.challenge).padStart(3)}  ${level.gridRows}×${level.gridCols}`,
  );
}

console.log(`\n第 5 章审计：${CHAPTER5_SCHEDULE.length - failed}/${CHAPTER5_SCHEDULE.length} 通过`);
process.exitCode = failed ? 1 : 0;
