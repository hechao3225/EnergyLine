/**
 * 基础控件：Label / Panel / Button / ImageView / ScrollView / Modal。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Node, roundRectPath } from './node';
import { Theme, fontStr } from './theme';
import { tween, killTweensOf } from './tween';
import { loadImage, getImage } from './assets';

// ---------------- Label ----------------
export class Label extends Node {
  text: string;
  fontSize: number;
  color: string;
  bold: boolean;
  align: 'left' | 'center' | 'right';
  lineHeight: number;
  /** >0 时按宽度换行（CJK 逐字断行） */
  maxWidth: number;

  constructor(opts: {
    text?: string;
    fontSize?: number;
    color?: string;
    bold?: boolean;
    align?: 'left' | 'center' | 'right';
    maxWidth?: number;
    x?: number;
    y?: number;
    lineHeight?: number;
  } = {}) {
    super();
    this.text = opts.text ?? '';
    this.fontSize = opts.fontSize ?? 14;
    this.color = opts.color ?? Theme.textPrimary;
    this.bold = opts.bold ?? false;
    this.align = opts.align ?? 'left';
    this.maxWidth = opts.maxWidth ?? 0;
    this.lineHeight = opts.lineHeight ?? 1.4;
    if (opts.x !== undefined) this.x = opts.x;
    if (opts.y !== undefined) this.y = opts.y;
    this.anchorX = this.align === 'center' ? 0.5 : this.align === 'right' ? 1 : 0;
    this.anchorY = 0.5;
  }

  private wrapLines(ctx: CanvasRenderingContext2D): string[] {
    if (this.maxWidth <= 0 || !this.text) return [this.text];
    const lines: string[] = [];
    let line = '';
    for (const ch of this.text) {
      if (ch === '\n') {
        lines.push(line);
        line = '';
        continue;
      }
      const test = line + ch;
      if (ctx.measureText(test).width > this.maxWidth && line.length > 0) {
        lines.push(line);
        line = ch;
      } else {
        line = test;
      }
    }
    lines.push(line);
    return lines;
  }

  /** 量测并更新自身尺寸（需要 ctx；可在 draw 前调用） */
  measure(ctx: CanvasRenderingContext2D): this {
    ctx.save();
    ctx.font = fontStr(this.fontSize, this.bold);
    const lines = this.wrapLines(ctx);
    this.width = Math.max(...lines.map((l) => ctx.measureText(l).width), 0);
    this.height = lines.length * this.fontSize * this.lineHeight;
    ctx.restore();
    return this;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    if (!this.text) return;
    ctx.font = fontStr(this.fontSize, this.bold);
    ctx.fillStyle = this.color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = this.align;
    const lines = this.wrapLines(ctx);
    if (this.maxWidth <= 0) {
      this.width = ctx.measureText(this.text).width;
    }
    this.height = lines.length * this.fontSize * this.lineHeight;
    const lh = this.fontSize * this.lineHeight;
    const baseY = this.height / 2 - lh / 2 + this.fontSize / 2;
    const tx = this.align === 'left' ? 0 : this.align === 'center' ? this.width / 2 : this.width;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], tx, baseY + i * lh);
    }
  }
}

// ---------------- Panel ----------------
export class Panel extends Node {
  /** 纯色或 [顶,底] 垂直渐变 */
  fill: string | [string, string] | null;
  borderColor: string | null;
  borderWidth: number;
  radius: number;

  constructor(opts: {
    width?: number;
    height?: number;
    fill?: string | [string, string] | null;
    borderColor?: string | null;
    borderWidth?: number;
    radius?: number;
    x?: number;
    y?: number;
  } = {}) {
    super();
    this.width = opts.width ?? 0;
    this.height = opts.height ?? 0;
    this.fill = opts.fill ?? [Theme.panelBgTop, Theme.panelBgBottom];
    this.borderColor = opts.borderColor ?? Theme.panelBorder;
    this.borderWidth = opts.borderWidth ?? 1;
    this.radius = opts.radius ?? 14;
    if (opts.x !== undefined) this.x = opts.x;
    if (opts.y !== undefined) this.y = opts.y;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    if (this.width <= 0 || this.height <= 0) return;
    roundRectPath(ctx, 0, 0, this.width, this.height, this.radius);
    if (this.fill) {
      if (Array.isArray(this.fill)) {
        const g = ctx.createLinearGradient(0, 0, 0, this.height);
        g.addColorStop(0, this.fill[0]);
        g.addColorStop(1, this.fill[1]);
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = this.fill;
      }
      ctx.fill();
    }
    if (this.borderColor && this.borderWidth > 0) {
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = this.borderWidth;
      ctx.stroke();
    }
  }
}

// ---------------- Button ----------------
export interface ButtonOpts {
  text: string;
  width?: number;
  height?: number;
  onTap?: () => void;
  active?: boolean;
  danger?: boolean;
  fontSize?: number;
  radius?: number;
  x?: number;
  y?: number;
  /** 左侧图标字符（如 ↻） */
  icon?: string;
}

export class Button extends Node {
  private panel: Panel;
  private label: Label;
  private cb: (() => void) | null;
  active: boolean;
  danger: boolean;
  pressScale = 0.94;

  constructor(opts: ButtonOpts) {
    super();
    this.width = opts.width ?? 120;
    this.height = opts.height ?? 44;
    this.active = opts.active ?? false;
    this.danger = opts.danger ?? false;
    this.cb = opts.onTap ?? null;
    this.touchable = true;
    if (opts.x !== undefined) this.x = opts.x;
    if (opts.y !== undefined) this.y = opts.y;

    // 子节点坐标以本节点「左上角」为原点，故底板需放到 (宽/2, 高/2) 才与命中区重合
    this.panel = this.addChild(new Panel({
      width: this.width,
      height: this.height,
      radius: opts.radius ?? 12,
      x: this.width / 2,
      y: this.height / 2,
    }));
    this.label = this.addChild(new Label({
      text: opts.icon ? `${opts.icon} ${opts.text}` : opts.text,
      fontSize: opts.fontSize ?? 14,
      bold: true,
      align: 'center',
      x: this.width / 2,
      y: this.height / 2,
    }));
    this.applyStyle();

    this.onPressStart = () => {
      killTweensOf(this);
      tween(this, { scaleX: this.pressScale, scaleY: this.pressScale }, 80);
    };
    this.onPressEnd = () => {
      killTweensOf(this);
      tween(this, { scaleX: 1, scaleY: 1 }, 140);
    };
    this.onTap = () => {
      if (this.cb) this.cb();
    };
  }

  setActive(active: boolean): this {
    this.active = active;
    this.applyStyle();
    return this;
  }

  setText(text: string): this {
    this.label.text = text;
    return this;
  }

  private applyStyle(): void {
    if (this.active) {
      this.panel.fill = [Theme.activeBgTop, Theme.activeBgBottom];
      this.panel.borderColor = Theme.activeBorder;
      this.label.color = Theme.activeText;
    } else if (this.danger) {
      this.panel.fill = [Theme.redLight, Theme.redLight];
      this.panel.borderColor = '#fca5a5';
      this.label.color = '#b91c1c';
    } else {
      this.panel.fill = [Theme.buttonBgTop, Theme.buttonBgBottom];
      this.panel.borderColor = Theme.buttonBorder;
      this.label.color = Theme.buttonText;
    }
  }
}

// ---------------- ImageView ----------------
export class ImageView extends Node {
  private srcPath: string | null = null;
  private img: HTMLImageElement | null = null;
  /** 'contain' 保持比例留白填充；'fill' 拉伸 */
  mode: 'contain' | 'fill';

  constructor(opts: { src?: string; width?: number; height?: number; mode?: 'contain' | 'fill'; x?: number; y?: number } = {}) {
    super();
    this.width = opts.width ?? 0;
    this.height = opts.height ?? 0;
    this.mode = opts.mode ?? 'contain';
    if (opts.x !== undefined) this.x = opts.x;
    if (opts.y !== undefined) this.y = opts.y;
    if (opts.src) this.setSrc(opts.src);
  }

  setSrc(path: string): this {
    this.srcPath = path;
    const hit = getImage(path);
    if (hit) {
      this.img = hit;
    } else {
      loadImage(path)
        .then((img) => {
          if (this.srcPath === path) this.img = img;
        })
        .catch((e) => console.warn(e.message));
    }
    return this;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    if (!this.img || this.width <= 0 || this.height <= 0) return;
    const iw = this.img.width || 1;
    const ih = this.img.height || 1;
    if (this.mode === 'fill') {
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
      return;
    }
    const scale = Math.min(this.width / iw, this.height / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(this.img, (this.width - dw) / 2, (this.height - dh) / 2, dw, dh);
  }
}

// ---------------- ProgressRing ----------------
/** 环形进度（地脉之根 已通关/总数） */
export class ProgressRing extends Node {
  /** 0..1 */
  progress = 0;
  color = '#0d9488';
  trackColor = 'rgba(148,176,158,0.45)';

  constructor(opts: { width?: number; height?: number; x?: number; y?: number } = {}) {
    super();
    this.width = opts.width ?? 26;
    this.height = opts.height ?? 26;
    if (opts.x !== undefined) this.x = opts.x;
    if (opts.y !== undefined) this.y = opts.y;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const r = Math.min(this.width, this.height) / 2 - 2;
    if (r <= 0) return;
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.trackColor;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const p = Math.max(0, Math.min(1, this.progress));
    if (p > 0) {
      ctx.strokeStyle = this.color;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
      ctx.stroke();
    }

    // 中心点
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ---------------- ScrollView ----------------
export class ScrollView extends Node {
  readonly content: Node;
  private offsetY = 0;
  private velocity = 0;
  private dragging = false;

  constructor(opts: { width?: number; height?: number; x?: number; y?: number } = {}) {
    super();
    this.width = opts.width ?? 0;
    this.height = opts.height ?? 0;
    this.touchable = true;
    this.clipChildren = true;
    if (opts.x !== undefined) this.x = opts.x;
    if (opts.y !== undefined) this.y = opts.y;

    this.content = new Node();
    this.content.width = this.width;
    this.content.height = 0;
    this.content.anchorY = 0;
    this.content.anchorX = 0;
    this.addChild(this.content);

    // 手指拖动 → 滚动（Director 将 move 事件冒泡到本节点）；同时追踪瞬时速度做惯性
    let lastMoveT = 0;
    this.onDragMove = (_dx: number, dy: number) => {
      this.dragging = true;
      const now = Date.now();
      const dt = Math.max(1, now - lastMoveT);
      if (dt < 120) this.velocity = (dy / dt) * 16.67;
      lastMoveT = now;
      this.applyDelta(dy);
    };
    this.onPressStart = () => {
      this.dragging = true;
      this.velocity = 0;
      lastMoveT = Date.now();
    };
    this.onPressEnd = () => {
      this.dragging = false;
    };

    this.onUpdate = (dt: number) => {
      if (!this.dragging && this.velocity !== 0) {
        // velocity 单位：px / 16.67ms 帧
        this.applyDelta((this.velocity * dt) / 16.67);
        this.velocity *= Math.pow(0.94, dt / 16.67);
        if (Math.abs(this.velocity) < 0.02) this.velocity = 0;
        // 边界回弹
        const max = this.maxScroll();
        if (this.offsetY > 0) {
          this.offsetY = Math.min(this.offsetY, 12 + this.offsetY * 0.1);
          this.velocity = 0;
          tween(this.content, { y: 0 }, 200);
          this.offsetY = 0;
        } else if (-this.offsetY > max) {
          this.offsetY = Math.max(this.offsetY, -(max + 12));
          this.velocity = 0;
          tween(this.content, { y: -max }, 200);
          this.offsetY = -max;
        }
      }
    };
  }

  private applyDelta(dy: number): void {
    // dy = 手指位移增量；内容跟随手指（dy>0 手指下移 → 内容下移）
    const max = this.maxScroll();
    let next = this.offsetY + dy;
    if (next > 0) next = Math.min(next, 24); // 顶部橡皮筋
    if (next < -max - 24) next = -max - 24;
    this.offsetY = next;
    this.content.y = this.offsetY;
  }

  maxScroll(): number {
    return Math.max(0, this.content.height - this.height);
  }

  scrollTo(top: number): void {
    const max = this.maxScroll();
    this.offsetY = Math.max(-max, Math.min(0, -top));
    this.content.y = this.offsetY;
  }
}

// ---------------- Modal ----------------
/** 全屏模态：遮罩层 + 居中主体面板 */
export class Modal extends Node {
  readonly dim: Panel;
  readonly body: Panel;
  /** 点击遮罩关闭回调 */
  onDismiss: (() => void) | null = null;

  constructor(opts: { width?: number; height?: number; radius?: number; fill?: [string, string] } = {}) {
    super();
    this.width = opts.width ?? 320;
    this.height = opts.height ?? 400;
    this.anchorX = 0.5;
    this.anchorY = 0.5;

    // 注意：Modal 自身锚点 0.5 且定位于屏幕中心，其子节点的局部原点因此是
    // 「弹窗左上角」。body 必须显式放到 (宽/2, 高/2) 才真正居中。
    this.dim = this.addChild(new Panel({ fill: 'rgba(6,20,14,0.45)', radius: 0, borderColor: null }));
    this.dim.anchorX = 0;
    this.dim.anchorY = 0;
    this.dim.touchable = true;
    this.dim.onTap = () => {
      if (this.onDismiss) this.onDismiss();
    };

    this.body = this.addChild(new Panel({
      width: this.width,
      height: this.height,
      radius: opts.radius ?? 18,
      fill: opts.fill ?? [Theme.panelBgTop, Theme.panelBgBottom],
      x: this.width / 2,
      y: this.height / 2,
    }));
  }

  /** 全屏布局（W/H 为屏幕逻辑尺寸） */
  layout(W: number, H: number): void {
    this.x = W / 2;
    this.y = H / 2;
    // 遮罩铺满全屏：局部原点 = 弹窗左上角，故左上角需外扩 (屏宽-弹窗宽)/2
    this.dim.width = W;
    this.dim.height = H;
    this.dim.x = -(W - this.width) / 2;
    this.dim.y = -(H - this.height) / 2;
  }

  /** 带缩放弹入动画 */
  popIn(): void {
    this.scaleX = 0.86;
    this.scaleY = 0.86;
    this.alpha = 0;
    tween(this, { scaleX: 1, scaleY: 1, alpha: 1 }, 180, { ease: undefined });
  }
}
