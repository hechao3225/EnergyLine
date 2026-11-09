/**
 * 微信小游戏平台实现。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Platform, PlatformName, RewardedResult, ShareOptions, SysInfo, TouchEventLike, TouchKind, TouchPoint } from './platform';

export class WxPlatform implements Platform {
  readonly name: PlatformName = 'wechat';
  private main: HTMLCanvasElement | null = null;
  private cachedSys: SysInfo | null = null;
  private banner: any = null;

  sysInfo(): SysInfo {
    if (this.cachedSys) return this.cachedSys;
    let info: any = {};
    try {
      info = typeof wx.getSystemInfoSync === 'function' ? wx.getSystemInfoSync() : {};
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
      // 微信约定：首次 wx.createCanvas() 返回上屏画布
      this.main = wx.createCanvas() as unknown as HTMLCanvasElement;
    }
    return this.main;
  }

  createImage(): HTMLImageElement {
    return wx.createImage() as unknown as HTMLImageElement;
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
    wx.onTouchStart(wrap('start'));
    wx.onTouchMove(wrap('move'));
    wx.onTouchEnd(wrap('end'));
    wx.onTouchCancel(wrap('cancel'));
  }

  getStorage(key: string): string | null {
    try {
      const v = wx.getStorageSync(key);
      if (v === '' || v === undefined || v === null) return null;
      return String(v);
    } catch {
      return null;
    }
  }

  setStorage(key: string, value: string): void {
    try {
      wx.setStorageSync(key, value);
    } catch {
      // ignore
    }
  }

  vibrate(pattern: number | number[]): void {
    try {
      if (typeof pattern === 'number') {
        if (pattern >= 400) wx.vibrateLong({});
        else wx.vibrateShort({ type: pattern > 40 ? 'heavy' : 'light' });
        return;
      }
      // 交替模式 [震,停,震,停...]
      let acc = 0;
      for (let i = 0; i < pattern.length; i += 2) {
        const dur = pattern[i];
        const delay = acc;
        setTimeout(() => {
          try {
            wx.vibrateShort({ type: dur > 40 ? 'heavy' : 'medium' });
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
      if (typeof wx.createWebAudioContext === 'function') {
        return wx.createWebAudioContext() as unknown as AudioContext;
      }
    } catch {
      // ignore
    }
    return null;
  }

  get supportsWebAudio(): boolean {
    return typeof wx !== 'undefined' && typeof wx.createWebAudioContext === 'function';
  }

  get supportsVibrate(): boolean {
    return true;
  }

  get supportsShare(): boolean {
    return typeof wx.shareAppMessage === 'function';
  }

  // ---------------- 登录 / 分享 / 广告 / 生命周期 ----------------

  login(): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        wx.login({
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
      wx.shareAppMessage({ title: opts.title, imageUrl: opts.imageUrl, query: opts.query });
    } catch {
      // ignore
    }
  }

  setShareInfo(opts: ShareOptions): void {
    try {
      wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] });
      wx.onShareAppMessage(() => ({
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
        const ad = wx.createRewardedVideoAd({ adUnitId });
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
        // 8s 兜底，避免广告拉取失败时卡住玩家
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
        this.banner = wx.createBannerAd({
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
      wx.onShow(cb);
    } catch {
      // ignore
    }
  }

  onHide(cb: () => void): void {
    try {
      wx.onHide(cb);
    } catch {
      // ignore
    }
  }

  log(...args: unknown[]): void {
    console.log(...args);
  }
}
