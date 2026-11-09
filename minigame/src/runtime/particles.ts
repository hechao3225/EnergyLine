/**
 * 轻量粒子系统：水花 / 五彩纸屑 / 升腾光珠。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Node } from './node';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  size: number;
  color: string;
  alpha: number;
  decay: number; // alpha 每秒衰减
  age: number;
  life: number; // 秒
  rect: boolean; // 纸屑矩形 / 圆形光珠
  spin: number;
  rot: number;
}

export class ParticleSystem extends Node {
  private particles: Particle[] = [];

  spawn(p: Partial<Particle> & { x: number; y: number }): void {
    this.particles.push({
      x: p.x,
      y: p.y,
      vx: p.vx ?? 0,
      vy: p.vy ?? 0,
      ax: p.ax ?? 0,
      ay: p.ay ?? 200,
      size: p.size ?? 4,
      color: p.color ?? '#38bdf8',
      alpha: p.alpha ?? 1,
      decay: p.decay ?? 1,
      age: 0,
      life: p.life ?? 1,
      rect: p.rect ?? false,
      spin: p.spin ?? 0,
      rot: p.rot ?? 0,
    });
  }

  /** 胜利五彩纸屑（自 H5 canvas-confetti 语义复刻） */
  confetti(w: number, count = 90): void {
    const colors = ['#0d9488', '#38bdf8', '#34d399', '#fef08a', '#f472b6', '#a78bfa', '#fbbf24'];
    for (let i = 0; i < count; i++) {
      const px = w / 2 + (Math.random() - 0.5) * w * 0.3;
      this.spawn({
        x: px,
        y: 0,
        vx: (Math.random() - 0.5) * 300,
        vy: -(120 + Math.random() * 320),
        ax: (Math.random() - 0.5) * 120,
        ay: 420,
        size: 5 + Math.random() * 5,
        color: colors[i % colors.length],
        decay: 0.55,
        life: 2.4,
        rect: true,
        spin: (Math.random() - 0.5) * 720,
      });
    }
  }

  /** 管道接通水花 */
  splash(x: number, y: number, count = 10): void {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 90;
      this.spawn({
        x,
        y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed - 40,
        size: 2 + Math.random() * 2.5,
        color: Math.random() > 0.4 ? '#38bdf8' : '#67e8f9',
        decay: 1.8,
        life: 0.8,
      });
    }
  }

  /** 通关后升向树冠的灵泉水珠 */
  riseOrb(x: number, y: number): void {
    this.spawn({
      x,
      y,
      vx: (Math.random() - 0.5) * 26,
      vy: -58 - Math.random() * 30,
      ax: 0,
      ay: -8,
      size: 5 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#38bdf8' : '#34d399',
      decay: 0.42,
      life: 2.2,
    });
  }

  clear(): void {
    this.particles.length = 0;
  }

  get count(): number {
    return this.particles.length;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    for (const p of this.particles) {
      if (p.alpha <= 0) continue;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.fillStyle = p.color;
      if (p.rect) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  constructor() {
    super();
    this.anchorX = 0;
    this.anchorY = 0;
    this.onUpdate = (dt: number) => {
      const s = dt / 1000;
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.age += s;
        if (p.age >= p.life || p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        p.vx += p.ax * s;
        p.vy += p.ay * s;
        p.x += p.vx * s;
        p.y += p.vy * s;
        p.rot += p.spin * s;
        p.alpha -= p.decay * s;
      }
    };
  }
}
