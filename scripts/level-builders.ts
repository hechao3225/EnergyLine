/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 关卡重建工具：把「已解拓扑」打乱成可玩关卡，并提供盘面去重指纹。
 *
 * 背景：99 关里有 10 组完全同题、24 关与更早关卡只差 ≤4 格，根因是生成器
 * 在不同关卡复用了同一份 solved 拓扑（只换随机角度）。本模块统一提供
 *   solved 拓扑来源（旧关卡 / 环面生成 / 双色两路生成）
 *   scrambleSolved（按目标 par 打乱 + 规则 + 目标数校验）
 *   canonicalBoardKey / boardSimilarity（D4 对称归一化后判重）
 * 供各章生成器与去重审计共用。
 */
import type { LevelConfig, LevelRules, Tile, TileType } from '../src/types/game';
import { getDefaultBasePorts, simulateCircuit } from '../src/utils/circuit';
import { applyRuleSolution, solveRuleLevel } from '../src/utils/rule-solver';
import { LEGACY_LEVELS } from '../src/data/defaultLevels';
import { generateTorusLevel, type TorusGenSpec } from './torus-gen';

const UP = 1;
const RIGHT = 2;
const DOWN = 4;
const LEFT = 8;

const DIRS: { dr: number; dc: number; port: number }[] = [
  { dr: -1, dc: 0, port: UP },
  { dr: 0, dc: 1, port: RIGHT },
  { dr: 1, dc: 0, port: DOWN },
  { dr: 0, dc: -1, port: LEFT },
];

const OPPOSITE: Record<number, number> = { [UP]: DOWN, [RIGHT]: LEFT, [DOWN]: UP, [LEFT]: RIGHT };

function typeOfPorts(ports: number): TileType {
  let n = 0;
  for (const p of [UP, RIGHT, DOWN, LEFT]) if (ports & p) n++;
  if (n === 1 || n === 3) return n === 1 ? 'line' : 't_shape';
  if (n === 2) {
    return (ports & UP) && (ports & DOWN) ? 'line' : (ports & LEFT) && (ports & RIGHT) ? 'line' : 'corner';
  }
  return 'cross';
}

function solvedRotation(type: TileType, want: number): number {
  const base = getDefaultBasePorts(type);
  for (const rotation of [0, 90, 180, 270]) {
    // rotate locally to avoid importing circuit internals repeatedly
    let v = base;
    for (let i = 0; i < rotation / 90; i++) {
      let next = 0;
      if (v & UP) next |= RIGHT;
      if (v & RIGHT) next |= DOWN;
      if (v & DOWN) next |= LEFT;
      if (v & LEFT) next |= UP;
      v = next;
    }
    if (v === want) return rotation;
  }
  throw new Error(type + ' 无法朝向 ' + want);
}

export interface LevelBand {
  targetPar: number;
  parMin: number;
  parMax: number;
}

export interface ScrambleOptions {
  rules?: LevelRules;
  goal?: number;
  requireSeam?: boolean;
  tolerance?: number;
  seedStart?: number;
  seedLimit?: number;
  rows?: number;
  cols?: number;
  /** 额外塞入的“诱饵管”数量：不参与最优解的闲置可转格，用来还原扫描负担。 */
  decoys?: number;
}

export function solvedOf(level: LevelConfig): Tile[] | null {
  const solution = solveRuleLevel(level);
  if (!solution) return null;
  return applyRuleSolution(level, solution);
}

export function solvedFromLegacy(id: number): Tile[] | null {
  const level = LEGACY_LEVELS.find((item) => item.id === id);
  return level ? solvedOf(level) : null;
}

export function countSeams(level: LevelConfig, tiles: Tile[]): number {
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
  let count = 0;
  for (const edge of sim.poweredEdges) {
    const [from, to] = edge.split('->');
    const [r1, c1] = from.split(',').map(Number);
    const [r2, c2] = to.split(',').map(Number);
    if (Math.abs(r1 - r2) > 1 || Math.abs(c1 - c2) > 1) count++;
  }
  return count;
}

const TAP_CAP: Partial<Record<TileType, number>> = {
  line: 1,
  corner: 3,
  t_shape: 3,
  diode: 3,
  switch: 2,
};

/**
 * 把 solved 拓扑打乱成关卡：只转非锁定格，按目标 par 搜索 seed。
 * 校验：par 落在目标带内、开局未点亮、无过载、（可选）最优解真的穿缝。
 */
export function scrambleSolved(
  spec: { id: number; targetPar: number; parMin: number; parMax: number },
  solvedTiles: Tile[],
  options: ScrambleOptions = {},
): LevelConfig {
  const rows = options.rows ?? 6;
  const cols = options.cols ?? 6;
  const rules = options.rules ?? {};
  const tolerance = options.tolerance ?? 2;
  const seedLimit = options.seedLimit ?? 8000;
  const movable = solvedTiles.filter(
    (tile) => !tile.locked && tile.type !== 'empty' && tile.type !== 'cross' && TAP_CAP[tile.type],
  );

  for (let seed = options.seedStart ?? 1; seed <= (options.seedStart ?? 1) + seedLimit; seed++) {
    let state = seed;
    const tiles = solvedTiles.map((tile) => {
      if (!movable.some((item) => item.id === tile.id)) return { ...tile };
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      const cap = TAP_CAP[tile.type] ?? 1;
      return { ...tile, rotation: tile.rotation + 90 * (1 + (state % cap)) };
    });
    // 诱饵管：塞进空格，旋转随机；是否真的连通交给求解器判定，p ar 不在带内就换 seed。
    const decoyTarget = options.decoys ?? 0;
    if (decoyTarget > 0) {
      const occupied = new Set(tiles.map((tile) => tile.row + ',' + tile.col));
      const empty: [number, number][] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!occupied.has(row + ',' + col)) empty.push([row, col]);
        }
      }
      const decoyTypes: TileType[] = ['line', 'corner'];
      const placed = Math.min(decoyTarget, empty.length);
      for (let index = 0; index < placed; index++) {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        const pickIndex = state % empty.length;
        const [row, col] = empty.splice(pickIndex, 1)[0];
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        const type = decoyTypes[state % decoyTypes.length];
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        tiles.push({
          id: 'd-' + row + '-' + col,
          row,
          col,
          type,
          rotation: (state % 4) * 90,
          basePorts: getDefaultBasePorts(type),
        });
      }
    }
    const level: LevelConfig = {
      id: spec.id,
      code: String(spec.id).padStart(2, '0'),
      totalLevels: 99,
      gridRows: rows,
      gridCols: cols,
      maxSteps: spec.targetPar + tolerance,
      parSteps: spec.targetPar,
      rules,
      ...(options.goal !== undefined ? { goal: options.goal } : {}),
      tiles,
    };
    const solution = solveRuleLevel(level);
    if (!solution || solution.par < spec.parMin || solution.par > spec.parMax) continue;
    const initial = simulateCircuit(tiles, rows, cols, rules);
    if (initial.litCount > 0 || initial.overloaded) continue;
    const applied = applyRuleSolution(level, solution);
    if (options.requireSeam && countSeams(level, applied) === 0) continue;
    return { ...level, parSteps: solution.par, maxSteps: solution.par + tolerance };
  }
  throw new Error('L' + spec.id + ' 打乱失败：找不到 par ' + spec.parMin + '–' + spec.parMax + ' 的盘面');
}

/** 环面生成器产出一份 solved 拓扑（先按环面 par 带生成，再取最优解）。 */
export function solvedFromTorus(
  id: number,
  seed: number,
  options: { cells?: number; bulbs?: number; par?: [number, number] } = {},
): Tile[] | null {
  const spec: TorusGenSpec = {
    id: 9000 + id,
    code: 'TG',
    title: '环面',
    subtitle: '',
    hint: '',
    win: '',
    cells: options.cells ?? 24,
    bulbs: options.bulbs ?? 4,
    par: options.par ?? [10, 24],
    tolerance: 2,
    seed,
  };
  try {
    const level = generateTorusLevel(spec, seed);
    return level ? solvedOf(level) : null;
  } catch {
    // 生成器对个别随机树会判定为非法（源点无端口），按无候选处理。
    return null;
  }
}

function makePrng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * 双色拓扑生成：两条互不相交的「电池→管道→灯」路径，颜色 0/1 分开。
 * 可选 wrap：允许一步跨过边界，从而让环面双色关真的有穿缝边。
 */
export function solvedTwoColorPaths(
  seed: number,
  options: { wrap?: boolean; rows?: number; cols?: number; minLen?: number; maxLen?: number } = {},
): Tile[] | null {
  const rows = options.rows ?? 6;
  const cols = options.cols ?? 6;
  const wrap = options.wrap ?? false;
  const minLen = options.minLen ?? 5;
  const maxLen = options.maxLen ?? 9;
  const rng = makePrng(seed);
  const used = new Set<string>();
  const key = (r: number, c: number) => r + ',' + c;
  const norm = (r: number, c: number): [number, number] => {
    if (!wrap) return [r, c];
    return [((r % rows) + rows) % rows, ((c % cols) + cols) % cols];
  };

  interface CellInfo {
    row: number;
    col: number;
    ports: number;
    kind: 'battery' | 'bulb' | 'pipe';
    color: number;
  }
  const cells = new Map<string, CellInfo>();

  for (let color = 0; color < 2; color++) {
    let placed = false;
    for (let attempt = 0; attempt < 60 && !placed; attempt++) {
      const startRow = Math.floor(rng() * rows);
      const start: [number, number] = norm(startRow, 0);
      if (used.has(key(start[0], start[1]))) continue;
      const targetLen = minLen + Math.floor(rng() * (maxLen - minLen + 1));
      const path: [number, number][] = [start];
      const localUsed = new Set<string>([key(start[0], start[1])]);
      let ok = true;
      for (let step = 1; step < targetLen; step++) {
        const [r, c] = path[path.length - 1];
        const optionsDir = DIRS.map((dir) => {
          const [nr, nc] = norm(r + dir.dr, c + dir.dc);
          return { nr, nc, dir };
        }).filter((item) => {
          const k = key(item.nr, item.nc);
          if (localUsed.has(k) || used.has(k)) return false;
          if (!wrap && (item.nr < 0 || item.nr >= rows || item.nc < 0 || item.nc >= cols)) return false;
          return true;
        });
        if (!optionsDir.length) {
          ok = false;
          break;
        }
        const chosen = optionsDir[Math.floor(rng() * optionsDir.length)];
        path.push([chosen.nr, chosen.nc]);
        localUsed.add(key(chosen.nr, chosen.nc));
      }
      if (!ok) continue;
      // 朝向：每格端口 = 上一个方向 + 下一个方向
      for (let index = 0; index < path.length; index++) {
        const [r, c] = path[index];
        let ports = 0;
        if (index > 0) {
          const [pr, pc] = path[index - 1];
          const dr = wrap ? (pr - r + rows) % rows : pr - r;
          const dc = wrap ? (pc - c + cols) % cols : pc - c;
          const dir = dr === 1 ? DOWN : dr === -1 || (wrap && dr === rows - 1) ? UP : dc === 1 ? RIGHT : dc === -1 || (wrap && dc === cols - 1) ? LEFT : 0;
          ports |= dir;
        }
        if (index < path.length - 1) {
          const [nr, nc] = path[index + 1];
          const dr = wrap ? (nr - r + rows) % rows : nr - r;
          const dc = wrap ? (nc - c + cols) % cols : nc - c;
          const dir = dr === 1 ? DOWN : dr === -1 || (wrap && dr === rows - 1) ? UP : dc === 1 ? RIGHT : dc === -1 || (wrap && dc === cols - 1) ? LEFT : 0;
          ports |= dir;
        }
        cells.set(key(r, c), {
          row: r,
          col: c,
          ports,
          kind: index === 0 ? 'battery' : index === path.length - 1 ? 'bulb' : 'pipe',
          color,
        });
        used.add(key(r, c));
      }
      placed = true;
    }
    if (!placed) return null;
  }

  // 组装 tiles：电池朝向第一个端口；灯接受任意方向；管道按端口取形。
  const tiles: Tile[] = [];
  for (const info of cells.values()) {
    if (info.kind === 'battery') {
      const rotation = solvedRotation('battery', info.ports);
      tiles.push({
        id: 'c-' + info.row + '-' + info.col,
        row: info.row,
        col: info.col,
        type: 'battery',
        rotation,
        basePorts: getDefaultBasePorts('battery'),
        locked: true,
        color: info.color,
      });
    } else if (info.kind === 'bulb') {
      tiles.push({
        id: 'c-' + info.row + '-' + info.col,
        row: info.row,
        col: info.col,
        type: 'bulb',
        rotation: 0,
        basePorts: getDefaultBasePorts('bulb'),
        locked: true,
        color: info.color,
      });
    } else {
      const type = typeOfPorts(info.ports);
      tiles.push({
        id: 'c-' + info.row + '-' + info.col,
        row: info.row,
        col: info.col,
        type,
        rotation: solvedRotation(type, info.ports),
        basePorts: getDefaultBasePorts(type),
        color: info.color,
      });
    }
  }

  // 自检：solved 状态下必须全亮且没有串色/过载
  const rules: LevelRules = { colors: 2, ...(wrap ? { wrap: true } : {}) };
  const sim = simulateCircuit(tiles, rows, cols, rules);
  if (!sim.isAllLit || sim.overloaded) return null;
  return tiles;
}

/** 在 solved 拓扑上挑一对相邻同型可转格，编成反向咬合齿轮组。 */
export function addGearPair(solvedTiles: Tile[]): Tile[] | null {
  const movable = solvedTiles.filter(
    (tile) => !tile.locked && tile.type !== 'empty' && tile.type !== 'cross',
  );
  for (let i = 0; i < movable.length; i++) {
    for (let j = i + 1; j < movable.length; j++) {
      const a = movable[i];
      const b = movable[j];
      if (a.type !== b.type) continue;
      if (Math.abs(a.row - b.row) + Math.abs(a.col - b.col) !== 1) continue;
      const phase = 1 + ((a.row * 3 + a.col) % 3);
      return solvedTiles.map((tile) => {
        if (tile.id === a.id) return { ...tile, axis: 'g1', axisDir: 1 as const, rotation: tile.rotation - 90 * phase };
        if (tile.id === b.id) return { ...tile, axis: 'g1', axisDir: -1 as const, rotation: tile.rotation + 90 * phase };
        return { ...tile };
      });
    }
  }
  return null;
}

// ---------- 盘面指纹（D4 对称 + 颜色互换 + 轴组重标号） ----------

function transformCoords(n: number, r: number, c: number, rows: number, cols: number) {
  let rr = r;
  let cc = c;
  let h = rows;
  let w = cols;
  if (n % 2 === 1) cc = w - 1 - c;
  const k = Math.floor(n / 2);
  for (let i = 0; i < k; i++) {
    const nr = cc;
    const nc = h - 1 - rr;
    rr = nr;
    cc = nc;
    const tmp = h;
    h = w;
    w = tmp;
  }
  return { r: rr, c: cc, h, w };
}

function transformPorts(ports: number, n: number): number {
  let p = ports;
  if (n % 2 === 1) {
    let q = 0;
    if (p & UP) q |= UP;
    if (p & DOWN) q |= DOWN;
    if (p & LEFT) q |= RIGHT;
    if (p & RIGHT) q |= LEFT;
    p = q;
  }
  const k = Math.floor(n / 2);
  for (let i = 0; i < k; i++) {
    let q = 0;
    if (p & UP) q |= RIGHT;
    if (p & RIGHT) q |= DOWN;
    if (p & DOWN) q |= LEFT;
    if (p & LEFT) q |= UP;
    p = q;
  }
  return p;
}

function rotatePortsLocal(ports: number, rotation: number): number {
  let p = ports;
  for (let i = 0; i < ((rotation % 360) + 360) % 360 / 90; i++) {
    let q = 0;
    if (p & UP) q |= RIGHT;
    if (p & RIGHT) q |= DOWN;
    if (p & DOWN) q |= LEFT;
    if (p & LEFT) q |= UP;
    p = q;
  }
  return p;
}

/** 盘面规范键：同等价的旋转/镜像/换色视为同一关。 */
export function canonicalBoardKey(level: LevelConfig): string {
  const rows = level.gridRows;
  const cols = level.gridCols;
  const tiles = level.tiles.filter((tile) => tile.type !== 'empty');
  const bulbCount = tiles.filter((tile) => tile.type === 'bulb').length;
  const goal = level.goal ?? bulbCount;
  const rules = level.rules ? JSON.stringify(level.rules) : '';
  let best: string | null = null;
  for (let colorSwap = 0; colorSwap < 2; colorSwap++) {
    for (let n = 0; n < 8; n++) {
      const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill('e'));
      const axisNames = new Map<string, number>();
      for (const tile of tiles) {
        const pos = transformCoords(n, tile.row, tile.col, rows, cols);
        let axisToken = '';
        if (tile.axis) {
          if (!axisNames.has(tile.axis)) axisNames.set(tile.axis, axisNames.size);
          const dir = tile.axisDir ? (tile.axisDir * (n % 2 === 1 ? -1 : 1) > 0 ? '+' : '-') : '~';
          axisToken = 'a' + axisNames.get(tile.axis) + dir;
        }
        let color = tile.color;
        if (colorSwap === 1 && color !== undefined) color = 1 - color;
        const ports = transformPorts(rotatePortsLocal(tile.basePorts, tile.rotation), n);
        grid[pos.r][pos.c] =
          tile.type + ':' + ports + ':' + (tile.locked ? 'L' : '') +
          (color !== undefined ? 'c' + color : '') + axisToken;
      }
      const body = grid.map((row) => row.join(',')).join('/');
      const candidate = rows + 'x' + cols + '|' + body + '|g' + goal + '|r' + rules;
      if (best === null || candidate < best) best = candidate;
    }
  }
  return best as string;
}

/** 两关盘面的相似度：对齐后「同格同管同朝向」占比（0–1）。 */
export function boardSimilarity(a: LevelConfig, b: LevelConfig): number {
  if (a.gridRows !== b.gridRows || a.gridCols !== b.gridCols) return 0;
  const rows = a.gridRows;
  const cols = a.gridCols;
  const mapOf = (level: LevelConfig, n: number) => {
    const map = new Map<string, string>();
    for (const tile of level.tiles) {
      if (tile.type === 'empty') continue;
      const pos = transformCoords(n, tile.row, tile.col, rows, cols);
      const ports = transformPorts(rotatePortsLocal(tile.basePorts, tile.rotation), n);
      map.set(pos.r + ',' + pos.c, tile.type + ':' + ports);
    }
    return map;
  };
  let best = 0;
  for (let n = 0; n < 8; n++) {
    const left = mapOf(a, n);
    const right = mapOf(b, 0);
    let same = 0;
    for (const [key, value] of left) if (right.get(key) === value) same++;
    const ratio = same / Math.max(left.size, right.size);
    if (ratio > best) best = ratio;
  }
  return best;
}