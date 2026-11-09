/**
 * CollectionScene：百花图鉴 / 荣誉殿堂（两个 tab 共用一套骨架）。
 * 对应 H5 的 FloraCompendiumModal 与 ProfileModal 成就列表。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Director, Scene } from '../runtime/director';
import { Label, Panel, ScrollView } from '../runtime/widgets';
import { Theme } from '../runtime/theme';
import { DEFAULT_LEVELS } from '../logic/data/defaultLevels';
import { loadProgress } from '../logic/progress';
import { getAllFlowers } from '../logic/flowers';
import { getDecoratedAchievements } from '../logic/achievements';
import { AppHeader, AppView, HEADER_HEIGHT } from './appHeader';

export interface CollectionCallbacks {
  onOpenLevel: (id: number) => void;
  onNav: (view: AppView) => void;
}

const RARITY_COLOR: Record<string, string> = {
  common: '#94a3b8',
  rare: '#38bdf8',
  epic: '#a855f7',
  legendary: '#f59e0b',
};

const RARITY_LABEL: Record<string, string> = {
  common: '凡品',
  rare: '珍品',
  epic: '灵品',
  legendary: '仙品',
};

export class CollectionScene extends Scene {
  constructor(director: Director, private view: 'flora' | 'achievements', private cbs: CollectionCallbacks) {
    super(director.W, director.H);
    const W = director.W;
    const H = director.H;
    const top = director.safeTop + 4;
    const barW = W - 20;
    const progress = loadProgress();

    this.root.addChild(new AppHeader({
      width: barW, x: 10, top, active: view,
      onNav: (v) => {
        if (v === view) return;
        this.cbs.onNav(v);
      },
    }));

    // 标题 + 进度
    const headY = top + HEADER_HEIGHT + 6;
    const isFlora = view === 'flora';
    const unlockedCount = isFlora
      ? progress.cleared.length
      : getDecoratedAchievements().filter((a) => a.unlockedAt).length;
    const total = isFlora ? getAllFlowers().length : getDecoratedAchievements().length;

    const head = this.root.addChild(new Panel({
      width: barW, height: 52, radius: 12,
      x: W / 2, y: headY + 26,
    }));
    head.addChild(new Label({
      text: isFlora ? '🌸 百花图鉴' : '🏆 荣誉殿堂',
      fontSize: 15, bold: true, color: '#0e2a1d', x: 14, y: 18,
    })).anchorX = 0;
    head.addChild(new Label({
      text: isFlora
        ? '每通一关，唤醒一朵仙花，收录其名与祝语'
        : '达成条件即可解锁徽章，记录你的引泉之道',
      fontSize: 9, color: Theme.textSecondary, x: 14, y: 35, maxWidth: barW - 100,
    })).anchorX = 0;
    head.addChild(new Label({
      text: `${unlockedCount}/${total}`,
      fontSize: 15, bold: true, color: '#0d9488', align: 'right', x: barW - 14, y: 26,
    }));

    // 列表
    const listTop = headY + 52 + 8;
    const listBottom = H - director.safeBottom - 12;
    const scrollW = barW - 8;
    const scroll = this.root.addChild(new ScrollView({
      width: scrollW, height: Math.max(120, listBottom - listTop),
      x: W / 2, y: listTop,
    }));
    scroll.anchorY = 0;
    const w = scrollW - 16;

    if (isFlora) {
      this.buildFlora(scroll, w, progress.cleared);
    } else {
      this.buildAchievements(scroll, w);
    }

  }

  private buildFlora(scroll: ScrollView, w: number, cleared: number[]): void {
    const flowers = getAllFlowers();
    const COLS = 2;
    const GAP = 8;
    const cardW = (w - GAP) / COLS;
    const cardH = 76;

    flowers.forEach((f, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const unlocked = cleared.includes(f.id);
      const color = RARITY_COLOR[f.rarity] ?? '#94a3b8';

      const card = scroll.content.addChild(new Panel({
        width: cardW, height: cardH, radius: 10,
        x: col * (cardW + GAP) + cardW / 2,
        y: 8 + row * (cardH + GAP) + cardH / 2,
        fill: unlocked
          ? [Theme.panelBgTop, Theme.panelBgBottom]
          : ['rgba(240,244,246,0.85)', 'rgba(232,238,241,0.85)'],
        borderColor: unlocked ? color : '#e2e8f0',
      }));

      // 花色圆点
      card.addChild(new Panel({
        width: 22, height: 22, radius: 11, x: 20, y: 22,
        fill: unlocked ? f.petalColor : 'rgba(203,213,225,0.9)',
        borderColor: unlocked ? f.glowColor : '#cbd5e1',
        borderWidth: 1.5,
      })).addChild(new Label({
        text: unlocked ? '🌸' : '·', fontSize: 10, align: 'center', x: 11, y: 11,
        color: unlocked ? '#ffffff' : '#94a3b8',
      }));

      card.addChild(new Label({
        text: unlocked ? f.name : '未唤醒',
        fontSize: 12, bold: true,
        color: unlocked ? '#1c2e27' : '#94a3b8',
        x: 36, y: 17,
      })).anchorX = 0;

      card.addChild(new Label({
        text: unlocked ? f.alias : `第 ${f.id} 关`,
        fontSize: 9, color: unlocked ? '#0d9488' : '#a8b6c3',
        x: 36, y: 32,
      })).anchorX = 0;

      card.addChild(new Label({
        text: unlocked ? f.blessing : '通关后收录',
        fontSize: 9, color: unlocked ? Theme.textSecondary : '#b6c2cd',
        x: 10, y: 56, maxWidth: cardW - 20,
      })).anchorX = 0;

      if (unlocked) {
        card.addChild(new Panel({
          width: 26, height: 13, radius: 6, x: cardW - 24, y: 16,
          fill: color, borderColor: null, borderWidth: 0,
        }));
        card.addChild(new Label({
          text: RARITY_LABEL[f.rarity] ?? '',
          fontSize: 8, color: '#ffffff', align: 'center', x: cardW - 24, y: 16,
        }));
      }
    });

    const rows = Math.ceil(flowers.length / COLS);
    scroll.content.height = 8 + rows * (cardH + GAP) + 8;
  }

  private buildAchievements(scroll: ScrollView, w: number): void {
    const list = getDecoratedAchievements();
    const rowH = 84;

    list.forEach((a, i) => {
      const unlocked = !!a.unlockedAt;
      const color = RARITY_COLOR[a.rarity] ?? '#94a3b8';

      const card = scroll.content.addChild(new Panel({
        width: w, height: rowH - 8, radius: 12,
        x: w / 2, y: 8 + i * rowH + (rowH - 8) / 2,
        fill: unlocked
          ? ['rgba(254,252,232,0.95)', 'rgba(254,243,199,0.95)']
          : [Theme.panelBgTop, Theme.panelBgBottom],
        borderColor: unlocked ? color : Theme.panelBorder,
      }));

      card.addChild(new Panel({
        width: 34, height: 34, radius: 10, x: 24, y: 26,
        fill: unlocked ? ['#fbbf24', '#d97706'] : ['#e2e8f0', '#cbd5e1'],
        borderColor: unlocked ? '#b45309' : '#cbd5e1',
      })).addChild(new Label({
        text: unlocked ? (a.icon || '🏆') : '🔒', fontSize: 14, align: 'center', x: 17, y: 17,
      }));

      card.addChild(new Label({
        text: a.title, fontSize: 12, bold: true,
        color: unlocked ? '#78350f' : Theme.textPrimary,
        x: 50, y: 18,
      })).anchorX = 0;

      card.addChild(new Label({
        text: a.description, fontSize: 9, color: Theme.textSecondary,
        x: 50, y: 34, maxWidth: w - 64,
      })).anchorX = 0;

      // 进度条
      const pct = a.progress ? Math.max(0, Math.min(1, a.progress.percent / 100)) : unlocked ? 1 : 0;
      const pw = w - 64;
      card.addChild(new Panel({
        width: pw, height: 5, radius: 3, x: 50 + pw / 2, y: 50,
        fill: 'rgba(203,213,225,0.8)', borderColor: null, borderWidth: 0,
      }));
      if (pct > 0) {
        card.addChild(new Panel({
          width: Math.max(4, pw * pct), height: 5, radius: 3, x: 50 + Math.max(4, pw * pct) / 2, y: 50,
          fill: unlocked ? '#d97706' : '#0d9488', borderColor: null, borderWidth: 0,
        }));
      }

      card.addChild(new Label({
        text: a.progress ? `${a.progress.label}` : unlocked ? '已达成' : a.hint,
        fontSize: 8, color: unlocked ? '#b45309' : Theme.textHint,
        x: 50, y: 62, maxWidth: w - 64,
      })).anchorX = 0;

      card.addChild(new Label({
        text: RARITY_LABEL[a.rarity] ?? '',
        fontSize: 8, color: color, align: 'right', x: w - 12, y: 18,
      }));
    });

    scroll.content.height = 8 + list.length * rowH + 8;
  }
}

/** 供外部使用的关卡总数（避免重复导入） */
export const TOTAL_LEVELS = DEFAULT_LEVELS.length;
