/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement, PlayerStats, AchievementProgressInfo } from '../types/achievement';
import { sound } from './audio';
import { getStarsForSteps } from './rating';

const ACHIEVEMENTS_STORAGE_KEY = 'honeycomb_achievements_v1';
const STATS_STORAGE_KEY = 'honeycomb_player_stats_v1';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ten_steps_clear',
    title: '极速修复',
    description: '单关在 10 步及以内完成一次设施修复',
    category: 'efficiency',
    icon: 'Zap',
    rarity: 'rare',
    hint: '精简操作，10 步之内接通全部设施',
  },
  {
    id: 'undo_master',
    title: '回溯专家',
    description: '单关中 3 次回溯后仍完成修复，或累计回溯超过 15 次',
    category: 'skill',
    icon: 'Undo2',
    rarity: 'rare',
    hint: '善用回溯尝试不同的接法',
  },
  {
    id: 'consecutive_perfect',
    title: '连续完美',
    description: '连续 3 个不同关卡拿到 3 星及以上评价',
    category: 'skill',
    icon: 'Flame',
    rarity: 'epic',
    hint: '连续三处设施都拿到三星以上',
  },
  {
    id: 'first_spark',
    title: '第一束星光',
    description: '首次完成任意一处设施的修复',
    category: 'progress',
    icon: 'Sparkles',
    rarity: 'common',
    hint: '点亮第一处设施',
    rewardTitleId: 'first_light',
  },
  {
    id: 'circuit_adept',
    title: '乐园学徒',
    description: '完成第 5 关，掌握双路分流',
    category: 'progress',
    icon: 'Cpu',
    rarity: 'common',
    hint: '推进到第 5 关',
  },
  {
    id: 'master_engineer',
    title: '设施工程师',
    description: '完成第 10 关，驾驭更复杂的管道网络',
    category: 'progress',
    icon: 'Award',
    rarity: 'rare',
    hint: '通过第 10 关',
    rewardTitleId: 'park_trainee',
  },
  {
    id: 'circuit_grandmaster',
    title: '乐园大师',
    description: '累计完成 20 个关卡',
    category: 'progress',
    icon: 'Trophy',
    rarity: 'epic',
    hint: '持续修复乐园里的设施',
    rewardTitleId: 'lamplighter',
  },
  {
    id: 'switch_operator',
    title: '闸门掌控',
    description: '操作能量闸并完成一次修复',
    category: 'skill',
    icon: 'Shield',
    rarity: 'common',
    hint: '扳动能量闸，接通断开的回路',
  },
  {
    id: 'time_traveler',
    title: '时光回溯',
    description: '用操作足迹跳转后完成修复',
    category: 'skill',
    icon: 'RotateCcw',
    rarity: 'rare',
    hint: '跳到之前的步骤，再完成修复',
  },
  {
    id: 'speed_optimizer',
    title: '完美回路',
    description: '以本关最少步数完成修复，点亮第四颗星',
    category: 'efficiency',
    icon: 'Star',
    rarity: 'rare',
    hint: '每一步都用在刀刃上',
    rewardTitleId: 'precision_calibrator',
  },
  {
    id: 'perfectionist',
    title: '完美主义者',
    description: '在至少 5 个不同关卡拿到 3 星及以上评价',
    category: 'efficiency',
    icon: 'StarHalf',
    rarity: 'epic',
    hint: '精益求精，在 5 关拿下高星',
    rewardTitleId: 'steady_calibrator',
  },
  {
    id: 'endless_scout',
    title: '无尽探险家',
    description: '在无尽挑战中取得 3 关连胜',
    category: 'endless',
    icon: 'Compass',
    rarity: 'rare',
    hint: '在无尽挑战中连过 3 关',
  },
  {
    id: 'endless_champion',
    title: '无尽领航者',
    description: '在无尽挑战中达成 7 关连胜',
    category: 'endless',
    icon: 'Crown',
    rarity: 'epic',
    hint: '一鼓作气达成 7 连胜',
  },
  {
    id: 'hall_of_fame',
    title: '乐园荣誉',
    description: '累计解锁其他至少 8 个成就',
    category: 'progress',
    icon: 'Medal',
    rarity: 'legendary',
    hint: '收集丰硕的乐园勋章',
  },
  {
    id: 'levels_30',
    title: '星光工程师',
    description: '累计完成 30 个关卡',
    category: 'progress',
    icon: 'Award',
    rarity: 'epic',
    hint: '继续修复乐园中心',
    rewardTitleId: 'starlight_engineer',
  },
  {
    id: 'levels_50',
    title: '乐园守护者',
    description: '累计完成 50 个关卡',
    category: 'progress',
    icon: 'Shield',
    rarity: 'epic',
    hint: '让更多区域重新亮起',
    rewardTitleId: 'park_guardian',
  },
  {
    id: 'chapter_garden_complete',
    title: '花期守望者',
    description: '完成星光花园 21–40 关',
    category: 'progress',
    icon: 'Sparkles',
    rarity: 'epic',
    hint: '修复星光花园的全部设施',
    rewardTitleId: 'garden_watcher',
  },
  {
    id: 'chapter_cloud_complete',
    title: '云桥引路人',
    description: '完成云端奇境 41–60 关',
    category: 'progress',
    icon: 'Compass',
    rarity: 'epic',
    hint: '修复云端奇境的全部设施',
    rewardTitleId: 'cloud_guide',
  },
  {
    id: 'chapter_rainbow_complete',
    title: '虹光调校师',
    description: '完成虹彩天桥 61–80 关',
    category: 'progress',
    icon: 'Crown',
    rarity: 'epic',
    hint: '修复虹彩天桥的全部设施',
    rewardTitleId: 'rainbow_tuner',
  },
  {
    id: 'chapter_peak_complete',
    title: '乐园复兴师',
    description: '完成梦幻之巅 81–99 关',
    category: 'progress',
    icon: 'Trophy',
    rarity: 'legendary',
    hint: '修复乐园中心的最后一处设施',
    rewardTitleId: 'park_reviver',
  },
  {
    id: 'perfect_20',
    title: '完美回路师',
    description: '在 20 个不同关卡获得三星及以上',
    category: 'skill',
    icon: 'Star',
    rarity: 'legendary',
    hint: '在 20 关取得高星评价',
    rewardTitleId: 'perfect_circuit_master',
  },
];

// Load unlocked achievements from localStorage
export function loadUnlockedAchievements(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Save unlocked achievements to localStorage
export function saveUnlockedAchievements(records: Record<string, number>): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

// Load player stats
export function loadPlayerStats(): PlayerStats {
  const defaultStats: PlayerStats = {
    totalClearedLevels: 0,
    clearedLevelIds: [],
    threeStarLevelIds: [],
    consecutivePerfect: 0,
    consecutivePerfectLevelIds: [],
    maxConsecutivePerfect: 0,
    totalUndos: 0,
    maxEndlessStreak: 0,
    tenStepClearCount: 0,
  };

  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
      clearedLevelIds: Array.isArray(parsed.clearedLevelIds) ? parsed.clearedLevelIds : [],
      threeStarLevelIds: Array.isArray(parsed.threeStarLevelIds) ? parsed.threeStarLevelIds : [],
      consecutivePerfectLevelIds: Array.isArray(parsed.consecutivePerfectLevelIds) ? parsed.consecutivePerfectLevelIds : [],
    };
  } catch {
    return defaultStats;
  }
}

// Save player stats
export function savePlayerStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

// Calculate detailed progress info for each achievement
export function calculateAchievementProgress(
  achId: string,
  stats: PlayerStats,
  unlocked: Record<string, number>
): AchievementProgressInfo {
  const isUnlocked = Boolean(unlocked[achId]);
  let current = 0;
  let max = 1;
  let unit = '次';
  let label = '';

  switch (achId) {
    case 'ten_steps_clear':
      max = 1;
      current = isUnlocked ? 1 : Math.min(stats.tenStepClearCount, 1);
      unit = '关';
      label = `十步速通 ${stats.tenStepClearCount >= 1 ? stats.tenStepClearCount : 0}/1 关`;
      break;

    case 'undo_master':
      max = 15;
      current = stats.totalUndos;
      unit = '次';
      label = `已撤销 ${stats.totalUndos}/15 次`;
      break;

    case 'consecutive_perfect':
      max = 3;
      current = Math.max(stats.consecutivePerfect, stats.maxConsecutivePerfect);
      unit = '关';
      label = `连续三星 ${Math.min(current, max)}/3 关`;
      break;

    case 'first_spark':
      max = 1;
      current = isUnlocked || stats.clearedLevelIds.length > 0 ? 1 : 0;
      unit = '关';
      label = `点亮首关 ${current}/1 关`;
      break;

    case 'circuit_adept':
      max = 5;
      current = isUnlocked ? 5 : Math.min(stats.clearedLevelIds.length, 5);
      unit = '关';
      label = `通关进度 ${current}/5 关`;
      break;

    case 'master_engineer':
      max = 10;
      current = isUnlocked ? 10 : Math.min(stats.clearedLevelIds.length, 10);
      unit = '关';
      label = `通关进度 ${current}/10 关`;
      break;

    case 'circuit_grandmaster':
      max = 20;
      current = isUnlocked ? 20 : Math.min(stats.clearedLevelIds.length, 20);
      unit = '关';
      label = `通关进度 ${stats.clearedLevelIds.length}/20 关`;
      break;

    case 'levels_30':
      max = 30;
      current = Math.min(stats.clearedLevelIds.length, max);
      unit = '关';
      label = `通关进度 ${current}/30 关`;
      break;

    case 'levels_50':
      max = 50;
      current = Math.min(stats.clearedLevelIds.length, max);
      unit = '关';
      label = `通关进度 ${current}/50 关`;
      break;

    case 'chapter_garden_complete':
    case 'chapter_cloud_complete':
    case 'chapter_rainbow_complete':
    case 'chapter_peak_complete': {
      const ranges = {
        chapter_garden_complete: [21, 40, '星光花园'],
        chapter_cloud_complete: [41, 60, '云端奇境'],
        chapter_rainbow_complete: [61, 80, '虹彩天桥'],
        chapter_peak_complete: [81, 99, '梦幻之巅'],
      } as const;
      const [start, end, name] = ranges[achId];
      max = end - start + 1;
      current = stats.clearedLevelIds.filter(
        (id) => id >= start && id <= end,
      ).length;
      unit = '关';
      label = `${name} ${current}/${max} 关`;
      break;
    }

    case 'perfect_20':
      max = 20;
      current = Math.min(stats.threeStarLevelIds.length, max);
      unit = '关';
      label = `三星关卡 ${current}/20 关`;
      break;

    case 'switch_operator':
      max = 1;
      current = isUnlocked ? 1 : 0;
      unit = '次';
      label = isUnlocked ? '开关调控已完成 1/1' : '开关调控未完成 0/1';
      break;

    case 'time_traveler':
      max = 1;
      current = isUnlocked ? 1 : 0;
      unit = '次';
      label = isUnlocked ? '时间轴跳转破局 1/1' : '时间轴跳转破局 0/1';
      break;

    case 'speed_optimizer':
      max = 1;
      current = isUnlocked ? 1 : 0;
      unit = '次';
      label = isUnlocked ? '极速省步过关 1/1' : '极速省步过关 0/1';
      break;

    case 'perfectionist':
      max = 5;
      current = isUnlocked ? 5 : stats.threeStarLevelIds.length;
      unit = '关';
      label = `三星关卡 ${stats.threeStarLevelIds.length}/5 关`;
      break;

    case 'endless_scout':
      max = 3;
      current = stats.maxEndlessStreak;
      unit = '关';
      label = `无尽最高连胜 ${Math.min(stats.maxEndlessStreak, 3)}/3 关`;
      break;

    case 'endless_champion':
      max = 7;
      current = stats.maxEndlessStreak;
      unit = '关';
      label = `无尽最高连胜 ${Math.min(stats.maxEndlessStreak, 7)}/7 关`;
      break;

    case 'hall_of_fame': {
      max = 8;
      const count = Object.keys(unlocked).filter((k) => k !== 'hall_of_fame').length;
      current = isUnlocked ? 8 : count;
      unit = '个';
      label = `收集成就 ${count}/8 个`;
      break;
    }

    default:
      max = 1;
      current = isUnlocked ? 1 : 0;
      unit = '次';
      label = isUnlocked ? '已完成 1/1' : '未完成 0/1';
      break;
  }

  const effectiveCurrent = isUnlocked ? Math.max(current, max) : current;
  const percent = isUnlocked ? 100 : Math.min(100, Math.round((current / max) * 100));

  return {
    current: effectiveCurrent,
    max,
    percent,
    unit,
    label,
    isCompleted: isUnlocked || percent >= 100,
  };
}

// Get all achievements populated with current unlock status and progress
export function getDecoratedAchievements(): Achievement[] {
  const unlocked = loadUnlockedAchievements();
  const stats = loadPlayerStats();
  return ALL_ACHIEVEMENTS.map((ach) => ({
    ...ach,
    unlockedAt: unlocked[ach.id],
    progress: calculateAchievementProgress(ach.id, stats, unlocked),
  }));
}

export interface VictoryCheckContext {
  levelId: number;
  stepsUsed: number;
  remainingSteps: number;
  maxSteps: number;
  /** Minimum (4-star) step budget of the level, when known */
  parSteps?: number;
  isEndless?: boolean;
  endlessStreak?: number;
  levelUndosUsed: number;
  hasUsedTimelineJump: boolean;
  hasToggledSwitch: boolean;
  /** 本次通关实际拿到的星级（达标关按“保住几处”算，不能再用步数推） */
  stars?: number;
}

// Check and award achievements upon level victory
export function checkVictoryAchievements(ctx: VictoryCheckContext): {
  newlyUnlocked: Achievement[];
  updatedStats: PlayerStats;
} {
  const unlocked = loadUnlockedAchievements();
  const stats = loadPlayerStats();
  const newlyUnlocked: Achievement[] = [];
  const now = Date.now();

  // Rating is driven by the same 4-star model shown to the player
  const stars =
    ctx.stars ??
    getStarsForSteps(ctx.stepsUsed, {
      maxSteps: ctx.maxSteps,
      parSteps: ctx.parSteps,
    });
  const isThreeStar = stars >= 3;
  const isSpeedRun = stars >= 4;

  // Update stats
  if (!ctx.isEndless) {
    if (!stats.clearedLevelIds.includes(ctx.levelId)) {
      stats.clearedLevelIds.push(ctx.levelId);
      stats.totalClearedLevels = stats.clearedLevelIds.length;
    }

    if (isThreeStar) {
      if (!stats.threeStarLevelIds.includes(ctx.levelId)) {
        stats.threeStarLevelIds.push(ctx.levelId);
      }
      const streakIds = stats.consecutivePerfectLevelIds;
      if (!streakIds.includes(ctx.levelId)) {
        streakIds.push(ctx.levelId);
        stats.consecutivePerfect = streakIds.length;
        if (stats.consecutivePerfect > stats.maxConsecutivePerfect) {
          stats.maxConsecutivePerfect = stats.consecutivePerfect;
        }
      }
    } else {
      // Broken streak
      stats.consecutivePerfect = 0;
      stats.consecutivePerfectLevelIds = [];
    }

    if (ctx.stepsUsed <= 10) {
      stats.tenStepClearCount += 1;
    }
  } else {
    // Endless mode
    const streak = ctx.endlessStreak ?? 1;
    if (streak > stats.maxEndlessStreak) {
      stats.maxEndlessStreak = streak;
    }
  }

  const unlockCandidate = (id: string) => {
    if (!unlocked[id]) {
      unlocked[id] = now;
      const def = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (def) {
        newlyUnlocked.push({ ...def, unlockedAt: now });
      }
    }
  };

  // 1. 十步内过关
  if (ctx.stepsUsed <= 10) {
    unlockCandidate('ten_steps_clear');
  }

  // 2. 撤销达人 (In-level undos >= 3 or total cumulative undos >= 15)
  if (ctx.levelUndosUsed >= 3 || stats.totalUndos >= 15) {
    unlockCandidate('undo_master');
  }

  // 3. 连续完美通关 (consecutive 3-star clears >= 3)
  if (stats.consecutivePerfect >= 3 || stats.maxConsecutivePerfect >= 3) {
    unlockCandidate('consecutive_perfect');
  }

  // 4. 初次启明
  if (stats.totalClearedLevels >= 1 || ctx.isEndless) {
    unlockCandidate('first_spark');
  }

  // 5. 闭合先锋 (Level 5+)
  if (!ctx.isEndless && stats.clearedLevelIds.includes(5)) {
    unlockCandidate('circuit_adept');
  }

  // 6. 设施工程师 (Level 10+)
  if (!ctx.isEndless && stats.clearedLevelIds.includes(10)) {
    unlockCandidate('master_engineer');
  }

  // 7. 特级电气师 (Cleared >= 20 levels)
  if (stats.clearedLevelIds.length >= 20) {
    unlockCandidate('circuit_grandmaster');
  }

  if (stats.clearedLevelIds.length >= 30) {
    unlockCandidate('levels_30');
  }

  if (stats.clearedLevelIds.length >= 50) {
    unlockCandidate('levels_50');
  }

  const chapterRanges = [
    [21, 40, 'chapter_garden_complete'],
    [41, 60, 'chapter_cloud_complete'],
    [61, 80, 'chapter_rainbow_complete'],
    [81, 99, 'chapter_peak_complete'],
  ] as const;
  for (const [start, end, achievementId] of chapterRanges) {
    const complete = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index,
    ).every((id) => stats.clearedLevelIds.includes(id));
    if (complete) {
      unlockCandidate(achievementId);
    }
  }

  // 8. 通断掌控 (Toggled switch in winning level)
  if (ctx.hasToggledSwitch) {
    unlockCandidate('switch_operator');
  }

  // 9. 时空跃迁 (Used timeline jump in winning level)
  if (ctx.hasUsedTimelineJump) {
    unlockCandidate('time_traveler');
  }

  // 10. 算无遗策 (4-star / minimum-step clear)
  if (isSpeedRun) {
    unlockCandidate('speed_optimizer');
  }

  // 11. 完美主义者 (3+ stars in >= 5 distinct levels)
  if (stats.threeStarLevelIds.length >= 5) {
    unlockCandidate('perfectionist');
  }

  if (stats.threeStarLevelIds.length >= 20) {
    unlockCandidate('perfect_20');
  }

  // 12. 无尽探险家 (Streak >= 3)
  if (stats.maxEndlessStreak >= 3 || (ctx.endlessStreak && ctx.endlessStreak >= 3)) {
    unlockCandidate('endless_scout');
  }

  // 13. 无尽领航者 (Streak >= 7)
  if (stats.maxEndlessStreak >= 7 || (ctx.endlessStreak && ctx.endlessStreak >= 7)) {
    unlockCandidate('endless_champion');
  }

  // 14. 荣誉大满贯 (Unlocked >= 8 other achievements)
  const currentTotalUnlocked = Object.keys(unlocked).length;
  if (currentTotalUnlocked >= 8) {
    unlockCandidate('hall_of_fame');
  }

  // Save changes
  if (newlyUnlocked.length > 0) {
    saveUnlockedAchievements(unlocked);
    sound.playAchievement();
  }
  savePlayerStats(stats);

  return {
    newlyUnlocked,
    updatedStats: stats,
  };
}

// Track an undo operation during gameplay
export function trackUndoOperation(): void {
  const stats = loadPlayerStats();
  stats.totalUndos += 1;
  savePlayerStats(stats);

  // Check if undo_master can unlock from cumulative undos alone
  const unlocked = loadUnlockedAchievements();
  if (stats.totalUndos >= 15 && !unlocked['undo_master']) {
    unlocked['undo_master'] = Date.now();
    saveUnlockedAchievements(unlocked);
    sound.playAchievement();
  }
}
