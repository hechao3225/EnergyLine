/**
 * 浏览器平台实现（开发调试 / Playwright 模拟玩家测试用）。
 * DOM 引用全部放在方法内部，保证该模块被一同打包进小游戏产物时不产生副作用。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Platform, PlatformName, RewardedResult, ShareOptions, SysInfo, TouchEventLike, TouchPoint } from './platform';

export class BrowserPlatform implements Platform {
  readonly name: PlatformName = 'web';
  private main: HTMLCanvasElement | null = null;

  sysInfo(): SysInfo {
    return {
      screenWidth: window.innerWidth || 375,
      screenHeight: window.innerHeight || 667,
      pixelRatio: window.devicePixelRatio || 1,
      safeTop: 0,
      safeBottom: 0,
    };
  }

  mainCanvas(): HTMLCanvasElement {
    if (!this.main) {
      this.main = document.getElementById('game') as HTMLCanvasElement;
    }
    return this.main;
  }

  createImage(): HTMLImageElement {
    return new Image();
  }

  onTouch(cb: (e: TouchEventLike) => void): void {
    const el = this.mainCanvas();
    const coords = (x: number, y: number): TouchPoint => {
      const rect = el.getBoundingClientRect();
      return { id: -1, x: x - rect.left, y: y - rect.top };
    };
    const map = (list: TouchList): TouchPoint[] => {
      const out: TouchPoint[] = [];
      const rect = el.getBoundingClientRect();
      for (let i = 0; i < list.length; i++) {
        const t = list.item(i)!;
        out.push({ id: t.identifier, x: t.clientX - rect.left, y: t.clientY - rect.top });
      }
      return out;
    };

    el.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        cb({ kind: 'start', touches: map(e.touches), changed: map(e.changedTouches), time: Date.now() });
      },
      { passive: false }
    );
    el.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        cb({ kind: 'move', touches: map(e.touches), changed: map(e.changedTouches), time: Date.now() });
      },
      { passive: false }
    );
    el.addEventListener(
      'touchend',
      (e) => {
        e.preventDefault();
        cb({ kind: 'end', touches: map(e.touches), changed: map(e.changedTouches), time: Date.now() });
      },
      { passive: false }
    );
    el.addEventListener(
      'touchcancel',
      (e) => {
        e.preventDefault();
        cb({ kind: 'cancel', touches: map(e.touches), changed: map(e.changedTouches), time: Date.now() });
      },
      { passive: false }
    );

    // 桌面鼠标兜底（单指模拟），便于开发时手动调试
    let mouseDown = false;
    el.addEventListener('mousedown', (e) => {
      mouseDown = true;
      const p = coords(e.clientX, e.clientY);
      cb({ kind: 'start', touches: [p], changed: [p], time: Date.now() });
    });
    el.addEventListener('mousemove', (e) => {
      if (!mouseDown) return;
      const p = coords(e.clientX, e.clientY);
      cb({ kind: 'move', touches: [p], changed: [p], time: Date.now() });
    });
    const end = (e: MouseEvent) => {
      if (!mouseDown) return;
      mouseDown = false;
      const p = coords(e.clientX, e.clientY);
      cb({ kind: 'end', touches: [p], changed: [p], time: Date.now() });
    };
    el.addEventListener('mouseup', end);
    el.addEventListener('mouseleave', end);
  }

  getStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  setStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }

  vibrate(pattern: number | number[]): void {
    try {
      if (navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch {
      // ignore
    }
  }

  createAudioContext(): AudioContext | null {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      return AC ? new AC() : null;
    } catch {
      return null;
    }
  }

  get supportsWebAudio(): boolean {
    return true;
  }

  get supportsVibrate(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  }

  get supportsShare(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  }

  login(): Promise<string | null> {
    // 浏览器无宿主登录，返回 null 走游客态
    return Promise.resolve(null);
  }

  share(opts: ShareOptions): void {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        void navigator.share({ title: opts.title, url: location.href }).catch(() => {});
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        void navigator.clipboard.writeText(`${opts.title} ${location.href}`).catch(() => {});
      }
    } catch {
      // ignore
    }
  }

  setShareInfo(_opts: ShareOptions): void {
    // 浏览器无右上角菜单
  }

  /** 开发环境模拟激励视频：仅在 window.__gameAdStub === true 时给奖励 */
  showRewardedVideo(_adUnitId: string): Promise<RewardedResult> {
    const stub = typeof window !== 'undefined' && (window as unknown as { __gameAdStub?: boolean }).__gameAdStub === true;
    if (!stub) {
      return Promise.resolve({ status: 'unavailable', message: '浏览器环境无广告位' });
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 'rewarded' }), 600);
    });
  }

  showBanner(_adUnitId: string, _bottomOffset?: number): void {
    // 浏览器不展示 banner
  }

  hideBanner(): void {
    // 浏览器不展示 banner
  }

  onShow(cb: () => void): void {
    try {
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) cb();
      });
    } catch {
      // ignore
    }
  }

  onHide(cb: () => void): void {
    try {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cb();
      });
    } catch {
      // ignore
    }
  }

  log(...args: unknown[]): void {
    console.log(...args);
  }
}
