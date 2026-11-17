/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Direction, LevelRules, SimulationResult, Tile, TileType } from '../types/game';

// Rotate bitmask ports clockwise by rotation angle in degrees
export function rotatePorts(ports: number, rotation: number): number {
  if (ports === 0) return ports;
  const normRot = ((Math.round(rotation) % 360) + 360) % 360;
  if (normRot === 0) return ports;
  const steps = Math.floor(normRot / 90) % 4;
  let result = ports;
  for (let s = 0; s < steps; s++) {
    let next = 0;
    if (result & Direction.UP) next |= Direction.RIGHT;
    if (result & Direction.RIGHT) next |= Direction.DOWN;
    if (result & Direction.DOWN) next |= Direction.LEFT;
    if (result & Direction.LEFT) next |= Direction.UP;
    result = next;
  }
  return result;
}

// Get default base ports for tile types at rotation = 0
export function getDefaultBasePorts(type: TileType): number {
  switch (type) {
    case 'empty':
      return Direction.NONE;
    case 'battery':
      // Battery outputs to the right by default
      return Direction.RIGHT;
    case 'bulb':
      // Bulb accepts current from left, top, right, bottom (or any incoming direction)
      return Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT;
    case 'line':
      // Horizontal straight pipe at 0 deg: LEFT | RIGHT
      return Direction.LEFT | Direction.RIGHT;
    case 'corner':
      // Corner connecting DOWN and RIGHT (┌) at 0 deg
      return Direction.DOWN | Direction.RIGHT;
    case 't_shape':
      // T-junction with ports at LEFT, RIGHT, and DOWN (┬) at 0 deg
      return Direction.LEFT | Direction.RIGHT | Direction.DOWN;
    case 'cross':
      // 4-way cross junction
      return Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT;
    case 'switch':
      // Straight line with switch
      return Direction.LEFT | Direction.RIGHT;
    case 'diode':
      // Diode from left to right
      return Direction.LEFT | Direction.RIGHT;
    default:
      return Direction.NONE;
  }
}

// Get effective active ports of a tile given its current rotation
export function getTilePorts(tile: Tile): number {
  if (tile.type === 'empty') return Direction.NONE;
  return rotatePorts(tile.basePorts, tile.rotation);
}

/**
 * 旋转这一格会不会改变接法。
 *
 * 十字管四面同形，转 90° 端口掩码完全一样；点它既不会让能量多走一步，
 * 也不该扣掉一点步数预算。判定按「口位在 90° 下是否不变」而不是写死类型，
 * 这样以后加入新的对称管件也自动成立。
 */
export function isRotationNoop(tile: Tile): boolean {
  if (tile.type === 'empty') return true;
  return rotatePorts(tile.basePorts, 90) === tile.basePorts;
}

// Opposite direction helper
export function getOppositeDirection(dir: Direction): Direction {
  switch (dir) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.RIGHT:
      return Direction.LEFT;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    default:
      return Direction.NONE;
  }
}

// Offsets for 4 directions: [dr, dc, outDir, inDir]
const NEIGHBORS: [number, number, Direction, Direction][] = [
  [-1, 0, Direction.UP, Direction.DOWN],
  [0, 1, Direction.RIGHT, Direction.LEFT],
  [1, 0, Direction.DOWN, Direction.UP],
  [0, -1, Direction.LEFT, Direction.RIGHT],
];

// Run electrical simulation through the grid from battery sources
export function simulateCircuit(
  tiles: Tile[],
  gridRows: number = 6,
  gridCols: number = 6,
  rules?: LevelRules
): SimulationResult {
  // Index tiles by "row,col"
  const tileMap = new Map<string, Tile>();
  const batteries: Tile[] = [];
  const bulbs: Tile[] = [];

  for (const t of tiles) {
    tileMap.set(`${t.row},${t.col}`, t);
    if (t.type === 'battery') batteries.push(t);
    if (t.type === 'bulb') bulbs.push(t);
  }

  // 环面：把越界的邻居折回对面一列/一行
  const wrap = rules?.wrap === true;
  const normRow = (value: number) => ((value % gridRows) + gridRows) % gridRows;
  const normCol = (value: number) => ((value % gridCols) + gridCols) % gridCols;

  const poweredTileIds = new Set<string>();
  const litBulbIds = new Set<string>();
  const poweredEdges = new Set<string>();

  // Queue holds { tile: Tile, fromDir?: Direction }
  const queue: { tile: Tile; fromDir?: Direction }[] = [];

  for (const b of batteries) {
    poweredTileIds.add(b.id);
    queue.push({ tile: b });
  }

  while (queue.length > 0) {
    const { tile: current } = queue.shift()!;
    const curPorts = getTilePorts(current);

    // If it's a switch and is open, current cannot flow through
    if (current.type === 'switch' && current.switchClosed === false) {
      continue;
    }

    for (const [dr, dc, outDir, inDir] of NEIGHBORS) {
      // Check if current tile has a port facing this direction
      if (!(curPorts & outDir)) continue;

      const nRow = wrap ? normRow(current.row + dr) : current.row + dr;
      const nCol = wrap ? normCol(current.col + dc) : current.col + dc;
      if (!wrap && (nRow < 0 || nRow >= gridRows || nCol < 0 || nCol >= gridCols)) continue;

      const neighbor = tileMap.get(`${nRow},${nCol}`);
      if (!neighbor || neighbor.type === 'empty') continue;

      const neighborPorts = getTilePorts(neighbor);

      // Check if neighbor has an matching inward-facing port
      if (!(neighborPorts & inDir)) continue;

      // Special check for Diode: if neighbor is a diode, current must flow along diode's allowed direction
      if (neighbor.type === 'diode') {
        const allowedOutDir = rotatePorts(Direction.RIGHT, neighbor.rotation);
        const allowedInDir = rotatePorts(Direction.LEFT, neighbor.rotation);
        // Current must enter through allowedInDir
        if (inDir !== allowedInDir) {
          continue;
        }
      }

      // Record powered connection edge
      const edgeKey = `${current.row},${current.col}->${nRow},${nCol}`;
      poweredEdges.add(edgeKey);

      // If neighbor hasn't been energized yet
      if (!poweredTileIds.has(neighbor.id)) {
        poweredTileIds.add(neighbor.id);

        if (neighbor.type === 'bulb') {
          litBulbIds.add(neighbor.id);
        }

        // Bulbs and batteries don't continue to chain out further
        if (neighbor.type !== 'bulb' && neighbor.type !== 'battery') {
          queue.push({ tile: neighbor, fromDir: inDir });
        }
      }
    }
  }

  let isAllLit = bulbs.length > 0 && litBulbIds.size === bulbs.length;
  let overloaded = false;
  if (rules?.noCycle && poweredEdges.size > 0) {
    // 并查集找回路：同一段通电网络里出现环 → 整段过载
    const parent = new Map<string, string>();
    const find = (x: string): string => {
      let p = parent.get(x);
      if (p === undefined) {
        parent.set(x, x);
        return x;
      }
      if (p !== x) {
        p = find(p);
        parent.set(x, p);
      }
      return p;
    };
    const seenPair = new Set<string>();
    for (const key of poweredEdges) {
      const [a, b] = key.split("->");
      const pairKey = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (seenPair.has(pairKey)) continue;
      seenPair.add(pairKey);
      const ra = find(a);
      const rb = find(b);
      if (ra === rb) {
        overloaded = true;
        break;
      }
      parent.set(ra, rb);
    }
    if (overloaded) {
      // 过载 = 整段能量短路，所有设施熄灭
      isAllLit = false;
      litBulbIds.clear();
    }
  }

  if (rules?.colors && rules.colors > 1) {
    // 双色：每格记一个颜色掩码；设施只有收到"恰好自己那种色"才亮，串色即灭
    const masks = new Map<string, number>();
    const edges = new Set<string>();
    const seen = new Set<string>();
    const queue: { tile: Tile; color: number }[] = [];
    for (const b of batteries) {
      const color = b.color ?? 0;
      masks.set(b.id, (masks.get(b.id) ?? 0) | (1 << color));
      queue.push({ tile: b, color });
    }
    while (queue.length > 0) {
      const { tile: current, color } = queue.shift()!;
      const key = `${current.id}:${color}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (current.type === 'switch' && current.switchClosed === false) continue;
      const curPorts = getTilePorts(current);
      for (const [dr, dc, outDir, inDir] of NEIGHBORS) {
        if (!(curPorts & outDir)) continue;
        const nRow = wrap ? normRow(current.row + dr) : current.row + dr;
        const nCol = wrap ? normCol(current.col + dc) : current.col + dc;
        if (!wrap && (nRow < 0 || nRow >= gridRows || nCol < 0 || nCol >= gridCols)) continue;
        const neighbor = tileMap.get(`${nRow},${nCol}`);
        if (!neighbor || neighbor.type === 'empty') continue;
        if (!(getTilePorts(neighbor) & inDir)) continue;
        if (neighbor.type === 'diode') {
          const allowedInDir = rotatePorts(Direction.LEFT, neighbor.rotation);
          if (inDir !== allowedInDir) continue;
        }
        edges.add(`${current.row},${current.col}->${nRow},${nCol}`);
        const bit = 1 << color;
        if (!((masks.get(neighbor.id) ?? 0) & bit)) {
          masks.set(neighbor.id, (masks.get(neighbor.id) ?? 0) | bit);
        }
        if (neighbor.type !== 'bulb' && neighbor.type !== 'battery') {
          queue.push({ tile: neighbor, color });
        }
      }
    }
    const lit = new Set<string>();
    for (const b of bulbs) {
      if ((masks.get(b.id) ?? 0) === 1 << (b.color ?? 0)) lit.add(b.id);
    }
    return {
      poweredTileIds: new Set(masks.keys()),
      litBulbIds: lit,
      poweredEdges: edges,
      isAllLit: bulbs.length > 0 && lit.size === bulbs.length,
      totalBulbs: bulbs.length,
      litCount: lit.size,
      tileColors: masks,
    };
  }

  return {
    poweredTileIds,
    litBulbIds,
    poweredEdges,
    overloaded,
    isAllLit,
    totalBulbs: bulbs.length,
    litCount: litBulbIds.size,
  };
}

// Generate random guaranteed solvable endless puzzle
export function generateEndlessLevel(
  levelIndex: number,
  bulbCount: number = 3,
  rows: number = 6,
  cols: number = 6
): { tiles: Tile[]; maxSteps: number; title: string; hintText: string } {
  let attempts = 0;

  while (attempts < 50) {
    attempts++;
    const inTree = new Set<string>();
    const connections = new Map<string, number>();

    const getMask = (r: number, c: number) => connections.get(`${r},${c}`) || 0;
    const addEdge = (r1: number, c1: number, r2: number, c2: number, dir1: Direction, dir2: Direction) => {
      connections.set(`${r1},${c1}`, getMask(r1, c1) | dir1);
      connections.set(`${r2},${c2}`, getMask(r2, c2) | dir2);
    };

    // 1. Battery position
    const batteryRow = 2 + Math.floor(Math.random() * 2); // row 2 or 3
    inTree.add(`${batteryRow},0`);
    inTree.add(`${batteryRow},1`);
    addEdge(batteryRow, 0, batteryRow, 1, Direction.RIGHT, Direction.LEFT);

    // 2. Select distinct bulb positions on right column
    const bulbPositions: [number, number][] = [];
    const availableRows = [0, 1, 2, 3, 4, 5].filter(r => Math.abs(r - batteryRow) > 0 || bulbCount > 2);
    availableRows.sort(() => Math.random() - 0.5);

    const actualBulbCount = Math.min(bulbCount, availableRows.length);
    for (let i = 0; i < actualBulbCount; i++) {
      bulbPositions.push([availableRows[i], cols - 1]);
    }

    // 3. Connect each bulb to current tree using BFS
    let allConnected = true;
    for (const [targetR, targetC] of bulbPositions) {
      const otherBulbs = new Set(
        bulbPositions
          .filter(([r, c]) => r !== targetR || c !== targetC)
          .map(([r, c]) => `${r},${c}`)
      );

      const queue: string[] = [];
      const parent = new Map<string, { prev: string; outD: Direction; inD: Direction; cr: number; cc: number; nr: number; nc: number }>();
      const visited = new Set<string>();

      for (const nodeKey of inTree) {
        if (!otherBulbs.has(nodeKey)) {
          queue.push(nodeKey);
          visited.add(nodeKey);
        }
      }

      let reached = false;
      const targetKey = `${targetR},${targetC}`;

      while (queue.length > 0) {
        const cur = queue.shift()!;
        if (cur === targetKey) {
          reached = true;
          break;
        }

        const [cr, cc] = cur.split(',').map(Number);
        const dirs: [number, number, Direction, Direction][] = [
          [-1, 0, Direction.UP, Direction.DOWN],
          [1, 0, Direction.DOWN, Direction.UP],
          [0, -1, Direction.LEFT, Direction.RIGHT],
          [0, 1, Direction.RIGHT, Direction.LEFT],
        ];
        dirs.sort(() => Math.random() - 0.5);

        for (const [dr, dc, outD, inD] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          const nKey = `${nr},${nc}`;
          if (visited.has(nKey) || otherBulbs.has(nKey)) continue;

          visited.add(nKey);
          parent.set(nKey, { prev: cur, outD, inD, cr, cc, nr, nc });
          queue.push(nKey);
        }
      }

      if (!reached) {
        allConnected = false;
        break;
      }

      // Trace path back to add branches
      let curr = targetKey;
      while (parent.has(curr)) {
        const edge = parent.get(curr)!;
        addEdge(edge.cr, edge.cc, edge.nr, edge.nc, edge.outD, edge.inD);
        inTree.add(curr);
        curr = edge.prev;
      }
    }

    if (!allConnected) continue;

    // 4. Assemble Tile objects
    const solvedTiles: Tile[] = [];
    const scrambledTiles: Tile[] = [];
    let minMoves = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const mask = getMask(r, c);
        const id = `tile-${r}-${c}`;

        if (r === batteryRow && c === 0) {
          const t: Tile = {
            id,
            row: r,
            col: c,
            type: 'battery',
            rotation: 0,
            basePorts: Direction.RIGHT,
            locked: true,
          };
          solvedTiles.push(t);
          scrambledTiles.push(t);
          continue;
        }

        const isBulb = bulbPositions.some(([br, bc]) => br === r && bc === c);
        if (isBulb) {
          const t: Tile = {
            id,
            row: r,
            col: c,
            type: 'bulb',
            rotation: 0,
            basePorts: Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
            locked: true,
          };
          solvedTiles.push(t);
          scrambledTiles.push(t);
          continue;
        }

        if (mask === 0) {
          const t: Tile = {
            id,
            row: r,
            col: c,
            type: 'empty',
            rotation: 0,
            basePorts: Direction.NONE,
          };
          solvedTiles.push(t);
          scrambledTiles.push(t);
          continue;
        }

        const hasU = Boolean(mask & Direction.UP);
        const hasR = Boolean(mask & Direction.RIGHT);
        const hasD = Boolean(mask & Direction.DOWN);
        const hasL = Boolean(mask & Direction.LEFT);
        const count = (hasU ? 1 : 0) + (hasR ? 1 : 0) + (hasD ? 1 : 0) + (hasL ? 1 : 0);

        let type: TileType = 'line';
        let basePorts = getDefaultBasePorts('line');
        let solvedRot = 0;

        if (count >= 4) {
          type = 'cross';
          basePorts = getDefaultBasePorts('cross');
          solvedRot = 0;
        } else if (count === 3) {
          type = 't_shape';
          basePorts = getDefaultBasePorts('t_shape');
          for (const rot of [0, 90, 180, 270]) {
            if (rotatePorts(basePorts, rot) === mask) {
              solvedRot = rot;
              break;
            }
          }
        } else if (count === 2) {
          if ((hasL && hasR) || (hasU && hasD)) {
            type = 'line';
            basePorts = getDefaultBasePorts('line');
            solvedRot = (hasL && hasR) ? 0 : 90;
          } else {
            type = 'corner';
            basePorts = getDefaultBasePorts('corner');
            for (const rot of [0, 90, 180, 270]) {
              if (rotatePorts(basePorts, rot) === mask) {
                solvedRot = rot;
                break;
              }
            }
          }
        } else {
          // Terminal arm (count === 1)
          type = 'line';
          basePorts = getDefaultBasePorts('line');
          solvedRot = (hasL || hasR) ? 0 : 90;
        }

        solvedTiles.push({
          id,
          row: r,
          col: c,
          type,
          rotation: solvedRot,
          basePorts,
          locked: false,
        });

        // Scramble rotation by 1..3 steps (90, 180, 270)
        const scrambleSteps = Math.floor(Math.random() * 3) + 1;
        const scrambledRot = (solvedRot + scrambleSteps * 90) % 360;
        minMoves += (4 - scrambleSteps) % 4 === 1 ? 1 : (4 - scrambleSteps) % 4 === 2 ? 2 : 1;

        scrambledTiles.push({
          id,
          row: r,
          col: c,
          type,
          rotation: scrambledRot,
          basePorts,
          locked: false,
        });
      }
    }

    // 5. Mathematically verify with circuit simulation!
    const sim = simulateCircuit(solvedTiles, rows, cols);
    if (!sim.isAllLit || sim.litCount !== actualBulbCount) {
      continue; // Try again to guarantee 100% solvability
    }

    const titleList = ['脉冲回响', '星光蔓生', '流光矩阵', '双生回路', '星火漫溢', '乐园深处'];
    const title = titleList[(levelIndex - 1) % titleList.length] + ` #${levelIndex}`;
    // Generous step budget to avoid frustrating artificial lockouts
    const maxSteps = Math.max(35, minMoves * 2 + 15);

    return {
      tiles: scrambledTiles,
      maxSteps,
      title,
      hintText: `接通 ${actualBulbCount} 处设施，完成这次无尽挑战。`,
    };
  }

  // Fallback to a guaranteed solvable 2-bulb circuit if attempts exceeded
  const fallbackTiles: Tile[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fallbackTiles.push({
        id: `tile-${r}-${c}`,
        row: r,
        col: c,
        type: 'empty',
        rotation: 0,
        basePorts: Direction.NONE,
      });
    }
  }
  const setF = (r: number, c: number, type: TileType, rot: number, locked = false) => {
    const idx = fallbackTiles.findIndex(t => t.row === r && t.col === c);
    if (idx !== -1) {
      fallbackTiles[idx] = {
        id: `tile-${r}-${c}`,
        row: r,
        col: c,
        type,
        rotation: rot,
        basePorts: getDefaultBasePorts(type),
        locked,
      };
    }
  };
  setF(2, 0, 'battery', 0, true);
  setF(2, 1, 'line', 90);
  setF(2, 2, 't_shape', 180);
  setF(1, 2, 'corner', 0);
  setF(1, 3, 'line', 90);
  setF(1, 4, 'line', 90);
  setF(1, 5, 'bulb', 0, true);
  setF(3, 2, 'corner', 180);
  setF(3, 3, 'line', 90);
  setF(3, 4, 'line', 90);
  setF(3, 5, 'bulb', 0, true);

  return {
    tiles: fallbackTiles,
    maxSteps: 35,
    title: `星光矩阵 #${levelIndex}`,
    hintText: `接通 2 处设施，完成这次无尽挑战。`,
  };
}
