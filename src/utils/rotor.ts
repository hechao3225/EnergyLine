import type { LevelConfig, Tile } from "../types/game";
import { simulateCircuit } from "./circuit";

export interface RotorActivationResult {
  tiles: Tile[];
  activatedIds: string[];
}

/** 环轨位置按顺时针排列：上边从左到右，右边从上到下，下边从右到左，左边从下到上。 */
export function getRotorRingPositions(rotor: Tile): { row: number; col: number }[] {
  const radius = Math.max(1, Math.floor(rotor.rotorRadius ?? 1));
  const positions: { row: number; col: number }[] = [];
  const top = rotor.row - radius;
  const bottom = rotor.row + radius;
  const left = rotor.col - radius;
  const right = rotor.col + radius;

  for (let col = left; col <= right; col++) positions.push({ row: top, col });
  for (let row = top + 1; row <= bottom; row++) positions.push({ row, col: right });
  for (let col = right - 1; col >= left; col--) positions.push({ row: bottom, col });
  for (let row = bottom - 1; row > top; row--) positions.push({ row, col: left });

  return positions;
}

/**
 * 处理本次操作后首次通电的转盘。
 *
 * 一台转盘启动后，周围环轨上的管道整体顺时针移动一格，管道朝向保持不变。
 * 换位本身不消耗步数；多个转盘同时被本次接线激活时按盘面顺序依次处理。
 */
export function activatePoweredRotors(
  level: LevelConfig,
  currentTiles: Tile[],
): RotorActivationResult {
  let tiles = currentTiles;
  const activatedIds: string[] = [];
  const rotorCount = tiles.filter((tile) => tile.type === "rotor").length;

  while (activatedIds.length < rotorCount) {
    const simulation = simulateCircuit(
      tiles,
      level.gridRows,
      level.gridCols,
      level.rules,
    );
    const rotor = tiles
      .filter(
        (tile) =>
          tile.type === "rotor" &&
          !tile.rotorActivated &&
          simulation.poweredTileIds.has(tile.id),
      )
      .sort((a, b) => a.row - b.row || a.col - b.col)[0];
    if (!rotor) break;

    const positions = getRotorRingPositions(rotor);
    const indexByPosition = new Map(
      tiles.map((tile, index) => [`${tile.row},${tile.col}`, index]),
    );
    const ringTiles = positions.map(({ row, col }) => {
      const index = indexByPosition.get(`${row},${col}`);
      if (index === undefined || tiles[index].type === "rotor") {
        throw new Error(`动力转盘 ${rotor.id} 的环轨缺少可用格位`);
      }
      return tiles[index];
    });

    const nextTiles = tiles.map((tile) => ({ ...tile }));
    positions.forEach((position, index) => {
      const source = ringTiles[(index - 1 + ringTiles.length) % ringTiles.length];
      const destination = indexByPosition.get(`${position.row},${position.col}`)!;
      nextTiles[destination] = {
        ...source,
        row: position.row,
        col: position.col,
      };
    });
    const rotorIndex = indexByPosition.get(`${rotor.row},${rotor.col}`)!;
    nextTiles[rotorIndex] = { ...nextTiles[rotorIndex], rotorActivated: true };

    tiles = nextTiles;
    activatedIds.push(rotor.id);
  }

  return { tiles, activatedIds };
}
