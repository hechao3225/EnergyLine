/**
 * 新手引导（首次进入且无进度时弹出）：3 页，对应 H5 OnboardingGuide 的移动端要点。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Button, Label, Modal, Panel } from '../runtime/widgets';
import { Theme } from '../runtime/theme';
import { getFlowerForLevel } from '../logic/flowers';

interface Page {
  title: string;
  lines: string[];
  accent: string;
}

const PAGES: Page[] = [
  {
    title: '旋转水渠',
    lines: [
      '点击任意瓦片，水渠会顺时针旋转 90°。',
      '把相邻瓦片的端口两两对齐，连成一条不断的水脉。',
    ],
    accent: '🔄',
  },
  {
    title: '接通灵泉',
    lines: [
      '活水从泉眼出发，沿水脉流淌。',
      '让水流到每一朵仙花，全部点亮即可通关。',
    ],
    accent: '💧',
  },
  {
    title: '追求星级',
    lines: [
      '每次旋转消耗 1 步，步数用尽前要完成接通。',
      '步数越少星级越高，≤ 标准步数即可拿下 4★。',
    ],
    accent: '⭐',
  },
];

export class OnboardingModal extends Modal {
  private page = 0;
  private w: number;
  private dotsHost: Panel | null = null;
  private onDone: () => void;

  constructor(W: number, H: number, onDone: () => void) {
    const w = Math.min(W - 36, 340);
    super({
      width: w, height: 330, radius: 18,
      fill: ['rgba(250,253,249,0.995)', 'rgba(238,246,237,0.995)'],
    });
    this.w = w;
    this.onDone = onDone;
    void H;
    this.render();
  }

  private render(): void {
    const w = this.w;
    this.body.removeAllChildren();

    // 头部
    this.body.addChild(new Label({
      text: '新手引导', fontSize: 10, bold: true, color: '#0f766e',
      x: 16, y: 20,
    })).anchorX = 0;
    this.body.addChild(new Label({
      text: `第 1 关 · ${getFlowerForLevel(1).name}`, fontSize: 10, color: Theme.textSecondary,
      x: 68, y: 20,
    })).anchorX = 0;

    // 关闭
    this.body.addChild(new Button({
      text: '✕', width: 26, height: 26, radius: 8, fontSize: 11,
      x: w - 22, y: 20,
      onTap: () => this.finish(),
    }));

    // 主视觉块
    const hero = this.body.addChild(new Panel({
      width: w - 32, height: 96, radius: 14,
      x: w / 2, y: 76,
      fill: ['#124332', '#0b2f23'],
      borderColor: '#0f392a',
    }));
    const p = PAGES[this.page];
    hero.addChild(new Label({
      text: p.accent, fontSize: 30, align: 'center', x: (w - 32) / 2, y: 48,
    }));

    // 文案
    this.body.addChild(new Label({
      text: p.title, fontSize: 18, bold: true, color: '#0e2a1d',
      x: 20, y: 136,
    })).anchorX = 0;
    p.lines.forEach((line, i) => {
      this.body.addChild(new Label({
        text: line, fontSize: 11, color: Theme.textSecondary,
        x: 20, y: 160 + i * 22, maxWidth: w - 40,
      })).anchorX = 0;
    });

    // 进度点
    this.dotsHost = this.body.addChild(new Panel({
      width: w - 32, height: 12, radius: 0, x: w / 2, y: 226,
      fill: null, borderColor: null, borderWidth: 0,
    }));
    const dotGap = 12;
    const totalW = PAGES.length * dotGap;
    PAGES.forEach((_, i) => {
      this.dotsHost!.addChild(new Panel({
        width: i === this.page ? 12 : 6, height: 6, radius: 3,
        x: (w - 32) / 2 - totalW / 2 + i * dotGap + 6,
        y: 6,
        fill: i === this.page ? '#0d9488' : 'rgba(148,176,158,0.55)',
        borderColor: null, borderWidth: 0,
      }));
    });
    void this.dotsHost;

    // 按钮
    const isLast = this.page === PAGES.length - 1;
    const btnW = isLast ? w - 64 : (w - 76) / 2;
    if (!isLast) {
      this.body.addChild(new Button({
        text: '跳过', width: (w - 76) / 2, height: 40, radius: 12, fontSize: 12,
        x: w / 2 - (w - 68) / 4, y: 282,
        onTap: () => this.finish(),
      }));
    }
    this.body.addChild(new Button({
      text: isLast ? '开始引泉 ›' : '下一步 ›',
      width: btnW, height: 40, radius: 12, fontSize: 14, active: true,
      x: isLast ? w / 2 : w / 2 + (w - 68) / 4, y: 282,
      onTap: () => {
        if (isLast) this.finish();
        else {
          this.page += 1;
          this.render();
        }
      },
    }));

    // 点击遮罩不关闭（避免误触跳过引导）
    this.dim.onTap = () => {};
  }

  private finish(): void {
    this.onDone();
    this.removeFromParent();
  }
}
