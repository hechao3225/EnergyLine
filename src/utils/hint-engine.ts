import type { LevelConfig, Tile } from '../types/game';
import { solveRuleLevel } from './rule-solver';

/** 提示引擎覆盖到第几关（主线 1–99 全部）。 */
export const HINT_ENGINE_MAX_LEVEL = 99;

/**
 * 这一关能不能用引擎求解。
 *
 * 统一求解器认识联动轴、环面、双色、禁环、达标关和焊死顺序。
 * 只对超过四个独立联动组的盘面退回文案，避免指数枚举拖慢手机。
 */
export function supportsHintEngine(level: LevelConfig): boolean {
  const groups = new Set(level.tiles.map((tile) => tile.axis).filter(Boolean));
  return groups.size <= 4;
}

export type HintAction = 'rotate' | 'toggle-switch' | 'rotate-axis';

export interface HintMove {
  tileId: string;
  row: number;
  col: number;
  label: string;
  action: HintAction;
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
    result = solveRuleLevel({ ...level, tiles });
  } catch {
    return null;
  }
  if (!result) return null;

  const moveFromStep = (step: (typeof result.orderedSteps)[number]): HintMove | null => {
    const tile = step.axis
      ? [...tiles]
          .filter((item) => item.axis === step.axis)
          .sort((a, b) => a.row - b.row || a.col - b.col)[0]
      : tiles.find((item) => item.id === step.id);
    if (!tile) return null;
    const action: HintAction = step.axis
      ? 'rotate-axis'
      : step.toggle
        ? 'toggle-switch'
        : 'rotate';
    return {
      tileId: tile.id,
      row: tile.row,
      col: tile.col,
      label: step.axis ? '联动轴' : LABELS[tile.type],
      action,
      taps: step.taps,
      toggle: Boolean(step.toggle),
      stepsNeeded: result.par,
      reachable: result.par <= remainingSteps,
    };
  };

  for (const step of result.orderedSteps) {
    const move = moveFromStep(step);
    if (!move) continue;
    const next = applyHintAction(level, tiles, move);
    const remaining = solveRuleLevel({ ...level, tiles: next });
    if (remaining?.par === result.par - 1) return move;
  }
  return null;
}

/**
 * 从当前盘面连续找最多 count 个正确下一步，不修改传入盘面。
 * 序列中的每一项只代表一次点击，旋转提示的 taps 固定为 1；
 * findHint 的单步提示仍保留该格剩余 taps。
 */
export function findHintSequence(
  level: LevelConfig,
  tiles: Tile[],
  remainingSteps: number,
  count: number,
): HintMove[] {
  const sequence: HintMove[] = [];
  let currentTiles = tiles;
  let budget = remainingSteps;

  for (let index = 0; index < count && budget > 0; index++) {
    const move = findHint(level, currentTiles, budget);
    if (!move?.reachable) break;
    const singleTapMove = { ...move, taps: Math.min(move.taps, 1) };
    sequence.push(singleTapMove);
    currentTiles = applyHintAction(level, currentTiles, singleTapMove);
    budget--;
  }

  return sequence;
}

export function applyHintAction(level: LevelConfig, tiles: Tile[], move: HintMove): Tile[] {
  const clicked = tiles.find((tile) => tile.id === move.tileId);
  const axis = move.action === 'rotate-axis' ? clicked?.axis : undefined;
  return tiles.map((tile) => {
    if (axis && tile.axis === axis) {
      return { ...tile, rotation: tile.rotation + 90 * (tile.axisDir ?? 1) };
    }
    if (tile.id !== move.tileId) return tile;
    if (move.action === 'toggle-switch') {
      return { ...tile, switchClosed: tile.switchClosed === false };
    }
    return { ...tile, rotation: tile.rotation + 90 };
  });
}

/** 提示文案：怎么点、点几次 */
export function describeHint(move: HintMove): string {
  const where = `第 ${move.row + 1} 行第 ${move.col + 1} 列`;
  const actions: string[] = [];
  if (move.action === 'toggle-switch') actions.push("点角标扳通");
  if (move.action === 'rotate-axis') actions.push("点这一组任意一格，联动转 1 次");
  if (move.action === 'rotate' && move.taps > 0) actions.push(`转 ${move.taps} 次`);
  if (actions.length === 0) return `${where} 的${move.label}：先不用动`;
  return `${where} 的${move.label}：${actions.join("，")}`;
}
