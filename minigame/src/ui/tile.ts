/**
 * TileSprite：H5 TileView 的 Canvas 2D 复刻。
 * SVG 描边（viewBox 0 0 80 80）→ Path2D + 分层 stroke；虚线活水用逐帧 lineDashOffset。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Node } from '../runtime/node';
import { tween, killTweensOf, Ease } from '../runtime/tween';
import { getImage } from '../runtime/assets';
import { Theme } from '../runtime/theme';
import { Direction, Tile } from '../types/game';
import { getTilePorts } from '../logic/circuit';

// TileView 颜色令牌
const GROOVE = '#223328';
const PIPE_UNPOWERED = '#3a5043';
const PIPE_POWERED = '#0d9488';
const WATER_CORE = '#38bdf8';
const RIVET_UNPOWERED = '#c8d9cc';
const RIVET_POWERED = '#fef08a';

const V = 80; // SVG 坐标空间边长

export type TileAction = 'rotate' | 'toggle-switch';

export interface TileSpriteOpts {
  tile: Tile;
  isPowered: boolean;
  isLit: boolean;
  interactive: boolean;
  levelId: number;
  onTap: (tile: Tile, action: TileAction) => void;
  onPeekStart?: () => void;
  onPeekEnd?: () => void;
}

export class TileSprite extends Node {
  tile: Tile;
  isPowered: boolean;
  isLit: boolean;
  isPeekActive: boolean;
  interactive: boolean;
  levelId: number;

  private onTapCb: (tile: Tile, action: TileAction) => void;
  private onPeekStart?: () => void;
  private onPeekEnd?: () => void;

  constructor(opts: TileSpriteOpts) {
    super();
    this.tile = opts.tile;
    this.isPowered = opts.isPowered;
    this.isLit = opts.isLit;
    this.interactive = opts.interactive;
    this.levelId = opts.levelId;
    this.isPeekActive = false;
    this.onTapCb = opts.onTap;
    this.onPeekStart = opts.onPeekStart;
    this.onPeekEnd = opts.onPeekEnd;
    this.touchable = true;
    this.rotation = opts.tile.rotation;
    this.anchorX = 0.5;
    this.anchorY = 0.5;

    this.onTap = (p) => {
      if (!this.isInteractiveTile) return;
      if (this.tile.type === 'switch') {
        // 中心 56% 区域 → 切换通断；外圈 → 旋转（对应 H5 的中心按钮 + 角落旋转把手）
        const cx = this.width / 2;
        const cy = this.height / 2;
        const half = this.width * 0.28;
        const inCenter = Math.abs(p.x - cx) <= half && Math.abs(p.y - cy) <= half;
        this.onTapCb(this.tile, inCenter ? 'toggle-switch' : 'rotate');
      } else {
        this.onTapCb(this.tile, 'rotate');
      }
    };

    this.onLongPress = () => {
      if (!this.isInteractiveTile) return;
      if (this.tile.type === 'switch') {
        this.onTapCb(this.tile, 'toggle-switch');
      } else {
        // 长按临时透视端口（对应 H5 onLongPressStart → peek）
        this.peekedByLongPress = true;
        this.onPeekStart?.();
      }
    };

    this.onPressEnd = () => {
      if (this.peekedByLongPress) {
        this.peekedByLongPress = false;
        this.onPeekEnd?.();
      }
    };
  }

  private peekedByLongPress = false;

  private get isInteractiveTile(): boolean {
    return this.interactive && !this.tile.locked && this.tile.type !== 'empty';
  }

  /** 累计角度变化 → 200ms ease-out 补间（对应 CSS transition 200ms） */
  syncRotation(): void {
    const target = this.tile.rotation;
    if (Math.abs(this.rotation - target) > 0.01) {
      killTweensOf(this as unknown as object);
      tween(this as unknown as object, { rotation: target }, 200, { ease: Ease.easeOutCubic });
    }
  }

  /** 开花弹入（对应 animate-in zoom-in-75 300ms） */
  bloomIn(): void {
    this.scaleX = 0.75;
    this.scaleY = 0.75;
    tween(this as unknown as object, { scaleX: 1, scaleY: 1 }, 300, { ease: Ease.easeOutBack });
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    const s = this.width / V;
    ctx.save();
    ctx.scale(s, s);

    const t = this.tile;
    if (t.type === 'empty') {
      ctx.fillStyle = 'rgba(6, 78, 59, 0.25)';
      ctx.beginPath();
      ctx.arc(40, 40, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (t.type === 'battery') {
      this.drawBattery(ctx);
      ctx.restore();
      return;
    }

    if (t.type === 'bulb') {
      // 旋转管道层不参与花苞绘制（花苞不可旋转）
      this.drawBulb(ctx);
      ctx.restore();
      return;
    }

    // 旋转管道类（在 node.rotation 变换下绘制）
    switch (t.type) {
      case 'line':
        this.drawLinePipe(ctx);
        break;
      case 'corner':
        this.drawCornerPipe(ctx);
        break;
      case 't_shape':
        this.drawTPipe(ctx);
        break;
      case 'cross':
        this.drawCrossPipe(ctx);
        break;
      case 'switch':
        this.drawSwitchPipe(ctx);
        break;
      case 'diode':
        this.drawDiodePipe(ctx);
        break;
    }

    if (this.isPeekActive) this.drawPeekPorts(ctx);
    ctx.restore();
  }

  // ---------- 基础描边工具 ----------
  private strokePath(ctx: CanvasRenderingContext2D, d: string, color: string, width: number, dash?: number[]): void {
    const p = new Path2D(d);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (dash) {
      ctx.setLineDash(dash);
      // 逐帧流动：30px/s（对应 H5 dash 动画 24px/0.8s）
      ctx.lineDashOffset = -((Date.now() * 0.03) % 24);
    }
    ctx.stroke(p);
    ctx.setLineDash([]);
  }

  private rivet(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    ctx.fillStyle = this.isPowered ? RIVET_POWERED : RIVET_UNPOWERED;
    ctx.strokeStyle = this.isPowered ? PIPE_POWERED : '#2d4036';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private get pipeColor(): string {
    return this.isPowered ? PIPE_POWERED : PIPE_UNPOWERED;
  }

  private waterLayer(ctx: CanvasRenderingContext2D, d: string): void {
    if (!this.isPowered) return;
    this.strokePath(ctx, d, WATER_CORE, 3.8, [6, 4]);
  }

  // ---------- 直管 ----------
  private drawLinePipe(ctx: CanvasRenderingContext2D): void {
    const d = 'M-5 40h90';
    this.strokePath(ctx, d, GROOVE, 15);
    this.strokePath(ctx, d, this.pipeColor, 10.5);
    this.waterLayer(ctx, d);
    this.rivet(ctx, 16, 40, 3.2);
    this.rivet(ctx, 64, 40, 3.2);
  }

  // ---------- 弯管 ----------
  private drawCornerPipe(ctx: CanvasRenderingContext2D): void {
    const d = 'M40 85V40h45';
    this.strokePath(ctx, d, GROOVE, 15);
    this.strokePath(ctx, d, this.pipeColor, 10.5);
    this.waterLayer(ctx, d);
    this.rivet(ctx, 40, 40, 3.8);
    this.rivet(ctx, 64, 40, 3.2);
    this.rivet(ctx, 40, 64, 3.2);
  }

  // ---------- 三通 ----------
  private drawTPipe(ctx: CanvasRenderingContext2D): void {
    const d = 'M-5 40h90 M40 40v45';
    this.strokePath(ctx, d, GROOVE, 15);
    this.strokePath(ctx, d, this.pipeColor, 10.5);
    this.waterLayer(ctx, d);
    this.rivet(ctx, 40, 40, 3.8);
    this.rivet(ctx, 16, 40, 3.2);
    this.rivet(ctx, 64, 40, 3.2);
    this.rivet(ctx, 40, 64, 3.2);
  }

  // ---------- 十字 ----------
  private drawCrossPipe(ctx: CanvasRenderingContext2D): void {
    const d = 'M-5 40h90 M40 -5v90';
    this.strokePath(ctx, d, GROOVE, 15);
    this.strokePath(ctx, d, this.pipeColor, 10.5);
    this.waterLayer(ctx, d);
    this.rivet(ctx, 40, 40, 4.2);
    this.rivet(ctx, 16, 40, 3.2);
    this.rivet(ctx, 64, 40, 3.2);
    this.rivet(ctx, 40, 16, 3.2);
    this.rivet(ctx, 40, 64, 3.2);
  }

  // ---------- 灵玉水闸 ----------
  private drawSwitchPipe(ctx: CanvasRenderingContext2D): void {
    const closed = this.tile.switchClosed !== false;
    const left = 'M-5 40h24';
    const right = 'M60 40h25';
    for (const d of [left, right]) {
      this.strokePath(ctx, d, GROOVE, 15);
      this.strokePath(ctx, d, this.pipeColor, 10.5);
    }

    // 闸门主体（开=旋转 45°，弹性补间在 updateSwitchPose）
    const img = getImage('assets/valve_switch.webp');
    if (img) {
      ctx.save();
      const targetRot = closed ? 0 : 45;
      const cur = this.switchPose;
      ctx.translate(40, 40);
      ctx.rotate((cur * Math.PI) / 180);
      ctx.translate(-40, -40);
      ctx.drawImage(img, 14, 14, 52, 52);
      if (cur !== targetRot) {
        const next = cur + (targetRot - cur) * 0.18;
        this.switchPose = Math.abs(targetRot - next) < 0.5 ? targetRot : next;
      }
      ctx.restore();
    }

    if (closed) {
      const d = 'M19 40h42';
      this.strokePath(ctx, d, this.isPowered ? PIPE_POWERED : PIPE_UNPOWERED, 7);
      if (this.isPowered) this.strokePath(ctx, d, WATER_CORE, 3.2, [4, 3]);
      // 翡翠激活封印
      ctx.fillStyle = '#10b981';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(40, 63, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      // 朱砂断流封条
      ctx.fillStyle = '#7f1d1d';
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(36, 27, 8, 26);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#fecdd3';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(40, 29);
      ctx.lineTo(40, 51);
      ctx.stroke();
      ctx.fillStyle = '#f43f5e';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(40, 63, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 通/断状态徽章
    ctx.fillStyle = closed ? 'rgba(5, 150, 105, 0.9)' : 'rgba(190, 18, 60, 0.9)';
    ctx.strokeStyle = closed ? '#6ee7b7' : '#fda4af';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(40, 40, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(closed ? '通' : '断', 40, 40.5);
  }

  private switchPose = 0;

  // ---------- 单向灵梭（二极管） ----------
  private drawDiodePipe(ctx: CanvasRenderingContext2D): void {
    const d = 'M-5 40h90';
    this.strokePath(ctx, d, GROOVE, 15);
    this.strokePath(ctx, d, this.pipeColor, 10.5);
    const img = getImage('assets/valve_diode.webp');
    if (img) ctx.drawImage(img, 12, 12, 56, 56);
    this.waterLayer(ctx, d);
  }

  // ---------- 灵泉之眼（电池） ----------
  private drawBattery(ctx: CanvasRenderingContext2D): void {
    const d = 'M50 40h35';
    this.strokePath(ctx, d, GROOVE, 15);
    this.strokePath(ctx, d, PIPE_POWERED, 10.5);
    this.strokePath(ctx, d, WATER_CORE, 3.8, [6, 4]);
    ctx.fillStyle = RIVET_POWERED;
    ctx.strokeStyle = PIPE_POWERED;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(70, 40, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const img = getImage('assets/spring_source.webp');
    if (img) ctx.drawImage(img, 8, 10, 60, 60);
  }

  // ---------- 花苞 / 盛放仙花 ----------
  private drawBulb(ctx: CanvasRenderingContext2D): void {
    // 玉坛光环
    const pulse = this.isLit ? 1 + 0.15 * Math.sin(Date.now() * 0.003) : 1;
    ctx.strokeStyle = this.isLit ? '#10b981' : '#6b8a76';
    ctx.lineWidth = 1.5;
    ctx.setLineDash(this.isLit ? [] : [4, 3]);
    ctx.beginPath();
    ctx.arc(40, 40, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (this.isLit) {
      // 外圈 ping 光环
      const t = (Date.now() * 0.001) % 3;
      const r = 30 + t * 4;
      ctx.strokeStyle = `rgba(52, 211, 153, ${Math.max(0, 0.5 * (1 - t / 3))})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(40, 40, r * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.beginPath();
      ctx.arc(40, 40, 28, 0, Math.PI * 2);
      ctx.fill();
    }

    const img = getImage(this.isLit ? 'assets/bulb_lit.webp' : 'assets/bulb_unlit.webp');
    if (img) {
      const size = this.isLit ? 70.4 : 57.6; // 88% / 72%
      const off = (80 - size) / 2;
      if (this.isLit) {
        ctx.save();
        ctx.shadowColor = Theme.emeraldLight;
        ctx.shadowBlur = 10;
        ctx.drawImage(img, off, off, size, size);
        ctx.restore();
      } else {
        ctx.globalAlpha = 0.95;
        ctx.drawImage(img, off, off, size, size);
        ctx.globalAlpha = 1;
      }
    }
  }

  // ---------- 透视端口指示 ----------
  private drawPeekPorts(ctx: CanvasRenderingContext2D): void {
    const ports = getTilePorts(this.tile);
    const dots: [number, number, number][] = [
      [40, 5, Direction.UP],
      [75, 40, Direction.RIGHT],
      [40, 75, Direction.DOWN],
      [5, 40, Direction.LEFT],
    ];
    for (const [x, y, dir] of dots) {
      if (ports & dir) {
        ctx.fillStyle = '#34d399';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  }
}
