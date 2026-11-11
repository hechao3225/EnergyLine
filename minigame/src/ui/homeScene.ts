/**
 * HomeScene（神木 tab）：通天神木天梯 + 九十九关网格选关。
 * 对应 H5 的「神木」主线视图。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Director, Scene } from '../runtime/director';
import { Node } from '../runtime/node';
import { Button, Label, Panel, ScrollView } from '../runtime/widgets';
import { Theme } from '../runtime/theme';
import { DEFAULT_LEVELS } from '../logic/data/defaultLevels';
import { getOnboardingKey, loadProgress, readFlag, writeFlag } from '../logic/progress';
import { getStarsForRecord } from '../logic/rating';
import { getFlowerForLevel } from '../logic/flowers';
import { AppHeader, AppView, HEADER_HEIGHT } from './appHeader';
import { OnboardingModal } from './onboarding';
import { getPlatform } from '../adapter/platform';
import { CONFIG, bannerAdUnit } from '../config';

export interface HomeCallbacks {
  onOpenLevel: (id: number) => void;
  onNav: (view: AppView) => void;
}

export class HomeScene extends Scene {
  private scroll: ScrollView;
  private contentW: number;
  private view: 'ladder' | 'grid' = 'ladder';
  private tabLadder: Button;
  private tabGrid: Button;
  private progress = loadProgress();

  constructor(director: Director, private cbs: HomeCallbacks) {
    super(director.W, director.H);
    const W = director.W;
    const H = director.H;
    const top = director.safeTop + 4;
    const barW = W - 20;

    this.root.addChild(new AppHeader({
      width: barW, x: 10, top, active: 'tree',
      onNav: (view) => {
        if (view !== 'tree') this.cbs.onNav(view);
      },
    }));

    // ---------- 概览卡 ----------
    const clearedCount = this.progress.cleared.length;
    const nextId = Math.min(clearedCount + 1, DEFAULT_LEVELS.length);
    const nextLevel = DEFAULT_LEVELS.find((l) => l.id === nextId) || DEFAULT_LEVELS[0];
    const summaryY = top + HEADER_HEIGHT + 6;
    const summary = this.root.addChild(new Panel({
      width: barW, height: 64, radius: 12,
      x: W / 2, y: summaryY + 32,
    }));
    const c1 = getFlowerForLevel(nextId);
    summary.addChild(new Label({
      text: '九十九重通天神木', fontSize: 15, bold: true, color: '#0e2a1d', x: 14, y: 16,
    })).anchorX = 0;
    summary.addChild(new Label({
      text: `已唤醒 ${clearedCount} 朵仙花 · ${c1.chapterName}`, fontSize: 10, color: Theme.textSecondary,
      x: 14, y: 35,
    })).anchorX = 0;

    // 进度条
    const barX = 14;
    const barW2 = 150;
    const track = summary.addChild(new Panel({
      width: barW2, height: 5, radius: 3, x: barX + barW2 / 2, y: 50,
      fill: 'rgba(196,214,201,0.9)', borderColor: null, borderWidth: 0,
    }));
    void track;
    const fillW = Math.max(4, (barW2 * clearedCount) / DEFAULT_LEVELS.length);
    summary.addChild(new Panel({
      width: fillW, height: 5, radius: 3, x: barX + fillW / 2, y: 50,
      fill: '#0d9488', borderColor: null, borderWidth: 0,
    }));

    // 适龄提示（提审必查项）
    summary.addChild(new Label({
      text: '适龄提示 8+', fontSize: 8, color: '#6f8a7c', align: 'right',
      x: barW - 14, y: 52,
    }));

    summary.addChild(new Button({
      text: clearedCount === 0 ? '开始引泉' : `续玩 ${nextLevel.id}`,
      width: 88, height: 32, radius: 9, fontSize: 12, active: true,
      x: barW - 56, y: 32,
      onTap: () => this.cbs.onOpenLevel(nextId),
    }));

    // ---------- 天梯 / 网格 切换 ----------
    const segY = summaryY + 64 + 8;
    const segW = 168;
    const segPanel = this.root.addChild(new Panel({
      width: segW, height: 30, radius: 10,
      x: W / 2, y: segY + 15,
      fill: ['rgba(222,236,224,0.95)', 'rgba(214,231,216,0.95)'],
      borderColor: 'rgba(168,195,178,0.9)',
    }));
    void segPanel;
    this.tabLadder = this.root.addChild(new Button({
      text: '天梯', width: 76, height: 24, radius: 8, fontSize: 11,
      x: W / 2 - 40, y: segY + 15, active: true,
      onTap: () => this.switchView('ladder'),
    }));
    this.tabGrid = this.root.addChild(new Button({
      text: '网格', width: 76, height: 24, radius: 8, fontSize: 11,
      x: W / 2 + 40, y: segY + 15,
      onTap: () => this.switchView('grid'),
    }));

    // ---------- 滚动区 ----------
    const listTop = segY + 30 + 8;
    const listBottom = H - director.safeBottom - 12;
    const scrollW = barW - 8;
    this.contentW = scrollW - 16;
    this.scroll = this.root.addChild(new ScrollView({
      width: scrollW, height: Math.max(120, listBottom - listTop),
      x: W / 2, y: listTop,
    }));
    this.scroll.anchorY = 0;

    this.buildContent();

    // 首页底部 banner（审核期或未配置广告位时自动跳过）
    if (CONFIG.enableBanner) {
      getPlatform().showBanner(bannerAdUnit(), 4);
    }

    // 首次启动（无进度且未看过引导）弹新手引导
    if (this.progress.cleared.length === 0 && !readFlag(getOnboardingKey())) {
      const ob = this.root.addChild(new OnboardingModal(this.W, this.H, () => writeFlag(getOnboardingKey())));
      ob.layout(this.W, this.H);
      ob.popIn();
    }
  }

  private switchView(v: 'ladder' | 'grid'): void {
    if (this.view === v) return;
    this.view = v;
    this.tabLadder.setActive(v === 'ladder');
    this.tabGrid.setActive(v === 'grid');
    this.buildContent();

  }

  private buildContent(): void {
    this.scroll.content.removeAllChildren();
    if (this.view === 'ladder') this.buildLadder();
    else this.buildGrid();
    // 滚动到当前进度
    const nextId = Math.min(this.progress.cleared.length + 1, DEFAULT_LEVELS.length);
    const rowH = this.view === 'ladder' ? 54 : 76;
    const target = Math.floor((nextId - 1) / (this.view === 'ladder' ? 1 : 5)) * rowH;
    this.scroll.scrollTo(Math.max(0, target - 120));
  }

  /** 天梯：左侧藤蔓主干 + 圆形节点 + 右侧信息 */
  private buildLadder(): void {
    const w = this.contentW;
    const rowH = 54;
    let y = 8;
    let lastChapter = 0;

    for (const level of DEFAULT_LEVELS) {
      const flower = getFlowerForLevel(level.id);
      if (flower.chapter !== lastChapter) {
        lastChapter = flower.chapter;
        this.scroll.content.addChild(new Label({
          text: `${flower.chapterName}`, fontSize: 11, bold: true, color: '#0f766e',
          x: 12, y: y + 8, maxWidth: w - 24,
        })).anchorX = 0;
        y += 24;
      }

      const unlocked = level.id <= this.progress.cleared.length + 1;
      const cleared = this.progress.cleared.includes(level.id);
      const stars = getStarsForRecord(this.progress.best[level.id], level, cleared);

      // 藤蔓主干连线
      this.scroll.content.addChild(new Panel({
        width: 2, height: rowH - 8, x: 26, y: y + rowH / 2 - 4,
        fill: unlocked ? 'rgba(13,148,136,0.35)' : 'rgba(148,163,184,0.3)',
        borderColor: null, borderWidth: 0, radius: 1,
      }));

      const node = this.scroll.content.addChild(new Panel({
        width: 30, height: 30, radius: 15, x: 26, y: y + rowH / 2,
        fill: cleared
          ? ['#0d9488', '#0f766e']
          : unlocked
            ? [Theme.panelBgTop, Theme.panelBgBottom]
            : ['rgba(226,232,240,0.95)', 'rgba(226,232,240,0.95)'],
        borderColor: cleared ? '#0b6b60' : unlocked ? '#34d399' : '#cbd5e1',
      }));
      node.addChild(new Label({
        text: unlocked ? String(level.id) : '🔒',
        fontSize: unlocked ? 11 : 9, bold: true, align: 'center',
        color: cleared ? '#ffffff' : unlocked ? Theme.textPrimary : '#94a3b8',
        x: 15, y: 15,
      }));

      // 信息行（可点击）
      const row = this.scroll.content.addChild(new Panel({
        width: w - 52, height: rowH - 10, radius: 10,
        x: 26 + 22 + (w - 52) / 2, y: y + rowH / 2,
        fill: unlocked
          ? cleared
            ? ['rgba(240,253,244,0.95)', 'rgba(220,246,232,0.95)']
            : [Theme.panelBgTop, Theme.panelBgBottom]
          : ['rgba(240,244,246,0.8)', 'rgba(232,238,241,0.8)'],
        borderColor: unlocked ? (cleared ? '#6ee7b7' : Theme.panelBorder) : '#e2e8f0',
      }));
      row.touchable = unlocked;
      row.onTap = () => {
        if (unlocked) this.cbs.onOpenLevel(level.id);
      };

      row.addChild(new Label({
        text: unlocked ? level.title : '尚未开启',
        fontSize: 12, bold: true,
        color: unlocked ? Theme.textPrimary : '#94a3b8',
        x: 10, y: 14,
      })).anchorX = 0;
      row.addChild(new Label({
        text: unlocked ? `${flower.name} · ${flower.alias}` : '通关后唤醒此花',
        fontSize: 9, color: unlocked ? Theme.textSecondary : '#a8b6c3',
        x: 10, y: 30,
      })).anchorX = 0;

      if (cleared) {
        row.addChild(new Label({
          text: '★'.repeat(Math.max(1, stars)) + `  ${this.progress.best[level.id] ?? ''}步`,
          fontSize: 9, color: '#f59e0b', align: 'right', x: w - 62, y: 20,
        }));
      } else if (unlocked) {
        row.addChild(new Label({
          text: '可挑战', fontSize: 9, color: '#0d9488', align: 'right', x: w - 62, y: 20,
        }));
      }

      y += rowH;
    }

    this.scroll.content.height = y + 8;
  }

  /** 网格：5 列紧凑选关 */
  private buildGrid(): void {
    const w = this.contentW;
    const COLS = 5;
    const GAP = 8;
    const cellW = (w - GAP * (COLS - 1)) / COLS;
    const cellH = cellW + 16;
    const rowH = cellH + GAP;

    DEFAULT_LEVELS.forEach((level, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const unlocked = level.id <= this.progress.cleared.length + 1;
      const cleared = this.progress.cleared.includes(level.id);
      const stars = getStarsForRecord(this.progress.best[level.id], level, cleared);

      const cell = this.scroll.content.addChild(new Panel({
        width: cellW, height: cellH, radius: 10,
        x: col * (cellW + GAP) + cellW / 2,
        y: 8 + row * rowH + cellH / 2,
        fill: unlocked
          ? cleared
            ? ['rgba(209,250,229,0.95)', 'rgba(167,243,208,0.95)']
            : [Theme.panelBgTop, Theme.panelBgBottom]
          : ['rgba(226,232,240,0.7)', 'rgba(226,232,240,0.7)'],
        borderColor: unlocked ? (cleared ? '#34d399' : Theme.panelBorder) : '#cbd5e1',
      }));
      cell.touchable = unlocked;
      cell.onTap = () => {
        if (unlocked) this.cbs.onOpenLevel(level.id);
      };
      cell.addChild(new Label({
        text: unlocked ? String(level.id) : '🔒',
        fontSize: 14, bold: true, align: 'center',
        color: unlocked ? (cleared ? '#065f46' : Theme.textPrimary) : '#94a3b8',
        x: cellW / 2, y: cellH / 2 - 7,
      }));
      cell.addChild(new Label({
        text: cleared ? '★'.repeat(Math.max(1, stars)) : unlocked ? '可挑战' : '',
        fontSize: 8, align: 'center', color: cleared ? '#f59e0b' : '#0d9488',
        x: cellW / 2, y: cellH - 10,
      }));
    });

    const rows = Math.ceil(DEFAULT_LEVELS.length / COLS);
    this.scroll.content.height = 8 + rows * rowH + 8;
  }
}

/** 供 Node 复用的空节点导出（避免 tree-shaking 误删） */
export const __homeNode = Node;
