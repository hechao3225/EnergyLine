/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ZoneId } from './content';

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
  | 'diode'     // Diode (one-way electric flow)
  | 'rotor';    // Powered turntable (rotates its surrounding ring once)

export interface Tile {
  id: string;
  row: number;
  col: number;
  type: TileType;
  rotation: number;        // Cumulative angle in degrees (e.g. 0, 90, 180, 270, 360, 450...)
  basePorts: number;       // Port bitmask at rotation = 0
  locked?: boolean;        // Fixed in place, cannot be rotated by player (e.g., battery, bulb)
  /** 联动轴：同一 axis 的格子共用一根转轴，点任意一格整组同转 */
  axis?: string;
  /**
   * 咬合齿轮的方向：同一 axis 组里 +1 顺时针、-1 逆时针。
   * 缺省（undefined）= 老式同向联动；任意一格被点，整组按各自的符号转过 90°。
   */
  axisDir?: 1 | -1;
  /** 双色关卡：泉眼的供能色 / 设施的需求色（0 或 1） */
  color?: number;
  switchClosed?: boolean;  // For switch tile: true = conducting, false = disconnected
  label?: string;
  /** 动力转盘作用半径；缺省为 1，即周围 8 格 */
  rotorRadius?: number;
  /** 动力转盘是否已经放电换位 */
  rotorActivated?: boolean;
}

/** 关卡级规则（不是某个格子的属性） */
export interface LevelRules {
  /** 2 = 双色能量：串色即灭 */
  colors?: number;
  /** 禁环：通电网络里出现回路 → 整段过载，全部设施熄灭 */
  noCycle?: boolean;
  /** 环面：左右、上下边界相接（从右边出去会从左边回来） */
  wrap?: boolean;
  /** 焊死：已通电的格子不能再转（实验） */
  weld?: boolean;
}

export type MechanicTag =
  | "basic"
  | "cross"
  | "multi-source"
  | "decoy"
  | "switch"
  | "diode"
  | "axis"
  | "wrap"
  | "goal"
  | "weld"
  | "gear"
  | "rotor"
  | "colors"
  | "noCycle"
  | "7x7";

export type QuestionType =
  | "定位"
  | "顺序"
  | "取舍"
  | "相变"
  | "禁忌"
  | "分区"
  | "规模";

export type LevelRole =
  | "教"
  | "练"
  | "变"
  | "回声"
  | "谷"
  | "考"
  | "boss"
  | "预演";

export interface SimulationResult {
  /** 双色关卡里每格到达的颜色掩码（1=0 号色，2=1 号色，3=串色） */
  tileColors?: Map<string, number>;
  /** 出现回路，整段过载 */
  overloaded?: boolean;
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
  /** 展示文案来自 src/content/levels.ts；自定义/无尽关卡可回退到这里 */
  title?: string;           // e.g. "双路分流"
  subtitle?: string;
  winText?: string;         // 自定义/无尽关卡兜底文案
  hintText?: string;        // e.g. "规划上下支路，把电送到两盏灯。"
  /** 所属主题区；中心关卡为 center */
  zoneId?: ZoneId;
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
  /** 获胜所需点亮的设施数；缺省 = 全部点亮（老关卡行为） */
  goal?: number;
  /** 关卡等级标记：hell = 地狱关（零容错、首通奖励更高） */
  tier?: "hell";
  rules?: LevelRules;
  /** 审计、教学卡与机制断言使用的关卡标签 */
  mechanicTags?: MechanicTag[];
  primaryMechanic?: MechanicTag;
  questionType?: QuestionType;
  role?: LevelRole;
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

