/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 99 关难度曲线体检（只读，不改任何数据）
 *
 * 用法：
 *   npx tsx scripts/audit-difficulty.ts            # 终端报告
 *   npx tsx scripts/audit-difficulty.ts --md       # 输出 markdown 表
 *   npx tsx scripts/audit-difficulty.ts --strict   # 有硬性问题时 exit 1
 *
 * 判定口径（与设计文档 5.5 节一致）：
 *   par    = 顺时针最少点击数（4★ 线），由生成器写入 parSteps
 *   ratio  = maxSteps / par，衡量容错；低于 1.3 视为“手滑即死”
 *   噪声   = par 相对前后各 2 关中位数的偏离；超过 ±35% 视为曲线毛刺
 *   悬崖   = 相邻两关 par 比值 ≥ 2.0
 */

import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit } from '../src/utils/circuit';

interface Row {
  id: number;
  title: string;
  par: number;
  max: number;
  ratio: number;
  bulbs: number;
  lit0: number;
  switches: number;
  diodes: number;
  chapter: number;
  neighborMedian: number;
  deviation: number;
  jump: number;
}

const CHAPTER_FLOOR: Record<number, number> = { 1: 7, 2: 10, 3: 11, 4: 13, 5: 15 };
const CHAPTER_NAMES: Record<number, string> = {
  1: '地脉之根',
  2: '巨木之干',
  3: '苍翠繁枝',
  4: '云海天桥',
  5: '神树之巅',
};

function chapterOf(id: number): number {
  return Math.min(5, Math.ceil(id / 20));
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function buildRows(): Row[] {
  return DEFAULT_LEVELS.map((level, index) => {
    const sim = simulateCircuit(level.tiles, level.gridRows, level.gridCols);
    const par = level.parSteps && level.parSteps > 0 ? level.parSteps : 0;
    const window = DEFAULT_LEVELS.slice(Math.max(0, index - 2), Math.min(DEFAULT_LEVELS.length, index + 3))
      .map((l) => l.parSteps || 0)
      .filter((p) => p > 0);
    const neighborMedian = median(window);
    const prevPar = index > 0 ? DEFAULT_LEVELS[index - 1].parSteps || 0 : 0;
    return {
      id: level.id,
      title: level.title,
      par,
      max: level.maxSteps,
      ratio: par > 0 ? level.maxSteps / par : 0,
      bulbs: sim.totalBulbs,
      lit0: sim.litCount,
      switches: level.tiles.filter((t) => t.type === 'switch').length,
      diodes: level.tiles.filter((t) => t.type === 'diode').length,
      chapter: chapterOf(level.id),
      neighborMedian,
      deviation: neighborMedian > 0 ? (par - neighborMedian) / neighborMedian : 0,
      jump: prevPar > 0 ? par / prevPar : 0,
    };
  });
}

function trend(rows: Row[]): { slope: number; atFirst: number; atLast: number } {
  const n = rows.length;
  const meanX = (n - 1) / 2;
  const meanY = rows.reduce((s, r) => s + r.par, 0) / n;
  let num = 0;
  let den = 0;
  rows.forEach((r, i) => {
    num += (i - meanX) * (r.par - meanY);
    den += (i - meanX) ** 2;
  });
  const slope = den === 0 ? 0 : num / den;
  return { slope, atFirst: meanY - slope * meanX, atLast: meanY + slope * (n - 1 - meanX) };
}

function main() {
  const args = process.argv.slice(2);
  const asMarkdown = args.includes('--md');
  const strict = args.includes('--strict');
  const rows = buildRows();
  const fit = trend(rows);

  const budgetViolations = rows.filter((r) => r.ratio < 1.3);
  const floorViolations = rows.filter((r) => r.par > 0 && r.par < CHAPTER_FLOOR[r.chapter]);
  const cliffs = rows.filter((r) => r.jump >= 2.0);
  // L1 has no meaningful neighbourhood (there is nothing before it), so it is
  // excluded from the spike check by design.
  const spikes = rows.filter((r) => r.id > 1 && Math.abs(r.deviation) >= 0.35);

  if (asMarkdown) {
    const lines: string[] = [];
    lines.push('| 关 | 标题 | par | 预算 | 容错 | 花 | 初始亮 | 水闸 | 灵梭 | 邻域偏差 |');
    lines.push('|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|');
    for (const r of rows) {
      const dev = `${r.deviation >= 0 ? '+' : ''}${Math.round(r.deviation * 100)}%`;
      lines.push(
        `| ${r.id} | ${r.title} | ${r.par} | ${r.max} | ${r.ratio.toFixed(2)}× | ${r.bulbs} | ${r.lit0} | ${r.switches} | ${r.diodes} | ${dev} |`
      );
    }
    console.log(lines.join('\n'));
    return;
  }

  console.log('════ 99 关难度曲线体检 ════\n');

  for (let c = 1; c <= 5; c++) {
    const seg = rows.filter((r) => r.chapter === c);
    const avgPar = seg.reduce((s, r) => s + r.par, 0) / seg.length;
    const avgRatio = seg.reduce((s, r) => s + r.ratio, 0) / seg.length;
    const withSwitch = seg.filter((r) => r.switches > 0).length;
    const withDiode = seg.filter((r) => r.diodes > 0).length;
    const avgLit = seg.reduce((s, r) => s + r.lit0, 0) / seg.length;
    console.log(
      `第${c}章 ${CHAPTER_NAMES[c]}\t关数 ${seg.length}\t平均 par ${avgPar.toFixed(1)}\t` +
        `平均容错 ${avgRatio.toFixed(2)}×\t水闸关 ${withSwitch}\t灵梭关 ${withDiode}\t初始点亮 ${avgLit.toFixed(2)}`
    );
  }

  console.log(
    `\n趋势拟合：L1 ≈ ${fit.atFirst.toFixed(1)} 步 → L99 ≈ ${fit.atLast.toFixed(1)} 步` +
      `（每关 ${fit.slope >= 0 ? '+' : ''}${fit.slope.toFixed(3)}）`
  );
  console.log(`par 全局范围：${Math.min(...rows.map((r) => r.par))} ~ ${Math.max(...rows.map((r) => r.par))}`);

  console.log(`\n[硬性] 容错 < 1.30×：${budgetViolations.length} 关`);
  budgetViolations.forEach((r) => console.log(`   L${r.id} ${r.title}  par ${r.par} / 预算 ${r.max} = ${r.ratio.toFixed(2)}×`));

  console.log(`\n[硬性] 低于本章 par 下限：${floorViolations.length} 关`);
  floorViolations.forEach((r) =>
    console.log(`   L${r.id} ${r.title}  par ${r.par} < 第${r.chapter}章下限 ${CHAPTER_FLOOR[r.chapter]}`)
  );

  console.log(`\n[体验] 相邻悬崖 ≥ 2.0×：${cliffs.length} 处`);
  cliffs.forEach((r) => console.log(`   L${r.id - 1} → L${r.id} ${r.title}  ${r.jump.toFixed(1)}×（par ${Math.round(r.par / r.jump)} → ${r.par}）`));

  console.log(`\n[体验] 曲线毛刺（邻域偏差 ≥ ±35%）：${spikes.length} 关`);
  spikes.forEach((r) =>
    console.log(`   L${r.id} ${r.title}  par ${r.par}，邻域中位 ${r.neighborMedian.toFixed(0)}，偏差 ${Math.round(r.deviation * 100)}%`)
  );

  const tightest = [...rows].sort((a, b) => a.ratio - b.ratio).slice(0, 5);
  const loosest = [...rows].sort((a, b) => b.ratio - a.ratio).slice(0, 5);
  console.log(`\n最紧：${tightest.map((r) => `L${r.id} ${r.ratio.toFixed(2)}×`).join('  ')}`);
  console.log(`最松：${loosest.map((r) => `L${r.id} ${r.ratio.toFixed(2)}×`).join('  ')}`);

  const hardIssues = budgetViolations.length + floorViolations.length;
  console.log(`\n结论：硬性问题 ${hardIssues} 项，体验问题 ${cliffs.length + spikes.length} 项。`);
  if (strict && hardIssues > 0) process.exit(1);
}

main();
