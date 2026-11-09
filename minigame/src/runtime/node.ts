/**
 * 节点树基类：变换（位移/旋转/缩放/锚点/透明度）、递归绘制、命中测试。
 * @license SPDX-License-Identifier: Apache-2.0
 */

export interface Vec2 {
  x: number;
  y: number;
}

export class Node {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  /** 锚点（0..1，相对自身 width/height 的枢轴） */
  anchorX = 0.5;
  anchorY = 0.5;
  /** 旋转角度（度） */
  rotation = 0;
  scaleX = 1;
  scaleY = 1;
  alpha = 1;
  visible = true;
  /** 是否参与触摸命中 */
  touchable = false;
  /** 绘制子节点时是否裁剪到自身矩形（ScrollView 用） */
  clipChildren = false;

  parent: Node | null = null;
  readonly children: Node[] = [];

  // ---- 生命周期 & 输入钩子（坐标已转换为节点本地坐标） ----
  onUpdate: ((dt: number) => void) | null = null;
  onTap: ((p: Vec2) => void) | null = null;
  onLongPress: ((p: Vec2) => void) | null = null;
  onDragMove: ((dx: number, dy: number, p: Vec2) => void) | null = null;
  onPressStart: ((p: Vec2) => void) | null = null;
  onPressEnd: ((p: Vec2) => void) | null = null;

  addChild<T extends Node>(child: T): T {
    if (child.parent) child.parent.removeChild(child);
    child.parent = this;
    this.children.push(child);
    return child;
  }

  removeChild(child: Node): boolean {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parent = null;
      return true;
    }
    return false;
  }

  removeFromParent(): void {
    if (this.parent) this.parent.removeChild(this);
  }

  removeAllChildren(): void {
    for (const c of this.children) c.parent = null;
    this.children.length = 0;
  }

  /** 递归 update（子先父后不敏感，按加入顺序即可） */
  update(dt: number): void {
    if (this.onUpdate) this.onUpdate(dt);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update(dt);
    }
  }

  /** 递归绘制（含变换栈） */
  draw(ctx: CanvasRenderingContext2D, parentAlpha: number): void {
    if (!this.visible || this.alpha <= 0.001) return;
    const alpha = parentAlpha * this.alpha;
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.rotation) ctx.rotate((this.rotation * Math.PI) / 180);
    if (this.scaleX !== 1 || this.scaleY !== 1) ctx.scale(this.scaleX, this.scaleY);
    ctx.translate(-this.width * this.anchorX, -this.height * this.anchorY);
    ctx.globalAlpha = alpha;
    this.onDraw(ctx);

    if (this.clipChildren) {
      ctx.beginPath();
      ctx.rect(0, 0, this.width, this.height);
      ctx.clip();
    }
    for (const child of this.children) {
      child.draw(ctx, alpha);
    }
    ctx.restore();
  }

  protected onDraw(_ctx: CanvasRenderingContext2D): void {
    // 子类覆写
  }

  /** 世界坐标 → 本地坐标 */
  toLocal(px: number, py: number): Vec2 {
    let x = px;
    let y = py;
    const chain: Node[] = [];
    for (let n: Node | null = this; n; n = n.parent) chain.push(n);
    // 前向变换: S = pos + R(θ)·(scale·(p - anchor))；逆变换按相反顺序逐步展开：
    // 1) 减 pos  2) 逆旋转  3) 除 scale  4) 加 anchor 偏移
    for (let i = chain.length - 1; i >= 0; i--) {
      const n = chain[i];
      x -= n.x;
      y -= n.y;
      if (n.rotation) {
        const rad = (-n.rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const nx = x * cos - y * sin;
        const ny = x * sin + y * cos;
        x = nx;
        y = ny;
      }
      if (n.scaleX !== 1 || n.scaleY !== 1) {
        x /= n.scaleX;
        y /= n.scaleY;
      }
      x += n.width * n.anchorX;
      y += n.height * n.anchorY;
    }
    return { x, y };
  }

  /** 本地坐标 → 世界坐标（与 toLocal 互逆） */
  toWorld(lx: number, ly: number): Vec2 {
    const chain: Node[] = [];
    for (let n: Node | null = this; n; n = n.parent) chain.push(n);
    let x = lx;
    let y = ly;
    // 正向变换从最内层节点开始逐级向外：p = pos + R(θ)·(scale·(p - anchor))
    for (let i = 0; i < chain.length; i++) {
      const n = chain[i];
      x -= n.width * n.anchorX;
      y -= n.height * n.anchorY;
      if (n.scaleX !== 1 || n.scaleY !== 1) {
        x *= n.scaleX;
        y *= n.scaleY;
      }
      if (n.rotation) {
        const rad = (n.rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const nx = x * cos - y * sin;
        const ny = x * sin + y * cos;
        x = nx;
        y = ny;
      }
      x += n.x;
      y += n.y;
    }
    return { x, y };
  }

  /** 世界坐标下的矩形（轴对齐包围盒，考虑旋转/缩放） */
  worldRect(): { x: number; y: number; w: number; h: number } {
    const pts = [
      this.toWorld(0, 0),
      this.toWorld(this.width, 0),
      this.toWorld(0, this.height),
      this.toWorld(this.width, this.height),
    ];
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    return { x: minX, y: minY, w: Math.max(...xs) - minX, h: Math.max(...ys) - minY };
  }

  containsWorld(px: number, py: number): boolean {
    const l = this.toLocal(px, py);
    return l.x >= 0 && l.y >= 0 && l.x <= this.width && l.y <= this.height;
  }

  /** 深度优先命中最上层可触摸节点 */
  hitTest(px: number, py: number): Node | null {
    if (!this.visible) return null;
    for (let i = this.children.length - 1; i >= 0; i--) {
      const r = this.children[i].hitTest(px, py);
      if (r) return r;
    }
    if (!this.touchable) return null;
    return this.containsWorld(px, py) ? this : null;
  }

  /** 从命中节点向上冒泡，返回第一个挂了指定钩子的节点 */
  static bubble<T>(from: Node, pick: (n: Node) => T | null): T | null {
    for (let n: Node | null = from; n; n = n.parent) {
      const v = pick(n);
      if (v !== null && v !== undefined) return v;
    }
    return null;
  }

  // ---- 布局便捷 ----
  setPos(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }
  setSize(w: number, h: number): this {
    this.width = w;
    this.height = h;
    return this;
  }
}

/** 画圆角矩形路径（手动实现，兼容各小游戏宿主） */
export function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.arcTo(x + w, y, x + w, y + radius, radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
  ctx.lineTo(x + radius, y + h);
  ctx.arcTo(x, y + h, x, y + h - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}
