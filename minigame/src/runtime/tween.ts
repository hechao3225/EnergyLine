/**
 * Tween 动画引擎：数值属性插值 + 常用缓动。
 * @license SPDX-License-Identifier: Apache-2.0
 */

type Easing = (t: number) => number;

export const Ease = {
  linear: (t: number) => t,
  easeOutQuad: (t: number) => 1 - (1 - t) * (1 - t),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  /** H5 TileView 水闸切换的 cubic-bezier(0.34, 1.56, 0.64, 1) 近似 */
  springy: (t: number) => {
    const c1 = 1.56;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

export interface TweenHandle {
  cancel(): void;
  onComplete(cb: () => void): TweenHandle;
}

interface TweenItem {
  target: object;
  keys: string[];
  from: number[];
  to: number[];
  duration: number;
  delay: number;
  elapsed: number;
  ease: Easing;
  done: boolean;
  onCompleteCb: (() => void) | null;
}

const active: TweenItem[] = [];

export function tween(
  target: object,
  props: Record<string, number>,
  duration: number,
  opts?: { ease?: Easing; delay?: number; onComplete?: () => void }
): TweenHandle {
  const obj = target as Record<string, unknown>;
  const keys = Object.keys(props);
  const from = keys.map((k) => Number(obj[k]) || 0);
  const item: TweenItem = {
    target,
    keys,
    from,
    to: keys.map((k) => props[k]),
    duration: Math.max(1, duration),
    delay: opts?.delay ?? 0,
    elapsed: 0,
    ease: opts?.ease ?? Ease.easeOutCubic,
    done: false,
    onCompleteCb: opts?.onComplete ?? null,
  };
  active.push(item);
  return {
    cancel() {
      item.done = true;
    },
    onComplete(cb) {
      item.onCompleteCb = cb;
      return this;
    },
  };
}

export function killTweensOf(target: object): void {
  for (const it of active) {
    if (it.target === target) it.done = true;
  }
}

export function stepTweens(dt: number): void {
  for (let i = active.length - 1; i >= 0; i--) {
    const it = active[i];
    if (it.done) {
      active.splice(i, 1);
      continue;
    }
    it.elapsed += dt;
    const t = (it.elapsed - it.delay) / it.duration;
    if (t < 0) continue;
    const clamped = Math.min(1, t);
    const e = it.ease(clamped);
    for (let k = 0; k < it.keys.length; k++) {
      (it.target as Record<string, unknown>)[it.keys[k]] = it.from[k] + (it.to[k] - it.from[k]) * e;
    }
    if (t >= 1) {
      it.done = true;
      active.splice(i, 1);
      if (it.onCompleteCb) it.onCompleteCb();
    }
  }
}
