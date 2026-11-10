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
  getStars,
  localDate,
  PARK_STORAGE_KEY,
  readParkProgress,
  resumeLevel,
} from "./utils/parkProgress";

type Mode = "story" | "endless" | "editor";
function readSaved<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}
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
    litCount: sim.litCount,
    totalBulbs: sim.totalBulbs,
    description,
  };
}

export default function App() {
  const [clearedLevels, setClearedLevels] = useState(() =>
    readSaved<number[]>("honeycomb_cleared_levels", []),
  );
  const [bestSteps, setBestSteps] = useState(() =>
    readSaved<Record<number, number>>("honeycomb_best_steps", {}),
  );
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

  // 在实际接通时结算并落盘，界面切换只负责呈现结果。
  const complete = (nextRemaining: number) => {
    if (winProcessed.current) return;
    winProcessed.current = true;
    const stepsUsed = level.maxSteps - nextRemaining;
    if (mode === "story") {
      const progress = readParkProgress(localStorage);
      const firstReward = !progress.rewardedLevels.includes(level.id);
      const previousStars = clearedLevels.includes(level.id)
        ? getStars(level.maxSteps - (bestSteps[level.id] ?? 0), level.maxSteps)
        : 0;
      setVictoryReward({
        stars: Math.max(
          0,
          getStars(nextRemaining, level.maxSteps) - previousStars,
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
    if (
      clicked.locked ||
      clicked.type === "empty" ||
      remaining === 0 ||
      winProcessed.current
    )
      return;
    const toggle = clicked.type === "switch" && action === "toggle-switch";
    const nextTiles = tiles.map((tile) =>
      tile.id === clicked.id
        ? toggle
          ? { ...tile, switchClosed: !tile.switchClosed }
          : { ...tile, rotation: tile.rotation + 90 }
        : tile,
    );
    const nextRemaining = remaining - 1;
    const nextHistory = [
      ...history.slice(0, historyIndex + 1),
      snapshot(
        level,
        nextTiles,
        nextRemaining,
        history[historyIndex].stepNumber + 1,
        `${toggle ? "切换能量闸" : "旋转管道"} (${clicked.row + 1}, ${clicked.col + 1})`,
      ),
    ];
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
    if (nextSim.isAllLit) complete(nextRemaining);
    else if (nextRemaining === 0) {
      sound.playFail();
      haptics.outOfSteps();
    }
  };
  useEffect(() => {
    if (screen === "play" && simulation.isAllLit && !winProcessed.current)
      complete(remaining);
  }, [screen, level, simulation.isAllLit]);
  const travel = useCallback(
    (index: number, jump = false) => {
      const item = history[index];
      if (!item || index === historyIndex || winProcessed.current) return;
      setTiles(item.tiles.map((tile) => ({ ...tile })));
      setRemaining(item.remainingSteps);
      setHistoryIndex(index);
      if (jump) stats.current.jumped = true;
      if (index < historyIndex) {
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
