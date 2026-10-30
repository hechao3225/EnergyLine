/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { triggerConfetti } from './utils/confetti';
import { GameView, LevelConfig, SimulationResult, Tile, HistorySnapshot } from './types/game';
import { DEFAULT_LEVELS } from './data/defaultLevels';
import { simulateCircuit } from './utils/circuit';
import { sound } from './utils/audio';
import { GameHeader } from './components/GameHeader';
import { RulePanel } from './components/RulePanel';
import { GameBoard } from './components/GameBoard';
import { StatusPanel } from './components/StatusPanel';
import { LevelSelect } from './components/LevelSelect';
import { LevelEditor } from './components/LevelEditor';
import { EndlessMode } from './components/EndlessMode';
import { ErrorBoundary } from './components/ErrorBoundary';
import { VictoryModal } from './components/VictoryModal';
import { UndoHistoryTimeline } from './components/UndoHistoryTimeline';
import { ProfileModal } from './components/ProfileModal';
import { RulesModal } from './components/RulesModal';
import { AchievementToast } from './components/AchievementToast';
import { StoryPrologueModal } from './components/StoryPrologueModal';
import { FloraCompendiumModal } from './components/FloraCompendiumModal';
import { SacredTreeSproutOverlay, SproutEvent } from './components/SacredTreeSproutOverlay';
import { SacredTreeBranchWidget } from './components/SacredTreeBranchWidget';
import { AndroidAppModal } from './components/AndroidAppModal';
import { getFlowerForLevel } from './data/flowers';
import { Achievement } from './types/achievement';
import { haptics } from './utils/haptics';
import {
  RotateCcw,
  Eye,
  BookOpen,
  Grid,
  Lightbulb,
  ChevronRight,
  Plus,
} from 'lucide-react';
import {
  checkVictoryAchievements,
  trackUndoOperation,
  loadUnlockedAchievements,
} from './utils/achievements';

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

export default function App() {
  const [currentView, setCurrentView] = useState<GameView>('story');
  const [levelIndex, setLevelIndex] = useState<number>(2); // Defaults to Level 2 (Screenshot 1)
  const [customLevel, setCustomLevel] = useState<LevelConfig | null>(null);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [isPeekActive, setIsPeekActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('sacred_tree_story_seen');
    } catch {
      return false;
    }
  });
  const [isFloraOpen, setIsFloraOpen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => Boolean(typeof document !== 'undefined' && document.fullscreenElement));
  const [isHapticsEnabled, setIsHapticsEnabled] = useState<boolean>(() => haptics.isEnabled());
  const [showMobileHint, setShowMobileHint] = useState<boolean>(false);
  const [activeToastAchievement, setActiveToastAchievement] = useState<Achievement | null>(null);
  const [unlockedCount, setUnlockedCount] = useState<number>(() => {
    return Object.keys(loadUnlockedAchievements()).length;
  });
  const [newlyUnlockedInVictory, setNewlyUnlockedInVictory] = useState<Achievement[]>([]);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleToggleHaptics = () => {
    const next = haptics.toggle();
    setIsHapticsEnabled(next);
  };

  const levelUndosUsedRef = React.useRef<number>(0);
  const hasUsedTimelineJumpRef = React.useRef<boolean>(false);
  const hasToggledSwitchRef = React.useRef<boolean>(false);

  // Cleared levels persisted in localStorage
  const [clearedLevels, setClearedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('honeycomb_cleared_levels');
      return saved ? JSON.parse(saved) : [1]; // Start with level 1 cleared or level 2 ready
    } catch {
      return [1];
    }
  });

  // Track tree sprouting and sacred spring infusion animation on newly cleared level
  const [treeSproutEvent, setTreeSproutEvent] = useState<SproutEvent | null>(null);
  const prevClearedLevelsRef = React.useRef<number[]>(clearedLevels);

  // Level best steps persisted in localStorage: { [levelId]: minStepsUsed }
  const [bestStepsRecord, setBestStepsRecord] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('honeycomb_best_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track latest victory stats for VictoryModal display
  const [victoryStats, setVictoryStats] = useState<{
    stepsUsed: number;
    remainingSteps: number;
    maxSteps: number;
    bestSteps: number;
    previousBest: number | null;
    isNewRecord: boolean;
  } | null>(null);

  // Current active level configuration
  const activeLevelConfig: LevelConfig = useMemo(() => {
    if (customLevel) return customLevel;
    const found = DEFAULT_LEVELS.find((l) => l.id === levelIndex);
    return found || DEFAULT_LEVELS[1];
  }, [levelIndex, customLevel]);

  // Current tiles state
  const [tiles, setTiles] = useState<Tile[]>(() =>
    activeLevelConfig.tiles.map((t) => ({ ...t }))
  );
  const [remainingSteps, setRemainingSteps] = useState<number>(
    activeLevelConfig.maxSteps
  );
  const [historyTimeline, setHistoryTimeline] = useState<HistorySnapshot[]>(() => {
    const sim = simulateCircuit(
      activeLevelConfig.tiles,
      activeLevelConfig.gridRows,
      activeLevelConfig.gridCols
    );
    return [
      {
        id: `snap-${Date.now()}-0`,
        stepNumber: 0,
        tiles: activeLevelConfig.tiles.map((t) => ({ ...t })),
        remainingSteps: activeLevelConfig.maxSteps,
        litCount: sim.litCount,
        totalBulbs: sim.totalBulbs,
        description: '初始状态',
      },
    ];
  });
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Reset or load level
  const loadLevel = useCallback((lvlConfig: LevelConfig) => {
    const freshTiles = lvlConfig.tiles.map((t) => ({ ...t }));
    const sim = simulateCircuit(freshTiles, lvlConfig.gridRows, lvlConfig.gridCols);
    setTiles(freshTiles);
    setRemainingSteps(lvlConfig.maxSteps);

    const initialSnap: HistorySnapshot = {
      id: `snap-${Date.now()}-0`,
      stepNumber: 0,
      tiles: freshTiles.map((t) => ({ ...t })),
      remainingSteps: lvlConfig.maxSteps,
      litCount: sim.litCount,
      totalBulbs: sim.totalBulbs,
      description: '初始状态',
    };
    setHistoryTimeline([initialSnap]);
    setHistoryIndex(0);

    setShowVictoryModal(false);
    setVictoryStats(null);
    winFiredRef.current = null;
    levelUndosUsedRef.current = 0;
    hasUsedTimelineJumpRef.current = false;
    hasToggledSwitchRef.current = false;
    setNewlyUnlockedInVictory([]);
  }, []);

  // When levelIndex or customLevel changes, load new tiles
  useEffect(() => {
    loadLevel(activeLevelConfig);
  }, [activeLevelConfig, loadLevel]);

  // Electrical circuit simulation
  const simulation: SimulationResult = useMemo(() => {
    return simulateCircuit(
      tiles,
      activeLevelConfig.gridRows,
      activeLevelConfig.gridCols
    );
  }, [tiles, activeLevelConfig.gridRows, activeLevelConfig.gridCols]);

  const winFiredRef = React.useRef<number | null>(null);

  // Victory trigger & best steps record
  useEffect(() => {
    if (simulation.isAllLit && winFiredRef.current !== activeLevelConfig.id) {
      winFiredRef.current = activeLevelConfig.id;
      sound.playWin();
      haptics.victory();
      triggerConfetti();

      const currentStepsUsed = Math.max(0, activeLevelConfig.maxSteps - remainingSteps);
      const prevBest = bestStepsRecord[activeLevelConfig.id];
      const isNew = prevBest === undefined || currentStepsUsed < prevBest;
      const updatedBest = isNew ? currentStepsUsed : prevBest;

      // Persist level clearance & best steps to localStorage
      if (!customLevel) {
        setClearedLevels((prev) => {
          if (prev.includes(activeLevelConfig.id)) return prev;
          const next = [...prev, activeLevelConfig.id];
          try {
            localStorage.setItem('honeycomb_cleared_levels', JSON.stringify(next));
          } catch {
            // ignore
          }
          return next;
        });

        if (isNew) {
          setBestStepsRecord((prev) => {
            const next = { ...prev, [activeLevelConfig.id]: currentStepsUsed };
            try {
              localStorage.setItem('honeycomb_best_steps', JSON.stringify(next));
            } catch {
              // ignore
            }
            return next;
          });
        }
      }

      // Check achievement unlocks
      const achResult = checkVictoryAchievements({
        levelId: activeLevelConfig.id,
        stepsUsed: currentStepsUsed,
        remainingSteps,
        maxSteps: activeLevelConfig.maxSteps,
        levelUndosUsed: levelUndosUsedRef.current,
        hasUsedTimelineJump: hasUsedTimelineJumpRef.current,
        hasToggledSwitch: hasToggledSwitchRef.current,
      });

      if (achResult.newlyUnlocked.length > 0) {
        setNewlyUnlockedInVictory(achResult.newlyUnlocked);
        setActiveToastAchievement(achResult.newlyUnlocked[0]);
        setUnlockedCount(Object.keys(loadUnlockedAchievements()).length);
      } else {
        setNewlyUnlockedInVictory([]);
      }

      setVictoryStats({
        stepsUsed: currentStepsUsed,
        remainingSteps,
        maxSteps: activeLevelConfig.maxSteps,
        bestSteps: updatedBest,
        previousBest: prevBest ?? null,
        isNewRecord: isNew,
      });

      // Show victory modal after brief pleasant view of lit grid
      const timer = setTimeout(() => {
        setShowVictoryModal(true);
      }, 1100);

      return () => clearTimeout(timer);
    }
    if (!simulation.isAllLit) {
      winFiredRef.current = null;
    }
  }, [
    simulation.isAllLit,
    activeLevelConfig.id,
    activeLevelConfig.maxSteps,
    customLevel,
    remainingSteps,
    bestStepsRecord,
  ]);

  // Monitor clearedLevels changes: trigger global "灵泉注入" animation & tree visual growth
  useEffect(() => {
    const prev = prevClearedLevelsRef.current;
    // When a new level is cleared and added to clearedLevels
    if (clearedLevels.length > prev.length) {
      const newLevelId =
        clearedLevels.find((id) => !prev.includes(id)) ||
        clearedLevels[clearedLevels.length - 1];
      const flower = getFlowerForLevel(newLevelId);

      // Play chime audio
      sound.playChime();

      // Trigger global Sacred Spring infusion animation
      setTreeSproutEvent({
        id: Date.now(),
        levelId: newLevelId,
        flowerName: flower.name,
        type: newLevelId % 2 === 0 ? 'flower' : 'leaf',
      });
    }
    prevClearedLevelsRef.current = clearedLevels;
  }, [clearedLevels]);

  // Handle tile click (rotate 90° clockwise or toggle switch)
  const handleTileClick = (clickedTile: Tile) => {
    if (clickedTile.locked || clickedTile.type === 'empty') return;

    if (remainingSteps <= 0 && !simulation.isAllLit) {
      sound.playFail();
      haptics.outOfSteps();
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
    const nextSim = simulateCircuit(
      nextTiles,
      activeLevelConfig.gridRows,
      activeLevelConfig.gridCols
    );

    const newSnapshot: HistorySnapshot = {
      id: `snap-${Date.now()}-${historyIndex + 1}`,
      stepNumber: historyIndex + 1,
      tiles: nextTiles.map((t) => ({ ...t })),
      remainingSteps: nextRemainingSteps,
      litCount: nextSim.litCount,
      totalBulbs: nextSim.totalBulbs,
      description: actionDesc,
    };

    // If player had backtracked, truncate future steps and append new step
    const updatedTimeline = [
      ...historyTimeline.slice(0, historyIndex + 1),
      newSnapshot,
    ].slice(-25);

    setHistoryTimeline(updatedTimeline);
    setHistoryIndex(updatedTimeline.length - 1);
    setTiles(nextTiles);
    setRemainingSteps(nextRemainingSteps);
  };

  // Undo move
  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    const targetIdx = historyIndex - 1;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    trackUndoOperation();
    haptics.undo();
    levelUndosUsedRef.current += 1;
    setUnlockedCount(Object.keys(loadUnlockedAchievements()).length);
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  // Redo move
  const handleRedo = useCallback(() => {
    if (historyIndex >= historyTimeline.length - 1) return;
    const targetIdx = historyIndex + 1;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    haptics.undo();
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  // Jump to specific step in history
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

  // Reset to initial state (step 0)
  const handleResetToStart = useCallback(() => {
    if (historyTimeline.length === 0 || historyIndex === 0) return;
    const targetSnap = historyTimeline[0];
    hasUsedTimelineJumpRef.current = true;
    setHistoryIndex(0);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  // Restart level
  const handleRestart = () => {
    loadLevel(activeLevelConfig);
  };

  // Next level
  const handleNextLevel = () => {
    if (customLevel) {
      setCustomLevel(null);
      setCurrentView('editor');
      return;
    }
    const nextIdx = levelIndex + 1;
    if (nextIdx <= DEFAULT_LEVELS.length) {
      setLevelIndex(nextIdx);
    } else {
      // Loop back or show level select
      setIsLevelSelectOpen(true);
    }
  };

  // Sound toggle
  const handleToggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // Keyboard controls (Space for peek, R for restart, Z for undo, Y for redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPeekActive((p) => !p);
      } else if (e.key === 'r' || e.key === 'R') {
        handleRestart();
      } else if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.key === 'y' || e.key === 'Y') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLevelConfig, handleUndo, handleRedo]);

  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden overscroll-none select-none bg-[#edf2e7] text-[#172a23] flex flex-col justify-between selection:bg-teal-200">
      {/* Top Header */}
      <GameHeader
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          setCustomLevel(null);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        unlockedCount={unlockedCount}
        totalCount={14}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenFloraCompendium={() => setIsFloraOpen(true)}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Content Area based on Current View */}
      <main className="flex-1 flex flex-col justify-center overflow-hidden min-h-0 w-full">
        {currentView === 'story' && (
          <>
            {/* Mobile Dedicated 21:9 & 19.5:9 Zero-Scroll Layout (< lg) */}
            <div className="lg:hidden flex flex-col justify-between items-center h-full w-full px-2 pt-0.5 pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] overflow-hidden select-none">
              {/* Top Quick Status Bar */}
              <div className="w-full max-w-[420px] flex items-center justify-between gap-1.5 px-3 py-1.5 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#dce3d5] shadow-xs shrink-0">
                {/* Level selector trigger */}
                <button
                  onClick={() => setIsLevelSelectOpen(true)}
                  className="flex items-center gap-1.5 text-left group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-xl bg-teal-50 border border-teal-200 text-[#0d9488] flex items-center justify-center font-bold text-xs group-hover:bg-teal-100 transition-colors">
                    {activeLevelConfig.id}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1b2f27] truncate max-w-[110px]">
                      {activeLevelConfig.title}
                    </span>
                    <span className="text-[10px] text-[#55695f]">
                      {bestStepsRecord[activeLevelConfig.id]
                        ? `最佳 ${bestStepsRecord[activeLevelConfig.id]} 步`
                        : '未完成'}
                    </span>
                  </div>
                </button>

                {/* Center counters */}
                <div className="flex items-center gap-1.5">
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
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    <span>🌸</span>
                    <span>
                      {simulation.litCount}/{simulation.totalBulbs}
                    </span>
                  </div>
                </div>

                {/* Actions: Rules, Peek, Restart */}
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
                    title="透视水渠端口"
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
                    title="重置关卡"
                    className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sacred Tree Branch Growth Banner on Mobile */}
              <div className="w-full max-w-[420px] shrink-0 my-0.5">
                <SacredTreeBranchWidget
                  clearedCount={clearedLevels.length}
                  latestLevelId={clearedLevels[clearedLevels.length - 1] || 1}
                  isSprouting={Boolean(treeSproutEvent)}
                  onClickTree={() => setIsLevelSelectOpen(true)}
                />
              </div>

              {/* Center 6x6 Circuit Board */}
              <div className="flex-1 flex items-center justify-center w-full min-h-0 py-0.5">
                <GameBoard
                  tiles={tiles}
                  gridRows={activeLevelConfig.gridRows}
                  gridCols={activeLevelConfig.gridCols}
                  simulation={simulation}
                  isPeekActive={isPeekActive}
                  onTileClick={handleTileClick}
                  onLongPressStart={() => setIsPeekActive(true)}
                  onLongPressEnd={() => setIsPeekActive(false)}
                  levelId={activeLevelConfig.id}
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

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 bg-white/70 rounded-xl border border-[#dce3d5]/80">
                  <button
                    onClick={() => setIsLevelSelectOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#3d5348] hover:bg-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>选关 (1-99)</span>
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
                      onClick={() => setRemainingSteps((s) => s + 10)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors cursor-pointer animate-bounce"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+10步</span>
                    </button>
                  ) : simulation.isAllLit ? (
                    <button
                      onClick={handleNextLevel}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-[#0d9488] hover:bg-[#0f766e] rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <span>下一关</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#697d72] px-1 truncate max-w-[130px]">
                      {activeLevelConfig.gridRows}×{activeLevelConfig.gridCols} 电路
                    </span>
                  )}
                </div>

                {/* Mobile Hint Popup bar if toggled */}
                {showMobileHint && (
                  <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                    <span className="truncate">{activeLevelConfig.hintText}</span>
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
              <div className="grid grid-cols-12 gap-5 sm:gap-6 items-stretch">
                {/* Left Column: Rule Panel */}
                <div className="col-span-3 flex justify-center">
                  <RulePanel
                    isPeekActive={isPeekActive}
                    onTogglePeek={() => setIsPeekActive(!isPeekActive)}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                    canUndo={historyIndex > 0}
                    onUndo={handleUndo}
                    canRedo={historyIndex < historyTimeline.length - 1}
                    onRedo={handleRedo}
                    historyCount={historyIndex}
                  />
                </div>

                {/* Center Column: 6x6 Game Board & Visual Undo History Timeline */}
                <div className="col-span-6 flex flex-col justify-center items-center">
                  <div className="w-full max-w-[420px] mb-2.5">
                    <SacredTreeBranchWidget
                      clearedCount={clearedLevels.length}
                      latestLevelId={clearedLevels[clearedLevels.length - 1] || 1}
                      isSprouting={Boolean(treeSproutEvent)}
                      onClickTree={() => setIsLevelSelectOpen(true)}
                    />
                  </div>

                  <GameBoard
                    tiles={tiles}
                    gridRows={activeLevelConfig.gridRows}
                    gridCols={activeLevelConfig.gridCols}
                    simulation={simulation}
                    isPeekActive={isPeekActive}
                    onTileClick={handleTileClick}
                    onLongPressStart={() => setIsPeekActive(true)}
                    onLongPressEnd={() => setIsPeekActive(false)}
                    levelId={activeLevelConfig.id}
                  />

                  {/* Visual Undo Operation History Timeline */}
                  <UndoHistoryTimeline
                    timeline={historyTimeline}
                    currentIndex={historyIndex}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    onJumpToStep={handleJumpToStep}
                    onResetToStart={handleResetToStart}
                  />
                </div>

                {/* Right Column: Status & Level Stats */}
                <div className="col-span-3 flex justify-center">
                  <StatusPanel
                    currentLevelIndex={activeLevelConfig.id}
                    totalLevels={activeLevelConfig.totalLevels || 3}
                    levelTitle={activeLevelConfig.title}
                    remainingSteps={remainingSteps}
                    litCount={simulation.litCount}
                    totalBulbs={simulation.totalBulbs}
                    isAllLit={simulation.isAllLit}
                    hintText={activeLevelConfig.hintText}
                    winText={activeLevelConfig.winText}
                    bestSteps={!customLevel ? bestStepsRecord[activeLevelConfig.id] : undefined}
                    onNextLevel={handleNextLevel}
                    onRestart={handleRestart}
                    onHome={() => setIsLevelSelectOpen(true)}
                    onAddSteps={() => setRemainingSteps((s) => s + 10)}
                    onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
                    hasNextLevel={activeLevelConfig.id < DEFAULT_LEVELS.length || Boolean(customLevel)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'endless' && (
          <ErrorBoundary fallbackTitle="无尽挑战模式">
            <EndlessMode
              onHome={() => setCurrentView('story')}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onAchievementUnlocked={(ach) => {
                setActiveToastAchievement(ach);
                setUnlockedCount(Object.keys(loadUnlockedAchievements()).length);
              }}
            />
          </ErrorBoundary>
        )}

        {currentView === 'editor' && (
          <div className="h-full overflow-y-auto">
            <LevelEditor
              onPlayCustomLevel={(cfg) => {
                setCustomLevel(cfg);
                setCurrentView('story');
              }}
              onBack={() => setCurrentView('story')}
            />
          </div>
        )}
      </main>

      {/* Desktop only footer */}
      <footer className="hidden lg:block w-full text-center py-2 text-xs text-[#526c5f] border-t border-[#dce3d5]/70 shrink-0">
        <span>神树灵泉 · 旋转翡翠水渠灌溉灵木百花 · 99重通天神树</span>
      </footer>

      {/* Level Select Modal */}
      {isLevelSelectOpen && (
        <LevelSelect
          levels={DEFAULT_LEVELS}
          currentLevelIndex={levelIndex}
          clearedLevels={clearedLevels}
          bestSteps={bestStepsRecord}
          onSelectLevel={(id) => {
            setLevelIndex(id);
            setCustomLevel(null);
            setCurrentView('story');
          }}
          onClose={() => setIsLevelSelectOpen(false)}
          onOpenFloraCompendium={() => {
            setIsLevelSelectOpen(false);
            setIsFloraOpen(true);
          }}
        />
      )}

      {/* Victory Celebration Modal */}
      {showVictoryModal && (
        <VictoryModal
          levelTitle={activeLevelConfig.title}
          levelId={activeLevelConfig.id}
          stepsUsed={victoryStats ? victoryStats.stepsUsed : activeLevelConfig.maxSteps - remainingSteps}
          remainingSteps={victoryStats ? victoryStats.remainingSteps : remainingSteps}
          maxSteps={activeLevelConfig.maxSteps}
          bestSteps={victoryStats ? victoryStats.bestSteps : bestStepsRecord[activeLevelConfig.id]}
          previousBest={victoryStats?.previousBest}
          isNewRecord={victoryStats?.isNewRecord}
          unlockedAchievements={newlyUnlockedInVictory}
          totalUnlockedCount={unlockedCount}
          onOpenAchievements={() => {
            setShowVictoryModal(false);
            setIsProfileOpen(true);
          }}
          onOpenFloraCompendium={() => {
            setShowVictoryModal(false);
            setIsFloraOpen(true);
          }}
          onNextLevel={() => {
            setShowVictoryModal(false);
            handleNextLevel();
          }}
          onRestart={() => {
            setShowVictoryModal(false);
            handleRestart();
          }}
          onOpenLevelSelect={() => {
            setShowVictoryModal(false);
            setIsLevelSelectOpen(true);
          }}
          hasNextLevel={activeLevelConfig.id < DEFAULT_LEVELS.length}
        />
      )}

      {/* Story Prologue Cutscene Modal */}
      <StoryPrologueModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        onStartGame={() => setIsStoryOpen(false)}
      />

      {/* Flora Compendium (百花图鉴) Modal */}
      <FloraCompendiumModal
        isOpen={isFloraOpen}
        onClose={() => setIsFloraOpen(false)}
        clearedLevels={clearedLevels}
        bestStepsRecord={bestStepsRecord}
        onSelectLevel={(id) => {
          setLevelIndex(id);
          setCustomLevel(null);
          setCurrentView('story');
        }}
      />

      {/* Profile & Achievement Trophy Cabinet Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Rules & Pipe Guide Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Non-intrusive Achievement Unlock Toast Banner */}
      <AchievementToast
        achievement={activeToastAchievement}
        onDismiss={() => setActiveToastAchievement(null)}
        onOpenCabinet={() => setIsProfileOpen(true)}
      />

      {/* Global Sacred Tree Spring Infusion Sprouting Overlay */}
      <SacredTreeSproutOverlay
        event={treeSproutEvent}
        clearedCount={clearedLevels.length}
        onAnimationEnd={() => setTreeSproutEvent(null)}
      />

      {/* Android Native WebAPK & PWA Settings Modal */}
      <AndroidAppModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        isHapticsEnabled={isHapticsEnabled}
        onToggleHaptics={handleToggleHaptics}
      />
    </div>
  );
}
