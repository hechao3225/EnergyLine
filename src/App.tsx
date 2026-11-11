import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CandyThemeShell } from "./components/CandyThemeShell";
import { DEFAULT_LEVELS } from "./data/defaultLevels";
import type { HistorySnapshot, LevelConfig, Tile } from "./types/game";
import { generateEndlessLevel, simulateCircuit } from "./utils/circuit";
import { sound } from "./utils/audio";
import { haptics } from "./utils/haptics";
import { triggerConfetti } from "./utils/confetti";
import {
  checkVictoryAchievements,
  trackUndoOperation,
} from "./utils/achievements";
import {
  completeParkLevel,
  getBestStars,
  localDate,
  PARK_STORAGE_KEY,
  readParkProgress,
  resumeLevel,
  readStoryProgress,
  PROGRESS_VERSION,
  PROGRESS_VERSION_KEY,
} from "./utils/parkProgress";
import { getStarsForSteps } from "./utils/rating";

type Mode = "story" | "endless" | "editor";
function snapshot(
  level: LevelConfig,
  tiles: Tile[],
  remaining: number,
  step: number,
  description: string,
): HistorySnapshot {
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols);
  return {
    id: `step-${Date.now()}-${step}`,
    stepNumber: step,
    tiles: tiles.map((tile) => ({ ...tile })),
    remainingSteps: remaining,
    stepsUsed: step,
    litCount: sim.litCount,
    totalBulbs: sim.totalBulbs,
    description,
  };
}

export default function App() {
  const [savedProgress] = useState(() => readStoryProgress(localStorage, DEFAULT_LEVELS));
  const [clearedLevels, setClearedLevels] = useState(savedProgress.cleared);
  const [bestSteps, setBestSteps] = useState(savedProgress.best);
  const [levelId, setLevelId] = useState(() => resumeLevel(clearedLevels));
  const [mode, setMode] = useState<Mode>("story");
  const [customLevel, setCustomLevel] = useState<LevelConfig | null>(null);
  const level =
    customLevel ?? DEFAULT_LEVELS.find((item) => item.id === levelId)!;
  const [screen, setScreen] = useState<"home" | "play" | "victory">("home");
  const [tiles, setTiles] = useState(() =>
    level.tiles.map((tile) => ({ ...tile })),
  );
  const [remaining, setRemaining] = useState(level.maxSteps);
  const [history, setHistory] = useState(() => [
    snapshot(level, level.tiles, level.maxSteps, 0, "初始状态"),
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [rewinds, setRewinds] = useState(3);
  const attempt = useRef({ tiles, remaining, history, index: historyIndex, rewinds });
  attempt.current = { tiles, remaining, history, index: historyIndex, rewinds };
  const stepsUsed = history[historyIndex].stepsUsed ?? history[historyIndex].stepNumber;
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const [victoryReward, setVictoryReward] = useState({
    stars: 0,
    coins: 0,
    gems: 0,
  });
  const winProcessed = useRef(false);
  const winTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stats = useRef({ undos: 0, jumped: false, switched: false });
  const endless = useRef({ targets: 3, index: 1, streak: 0 });
  const simulation = useMemo(
    () => simulateCircuit(tiles, level.gridRows, level.gridCols),
    [tiles, level],
  );

  const reset = useCallback((config: LevelConfig) => {
    if (winTimer.current) clearTimeout(winTimer.current);
    winProcessed.current = false;
    setTiles(config.tiles.map((tile) => ({ ...tile })));
    setRemaining(config.maxSteps);
    setHistory([
      snapshot(config, config.tiles, config.maxSteps, 0, "初始状态"),
    ]);
    setHistoryIndex(0);
    setRewinds(3);
    attempt.current = { tiles: config.tiles.map((tile) => ({ ...tile })), remaining: config.maxSteps,
      history: [snapshot(config, config.tiles, config.maxSteps, 0, "初始状态")], index: 0, rewinds: 3 };
    stats.current = { undos: 0, jumped: false, switched: false };
    setPeek(false);
    setScreen("play");
  }, []);
  useEffect(
    () => () => {
      if (winTimer.current) clearTimeout(winTimer.current);
    },
    [],
  );
  useEffect(() => {
    localStorage.setItem("honeycomb_best_steps", JSON.stringify(savedProgress.best));
    localStorage.setItem(PROGRESS_VERSION_KEY, PROGRESS_VERSION);
  }, []);

  // 在实际接通时结算并落盘，界面切换只负责呈现结果。
  const complete = (nextRemaining: number, completedSteps: number) => {
    if (winProcessed.current) return;
    winProcessed.current = true;
    const stepsUsed = completedSteps;
    if (mode === "story") {
      const progress = readParkProgress(localStorage);
      const firstReward = !progress.rewardedLevels.includes(level.id);
      const previousStars = getBestStars(level, clearedLevels, bestSteps);
      setVictoryReward({
        stars: Math.max(
          0,
          getStarsForSteps(stepsUsed, level) - previousStars,
        ),
        coins: firstReward ? 100 : 0,
        gems: firstReward ? 10 : 0,
      });
      localStorage.setItem(
        PARK_STORAGE_KEY,
        JSON.stringify(completeParkLevel(progress, level.id, localDate())),
      );
      const cleared = clearedLevels.includes(level.id)
        ? clearedLevels
        : [...clearedLevels, level.id];
      const best = {
        ...bestSteps,
        [level.id]: Math.min(bestSteps[level.id] ?? Infinity, stepsUsed),
      };
      localStorage.setItem("honeycomb_cleared_levels", JSON.stringify(cleared));
      localStorage.setItem("honeycomb_best_steps", JSON.stringify(best));
      setClearedLevels(cleared);
      setBestSteps(best);
    } else setVictoryReward({ stars: 0, coins: 0, gems: 0 });
    if (mode === "endless") endless.current.streak += 1;
    if (mode !== "editor")
      checkVictoryAchievements({
        levelId: level.id,
        stepsUsed,
        remainingSteps: nextRemaining,
        maxSteps: level.maxSteps,
        parSteps: level.parSteps,
        levelUndosUsed: stats.current.undos,
        hasUsedTimelineJump: stats.current.jumped,
        hasToggledSwitch: stats.current.switched,
        isEndless: mode === "endless",
        endlessStreak: endless.current.streak,
      });
    sound.playWin();
    haptics.victory();
    triggerConfetti();
    winTimer.current = setTimeout(() => setScreen("victory"), 1100);
  };
  const rotate = (
    clicked: Tile,
    action: "rotate" | "toggle-switch" = "rotate",
  ) => {
    const current = attempt.current;
    if (
      clicked.locked ||
      clicked.type === "empty" ||
      current.remaining === 0 ||
      winProcessed.current
    )
      return;
    const toggle = clicked.type === "switch" && action === "toggle-switch";
    const nextTiles = current.tiles.map((tile) =>
      tile.id === clicked.id
        ? toggle
          ? { ...tile, switchClosed: !tile.switchClosed }
          : { ...tile, rotation: tile.rotation + 90 }
        : tile,
    );
    const nextRemaining = current.remaining - 1;
    const nextSteps = (current.history[current.index].stepsUsed ?? current.history[current.index].stepNumber) + 1;
    const nextHistory = [
      ...current.history.slice(0, current.index + 1),
      snapshot(
        level,
        nextTiles,
        nextRemaining,
        nextSteps,
        `${toggle ? "切换能量闸" : "旋转管道"} (${clicked.row + 1}, ${clicked.col + 1})`,
      ),
    ];
    attempt.current = { ...current, tiles: nextTiles, remaining: nextRemaining, history: nextHistory, index: nextHistory.length - 1 };
    setTiles(nextTiles);
    setRemaining(nextRemaining);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    if (toggle) {
      stats.current.switched = true;
      sound.playSwitch();
      haptics.tapHeavy();
    } else {
      sound.playRotate();
      haptics.tapLight();
    }
    const nextSim = simulateCircuit(nextTiles, level.gridRows, level.gridCols);
    if (nextSim.isAllLit) complete(nextRemaining, nextSteps);
    else if (nextRemaining === 0) {
      sound.playFail();
      haptics.outOfSteps();
    }
  };
  useEffect(() => {
    if (screen === "play" && simulation.isAllLit && !winProcessed.current)
      complete(remaining, stepsUsed);
  }, [screen, level, simulation.isAllLit]);
  const travel = useCallback(
    (index: number, jump = false) => {
      const current = attempt.current;
      const item = current.history[index];
      if (!item || index === current.index || winProcessed.current) return;
      const backtrack = jump || index < current.index;
      if (backtrack && current.rewinds === 0) return;
      const nextRewinds = current.rewinds - (backtrack ? 1 : 0);
      attempt.current = { ...current, tiles: item.tiles.map((tile) => ({ ...tile })), remaining: item.remainingSteps, index, rewinds: nextRewinds };
      setRewinds(nextRewinds);
      setTiles(item.tiles.map((tile) => ({ ...tile })));
      setRemaining(item.remainingSteps);
      setHistoryIndex(index);
      if (jump) stats.current.jumped = true;
      if (index < current.index) {
        stats.current.undos += 1;
        trackUndoOperation();
      }
      sound.playRotate();
      haptics.undo();
    },
    [history, historyIndex],
  );
  const selectLevel = (id: number) => {
    const config = DEFAULT_LEVELS.find((item) => item.id === id)!;
    setLevelId(id);
    setCustomLevel(null);
    setMode("story");
    setLevelsOpen(false);
    reset(config);
  };
  const startEndless = (targets: number, next = false) => {
    const index = next ? endless.current.index + 1 : 1;
    endless.current = {
      targets,
      index,
      streak: next ? endless.current.streak : 0,
    };
    const generated = generateEndlessLevel(index, targets);
    const config: LevelConfig = {
      ...generated,
      id: -index,
      code: `∞${index}`,
      totalLevels: 0,
      title: `星光谜题 ${index}`,
      winText: "又一束星光被唤醒！",
      gridRows: 6,
      gridCols: 6,
    };
    setCustomLevel(config);
    setMode("endless");
    reset(config);
  };
  const next = () => {
    if (mode === "endless") startEndless(endless.current.targets, true);
    else if (mode === "editor") reset(level);
    else if (level.id < 99) selectLevel(level.id + 1);
    else setLevelsOpen(true);
  };
  const home = () => {
    if (winTimer.current) clearTimeout(winTimer.current);
    setScreen("home");
    setLevelsOpen(false);
    if (mode !== "story" || winProcessed.current) {
      const id = resumeLevel(clearedLevels);
      const config = DEFAULT_LEVELS.find((item) => item.id === id)!;
      setLevelId(id);
      setMode("story");
      setCustomLevel(null);
      winProcessed.current = false;
      setTiles(config.tiles.map((tile) => ({ ...tile })));
      setRemaining(config.maxSteps);
      setHistory([
        snapshot(config, config.tiles, config.maxSteps, 0, "初始状态"),
      ]);
      setHistoryIndex(0);
      setRewinds(3);
    }
  };
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (
        screen !== "play" ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        document.querySelector('[role="dialog"]')
      )
        return;
      if (event.code === "Space") {
        event.preventDefault();
        setPeek((value) => !value);
      } else if (event.key.toLowerCase() === "r") reset(level);
      else if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "z"
      ) {
        event.preventDefault();
        travel(historyIndex + (event.shiftKey ? 1 : -1));
      } else if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "y"
      ) {
        event.preventDefault();
        travel(historyIndex + 1);
      } else if (event.key.toLowerCase() === "m") sound.toggleMute();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [screen, level, historyIndex, travel, reset]);

  return (
    <CandyThemeShell
      screen={screen}
      level={level}
      levels={DEFAULT_LEVELS}
      tiles={tiles}
      simulation={simulation}
      remainingSteps={remaining}
      stepsUsed={stepsUsed}
      rewinds={rewinds}
      clearedLevels={clearedLevels}
      bestSteps={bestSteps}
      levelSelectOpen={levelsOpen}
      isPeekActive={peek}
      onStartLevel={() => {
        if (winProcessed.current) reset(level);
        else setScreen("play");
      }}
      onBackHome={home}
      onNextLevel={next}
      onRestart={() => {
        if (mode === "endless") endless.current.streak = 0;
        reset(level);
      }}
      onUndo={() => travel(historyIndex - 1)}
      onRedo={() => travel(historyIndex + 1)}
      onTileClick={rotate}
      onOpenLevels={() => setLevelsOpen(true)}
      onCloseLevels={() => setLevelsOpen(false)}
      onSelectLevel={selectLevel}
      history={history}
      historyIndex={historyIndex}
      onJumpToStep={(index) => travel(index, true)}
      onPlayCustom={(config) => {
        setCustomLevel(config);
        setMode("editor");
        reset(config);
      }}
      onStartEndless={startEndless}
      gameMode={mode}
      victoryReward={victoryReward}
    />
  );
}
