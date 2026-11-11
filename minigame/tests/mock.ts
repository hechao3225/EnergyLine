/**
 * Node 单测用内存平台。
 */
import { Platform, RewardedResult, ShareOptions, SysInfo, TouchEventLike } from '../src/adapter/platform';

export class MemoryPlatform implements Platform {
  readonly name = 'web' as const;
  readonly supportsWebAudio = false;
  readonly supportsVibrate = false;
  readonly supportsShare = false;
  private store = new Map<string, string>();

  sysInfo(): SysInfo {
    return { screenWidth: 375, screenHeight: 667, pixelRatio: 2, safeTop: 20, safeBottom: 0 };
  }
  mainCanvas(): HTMLCanvasElement {
    throw new Error('MemoryPlatform: no canvas');
  }
  createImage(): HTMLImageElement {
    throw new Error('MemoryPlatform: no image');
  }
  onTouch(_cb: (e: TouchEventLike) => void): void {
    // no-op
  }
  getStorage(key: string): string | null {
    return this.store.get(key) ?? null;
  }
  setStorage(key: string, value: string): void {
    this.store.set(key, value);
  }
  vibrate(_pattern: number | number[]): void {
    // no-op
  }
  createAudioContext(): AudioContext | null {
    return null;
  }
  login(): Promise<string | null> {
    return Promise.resolve(null);
  }
  share(_opts: ShareOptions): void {
    // no-op
  }
  setShareInfo(_opts: ShareOptions): void {
    // no-op
  }
  showRewardedVideo(_adUnitId: string): Promise<RewardedResult> {
    return Promise.resolve({ status: 'unavailable' });
  }
  showBanner(_adUnitId: string, _bottomOffset?: number): void {
    // no-op
  }
  hideBanner(): void {
    // no-op
  }
  onShow(_cb: () => void): void {
    // no-op
  }
  onHide(_cb: () => void): void {
    // no-op
  }
  log(...args: unknown[]): void {
    console.log(...args);
  }
}
