import React, { useEffect, useRef, useState } from "react";
import type {
  LevelConfig,
  SimulationResult,
  Tile,
  HistorySnapshot,
} from "../types/game";
import { Art, Icon, IconName, ParkButton, Stars, ParkExhibit, getExhibitArt } from "./ParkArt";
import { GameBoard } from "./GameBoard";
import { BUILD_TAG } from "../buildTag";
import { LAB_LEVELS } from "../data/labLevels";
import { LevelEditor } from "./LevelEditor";
import { OnboardingGuide } from "./OnboardingGuide";
import { ShopModal } from "./ShopModal";
import { MAX_STARS, getParSteps, getStarThresholds, getStarsForLights, getStarsForSteps } from "../utils/rating";
import { describeHint, findHint, findHintSequence, supportsHintEngine, type HintMove } from "../utils/hint-engine";
import { CENTER_DISTRICTS, getCollectionEntry, getLevelContent, WORLD } from "../content";
import { WorldMapModal } from "./WorldMapModal";
import { ChapterMapView } from "./ChapterMapView";
import { HonorProfile } from "./HonorProfile";
import {
  getDecoratedAchievements,
  loadUnlockedAchievements,
  loadPlayerStats,
} from "../utils/achievements";
import {
  HONOR_TITLES,
  resolveEquippedHonorTitle,
} from "../data/honorTitles";
import { sound } from "../utils/audio";
import { haptics } from "../utils/haptics";
import {
  buyCosmetic,
  buySupply,
  claimDailyTask,
  CHAPTERS,
  chapterIndex,
  consumeSupply,
  equipCosmetic,
  equipHonorTitle,
  getBestStars,
  isCosmeticEquipped,
  localDate,
  PARK_STORAGE_KEY,
  ParkProgress,
  readParkProgress,
  resetParkProgress,
  setHomeExhibit,
} from "../utils/parkProgress";
import { SUPPLY_ITEMS } from "../data/shopCatalog";
import { applyParkTheme } from "../utils/parkTheme";

type Modal =
  | "none"
  | "levels"
  | "tasks"
  | "bag"
  | "shop"
  | "hint"
  | "rules"
  | "settings"
  | "profile"
  | "flora"
  | "mail"
  | "story"
  | "onboarding"
  | "history"
  | "editor"
  | "endless"
  | "world";
interface Props {
  screen: "home" | "play" | "victory";
  attemptId: number;
  level: LevelConfig;
  levels: LevelConfig[];
  tiles: Tile[];
  simulation: SimulationResult;
  remainingSteps: number;
  stepsUsed: number;
  rewinds: number;
  clearedLevels: number[];
  bestSteps: Record<number, number>;
  /** 达标关：每关历史最好“保住几处设施” */
  bestLights: Record<number, number>;
  levelSelectOpen: boolean;
  isPeekActive: boolean;
  onStartLevel: () => void;
  onBackHome: () => void;
  onNextLevel: () => void;
  onRestart: () => void;
  onUndo: () => void;
  onTileClick: (tile: Tile, action?: "rotate" | "toggle-switch") => void;
  onOpenLevels: () => void;
  onCloseLevels: () => void;
  onSelectLevel: (id: number) => void;
  history: HistorySnapshot[];
  historyIndex: number;
  onJumpToStep: (index: number) => void;
  onRedo: () => void;
  onPlayCustom: (level: LevelConfig) => void;
  onStartEndless: (difficulty: number) => void;
  /** 玩法实验关入口（纵向切片验证用，可移除） */
  onStartLab?: (index: number) => void;
  /** 道具：步数用尽后补 3 步 */
  onAddSteps?: () => boolean;
  /** 道具：本局额外回溯 +1 */
  onAddRewind?: () => boolean;
  /** 达标关：提前结算（拿当前星数） */
  onSettle?: () => void;
  gameMode: "story" | "endless" | "editor" | "lab";
  victoryReward: { stars: number; coins: number; gems?: number };
}
const TITLES: Record<Exclude<Modal, "none">, string> = {
  levels: "乐园关卡",
  tasks: "每日任务",
  bag: "我的背包",
  shop: "乐园商店",
  hint: "通路提示",
  rules: "乐园指南",
  settings: "乐园设置",
  profile: "修复师档案",
  flora: "乐园图鉴",
  mail: "乐园来信",
  story: "乐园的故事",
  onboarding: "修复指南",
  history: "操作足迹",
  editor: "关卡工坊",
  endless: "无尽挑战",
  world: "乐园宇宙",
};
const HONOR_TITLE_SEEN_KEY = "honeycomb_honor_titles_seen_v1";

export function CandyThemeShell(p: Props) {
  const [modal, setModal] = useState<Modal>(() => localStorage.getItem("honeycomb_story_seen_v1") === "1" ? "none" : "story");
  const [progress, setProgress] = useState(
    readParkProgress.bind(null, localStorage),
  );
  const [notice, setNotice] = useState("");
  /** 提示引擎算出的下一步，同时用来高亮棋盘格子 */
  const [hintMove, setHintMove] = useState<HintMove | null>(null);
  const [hintMoves, setHintMoves] = useState<HintMove[]>([]);
  // 换关、切页时上一次的高亮必须消失，否则会指向新盘面上的同一格。
  useEffect(() => {
    setHintMove(null);
    setHintMoves([]);
  }, [p.screen, p.level.id]);
  // 每次开始新的 attempt 都清空提示，0 步重置同样生效。
  useEffect(() => {
    setHintMove(null);
    setHintMoves([]);
  }, [p.attemptId]);
  useEffect(() => {
    setHintMove(null);
    setHintMoves([]);
  }, [p.historyIndex]);
  const [muted, setMuted] = useState(sound.isMuted());
  const [vibration, setVibration] = useState(haptics.isEnabled());
  const [chapter, setChapter] = useState(chapterIndex(p.level.id));
  const [collectionPage, setCollectionPage] = useState(0);
  const [exhibitId, setExhibitId] = useState<number | null>(null);
  const reward = p.victoryReward;
  const hasNewReward = reward.stars + reward.coins > 0;
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const candlesOf = (lv: LevelConfig) => lv.tiles.filter((t) => t.type === "bulb").length;
  /** 达标关按“保住几处”给星，其余关按步数给星 */
  const starsOf = (lv: LevelConfig) =>
    lv.goal !== undefined
      ? getStarsForLights(
          lv.goal,
          candlesOf(lv),
          // 老存档只记了"通关"没记"保住几处"：按达标算，别让人看到 0 星
          p.bestLights[lv.id] ?? (p.clearedLevels.includes(lv.id) ? lv.goal : 0),
        )
      : getBestStars(lv, p.clearedLevels, p.bestSteps);
  const totalStars = p.levels.reduce((sum, level) => sum + starsOf(level), 0);
  const currentStars =
    p.level.goal !== undefined
      ? getStarsForLights(p.level.goal, candlesOf(p.level), p.simulation.litCount)
      : getStarsForSteps(p.stepsUsed, p.level);
  const starThresholds = getStarThresholds(p.level);
  const parSteps = getParSteps(p.level);
  /** 仍在四星线内：顶栏高亮「最少步数」，超过后改为显示当前星级 */
  const onParPace = currentStars >= MAX_STARS;
  const canUndo = p.historyIndex > 0 && p.rewinds > 0;
  const today = localDate();
  const activeModal = modal;
  const unlocked = loadUnlockedAchievements();
  const playerStats = loadPlayerStats();
  const achievements = getDecoratedAchievements();
  const equippedHonorTitle = resolveEquippedHonorTitle(
    progress.equippedTitleId,
    unlocked,
  );
  const unlockedHonorTitleIds = HONOR_TITLES.filter(
    (title) => unlocked[title.achievementId],
  ).map((title) => title.id);
  let seenHonorTitleIds: string[] = [];
  try {
    const saved = JSON.parse(
      localStorage.getItem(HONOR_TITLE_SEEN_KEY) ?? "[]",
    );
    seenHonorTitleIds = Array.isArray(saved)
      ? saved.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    seenHonorTitleIds = [];
  }
  const hasUnseenHonorTitle = unlockedHonorTitleIds.some(
    (id) => !seenHonorTitleIds.includes(id),
  );
  const close = () => {
    if (modal === "story") localStorage.setItem("honeycomb_story_seen_v1", "1");
    if (modal === "onboarding") localStorage.setItem("honeycomb_onboarding_v1", "1");
    p.onCloseLevels();
    setModal("none");
    setExhibitId(null);
  };
  const open = (name: Modal) => {
    if (name === "profile" && unlockedHonorTitleIds.length > 0) {
      localStorage.setItem(
        HONOR_TITLE_SEEN_KEY,
        JSON.stringify(unlockedHonorTitleIds),
      );
    }
    if (name === "settings") {
      setMuted(sound.isMuted());
      setVibration(haptics.isEnabled());
    }
    setModal(name);
    setExhibitId(null);
  };
  const flash = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2400);
  };
  const save = (next: ParkProgress) => {
    localStorage.setItem(PARK_STORAGE_KEY, JSON.stringify(next));
    setProgress(next);
  };
  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );
  useEffect(() => {
    setProgress(readParkProgress(localStorage));
  }, [p.screen, p.clearedLevels, p.victoryReward]);
  useEffect(() => {
    const forcedTheme = new URLSearchParams(window.location.search).get("theme");
    if (forcedTheme !== "calm" && forcedTheme !== "default") {
      applyParkTheme(progress.equippedCosmetics.theme);
    }
  }, [progress.equippedCosmetics.theme]);
  useEffect(() => {
    if (p.levelSelectOpen) setChapter(chapterIndex(p.level.id));
  }, [p.levelSelectOpen]);
  useEffect(() => {
    if (p.screen === "play" && p.gameMode === "story" && p.level.id === 1 && !p.clearedLevels.includes(1) && localStorage.getItem("honeycomb_onboarding_v1") !== "1") setModal("onboarding");
  }, [p.screen, p.gameMode, p.level.id]);
  const useAdviceSupply = (id: "hint" | "lens") => {
    if (p.screen !== "play") {
      flash("进入关卡后可使用提示");
      return;
    }
    // 棋盘已经不接受操作时，提示只是一句安慰话，不该再扣灯泡
    if (p.remainingSteps <= 0) {
      flash("步数已经用完，重置后才能继续用提示");
      return;
    }
    if (p.gameMode !== "story" || !supportsHintEngine(p.level)) {
      flash("提示道具仅用于支持提示引擎的主线关卡");
      return;
    }
    const item = SUPPLY_ITEMS.find((supply) => supply.id === id);
    if (!item) return;
    if (progress[item.stockKey] < 1) {
      open("shop");
      flash(`${item.name}已用完`);
      return;
    }
    const first = findHint(p.level, p.tiles, p.remainingSteps);
    if (!first) {
      flash("这一步已经算不出通路了，重置后再试");
      return;
    }
    if (!first.reachable) {
      flash(`还差 ${first.stepsNeeded} 步才能接完，重置后再试`);
      return;
    }
    const moves =
      id === "hint"
        ? [first]
        : findHintSequence(p.level, p.tiles, p.remainingSteps, 3);
    save(consumeSupply(progress, id));
    setHintMoves(moves);
    setHintMove(first);
    open("hint");
  };
  const useRewindSupply = () => {
    if (p.screen !== "play" || progress.rewindTokens < 1 || !p.onAddRewind)
      return;
    const ok = p.onAddRewind();
    if (!ok) return;
    save(consumeSupply(progress, "rewind"));
    flash("时光回针已使用");
  };
  const useStepSupply = () => {
    if (!p.onAddSteps) return;
    const ok = p.onAddSteps();
    if (!ok) return;
    save(consumeSupply(progress, "step"));
    flash("应急线圈已补回 3 步");
  };
  /** 局内「重置」：已经走过步数才确认，空局直接重来。 */
  const restartWithConfirm = () => {
    if (p.stepsUsed > 0) {
      const ok = window.confirm(
        `本局已经操作 ${p.stepsUsed} 步，重置会清空这一步的全部操作，确定吗？`,
      );
      if (!ok) return;
    }
    p.onRestart();
  };
  /** 临时"全解锁"开关：调试/试玩用，存在本地 */
  const [unlockAll, setUnlockAll] = useState(
    () => localStorage.getItem("honeycomb_unlock_all") === "1",
  );
  const toggleUnlockAll = () => {
    const next = !unlockAll;
    setUnlockAll(next);
    localStorage.setItem("honeycomb_unlock_all", next ? "1" : "0");
  };
  /** 章节解锁：上一章关底通关（或本章已有进度）才开放 */
  const chapterLocked = (i: number) => {
    if (unlockAll) return false;
    if (i === 0) return false;
    const start = i * 20 + 1;
    const end = Math.min(99, (i + 1) * 20);
    const prevBoss = start - 1;
    return (
      !p.clearedLevels.includes(prevBoss) &&
      !p.clearedLevels.some((id) => id >= start && id <= end)
    );
  };
  const select = (id: number) => {
    if (chapterLocked(chapterIndex(id))) return;
    close();
    p.onSelectLevel(id);
  };
  const completed = p.clearedLevels.length;
  const district = CENTER_DISTRICTS[chapter] ?? CENTER_DISTRICTS[0];
  const districtCleared = p.clearedLevels.filter(
    (id) => id >= district.range[0] && id <= district.range[1],
  ).length;
  const districtTotal = district.range[1] - district.range[0] + 1;
  const lastLevel = p.gameMode === "story" && p.level.id === 99;
  const levelContent = getLevelContent(p.level.id);
  const collection = getCollectionEntry(p.level.id);
  const homeExhibit =
    progress.equippedCosmetics.exhibitId === null
      ? null
      : getCollectionEntry(progress.equippedCosmetics.exhibitId);
  const visibleHomeExhibit =
    homeExhibit && p.clearedLevels.includes(homeExhibit.levelId)
      ? homeExhibit
      : null;
  const starlightOutfit = progress.equippedCosmetics.outfit === "starlight";
  const hasSwitch = p.tiles.some((t) => t.type === "switch");
  const hasDiode = p.tiles.some((t) => t.type === "diode");
  const hasGear = p.tiles.some((t) => (t.axisDir ?? 0) !== 0);
  const exhibit = exhibitId == null ? null : getCollectionEntry(exhibitId);

  const navigation: { icon: IconName; text: string; action: () => void }[] = [
    {
      icon: "castle",
      text: "乐园",
      action: () => {
        p.onCloseLevels();
        p.onBackHome();
      },
    },
    { icon: "map", text: "关卡", action: p.onOpenLevels },
    { icon: "star", text: "任务", action: () => open("tasks") },
    { icon: "bag", text: "背包", action: () => open("bag") },
    { icon: "shop", text: "商店", action: () => open("shop") },
  ];
  return (
    <div className="park-shell">
      <div className="park-stage">
        {p.levelSelectOpen ? (
          <main className="park-levels-screen" aria-label="关卡路线">
            <ChapterMapView
              levels={p.levels}
              currentLevelId={p.level.id}
              clearedLevels={p.clearedLevels}
              bestSteps={p.bestSteps}
              bestLights={p.bestLights}
              onSelectLevel={select}
              onBack={() => {
                p.onCloseLevels();
                p.onBackHome();
              }}
              initialChapter={chapter}
            />
            <nav className="park-nav" aria-label="乐园导航">
              {navigation.map((item, i) => (
                <button
                  key={item.text}
                  className={i === 1 ? "is-active" : ""}
                  onClick={item.action}
                >
                  <Icon name={item.icon} />
                  <span>{item.text}</span>
                </button>
              ))}
            </nav>
          </main>
        ) : (
          <>
            {p.screen === "home" && (
          <main className="park-home" aria-label="能量管道乐园首页">
            <header className="park-resource-bar">
              <button
                className="park-avatar"
                onClick={() => open("profile")}
                aria-label="修复师档案"
              >
                <Art name="avatar-xingya@2x" />
                {hasUnseenHonorTitle && <span className="park-honor-badge" />}
              </button>
              {(
                [
                  { icon: "star", value: totalStars, action: "profile" },
                  { icon: "gem", value: progress.coins, action: "shop" },
                ] as const
              ).map((item) => (
                <button
                  key={item.icon}
                  className="park-resource"
                  onClick={() => open(item.action)}
                  aria-label={`${item.icon === "star" ? "星星" : "钻石"} ${item.value}`}
                >
                  <Icon name={item.icon} />
                  <b>{item.value.toLocaleString()}</b>
                  <span className="park-plus">+</span>
                </button>
              ))}
            </header>
            <div className="park-home-title">
              <Art name="logo" alt="能量管道乐园" />
              <div className="park-chapter-ribbon">
                第 {chapterIndex(p.level.id) + 1} 章 ·{" "}
                {CHAPTERS[chapterIndex(p.level.id)]}
              </div>
            </div>
            <button
              className="park-round park-settings"
              onClick={() => open("settings")}
              aria-label="乐园设置"
            >
              <Art name="settings-button" />
            </button>
            <div className="park-side-actions">
              {(
                [
                  { icon: "mail", label: "乐园来信", modal: "mail" },
                  { icon: "castle", label: "乐园宇宙", modal: "world" },
                  { icon: "task", label: "每日任务", modal: "tasks" },
                  { icon: "map", label: "乐园图鉴", modal: "flora" },
                ] as const
              ).map((item) => (
                <button
                  className="park-round"
                  key={item.label}
                  onClick={() => open(item.modal)}
                  aria-label={item.label}
                >
                  <Icon name={item.icon} />
                  {item.modal === "tasks" &&
                    progress.completedDate === today &&
                    progress.claimedDate !== today && (
                      <span className="park-badge">!</span>
                    )}
                </button>
              ))}
            </div>
            <Art name="island" className="park-island" alt="浮空城堡与摩天轮" />
            {visibleHomeExhibit && (
              <div
                className="park-home-exhibit"
                aria-label={`陈列${visibleHomeExhibit.name}`}
              >
                <Art name={getExhibitArt(visibleHomeExhibit)} />
                <span>{visibleHomeExhibit.name}</span>
              </div>
            )}
            <div className="park-home-friends">
              <Art
                name={starlightOutfit ? "outfit-sheep-starlight" : "sheep"}
                className="park-friend-sheep"
              />
              <Art
                name={starlightOutfit ? "outfit-rabbit-starlight" : "rabbit"}
                className="park-friend-rabbit"
              />
              <Art
                name={starlightOutfit ? "outfit-spirit-starlight" : "spirit"}
                className="park-friend-spirit"
              />
              {progress.equippedCosmetics.mood === "joy" && (
                <div className="park-home-moods" aria-label="伙伴开心问候">
                  <Art name="mood-sheep-happy" />
                  <Art name="mood-rabbit-happy" />
                  <Art name="mood-spirit-happy" />
                </div>
              )}
            </div>
            <section
              className="park-home-progress"
              aria-label={`已修复 ${completed} / 99 处设施`}
            >
              <Icon name="star" />
              <div className="park-progress-track">
                <div style={{ width: `${(completed / 99) * 100}%` }} />
                <b>{completed}/99</b>
              </div>
              <button onClick={() => open("tasks")} aria-label="查看进度奖励">
                <Icon name="gift" />
              </button>
            </section>
            <div className="park-facility-cards">
              <button
                className="park-arrow"
                aria-label="上一关"
                disabled={p.level.id === 1}
                onClick={() => select(p.level.id - 1)}
              >
                ‹
              </button>
              {(() => {
                const first = Math.min(Math.max(p.level.id - 1, 1), 97);
                return [first, first + 1, first + 2];
              })().map((id, index) => {
                const card = p.levels.find((level) => level.id === id)!;
                const content = getLevelContent(id);
                const entry = getCollectionEntry(id);
                return (
                  <button
                    key={index}
                    className={`park-facility ${id === p.level.id ? "is-selected" : ""} ${p.clearedLevels.includes(id) ? "is-restored" : "is-unrestored"}`}
                    onClick={() => select(id)}
                    aria-label={`修复第${id}处设施`}
                  >
                    <Art name={entry ? getExhibitArt(entry) : "carousel"} />
                    <span className="park-preview-level">
                      {content?.title ?? `第 ${id} 关`}
                    </span>
                    <Stars
                      value={starsOf(card)}
                    />
                  </button>
                );
              })}
              <button
                className="park-arrow"
                aria-label="下一关预览"
                disabled={p.level.id === 99}
                onClick={() => select(p.level.id + 1)}
              >
                ›
              </button>
            </div>
            <ParkButton className="park-continue" onClick={p.onStartLevel}>
              <Icon name="play" />
              {completed === 0 ? "开始修复" : "继续修复"}
            </ParkButton>
            {p.onStartLab &&
              activeModal === "none" &&
              (() => {
                const entries = LAB_LEVELS.map((lab, index) => ({ lab, index }));
                const isNew = (code: string) =>
                  code.startsWith("G") ||
                  code.startsWith("T") ||
                  code.startsWith("W") ||
                  code.startsWith("K") ||
                  code === "C2";
                const ordered = [
                  ...entries.filter(({ lab }) => isNew(lab.code)),
                  ...entries.filter(({ lab }) => !isNew(lab.code)),
                ];
                return (
                  <div className="park-lab-entries" aria-label="实验场">
                    <div className="park-lab-head">实验场 · 试玩机制</div>
                    {ordered.map(({ lab, index }) => {
                      const isGear = lab.code.startsWith("G");
                      const isTorus = lab.code.startsWith("T");
                      const isWeld = lab.code.startsWith("W");
                      const isCombo =
                        lab.code.startsWith("K") ||
                        lab.code === "W-1" ||
                        lab.code === "C2";
                      return (
                        <button
                          key={lab.id}
                          className={`park-lab-entry ${isGear ? "is-gear" : ""} ${isTorus ? "is-torus" : ""} ${isWeld ? "is-weld" : ""} ${isCombo ? "is-combo" : ""}`}
                          type="button"
                          onClick={() => p.onStartLab?.(index)}
                          aria-label={`实验关 ${lab.code} ${lab.title}`}
                        >
                          {isCombo
                            ? "组合 "
                            : isGear
                              ? "齿轮 "
                              : isTorus
                                ? "环面 "
                                : isWeld
                                  ? "焊死 "
                                  : "实验关 "}
                          {lab.code}
                          <i>{lab.subtitle ?? lab.title}</i>
                          {(isGear || isTorus || isWeld || isCombo) && <b className="park-lab-new">新</b>}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            <nav className="park-nav" aria-label="乐园导航">
              {navigation.map((item, i) => (
                <button
                  key={item.text}
                  className={i === 0 ? "is-active" : ""}
                  onClick={item.action}
                >
                  <Icon name={item.icon} />
                  <span>{item.text}</span>
                </button>
              ))}
            </nav>
          </main>
        )}

        {p.screen === "play" && (
          <main className="park-play" aria-label={`第${p.level.id}关修复`}>
            <header className="park-play-header">
              <button
                className="park-round"
                onClick={p.onBackHome}
                aria-label="返回乐园"
              >
                <Icon name="back" />
              </button>
              <h1 className="park-level-sign">
                {p.level.tier === "hell" && <em className="park-hell-badge">地狱</em>}
                {p.gameMode === "endless"
                  ? "无尽挑战"
                  : p.gameMode === "lab"
                    ? "实验关"
                    : p.gameMode === "editor"
                      ? "工坊试玩"
                      : `第 ${p.level.id} 关`}
              </h1>
              <div className="park-play-tools">
                <button
                  className="park-round"
                  onClick={() => open("bag")}
                  aria-label="背包"
                >
                  <Icon name="bag" />
                </button>
                <button
                  className="park-round"
                  onClick={() => open("flora")}
                  aria-label="乐园图鉴"
                >
                  <Icon name="map" />
                </button>
                <button
                  className="park-round"
                  onClick={() => open("rules")}
                  aria-label="查看玩法说明"
                >
                  ?
                </button>
              </div>
            </header>
            <section className="park-guide">
              <Art name="sheep" className="park-guide-sheep" />
              <div className="park-guide-card">
                <strong>{levelContent?.title ?? "接通能量管道"}</strong>
                <strong>修复{collection?.name ?? "设施"}！</strong>
              </div>
              <Art name="spirit" className="park-guide-spirit" />
            </section>
            <section className="park-play-status" aria-label="关卡状态">
              {/* 最少步数＝四星线，取代原先常驻四颗星的实时预览 */}
              <span
                className={`park-par ${onParPace ? "" : "is-over"}`}
                data-testid="par-steps"
                title={`本关最少 ${parSteps} 步四星 · ${starThresholds.three} 步三星 · ${starThresholds.two} 步二星`}
                aria-label={
                  onParPace
                    ? `本关最少 ${parSteps} 步`
                    : `已超最少步数，当前 ${currentStars} 星`
                }
              >
                <Icon name="star" className={onParPace ? "" : "unearned"} />
                {onParPace ? (
                  <>
                    最少 <b>{parSteps}</b> 步
                  </>
                ) : (
                  <>
                    当前 <b>{currentStars}</b> 星
                  </>
                )}
              </span>
              <span className="park-steps">
                <Icon name="paw" />
                步数 <b data-testid="remaining-steps">{p.remainingSteps}</b>
              </span>
              <span className="park-target">
                <Icon name="crown" />
                目标{" "}
                <b data-testid="target-count">
                  {p.simulation.litCount}/{p.level.goal ?? p.simulation.totalBulbs}
                </b>
              </span>
            </section>
            <div className="park-board-space">
              <GameBoard
                tiles={p.tiles}
                gridRows={p.level.gridRows}
                gridCols={p.level.gridCols}
                simulation={p.simulation}
                isPeekActive={p.isPeekActive}
                onTileClick={(tile, action) => {
                  setHintMove(null);
                  setHintMoves([]);
                  p.onTileClick(tile, action);
                }}
                hintTileId={hintMove?.tileId ?? hintMoves[0]?.tileId ?? null}
                levelId={p.level.id}
                wrap={Boolean(p.level.rules?.wrap)}
                weld={Boolean(p.level.rules?.weld)}
              />
              {p.remainingSteps === 0 && !p.simulation.isAllLit && (
                <div className="park-out-of-steps">
                  <h2>修复步数用完啦</h2>
                  <p>
                    还差 {(p.level.goal ?? p.simulation.totalBulbs) - p.simulation.litCount} 处设施。
                    {canUndo
                      ? `还能回溯 ${p.rewinds} 次，回去改一步试试。`
                      : progress.rewindTokens > 0
                        ? "基础回溯次数已经用完，可使用时光回针补充。"
                        : "回溯次数已经用完，只能重来。"}
                  </p>
                  {canUndo && (
                    <ParkButton onClick={p.onUndo} purple>
                      撤销一步
                    </ParkButton>
                  )}
                  <ParkButton onClick={p.onRestart}>重新挑战</ParkButton>
                  {p.gameMode === "story" &&
                    p.level.goal === undefined &&
                    p.onAddSteps && (
                      <ParkButton
                        purple
                        disabled={progress.stepTokens < 1}
                        onClick={useStepSupply}
                      >
                        {progress.stepTokens > 0
                          ? `使用应急线圈 · 余 ${progress.stepTokens}`
                          : "应急线圈不足"}
                      </ParkButton>
                    )}
                </div>
              )}
            </div>
            <div className="park-play-caption">
              {p.simulation.overloaded
                ? "回路过载！能量在环里打转，整段熄灭 —— 通路不能连成圈"
                : p.level.rules?.wrap && p.level.rules?.weld
                  ? "环面 + 焊死：远端起手，跨缝接通即锁"
                  : p.level.rules?.colors && p.level.rules?.weld
                    ? "双色 + 焊死：分色接通，通电即锁"
                : p.level.rules?.weld
                  ? "焊死：先修远端，通电后立即锁定"
                  : p.level.rules?.wrap
                  ? "环面：边界相接——从右边出去，会从左边回来"
                  : hasGear
                  ? "同色齿轮是一组：点一下，一顺一反"
                  : p.level.goal !== undefined
                ? `本关要保住 ${p.level.goal} 处设施，步数刚好够——多一步就不行`
                : p.simulation.isAllLit
                  ? "能量已接通，设施正在苏醒！"
                                    : p.level.rules?.colors
                    ? "双色能量：红源只喂红灯，蓝源只喂蓝灯；同一根管子里串色，两边都会灭"
                    : p.level.rules?.noCycle
                      ? "禁环：通路不能连成圈，接成环整段过载"
                      : hasSwitch
                    ? "点击旋转 · 轻点角标切换通/断"
                    : hasDiode
                      ? "点击旋转 · 能量沿箭头方向流动"
                      : "点击旋转管道，让能量流向设施"}
            </div>
            <div className="park-play-actions">
              <ParkButton
                purple
                onClick={p.onUndo}
                disabled={!canUndo}
                label="撤销"
              >
                <Icon name="undo" />
                <span>撤销</span>
              </ParkButton>
              <ParkButton
                onClick={() => useAdviceSupply("hint")}
                disabled={
                  p.gameMode !== "story" ||
                  !supportsHintEngine(p.level) ||
                  p.remainingSteps <= 0 ||
                  progress.hints < 1
                }
                label="提示"
              >
                <Icon name="hint" />
                <span>提示</span>
                <b className="park-badge">{progress.hints}</b>
              </ParkButton>
              <ParkButton purple onClick={restartWithConfirm} label="重置">
                <Icon name="reset" />
                <span>重置</span>
              </ParkButton>
            </div>
            <button
              className="park-history-link"
              onClick={() => open("history")}
            >
              操作足迹 · {p.stepsUsed} 步 · 回溯 {p.rewinds} 次
            </button>
            <span className="park-build-tag">{BUILD_TAG}</span>
          </main>
        )}

        {p.screen === "victory" && (
          <main className="park-victory" aria-label="设施修复结算">
            <h1 className="park-victory-title" aria-label="设施复苏！">
              <span className="sr-only">设施复苏！</span>
            </h1>
            <div className="park-victory-showcase">
              <div className="park-sunrays" />
              <div className="park-sparkles-layer" />
              <Art
                name={collection ? getExhibitArt(collection) : "carousel"}
                className="park-victory-carousel"
              />
              <div className="park-victory-friends">
                <Art name="sheep-cheer" />
                <Art name="spirit-cheer" />
                <Art name="rabbit-cheer" />
              </div>
            </div>
            <section className="park-victory-panel">
              <h2
                className="park-red-sign"
                aria-label={`${collection?.name ?? "旋转木马"} · 成功修复`}
              >
                <span>{collection?.name ?? "旋转木马"} · 成功修复</span>
              </h2>
              <div className="park-repair-detail">
                <ul className="park-repair-checklist">
                  <li>
                    <img src="/assets/park/icon-check.webp" className="park-check-icon" alt="" />
                    <span>连接能量管道</span>
                  </li>
                  <li>
                    <img src="/assets/park/icon-check.webp" className="park-check-icon" alt="" />
                    <span>为{collection?.name ?? "旋转木马"}供能</span>
                  </li>
                  <li>
                    <img src="/assets/park/icon-check.webp" className="park-check-icon" alt="" />
                    <span>设施重新运转</span>
                  </li>
                </ul>
                <div className="park-before-after">
                  <div className="park-compare-stage is-dormant">
                    <Art
                      name={collection ? getExhibitArt(collection) : "carousel"}
                      className="sleeping"
                    />
                  </div>
                  <img
                    src="/assets/park/arrow-transition.webp"
                    className="park-compare-arrow"
                    alt="➜"
                  />
                  <div className="park-compare-stage is-active">
                    <Art
                      name={collection ? getExhibitArt(collection) : "carousel"}
                    />
                  </div>
                </div>
              </div>
              <h3 className="park-reward-title">通关奖励</h3>
              <div className="park-rewards">
                <div className="park-reward-slot">
                  <Icon name="star" className="park-reward-icon" />
                  <b>+{reward.stars}</b>
                </div>
                <div className="park-reward-slot">
                  <Icon name="coin" className="park-reward-icon" />
                  <b>+{reward.coins}</b>
                </div>
                <div className="park-reward-slot">
                  <Icon name="gem" className="park-reward-icon" />
                  <b>+{reward.gems ?? 0}</b>
                </div>
              </div>
              <div className="park-result-score">
                <Stars value={currentStars} />
                <span>
                  已用 {p.stepsUsed} 步
                  {p.gameMode === "story"
                    ? ` · 最佳 ${p.bestSteps[p.level.id] ?? p.stepsUsed} 步`
                    : ""}
                </span>
              </div>
            </section>
            <div className="park-victory-actions">
              <ParkButton purple onClick={p.onBackHome} className="park-action-back">
                <Icon name="home" />
                返回乐园
              </ParkButton>
              <ParkButton
                onClick={lastLevel ? p.onOpenLevels : p.onNextLevel}
                className="park-action-next"
              >
                {lastLevel
                  ? "全部关卡"
                  : p.gameMode === "editor"
                    ? "再次试玩"
                    : "下一关"}
                <Icon name="play" />
              </ParkButton>
            </div>
            <button className="park-history-link park-replay-link" onClick={p.onRestart}>
              {currentStars >= MAX_STARS
                ? "再玩一次，刷新自己的步数纪录"
                : "再玩一次，挑战更高星级"}
            </button>
          </main>
        )}
      </>
    )}

        {activeModal !== "none" && (
          <div
            className={`park-modal-backdrop ${activeModal === "levels" || activeModal === "flora" || activeModal === "profile" || activeModal === "editor" || activeModal === "world" ? "is-large" : ""}`}
          >
            <section
              className={`park-modal park-modal-${activeModal}`}
              role="dialog"
              aria-modal="true"
              aria-label={TITLES[activeModal]}
            >
              <header>
                <h2>{TITLES[activeModal]}</h2>
                <button
                  className="park-close"
                  onClick={close}
                  aria-label="关闭"
                >
                  ×
                </button>
              </header>
              <div className="park-modal-body">
                {activeModal === "levels" && (
                  <>
                    <div className="park-chapter-tabs">
                      {CHAPTERS.map((name, i) => (
                        <button
                          className={`${chapter === i ? "selected" : ""} ${chapterLocked(i) ? "is-locked" : ""}`}
                          key={name}
                          onClick={() => setChapter(i)}
                        >
                          {i + 1}章{chapterLocked(i) ? " 🔒" : ""}
                        </button>
                      ))}
                    </div>
                    <button
                      className={`park-unlock-toggle ${unlockAll ? "is-on" : ""}`}
                      type="button"
                      onClick={toggleUnlockAll}
                    >
                      {unlockAll ? "已全解锁 · 点击恢复锁定" : "章节锁定中 · 点击临时全解锁"}
                    </button>
                    <h3 className="park-section-heading">
                      {CHAPTERS[chapter]}
                      <span>{districtCleared}/{districtTotal} 处设施</span>
                    </h3>
                    {chapterLocked(chapter) ? (
                      <div className="park-locked-hint">
                        <strong>第 {chapter + 1} 章尚未解锁</strong>
                        <p>通关第 {chapter} 章的关底（第 {chapter * 20} 关）即可开启这片区域。</p>
                      </div>
                    ) : (
                    <div className="park-level-grid">
                      {p.levels
                        .filter((level) => chapterIndex(level.id) === chapter)
                        .map((level) => (
                          <button
                            key={level.id}
                            className={`park-level-card ${p.level.id === level.id ? "current" : ""} ${p.clearedLevels.includes(level.id) ? "cleared" : ""}`}
                            onClick={() => select(level.id)}
                            aria-label={`修复第${level.id}处设施`}
                            title={p.bestSteps[level.id] == null ? "尚未修复" : `最佳 ${p.bestSteps[level.id]} 步`}
                          >
                            <b>{level.id}</b>
                            {level.tier === "hell" && <em className="park-hell-badge">地狱</em>}
                            <Stars
                              value={starsOf(level)}
                            />
                            <small>{getLevelContent(level.id)?.title.split("·")[0] ?? "尚未修复"}</small>
                          </button>
                        ))}
                    </div>
                    )}
                    <div className="park-mode-links">
                      <ParkButton
                        purple
                        onClick={() => {
                          close();
                          open("endless");
                        }}
                      >
                        无尽挑战
                      </ParkButton>
                      <ParkButton
                        purple
                        onClick={() => {
                          close();
                          open("editor");
                        }}
                      >
                        关卡工坊
                      </ParkButton>
                    </div>
                    <button
                      className="park-text-link"
                      onClick={() => {
                        p.onCloseLevels();
                        open("world");
                      }}
                    >
                      世界地图
                    </button>
                    <button
                      className="park-text-link"
                      onClick={() => {
                        p.onCloseLevels();
                        open("flora");
                      }}
                    >
                      查看乐园图鉴
                    </button>
                  </>
                )}
                {activeModal === "tasks" && (
                  <>
                    <Art name="rabbit" className="park-modal-mascot" />
                    <div className="park-item-card">
                      <Icon name="task" />
                      <div>
                        <h3>每日修复计划</h3>
                        <p>今日修复任意一处设施</p>
                        <strong>
                          {progress.completedDate === today ? "1" : "0"}/1
                        </strong>
                      </div>
                      <span className="park-item-price">
                        <Icon name="gem" />
                        100
                      </span>
                    </div>
                    <ParkButton
                      disabled={
                        progress.completedDate !== today ||
                        progress.claimedDate === today
                      }
                      onClick={() => {
                        save(claimDailyTask(progress, today));
                        flash("已领取 100 钻石");
                      }}
                    >
                      {progress.claimedDate === today
                        ? "今日已领取"
                        : progress.completedDate === today
                          ? "领取奖励"
                          : "完成修复后领取"}
                    </ParkButton>
                  </>
                )}
                {activeModal === "bag" && (
                  <>
                    <div className="park-shop-list">
                      {SUPPLY_ITEMS.map((item) => {
                        const stock = progress[item.stockKey];
                        const adviceId =
                          item.id === "hint" || item.id === "lens"
                            ? item.id
                            : null;
                        return (
                          <article className="park-shop-card" key={item.id}>
                            <Art
                              name={item.iconArt}
                              className="park-shop-card-art"
                              alt={item.name}
                            />
                            <div className="park-shop-card-copy">
                              <h3>{item.name}</h3>
                              <p>{item.description}</p>
                              <span>已拥有 {stock} 个</span>
                            </div>
                            <div className="park-shop-card-action">
                              {adviceId ? (
                                <ParkButton
                                  className="park-shop-buy"
                                  disabled={
                                    p.screen !== "play" ||
                                    p.gameMode !== "story" ||
                                    !supportsHintEngine(p.level) ||
                                    p.remainingSteps <= 0 ||
                                    stock < 1
                                  }
                                  label={`使用${item.name}`}
                                  onClick={() => useAdviceSupply(adviceId)}
                                >
                                  使用
                                </ParkButton>
                              ) : item.id === "rewind" ? (
                                <ParkButton
                                  className="park-shop-buy"
                                  disabled={
                                    p.screen !== "play" ||
                                    stock < 1 ||
                                    !p.onAddRewind
                                  }
                                  label="使用时光回针"
                                  onClick={useRewindSupply}
                                >
                                  使用回针
                                </ParkButton>
                              ) : (
                                <span className="park-shop-price">
                                  步数耗尽遮罩中使用
                                </span>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                    <p className="park-fine-print">
                      提示灯泡与火花透镜每次使用消耗 1 个，时光回针会增加本局回溯次数。
                    </p>
                    <ParkButton purple onClick={() => open("shop")}>
                      前往商店
                    </ParkButton>
                  </>
                )}
                {activeModal === "shop" && (
                  <ShopModal
                    progress={progress}
                    clearedCount={p.clearedLevels.length}
                    clearedLevels={p.clearedLevels}
                    onBuySupply={(id) => {
                      const next = buySupply(progress, id);
                      if (next !== progress) {
                        save(next);
                        flash("补给已放入背包");
                      }
                    }}
                    onBuyCosmetic={(id) => {
                      const next = buyCosmetic(
                        progress,
                        id,
                        p.clearedLevels.length,
                      );
                      if (next !== progress) {
                        save(next);
                        flash("装扮已加入收藏");
                      }
                    }}
                    onEquipCosmetic={(id, active) => {
                      const next = equipCosmetic(progress, id, active);
                      if (next !== progress) {
                        save(next);
                        flash(active ? "装扮已启用" : "已恢复默认装扮");
                      }
                    }}
                    onSelectExhibit={(id) => {
                      const next = setHomeExhibit(progress, id);
                      if (next !== progress) {
                        save(next);
                        flash(id === null ? "已收起首页展品" : "首页展品已更新");
                      }
                    }}
                  />
                )}
                {activeModal === "hint" && (
                  <>
                    <Art name="spirit" className="park-modal-mascot" />
                    <h3>
                      {p.gameMode === "story"
                        ? `第 ${p.level.id} 关 · ${levelContent?.title ?? "通路提示"}`
                        : p.gameMode === "endless"
                          ? "无尽挑战 · 通路提示"
                          : "工坊试玩 · 通路提示"}
                    </h3>
                    {hintMoves.length > 0 ? (
                      <div className="park-hint-moves" role="list">
                        {hintMoves.map((move, index) => (
                          <div
                            className="park-hint-move"
                            role="listitem"
                            key={`${move.tileId}-${index}`}
                          >
                            <b>{index + 1}</b>
                            <span>{describeHint(move)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="park-hint-copy">
                        {p.gameMode === "story"
                          ? levelContent?.hint ?? "先接主干，再补支路。"
                          : p.level.hintText ??
                            "先接通主干，再把能量分到每一处设施。"}
                      </p>
                    )}
                    <ParkButton onClick={close}>继续挑战</ParkButton>
                  </>
                )}
                {activeModal === "rules" && (
                  <>
                    <p className="park-lead">
                      转动管道，连接星光能量源与所有设施。
                    </p>
                    <div className="park-rule-list">
                      {[
                        {
                          art: "pipe-line-off",
                          title: "旋转管道",
                          text: "每次点击顺时针旋转 90°，消耗 1 步。相邻接头对齐后，能量就能继续流动。",
                        },
                        {
                          art: "pipe-switch-on",
                          title: "能量闸",
                          text: "点击管身旋转；点击角标切换通/断，每次操作消耗 1 步。",
                        },
                        {
                          art: "pipe-diode",
                          title: "单向阀",
                          text: "能量沿箭头流动，反向进入会被阻挡。",
                        },
                        {
                          art: "pipe-cross-off",
                          title: "十字管",
                          text: "四个方向均可连接；它四向对称，旋转不会改变接法，也不会消耗步数。",
                        },
                        {
                          art: "pipe-line-off",
                          title: "固定管道",
                          text: "带锁标记的管道不能旋转，只能按它现在的方向规划。",
                        },
                        {
                          art: "icon-star",
                          title: "取舍关",
                          text: "章底关卡。保住目标数量的设施即算通过；预算刚好等于最优解，一步都不能浪费——通过就是四星。",
                        },
                      ].map((rule) => (
                        <div key={rule.title}>
                          <Art name={rule.art} />
                          <section>
                            <h3>{rule.title}</h3>
                            <p>{rule.text}</p>
                          </section>
                        </div>
                      ))}
                    </div>
                    <p>
                      本关 {getParSteps(p.level)} 步以内获得四星，{starThresholds.three} 步以内三星，
                      {starThresholds.two} 步以内二星，通关至少一星。每次挑战初始可回溯 3
                      次，可使用时光回针增加本局次数。
                    </p>
                    <ParkButton onClick={close}>开始修复</ParkButton>
                  </>
                )}
                {activeModal === "onboarding" && (
                  <OnboardingGuide isOpen levelTitle={levelContent?.title ?? p.level.title ?? ''} maxSteps={p.level.maxSteps}
                    parSteps={p.level.parSteps} onClose={close} onOpenRules={() => { close(); open("rules"); }} />
                )}
                {activeModal === "settings" && (
                  <>
                    <Art name="sheep" className="park-modal-mascot" />
                    <div className="park-setting-row">
                      <span>游戏音效</span>
                      <button
                        className={`park-toggle ${!muted ? "on" : ""}`}
                        aria-label="游戏音效"
                        aria-pressed={!muted}
                        onClick={() => setMuted(sound.toggleMute())}
                      >
                        {muted ? "已关闭" : "已开启"}
                      </button>
                    </div>
                    <div className="park-setting-row">
                      <span>触感反馈</span>
                      <button
                        className={`park-toggle ${vibration ? "on" : ""}`}
                        aria-label="触感反馈"
                        aria-pressed={vibration}
                        onClick={() => setVibration(haptics.toggle())}
                      >
                        {vibration ? "已开启" : "已关闭"}
                      </button>
                    </div>
                    <ParkButton purple onClick={() => open("rules")}>
                      乐园指南
                    </ParkButton>
                    <ParkButton purple onClick={() => open("story")}>
                      乐园的故事
                    </ParkButton>
                    <p className="park-fine-print">
                      重塑补偿：旧版已修复设施按每处 50 钻石一次性发放，上限
                      4950。
                    </p>
                    <button
                      className="park-text-link"
                      onClick={() => {
                        const ok = window.confirm(
                          "重置会清空已修复的关卡、钻石、提示灯泡与成就记录，确定吗？",
                        );
                        if (!ok) return;
                        try {
                          resetParkProgress(window.localStorage);
                        } catch {
                          // 存储被禁用时仍然刷新一次，至少退出异常状态
                        }
                        window.location.reload();
                      }}
                    >
                      重置本地存档
                    </button>
                  </>
                )}
                {activeModal === "profile" && (
                  <HonorProfile
                    completed={completed}
                    totalStars={totalStars}
                    totalUndos={playerStats.totalUndos}
                    achievements={achievements}
                    unlockedAchievements={unlocked}
                    equippedTitle={equippedHonorTitle}
                    onEquipTitle={(titleId) => {
                      const next = equipHonorTitle(
                        progress,
                        titleId,
                        unlocked,
                      );
                      if (next !== progress) save(next);
                    }}
                  />
                )}
                {activeModal === "flora" && (
                  <>
                    {exhibit ? (
                      <div className="park-flower-detail">
                        <ParkExhibit
                          entry={exhibit}
                          unlocked={p.clearedLevels.includes(exhibitId!)}
                          large
                        />
                        <h3>{exhibit.name}</h3>
                        <p>{exhibit.alias}</p>
                        <p>
                          {p.clearedLevels.includes(exhibitId!)
                            ? exhibit.lore
                            : `完成第 ${exhibitId} 关，修复这件藏品`}
                        </p>
                        <ParkButton onClick={() => select(exhibitId!)}>
                          前往第 {exhibitId} 关
                        </ParkButton>
                        <button
                          className="park-text-link"
                          onClick={() => setExhibitId(null)}
                        >
                          返回图鉴
                        </button>
                      </div>
                    ) : (
                      <>
                        <p>修复乐园，收集 99 件乐园藏品。已收集 {completed}/99</p>
                        <div className="park-flower-grid">
                          {p.levels
                            .slice(
                              collectionPage * 20,
                              collectionPage * 20 + 20,
                            )
                            .map((level) => {
                              const entry = getCollectionEntry(level.id);
                              if (!entry) return null;
                              return (
                                <button
                                  key={level.id}
                                  onClick={() => setExhibitId(level.id)}
                                >
                                  <ParkExhibit
                                    entry={entry}
                                    unlocked={p.clearedLevels.includes(
                                      level.id,
                                    )}
                                  />
                                  <b>{entry.name}</b>
                                  <small>第 {level.id} 关</small>
                                </button>
                              );
                            })}
                        </div>
                        <div className="park-pagination">
                          <button
                            disabled={collectionPage === 0}
                            onClick={() =>
                              setCollectionPage(collectionPage - 1)
                            }
                          >
                            上一页
                          </button>
                          <span>{collectionPage + 1}/5</span>
                          <button
                            disabled={collectionPage === 4}
                            onClick={() =>
                              setCollectionPage(collectionPage + 1)
                            }
                          >
                            下一页
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
                {activeModal === "mail" && (
                  <>
                    <Art name="rabbit" className="park-modal-mascot" />
                    <h3>欢迎来到能量管道乐园</h3>
                    <p className="park-hint-copy">{WORLD.mail}</p>
                    <ParkButton onClick={() => open("story")}>
                      阅读乐园故事
                    </ParkButton>
                  </>
                )}
                {activeModal === "story" && (
                  <>
                    <Art name="island" className="park-story-island" />
                    {WORLD.intro.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                    <ParkButton
                      onClick={() => {
                        close();
                        p.onStartLevel();
                      }}
                    >
                      一起出发
                    </ParkButton>
                  </>
                )}
                {activeModal === "history" && (
                  <>
                    <p>点击足迹可回到对应操作，继续规划。</p>
                    <div className="park-history-list">
                      {p.history.map((snapshot, index) => (
                        <button
                          className={index === p.historyIndex ? "selected" : ""}
                          key={snapshot.id}
                          disabled={index !== p.historyIndex && p.rewinds === 0}
                          onClick={() => {
                            p.onJumpToStep(index);
                            close();
                          }}
                        >
                          <strong>
                            {snapshot.stepNumber === 0
                              ? "起点"
                              : `第 ${snapshot.stepNumber} 步`}
                          </strong>
                          <span>
                            {snapshot.description}
                          </span>
                          <small>
                            {snapshot.litCount}/{snapshot.totalBulbs} 设施 ·
                            剩余 {snapshot.remainingSteps} 步
                          </small>
                        </button>
                      ))}
                    </div>
                    <ParkButton
                      purple
                      disabled={
                        p.screen !== "play" ||
                        progress.rewindTokens < 1 ||
                        !p.onAddRewind
                      }
                      onClick={useRewindSupply}
                    >
                      使用时光回针 · 余 {progress.rewindTokens}
                    </ParkButton>
                    <ParkButton
                      disabled={p.historyIndex >= p.history.length - 1}
                      onClick={() => {
                        p.onRedo();
                        close();
                      }}
                    >
                      重做一步
                    </ParkButton>
                  </>
                )}
                {activeModal === "endless" && (
                  <>
                    <Art name="spirit" className="park-modal-mascot" />
                    <p>每次出发，都会遇见新的能量谜题。</p>
                    {[
                      { name: "轻松漫游", goals: 2 },
                      { name: "星光探险", goals: 3 },
                      { name: "修复大师", goals: 4 },
                    ].map((mode) => (
                      <ParkButton
                        key={mode.goals}
                        purple
                        onClick={() => {
                          close();
                          p.onStartEndless(mode.goals);
                        }}
                      >
                        {mode.name} · {mode.goals} 处设施
                      </ParkButton>
                    ))}
                  </>
                )}
                {activeModal === "world" && (
                  <WorldMapModal
                    cleared={p.clearedLevels}
                    onEnterCenter={() => {
                      close();
                      p.onOpenLevels();
                    }}
                  />
                )}
                {activeModal === "editor" && (
                  <div>
                    <LevelEditor
                      onPlayCustomLevel={(config) => {
                        close();
                        p.onPlayCustom(config);
                      }}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
        {notice && (
          <div className="park-notice" role="status">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
