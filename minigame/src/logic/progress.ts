/**
 * 关卡进度持久化 —— 自 H5 版 App.tsx 中的 loadProgress/loadBestSteps/readFlag/writeFlag 迁移。
 * 存储换为平台抽象层；防作弊清洗逻辑（连续通关链校验、假 0 步记录丢弃）完整保留。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { LevelConfig } from '../types/game';
import { getPlatform } from '../adapter/platform';
import { DEFAULT_LEVELS } from './data/defaultLevels';

const CLEARED_KEY = 'honeycomb_cleared_levels';
const BEST_KEY = 'honeycomb_best_steps';
const ONBOARDING_KEY = 'honeycomb_onboarding_v1';
const STORY_SEEN_KEY = 'honeycomb_story_seen_v1';
const PROGRESS_VERSION_KEY = 'honeycomb_progress_version';
// v3：关卡数据与 H5 版对齐重建（盘面全换，旧最佳步数不可比），
// 读取时会把「低于新 parSteps」的历史记录清掉，避免出现「历史最佳 3 步 / 最少 15 步」的矛盾。
export const PROGRESS_VERSION = '3';

/**
 * 读取持久化的最佳步数记录，丢弃不可能真实存在的值。
 */
export function loadBestSteps(): Record<number, number> {
  try {
    const raw = getPlatform().getStorage(BEST_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object') return {};
    const needsMigration =
      getPlatform().getStorage(PROGRESS_VERSION_KEY) !== PROGRESS_VERSION;
    const clean: Record<number, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      const id = Number(key);
      const steps = Number(value);
      const level = DEFAULT_LEVELS.find((l) => l.id === id);
      if (!level) continue;
      if (!Number.isFinite(steps)) continue;
      const rounded = Math.round(steps);
      if (rounded < 1) continue;
      if (needsMigration && level.parSteps && rounded < level.parSteps) continue;
      if (rounded > level.maxSteps * 5 + 50) continue;
      clean[id] = rounded;
    }
    return clean;
  } catch {
    return {};
  }
}

/**
 * 进度必须是从第 1 关开始的连续通关链。
 */
export function loadProgress(): { cleared: number[]; best: Record<number, number> } {
  let best = loadBestSteps();
  let raw: number[] = [];
  try {
    const saved = getPlatform().getStorage(CLEARED_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    if (Array.isArray(parsed)) {
      raw = Array.from(
        new Set(
          parsed.filter(
            (id): id is number =>
              typeof id === 'number' && DEFAULT_LEVELS.some((l) => l.id === id)
          )
        )
      ).sort((a, b) => a - b);
    }
  } catch {
    raw = [];
  }

  const cleared: number[] = [];
  for (const id of raw) {
    if (id !== cleared.length + 1) break;
    cleared.push(id);
  }

  // 遗留调试种子：第 1 关被标记通关但没有步数记录
  if (cleared.length === 1 && cleared[0] === 1 && best[1] === undefined) {
    cleared.length = 0;
  }

  const filteredBest: Record<number, number> = {};
  for (const [key, value] of Object.entries(best)) {
    const id = Number(key);
    if (cleared.includes(id)) filteredBest[id] = value;
  }

  return { cleared, best: filteredBest };
}

export function saveProgress(cleared: number[], best: Record<number, number>): void {
  try {
    getPlatform().setStorage(CLEARED_KEY, JSON.stringify(cleared));
    getPlatform().setStorage(BEST_KEY, JSON.stringify(best));
    getPlatform().setStorage(PROGRESS_VERSION_KEY, PROGRESS_VERSION);
  } catch {
    // ignore
  }
}

export function readFlag(key: string): boolean {
  try {
    return getPlatform().getStorage(key) === '1';
  } catch {
    return false;
  }
}

export function writeFlag(key: string): void {
  try {
    getPlatform().setStorage(key, '1');
  } catch {
    // ignore
  }
}

export function getOnboardingKey(): string {
  return ONBOARDING_KEY;
}

export function getStorySeenKey(): string {
  return STORY_SEEN_KEY;
}

export function findLevel(id: number): LevelConfig | undefined {
  return DEFAULT_LEVELS.find((l) => l.id === id);
}
