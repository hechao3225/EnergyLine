/**
 * 抖音小游戏平台实现（tt.* 命名空间，API 面与微信大体对齐）。
 * M4 接入真实抖音工程时逐项核对该平台 API 差异。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Platform, PlatformName, RewardedResult, ShareOptions, SysInfo, TouchEventLike, TouchKind, TouchPoint } from './platform';

export class TtPlatform implements Platform {
  readonly name: PlatformName = 'douyin';
  private main: HTMLCanvasElement | null = null;
  private cachedSys: SysInfo | null = null;
  private banner: any = null;

  sysInfo(): SysInfo {
    if (this.cachedSys) return this.cachedSys;
    let info: any = {};
    try {
      info = typeof tt.getSystemInfoSync === 'function' ? tt.getSystemInfoSync() : {};
    } catch {
      info = {};
    }
    const safe = info.safeArea || {};
    const screenH = info.screenHeight || 667;
    this.cachedSys = {
      screenWidth: info.screenWidth || 375,
      screenHeight: screenH,
      pixelRatio: Math.min(info.pixelRatio || 2, 3),
      safeTop: safe.top || info.statusBarHeight || 20,
      safeBottom: Math.max(0, screenH - (safe.bottom || screenH)),
    };
    return this.cachedSys;
  }

  mainCanvas(): HTMLCanvasElement {
    if (!this.main) {
      this.main = tt.createCanvas() as unknown as HTMLCanvasElement;
    }
    return this.main;
  }

  createImage(): HTMLImageElement {
    return tt.createImage() as unknown as HTMLImageElement;
  }

  onTouch(cb: (e: TouchEventLike) => void): void {
    const map = (list: any[] | undefined): TouchPoint[] =>
      (list || []).map((t) => ({ id: t.identifier, x: t.clientX, y: t.clientY }));
    const wrap = (kind: TouchKind) => (e: any) => {
      cb({
        kind,
        touches: map(e.touches),
        changed: map(e.changedTouches),
        time: e.timeStamp || Date.now(),
      });
    };
    tt.onTouchStart(wrap('start'));
    tt.onTouchMove(wrap('move'));
    tt.onTouchEnd(wrap('end'));
    tt.onTouchCancel(wrap('cancel'));
  }

  getStorage(key: string): string | null {
    try {
      const v = tt.getStorageSync(key);
      if (v === '' || v === undefined || v === null) return null;
      return String(v);
    } catch {
      return null;
    }
  }

  setStorage(key: string, value: string): void {
    try {
      tt.setStorageSync(key, value);
    } catch {
      // ignore
    }
  }

  vibrate(pattern: number | number[]): void {
    try {
      if (typeof pattern === 'number') {
        if (pattern >= 400) tt.vibrateLong({});
        else tt.vibrateShort({ type: pattern > 40 ? 'heavy' : 'light' });
        return;
      }
      let acc = 0;
      for (let i = 0; i < pattern.length; i += 2) {
        const dur = pattern[i];
        const delay = acc;
        setTimeout(() => {
          try {
            tt.vibrateShort({ type: dur > 40 ? 'heavy' : 'medium' });
          } catch {
            // ignore
          }
        }, delay);
        acc = delay + dur + (pattern[i + 1] || 0);
      }
    } catch {
      // ignore
    }
  }

  createAudioContext(): AudioContext | null {
    try {
      if (typeof tt.createWebAudioContext === 'function') {
        return tt.createWebAudioContext() as unknown as AudioContext;
      }
    } catch {
      // ignore
    }
    return null;
  }

  get supportsWebAudio(): boolean {
    return typeof tt !== 'undefined' && typeof tt.createWebAudioContext === 'function';
  }

  get supportsVibrate(): boolean {
    return true;
  }

  get supportsShare(): boolean {
    return typeof tt.shareAppMessage === 'function';
  }

  login(): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        tt.login({
          success: (res: { code?: string }) => resolve(res.code ?? null),
          fail: () => resolve(null),
        });
      } catch {
        resolve(null);
      }
    });
  }

  share(opts: ShareOptions): void {
    try {
      tt.shareAppMessage({
        title: opts.title,
        imageUrl: opts.imageUrl,
        query: opts.query,
        channel: 'video',
      });
    } catch {
      // ignore
    }
  }

  setShareInfo(opts: ShareOptions): void {
    try {
      tt.showShareMenu?.({});
      tt.onShareAppMessage?.(() => ({
        title: opts.title,
        imageUrl: opts.imageUrl,
        query: opts.query,
      }));
    } catch {
      // ignore
    }
  }

  showRewardedVideo(adUnitId: string): Promise<RewardedResult> {
    return new Promise((resolve) => {
      if (!adUnitId) {
        resolve({ status: 'unavailable', message: '未配置广告位 ID' });
        return;
      }
      try {
        const ad = tt.createRewardedVideoAd({ adUnitId });
        let settled = false;
        const finish = (r: RewardedResult): void => {
          if (settled) return;
          settled = true;
          ad.offClose?.(onClose);
          ad.offError?.(onError);
          resolve(r);
        };
        const onClose = (res: { isEnded?: boolean }): void => {
          finish({ status: res && res.isEnded ? 'rewarded' : 'closed' });
        };
        const onError = (err: { errMsg?: string }): void => {
          finish({ status: 'error', message: err?.errMsg ?? 'ad error' });
        };
        ad.onClose(onClose);
        ad.onError(onError);
        setTimeout(() => finish({ status: 'error', message: 'timeout' }), 12000);
        ad.show().catch(() => {
          ad.load()
            .then(() => ad.show())
            .catch((e: { errMsg?: string }) => finish({ status: 'error', message: e?.errMsg ?? 'load fail' }));
        });
      } catch (e) {
        resolve({ status: 'error', message: String(e) });
      }
    });
  }

  showBanner(adUnitId: string, bottomOffset = 0): void {
    if (!adUnitId) return;
    try {
      const sys = this.sysInfo();
      if (!this.banner) {
        const width = Math.min(sys.screenWidth - 20, 320);
        this.banner = tt.createBannerAd({
          adUnitId,
          style: { left: (sys.screenWidth - width) / 2, top: sys.screenHeight - 100 - bottomOffset, width },
        });
        this.banner.onError?.(() => {});
      }
      this.banner.show().catch(() => {});
    } catch {
      // ignore
    }
  }

  hideBanner(): void {
    try {
      this.banner?.hide?.();
    } catch {
      // ignore
    }
  }

  onShow(cb: () => void): void {
    try {
      tt.onShow(cb);
    } catch {
      // ignore
    }
  }

  onHide(cb: () => void): void {
    try {
      tt.onHide(cb);
    } catch {
      // ignore
    }
  }

  log(...args: unknown[]): void {
    console.log(...args);
  }
}
