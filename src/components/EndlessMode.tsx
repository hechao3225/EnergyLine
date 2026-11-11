/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { triggerConfetti } from '../utils/confetti';
import { Tile, SimulationResult, HistorySnapshot } from '../types/game';
import { simulateCircuit, generateEndlessLevel } from '../utils/circuit';
import { sound } from '../utils/audio';
import { GameBoard } from './GameBoard';
import { RulePanel } from './RulePanel';
import { StatusPanel } from './StatusPanel';
import { Sparkles, Trophy, BookOpen, Eye, RotateCcw, ChevronRight, Plus, Lightbulb, ArrowLeft } from 'lucide-react';
import { UndoHistoryTimeline } from './UndoHistoryTimeline';
import { RulesModal } from './RulesModal';
import { Achievement } from '../types/achievement';
import { checkVictoryAchievements, trackUndoOperation } from '../utils/achievements';

function getTileActionDescription(tile: Tile, action: 'rotate' | 'switch'): string {
  if (action === 'switch') {
    return `切换 (${tile.row + 1}, ${tile.col + 1}) 开关`;
  }
  let name = '导线';
  if (tile.type === 'line') name = '直管';
  else if (tile.type === 'corner') name = '弯管';
  else if (tile.type === 't_shape') name = '三通';
  else if (tile.type === 'cross') name = '十字';
  return `旋转 (${tile.row + 1}, ${tile.col + 1}) ${name}`;
}

interface EndlessModeProps {
  onHome: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

export const EndlessMode: React.FC<EndlessModeProps> = ({
  onHome,
  isMuted,
  onToggleMute,
  onAchievementUnlocked,
}) => {
  const [levelIndex, setLevelIndex] = useState(1);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [streak, setStreak] = useState(0);

  // Synchronously initialize first puzzle data so the very first render has full tiles and history!
  const initialData = useMemo(() => {
    const generated = generateEndlessLevel(1, 3, 6, 6);
    const freshTiles = generated.tiles.map((t) => ({ ...t }));
    const sim = simulateCircuit(freshTiles, 6, 6);
    const initialSnap: HistorySnapshot = {
      id: `snap-${Date.now()}-0`,
      stepNumber: 0,
      tiles: freshTiles.map((t) => ({ ...t })),
      remainingSteps: generated.maxSteps,
      litCount: sim.litCount,
      totalBulbs: sim.totalBulbs,
      description: '初始状态',
    };
    return {
      tiles: freshTiles,
      maxSteps: generated.maxSteps,
      title: generated.title,
      hintText: generated.hintText,
      initialSnap,
    };
  }, []);

  const [tiles, setTiles] = useState<Tile[]>(() => initialData.tiles);
  const [maxSteps, setMaxSteps] = useState<number>(() => initialData.maxSteps);
  const [remainingSteps, setRemainingSteps] = useState<number>(() => initialData.maxSteps);
  const [title, setTitle] = useState<string>(() => initialData.title);
  const [hintText, setHintText] = useState<string>(() => initialData.hintText);
  const [isPeekActive, setIsPeekActive] = useState(false);
  const [historyTimeline, setHistoryTimeline] = useState<HistorySnapshot[]>(() => [initialData.initialSnap]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

  const levelUndosUsedRef = useRef<number>(0);
  const hasUsedTimelineJumpRef = useRef<boolean>(false);
  const hasToggledSwitchRef = useRef<boolean>(false);
  const winFiredRef = useRef<boolean>(false);
  const isFirstMountRef = useRef<boolean>(true);

  const bulbCount = difficulty === 'easy' ? 2 : difficulty === 'hard' ? 4 : 3;

  // Generate new level
  const startNewLevel = useCallback((idx: number, diff: 'easy' | 'medium' | 'hard') => {
    const bCount = diff === 'easy' ? 2 : diff === 'hard' ? 4 : 3;
    const generated = generateEndlessLevel(idx, bCount, 6, 6);
    const freshTiles = generated.tiles.map((t) => ({ ...t }));
    const sim = simulateCircuit(freshTiles, 6, 6);

    setTiles(freshTiles);
    setMaxSteps(generated.maxSteps);
    setRemainingSteps(generated.maxSteps);
    setTitle(generated.title);
    setHintText(generated.hintText);

    const initialSnap: HistorySnapshot = {
      id: `snap-${Date.now()}-0`,
      stepNumber: 0,
      tiles: freshTiles.map((t) => ({ ...t })),
      remainingSteps: generated.maxSteps,
      litCount: sim.litCount,
      totalBulbs: sim.totalBulbs,
      description: '初始状态',
    };
    setHistoryTimeline([initialSnap]);
    setHistoryIndex(0);
    levelUndosUsedRef.current = 0;
    hasUsedTimelineJumpRef.current = false;
    hasToggledSwitchRef.current = false;
    winFiredRef.current = false;
  }, []);

  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    startNewLevel(levelIndex, difficulty);
  }, [levelIndex, difficulty, startNewLevel]);

  // Run simulation
  const simulation: SimulationResult = React.useMemo(() => {
    return simulateCircuit(tiles, 6, 6);
  }, [tiles]);

  // Handle tile rotation
  const handleTileClick = (clickedTile: Tile) => {
    if (clickedTile.locked || clickedTile.type === 'empty') return;
    if (remainingSteps <= 0 && !simulation.isAllLit) {
      sound.playFail();
      return;
    }

    let nextTiles: Tile[];
    let actionDesc = '';

    if (clickedTile.type === 'switch') {
      sound.playSwitch();
      hasToggledSwitchRef.current = true;
      actionDesc = getTileActionDescription(clickedTile, 'switch');
      nextTiles = tiles.map((t) => {
        if (t.id === clickedTile.id) {
          return {
            ...t,
            switchClosed: !t.switchClosed,
          };
        }
        return t;
      });
    } else {
      sound.playRotate();
      actionDesc = getTileActionDescription(clickedTile, 'rotate');
      nextTiles = tiles.map((t) => {
        if (t.id === clickedTile.id) {
          return {
            ...t,
            rotation: t.rotation + 90,
          };
        }
        return t;
      });
    }

    const nextRemainingSteps = Math.max(0, remainingSteps - 1);
    const nextSim = simulateCircuit(nextTiles, 6, 6);

    const newSnapshot: HistorySnapshot = {
      id: `snap-${Date.now()}-${historyIndex + 1}`,
      stepNumber: historyIndex + 1,
      tiles: nextTiles.map((t) => ({ ...t })),
      remainingSteps: nextRemainingSteps,
      litCount: nextSim.litCount,
      totalBulbs: nextSim.totalBulbs,
      description: actionDesc,
    };

    const updatedTimeline = [
      ...historyTimeline.slice(0, historyIndex + 1),
      newSnapshot,
    ].slice(-25);

    setHistoryTimeline(updatedTimeline);
    setHistoryIndex(updatedTimeline.length - 1);
    setTiles(nextTiles);
    setRemainingSteps(nextRemainingSteps);
  };

  // Check victory
  useEffect(() => {
    if (simulation.isAllLit && !winFiredRef.current) {
      winFiredRef.current = true;
      sound.playWin();
      triggerConfetti();
      const nextStreak = streak + 1;
      setStreak(nextStreak);

      const res = checkVictoryAchievements({
        levelId: levelIndex,
        stepsUsed: Math.max(0, maxSteps - remainingSteps),
        remainingSteps,
        maxSteps,
        isEndless: true,
        endlessStreak: nextStreak,
        levelUndosUsed: levelUndosUsedRef.current,
        hasUsedTimelineJump: hasUsedTimelineJumpRef.current,
        hasToggledSwitch: hasToggledSwitchRef.current,
      });

      if (res.newlyUnlocked.length > 0 && onAchievementUnlocked) {
        onAchievementUnlocked(res.newlyUnlocked[0]);
      }
    } else if (!simulation.isAllLit) {
      winFiredRef.current = false;
    }
  }, [
    simulation.isAllLit,
    streak,
    levelIndex,
    maxSteps,
    remainingSteps,
    onAchievementUnlocked,
  ]);

  const handleNextLevel = () => {
    setLevelIndex((idx) => idx + 1);
  };

  const handleRestart = () => {
    startNewLevel(levelIndex, difficulty);
  };

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    const targetIdx = historyIndex - 1;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    trackUndoOperation();
    levelUndosUsedRef.current += 1;
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  const handleRedo = useCallback(() => {
    if (historyIndex >= historyTimeline.length - 1) return;
    const targetIdx = historyIndex + 1;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  const handleJumpToStep = useCallback((targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= historyTimeline.length || targetIdx === historyIndex) return;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    hasUsedTimelineJumpRef.current = true;
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  const handleResetToStart = useCallback(() => {
    if (historyTimeline.length === 0 || historyIndex === 0) return;
    const targetSnap = historyTimeline[0];
    hasUsedTimelineJumpRef.current = true;
    setHistoryIndex(0);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-hidden min-h-0">
      {/* Mobile Dedicated 21:9 Zero-Scroll Layout (< lg) */}
      <div className="lg:hidden flex flex-col justify-between items-center h-full w-full px-2 py-1 overflow-hidden">
        {/* Top Difficulty & Quick Status Bar */}
        <div className="w-full max-w-[420px] flex items-center justify-between gap-1.5 px-3 py-1.5 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#dce3d5] shadow-xs shrink-0">
          {/* Difficulty pills */}
          <div className="flex items-center gap-1">
            {(['easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  setStreak(0);
                }}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                  difficulty === d
                    ? 'bg-[#115e59] text-white shadow-xs'
                    : 'bg-slate-100 text-[#475b52] hover:bg-slate-200'
                }`}
              >
                {d === 'easy' ? '初' : d === 'medium' ? '中' : '高'}
              </button>
            ))}
          </div>

          {/* Streak & Steps & Bulbs */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Trophy className="w-3 h-3 text-amber-600" />
              <span>{streak}连胜</span>
            </div>
            <div
              className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${
                remainingSteps <= 3
                  ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                  : 'bg-slate-50 text-[#1b2f27] border-slate-200'
              }`}
            >
              步数 {remainingSteps}
            </div>
            <div
              className={`px-2 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${
                simulation.isAllLit
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <span>💡</span>
              <span>
                {simulation.litCount}/{simulation.totalBulbs}
              </span>
            </div>
          </div>

          {/* Quick Actions: Rules, Peek, Restart */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsRulesOpen(true)}
              title="规则说明"
              className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPeekActive(!isPeekActive)}
              title="透视端口"
              className={`w-7 h-7 rounded-xl flex items-center justify-center cursor-pointer transition-colors border ${
                isPeekActive
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRestart}
              title="重新生成"
              className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center 6x6 Board */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0 py-1">
          <GameBoard
            tiles={tiles}
            gridRows={6}
            gridCols={6}
            simulation={simulation}
            isPeekActive={isPeekActive}
            onTileClick={handleTileClick}
            onLongPressStart={() => setIsPeekActive(true)}
            onLongPressEnd={() => setIsPeekActive(false)}
          />
        </div>

        {/* Bottom Section: Compact Timeline & Quick Navigation */}
        <div className="w-full max-w-[420px] flex flex-col gap-1.5 shrink-0">
          <UndoHistoryTimeline
            timeline={historyTimeline}
            currentIndex={historyIndex}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onJumpToStep={handleJumpToStep}
            onResetToStart={handleResetToStart}
            compact={true}
          />

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 bg-white/70 rounded-xl border border-[#dce3d5]/80">
            <button
              onClick={onHome}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#3d5348] hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>经典模式</span>
            </button>

            <button
              onClick={() => setShowMobileHint(!showMobileHint)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                showMobileHint ? 'bg-amber-100 text-amber-800' : 'text-[#3d5348] hover:bg-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>提示</span>
            </button>

            {remainingSteps <= 0 && !simulation.isAllLit ? (
              <button
                onClick={() => setRemainingSteps((r) => r + 10)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors cursor-pointer animate-bounce"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+10步</span>
              </button>
            ) : simulation.isAllLit ? (
              <button
                onClick={handleNextLevel}
                className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-[#0d9488] hover:bg-[#0f766e] rounded-lg shadow-xs transition-colors cursor-pointer animate-pulse"
              >
                <span>下一关</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[11px] text-[#697d72] px-1 truncate max-w-[120px]">
                {bulbCount} 个终端目标
              </span>
            )}
          </div>

          {/* Mobile Hint popup */}
          {showMobileHint && (
            <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <span className="truncate">{hintText || '旋转各个导线管件，闭合完整通路'}</span>
              <button
                onClick={() => setShowMobileHint(false)}
                className="text-amber-700 font-bold ml-2 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop 3-Column Layout (>= lg) */}
      <div className="hidden lg:block w-full max-w-6xl mx-auto px-4 my-auto">
        {/* Top Difficulty & Streak Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-white/70 border border-[#dce3d5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-[#1b2f27] text-base">无尽无限生成挑战</span>
            <div className="flex items-center gap-1.5 ml-3 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>连胜数: {streak}</span>
            </div>
          </div>

          {/* Difficulty Selectors */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#5c7066] mr-1">难度:</span>
            {(['easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  setStreak(0);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  difficulty === d
                    ? 'bg-[#115e59] text-white shadow-xs'
                    : 'bg-white text-[#475b52] border border-[#d8e0d1] hover:bg-[#edf3e8]'
                }`}
              >
                {d === 'easy' ? '初级 (2灯)' : d === 'medium' ? '中级 (3灯)' : '高级 (4灯)'}
              </button>
            ))}
          </div>
        </div>

        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left: Rule Panel */}
          <div className="col-span-3 flex justify-center">
            <RulePanel
              isPeekActive={isPeekActive}
              onTogglePeek={() => setIsPeekActive(!isPeekActive)}
              isMuted={isMuted}
              onToggleMute={onToggleMute}
              canUndo={historyIndex > 0}
              onUndo={handleUndo}
              canRedo={historyIndex < historyTimeline.length - 1}
              onRedo={handleRedo}
              historyCount={historyIndex}
            />
          </div>

          {/* Center: 6x6 Board & Visual Undo History Timeline */}
          <div className="col-span-6 flex flex-col items-center justify-center">
            <GameBoard
              tiles={tiles}
              gridRows={6}
              gridCols={6}
              simulation={simulation}
              isPeekActive={isPeekActive}
              onTileClick={handleTileClick}
              onLongPressStart={() => setIsPeekActive(true)}
              onLongPressEnd={() => setIsPeekActive(false)}
            />

            {/* Visual Undo History Timeline */}
            <UndoHistoryTimeline
              timeline={historyTimeline}
              currentIndex={historyIndex}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onJumpToStep={handleJumpToStep}
              onResetToStart={handleResetToStart}
            />
          </div>

          {/* Right: Status Panel */}
          <div className="col-span-3 flex justify-center">
            <StatusPanel
              currentLevelIndex={levelIndex}
              totalLevels={99}
              levelTitle={title}
              remainingSteps={remainingSteps}
              litCount={simulation.litCount}
              totalBulbs={simulation.totalBulbs}
              isAllLit={simulation.isAllLit}
              hintText={hintText}
              winText="无尽回路已闭合！继续下一挑战。"
              maxSteps={maxSteps}
              onNextLevel={handleNextLevel}
              onRestart={handleRestart}
              onHome={onHome}
              onAddSteps={() => setRemainingSteps((r) => r + 10)}
              hasNextLevel={true}
            />
          </div>
        </div>
      </div>

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
};
