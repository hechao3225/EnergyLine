/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 99 关难度梯度体检（只读，不改关卡数据）。
 *
 * 与 scripts/audit-difficulty.ts 的分工：
 *   - audit-difficulty 看「单关是否合规」（容错、下限、悬崖、毛刺）；
 *   - 本脚本看「89 关连起来像不像一条曲线」：平台、章缝、大考回落、机制密度。
 *
 * 口径：
 *   硬关 = maxSteps - parSteps <= 1（零容错设计），共 10 关：
 *          取舍关 10/30/50/70/90 + 全亮关 20/40/60/80/99
 *   地狱 = tier === 'hell'：60/80/99（与硬关重叠，去重后常规关 89 关）
 *
 * 用法：npx tsx scripts/audit-gradient.ts [--md]
 */
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit } from '../src/utils/circuit';
import { getLevelContent } from '../src/content';

const HARD = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);
const CHAPTER_TARGET: Record<number, [number, number, number, number]> = {
  1: [7, 19, 7, 12],
  2: [21, 39, 11, 16],
  3: [41, 59, 14, 19],
  4: [61, 79, 16, 21],
  5: [81, 98, 18, 24],
};

interface Row {
  id: number;
  title: string;
  par: number;
  max: number;
  ratio: number;
  goal: number;
  bulbs: number;
  src: number;
  sw: number;
  di: number;
  cross: number;
  col: number;
  cyc: number;
  ax: number;
  chapter: number;
  hell: boolean;
}

const rows: Row[] = DEFAULT_LEVELS.map((level) => {
  const sim = simulateCircuit(level.tiles, level.gridRows, level.gridCols);
  const count = (type: string) => level.tiles.filter((t) => t.type === type).length;
  const par = level.parSteps ?? 0;
  return {
    id: level.id,
    title: getLevelContent(level.id)?.title ?? `L${level.id}`,
    par,
    max: level.maxSteps,
    ratio: par > 0 ? level.maxSteps / par : 0,
    goal: level.goal ?? sim.totalBulbs,
    bulbs: sim.totalBulbs,
    src: count('battery'),
    sw: count('switch'),
    di: count('diode'),
    cross: count('cross'),
    col: level.rules?.colors ? 1 : 0,
    cyc: level.rules?.noCycle ? 1 : 0,
    ax: new Set(level.tiles.filter((t) => t.axis).map((t) => t.axis!)).size > 0 ? 1 : 0,
    chapter: Math.min(5, Math.ceil(level.id / 20)),
    hell: level.tier === 'hell',
  };
});

const normal = rows.filter((r) => !HARD.has(r.id));
const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;
const median = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function report() {
  console.log('════ 99 关难度梯度体检（排除 10 个硬关）════\n');
  console.log(`硬关 10：${[...HARD].join(' / ')}（含地狱 60/80/99，去重后常规 ${normal.length} 关）\n`);

  console.log('章 | 常规关 | par 均值 | 标准差 | 范围 | 前半 | 后半 | 大考 | 目标带 | 均值偏离 | 灯泡 | 源 | par/泡');
  for (let c = 1; c <= 5; c++) {
    const seg = normal.filter((r) => r.chapter === c);
    const pars = seg.map((r) => r.par);
    const half = Math.floor(seg.length / 2);
    const exam = rows.find((r) => r.id === c * 20) ?? null;
    const bandMid = (CHAPTER_TARGET[c][2] + CHAPTER_TARGET[c][3]) / 2;
    const dev = ((mean(pars) - bandMid) / bandMid) * 100;
    console.log(
      [c, seg.length, mean(pars).toFixed(2), Math.sqrt(mean(pars.map((p) => (p - mean(pars)) ** 2))).toFixed(2),
        `${Math.min(...pars)}-${Math.max(...pars)}`, mean(pars.slice(0, half)).toFixed(2), mean(pars.slice(-half)).toFixed(2),
        exam ? exam.par : '-', `[${CHAPTER_TARGET[c][2]},${CHAPTER_TARGET[c][3]}]`,
        `${dev >= 0 ? '+' : ''}${dev.toFixed(0)}%`, mean(seg.map((r) => r.bulbs)).toFixed(2),
        mean(seg.map((r) => r.src)).toFixed(2), (seg.reduce((s, r) => s + r.par, 0) / seg.reduce((s, r) => s + r.bulbs, 0)).toFixed(2)
      ].join(' | ')
    );
  }

  const outBand = normal.filter((r) => {
    const [, , lo, hi] = CHAPTER_TARGET[r.chapter];
    return r.par < lo || r.par > hi;
  });
  console.log(`带内关卡：${normal.length - outBand.length}/${normal.length}` + (outBand.length ? `（出带：${outBand.map((r) => `L${r.id}=${r.par}`).join(' ')}）` : ''));

  // 平台：连续常规关极差 <= 2
  const runs: Row[][] = [];
  let cur: Row[] = [normal[0]];
  for (let i = 1; i < normal.length; i++) {
    const next = [...cur, normal[i]];
    const ps = next.map((r) => r.par);
    if (Math.max(...ps) - Math.min(...ps) <= 2) cur = next;
    else { runs.push(cur); cur = [normal[i]]; }
  }
  runs.push(cur);
  const plateaus = runs.filter((r) => r.length >= 4);
  const inPlateau = plateaus.reduce((s, r) => s + r.length, 0);
  console.log(`\n平台（>=4 关且极差 <=2）：${plateaus.length} 段，覆盖 ${inPlateau}/${normal.length} 关（${Math.round(inPlateau / normal.length * 100)}%）`);
  for (const p of plateaus) {
    console.log(`  L${p[0].id}-L${p[p.length - 1].id}  ${p.length} 关  par ${Math.min(...p.map((r) => r.par))}-${Math.max(...p.map((r) => r.par))}`);
  }

  const deltas = normal.slice(1).map((r, i) => ({ id: r.id, d: r.par - normal[i].par }));
  console.log(`\n相邻差：0 步 ${deltas.filter((d) => d.d === 0).length} 处，±1 ${deltas.filter((d) => Math.abs(d.d) === 1).length} 处，±2 ${deltas.filter((d) => Math.abs(d.d) === 2).length} 处，>=3 ${deltas.filter((d) => Math.abs(d.d) >= 3).length} 处`);
  console.log('  大跳：' + deltas.filter((d) => Math.abs(d.d) >= 3).map((d) => `L${d.id}(${d.d > 0 ? '+' : ''}${d.d})`).join('  '));

  // 记录线：常规关 par 多久没有刷新新高（排除硬关后仍能看出"天花板不动"）
  let bestPar = normal[0].par;
  let bestIdx = 0;
  const stalls: { from: number; to: number; n: number; ceiling: number; next: number }[] = [];
  normal.forEach((r, i) => {
    if (r.par > bestPar) {
      if (i - bestIdx >= 8) stalls.push({ from: normal[bestIdx].id, to: r.id, n: i - bestIdx, ceiling: bestPar, next: r.par });
      bestPar = r.par;
      bestIdx = i;
    }
  });
  const tailGap = normal.length - 1 - bestIdx;
  if (tailGap >= 8) stalls.push({ from: normal[bestIdx].id, to: normal[normal.length - 1].id, n: tailGap, ceiling: bestPar, next: bestPar });
  console.log(`记录线（常规关 par 新高）：${stalls.length} 段 >=8 关未刷新`);
  for (const s of stalls) console.log(`  L${s.from}（${s.ceiling}）-> L${s.to}（${s.next}）间隔 ${s.n} 关，中间 ${s.n - 1} 关未刷新`);

  console.log('\n局部毛刺（相对前后各 2 关中位，|偏差| >=25%）：');
  normal.forEach((r, idx) => {
    const win = normal.slice(Math.max(0, idx - 2), Math.min(normal.length, idx + 3)).filter((x) => x.id !== r.id).map((x) => x.par);
    const m = median(win);
    const dev = (r.par - m) / m;
    if (Math.abs(dev) >= 0.25) console.log(`  L${r.id} ${r.title}  par ${r.par}，邻域中位 ${m}，偏差 ${dev > 0 ? '+' : ''}${Math.round(dev * 100)}%`);
  });

  console.log('\n章末大考与章缝：');
  for (const examId of [20, 40, 60, 80, 99]) {
    const e = rows.find((r) => r.id === examId)!;
    const prev = rows.find((r) => r.id === examId - 1)!;
    const next = rows.find((r) => r.id === examId + 1);
    console.log(`  L${prev.id} ${prev.par} -> L${e.id} ${e.par}（${(e.par / prev.par).toFixed(2)}x）` + (next ? ` -> L${next.id} ${next.par}（回落 ${Math.round((1 - next.par / e.par) * 100)}%）` : ''));
  }

  const bulbs = normal.map((r) => r.par);
  const mech = normal.map((r) => r.sw + r.di);
  const corr = (a: number[], b: number[]) => {
    const ma = mean(a), mb = mean(b);
    let n = 0, da = 0, db = 0;
    a.forEach((x, i) => { n += (x - ma) * (b[i] - mb); da += (x - ma) ** 2; db += (b[i] - mb) ** 2; });
    return n / Math.sqrt(da * db);
  };
  console.log(`\n相关：par vs 闸+阀 r=${corr(bulbs, mech).toFixed(2)}，par vs 灯泡 r=${corr(bulbs, normal.map((r) => r.bulbs)).toFixed(2)}`);
  console.log(`机制使用：双色 ${rows.filter((r) => r.col).length} 关 / 禁环 ${rows.filter((r) => r.cyc).length} 关 / 联动轴 ${rows.filter((r) => r.ax).length} 关`);

  if (process.argv.includes('--md')) {
    console.log('\n| 关 | 标题 | par | 预算 | 容错 | 目标 | 机关 | 章 | 类型 |');
    console.log('|---:|---|---:|---:|---:|---|---|---:|---|');
    for (const r of rows) {
      const tag = r.hell ? '地狱' : r.goal < r.bulbs ? '取舍' : r.max - r.par <= 1 ? '全亮' : '正常';
      const m = [r.sw ? `闸${r.sw}` : '', r.di ? `阀${r.di}` : '', r.cross ? `十${r.cross}` : '', `源${r.src}`].filter(Boolean).join(' ');
      console.log(`| ${r.id} | ${r.title} | ${r.par} | ${r.max} | ${r.ratio.toFixed(2)} | ${r.goal}/${r.bulbs} | ${m} | ${r.chapter} | ${tag} |`);
    }
  }
}

report();
