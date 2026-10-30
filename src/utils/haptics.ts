/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Android Haptic Feedback Engine using Navigator.vibrate
class HapticEngine {
  private enabled: boolean = true;

  constructor() {
    try {
      const saved = localStorage.getItem('sacred_tree_haptic_enabled');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    } catch {
      this.enabled = true;
    }
  }

  public isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  public isEnabled(): boolean {
    return this.enabled && this.isSupported();
  }

  public setEnabled(enable: boolean) {
    this.enabled = enable;
    try {
      localStorage.setItem('sacred_tree_haptic_enabled', String(enable));
    } catch {
      // ignore
    }
  }

  public toggle(): boolean {
    const next = !this.enabled;
    this.setEnabled(next);
    if (next) {
      this.tapLight();
    }
    return next;
  }

  // Subtle 12ms tick when rotating or touching a channel tile
  public tapLight() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate(12);
    } catch {
      // ignore
    }
  }

  // Medium 22ms pulse when a channel completes or lights up a flower
  public pulseFlower() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate([18, 30, 22]);
    } catch {
      // ignore
    }
  }

  // Celebratory victory vibration pattern when all water channels are connected
  public victory() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate([30, 50, 40, 60, 90]);
    } catch {
      // ignore
    }
  }

  // Gentle double buzz for undo/redo
  public undo() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate([10, 20, 10]);
    } catch {
      // ignore
    }
  }

  // Warning pulse when steps run out
  public outOfSteps() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate([40, 40, 50]);
    } catch {
      // ignore
    }
  }
}

export const haptics = new HapticEngine();
