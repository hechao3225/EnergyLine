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
import { LevelSelect } from './components/LevelSelect';
import { LevelEditor } from './components/LevelEditor';
import { EndlessMode } from './components/EndlessMode';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProfileModal } from './components/ProfileModal';
import { RulesModal } from './components/RulesModal';
import { AchievementToast } from './components/AchievementToast';
import { StoryPrologueModal } from './components/StoryPrologueModal';
import { OnboardingGuide } from './components/OnboardingGuide';
import { FloraCompendiumModal } from './components/FloraCompendiumModal';
import { SacredTreeSproutOverlay, SproutEvent } from './components/SacredTreeSproutOverlay';
import { AndroidAppModal } from './components/AndroidAppModal';
import { EnergyParkHome } from './components/energyPark/EnergyParkHome';
import { EnergyParkPuzzle } from './components/energyPark/EnergyParkPuzzle';
import { EnergyParkRestoration } from './components/energyPark/EnergyParkRestoration';
import { getFlowerForLevel } from './data/flowers';
import { Achievement } from './types/achievement';
import { haptics } from './utils/haptics';
import { getStarsForSteps } from './utils/rating';
import {
  checkVictoryAchievements,
  trackUndoOperation,
  loadUnlockedAchievements,
} from './utils/achievements';

const CLEARED_KEY = 'honeycomb_cleared_levels';
const BEST_KEY = 'honeycomb_best_steps';
const ONBOARDING_KEY = 'honeycomb_onboarding_v1';
const STORY_SEEN_KEY = 'honeycomb_story_seen_v1';
// Bumped when the step-counting rules change. v2 = records are real taps and
// can never be lower than the level's minimum (par). v3 = every level was
// re-tuned for the difficulty ramp. v4 = the scramble itself was rebuilt (only
// tiles on the live path are shuffled), so every board changed: old step counts
// belong to a different puzzle and are dropped, while cleared levels survive.
const PROGRESS_VERSION_KEY = 'honeycomb_progress_version';
const PROGRESS_VERSION = '4';
// Free rewinds per attempt. Each undo / timeline jump consumes one; running out
// means the step budget is the only remaining slack (keeps maxSteps meaningful).
const FREE_BACKTRACKS = 3;

/**
 * Load the persisted best-step record, dropping values that cannot be real.
 * A genuine record is at least one tap and can never exceed the level budget
 * (older builds derived "steps" from the remaining budget, so using the +10
 * top-up could store a fake 0/1-step record).
 */
function loadBestSteps(): Record<number, number> {
  try {
    // v4 重排了每关的初始盘面，旧步数对应的是另一道题，比较没有意义。
    // 通关进度（clearedLevels）会保留，只清空「历史最佳」。
    if (localStorage.getItem(PROGRESS_VERSION_KEY) !== PROGRESS_VERSION) return {};
    const raw = localStorage.getItem(BEST_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object') return {};
    const clean: Record<number, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      const id = Number(key);
      const steps = Number(value);
      const level = DEFAULT_LEVELS.find((l) => l.id === id);
      if (!level) continue;
      if (!Number.isFinite(steps)) continue;
      const rounded = Math.round(steps);
      // Must be at least one real tap.
      if (rounded < 1) continue;
      // Fewer taps than the level's minimum is physically impossible.
      if (level.parSteps && rounded < level.parSteps) continue;
      // Generous ceiling: top-ups can inflate a legitimate run, but not absurdly.
      if (rounded > level.maxSteps * 5 + 50) continue;
      clean[id] = rounded;
    }
    return clean;
  } catch {
    return {};
  }
}

/**
 * Progress must be a contiguous run starting at level 1 (the only way to unlock
 * a level is to clear the previous one). Anything else is debug residue left by
 * older builds that hard-coded "level 24 + level 1 cleared".
 */
function loadProgress(): { cleared: number[]; best: Record<number, number> } {
  let best = loadBestSteps();
  let raw: number[] = [];
  try {
    const saved = localStorage.getItem(CLEARED_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    if (Array.isArray(parsed)) {
      raw = Array.from(
        new Set(
          parsed.filter(
            (id): id is number =>
              typeof id === 'number' && DEFAULT_LEVELS.some((l) => l.id === id)
          )
        )
      ).sort((a, b) => a - b);
    }
  } catch {
    raw = [];
  }

  const cleared: number[] = [];
  for (const id of raw) {
    if (id !== cleared.length + 1) break;
    cleared.push(id);
  }

  // Legacy debug seed: level 1 pre-marked as cleared without a step record.
  // A genuine clear always leaves a best-step entry behind.
  if (cleared.length === 1 && cleared[0] === 1 && best[1] === undefined) {
    cleared.length = 0;
  }

  // Drop records for levels that are no longer part of the saved progress
  const filteredBest: Record<number, number> = {};
  for (const [key, value] of Object.entries(best)) {
    const id = Number(key);
    if (cleared.includes(id)) filteredBest[id] = value;
  }

  return { cleared, best: filteredBest };
}

function readFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeFlag(key: string): void {
  try {
    localStorage.setItem(key, '1');
  } catch {
    // ignore
  }
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

export default function App() {
  const [currentView, setCurrentView] = useState<GameView>('story');
  const [energyScreen, setEnergyScreen] = useState<'home' | 'puzzle' | 'restoration'>('home');
  // New players always start the guided journey at level 1
  const [levelIndex, setLevelIndex] = useState<number>(1);
  const [customLevel, setCustomLevel] = useState<LevelConfig | null>(null);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [isPeekActive, setIsPeekActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  // First launch shows the prologue once; afterwards the level-1 coach marks take over
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(() => !readFlag(STORY_SEEN_KEY));
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isFloraOpen, setIsFloraOpen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => Boolean(typeof document !== 'undefined' && document.fullscreenElement));
  const [isHapticsEnabled, setIsHapticsEnabled] = useState<boolean>(() => haptics.isEnabled());
  const [activeToastAchievement, setActiveToastAchievement] = useState<Achievement | null>(null);
  const [unlockedCount, setUnlockedCount] = useState<number>(() => {
    return Object.keys(loadUnlockedAchievements()).length;
  });
  const [newlyUnlockedInVictory, setNewlyUnlockedInVictory] = useState<Achievement[]>([]);
  // Every level allows a few free rewinds; after that the budget is the only
  // safety net. Without this cap, undoing returned the spent step and the step
  // budget stopped being a difficulty knob altogether.
  const [freeBacktracksLeft, setFreeBacktracksLeft] = useState<number>(FREE_BACKTRACKS);
  const [topUpUsed, setTopUpUsed] = useState<boolean>(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const hintTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashHint = React.useCallback((message: string) => {
    setHintMessage(message);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => {
      hintTimerRef.current = null;
      setHintMessage(null);
    }, 2400);
  }, []);

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

  // Victory modal timer lives in a ref so re-renders (e.g. new record saved)
  // cannot cancel the pending celebration. See fix: previous code returned a
  // cleanup from the victory effect, so `setBestStepsRecord` re-ran the effect
  // and cleared its own timer on the very first (record-setting) clear.
  const winModalTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const winFiredRef = React.useRef<number | null>(null);

  // Level best steps persisted in localStorage: { [levelId]: minStepsUsed }
  // Loaded together with the cleared list so both stay consistent.
  const [bestStepsRecord, setBestStepsRecord] = useState<Record<number, number>>(
    () => loadProgress().best
  );

  // Cleared levels persisted in localStorage.
  // A brand-new player starts with nothing cleared, so the journey begins at level 1.
  const [clearedLevels, setClearedLevels] = useState<number[]>(
    () => loadProgress().cleared
  );

  // Track tree sprouting and sacred spring infusion animation on newly cleared level
  const [treeSproutEvent, setTreeSproutEvent] = useState<SproutEvent | null>(null);
  const prevClearedLevelsRef = React.useRef<number[]>(clearedLevels);

  // Track latest victory stats for the restoration screen
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
    return found || DEFAULT_LEVELS[0];
  }, [levelIndex, customLevel]);

  // Current tiles state
  const [tiles, setTiles] = useState<Tile[]>(() =>
    activeLevelConfig.tiles.map((t) => ({ ...t }))
  );
  const [remainingSteps, setRemainingSteps] = useState<number>(
    activeLevelConfig.maxSteps
  );
  // Authoritative count of taps really performed in this attempt.
  // Never derived from the remaining budget, so the +10 top-up cannot fake it.
  const [stepsUsed, setStepsUsed] = useState<number>(0);
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
        stepsUsed: 0,
        litCount: sim.litCount,
        totalBulbs: sim.totalBulbs,
        description: '初始状态',
      },
    ];
  });
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Live mirrors of the state above. Rapid taps (players hammering the same
  // tile) arrive before React re-renders, so reading the closure values would
  // drop all but the last tap and under-charge the step budget. Handlers read
  // and write these refs synchronously, then push the result into state.
  const tilesRef = React.useRef<Tile[]>(tiles);
  tilesRef.current = tiles;
  const remainingStepsRef = React.useRef<number>(remainingSteps);
  remainingStepsRef.current = remainingSteps;
  const stepsUsedRef = React.useRef<number>(stepsUsed);
  stepsUsedRef.current = stepsUsed;
  const historyRef = React.useRef<{ timeline: HistorySnapshot[]; index: number }>({
    timeline: historyTimeline,
    index: historyIndex,
  });
  historyRef.current = { timeline: historyTimeline, index: historyIndex };

  // Reset or load level
  const loadLevel = useCallback((lvlConfig: LevelConfig) => {
    if (winModalTimerRef.current) {
      clearTimeout(winModalTimerRef.current);
      winModalTimerRef.current = null;
    }
    const freshTiles = lvlConfig.tiles.map((t) => ({ ...t }));
    const sim = simulateCircuit(freshTiles, lvlConfig.gridRows, lvlConfig.gridCols);
    setTiles(freshTiles);
    setRemainingSteps(lvlConfig.maxSteps);
    setStepsUsed(0);

    const initialSnap: HistorySnapshot = {
      id: `snap-${Date.now()}-0`,
      stepNumber: 0,
      tiles: freshTiles.map((t) => ({ ...t })),
      remainingSteps: lvlConfig.maxSteps,
      stepsUsed: 0,
      litCount: sim.litCount,
      totalBulbs: sim.totalBulbs,
      description: '初始状态',
    };
    setHistoryTimeline([initialSnap]);
    setHistoryIndex(0);

    setVictoryStats(null);
    winFiredRef.current = null;
    levelUndosUsedRef.current = 0;
    hasUsedTimelineJumpRef.current = false;
    hasToggledSwitchRef.current = false;
    setNewlyUnlockedInVictory([]);
    setFreeBacktracksLeft(FREE_BACKTRACKS);
    setTopUpUsed(false);
    // NOTE: never reset prevAllLitRef here. loadLevel runs before the victory
    // effect in the same commit; clearing the flag there makes the stale
    // "previous level still lit" frame look like a fresh win (Bug D).
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

  // Latest best-steps map, read inside the victory effect without making it a dependency
  const bestStepsRef = React.useRef<Record<number, number>>(bestStepsRecord);
  bestStepsRef.current = bestStepsRecord;

  // Previous frame's "all lit" flag. Victory must fire on a rising edge only:
  // when switching levels, React renders one frame with the NEW level config but
  // the OLD (solved) tiles, which used to be mistaken for a win on the next
  // level - popping a fake victory modal and marking that level cleared.
  const prevAllLitRef = React.useRef<boolean>(false);

  // Victory trigger & best steps record
  useEffect(() => {
    const wasAllLit = prevAllLitRef.current;
    prevAllLitRef.current = simulation.isAllLit;

    if (
      simulation.isAllLit &&
      !wasAllLit &&
      winFiredRef.current !== activeLevelConfig.id
    ) {
      winFiredRef.current = activeLevelConfig.id;
      sound.playWin();
      haptics.victory();
      triggerConfetti();

      // Real taps spent in this attempt (top-ups and their spend never count)
      const currentStepsUsed = stepsUsed;
      const prevBest = bestStepsRef.current[activeLevelConfig.id];
      const isNew = prevBest === undefined || currentStepsUsed < prevBest;
      const updatedBest = isNew ? currentStepsUsed : prevBest;

      // Persist level clearance & best steps to localStorage
      if (!customLevel) {
        setClearedLevels((prev) => {
          if (prev.includes(activeLevelConfig.id)) return prev;
          const next = [...prev, activeLevelConfig.id].sort((a, b) => a - b);
          try {
            localStorage.setItem(CLEARED_KEY, JSON.stringify(next));
          } catch {
            // ignore
          }
          return next;
        });

        if (isNew) {
          setBestStepsRecord((prev) => {
            const next = { ...prev, [activeLevelConfig.id]: currentStepsUsed };
            try {
              localStorage.setItem(BEST_KEY, JSON.stringify(next));
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
        parSteps: activeLevelConfig.parSteps,
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

      // Show victory modal after brief pleasant view of lit grid.
      // No effect cleanup here on purpose: this effect re-runs when
      // remainingSteps / customLevel change, and a cleanup would cancel the
      // timer while winFiredRef stays set (modal never appears).
      if (winModalTimerRef.current) clearTimeout(winModalTimerRef.current);
      winModalTimerRef.current = setTimeout(() => {
        winModalTimerRef.current = null;
        setEnergyScreen('restoration');
      }, 1100);
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
    stepsUsed,
  ]);

  // Clear any pending victory timer on unmount
  useEffect(() => {
    return () => {
      if (winModalTimerRef.current) clearTimeout(winModalTimerRef.current);
    };
  }, []);

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

  // Persist sanitised progress whenever it changes (also cleans legacy records
  // such as a fake 0-step best produced by the +10 top-up on first run).
  useEffect(() => {
    try {
      localStorage.setItem(CLEARED_KEY, JSON.stringify(clearedLevels));
      localStorage.setItem(BEST_KEY, JSON.stringify(bestStepsRecord));
      // Mark the record set as migrated so the one-time par floor is not
      // applied to records legitimately earned under the new counter.
      localStorage.setItem(PROGRESS_VERSION_KEY, PROGRESS_VERSION);
    } catch {
      // ignore
    }
  }, [clearedLevels, bestStepsRecord]);

  // First-run level-1 coach marks (skipped once the prologue is on screen)
  useEffect(() => {
    if (isStoryOpen || isOnboardingOpen) return;
    if (currentView !== 'story' || customLevel) return;
    if (activeLevelConfig.id !== 1 || clearedLevels.includes(1)) return;
    if (readFlag(ONBOARDING_KEY)) return;
    setIsOnboardingOpen(true);
  }, [
    activeLevelConfig.id,
    clearedLevels,
    currentView,
    customLevel,
    isStoryOpen,
    isOnboardingOpen,
  ]);

  const handleCloseOnboarding = useCallback(() => {
    writeFlag(ONBOARDING_KEY);
    setIsOnboardingOpen(false);
  }, []);

  const handleCloseStory = useCallback(() => {
    writeFlag(STORY_SEEN_KEY);
    setIsStoryOpen(false);
  }, []);

  // Handle tile click (rotate 90° clockwise or toggle switch)
  const handleTileClick = (clickedTile: Tile, action?: 'rotate' | 'toggle-switch') => {
    if (clickedTile.locked || clickedTile.type === 'empty') return;

    const baseTiles = tilesRef.current;
    const baseRemaining = remainingStepsRef.current;
    const baseStepsUsed = stepsUsedRef.current;
    const baseHistory = historyRef.current;
    const simAllLit = simulateCircuit(
      baseTiles,
      activeLevelConfig.gridRows,
      activeLevelConfig.gridCols
    ).isAllLit;

    if (baseRemaining <= 0 && !simAllLit) {
      sound.playFail();
      haptics.outOfSteps();
      return;
    }

    const liveTile = baseTiles.find((t) => t.id === clickedTile.id) ?? clickedTile;
    let nextTiles: Tile[];
    let actionDesc = '';

    // Switch tile: toggle-switch action toggles open/close; otherwise rotates 90°
    if (liveTile.type === 'switch' && action === 'toggle-switch') {
      sound.playSwitch();
      haptics.tapHeavy();
      hasToggledSwitchRef.current = true;
      actionDesc = getTileActionDescription(liveTile, 'switch');
      nextTiles = baseTiles.map((t) => {
        if (t.id === liveTile.id) {
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
      actionDesc = getTileActionDescription(liveTile, 'rotate');
      nextTiles = baseTiles.map((t) => {
        if (t.id === liveTile.id) {
          return {
            ...t,
            rotation: t.rotation + 90,
          };
        }
        return t;
      });
    }

    const nextRemainingSteps = Math.max(0, baseRemaining - 1);
    const nextStepsUsed = baseStepsUsed + 1;
    const nextSim = simulateCircuit(
      nextTiles,
      activeLevelConfig.gridRows,
      activeLevelConfig.gridCols
    );

    const nextStepNumber = baseHistory.index + 1;
    const newSnapshot: HistorySnapshot = {
      id: `snap-${Date.now()}-${nextStepNumber}`,
      stepNumber: nextStepNumber,
      tiles: nextTiles.map((t) => ({ ...t })),
      remainingSteps: nextRemainingSteps,
      stepsUsed: nextStepsUsed,
      litCount: nextSim.litCount,
      totalBulbs: nextSim.totalBulbs,
      description: actionDesc,
    };

    // If player had backtracked, truncate future steps and append new step
    const updatedTimeline = [
      ...baseHistory.timeline.slice(0, baseHistory.index + 1),
      newSnapshot,
    ].slice(-25);

    // Optimistic ref update so a second tap in the same tick chains correctly
    tilesRef.current = nextTiles;
    remainingStepsRef.current = nextRemainingSteps;
    stepsUsedRef.current = nextStepsUsed;
    historyRef.current = { timeline: updatedTimeline, index: updatedTimeline.length - 1 };

    setHistoryTimeline(updatedTimeline);
    setHistoryIndex(updatedTimeline.length - 1);
    setTiles(nextTiles);
    setRemainingSteps(nextRemainingSteps);
    setStepsUsed(nextStepsUsed);
  };

  // Undo move
  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    const targetIdx = historyIndex - 1;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    if (freeBacktracksLeft <= 0) {
      sound.playFail();
      haptics.outOfSteps();
      flashHint(`本轮回溯次数已用完（每关 ${FREE_BACKTRACKS} 次），只能靠剩余步数了`);
      return;
    }
    trackUndoOperation();
    haptics.undo();
    levelUndosUsedRef.current += 1;
    setFreeBacktracksLeft((n) => n - 1);
    setUnlockedCount(Object.keys(loadUnlockedAchievements()).length);
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    setStepsUsed(targetSnap.stepsUsed ?? 0);
    sound.playRotate();
  }, [historyIndex, historyTimeline, freeBacktracksLeft, flashHint]);

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
    setStepsUsed(targetSnap.stepsUsed ?? 0);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  // Jump to specific step in history
  const handleJumpToStep = useCallback((targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= historyTimeline.length || targetIdx === historyIndex) return;
    const targetSnap = historyTimeline[targetIdx];
    if (!targetSnap) return;
    if (freeBacktracksLeft <= 0) {
      sound.playFail();
      haptics.outOfSteps();
      flashHint(`本轮回溯次数已用完（每关 ${FREE_BACKTRACKS} 次），只能靠剩余步数了`);
      return;
    }
    hasUsedTimelineJumpRef.current = true;
    setFreeBacktracksLeft((n) => n - 1);
    setHistoryIndex(targetIdx);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    setStepsUsed(targetSnap.stepsUsed ?? 0);
    sound.playRotate();
  }, [historyIndex, historyTimeline, freeBacktracksLeft, flashHint]);

  // Reset to initial state (step 0) — this is a full retry, so the rewind
  // allowance is refreshed with it.
  const handleResetToStart = useCallback(() => {
    if (historyTimeline.length === 0 || historyIndex === 0) return;
    const targetSnap = historyTimeline[0];
    hasUsedTimelineJumpRef.current = true;
    setHistoryIndex(0);
    setTiles(targetSnap.tiles.map((t) => ({ ...t })));
    setRemainingSteps(targetSnap.remainingSteps);
    setStepsUsed(targetSnap.stepsUsed ?? 0);
    setFreeBacktracksLeft(FREE_BACKTRACKS);
    setTopUpUsed(false);
    sound.playRotate();
  }, [historyIndex, historyTimeline]);

  // Restart level
  const handleRestart = () => {
    loadLevel(activeLevelConfig);
    setEnergyScreen('puzzle');
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
      setEnergyScreen('puzzle');
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
    <div
      className="h-[100dvh] max-h-[100dvh] overflow-hidden overscroll-none select-none flex flex-col justify-between relative bg-[#241b62]"
    >
      {/* Transient rule hint (rewind allowance / step top-up) */}
      {hintMessage && (
        <div className="fixed inset-x-0 top-16 z-[70] flex justify-center px-4 pointer-events-none">
          <div className="max-w-sm w-full text-center text-xs font-semibold text-[#5b3a1e] bg-amber-50/95 border border-amber-300 rounded-xl px-3 py-2 shadow-md animate-in fade-in slide-in-from-top-2 duration-150">
            {hintMessage}
          </div>
        </div>
      )}

      {/* Legacy utility header remains available for the editor and endless mode. */}
      {currentView !== 'story' && (
        <GameHeader
          currentView={currentView}
          onSelectView={(v) => {
            setCurrentView(v);
            setCustomLevel(null);
            if (v === 'story') setEnergyScreen('home');
          }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          unlockedCount={unlockedCount}
          totalCount={14}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
          onOpenStory={() => setIsStoryOpen(true)}
          onOpenFloraCompendium={() => setIsFloraOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      )}

      {/* Main Content Area based on Current View */}
      <main className="flex-1 flex flex-col justify-center overflow-hidden min-h-0 w-full">
        {currentView === 'story' && (
          <>
            {energyScreen === 'home' && (
              <EnergyParkHome
                level={activeLevelConfig}
                clearedCount={clearedLevels.length}
                onContinue={() => (simulation.isAllLit ? handleNextLevel() : setEnergyScreen('puzzle'))}
                onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
                onOpenFlora={() => setIsFloraOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenSettings={() => setIsAndroidModalOpen(true)}
              />
            )}
            {energyScreen === 'puzzle' && (
              <EnergyParkPuzzle
                level={activeLevelConfig}
                tiles={tiles}
                remainingSteps={remainingSteps}
                bestSteps={!customLevel ? bestStepsRecord[activeLevelConfig.id] : undefined}
                simulation={simulation}
                isPeekActive={isPeekActive}
                canUndo={historyIndex > 0}
                onBack={() => setEnergyScreen('home')}
                onHelp={() => setIsRulesOpen(true)}
                onHint={() => flashHint(activeLevelConfig.hintText)}
                onUndo={handleUndo}
                onRestart={handleRestart}
                onTileClick={handleTileClick}
                onLongPressStart={() => setIsPeekActive(true)}
                onLongPressEnd={() => setIsPeekActive(false)}
              />
            )}
            {energyScreen === 'restoration' && (
              <EnergyParkRestoration
                levelTitle={activeLevelConfig.title}
                stepsUsed={victoryStats?.stepsUsed ?? stepsUsed}
                stars={victoryStats ? getStarsForSteps(victoryStats.stepsUsed, activeLevelConfig) : 1}
                hasNext={activeLevelConfig.id < DEFAULT_LEVELS.length}
                onHome={() => setEnergyScreen('home')}
                onNext={handleNextLevel}
              />
            )}
          </>
        )}

        {currentView === 'endless' && (
          <ErrorBoundary fallbackTitle="无尽挑战模式">
            <EndlessMode
              onHome={() => {
                setCurrentView('story');
                setEnergyScreen('home');
              }}
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
                setEnergyScreen('puzzle');
              }}
              onBack={() => {
                setCurrentView('story');
                setEnergyScreen('home');
              }}
            />
          </div>
        )}
      </main>

      {currentView !== 'story' && (
        <footer className="hidden lg:block w-full text-center py-2 text-xs text-[#526c5f] border-t border-[#dce3d5]/70 shrink-0">
          <span>神树灵泉 · 旋转翡翠水渠灌溉灵木百花 · 99重通天神树</span>
        </footer>
      )}

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
            setEnergyScreen('puzzle');
            setIsLevelSelectOpen(false);
          }}
          onClose={() => setIsLevelSelectOpen(false)}
          onOpenFloraCompendium={() => {
            setIsLevelSelectOpen(false);
            setIsFloraOpen(true);
          }}
        />
      )}

      {/* Story Prologue Cutscene Modal */}
      <StoryPrologueModal
        isOpen={isStoryOpen}
        onClose={handleCloseStory}
        onStartGame={handleCloseStory}
      />

      {/* First-run level-1 coach marks */}
      <OnboardingGuide
        isOpen={isOnboardingOpen}
        levelTitle={activeLevelConfig.title}
        maxSteps={activeLevelConfig.maxSteps}
        parSteps={activeLevelConfig.parSteps}
        onClose={handleCloseOnboarding}
        onOpenRules={() => {
          handleCloseOnboarding();
          setIsRulesOpen(true);
        }}
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
          setEnergyScreen('puzzle');
          setIsFloraOpen(false);
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
