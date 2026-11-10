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
import { CandyThemeShell } from './components/CandyThemeShell';
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
import bgMainImg from './assets/bg_main.jpg';

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

export default function App() {
  const [currentView, setCurrentView] = useState<GameView>('story');
  const [candyScreen, setCandyScreen] = useState<'home' | 'play'>('home');
  const [levelIndex, setLevelIndex] = useState<number>(24); // Defaults to Level 24 (断脉之桥)
  const [customLevel, setCustomLevel] = useState<LevelConfig | null>(null);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [isPeekActive, setIsPeekActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);
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
  const handleTileClick = (clickedTile: Tile, action?: 'rotate' | 'toggle-switch') => {
    if (clickedTile.locked || clickedTile.type === 'empty') return;

    if (remainingSteps <= 0 && !simulation.isAllLit) {
      sound.playFail();
      haptics.outOfSteps();
      return;
    }

    let nextTiles: Tile[];
    let actionDesc = '';

    // Switch tile: toggle-switch action toggles open/close; otherwise rotates 90°
    if (clickedTile.type === 'switch' && action === 'toggle-switch') {
      sound.playSwitch();
      haptics.tapHeavy();
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
      haptics.tapLight();
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
      <>
        <CandyThemeShell
          screen={showVictoryModal ? 'victory' : candyScreen}
          level={activeLevelConfig}
          levels={DEFAULT_LEVELS}
          tiles={tiles}
          simulation={simulation}
          remainingSteps={remainingSteps}
          clearedLevels={clearedLevels}
          bestSteps={bestStepsRecord}
          levelSelectOpen={isLevelSelectOpen}
          isPeekActive={isPeekActive}
          onStartLevel={() => {
            setShowVictoryModal(false);
            setIsLevelSelectOpen(false);
            setCandyScreen('play');
          }}
          onBackHome={() => {
            setShowVictoryModal(false);
            setIsLevelSelectOpen(false);
            setCandyScreen('home');
          }}
          onNextLevel={() => {
            setShowVictoryModal(false);
            setIsLevelSelectOpen(false);
            handleNextLevel();
            setCandyScreen('play');
          }}
          onRestart={handleRestart}
          onUndo={handleUndo}
          onHint={() => setShowMobileHint(true)}
          onTileClick={handleTileClick}
          onOpenLevels={() => setIsLevelSelectOpen(true)}
          onCloseLevels={() => setIsLevelSelectOpen(false)}
          onSelectLevel={(id) => {
            setLevelIndex(id);
            setCustomLevel(null);
            setShowVictoryModal(false);
            setIsLevelSelectOpen(false);
            setCandyScreen('play');
          }}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
          onOpenFlora={() => setIsFloraOpen(true)}
        />
        <StoryPrologueModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} onStartGame={() => setIsStoryOpen(false)} />
        <FloraCompendiumModal
          isOpen={isFloraOpen}
          onClose={() => setIsFloraOpen(false)}
          clearedLevels={clearedLevels}
          bestStepsRecord={bestStepsRecord}
          onSelectLevel={(id) => {
            setLevelIndex(id);
            setCustomLevel(null);
            setIsFloraOpen(false);
            setCandyScreen('play');
          }}
        />
        <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
        <AchievementToast achievement={activeToastAchievement} onDismiss={() => setActiveToastAchievement(null)} onOpenCabinet={() => setIsProfileOpen(true)} />
        <SacredTreeSproutOverlay event={treeSproutEvent} clearedCount={clearedLevels.length} onAnimationEnd={() => setTreeSproutEvent(null)} />
        <AndroidAppModal
          isOpen={isAndroidModalOpen}
          onClose={() => setIsAndroidModalOpen(false)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          isHapticsEnabled={isHapticsEnabled}
          onToggleHaptics={handleToggleHaptics}
        />
      </>
  );
}
