/**
 * Director：画布管理、场景栈、主循环、触摸事件分发（点击/长按/拖拽冒泡）。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Node, Vec2 } from './node';
import { stepTweens } from './tween';
import { Theme } from './theme';
import { Platform, SysInfo, TouchEventLike } from '../adapter/platform';
import { getPlatform } from '../adapter/platform';
import { getImage } from './assets';

export class Scene {
  readonly root: Node;
  onLoad: (() => void) | null = null;
  onShow: (() => void) | null = null;
  onHide: (() => void) | null = null;

  constructor(readonly W: number, readonly H: number) {
    this.root = new Node();
    this.root.width = W;
    this.root.height = H;
    this.root.anchorX = 0;
    this.root.anchorY = 0;
    this.root.x = 0;
    this.root.y = 0;
  }
}

interface ActiveTouch {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  startT: number;
  hit: Node | null;
  moved: boolean;
  longFired: boolean;
  timer: ReturnType<typeof setTimeout> | null;
}

const LONG_PRESS_MS = 400;
const MOVE_THRESHOLD = 12;

export class Director {
  private static _shared: Director | null = null;
  static get shared(): Director {
    if (!Director._shared) throw new Error('Director 未初始化');
    return Director._shared;
  }

  private platform: Platform;
  private ctx: CanvasRenderingContext2D;
  private scenes: Scene[] = [];
  private touch: ActiveTouch | null = null;
  private lastFrameT = 0;
  private running = false;

  W: number;
  H: number;
  dpr: number;
  safeTop: number;
  safeBottom: number;

  private constructor(canvas: HTMLCanvasElement, sys: SysInfo) {
    this.platform = getPlatform();
    this.W = sys.screenWidth;
    this.H = sys.screenHeight;
    this.dpr = sys.pixelRatio;
    this.safeTop = sys.safeTop;
    this.safeBottom = sys.safeBottom;

    canvas.width = Math.floor(this.W * this.dpr);
    canvas.height = Math.floor(this.H * this.dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('无法获取 2d 上下文');
    this.ctx = ctx;
    this.ctx.scale(this.dpr, this.dpr);

    this.platform.onTouch((e) => this.handleTouch(e));
  }

  static init(canvas: HTMLCanvasElement, sys: SysInfo): Director {
    if (!Director._shared) {
      Director._shared = new Director(canvas, sys);
    }
    return Director._shared;
  }

  get current(): Scene | null {
    return this.scenes.length > 0 ? this.scenes[this.scenes.length - 1] : null;
  }

  push(scene: Scene): void {
    if (this.current) {
      this.current.onHide?.();
      this.current.root.visible = false;
    }
    this.scenes.push(scene);
    scene.onLoad?.();
    scene.onShow?.();
  }

  replace(scene: Scene): void {
    this.pop();
    this.push(scene);
  }

  pop(): void {
    const top = this.scenes.pop();
    if (top) {
      top.onHide?.();
      top.root.removeAllChildren();
    }
    if (this.current) {
      this.current.root.visible = true;
      this.current.onShow?.();
    }
  }

  run(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrameT = Date.now();
    const loop = (): void => {
      const now = Date.now();
      const dt = Math.min(50, now - this.lastFrameT);
      this.lastFrameT = now;
      this.step(dt);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private step(dt: number): void {
    stepTweens(dt);
    const scene = this.current;
    if (scene) {
      scene.root.update(dt);
      this.render(scene);
    }
  }

  private render(scene: Scene): void {
    const ctx = this.ctx;
    const bg = getImage('assets/bg_main.webp');
    if (bg && bg.width > 0) {
      // 底图按 cover 铺满（H5 的 fixed 背景）
      const scale = Math.max(this.W / bg.width, this.H / bg.height);
      const dw = bg.width * scale;
      const dh = bg.height * scale;
      ctx.drawImage(bg, (this.W - dw) / 2, (this.H - dh) / 2, dw, dh);
      // 叠一层浅色蒙版，保证前景文字可读
      ctx.fillStyle = 'rgba(245,248,242,0.55)';
      ctx.fillRect(0, 0, this.W, this.H);
    } else {
      // 页面背景渐变（底图未就绪时的兜底）
      const g = ctx.createLinearGradient(0, 0, 0, this.H);
      g.addColorStop(0, Theme.bgTop);
      g.addColorStop(0.5, Theme.bgMid);
      g.addColorStop(1, Theme.bgBottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.W, this.H);
    }
    scene.root.draw(ctx, 1);
  }

  // ---------------- 输入分发 ----------------
  private handleTouch(e: TouchEventLike): void {
    const scene = this.current;
    if (!scene) return;

    switch (e.kind) {
      case 'start': {
        if (this.touch) return; // 单指模型
        const p = e.changed[0];
        if (!p) return;
        const hit = scene.root.hitTest(p.x, p.y);
        this.touch = {
          id: p.id,
          startX: p.x,
          startY: p.y,
          lastX: p.x,
          lastY: p.y,
          startT: Date.now(),
          hit,
          moved: false,
          longFired: false,
          timer: null,
        };
        if (hit) {
          const local = hit.toLocal(p.x, p.y);
          this.fireChain(hit, 'onPressStart', local);
          // 长按定时器
          this.touch.timer = setTimeout(() => {
            const t = this.touch;
            if (!t || t.moved || t.longFired || t.hit !== hit) return;
            t.longFired = true;
            const lp = Node.bubble(hit, (n) => n.onLongPress);
            if (lp) {
              const target = this.chainNodeWith(hit, (n) => n.onLongPress);
              if (target) lp(target.toLocal(t.lastX, t.lastY));
            }
          }, LONG_PRESS_MS);
        }
        break;
      }
      case 'move': {
        const t = this.touch;
        if (!t) return;
        const p = e.touches.find((tp) => tp.id === t.id) || e.changed[0];
        if (!p) return;
        const dx = p.x - t.lastX;
        const dy = p.y - t.lastY;
        t.lastX = p.x;
        t.lastY = p.y;
        if (!t.moved && Math.hypot(p.x - t.startX, p.y - t.startY) > MOVE_THRESHOLD) {
          t.moved = true;
          if (t.timer) clearTimeout(t.timer);
        }
        if (t.moved && t.hit) {
          // 拖拽事件向命中节点及其祖先冒泡（ScrollView 等）
          for (let n: Node | null = t.hit; n; n = n.parent) {
            if (n.onDragMove) {
              n.onDragMove(dx, dy, n.toLocal(p.x, p.y));
            }
          }
        }
        break;
      }
      case 'end':
      case 'cancel': {
        const t = this.touch;
        if (!t) return;
        this.touch = null;
        if (t.timer) clearTimeout(t.timer);
        const hit = t.hit;
        if (!hit) return;
        const local = hit.toLocal(t.lastX, t.lastY);
        this.fireChain(hit, 'onPressEnd', local);

        const isCancel = e.kind === 'cancel';
        if (isCancel) return;

        if (!t.moved && !t.longFired) {
          // 点击：命中最深挂 onTap 的节点（向上冒泡第一个）
          const tapHandler = Node.bubble(hit, (n) => n.onTap);
          if (tapHandler) {
            const target = this.chainNodeWith(hit, (n) => n.onTap);
            if (target) tapHandler(target.toLocal(t.lastX, t.lastY));
          }
        }
        break;
      }
    }
  }

  private chainNodeWith(from: Node, pick: (n: Node) => unknown): Node | null {
    for (let n: Node | null = from; n; n = n.parent) {
      if (pick(n)) return n;
    }
    return null;
  }

  private fireChain(from: Node, event: 'onPressStart' | 'onPressEnd', p: Vec2): void {
    for (let n: Node | null = from; n; n = n.parent) {
      const cb = n[event];
      if (cb) cb(p);
    }
  }
}
