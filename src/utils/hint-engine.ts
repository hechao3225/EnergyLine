import type { LevelConfig, Tile } from '../types/game';
import { solveMinTaps } from './hint-solver';

/** 提示引擎覆盖到第几关（主线 1–99 全部）。 */
export const HINT_ENGINE_MAX_LEVEL = 99;

/**
 * 这一关能不能用引擎求解。
 *
 * 求解器只管「旋转 + 扳闸」，还不认识联动轴（点一格整组转）和双色/禁环规则，
 * 遇到这类关卡必须退回文案提示——给出错误的一步比不给提示更伤。
 */
export function supportsHintEngine(level: LevelConfig): boolean {
  if (level.rules) return false;
  return !level.tiles.some((tile) => tile.axis);
}

export interface HintMove {
  tileId: string;
  row: number;
  col: number;
  label: string;
  /** 这一格还需要转几下（整关最优解里） */
  taps: number;
  /** 需要扳闸而不是旋转 */
  toggle: boolean;
  /** 从当前盘面到通关还需要的步数 */
  stepsNeeded: number;
  /** 剩余步数够不够走完 */
  reachable: boolean;
}

const LABELS: Record<Tile['type'], string> = {
  empty: '空格',
  battery: '能量源',
  bulb: '设施',
  line: '直管',
  corner: '弯管',
  t_shape: '三通',
  cross: '十字管',
  switch: '能量闸',
  diode: '单向管',
};

/**
 * 按「玩家此刻的盘面」算下一步。
 *
 * 求解器给出的是一整套最优方案（每格转几下），这里只取第一处还要动的格子，
 * 所以玩家无论前面怎么绕，提示都对得上当前局面。
 *
 * 返回 null 表示这一局已经无从下手（光束被彻底堵死），调用方应提示重开。
 */
export function findHint(
  level: LevelConfig,
  tiles: Tile[],
  remainingSteps: number,
): HintMove | null {
  let result;
  try {
    result = solveMinTaps({ ...level, tiles });
  } catch {
    return null;
  }
  const step = result.plan.find((item) => item.toggle || item.rotateTaps > 0);
  if (!step) return null;
  const tile = tiles.find((item) => item.id === step.id);
  if (!tile) return null;
  const stepsNeeded = result.par;
  return {
    tileId: tile.id,
    row: tile.row,
    col: tile.col,
    label: LABELS[tile.type],
    taps: step.rotateTaps,
    toggle: step.toggle,
    stepsNeeded,
    reachable: stepsNeeded <= remainingSteps,
  };
}

/** 提示文案：怎么点、点几次 */
export function describeHint(move: HintMove): string {
  const where = `第 ${move.row + 1} 行第 ${move.col + 1} 列`;
  const actions: string[] = [];
  if (move.toggle) actions.push("点角标扳通");
  if (move.taps > 0) actions.push(`转 ${move.taps} 次`);
  if (actions.length === 0) return `${where} 的${move.label}：先不用动`;
  return `${where} 的${move.label}：${actions.join("，")}`;
}
