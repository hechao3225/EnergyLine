/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 阶段 2：重建 L30 / L80 / L90 的布局，把 par 打到 13 / 24 / 20。
 * 只动这 3 关；其余 96 关不变。
 *
 * 用法：npx tsx scripts/relayout-hard.ts [--write]
 */
import fs from 'node:fs';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { solveMinTaps, applyPlan } from './solve-min-par';
import { generateAlgorithmLayout, CHAPTER_RULES } from './generate-99-levels';
import { simulateCircuit } from '../src/utils/circuit';
import type { LevelConfig, Tile } from '../src/types/game';

const TAP_CAP: Record<string, number> = { line: 1, corner: 3, t_shape: 3, diode: 3, switch: 2 };

interface Spec {
  chapter: number;
  sources: number;
  bulbs: number;
  switches: number;
  diodes: number;
  crosses: number;
  target: number;
  goal?: number;
}

const SPECS: Record<number, Spec> = {
  30: { chapter: 1, sources: 1, bulbs: 4, switches: 1, diodes: 0, crosses: 1, target: 13, goal: 3 },
  80: { chapter: 3, sources: 2, bulbs: 5, switches: 1, diodes: 1, crosses: 1, target: 24 },
  90: { chapter: 4, sources: 3, bulbs: 5, switches: 2, diodes: 2, crosses: 0, target: 20, goal: 4 },
};

function makePrng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const norm = (r: number) => (((r % 360) + 360) % 360) as 0 | 90 | 180 | 270;

function scramble(solved: Tile[], required: Set<string>, target: number, seed: number): Tile[] {
  const rand = makePrng(seed);
  const movable = solved.filter((t) => !t.locked && required.has(t.id) && TAP_CAP[t.type] !== undefined);
  const caps = movable.map((t) => TAP_CAP[t.type]);
  const minTotal = movable.length;
  const maxTotal = caps.reduce((a, b) => a + b, 0);
  if (minTotal === 0) return solved.map((t) => ({ ...t, rotation: norm(t.rotation) }));
  const want = Math.max(minTotal, Math.min(maxTotal, Math.round(target)));
  const taps = new Array<number>(movable.length).fill(1);
  let extra = want - minTotal;
  while (extra > 0) {
    const open: number[] = [];
    for (let i = 0; i < taps.length; i++) if (taps[i] < caps[i]) open.push(i);
    if (open.length === 0) break;
    taps[open[Math.floor(rand() * open.length)]] += 1;
    extra -= 1;
  }
  const byId = new Map<string, number>();
  movable.forEach((t, i) => byId.set(t.id, taps[i]));
  return solved.map((t) => {
    const k = byId.get(t.id);
    if (k === undefined) return { ...t, rotation: norm(t.rotation) };
    if (t.type === 'switch') return { ...t, rotation: norm(k >= 2 ? t.rotation + 90 : t.rotation), switchClosed: false };
    return { ...t, rotation: norm(t.rotation - 90 * k) };
  });
}

function counts(tiles: Tile[]) {
  const c: Record<string, number> = {};
  for (const t of tiles) c[t.type] = (c[t.type] ?? 0) + 1;
  return c;
}

function main() {
  const write = process.argv.includes('--write');
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',').map(Number)) : null;
  const rows: string[] = [];
  let changed = 0;

  for (const key of Object.keys(SPECS)) {
    const id = Number(key);
    if (only && !only.has(id)) continue;
    const spec = SPECS[id];
    const level = DEFAULT_LEVELS.find((l) => l.id === id)!;
    const config = CHAPTER_RULES[spec.chapter];
    let best: { tiles: Tile[]; par: number; variant: number; seed: number; counts: Record<string, number> } | null = null;
    let tried = 0, matched = 0;

    for (let variant = 0; variant < 200; variant++) {
      let layout;
      try {
        layout = generateAlgorithmLayout(id, config, variant);
      } catch {
        continue;
      }
      const c = counts(layout.solved);
      if ((c.battery ?? 0) !== spec.sources || (c.bulb ?? 0) !== spec.bulbs) continue;
      if ((c.switch ?? 0) !== spec.switches || (c.diode ?? 0) !== spec.diodes) continue;
      if ((c.cross ?? 0) < spec.crosses) continue;

      const targetGoal = spec.goal;
      if (targetGoal !== undefined) {
        // 取舍关：goal 必须小于灯泡数
        if (targetGoal >= (c.bulb ?? 0)) continue;
      }

      const provisional: LevelConfig = {
        ...level,
        tiles: layout.solved,
        parSteps: 0,
        maxSteps: 9999,
        goal: targetGoal,
      };
      let base;
      try {
        base = solveMinTaps(provisional);
      } catch {
        continue;
      }
      const applied = applyPlan(provisional, base.plan);
      const solved = applied.tiles.map((t) => ({ ...t, rotation: norm(t.rotation) }));
      const required = new Set(base.usedCells);
      const movable = solved.filter((t) => !t.locked && required.has(t.id) && TAP_CAP[t.type] !== undefined);
      const maxTotal = movable.reduce((s, t) => s + TAP_CAP[t.type], 0);
      if (maxTotal < spec.target) continue;
      matched++;
      tried += movable.length;

      for (let seed = 0; seed < 300; seed++) {
        const tiles = scramble(solved, required, spec.target, id * 7919 + variant * 1013 + seed * 37 + 11);
        const cand: LevelConfig = { ...provisional, tiles };
        let res;
        try {
          res = solveMinTaps(cand);
        } catch {
          continue;
        }
        if (res.par <= 0) continue;
        const diff = Math.abs(res.par - spec.target);
        if (!best || diff < Math.abs(best.par - spec.target)) best = { tiles, par: res.par, variant, seed, counts: c };
        if (res.par === spec.target) break;
      }
      if (best && best.par === spec.target) break;
    }

    if (!best || Math.abs(best.par - spec.target) > 1) {
      rows.push(`L${id} MISS target ${spec.target} best ${best ? best.par : 'none'} (matched variants ${matched})`);
      continue;
    }

    level.tiles = best.tiles;
    level.parSteps = best.par;
    level.goal = spec.goal;
    level.maxSteps = best.par; // 硬关：零容错
    if (id === 20 || id === 40) level.maxSteps = best.par + 1;

    const check = solveMinTaps(level);
    const replay = applyPlan(level, check.plan);
    const goal = level.goal ?? replay.total;
    const init = simulateCircuit(level.tiles, level.gridRows, level.gridCols);
    const ok = check.par === level.parSteps && replay.taps === level.parSteps && replay.lit >= goal && init.litCount < goal;
    rows.push(
      `L${id} variant ${best.variant} seed ${best.seed} par ${level.parSteps}/${level.maxSteps} goal ${level.goal ?? `${replay.total}/${replay.total}`} counts ${JSON.stringify(best.counts)} verify ${ok}`
    );
    if (!ok) throw new Error('verify failed L' + id);
    changed++;
  }

  console.log(rows.join('\n'));
  if (process.argv.includes('--print')) {
    const SYM: Record<string, string> = { battery: 'B', bulb: 'O', switch: 'S', diode: 'D', cross: '+', line: 'L', corner: 'C', t_shape: 'T', empty: '.' };
    for (const key of Object.keys(SPECS)) {
      const id = Number(key);
      if (only && !only.has(id)) continue;
      const l = DEFAULT_LEVELS.find((x) => x.id === id)!;
      if (l.parSteps !== SPECS[id].target && Math.abs((l.parSteps ?? 0) - SPECS[id].target) > 1) continue;
      console.log(`\nL${id} goal ${l.goal ?? '-'} par ${l.parSteps} max ${l.maxSteps}`);
      for (let r = 0; r < l.gridRows; r++) {
        let line = '';
        for (let c = 0; c < l.gridCols; c++) line += (SYM[l.tiles.find((t) => t.row === r && t.col === c)!.type] ?? '?') + ' ';
        console.log(line);
      }
    }
  }
  console.log(`changed ${changed}/3`);
  if (!write) {
    console.log('dry run (add --write to save)');
    return;
  }
  const path = 'src/data/defaultLevels.ts';
  const text = fs.readFileSync(path, 'utf8');
  const i = text.indexOf('= [');
  const end = text.lastIndexOf('];');
  fs.writeFileSync(path, text.slice(0, i) + '= ' + JSON.stringify(DEFAULT_LEVELS, null, 2) + text.slice(end + 1), 'utf8');
  console.log('written', path);
}

main();
