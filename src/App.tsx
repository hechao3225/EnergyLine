import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CandyThemeShell } from "./components/CandyThemeShell";
import { DEFAULT_LEVELS } from "./data/defaultLevels";
import { LAB_LEVELS } from "./data/labLevels";
import { AXIS_TRIAL_LEVELS } from "./data/axisTrialLevels";
import type { HistorySnapshot, LevelConfig, Tile } from "./types/game";
import { generateEndlessLevel, isRotationNoop, simulateCircuit } from "./utils/circuit";
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
  FIRST_CLEAR_COINS,
  HELL_CLEAR_COINS,
  readStoryProgress,
  PROGRESS_VERSION,
  PROGRESS_VERSION_KEY,
} from "./utils/parkProgress";
import { getStarsForLights, getStarsForSteps } from "./utils/rating";

const BEST_LIGHTS_KEY = "honeycomb_best_lights";
const bulbsOf = (level: LevelConfig) => level.tiles.filter((t) => t.type === "bulb").length;

type Mode = "story" | "endless" | "editor" | "lab";
/** 获胜需要的设施数：显式 goal 或全部 */
export const goalOf = (level: LevelConfig) =>
  level.goal ?? level.tiles.filter((t) => t.type === "bulb").length;
const TRIAL_AXIS =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("trial") === "axis";
const TRIAL_START = 41;

// 主线 41–43 用前三张手写板；44–50 用生成的板。LAB_LEVELS 里第 4 张（双色）不进主线。
const TRIAL_SEQUENCE = [LAB_LEVELS[0], LAB_LEVELS[1], LAB_LEVELS[2], ...AXIS_TRIAL_LEVELS];
function levelById(id: number): LevelConfig {
  if (TRIAL_AXIS) {
    const trial = TRIAL_SEQUENCE[id - TRIAL_START];
    if (trial) return { ...trial, id, code: String(id) };
  }
  return DEFAULT_LEVELS.find((item) => item.id === id)!;
}
function snapshot(
  level: LevelConfig,
  tiles: Tile[],
  remaining: number,
  step: number,
  description: string,
): HistorySnapshot {
  const sim = simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules);
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
  const [bestLights, setBestLights] = useState<Record<number, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(BEST_LIGHTS_KEY) ?? "{}");
    } catch {
      return {};
    }
  });
  const [levelId, setLevelId] = useState(() => resumeLevel(clearedLevels));
  const [mode, setMode] = useState<Mode>("story");
  const [customLevel, setCustomLevel] = useState<LevelConfig | null>(null);
  // 玩法试玩：?trial=axis 时把主线 41–43 临时换成三张联动轴实验板（不改任何数据/存档字段）
  const level = customLevel ?? levelById(levelId);
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
    () => simulateCircuit(tiles, level.gridRows, level.gridCols, level.rules),
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
  const complete = (nextRemaining: number, completedSteps: number, litCount: number) => {
    if (winProcessed.current) return;
    winProcessed.current = true;
    const stepsUsed = completedSteps;
    let earnedStars = 0;
    if (mode === "story") {
      const progress = readParkProgress(localStorage);
      const firstReward = !progress.rewardedLevels.includes(level.id);
      const totalBulbs = bulbsOf(level);
      const previousStars =
        level.goal !== undefined
          ? getStarsForLights(
              level.goal,
              totalBulbs,
              // 老存档没有 bestLights 记录：已通关就按达标算，避免重玩时倒扣星星
              bestLights[level.id] ?? (clearedLevels.includes(level.id) ? level.goal : 0),
            )
          : getBestStars(level, clearedLevels, bestSteps);
      earnedStars =
        level.goal !== undefined
          ? getStarsForLights(level.goal, totalBulbs, litCount)
          : getStarsForSteps(stepsUsed, level);
      if (level.goal !== undefined && litCount > (bestLights[level.id] ?? 0)) {
        const nextLights = { ...bestLights, [level.id]: litCount };
        setBestLights(nextLights);
        localStorage.setItem(BEST_LIGHTS_KEY, JSON.stringify(nextLights));
      }
      const clearCoins = level.tier === "hell" ? HELL_CLEAR_COINS : FIRST_CLEAR_COINS;
      const clearGems = level.tier === "hell" ? 15 : 10;
      setVictoryReward({
        stars: Math.max(0, earnedStars - previousStars),
        coins: firstReward ? clearCoins : 0,
        gems: firstReward ? clearGems : 0,
      });
      localStorage.setItem(
        PARK_STORAGE_KEY,
        JSON.stringify(completeParkLevel(progress, level.id, localDate(), clearCoins, clearGems)),
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
    if (mode !== "editor" && mode !== "lab")
      checkVictoryAchievements({
        levelId: level.id,
        stepsUsed,
        remainingSteps: nextRemaining,
        maxSteps: level.maxSteps,
        parSteps: level.parSteps,
        levelUndosUsed: stats.current.undos,
        hasUsedTimelineJump: stats.current.jumped,
        hasToggledSwitch: stats.current.switched,
        stars: earnedStars,
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
    // 十字管这类 90° 对称的格子：转与不转接法一模一样，点它不该扣步。
    // 带 axis 的格子例外——点一下整组同转，别把联动组挡掉。
    if (!clicked.axis && isRotationNoop(clicked)) return;
    const toggle = clicked.type === "switch" && action === "toggle-switch";
    // 联动轴：整组一起转，仍然只算 1 步
    const axis = toggle ? undefined : clicked.axis;
    // 焊死：已经通电的格子（或整组）不能再转
    if (level.rules?.weld && !toggle) {
      const welded = axis
        ? current.tiles.some((tile) => tile.axis === axis && simulation.poweredTileIds.has(tile.id))
        : simulation.poweredTileIds.has(clicked.id);
      if (welded) return;
    }
    const nextTiles = current.tiles.map((tile) => {
      if (axis && tile.axis === axis)
        return { ...tile, rotation: tile.rotation + 90 * (tile.axisDir ?? 1) };
      if (tile.id !== clicked.id) return tile;
      return toggle
        ? { ...tile, switchClosed: !tile.switchClosed }
        : { ...tile, rotation: tile.rotation + 90 };
    });
    const nextRemaining = current.remaining - 1;
    const nextSteps = (current.history[current.index].stepsUsed ?? current.history[current.index].stepNumber) + 1;
    const nextHistory = [
      ...current.history.slice(0, current.index + 1),
      snapshot(
        level,
        nextTiles,
        nextRemaining,
        nextSteps,
        `${toggle ? "切换能量闸" : axis ? "联动旋转" : "旋转管道"} (${clicked.row + 1}, ${clicked.col + 1})`,
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
    } else if (axis && clicked.axisDir) {
      sound.playGear();
      haptics.tapLight();
    } else {
      sound.playRotate();
      haptics.tapLight();
    }
    const nextSim = simulateCircuit(nextTiles, level.gridRows, level.gridCols, level.rules);
    const reached = nextSim.litCount >= goalOf(level);
    if (level.goal !== undefined) {
      // 达标关：预算就是达标所需的最少步数，达标即最优——立刻结算
      if (reached) complete(nextRemaining, nextSteps, nextSim.litCount);
      else if (nextRemaining === 0) {
        sound.playFail();
        haptics.outOfSteps();
      }
    } else if (nextSim.isAllLit) complete(nextRemaining, nextSteps, nextSim.litCount);
    else if (nextRemaining === 0) {
      sound.playFail();
      haptics.outOfSteps();
    }
  };
  useEffect(() => {
    if (
      screen === "play" &&
      level.goal === undefined &&
      simulation.isAllLit &&
      !winProcessed.current
    )
      complete(remaining, stepsUsed, simulation.litCount);
  }, [screen, level, simulation.isAllLit]);
  /** 达标关：玩家满意了就收工结算 */
  const settle = () => {
    const current = attempt.current;
    if (winProcessed.current || level.goal === undefined) return;
    const sim = simulateCircuit(current.tiles, level.gridRows, level.gridCols, level.rules);
    if (sim.litCount < goalOf(level)) return;
    complete(current.remaining, current.history[current.index].stepsUsed ?? 0, sim.litCount);
  };
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
    const config = levelById(id);
    setLevelId(id);
    setCustomLevel(null);
    setMode("story");
    setLevelsOpen(false);
    reset(config);
  };
  const startLab = (index = 0) => {
    const config = LAB_LEVELS[index] ?? LAB_LEVELS[0];
    setCustomLevel(config);
    setLevelId(config.id);
    setMode("lab");
    setLevelsOpen(false);
    reset(config);
  };
  // 道具：步数用尽后补 3 步（切片里先免费发放，看手感再定经济）
  const addSteps = () => {
    const current = attempt.current;
    if (winProcessed.current || current.remaining > 0) return;
    const nextRemaining = current.remaining + 3;
    attempt.current = { ...current, remaining: nextRemaining };
    setRemaining(nextRemaining);
    sound.playSwitch();
    haptics.tapHeavy();
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
      title: `无尽挑战 ${index}`,
      gridRows: 6,
      gridCols: 6,
    };
    setCustomLevel(config);
    setMode("endless");
    reset(config);
  };
  const next = () => {
    if (mode === "endless") startEndless(endless.current.targets, true);
    else if (mode === "editor" || mode === "lab") reset(level);
    else if (level.id < 99) selectLevel(level.id + 1);
    else setLevelsOpen(true);
  };
  const home = () => {
    if (winTimer.current) clearTimeout(winTimer.current);
    setScreen("home");
    setLevelsOpen(false);
    if (mode !== "story" || winProcessed.current) {
      const id = resumeLevel(clearedLevels);
      const config = levelById(id);
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
      bestLights={bestLights}
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
      onSettle={settle}
      onStartLab={startLab}
      onAddSteps={addSteps}
      gameMode={mode}
      victoryReward={victoryReward}
    />
  );
}
