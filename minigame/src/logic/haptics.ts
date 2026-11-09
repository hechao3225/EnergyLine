/**
 * 触觉反馈 —— 自 H5 版 src/utils/haptics.ts 迁移。
 * navigator.vibrate 换为平台抽象（wx.vibrateShort / tt.vibrateShort / navigator.vibrate）。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { getPlatform } from '../adapter/platform';

const HAPTIC_KEY = 'sacred_tree_haptic_enabled';

class HapticEngine {
  private enabled: boolean = true;
  private initialized: boolean = false;

  private ensureInit() {
    if (this.initialized) return;
    this.initialized = true;
    try {
      const saved = getPlatform().getStorage(HAPTIC_KEY);
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    } catch {
      this.enabled = true;
    }
  }

  public isEnabled(): boolean {
    this.ensureInit();
    return this.enabled && getPlatform().supportsVibrate;
  }

  public setEnabled(enable: boolean) {
    this.ensureInit();
    this.enabled = enable;
    try {
      getPlatform().setStorage(HAPTIC_KEY, String(enable));
    } catch {
      // ignore
    }
  }

  public toggle(): boolean {
    const next = !this.isEnabled();
    this.setEnabled(next);
    if (next) {
      this.tapLight();
    }
    return next;
  }

  // Subtle tick when rotating or touching a channel tile
  public tapLight() {
    if (!this.isEnabled()) return;
    getPlatform().vibrate(12);
  }

  // Solid heavy click when toggling sluice gate switch
  public tapHeavy() {
    if (!this.isEnabled()) return;
    getPlatform().vibrate(26);
  }

  // Medium pulse when a channel completes or lights up a flower
  public pulseFlower() {
    if (!this.isEnabled()) return;
    getPlatform().vibrate([18, 30, 22]);
  }

  // Celebratory victory vibration pattern
  public victory() {
    if (!this.isEnabled()) return;
    getPlatform().vibrate([30, 50, 40, 60, 90]);
  }

  // Gentle double buzz for undo/redo
  public undo() {
    if (!this.isEnabled()) return;
    getPlatform().vibrate([10, 20, 10]);
  }

  // Warning pulse when steps run out
  public outOfSteps() {
    if (!this.isEnabled()) return;
    getPlatform().vibrate([40, 40, 50]);
  }
}

export const haptics = new HapticEngine();
