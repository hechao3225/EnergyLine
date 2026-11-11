/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Bitmask for port directions
export const enum Direction {
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
  rotation: number;        // Cumulative angle in degrees (e.g. 0, 90, 180, 270, 360, 450...)
  basePorts: number;       // Port bitmask at rotation = 0
  locked?: boolean;        // Fixed in place, cannot be rotated by player (e.g., battery, bulb)
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
  totalLevels: number;     // e.g. 7
  title: string;           // e.g. "双路分流"
  subtitle?: string;
  hintText: string;        // e.g. "规划上下支路，把电送到两盏灯。"
  winText: string;         // e.g. "本关已点亮！准备好下一次分流了吗？"
  maxSteps: number;
  /**
   * The true minimum number of taps (rotations + switch toggles) that can clear
   * the level — any legal solution, not just the designed layout. Computed by
   * scripts/solve-min-par.ts (exact Steiner-tree search), so the value shown as
   *「本关最少步数」and the 4-star threshold always match what players can achieve.
   */
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
  /** Real number of player taps spent so far (not affected by +10 step top-ups) */
  stepsUsed?: number;
  litCount: number;
  totalBulbs: number;
  description: string;
}

export type GameView = 'story' | 'endless' | 'editor' | 'level_select';

