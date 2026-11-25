/**
 * 激励视频广告桥。
 *
 * 主工程运行在三种壳里：安卓 Capacitor、桌面/手机浏览器、以及 vite 预览的网页包。
 * 三者只有「能不能放广告」不同，调用方不该看见差异，所以统一成一个
 * Promise<RewardedStatus>：任何异常都必须落进四种状态之一，绝不上抛。
 *
 * - 安卓：原生插件把 showRewardedVideo 挂到 window.EnergyParkAds（内部再转 Taku/AdUp）
 * - 网页：没有广告 SDK，返回 unavailable，界面显示商店入口而不是广告按钮
 * - 开发/自动化：localStorage 打开 mock，可按脚本返回四种状态
 */

export type RewardedStatus = "rewarded" | "closed" | "error" | "unavailable";

/** 广告位。目前只有一个「步数用完」的续命位，后续加位点时继续往这里扩。 */
export type AdPlacement = "out-of-steps";

const MOCK_FLAG = "energy_park_dev_ads";
const MOCK_RESULT = "energy_park_dev_ads_result";
const MOCK_DELAY = 120;

interface NativeAdBridge {
  /** 提前拉取，避免玩家点按钮后才开始加载 */
  preload?: (placement: string) => void;
  showRewardedVideo?: (placement: string) => Promise<unknown>;
}

declare global {
  interface Window {
    EnergyParkAds?: NativeAdBridge;
    /** 自动化测试注入的返回队列，取空后退回 localStorage 配置 */
    __parkAdQueue?: RewardedStatus[];
    /** 最近一次广告事件，测试与线上排障都用它 */
    __parkAdLog?: string[];
  }
}

function nativeBridge(): NativeAdBridge | null {
  if (typeof window === "undefined") return null;
  const bridge = window.EnergyParkAds;
  return bridge && typeof bridge.showRewardedVideo === "function" ? bridge : null;
}

function mockEnabled(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem(MOCK_FLAG) === "mock";
}

/** 能不能放激励视频：网页版没有 SDK，续命入口应退成商店。 */
export function isRewardedAdAvailable(): boolean {
  return Boolean(nativeBridge()) || mockEnabled();
}

/** 原生插件可能回字符串也可能回 { status }，未知值一律按 error 处理，绝不默认给奖励。 */
function normalize(raw: unknown): RewardedStatus {
  const value =
    typeof raw === "string"
      ? raw
      : raw && typeof raw === "object"
        ? (raw as { status?: unknown }).status
        : undefined;
  if (value === "rewarded") return "rewarded";
  if (value === "closed") return "closed";
  if (value === "unavailable") return "unavailable";
  return "error";
}

function log(event: string): void {
  if (typeof window === "undefined") return;
  window.__parkAdLog = [...(window.__parkAdLog ?? []), event].slice(-20);
}

export function preloadRewardedAd(placement: AdPlacement): void {
  const bridge = nativeBridge();
  try {
    bridge?.preload?.(placement);
  } catch {
    // 预加载失败不影响正式播放，正式调用会重新拉一次
  }
  log(`preload:${placement}`);
}

export async function showRewardedAd(placement: AdPlacement): Promise<RewardedStatus> {
  log(`request:${placement}`);

  if (mockEnabled()) {
    const queued =
      typeof window === "undefined" ? undefined : window.__parkAdQueue?.shift();
    const configured =
      typeof localStorage === "undefined"
        ? null
        : localStorage.getItem(MOCK_RESULT);
    const status: RewardedStatus =
      queued ??
      (configured === "rewarded" ||
      configured === "closed" ||
      configured === "unavailable" ||
      configured === "error"
        ? configured
        : "rewarded");
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    log(`show:${placement}:${status}`);
    return status;
  }

  const bridge = nativeBridge();
  if (!bridge) {
    log(`show:${placement}:unavailable`);
    return "unavailable";
  }

  const show = bridge.showRewardedVideo?.bind(bridge);
  if (!show) return "unavailable";

  try {
    const status = normalize(await show(placement));
    log(`show:${placement}:${status}`);
    return status;
  } catch {
    log(`show:${placement}:error`);
    return "error";
  }
}
