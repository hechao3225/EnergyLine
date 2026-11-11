/**
 * GameScene：游戏主场景（H5 App.tsx 移动端布局的 Canvas 复刻）。
 * 顶栏状态条 / 祭坛棋盘 / 撤销时间线 / 底部导航 / 胜利弹窗 / 成就 Toast / 提示条。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Director, Scene } from '../runtime/director';
import { Node } from '../runtime/node';
import { Button, Label, Modal, Panel, ProgressRing, ScrollView } from '../runtime/widgets';
import { ParticleSystem } from '../runtime/particles';
import { Theme } from '../runtime/theme';
import { tween, Ease } from '../runtime/tween';
import { GameController, VictoryInfo } from './gameController';
import { GameBoard, FlowOverlay } from './board';
import { AppHeader, AppView, HEADER_HEIGHT } from './appHeader';
import { DEFAULT_LEVELS } from '../logic/data/defaultLevels';
import { getFlowerForLevel } from '../logic/flowers';
import { getStarsForSteps, getStarThresholds } from '../logic/rating';
import { loadProgress, saveProgress } from '../logic/progress';
import { checkVictoryAchievements } from '../logic/achievements';
import { Achievement } from '../types/achievement';
import { sound } from '../logic/audio';
import { getPlatform } from '../adapter/platform';
import { CONFIG, rewardedAdUnit, victoryShareTitle } from '../config';
import { haptics } from '../logic/haptics';
import { LevelConfig, Tile } from '../types/game';

interface AppCallbacks {
  onSelectLevel: (id: number) => void;
  onHome: () => void;
  onNav: (view: AppView) => void;
}

export class GameScene extends Scene {
  private director: Director;
  controller: GameController;
  board: GameBoard;
  private flowOverlay: FlowOverlay;
  private particles = new ParticleSystem();
  private header: AppHeader;

  get gameBoard(): GameBoard {
    return this.board;
  }

  get victoryModalOpen(): boolean {
    return this.victoryModal !== null;
  }

  // 顶栏元素
  private levelBadge: Label;
  private levelTitle: Label;
  private levelSub: Label;
  private stepsPill: Panel;
  private stepsLabel: Label;
  private flowerPill: Panel;
  private flowerLabel: Label;
  private peekBtn: Button;
  private progressLabel: Label;
  private progressRing: ProgressRing;

  // 底部
  private bottomRightHost: Node;
  private nextBtn: Button | null = null;
  private addStepsBtn: Button | null = null;
  private hintLabel: Label;

  // 弹层
  private victoryModal: VictoryModal | null = null;
  private rulesModal: RulesModal | null = null;
  private toastHost: Node;
  private toastPanel: Panel | null = null;

  private winModalTimer: ReturnType<typeof setTimeout> | null = null;
  private adPending = false;
  private victoryStats: VictoryInfo | null = null;
  private cbs: AppCallbacks;

  constructor(director: Director, levelId: number, cbs: AppCallbacks) {
    super(director.W, director.H);
    this.director = director;
    this.cbs = cbs;

    const level = DEFAULT_LEVELS.find((l) => l.id === levelId) || DEFAULT_LEVELS[0];
    const progress = loadProgress();

    this.controller = new GameController(level, progress);
    this.controller.onChange = () => this.syncUI();
    this.controller.onVictory = (v) => this.handleVictory(v);
    this.controller.onOutOfSteps = () => this.flashSteps();

    const W = director.W;
    const H = director.H;
    const top = director.safeTop + 4;
    /** 内容栏宽度（顶栏/状态条/时间线/底栏共用） */
    const barW = W - 20;

    // ================= App 顶栏 =================
    this.header = this.root.addChild(new AppHeader({
      width: barW, x: 10, top, active: 'tree',
      onNav: (view) => {
        if (view === 'tree') this.cbs.onHome();
        else this.cbs.onNav(view);
      },
    }));

    // ================= 状态条 =================
    const statusY = top + HEADER_HEIGHT + 6;
    const topBar = this.root.addChild(new Panel({
      width: barW,
      height: 46,
      radius: 12,
      x: W / 2,
      y: statusY + 23,
    }));

    // 关卡徽章 + 标题
    const badge = topBar.addChild(new Panel({
      width: 30,
      height: 30,
      radius: 8,
      fill: [Theme.activeBgTop, Theme.activeBgBottom],
      borderColor: '#0f392a',
      x: 17,
      y: 23,
    }));
    this.levelBadge = badge.addChild(new Label({
      text: String(level.id),
      fontSize: 12,
      bold: true,
      color: '#ffffff',
      align: 'center',
      x: 15,
      y: 15,
    }));
    this.levelTitle = topBar.addChild(new Label({
      text: level.title,
      fontSize: 12,
      bold: true,
      x: 40,
      y: 15,
      color: Theme.textPrimary,
    }));
    this.levelTitle.anchorX = 0;
    this.levelSub = topBar.addChild(new Label({
      text: this.subTextFor(level, progress),
      fontSize: 9,
      x: 40,
      y: 32,
      color: Theme.textSecondary,
    }));
    this.levelSub.anchorX = 0;

    // 右侧功能按钮组：规则 / 透视 / 重置（右对齐，随栏宽自适应）
    const resetX = barW - 23;
    const peekX = resetX - 34;
    const helpX = peekX - 34;

    // 步数 / 花数药丸（相对按钮组左对齐）
    const flowerX = helpX - 13 - 8 - 26;
    const stepsX = flowerX - 26 - 8 - 32;
    this.stepsPill = topBar.addChild(new Panel({
      width: 64, height: 24, radius: 8, x: stepsX, y: 23,
      fill: [Theme.pillBgTop, Theme.pillBgBottom], borderColor: Theme.pillBorder,
    }));
    this.stepsLabel = this.stepsPill.addChild(new Label({
      text: '步数 99', fontSize: 11, bold: true, color: Theme.pillText, align: 'center', x: 32, y: 12,
    }));
    this.flowerPill = topBar.addChild(new Panel({
      width: 52, height: 24, radius: 8, x: flowerX, y: 23,
      fill: [Theme.pillBgTop, Theme.pillBgBottom], borderColor: Theme.pillBorder,
    }));
    this.flowerLabel = this.flowerPill.addChild(new Label({
      text: '🌸 0/0', fontSize: 11, bold: true, color: Theme.pillText, align: 'center', x: 26, y: 12,
    }));

    topBar.addChild(new Button({ text: '📖', width: 26, height: 26, radius: 8, fontSize: 11, x: helpX, y: 23, onTap: () => this.showRules() }));
    this.peekBtn = topBar.addChild(new Button({ text: '👁', width: 26, height: 26, radius: 8, fontSize: 12, x: peekX, y: 23, onTap: () => this.togglePeek() }));
    topBar.addChild(new Button({ text: '↻', width: 26, height: 26, radius: 8, fontSize: 13, x: resetX, y: 23, onTap: () => this.restart() }));

    // ================= 地脉进度条 =================
    const progressY = statusY + 46 + 6;
    const progressBar = this.root.addChild(new Panel({
      width: barW, height: 36, radius: 10,
      x: W / 2, y: progressY + 18,
    }));
    this.progressLabel = progressBar.addChild(new Label({
      text: `地脉之根  ${progress.cleared.length}/99`, fontSize: 11, bold: true,
      color: Theme.textPrimary, x: 14, y: 12,
    }));
    this.progressLabel.anchorX = 0;
    progressBar.addChild(new Label({
      text: '第 1 卷 · 滋养神木主脉', fontSize: 9, color: Theme.textSecondary,
      x: 14, y: 25,
    })).anchorX = 0;
    this.progressRing = progressBar.addChild(new ProgressRing({
      width: 26, height: 26, x: barW - 24, y: 18,
    }));

    // ================= 棋盘 =================
    const navTop = H - director.safeBottom - 12 - 42;
    const bottomLimit = navTop - 10;
    const areaTop = progressY + 36 + 8;
    const boardSize = Math.min(W - 20, 420, Math.max(160, bottomLimit - areaTop - 8 - 16 - 6 - 40 - 8));
    const groupH = boardSize + 8 + 16 + 6 + 40;
    const boardCenterY = areaTop + Math.max(0, (bottomLimit - areaTop - groupH) / 2) + boardSize / 2;
    this.board = this.root.addChild(new GameBoard({
      tiles: this.controller.tiles,
      gridRows: level.gridRows,
      gridCols: level.gridCols,
      simulation: this.controller.simulation,
      width: boardSize,
      height: boardSize,
      levelId: level.id,
      onTileClick: (tile, action) => this.controller.handleTileClick(tile, action),
    }));
    this.board.setPos(W / 2, boardCenterY);
    this.flowOverlay = this.root.addChild(this.board.createFlowOverlay());
    this.flowOverlay.setSize(boardSize, boardSize);
    this.flowOverlay.setPos(this.board.x, this.board.y);

    // ================= 棋盘下方提示语 =================
    const hintY = boardCenterY + boardSize / 2 + 8 + 8;
    this.hintLabel = this.root.addChild(new Label({
      text: `💧 ${level.hintText}`, fontSize: 10, color: Theme.textHint,
      align: 'center', x: W / 2, y: hintY, maxWidth: W - 40,
    }));

    // ================= 撤销时间线 =================
    const tlY = hintY + 8 + 6 + 20;
    const tl = this.root.addChild(new Panel({
      width: barW, height: 40, radius: 12,
      x: W / 2, y: tlY,
    }));
    tl.addChild(new Button({ text: '↩ 撤销', width: 96, height: 28, radius: 8, fontSize: 12, x: 58, y: 20, onTap: () => this.controller.undo() }));
    tl.addChild(new Button({ text: '始', width: 34, height: 34, radius: 17, fontSize: 12, x: barW / 2, y: 20, active: true, onTap: () => this.controller.resetToStart() }));
    tl.addChild(new Button({ text: '重做 ↪', width: 96, height: 28, radius: 8, fontSize: 12, x: barW - 58, y: 20, onTap: () => this.controller.redo() }));

    // ================= 底部导航 =================
    const nav = this.root.addChild(new Panel({
      width: barW, height: 42, radius: 12,
      x: W / 2, y: navTop + 21,
    }));
    const colW = barW / 3;
    nav.addChild(new Button({ text: '▦ 选关', width: Math.min(104, colW - 12), height: 30, radius: 8, fontSize: 12, x: colW * 0.5, y: 21, onTap: () => this.cbs.onHome() }));
    nav.addChild(new Button({ text: '💡 提示', width: Math.min(104, colW - 12), height: 30, radius: 8, fontSize: 12, x: colW * 1.5, y: 21, onTap: () => this.showHint() }));
    this.bottomRightHost = nav.addChild(new Node());
    this.bottomRightHost.width = Math.min(104, colW - 12);
    this.bottomRightHost.height = 30;
    this.bottomRightHost.x = colW * 2.5;
    this.bottomRightHost.y = 21;

    // Toast / 粒子层
    this.toastHost = this.root.addChild(new Node());
    this.toastHost.width = W;
    this.toastHost.height = H;
    this.particles.width = W;
    this.particles.height = H;
    this.root.addChild(this.particles);

    // 进入关卡隐藏首页 banner，避免遮挡棋盘
    getPlatform().hideBanner();

    this.syncUI();
  }

  private subTextFor(level: LevelConfig, progress: { best: Record<number, number> }): string {
    const best = progress.best[level.id];
    if (best !== undefined) {
      const stars = getStarsForSteps(best, level);
      return `最佳 ${best} 步 · ${stars}★`;
    }
    return `4★ ≤ ${getStarThresholds(level).par} 步`;
  }

  // ---------------- 状态同步 ----------------
  private syncUI(): void {
    const c = this.controller;
    const level = c.level;

    this.levelBadge.text = String(level.id);
    this.levelTitle.text = level.title;
    this.levelSub.text = this.subTextFor(level, { best: c.bestRecord });

    this.stepsLabel.text = `步数 ${c.remainingSteps}`;
    const low = c.remainingSteps <= 3;
    this.stepsPill.fill = low ? [Theme.redLight, Theme.redLight] : [Theme.pillBgTop, Theme.pillBgBottom];
    this.stepsPill.borderColor = low ? '#fca5a5' : Theme.pillBorder;
    this.stepsLabel.color = low ? '#b91c1c' : Theme.pillText;

    this.flowerLabel.text = `🌸 ${c.simulation.litCount}/${c.simulation.totalBulbs}`;
    this.flowerPill.fill = c.simulation.isAllLit
      ? ['rgba(209,250,229,0.95)', 'rgba(167,243,208,0.95)']
      : [Theme.pillBgTop, Theme.pillBgBottom];
    this.flowerPill.borderColor = c.simulation.isAllLit ? '#34d399' : Theme.pillBorder;

    const cleared = c.clearedLevels.length;
    this.progressLabel.text = `地脉之根  ${cleared}/99`;
    this.progressRing.progress = cleared / DEFAULT_LEVELS.length;

    this.board.syncState(c.tiles, c.simulation);

    // 底部右侧：+10 步 / 下一关 / 灵脉信息
    this.bottomRightHost.removeAllChildren();
    const hostW = this.bottomRightHost.width;
    if (c.remainingSteps <= 0 && !c.simulation.isAllLit) {
      this.addStepsBtn = this.bottomRightHost.addChild(new Button({
        text: '📺 +10步', width: hostW, height: 30, radius: 8, fontSize: 11,
        x: hostW / 2, y: 15,
        danger: true,
        onTap: () => this.watchAdForSteps(10),
      }));
    } else if (c.simulation.isAllLit) {
      this.nextBtn = this.bottomRightHost.addChild(new Button({
        text: '下一关 ›', width: hostW, height: 30, radius: 8, fontSize: 12,
        x: hostW / 2, y: 15, active: true,
        onTap: () => this.nextLevel(),
      }));
    } else {
      const info = this.bottomRightHost.addChild(new Label({
        text: `${level.gridRows}×${level.gridCols} 灵脉`,
        fontSize: 10, color: Theme.textSecondary, align: 'center', x: hostW / 2, y: 15,
      }));
      void info;
    }
  }

  // ---------------- 交互动作 ----------------
  private togglePeek(): void {
    const active = !this.board.peekActive;
    this.board.setPeek(active);
    this.peekBtn.setActive(active);
  }

  private showHint(): void {
    // 提示语常驻显示，点击「提示」时高亮脉冲一次
    this.hintLabel.color = '#b45309';
    tween(this.hintLabel as unknown as object, { scaleX: 1.06, scaleY: 1.06 }, 140, {
      ease: Ease.easeOutQuad,
      onComplete: () => {
        tween(this.hintLabel as unknown as object, { scaleX: 1, scaleY: 1 }, 220);
        setTimeout(() => {
          this.hintLabel.color = Theme.textHint;
        }, 900);
      },
    });
  }

  private showRules(): void {
    if (this.rulesModal) return;
    this.rulesModal = new RulesModal(this.director.W, this.director.H);
    this.root.addChild(this.rulesModal);
    this.rulesModal.layout(this.director.W, this.director.H);
    this.rulesModal.popIn();
    this.rulesModal.onDismiss = () => {
      this.rulesModal?.removeFromParent();
      this.rulesModal = null;
    };
  }

  /** 激励视频换步数：看完发放；广告系统异常时兜底赠送；用户主动关闭则不发 */
  private watchAdForSteps(amount: number): void {
    if (this.adPending) return;
    this.adPending = true;
    this.showToast('📺 广告加载中…');
    getPlatform()
      .showRewardedVideo(rewardedAdUnit())
      .then((res) => {
        this.adPending = false;
        if (res.status === 'rewarded') {
          this.controller.addSteps(amount);
          this.showToast(`🎁 看完广告，灵力 +${amount} 步`);
        } else if (res.status === 'closed') {
          this.showToast('广告未看完，本次没有奖励');
        } else {
          // 广告拉取失败/未配置：兜底赠送，避免玩家卡死
          this.controller.addSteps(amount);
          this.showToast(`⚠️ 广告暂不可用，赠送 ${amount} 步`);
        }
      })
      .catch(() => {
        this.adPending = false;
        this.controller.addSteps(amount);
        this.showToast(`⚠️ 广告异常，赠送 ${amount} 步`);
      });
  }

  /** 分享战绩 */
  private shareVictory(): void {
    const v = this.victoryStats;
    if (!v) return;
    const flower = getFlowerForLevel(v.levelId);
    getPlatform().share({
      title: victoryShareTitle(v.levelId, v.stepsUsed, flower.name),
      imageUrl: CONFIG.share.imageUrl,
      query: `from=share&level=${v.levelId}`,
    });
  }

  private flashSteps(): void {
    tween(this.stepsPill as unknown as object, { scaleX: 1.15, scaleY: 1.15 }, 120, {
      ease: Ease.easeOutQuad,
      onComplete: () => tween(this.stepsPill as unknown as object, { scaleX: 1, scaleY: 1 }, 180),
    });
  }

  private restart(): void {
    if (this.winModalTimer) {
      clearTimeout(this.winModalTimer);
      this.winModalTimer = null;
    }
    this.victoryModal?.removeFromParent();
    this.victoryModal = null;
    this.particles.clear();
    const progress = { cleared: this.controller.clearedLevels, best: this.controller.bestRecord };
    const fresh = new GameController(this.controller.level, progress);
    this.adoptController(fresh);
  }

  private nextLevel(): void {
    const nextId = this.controller.level.id + 1;
    if (nextId <= DEFAULT_LEVELS.length) {
      this.cbs.onSelectLevel(nextId);
    } else {
      this.cbs.onHome();
    }
  }

  private adoptController(c: GameController): void {
    this.controller = c;
    c.onChange = () => this.syncUI();
    c.onVictory = (v) => this.handleVictory(v);
    c.onOutOfSteps = () => this.flashSteps();
    this.board.syncState(c.tiles, c.simulation);
    this.syncUI();
  }

  // ---------------- 胜利流程（对应 App.tsx victory effect） ----------------
  private handleVictory(v: VictoryInfo): void {
    this.victoryStats = v;

    // 持久化（防作弊清洗后的干净进度）
    saveProgress(this.controller.clearedLevels, this.controller.bestRecord);

    // 成就
    const achResult = checkVictoryAchievements({
      levelId: v.levelId,
      stepsUsed: v.stepsUsed,
      remainingSteps: v.remainingSteps,
      maxSteps: v.maxSteps,
      parSteps: this.controller.level.parSteps,
      levelUndosUsed: v.levelUndosUsed,
      hasUsedTimelineJump: v.hasUsedTimelineJump,
      hasToggledSwitch: v.hasToggledSwitch,
    });

    // 神树生长：泉涌水珠 + 仙花苏醒横幅
    const flower = getFlowerForLevel(v.levelId);
    sound.playChime();
    this.spawnRiseOrbs();
    this.showToast(`🌸 ${flower.name} 苏醒 · ${flower.blessing}`);

    // 五彩纸屑
    this.particles.confetti(this.director.W, 90);

    if (achResult.newlyUnlocked.length > 0) {
      setTimeout(() => {
        const a = achResult.newlyUnlocked[0];
        this.showToast(`🏆 成就解锁：${a.title}`);
      }, 2600);
    }

    // 1100ms 后弹胜利窗（对应 H5 setTimeout(1100)）
    if (this.winModalTimer) clearTimeout(this.winModalTimer);
    this.winModalTimer = setTimeout(() => {
      this.winModalTimer = null;
      this.showVictoryModal(achResult.newlyUnlocked);
    }, 1100);

    this.syncUI();
  }

  private spawnRiseOrbs(): void {
    const board = this.board;
    const sim = this.controller.simulation;
    let i = 0;
    const spawn = (): void => {
      for (const t of this.controller.tiles) {
        if (t.type !== 'bulb' || !sim.litBulbIds.has(t.id)) continue;
        const c = board.cellCenter(t.row, t.col);
        this.particles.riseOrb(
          board.x - board.width / 2 + c.x,
          board.y - board.height / 2 + c.y
        );
      }
    };
    for (i = 0; i < 3; i++) setTimeout(spawn, i * 350);
  }

  private showToast(text: string): void {
    this.toastPanel?.removeFromParent();
    const W = this.director.W;
    const y = this.director.safeTop + 66;
    const panel = new Panel({
      width: W - 40, height: 40, radius: 12,
      x: W / 2, y,
      fill: ['rgba(236,253,245,0.97)', 'rgba(209,250,229,0.97)'],
      borderColor: '#34d399',
    });
    const label = panel.addChild(new Label({
      text, fontSize: 11, color: '#065f46', align: 'center', x: (W - 40) / 2, y: 20, maxWidth: W - 76,
    }));
    void label;
    this.toastHost.addChild(panel);
    this.toastPanel = panel;
    panel.alpha = 0;
    tween(panel as unknown as object, { alpha: 1, y: y + 6 }, 240);
    setTimeout(() => {
      tween(panel as unknown as object, { alpha: 0 }, 300, {
        onComplete: () => panel.removeFromParent(),
      });
    }, 2400);
  }

  private showVictoryModal(newAchievements: Achievement[]): void {
    const v = this.victoryStats;
    if (!v) return;
    this.victoryModal = new VictoryModal({
      director: this.director,
      victory: v,
      level: this.controller.level,
      newAchievements,
      onNext: () => this.nextLevel(),
      onRestart: () => this.restart(),
      onSelect: () => this.cbs.onHome(),
      onShare: () => this.shareVictory(),
    });
    this.root.addChild(this.victoryModal);
    this.victoryModal.layout(this.director.W, this.director.H);
    this.victoryModal.popIn();
  }
}

// ============================================================
// 胜利弹窗
// ============================================================
export class VictoryModal extends Modal {
  constructor(opts: {
    director: Director;
    victory: VictoryInfo;
    level: LevelConfig;
    newAchievements: Achievement[];
    onNext: () => void;
    onRestart: () => void;
    onSelect: () => void;
    onShare: () => void;
  }) {
    const W = Math.min(opts.director.W - 36, 340);
    super({ width: W, height: 400, radius: 18, fill: ['rgba(250,253,249,0.995)', 'rgba(238,246,237,0.995)'] });

    const v = opts.victory;
    const stars = getStarsForSteps(v.stepsUsed, opts.level);

    this.body.addChild(new Label({
      text: '🌸 灵泉满溢 · 关卡告捷',
      fontSize: 18, bold: true, align: 'center', color: '#065f46',
      x: W / 2, y: 34,
    }));

    // 星级
    const starText = '★★★★'.slice(0, stars) + '☆☆☆☆'.slice(0, 4 - stars);
    this.body.addChild(new Label({
      text: starText,
      fontSize: 26, align: 'center',
      color: stars >= 3 ? '#f59e0b' : '#94a3b8',
      x: W / 2, y: 72,
    }));

    const flower = getFlowerForLevel(v.levelId);
    this.body.addChild(new Label({
      text: `${flower.name} · ${flower.alias}`,
      fontSize: 13, bold: true, align: 'center', color: '#0d9488',
      x: W / 2, y: 102,
    }));

    const rows: [string, string][] = [
      ['本次步数', `${v.stepsUsed} 步`],
      ['剩余步数', `${v.remainingSteps} 步`],
      ['历史最佳', v.isNewRecord ? `${v.bestSteps} 步 · 新纪录！` : `${v.bestSteps} 步`],
    ];
    rows.forEach(([k, val], i) => {
      const y = 140 + i * 26;
      this.body.addChild(new Label({ text: k, fontSize: 12, color: Theme.textSecondary, x: 28, y, }));
      const kl = this.body.children[this.body.children.length - 1] as Label;
      kl.anchorX = 0;
      this.body.addChild(new Label({
        text: val, fontSize: 12, bold: true, color: v.isNewRecord && i === 2 ? '#dc2626' : Theme.textPrimary,
        x: W - 28, y,
      }));
      const rl = this.body.children[this.body.children.length - 1] as Label;
      rl.anchorX = 1;
    });

    // 新解锁成就
    if (opts.newAchievements.length > 0) {
      this.body.addChild(new Label({
        text: `🏆 新成就：${opts.newAchievements.map((a) => a.title).join('、')}`,
        fontSize: 11, align: 'center', color: '#b45309', maxWidth: W - 48,
        x: W / 2, y: 226,
      }));
    }

    this.body.addChild(new Label({
      text: opts.level.winText,
      fontSize: 11, align: 'center', color: Theme.textSecondary, maxWidth: W - 48,
      x: W / 2, y: 250,
    }));

    // 按钮
    const hasNext = v.levelId < DEFAULT_LEVELS.length;
    if (hasNext) {
      this.body.addChild(new Button({
        text: '下一关 ›', width: W - 64, height: 42, fontSize: 14,
        x: W / 2, y: 296, active: true, radius: 12,
        onTap: opts.onNext,
      }));
    }
    const secondY = hasNext ? 348 : 300;
    const bw = (W - 56) / 3 - 6;
    const gap = bw + 6;
    this.body.addChild(new Button({
      text: '重玩', width: bw, height: 34, fontSize: 12,
      x: W / 2 - gap, y: secondY, radius: 10,
      onTap: opts.onRestart,
    }));
    this.body.addChild(new Button({
      text: '选关', width: bw, height: 34, fontSize: 12,
      x: W / 2, y: secondY, radius: 10,
      onTap: opts.onSelect,
    }));
    this.body.addChild(new Button({
      text: '分享', width: bw, height: 34, fontSize: 12,
      x: W / 2 + gap, y: secondY, radius: 10,
      onTap: opts.onShare,
    }));
  }
}

// ============================================================
// 规则弹窗
// ============================================================
export class RulesModal extends Modal {
  constructor(W: number, H: number) {
    const w = Math.min(W - 36, 340);
    super({ width: w, height: 330, radius: 18, fill: ['rgba(250,253,249,0.995)', 'rgba(238,246,237,0.995)'] });
    void H;

    this.body.addChild(new Label({
      text: '📖 引泉规则', fontSize: 17, bold: true, align: 'center',
      color: '#065f46', x: w / 2, y: 32,
    }));

    const rules: [string, string][] = [
      ['旋转水渠', '点击瓦片旋转 90°，把端口对齐连成一条不断的水脉。'],
      ['接通灵泉', '从泉眼出发，活水流经的管道会亮起，点亮全部仙花即通关。'],
      ['水闸开关', '长按水闸瓦片可开合闸门，改变活水走向。'],
      ['步数与星级', '每次旋转消耗 1 步；步数越少星级越高，≤ 标准步数得 4★。'],
      ['撤销与重做', '可随时撤销，撤销不返还步数；「始」回到本关初始状态。'],
    ];
    rules.forEach(([k, v], i) => {
      const y = 70 + i * 46;
      this.body.addChild(new Label({
        text: k, fontSize: 12, bold: true, color: '#0d9488', x: 24, y,
      })).anchorX = 0;
      this.body.addChild(new Label({
        text: v, fontSize: 10, color: '#4b6757', x: 24, y: y + 17, maxWidth: w - 48,
      })).anchorX = 0;
    });

    this.body.addChild(new Button({
      text: '知道了', width: w - 64, height: 40, fontSize: 14, active: true, radius: 12,
      x: w / 2, y: 296,
      onTap: () => {
        if (this.onDismiss) this.onDismiss();
      },
    }));

    // 点击遮罩关闭
    this.dim.onTap = () => {
      if (this.onDismiss) this.onDismiss();
    };
  }
}
