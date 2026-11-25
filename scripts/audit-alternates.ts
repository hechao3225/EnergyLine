/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 双源体检：每个能源头单独跑一遍求解器，判断它到底是真路、假主干还是纯装饰。
 *
 * 单源判定：
 *   FULL     单源即可达成本关目标（另一个源对胜负没有必要性）
 *   PARTIAL  单源能亮一部分（0 < maxLit < goal）
 *              └ 近失（gap = 1）＝“看着就快成了”的假主干，这是想做的设计
 *   DEAD     单源一盏都点不亮（纯装饰，玩家一眼就能排除）
 *
 * 多源关分型：
 *   双全解   每个源单独都能达 goal → 「能连成功但不是最优解」候选，看 par 步差
 *   单真源   只有一个源能达 goal     → 「假头 / 假主干」候选
 *   真协作   没有源能单独达 goal     → 多源必须一起用（分区/协作）
 *
 * 后悔值 Δ：先把某个 PARTIAL 源修到它能亮的极限，再改用真源补齐全亮，总共要几步
 * 减去本关 par，就是「先走这条支路要多付几步」。近失诱饵 Δ≥1 才算真的有代价；
 * Δ=0 说明走错也白走，不行。
 *
 * 用法：
 *   npx tsx scripts/audit-alternates.ts              # 全表 + 汇总
 *   npx tsx scripts/audit-alternates.ts --level=4    # 只算一关
 *   npx tsx scripts/audit-alternates.ts --json=out.json
 *   npx tsx scripts/audit-alternates.ts --fail-on-dead   # 有死源时退出码 1（可接 CI）
 */
import fs from 'fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { applyPlan, solveMinTaps } from '../src/utils/hint-solver';
import { simulateCircuit } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

type Plan = { id: string; rotateTaps: number; toggle: boolean }[];

const args = process.argv.slice(2);
const onlyLevel = Number((args.find((a) => a.startsWith('--level=')) ?? '').split('=')[1] || 0);
const jsonOut = (args.find((a) => a.startsWith('--json=')) ?? '').split('=')[1] || '';
const failOnDead = args.includes('--fail-on-dead');

interface SourceStat {
  id: string;
  row: number;
  col: number;
  /** 单独用这个源最多能点亮几盏 */
  maxLit: number;
  /** 单独用这个源点亮 maxLit 盏的最少点击 */
  parAtMax: number | null;
  /** 单独用这个源达成本关 goal 的最少点击（不达标为 null） */
  parToGoal: number | null;
  verdict: 'FULL' | 'PARTIAL' | 'DEAD';
  /** 近失诱饵：只差一盏 */
  nearMiss: boolean;
  /** 先修这条支路、再改用真源补齐全亮的总点击；算不出为 null */
  regretTaps: number | null;
  /** regretTaps - par */
  regret: number | null;
}

interface LevelReport {
  id: number;
  goal: number;
  bulbCount: number;
  par: number | null;
  maxSteps: number;
  skipped: string | null;
  sources: SourceStat[];
  kind: '双全解' | '单真源' | '真协作' | '单源' | 'SKIP';
  deadCount: number;
  nearMissCount: number;
  /** 双全解时最慢源与最快源的步差 */
  parDelta: number | null;
  /** 近失诱饵里最小的后悔值 */
  regretMin: number | null;
}

/** 把除 keepId 之外的能源头都掏空，得到「只留一个源」的盘面 */
function restrictTo(level: LevelConfig, keepId: string): LevelConfig {
  return {
    ...level,
    tiles: level.tiles.map((t): Tile =>
      t.type === 'battery' && t.id !== keepId ? { ...t, type: 'empty', basePorts: 0, locked: false } : t,
    ),
  };
}

/** 把求解器给的 plan 落回完整盘面（restrict 过的那份会丢别的源） */
function applyOn(level: LevelConfig, plan: Plan): Tile[] {
  const byId = new Map(plan.map((p) => [p.id, p]));
  return level.tiles.map((t) => {
    const p = byId.get(t.id);
    if (!p) return { ...t };
    return { ...t, rotation: t.rotation + p.rotateTaps * 90, switchClosed: p.toggle ? true : t.switchClosed };
  });
}

function tapsForGoal(level: LevelConfig, need: number) {
  try {
    const res = solveMinTaps({ ...level, goal: need });
    const applied = applyPlan({ ...level, goal: need }, res.plan);
    const sim = simulateCircuit(applied.tiles, level.gridRows, level.gridCols, level.rules);
    if (sim.litCount < need) return null;
    return { par: res.par, plan: res.plan };
  } catch {
    return null;
  }
}

function probe(level: LevelConfig, id: string, row: number, col: number, goal: number): { stat: SourceStat; plan: Plan | null } {
  const sub = restrictTo(level, id);
  const bulbCount = level.tiles.filter((t) => t.type === 'bulb').length;
  let maxLit = 0;
  let parAtMax: number | null = null;
  let plan: Plan | null = null;
  for (let need = bulbCount; need >= 1; need--) {
    const hit = tapsForGoal(sub, need);
    if (hit) {
      maxLit = need;
      parAtMax = hit.par;
      plan = hit.plan;
      break;
    }
  }
  const parToGoal = maxLit >= goal ? (tapsForGoal(sub, goal)?.par ?? null) : null;
  return {
    plan,
    stat: {
      id,
      row,
      col,
      maxLit,
      parAtMax,
      parToGoal,
      verdict: maxLit >= goal ? 'FULL' : maxLit > 0 ? 'PARTIAL' : 'DEAD',
      nearMiss: maxLit > 0 && maxLit === goal - 1,
      regretTaps: null,
      regret: null,
    },
  };
}

const reports: LevelReport[] = [];
const started = Date.now();

function describe(stat: SourceStat, goal: number): string {
  const tags: string[] = [stat.verdict];
  if (stat.nearMiss) tags.push('近失');
  if (stat.regret !== null) tags.push(`Δ${stat.regret >= 0 ? '+' : ''}${stat.regret}`);
  return `B${stat.row},${stat.col}=${stat.maxLit}/${goal}(${tags.join('·')})`;
}

for (const level of DEFAULT_LEVELS) {
  if (onlyLevel && level.id !== onlyLevel) continue;
  const batteries = level.tiles.filter((t) => t.type === 'battery');
  const bulbCount = level.tiles.filter((t) => t.type === 'bulb').length;
  const goal = Math.max(1, Math.min(bulbCount, level.goal ?? bulbCount));
  const base: LevelReport = {
    id: level.id,
    goal,
    bulbCount,
    par: level.parSteps ?? null,
    maxSteps: level.maxSteps,
    skipped: null,
    sources: [],
    kind: '单源',
    deadCount: 0,
    nearMissCount: 0,
    parDelta: null,
    regretMin: null,
  };
  if (batteries.length < 2) {
    reports.push({ ...base, skipped: '单源' });
    continue;
  }
  const hasRules = Boolean(level.rules && Object.keys(level.rules).length > 0);
  const skip = hasRules ? 'rules' : level.tiles.some((t) => t.axis) ? 'axis' : null;
  if (skip) {
    reports.push({ ...base, skipped: skip, kind: 'SKIP' });
    continue;
  }

  const probes = batteries.map((b) => probe(level, b.id, b.row, b.col, goal));
  const sources = probes.map((p) => p.stat);
  const full = sources.filter((s) => s.verdict === 'FULL');
  const kind: LevelReport['kind'] = full.length === sources.length ? '双全解' : full.length === 0 ? '真协作' : '单真源';
  const pars = full.map((s) => s.parToGoal ?? s.parAtMax ?? 0).sort((a, b) => a - b);

  // 后悔值：先走错支路，再改用本关的真源补齐全亮
  const trueSource = full[0];
  if (trueSource) {
    for (const item of probes) {
      const s = item.stat;
      if (s.verdict !== 'PARTIAL' || !item.plan) continue;
      const applied = applyOn(level, item.plan);
      const rest = tapsForGoal(restrictTo({ ...level, tiles: applied }, trueSource.id), goal);
      if (!rest) continue;
      s.regretTaps = (s.parAtMax ?? 0) + rest.par;
      s.regret = s.regretTaps - (level.parSteps ?? s.regretTaps);
    }
  }

  const regrets = sources.filter((s) => s.nearMiss && s.regret !== null).map((s) => s.regret as number);
  reports.push({
    ...base,
    sources,
    kind,
    deadCount: sources.filter((s) => s.verdict === 'DEAD').length,
    nearMissCount: sources.filter((s) => s.nearMiss).length,
    parDelta: kind === '双全解' ? pars[pars.length - 1] - pars[0] : null,
    regretMin: regrets.length ? Math.min(...regrets) : null,
  });
  console.log(`L${String(level.id).padStart(2)} ${kind}  ${sources.map((s) => describe(s, goal)).join('  ')}  par${level.parSteps ?? '?'}`);
}

const multi = reports.filter((r) => r.kind !== '单源' && r.kind !== 'SKIP');
const dead = multi.filter((r) => r.deadCount > 0);
const nearMiss = multi.filter((r) => r.nearMissCount > 0);
const summary = {
  total: reports.length,
  multi: multi.length,
  skip: reports.filter((r) => r.kind === 'SKIP').length,
  dualFull: multi.filter((r) => r.kind === '双全解').length,
  singleTrue: multi.filter((r) => r.kind === '单真源').length,
  coop: multi.filter((r) => r.kind === '真协作').length,
  withDead: dead.length,
  nearMiss: nearMiss.length,
  ms: Date.now() - started,
};
console.log('\n=== 汇总 ===');
console.log(JSON.stringify(summary, null, 2));
console.log('\n死源关：' + dead.map((r) => `L${r.id}`).join(', '));
console.log('近失诱饵：' + nearMiss.map((r) => `L${r.id}(Δ${r.regretMin ?? '?'})`).join(', '));
console.log('双全解：' + multi.filter((r) => r.kind === '双全解').map((r) => `L${r.id}(Δ${r.parDelta})`).join(', '));
console.log('单真源：' + multi.filter((r) => r.kind === '单真源').map((r) => `L${r.id}(` + r.sources.map((s) => `${s.row},${s.col}=${s.maxLit}/${r.goal}`).join('|') + ')').join('; '));

if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(reports, null, 2));
if (failOnDead && dead.length > 0) process.exitCode = 1;
