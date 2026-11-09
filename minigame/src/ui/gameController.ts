/**
 * GameController：App.tsx 游戏状态机的平台无关移植。
 * 覆盖：旋转/水闸操作、步数、撤销历史（上限 25 步）、胜利判定与战绩、
 * 成就触发上下文、+10 步补给。持久化与 UI 副作用通过回调上抛。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { HistorySnapshot, LevelConfig, SimulationResult, Tile } from '../types/game';
import { simulateCircuit } from '../logic/circuit';
import { sound } from '../logic/audio';
import { haptics } from '../logic/haptics';

export interface VictoryInfo {
  levelId: number;
  stepsUsed: number;
  remainingSteps: number;
  maxSteps: number;
  bestSteps: number;
  previousBest: number | null;
  isNewRecord: boolean;
  levelUndosUsed: number;
  hasUsedTimelineJump: boolean;
  hasToggledSwitch: boolean;
}

function getTileActionDescription(tile: Tile, action: 'rotate' | 'switch'): string {
  if (action === 'switch') {
    return `切换 (${tile.row + 1}, ${tile.col + 1}) 水闸通断`;
  }
  let name = '水渠';
  if (tile.type === 'line') name = '直管';
  else if (tile.type === 'corner') name = '弯管';
  else if (tile.type === 't_shape') name = '三通';
  else if (tile.type === 'cross') name = '十字';
  else if (tile.type === 'switch') name = '水闸水渠';
  else if (tile.type === 'diode') name = '单向灵梭';
  return `旋转 (${tile.row + 1}, ${tile.col + 1}) ${name}`;
}

export class GameController {
  level: LevelConfig;
  tiles: Tile[];
  remainingSteps: number;
  stepsUsed = 0;
  history: HistorySnapshot[] = [];
  historyIndex = 0;
  simulation: SimulationResult;

  levelUndosUsed = 0;
  hasUsedTimelineJump = false;
  hasToggledSwitch = false;
  winFired = false;

  /** 已通关关卡与最佳步数（由外部同步） */
  bestRecord: Record<number, number>;
  clearedLevels: number[];

  onChange: (() => void) | null = null;
  onVictory: ((v: VictoryInfo) => void) | null = null;
  onOutOfSteps: (() => void) | null = null;

  constructor(level: LevelConfig, progress: { cleared: number[]; best: Record<number, number> }) {
    this.level = level;
    this.bestRecord = progress.best;
    this.clearedLevels = progress.cleared;
    this.tiles = level.tiles.map((t) => ({ ...t }));
    this.remainingSteps = level.maxSteps;
    this.simulation = simulateCircuit(this.tiles, level.gridRows, level.gridCols);
    this.history = [this.snapshot('初始状态')];
    this.historyIndex = 0;
  }

  private snapshot(desc: string): HistorySnapshot {
    return {
      id: `snap-${Date.now()}-${this.historyIndex}`,
      stepNumber: this.historyIndex,
      tiles: this.tiles.map((t) => ({ ...t })),
      remainingSteps: this.remainingSteps,
      stepsUsed: this.stepsUsed,
      litCount: this.simulation.litCount,
      totalBulbs: this.simulation.totalBulbs,
      description: desc,
    };
  }

  /** 最近一次成功的瓦片操作（模拟玩家测试 / 埋点用） */
  lastAction: 'rotate' | 'toggle-switch' | null = null;

  private resimulate(): void {
    this.simulation = simulateCircuit(this.tiles, this.level.gridRows, this.level.gridCols);
  }

  /** 瓦片操作（rotate / toggle-switch） */
  handleTileClick(tile: Tile, action?: 'rotate' | 'toggle-switch'): void {
    if (tile.locked || tile.type === 'empty') return;

    if (this.remainingSteps <= 0 && !this.simulation.isAllLit) {
      sound.playFail();
      haptics.outOfSteps();
      this.onOutOfSteps?.();
      return;
    }

    let actionDesc = '';
    let nextTiles: Tile[];

    if (tile.type === 'switch' && action === 'toggle-switch') {
      sound.playSwitch();
      haptics.tapHeavy();
      this.hasToggledSwitch = true;
      this.lastAction = 'toggle-switch';
      actionDesc = getTileActionDescription(tile, 'switch');
      nextTiles = this.tiles.map((t) =>
        t.id === tile.id ? { ...t, switchClosed: !t.switchClosed } : t
      );
    } else {
      sound.playRotate();
      haptics.tapLight();
      this.lastAction = 'rotate';
      actionDesc = getTileActionDescription(tile, 'rotate');
      nextTiles = this.tiles.map((t) =>
        t.id === tile.id ? { ...t, rotation: t.rotation + 90 } : t
      );
    }

    this.tiles = nextTiles;
    this.remainingSteps = Math.max(0, this.remainingSteps - 1);
    this.stepsUsed += 1;
    this.resimulate();

    // 回溯后新步骤：截断未来 + 追加（上限 25）
    const nextSnapshot: HistorySnapshot = {
      ...this.snapshot(actionDesc),
      stepNumber: this.historyIndex + 1,
    };
    const updated = [...this.history.slice(0, this.historyIndex + 1), nextSnapshot].slice(-25);
    this.history = updated;
    this.historyIndex = updated.length - 1;

    this.checkVictory();
    this.onChange?.();
  }

  undo(): void {
    if (this.historyIndex <= 0) return;
    const target = this.history[this.historyIndex - 1];
    if (!target) return;
    this.levelUndosUsed += 1;
    haptics.undo();
    sound.playRotate();
    this.historyIndex -= 1;
    this.restore(target);
    this.onChange?.();
  }

  redo(): void {
    if (this.historyIndex >= this.history.length - 1) return;
    const target = this.history[this.historyIndex + 1];
    if (!target) return;
    haptics.undo();
    sound.playRotate();
    this.historyIndex += 1;
    this.restore(target);
    this.onChange?.();
  }

  jumpToStep(targetIdx: number): void {
    if (targetIdx < 0 || targetIdx >= this.history.length || targetIdx === this.historyIndex) return;
    const target = this.history[targetIdx];
    if (!target) return;
    this.hasUsedTimelineJump = true;
    sound.playRotate();
    this.historyIndex = targetIdx;
    this.restore(target);
    this.onChange?.();
  }

  resetToStart(): void {
    this.jumpToStep(0);
  }

  addSteps(n = 10): void {
    this.remainingSteps += n;
    this.onChange?.();
  }

  private restore(target: HistorySnapshot): void {
    this.tiles = target.tiles.map((t) => ({ ...t }));
    this.remainingSteps = target.remainingSteps;
    this.stepsUsed = target.stepsUsed ?? 0;
    this.resimulate();
  }

  private checkVictory(): void {
    if (this.simulation.isAllLit && !this.winFired) {
      this.winFired = true;
      sound.playWin();
      haptics.victory();

      const prevBest = this.bestRecord[this.level.id];
      const isNew = prevBest === undefined || this.stepsUsed < prevBest;
      const best = isNew ? this.stepsUsed : prevBest;

      if (isNew) this.bestRecord[this.level.id] = best;
      if (!this.clearedLevels.includes(this.level.id)) {
        this.clearedLevels.push(this.level.id);
        this.clearedLevels.sort((a, b) => a - b);
      }

      this.onVictory?.({
        levelId: this.level.id,
        stepsUsed: this.stepsUsed,
        remainingSteps: this.remainingSteps,
        maxSteps: this.level.maxSteps,
        bestSteps: best,
        previousBest: prevBest ?? null,
        isNewRecord: isNew,
        levelUndosUsed: this.levelUndosUsed,
        hasUsedTimelineJump: this.hasUsedTimelineJump,
        hasToggledSwitch: this.hasToggledSwitch,
      });
    }
    if (!this.simulation.isAllLit) {
      this.winFired = false;
    }
  }
}
