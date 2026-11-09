/**
 * 平台抽象层：统一封装 微信小游戏(wx) / 抖音小游戏(tt) / 浏览器(开发调试) 三端差异。
 * 运行时探测宿主；Node 单测通过 setPlatform() 注入内存实现。
 */

export type PlatformName = 'wechat' | 'douyin' | 'web';

export interface SysInfo {
  screenWidth: number;    // 逻辑像素宽
  screenHeight: number;   // 逻辑像素高
  pixelRatio: number;     // 设备像素比
  safeTop: number;        // 顶部安全区（状态栏）高度 px
  safeBottom: number;     // 底部安全区高度 px
}

export interface TouchPoint {
  id: number;
  x: number;              // 逻辑像素坐标（与主画布逻辑坐标系一致）
  y: number;
}

export type TouchKind = 'start' | 'move' | 'end' | 'cancel';

export interface TouchEventLike {
  kind: TouchKind;
  touches: TouchPoint[];   // 当前所有触点
  changed: TouchPoint[];   // 本次事件变更的触点
  time: number;
}

export interface Platform {
  readonly name: PlatformName;
  readonly supportsWebAudio: boolean;
  readonly supportsVibrate: boolean;
  readonly supportsShare: boolean;

  sysInfo(): SysInfo;

  /** 主（上屏）画布。微信中首次 createCanvas 返回上屏画布，实现内缓存。 */
  mainCanvas(): HTMLCanvasElement;

  /** 创建图片对象（微信 wx.createImage / 浏览器 new Image()）。 */
  createImage(): HTMLImageElement;

  /** 注册触摸回调（start/move/end/cancel 四类都会派发）。 */
  onTouch(cb: (e: TouchEventLike) => void): void;

  getStorage(key: string): string | null;
  setStorage(key: string, value: string): void;

  /** 震动。number: 单次毫秒; number[]: [震,停,震,停...] 交替模式。 */
  vibrate(pattern: number | number[]): void;

  createAudioContext(): AudioContext | null;

  // ---------- 小游戏平台能力（浏览器端为安全空实现） ----------

  /** 静默登录，返回 code（需服务端换取 openid；无后端时返回 null）。 */
  login(): Promise<string | null>;

  /** 主动分享（右上角菜单分享由 onShareAppMessage 处理）。 */
  share(opts: ShareOptions): void;

  /** 注册右上角菜单分享内容 */
  setShareInfo(opts: ShareOptions): void;

  /** 激励视频：返回是否应发放奖励 */
  showRewardedVideo(adUnitId: string): Promise<RewardedResult>;

  /** banner 广告（无广告位时静默跳过） */
  showBanner(adUnitId: string, bottomOffset?: number): void;
  hideBanner(): void;

  /** 前后台切换（用于暂停音频/计时） */
  onShow(cb: () => void): void;
  onHide(cb: () => void): void;

  log(...args: unknown[]): void;
}

export interface ShareOptions {
  title: string;
  imageUrl?: string;
  query?: string;
}

export type RewardedStatus = 'rewarded' | 'closed' | 'error' | 'unavailable';

export interface RewardedResult {
  status: RewardedStatus;
  /** 失败原因（便于日志排查） */
  message?: string;
}

import { WxPlatform } from './wx';
import { TtPlatform } from './tt';
import { BrowserPlatform } from './browser';

let current: Platform | null = null;

export function detectPlatform(): Platform {
  // 顺序很重要：先微信再抖音（宿主互不重叠，但保留扩展余地）
  if (typeof wx !== 'undefined' && wx && typeof wx.createCanvas === 'function') {
    return new WxPlatform();
  }
  if (typeof tt !== 'undefined' && tt && typeof tt.createCanvas === 'function') {
    return new TtPlatform();
  }
  return new BrowserPlatform();
}

export function getPlatform(): Platform {
  if (!current) current = detectPlatform();
  return current;
}

/** Node 单测注入内存平台用。 */
export function setPlatform(p: Platform): void {
  current = p;
}

export function resetPlatform(): void {
  current = null;
}
