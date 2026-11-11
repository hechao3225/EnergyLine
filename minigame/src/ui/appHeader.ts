/**
 * AppHeader：全应用共用顶栏（徽章 + 标题 + 视图切换 + 音效）。
 * 对应 H5 GameHeader.tsx 的移动端形态。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Node } from '../runtime/node';
import { Button, Label, Panel } from '../runtime/widgets';
import { Theme } from '../runtime/theme';
import { sound } from '../logic/audio';

export type AppView = 'tree' | 'flora' | 'achievements';

export interface AppHeaderOpts {
  width: number;
  /** 顶栏左边缘 x */
  x?: number;
  /** 顶栏顶部 y（通常为 safeTop + 4） */
  top: number;
  active: AppView;
  onNav: (view: AppView) => void;
}

/** 顶栏可视高度 */
export const HEADER_HEIGHT = 40;

export class AppHeader extends Node {
  private soundBtn: Button;
  private muted = false;

  constructor(opts: AppHeaderOpts) {
    super();
    const W = opts.width;
    this.width = W;
    this.height = HEADER_HEIGHT;
    this.anchorX = 0;
    this.anchorY = 0;
    this.x = opts.x ?? 0;
    this.y = opts.top;

    // 背板
    this.addChild(new Panel({
      width: W, height: HEADER_HEIGHT, radius: 12,
      x: W / 2, y: HEADER_HEIGHT / 2,
      fill: ['rgba(248,251,247,0.88)', 'rgba(233,242,232,0.88)'],
      borderColor: 'rgba(168,195,178,0.9)',
    }));

    // 徽章（点击进花谱）
    const emblem = this.addChild(new Panel({
      width: 28, height: 28, radius: 9, x: 20, y: HEADER_HEIGHT / 2,
      fill: [Theme.activeBgTop, Theme.activeBgBottom], borderColor: '#0f392a',
    }));
    emblem.touchable = true;
    emblem.onTap = () => opts.onNav('flora');
    emblem.addChild(new Label({
      text: '🌸', fontSize: 13, align: 'center', x: 14, y: 14,
    }));

    // 标题
    this.addChild(new Label({
      text: '神树灵泉', fontSize: 15, bold: true, color: '#0e2a1d',
      x: 40, y: HEADER_HEIGHT / 2,
    })).anchorX = 0;

    // 右侧：音效 + 三个视图页签
    const soundX = W - 19;
    this.soundBtn = this.addChild(new Button({
      text: '🔊', width: 26, height: 26, radius: 8, fontSize: 12,
      x: soundX, y: HEADER_HEIGHT / 2,
      onTap: () => this.toggleSound(),
    }));

    const tabW = 46;
    const tabGap = 6;
    const tabY = HEADER_HEIGHT / 2;
    const achievementsX = soundX - 13 - 8 - tabW / 2;
    const floraX = achievementsX - tabW - tabGap;
    const treeX = floraX - tabW - tabGap;

    const mkTab = (label: string, view: AppView, x: number): Button => {
      const active = opts.active === view;
      const btn = this.addChild(new Button({
        text: label, width: tabW, height: 26, radius: 8, fontSize: 12,
        x, y: tabY, active,
        onTap: () => opts.onNav(view),
      }));
      return btn;
    };
    mkTab('神木', 'tree', treeX);
    mkTab('花谱', 'flora', floraX);
    mkTab('成就', 'achievements', achievementsX);
  }

  private toggleSound(): void {
    this.muted = !this.muted;
    sound.setMuted(this.muted);
    this.soundBtn.setText(this.muted ? '🔇' : '🔊');
    this.soundBtn.setActive(this.muted);
  }
}
