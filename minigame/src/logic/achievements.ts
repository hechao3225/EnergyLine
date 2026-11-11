/**
 * 成就系统 —— 自 H5 版 src/utils/achievements.ts 迁移（localStorage → 平台存储）。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Achievement, PlayerStats, AchievementProgressInfo } from '../types/achievement';
import { sound } from './audio';
import { getStarsForSteps } from './rating';
import { getPlatform } from '../adapter/platform';

const ACHIEVEMENTS_STORAGE_KEY = 'honeycomb_achievements_v1';
const STATS_STORAGE_KEY = 'honeycomb_player_stats_v1';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ten_steps_clear',
    title: '十步内过关',
    description: '单关在 10 步及以内成功点亮全网并通关',
    category: 'efficiency',
    icon: 'Zap',
    rarity: 'rare',
    hint: '精简操作，10 步之内直捣黄龙',
  },
  {
    id: 'undo_master',
    title: '撤销达人',
    description: '单关中多次回溯推演（≥3次撤销）仍成功破局，或累计撤销超过 15 次',
    category: 'skill',
    icon: 'Undo2',
    rarity: 'rare',
    hint: '善用回溯尝试各种拓扑可能性',
  },
  {
    id: 'consecutive_perfect',
    title: '连续完美通关',
    description: '连续 3 个关卡拿到 3 星及以上评价，步步精省',
    category: 'skill',
    icon: 'Flame',
    rarity: 'rare',
    hint: '保持高水准，连续三局拿下三星以上评价',
  },
  {
    id: 'first_spark',
    title: '初次启明',
    description: '成功点亮任意第 1 个关卡的所有灯泡',
    category: 'progress',
    icon: 'Sparkles',
    rarity: 'common',
    hint: '点亮第一颗灯泡的起点',
  },
  {
    id: 'circuit_adept',
    title: '闭合先锋',
    description: '成功攻克第 5 关，掌握双路分流技巧',
    category: 'progress',
    icon: 'Cpu',
    rarity: 'common',
    hint: '在经典关卡中顺利推进至第 5 关',
  },
  {
    id: 'master_engineer',
    title: '蜂巢工程师',
    description: '成功通过经典关卡第 10 关，驾驭复杂网格拓扑',
    category: 'progress',
    icon: 'Award',
    rarity: 'rare',
    hint: '通过第 10 关展现工程才华',
  },
  {
    id: 'circuit_grandmaster',
    title: '特级电气师',
    description: '累计攻克 20 个及以上经典关卡',
    category: 'progress',
    icon: 'Trophy',
    rarity: 'epic',
    hint: '持续探索蜂巢深度供能网络',
  },
  {
    id: 'switch_operator',
    title: '通断掌控',
    description: '在包含可切换开关的关卡中调整开关状态并通关',
    category: 'skill',
    icon: 'Shield',
    rarity: 'common',
    hint: '通过切换开关调控分支电流',
  },
  {
    id: 'time_traveler',
    title: '时空跃迁',
    description: '在时间轴面板中直接点击历史节点回溯并最终完成电路',
    category: 'skill',
    icon: 'RotateCcw',
    rarity: 'rare',
    hint: '点击历史时间轴上的任意卡片进行大跨度跃迁',
  },
  {
    id: 'speed_optimizer',
    title: '算无遗策',
    description: '以本关最少步数通关，点亮闪耀的第 4 颗星',
    category: 'efficiency',
    icon: 'Star',
    rarity: 'rare',
    hint: '把每一步都用在刀刃上，直取 4 星',
  },
  {
    id: 'perfectionist',
    title: '完美主义者',
    description: '在至少 5 个不同关卡中获得 3 星及以上评价',
    category: 'efficiency',
    icon: 'StarHalf',
    rarity: 'epic',
    hint: '精益求精，在 5 关拿下高星评价',
  },
  {
    id: 'endless_scout',
    title: '无尽探险家',
    description: '在无尽挑战模式中取得 3 关连胜',
    category: 'endless',
    icon: 'Compass',
    rarity: 'rare',
    hint: '在随机生成的无尽关卡中连过 3 关',
  },
  {
    id: 'endless_champion',
    title: '无尽领航者',
    description: '在无尽挑战模式中达成 7 关连胜壮举',
    category: 'endless',
    icon: 'Crown',
    rarity: 'epic',
    hint: '在无尽随机挑战中一鼓作气达成 7 连胜',
  },
  {
    id: 'hall_of_fame',
    title: '荣誉大满贯',
    description: '累计解锁其他至少 8 个成就，步入蜂巢荣誉殿堂',
    category: 'progress',
    icon: 'Medal',
    rarity: 'legendary',
    hint: '收集丰硕的奖杯与成就勋章',
  },
];

export function loadUnlockedAchievements(): Record<string, number> {
  try {
    const raw = getPlatform().getStorage(ACHIEVEMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUnlockedAchievements(records: Record<string, number>): void {
  try {
    getPlatform().setStorage(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

export function loadPlayerStats(): PlayerStats {
  const defaultStats: PlayerStats = {
    totalClearedLevels: 0,
    clearedLevelIds: [],
    threeStarLevelIds: [],
    consecutivePerfect: 0,
    maxConsecutivePerfect: 0,
    totalUndos: 0,
    maxEndlessStreak: 0,
    tenStepClearCount: 0,
  };

  try {
    const raw = getPlatform().getStorage(STATS_STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
      clearedLevelIds: Array.isArray(parsed.clearedLevelIds) ? parsed.clearedLevelIds : [],
      threeStarLevelIds: Array.isArray(parsed.threeStarLevelIds) ? parsed.threeStarLevelIds : [],
    };
  } catch {
    return defaultStats;
  }
}

export function savePlayerStats(stats: PlayerStats): void {
  try {
    getPlatform().setStorage(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

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
  parSteps?: number;
  isEndless?: boolean;
  endlessStreak?: number;
  levelUndosUsed: number;
  hasUsedTimelineJump: boolean;
  hasToggledSwitch: boolean;
}

export function checkVictoryAchievements(ctx: VictoryCheckContext): {
  newlyUnlocked: Achievement[];
  updatedStats: PlayerStats;
} {
  const unlocked = loadUnlockedAchievements();
  const stats = loadPlayerStats();
  const newlyUnlocked: Achievement[] = [];
  const now = Date.now();

  const stars = getStarsForSteps(ctx.stepsUsed, {
    maxSteps: ctx.maxSteps,
    parSteps: ctx.parSteps,
  });
  const isThreeStar = stars >= 3;
  const isSpeedRun = stars >= 4;

  if (!ctx.isEndless) {
    if (!stats.clearedLevelIds.includes(ctx.levelId)) {
      stats.clearedLevelIds.push(ctx.levelId);
      stats.totalClearedLevels = stats.clearedLevelIds.length;
    }

    if (isThreeStar) {
      if (!stats.threeStarLevelIds.includes(ctx.levelId)) {
        stats.threeStarLevelIds.push(ctx.levelId);
      }
      stats.consecutivePerfect += 1;
      if (stats.consecutivePerfect > stats.maxConsecutivePerfect) {
        stats.maxConsecutivePerfect = stats.consecutivePerfect;
      }
    } else {
      stats.consecutivePerfect = 0;
    }

    if (ctx.stepsUsed <= 10) {
      stats.tenStepClearCount += 1;
    }
  } else {
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

  if (ctx.stepsUsed <= 10) unlockCandidate('ten_steps_clear');
  if (ctx.levelUndosUsed >= 3 || stats.totalUndos >= 15) unlockCandidate('undo_master');
  if (stats.consecutivePerfect >= 3 || stats.maxConsecutivePerfect >= 3) unlockCandidate('consecutive_perfect');
  if (stats.totalClearedLevels >= 1 || ctx.isEndless) unlockCandidate('first_spark');
  if (!ctx.isEndless && (ctx.levelId >= 5 || stats.clearedLevelIds.includes(5))) unlockCandidate('circuit_adept');
  if (!ctx.isEndless && (ctx.levelId >= 10 || stats.clearedLevelIds.includes(10))) unlockCandidate('master_engineer');
  if (stats.clearedLevelIds.length >= 20) unlockCandidate('circuit_grandmaster');
  if (ctx.hasToggledSwitch) unlockCandidate('switch_operator');
  if (ctx.hasUsedTimelineJump) unlockCandidate('time_traveler');
  if (isSpeedRun) unlockCandidate('speed_optimizer');
  if (stats.threeStarLevelIds.length >= 5) unlockCandidate('perfectionist');
  if (stats.maxEndlessStreak >= 3 || (ctx.endlessStreak && ctx.endlessStreak >= 3)) unlockCandidate('endless_scout');
  if (stats.maxEndlessStreak >= 7 || (ctx.endlessStreak && ctx.endlessStreak >= 7)) unlockCandidate('endless_champion');

  const currentTotalUnlocked = Object.keys(unlocked).length;
  if (currentTotalUnlocked >= 8) unlockCandidate('hall_of_fame');

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

export function trackUndoOperation(): void {
  const stats = loadPlayerStats();
  stats.totalUndos += 1;
  savePlayerStats(stats);

  const unlocked = loadUnlockedAchievements();
  if (stats.totalUndos >= 15 && !unlocked['undo_master']) {
    unlocked['undo_master'] = Date.now();
    saveUnlockedAchievements(unlocked);
    sound.playAchievement();
  }
}
