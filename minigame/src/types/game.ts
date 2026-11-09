/**
 * 神树灵泉 · 小游戏移植 —— 核心游戏类型（与 H5 版 src/types/game.ts 对齐）
 * @license SPDX-License-Identifier: Apache-2.0
 */

// Bitmask for port directions
// （H5 版为 const enum；小游戏端为兼容测试直引用改为常规 enum，值语义不变）
export enum Direction {
  NONE = 0,
  UP = 1 << 0,     // 1 (0001)
  RIGHT = 1 << 1,  // 2 (0010)
  DOWN = 1 << 2,   // 4 (0100)
  LEFT = 1 << 3,   // 8 (1000)
}

export type TileType =
  | 'empty'     // Empty slot dot
  | 'battery'   // Power source (fixed)
  | 'bulb'      // Goal lightbulb (fixed)
  | 'line'      // Straight pipe (2 opposing ports)
  | 'corner'    // Elbow/corner pipe (2 adjacent ports)
  | 't_shape'   // 3-way T-junction
  | 'cross'     // 4-way cross junction
  | 'switch'    // Toggle switch (can open/close circuit)
  | 'diode';    // Diode (one-way electric flow)

export interface Tile {
  id: string;
  row: number;
  col: number;
  type: TileType;
  rotation: number;        // Cumulative angle in degrees (0, 90, 180, 270, 360, ...)
  basePorts: number;       // Port bitmask at rotation = 0
  locked?: boolean;        // Fixed in place, cannot be rotated by player
  switchClosed?: boolean;  // For switch tile: true = conducting, false = disconnected
  label?: string;
}

export interface SimulationResult {
  poweredTileIds: Set<string>;
  litBulbIds: Set<string>;
  poweredEdges: Set<string>; // "r1,c1->r2,c2"
  isAllLit: boolean;
  totalBulbs: number;
  litCount: number;
}

export interface LevelConfig {
  id: number;
  code: string;            // e.g. "02"
  totalLevels: number;     // e.g. 99
  title: string;           // e.g. "双路分流"
  subtitle?: string;
  hintText: string;
  winText: string;
  maxSteps: number;
  /** 本关真实最少点击次数（4★ 线），由 H5 侧 scripts/solve-min-par.ts 精确求解 */
  parSteps?: number;
  gridRows: number;
  gridCols: number;
  tiles: Tile[];
}

export interface HistorySnapshot {
  id: string;
  stepNumber: number;
  tiles: Tile[];
  remainingSteps: number;
  stepsUsed?: number;
  litCount: number;
  totalBulbs: number;
  description: string;
}

export type GameView = 'story' | 'endless' | 'editor' | 'level_select';
