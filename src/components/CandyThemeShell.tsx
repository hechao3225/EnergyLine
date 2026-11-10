import React, { useEffect, useRef, useState } from "react";
import type {
  LevelConfig,
  SimulationResult,
  Tile,
  HistorySnapshot,
} from "../types/game";
import { Art, Icon, IconName, ParkButton, Stars, ParkFlower } from "./ParkArt";
import { GameBoard } from "./GameBoard";
import { LevelEditor } from "./LevelEditor";
import { getFlowerForLevel } from "../data/flowers";
import {
  ALL_ACHIEVEMENTS,
  loadUnlockedAchievements,
  loadPlayerStats,
} from "../utils/achievements";
import { sound } from "../utils/audio";
import { haptics } from "../utils/haptics";
import {
  buyHint,
  claimDailyTask,
  CHAPTERS,
  chapterIndex,
  consumeHint,
  getBestStars,
  getStars,
  localDate,
  PARK_STORAGE_KEY,
  ParkProgress,
  readParkProgress,
} from "../utils/parkProgress";

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
  | "history"
  | "editor"
  | "endless";
interface Props {
  screen: "home" | "play" | "victory";
  level: LevelConfig;
  levels: LevelConfig[];
  tiles: Tile[];
  simulation: SimulationResult;
  remainingSteps: number;
  clearedLevels: number[];
  bestSteps: Record<number, number>;
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
  gameMode: "story" | "endless" | "editor";
  victoryReward: { stars: number; coins: number; gems: number };
}
const TITLES: Record<Exclude<Modal, "none">, string> = {
  levels: "星光关卡",
  tasks: "每日任务",
  bag: "我的背包",
  shop: "星光商店",
  hint: "能量提示",
  rules: "乐园指南",
  settings: "乐园设置",
  profile: "冒险手册",
  flora: "百花图鉴",
  mail: "乐园来信",
  story: "乐园的故事",
  history: "操作足迹",
  editor: "关卡工坊",
  endless: "无尽挑战",
};

export function CandyThemeShell(p: Props) {
  const [modal, setModal] = useState<Modal>("none");
  const [progress, setProgress] = useState(
    readParkProgress.bind(null, localStorage),
  );
  const [notice, setNotice] = useState("");
  const [muted, setMuted] = useState(sound.isMuted());
  const [vibration, setVibration] = useState(haptics.isEnabled());
  const [chapter, setChapter] = useState(chapterIndex(p.level.id));
  const [collectionPage, setCollectionPage] = useState(0);
  const [flowerId, setFlowerId] = useState<number | null>(null);
  const reward = p.victoryReward;
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalStars = p.levels.reduce(
    (sum, level) => sum + getBestStars(level, p.clearedLevels, p.bestSteps),
    0,
  );
  const currentStars = getStars(p.remainingSteps, p.level.maxSteps);
  const today = localDate();
  const activeModal = p.levelSelectOpen ? "levels" : modal;
  const close = () => {
    p.onCloseLevels();
    setModal("none");
    setFlowerId(null);
  };
  const open = (name: Modal) => {
    if (name === "settings") {
      setMuted(sound.isMuted());
      setVibration(haptics.isEnabled());
    }
    setModal(name);
    setFlowerId(null);
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
    if (p.levelSelectOpen) setChapter(chapterIndex(p.level.id));
  }, [p.levelSelectOpen]);
  const useHint = () => {
    if (p.screen !== "play") {
      flash("进入关卡后可使用提示");
      return;
    }
    if (progress.hints < 1) {
      open("shop");
      flash("提示灯泡已用完");
      return;
    }
    save(consumeHint(progress));
    open("hint");
  };
  const select = (id: number) => {
    close();
    p.onSelectLevel(id);
  };
  const unlocked = loadUnlockedAchievements();
  const completed = p.clearedLevels.length;
  const lastLevel = p.gameMode === "story" && p.level.id === 99;
  const hasSwitch = p.tiles.some((t) => t.type === "switch");
  const hasDiode = p.tiles.some((t) => t.type === "diode");
  const flower = flowerId == null ? null : getFlowerForLevel(flowerId);

  const navigation: { icon: IconName; text: string; action: () => void }[] = [
    { icon: "castle", text: "乐园", action: p.onBackHome },
    { icon: "map", text: "关卡", action: p.onOpenLevels },
    { icon: "star", text: "任务", action: () => open("tasks") },
    { icon: "bag", text: "背包", action: () => open("bag") },
    { icon: "shop", text: "商店", action: () => open("shop") },
  ];
  return (
    <div className="park-shell">
      <div className="park-stage">
        {p.screen === "home" && (
          <main className="park-home" aria-label="能量管道乐园首页">
            <header className="park-resource-bar">
              <button
                className="park-avatar"
                onClick={() => open("profile")}
                aria-label="冒险手册"
              >
                <Art name="sheep" />
              </button>
              {(
                [
                  { icon: "star", value: totalStars, action: "profile" },
                  { icon: "coin", value: progress.coins, action: "shop" },
                  { icon: "gem", value: progress.gems, action: "shop" },
                ] as const
              ).map((item) => (
                <button
                  key={item.icon}
                  className="park-resource"
                  onClick={() => open(item.action)}
                  aria-label={`${item.icon === "star" ? "星星" : item.icon === "coin" ? "金币" : "钻石"} ${item.value}`}
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
                  { icon: "gift", label: "每日礼物", modal: "tasks" },
                  { icon: "task", label: "每日任务", modal: "tasks" },
                  { icon: "map", label: "百花图鉴", modal: "flora" },
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
            <div className="park-home-friends">
              <Art name="sheep" className="park-friend-sheep" />
              <Art name="rabbit" className="park-friend-rabbit" />
              <Art name="spirit" className="park-friend-spirit" />
            </div>
            <section
              className="park-home-progress"
              aria-label={`已修复 ${completed} / 99`}
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
              {[
                p.level.id > 1 ? p.level.id - 1 : 2,
                p.level.id,
                p.level.id < 98
                  ? p.level.id + (p.level.id === 1 ? 2 : 1)
                  : p.level.id === 98
                    ? 99
                    : 97,
              ].map((id, index) => {
                const card = p.levels.find((level) => level.id === id)!;
                return (
                  <button
                    key={index}
                    className={`park-facility ${index === 1 ? "is-selected" : ""} ${p.clearedLevels.includes(id) ? "is-restored" : "is-unrestored"}`}
                    onClick={() => select(id)}
                    aria-label={`挑战第${id}关`}
                  >
                    <Art name="carousel" />
                    <span className="park-preview-level">第 {id} 关</span>
                    <Stars
                      value={getBestStars(card, p.clearedLevels, p.bestSteps)}
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
              {completed === 0 ? "开始挑战" : "继续挑战"}
            </ParkButton>
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
          <main className="park-play" aria-label={`第${p.level.id}关玩法`}>
            <header className="park-play-header">
              <button
                className="park-round"
                onClick={p.onBackHome}
                aria-label="返回乐园"
              >
                <Icon name="back" />
              </button>
              <h1 className="park-level-sign">
                {p.gameMode === "endless"
                  ? "无尽挑战"
                  : p.gameMode === "editor"
                    ? "工坊试玩"
                    : `第 ${p.level.id} 关`}
              </h1>
              <button
                className="park-round"
                onClick={() => open("rules")}
                aria-label="查看玩法说明"
              >
                ?
              </button>
            </header>
            <section className="park-guide">
              <Art name="sheep" className="park-guide-sheep" />
              <div className="park-guide-card">
                <strong>连接能量管道</strong>
                <strong>为旋转木马供能！</strong>
              </div>
              <Art name="spirit" className="park-guide-spirit" />
            </section>
            <section className="park-play-status" aria-label="关卡状态">
              <Stars value={currentStars} />
              <span className="park-steps">
                <Icon name="paw" />
                步数 <b data-testid="remaining-steps">{p.remainingSteps}</b>
              </span>
              <span className="park-target">
                <Icon name="crown" />
                目标{" "}
                <b data-testid="target-count">
                  {p.simulation.litCount}/{p.simulation.totalBulbs}
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
                onTileClick={p.onTileClick}
              />
              {p.remainingSteps === 0 && !p.simulation.isAllLit && (
                <div className="park-out-of-steps">
                  <h2>能量步数用完啦</h2>
                  <p>撤销上一步，或重新规划通路</p>
                  <ParkButton onClick={p.onUndo} purple>
                    撤销一步
                  </ParkButton>
                  <ParkButton onClick={p.onRestart}>重新挑战</ParkButton>
                </div>
              )}
            </div>
            <div className="park-play-caption">
              {p.simulation.isAllLit
                ? "能量已接通，设施正在苏醒！"
                : hasSwitch
                  ? "点击旋转 · 轻点闸门角标切换通断"
                  : hasDiode
                    ? "点击旋转 · 能量沿箭头方向流动"
                    : "点击旋转管道，让能量流向设施"}
            </div>
            <div className="park-play-actions">
              <ParkButton
                purple
                onClick={p.onUndo}
                disabled={p.historyIndex === 0}
                label="撤销"
              >
                <Icon name="undo" />
                <span>撤销</span>
              </ParkButton>
              <ParkButton onClick={useHint} label="提示">
                <Icon name="hint" />
                <span>提示</span>
                <b className="park-badge">{progress.hints}</b>
              </ParkButton>
              <ParkButton purple onClick={p.onRestart} label="重置">
                <Icon name="reset" />
                <span>重置</span>
              </ParkButton>
            </div>
            <button
              className="park-history-link"
              onClick={() => open("history")}
            >
              操作足迹 · {p.history[p.historyIndex]?.stepNumber ?? 0} 步
            </button>
          </main>
        )}

        {p.screen === "victory" && (
          <main className="park-victory" aria-label="设施复苏结算">
            <h1 className="park-victory-title">设施复苏！</h1>
            <div className="park-victory-showcase">
              <div className="park-sunrays" />
              <Art name="island" className="park-victory-island" />
              <Art name="carousel" className="park-victory-carousel" />
              <div className="park-victory-friends">
                <Art name="sheep-cheer" />
                <Art name="spirit-cheer" />
                <Art name="rabbit" />
              </div>
            </div>
            <section className="park-victory-panel">
              <h2 className="park-red-sign">旋转木马 · 成功修复</h2>
              <div className="park-repair-detail">
                <ul>
                  <li>连接能量管道</li>
                  <li>为旋转木马供能</li>
                  <li>设施重新运转</li>
                </ul>
                <div className="park-before-after">
                  <Art name="carousel" className="sleeping" />
                  <span>➜</span>
                  <Art name="carousel" />
                </div>
              </div>
              <h3 className="park-reward-title">
                {p.gameMode === "story" ? "通关奖励" : "挑战完成"}
              </h3>
              <div className="park-rewards">
                {(
                  [
                    { icon: "star", value: reward.stars },
                    { icon: "coin", value: reward.coins },
                    { icon: "gem", value: reward.gems },
                  ] as const
                ).map((item) => (
                  <div key={item.icon}>
                    <Icon name={item.icon} />
                    <b>+{item.value}</b>
                  </div>
                ))}
              </div>
              <div className="park-result-score">
                <Stars value={currentStars} />
                <span>
                  已用 {p.level.maxSteps - p.remainingSteps} 步
                  {p.gameMode === "story"
                    ? ` · 最佳 ${p.bestSteps[p.level.id] ?? 0} 步`
                    : ""}
                </span>
              </div>
            </section>
            <div className="park-victory-actions">
              <ParkButton purple onClick={p.onBackHome}>
                <Icon name="castle" />
                返回乐园
              </ParkButton>
              <ParkButton onClick={lastLevel ? p.onOpenLevels : p.onNextLevel}>
                {lastLevel
                  ? "全部关卡"
                  : p.gameMode === "editor"
                    ? "再次试玩"
                    : "下一关"}
                <Icon name="play" />
              </ParkButton>
            </div>
            <button className="park-history-link" onClick={p.onRestart}>
              再玩一次，挑战更高星级
            </button>
          </main>
        )}

        {activeModal !== "none" && (
          <div
            className={`park-modal-backdrop ${activeModal === "levels" || activeModal === "flora" || activeModal === "profile" || activeModal === "editor" ? "is-large" : ""}`}
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
                          className={chapter === i ? "selected" : ""}
                          key={name}
                          onClick={() => setChapter(i)}
                        >
                          {i + 1}章
                        </button>
                      ))}
                    </div>
                    <h3 className="park-section-heading">
                      {CHAPTERS[chapter]}
                      <span>{completed}/99 已修复</span>
                    </h3>
                    <div className="park-level-grid">
                      {p.levels
                        .filter((level) => chapterIndex(level.id) === chapter)
                        .map((level) => (
                          <button
                            key={level.id}
                            className={`park-level-card ${p.level.id === level.id ? "current" : ""} ${p.clearedLevels.includes(level.id) ? "cleared" : ""}`}
                            onClick={() => select(level.id)}
                            aria-label={`进入第${level.id}关`}
                          >
                            <b>{level.id}</b>
                            <Stars
                              value={getBestStars(
                                level,
                                p.clearedLevels,
                                p.bestSteps,
                              )}
                            />
                            <small>
                              {p.bestSteps[level.id] == null
                                ? "尚未修复"
                                : `最佳 ${p.bestSteps[level.id]} 步`}
                            </small>
                          </button>
                        ))}
                    </div>
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
                        open("flora");
                      }}
                    >
                      查看百花图鉴
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
                        <p>今日完成任意一关</p>
                        <strong>
                          {progress.completedDate === today ? "1" : "0"}/1
                        </strong>
                      </div>
                      <span className="park-item-price">
                        <Icon name="coin" />
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
                        flash("已领取 100 金币");
                      }}
                    >
                      {progress.claimedDate === today
                        ? "今日已领取"
                        : progress.completedDate === today
                          ? "领取奖励"
                          : "完成关卡后领取"}
                    </ParkButton>
                  </>
                )}
                {activeModal === "bag" && (
                  <>
                    <div className="park-item-card">
                      <Icon name="hint" />
                      <div>
                        <h3>提示灯泡</h3>
                        <p>查看当前关卡的通路提示</p>
                        <strong>已拥有 {progress.hints} 个</strong>
                      </div>
                    </div>
                    <ParkButton
                      disabled={p.screen !== "play" || progress.hints === 0}
                      onClick={useHint}
                    >
                      使用提示
                    </ParkButton>
                    <p className="park-fine-print">
                      在挑战中使用，每次消耗 1 个灯泡
                    </p>
                    <ParkButton purple onClick={() => open("shop")}>
                      前往商店
                    </ParkButton>
                  </>
                )}
                {activeModal === "shop" && (
                  <>
                    <div className="park-shop-balance">
                      <Icon name="coin" />
                      {progress.coins.toLocaleString()}
                      <Icon name="gem" />
                      {progress.gems.toLocaleString()}
                    </div>
                    <div className="park-item-card">
                      <Icon name="hint" />
                      <div>
                        <h3>提示灯泡 × 1</h3>
                        <p>为下一次灵感做好准备</p>
                      </div>
                      <span className="park-item-price">
                        <Icon name="coin" />
                        50
                      </span>
                    </div>
                    <ParkButton
                      disabled={progress.coins < 50}
                      onClick={() => {
                        save(buyHint(progress));
                        flash("兑换成功，提示灯泡 +1");
                      }}
                    >
                      {progress.coins < 50 ? "金币不足" : "兑换灯泡"}
                    </ParkButton>
                    <p className="park-fine-print">
                      首次修复设施可获得金币与钻石
                    </p>
                  </>
                )}
                {activeModal === "hint" && (
                  <>
                    <Art name="spirit" className="park-modal-mascot" />
                    <h3>第 {p.level.id} 关 · 通路提示</h3>
                    <p className="park-hint-copy">
                      {p.level.hintText
                        .replaceAll("水脉", "能量管道")
                        .replaceAll("灵泉", "能量")
                        .replaceAll("仙花", "设施")
                        .replaceAll("花蕾", "设施")}
                    </p>
                    <ParkButton onClick={close}>继续挑战</ParkButton>
                  </>
                )}
                {activeModal === "rules" && (
                  <>
                    <p className="park-lead">
                      转动管道，连接星星能量源与所有设施。
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
                          text: "点击管身旋转；点击角标切换通断，每次操作消耗 1 步。",
                        },
                        {
                          art: "pipe-diode",
                          title: "单向管",
                          text: "能量沿箭头流动，反向进入会被阻挡。",
                        },
                        {
                          art: "pipe-cross-off",
                          title: "十字管",
                          text: "四个方向均可连接，规划好各条支路。",
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
                      剩余步数达到总步数的 40% 可获三星，达到 15%
                      可获二星。步数耗尽后可撤销或重试。
                    </p>
                    <ParkButton onClick={close}>开始连接</ParkButton>
                  </>
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
                  </>
                )}
                {activeModal === "profile" && (
                  <>
                    <div className="park-profile-intro">
                      <Art name="sheep" />
                      <div>
                        <h3>星光修复师</h3>
                        <p>已修复 {completed} 座设施</p>
                        <p>收集星星 {totalStars} 颗</p>
                        <p>
                          成就 {Object.keys(unlocked).length}/
                          {ALL_ACHIEVEMENTS.length}
                        </p>
                      </div>
                    </div>
                    <div className="park-achievements">
                      {ALL_ACHIEVEMENTS.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={unlocked[achievement.id] ? "earned" : ""}
                        >
                          <Icon
                            name={unlocked[achievement.id] ? "star" : "lock"}
                          />
                          <section>
                            <h3>{achievement.title}</h3>
                            <p>{achievement.description}</p>
                          </section>
                          <span>
                            {unlocked[achievement.id] ? "已达成" : "未达成"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="park-fine-print">
                      累计撤销 {loadPlayerStats().totalUndos} 次
                    </p>
                  </>
                )}
                {activeModal === "flora" && (
                  <>
                    {flower ? (
                      <div className="park-flower-detail">
                        <ParkFlower
                          flower={flower}
                          unlocked={p.clearedLevels.includes(flowerId!)}
                          large
                        />
                        <h3>{flower.name}</h3>
                        <p>{flower.alias}</p>
                        <p>
                          {p.clearedLevels.includes(flowerId!)
                            ? flower.lore
                            : `完成第 ${flowerId} 关，唤醒这朵花`}
                        </p>
                        <ParkButton onClick={() => select(flowerId!)}>
                          前往第 {flowerId} 关
                        </ParkButton>
                        <button
                          className="park-text-link"
                          onClick={() => setFlowerId(null)}
                        >
                          返回图鉴
                        </button>
                      </div>
                    ) : (
                      <>
                        <p>修复乐园，唤醒 99 朵伴生花。已收集 {completed}/99</p>
                        <div className="park-flower-grid">
                          {p.levels
                            .slice(
                              collectionPage * 20,
                              collectionPage * 20 + 20,
                            )
                            .map((level) => {
                              const entry = getFlowerForLevel(level.id);
                              return (
                                <button
                                  key={level.id}
                                  onClick={() => setFlowerId(level.id)}
                                >
                                  <ParkFlower
                                    flower={entry}
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
                    <p className="park-hint-copy">
                      星光暂时熄灭，旋转木马也停下了脚步。与小羊、白兔和能量精灵一起，连接散落的管道，让乐园重新闪耀。
                    </p>
                    <ParkButton onClick={() => open("story")}>
                      阅读乐园故事
                    </ParkButton>
                  </>
                )}
                {activeModal === "story" && (
                  <>
                    <Art name="island" className="park-story-island" />
                    <p>
                      云海深处，曾有一座由星光驱动的乐园。一次流星雨打乱了能量管道，设施渐渐沉睡，伴生花也合拢了花瓣。
                    </p>
                    <p>
                      带上护目镜，跟随能量精灵。从第一束星光开始，转动管道，修复设施，让九十九朵花再次盛开。
                    </p>
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
                            {snapshot.description.replaceAll("水渠", "管道")}
                          </span>
                          <small>
                            {snapshot.litCount}/{snapshot.totalBulbs} 设施 ·
                            剩余 {snapshot.remainingSteps} 步
                          </small>
                        </button>
                      ))}
                    </div>
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
                        {mode.name} · {mode.goals} 座设施
                      </ParkButton>
                    ))}
                  </>
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
