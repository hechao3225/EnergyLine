/**
 * 电路（灵泉水路）仿真核心 —— 与 H5 版 src/utils/circuit.ts 逐行对齐
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Direction, SimulationResult, Tile, TileType } from '../types/game';

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
      return Direction.RIGHT;
    case 'bulb':
      return Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT;
    case 'line':
      return Direction.LEFT | Direction.RIGHT;
    case 'corner':
      return Direction.DOWN | Direction.RIGHT;
    case 't_shape':
      return Direction.LEFT | Direction.RIGHT | Direction.DOWN;
    case 'cross':
      return Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT;
    case 'switch':
      return Direction.LEFT | Direction.RIGHT;
    case 'diode':
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
  gridCols: number = 6
): SimulationResult {
  const tileMap = new Map<string, Tile>();
  const batteries: Tile[] = [];
  const bulbs: Tile[] = [];

  for (const t of tiles) {
    tileMap.set(`${t.row},${t.col}`, t);
    if (t.type === 'battery') batteries.push(t);
    if (t.type === 'bulb') bulbs.push(t);
  }

  const poweredTileIds = new Set<string>();
  const litBulbIds = new Set<string>();
  const poweredEdges = new Set<string>();

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
      if (!(curPorts & outDir)) continue;

      const nRow = current.row + dr;
      const nCol = current.col + dc;
      if (nRow < 0 || nRow >= gridRows || nCol < 0 || nCol >= gridCols) continue;

      const neighbor = tileMap.get(`${nRow},${nCol}`);
      if (!neighbor || neighbor.type === 'empty') continue;

      const neighborPorts = getTilePorts(neighbor);

      if (!(neighborPorts & inDir)) continue;

      // Diode: current must enter through the allowed inward port
      if (neighbor.type === 'diode') {
        const allowedOutDir = rotatePorts(Direction.RIGHT, neighbor.rotation);
        const allowedInDir = rotatePorts(Direction.LEFT, neighbor.rotation);
        if (inDir !== allowedInDir) {
          continue;
        }
      }

      const edgeKey = `${current.row},${current.col}->${nRow},${nCol}`;
      poweredEdges.add(edgeKey);

      if (!poweredTileIds.has(neighbor.id)) {
        poweredTileIds.add(neighbor.id);

        if (neighbor.type === 'bulb') {
          litBulbIds.add(neighbor.id);
        }

        if (neighbor.type !== 'bulb' && neighbor.type !== 'battery') {
          queue.push({ tile: neighbor, fromDir: inDir });
        }
      }
    }
  }

  const isAllLit = bulbs.length > 0 && litBulbIds.size === bulbs.length;

  return {
    poweredTileIds,
    litBulbIds,
    poweredEdges,
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
    const batteryRow = 2 + Math.floor(Math.random() * 2);
    inTree.add(`${batteryRow},0`);
    inTree.add(`${batteryRow},1`);
    addEdge(batteryRow, 0, batteryRow, 1, Direction.RIGHT, Direction.LEFT);

    // 2. Select distinct bulb positions on right column
    const bulbPositions: [number, number][] = [];
    const availableRows = [0, 1, 2, 3, 4, 5].filter((r) => Math.abs(r - batteryRow) > 0 || bulbCount > 2);
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

    // 5. Verify with circuit simulation!
    const sim = simulateCircuit(solvedTiles, rows, cols);
    if (!sim.isAllLit || sim.litCount !== actualBulbCount) {
      continue;
    }

    const titleList = ['脉冲回响', '电网蔓生', '流光矩阵', '双生回路', '星火漫溢', '蜂巢深处'];
    const title = titleList[(levelIndex - 1) % titleList.length] + ` #${levelIndex}`;
    const maxSteps = Math.max(35, minMoves * 2 + 15);

    return {
      tiles: scrambledTiles,
      maxSteps,
      title,
      hintText: `寻找通往 ${actualBulbCount} 盏灯的最佳回路，点亮蜂巢。`,
    };
  }

  // Fallback
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
    const idx = fallbackTiles.findIndex((t) => t.row === r && t.col === c);
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
    title: `蜂巢矩阵 #${levelIndex}`,
    hintText: `寻找通往 2 盏灯的回路。`,
  };
}
