/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Direction, Tile } from '../types/game';
import { getTilePorts, getOppositeDirection } from './circuit';

export interface FlowSegment {
  id: string;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
}

export interface TileCoord {
  row: number;
  col: number;
  id: string;
}

const NEIGHBOR_CHECKS: [number, number, Direction][] = [
  [-1, 0, Direction.UP],
  [0, 1, Direction.RIGHT],
  [1, 0, Direction.DOWN],
  [0, -1, Direction.LEFT],
];

export function computeActiveWaterPaths(
  tiles: Tile[],
  gridRows: number,
  gridCols: number,
  poweredTileIds: Set<string>
): {
  segments: FlowSegment[];
  sourceTile: TileCoord | null;
  sourceTiles: TileCoord[];
  bulbTiles: TileCoord[];
} {
  const tileMap = new Map<string, Tile>();
  const sourceTiles: TileCoord[] = [];
  const bulbTiles: TileCoord[] = [];

  for (const t of tiles) {
    tileMap.set(`${t.row},${t.col}`, t);
    if (t.type === 'battery') {
      sourceTiles.push({ row: t.row, col: t.col, id: t.id });
    }
    if (t.type === 'bulb') {
      bulbTiles.push({ row: t.row, col: t.col, id: t.id });
    }
  }

  const segments: FlowSegment[] = [];
  const visitedEdge = new Set<string>();

  for (const tile of tiles) {
    if (!poweredTileIds.has(tile.id)) continue;
    const ports = getTilePorts(tile);

    for (const [dr, dc, outDir] of NEIGHBOR_CHECKS) {
      if ((ports & outDir) === 0) continue;
      const nr = tile.row + dr;
      const nc = tile.col + dc;
      if (nr < 0 || nr >= gridRows || nc < 0 || nc >= gridCols) continue;

      const neighbor = tileMap.get(`${nr},${nc}`);
      if (!neighbor || !poweredTileIds.has(neighbor.id)) continue;

      const nPorts = getTilePorts(neighbor);
      const reqInDir = getOppositeDirection(outDir);
      if ((nPorts & reqInDir) === 0) continue;

      // Unique edge key
      const key =
        tile.id < neighbor.id
          ? `${tile.id}---${neighbor.id}`
          : `${neighbor.id}---${tile.id}`;

      if (!visitedEdge.has(key)) {
        visitedEdge.add(key);
        segments.push({
          id: key,
          r1: tile.row,
          c1: tile.col,
          r2: neighbor.row,
          c2: neighbor.col,
        });
      }
    }
  }

  return { segments, sourceTile: sourceTiles[0] || null, sourceTiles, bulbTiles };
}
