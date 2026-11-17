import { PHASE0_SLICES } from "../src/data/phase0Levels";
import { simulateCircuit } from "../src/utils/circuit";
import { applyHintAction, findHint, supportsHintEngine } from "../src/utils/hint-engine";
import { applyRuleSolution, isRuleLevelSolved, solveRuleLevel } from "../src/utils/rule-solver";

let failed = 0;

for (const slice of PHASE0_SLICES) {
  const { level } = slice;
  if (!supportsHintEngine(level)) {
    failed++;
    console.error(`✗ ${slice.key}（${slice.level.code}）仍被提示引擎拒绝`);
    continue;
  }

  const solution = solveRuleLevel(level);
  if (!solution) {
    failed++;
    console.error(`✗ ${slice.key}（${level.code}）没有规则解`);
    continue;
  }
  if (solution.par !== level.parSteps) {
    failed++;
    console.error(
      `✗ ${slice.key}（${level.code}）规则 par ${solution.par}，数据 ${level.parSteps}`,
    );
    continue;
  }

  const solvedTiles = applyRuleSolution(level, solution);
  if (!isRuleLevelSolved(level, solvedTiles)) {
    const sim = simulateCircuit(
      solvedTiles,
      level.gridRows,
      level.gridCols,
      level.rules,
    );
    failed++;
    console.error(
      `✗ ${slice.key}（${level.code}）规则解只亮 ${sim.litCount}/${level.goal ?? sim.totalBulbs}`,
    );
    continue;
  }

  let tiles = level.tiles.map((tile) => ({ ...tile }));
  let steps = 0;
  while (!isRuleLevelSolved(level, tiles)) {
    const move = findHint(level, tiles, level.maxSteps - steps);
    if (!move) {
      failed++;
      console.error(`✗ ${slice.key}（${level.code}）在第 ${steps} 步失去提示`);
      break;
    }
    tiles = applyHintAction(level, tiles, move);
    steps++;
    if (steps > level.maxSteps) {
      failed++;
      console.error(`✗ ${slice.key}（${level.code}）按提示超过预算`);
      break;
    }
  }
  if (steps !== solution.par) {
    failed++;
    console.error(
      `✗ ${slice.key}（${level.code}）按提示 ${steps} 步通关，精确 par ${solution.par}`,
    );
    continue;
  }
  console.log(
    `✓ ${slice.key} ${level.code}：par ${solution.par}，提示 ${steps} 步通关`,
  );
}

if (!failed) console.log(`[PASS] ${PHASE0_SLICES.length} 个 Phase 0 切片精确且提示可通关`);
process.exitCode = failed ? 1 : 0;
