import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit, rotatePorts } from '../src/utils/circuit';
import { solveMinTaps } from './solve-min-par';

/**
 * 独立交叉校验：在整个状态空间（各格有效端口组合 × 水闸通断）上做 BFS，
 * 得到精确的最少点击次数，与 DP 的 par 对比。
 */
function bfsMin(level: any, cap = 400_000): { min: number | null; visited: number; overflow: boolean } {
  const cells = level.tiles.filter((t: any) => !t.locked && t.type !== 'empty');
  const switches = cells.filter((t: any) => t.type === 'switch');
  const keyOf = (tiles: any[]) => {
    let k = '';
    for (const c of cells) {
      const t = tiles.find((x: any) => x.id === c.id);
      // 灵梭的端口组合不区分方向，必须把真实姿态也纳入 key
      k += c.type === 'diode'
        ? 'D' + ((((t.rotation % 360) + 360) % 360) / 90) + ','
        : rotatePorts(c.basePorts, t.rotation) + ',';
    }
    for (const s of switches) {
      const t = tiles.find((x: any) => x.id === s.id);
      k += t.switchClosed === false ? '0' : '1';
    }
    return k;
  };

  const acts: { id: string; kind: 'rot' | 'toggle' }[] = [];
  for (const c of cells) {
    acts.push({ id: c.id, kind: 'rot' });
    if (c.type === 'switch') acts.push({ id: c.id, kind: 'toggle' });
  }
  const apply = (tiles: any[], a: { id: string; kind: 'rot' | 'toggle' }) =>
    tiles.map((t: any) => {
      if (t.id !== a.id) return t;
      if (a.kind === 'toggle') return { ...t, switchClosed: !t.switchClosed };
      return { ...t, rotation: t.rotation + 90 };
    });

  const start = level.tiles.map((t: any) => ({ ...t }));
  if (simulateCircuit(start, level.gridRows, level.gridCols).isAllLit) return { min: 0, visited: 1, overflow: false };

  const seen = new Map<string, number>();
  seen.set(keyOf(start), 0);
  let frontier = [start];
  let depth = 0;
  while (frontier.length > 0) {
    depth++;
    const next: any[][] = [];
    for (const tiles of frontier) {
      for (const a of acts) {
        const nt = apply(tiles, a);
        const k = keyOf(nt);
        if (seen.has(k)) continue;
        seen.set(k, depth);
        if (seen.size > cap) return { min: null, visited: seen.size, overflow: true };
        if (simulateCircuit(nt, level.gridRows, level.gridCols).isAllLit) {
          return { min: depth, visited: seen.size, overflow: false };
        }
        next.push(nt);
      }
    }
    frontier = next;
  }
  return { min: null, visited: seen.size, overflow: false };
}

let checked = 0;
let ok = 0;
let bad = 0;
let skipped = 0;
for (const l of DEFAULT_LEVELS) {
  const dp = solveMinTaps(l).par;
  // 预估状态空间，过大直接跳过（避免爆内存）
  let space = 1;
  for (const t of l.tiles as any[]) {
    if (t.locked || t.type === 'empty') continue;
    space *= t.type === 'line' ? 2 : t.type === 'cross' ? 1 : t.type === 'switch' ? 4 : 4;
  }
  if (space > 60_000) {
    skipped++;
    continue;
  }
  const r = bfsMin(l, 60_000);
  if (r.overflow) {
    skipped++;
    continue;
  }
  checked++;
  if (r.min === dp) {
    ok++;
  } else {
    bad++;
    console.log(`❌ L${l.id} dp=${dp} bfs=${r.min} visited=${r.visited}`);
  }
}
console.log(`BFS 交叉校验：比对 ${checked} 关，一致 ${ok}，不一致 ${bad}，状态空间过大跳过 ${skipped}`);
