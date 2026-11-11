/**
 * 资源加载：图片缓存与预载（wx.createImage / new Image 统一）。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { getPlatform } from '../adapter/platform';

const cache = new Map<string, HTMLImageElement>();
const pending = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(path: string): Promise<HTMLImageElement> {
  const hit = cache.get(path);
  if (hit) return Promise.resolve(hit);
  const inflight = pending.get(path);
  if (inflight) return inflight;

  const p = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = getPlatform().createImage();
    img.onload = () => {
      cache.set(path, img);
      pending.delete(path);
      resolve(img);
    };
    img.onerror = () => {
      pending.delete(path);
      reject(new Error(`[assets] 加载失败: ${path}`));
    };
    img.src = path;
  });
  pending.set(path, p);
  return p;
}

/** 仅取缓存（可能为 null，未加载完成时用） */
export function getImage(path: string): HTMLImageElement | null {
  return cache.get(path) ?? null;
}

export function preloadImages(paths: string[]): Promise<unknown[]> {
  return Promise.all(paths.map((p) => loadImage(p).catch((e) => console.warn(e.message))));
}

/** 核心游戏图片清单（路径相对包根） */
export const CORE_IMAGES = [
  'assets/spring_source.webp',
  'assets/bulb_lit.webp',
  'assets/bulb_unlit.webp',
  'assets/valve_switch.webp',
  'assets/valve_diode.webp',
  'assets/board_altar.webp',
  'assets/bg_main.webp',
];
