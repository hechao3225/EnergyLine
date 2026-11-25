/**
 * 实验关 / 生成关的 par 体检与复核。
 */
import { LAB_LEVELS } from '../src/data/labLevels';
import { applyRuleSolution, isRuleLevelSolved, solveRuleLevel } from '../src/utils/rule-solver';

let bad = 0;
for (const level of LAB_LEVELS) {
  if (level.tiles.some((tile) => tile.type === 'rotor')) {
    console.log(`• ${level.code} ${level.title}：动态机关由 test_rotor.ts 验证`);
    continue;
  }
  const axes = new Set(level.tiles.map((t) => t.axis).filter(Boolean));
  const sol = solveRuleLevel(level);
  const declared = level.parSteps ?? 0;
  if (!sol) {
    console.log(`✗ ${level.code} 无解`);
    bad++;
    continue;
  }
  const ok = isRuleLevelSolved(level, applyRuleSolution(level, sol));
  const match = declared === sol.par;
  if (!match || !ok) bad++;
  console.log(
    `${ok && match ? '✓' : '✗'} ${level.code} ${level.title}（${axes.size} 组）：par ${sol.par}，数据 ${declared}${match ? '' : ' ✗'}，相位 ${JSON.stringify(sol.phases)}，预算 ${level.maxSteps}`,
  );
}
process.exitCode = bad;
