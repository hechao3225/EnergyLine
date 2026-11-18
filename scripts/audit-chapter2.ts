import { CHAPTER2_SCHEDULE } from "../src/data/chapter2Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { scoreBurden } from "../src/utils/burden";
import { solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;

for (const spec of CHAPTER2_SCHEDULE) {
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
  const gears = new Set(
    level.tiles
      .filter((tile) => tile.axisDir)
      .map((tile) => tile.axis)
      .filter(Boolean),
  ).size;
  const axes = new Set(
    level.tiles
      .filter((tile) => tile.axis && !tile.axisDir)
      .map((tile) => tile.axis)
      .filter(Boolean),
  ).size;
  const switches = level.tiles.filter((tile) => tile.type === "switch").length;
  const diodes = level.tiles.filter((tile) => tile.type === "diode").length;
  const sources = level.tiles.filter((tile) => tile.type === "battery").length;
  console.log(
    `[PASS] L${String(spec.id).padStart(2, "0")} ${spec.primaryMechanic.padEnd(12)} par ${String(solution.par).padStart(2)}  op ${burden.op.toFixed(1)}  rule ${burden.rule.toFixed(1)}  irr ${burden.irr.toFixed(1)}  scan ${burden.scan.toFixed(1)}  ch ${String(burden.challenge).padStart(3)}  gear ${gears}  axis ${axes}  sw ${switches}  di ${diodes}  src ${sources}`,
  );
}

console.log(`\n第 2 章审计：${CHAPTER2_SCHEDULE.length - failed}/${CHAPTER2_SCHEDULE.length} 通过`);
process.exitCode = failed ? 1 : 0;
