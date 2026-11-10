/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ArrowRight, RotateCcw, Grid, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { Achievement } from '../types/achievement';
import { AchievementIcon, RARITY_STYLES } from './AchievementIcon';
import { getFlowerForLevel } from '../data/flowers';
import { FlowerIcon } from './FlowerIcon';
import { getStars } from '../utils/parkProgress';
import bulbLitImg from '../assets/bulb_lit.png';
import chapterBadge1 from '../assets/chapter_badge_1.png';
import chapterBadge2 from '../assets/chapter_badge_2.png';
import chapterBadge3 from '../assets/chapter_badge_3.png';
import chapterBadge4 from '../assets/chapter_badge_4.png';
import chapterBadge5 from '../assets/chapter_badge_5.png';

const CHAPTER_BADGES: Record<number, string> = {
  1: chapterBadge1,
  2: chapterBadge2,
  3: chapterBadge3,
  4: chapterBadge4,
  5: chapterBadge5,
};

interface VictoryModalProps {
  levelTitle: string;
  stepsUsed: number;
  remainingSteps: number;
  maxSteps: number;
  bestSteps?: number;
  previousBest?: number | null;
  isNewRecord?: boolean;
  unlockedAchievements?: Achievement[];
  totalUnlockedCount?: number;
  onOpenAchievements?: () => void;
  onNextLevel: () => void;
  onRestart: () => void;
  onOpenLevelSelect: () => void;
  hasNextLevel: boolean;
  levelId?: number;
  onOpenFloraCompendium?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  levelTitle,
  stepsUsed,
  remainingSteps,
  maxSteps,
  bestSteps,
  previousBest,
  isNewRecord = false,
  unlockedAchievements = [],
  totalUnlockedCount = 0,
  onOpenAchievements,
  onNextLevel,
  onRestart,
  onOpenLevelSelect,
  hasNextLevel,
  levelId = 1,
  onOpenFloraCompendium,
}) => {
  // Star calculation
  const stars = getStars(remainingSteps, maxSteps);
  const effectiveBest = bestSteps ?? stepsUsed;
  const flower = getFlowerForLevel(levelId);

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="w-full max-w-sm sm:max-w-md max-h-[96dvh] bg-[#f7faf4] border border-[#dce3d5] rounded-3xl p-4 sm:p-5 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Glowing Lotus / Flower & Chapter Emblem */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-2 flex items-center justify-center">
            {/* Halo pulse */}
            <div
              className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"
              style={{ backgroundColor: flower.glowColor || '#10b981' }}
            />
            {/* Jade circular plate */}
            <div className="relative z-10 w-full h-full rounded-2xl bg-gradient-to-b from-[#133327] to-[#0a2017] p-1.5 shadow-lg border-2 border-emerald-400/50 flex items-center justify-center">
              <img
                src={bulbLitImg}
                alt={flower.name}
                className="w-full h-full object-contain animate-in zoom-in-75 duration-300"
                style={{ filter: `drop-shadow(0 0 10px ${flower.glowColor || '#34d399'})` }}
              />
            </div>
            {/* Chapter Medallion floating on bottom-right corner */}
            <div className="absolute -bottom-1.5 -right-1.5 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full drop-shadow-md">
              <img
                src={CHAPTER_BADGES[flower.chapter] || chapterBadge1}
                alt={flower.chapterName}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-black text-[#133325] mb-0.5 tracking-tight">
            万花盛开，灵泉充盈！
          </h3>
          <p className="text-xs text-[#446052] mb-2">
            「{levelTitle}」水脉通畅，唤醒神树生机
          </p>

          {/* New Record Badge */}
          {isNewRecord && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs mb-2 animate-pulse">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>新纪录！最佳步数打破</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          )}

          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-7 h-7 transition-all ${
                  starIdx <= stars
                    ? 'text-amber-500 fill-amber-400 drop-shadow-sm scale-105'
                    : 'text-[#d0ded0] fill-[#edf2e7]'
                }`}
              />
            ))}
          </div>

          {/* Unlocked Flower Handbook Card */}
          <div className="p-2.5 mb-2.5 rounded-2xl bg-gradient-to-r from-[#eef8f4] to-[#f4faf7] border border-emerald-300/80 shadow-xs text-left flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#133327] to-[#0a2017] shadow-xs border border-emerald-400/40 p-1 flex items-center justify-center shrink-0">
              <img
                src={bulbLitImg}
                alt={flower.name}
                className="w-full h-full object-contain"
                style={{ filter: `drop-shadow(0 0 6px ${flower.glowColor || '#34d399'})` }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/90 px-1.5 py-0.2 rounded">
                  🌸 第{flower.chapter}卷 · {flower.chapterName}
                </span>
                <span className="text-xs font-black text-[#133325] truncate">
                  {flower.name}
                </span>
              </div>
              <p className="text-[10px] text-[#4d6659] truncate mt-0.5">
                {flower.blessing}
              </p>
            </div>
            {onOpenFloraCompendium && (
              <button
                onClick={onOpenFloraCompendium}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shrink-0 transition-colors cursor-pointer shadow-xs"
              >
                看花谱
              </button>
            )}
          </div>

          {/* Comparison Stats Block */}
          <div className="grid grid-cols-3 gap-2 p-2 rounded-2xl bg-white/90 border border-[#e2e9dc] mb-2 text-center">
            {/* Current Run */}
            <div
              className={`p-2 rounded-xl border transition-all ${
                isNewRecord ? 'bg-amber-50/60 border-amber-200' : 'bg-[#f8faf6] border-[#e8efe3]'
              }`}
            >
              <span className="text-[10px] text-[#5f7469] block mb-0.5">本次步数</span>
              <span
                className={`text-lg font-bold font-mono ${
                  isNewRecord ? 'text-amber-600' : 'text-[#1a2d25]'
                }`}
              >
                {stepsUsed}
              </span>
              <span className="text-[9px] text-[#5f7469] block">步</span>
            </div>

            {/* Historical Best */}
            <div className="p-2 rounded-xl bg-teal-50/50 border border-teal-200/80 relative">
              <span className="text-[10px] text-teal-800 font-medium block mb-0.5">历史最佳</span>
              <span className="text-lg font-bold font-mono text-teal-700">{effectiveBest}</span>
              <span className="text-[9px] text-teal-700 block">步</span>
              {isNewRecord && (
                <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-amber-500 text-white text-[8px] font-bold rounded-full shadow-xs">
                  NEW
                </span>
              )}
            </div>

            {/* Remaining */}
            <div className="p-2 rounded-xl bg-[#f8faf6] border border-[#e8efe3]">
              <span className="text-[10px] text-[#5f7469] block mb-0.5">剩余步数</span>
              <span className="text-lg font-bold font-mono text-[#2c473b]">{remainingSteps}</span>
              <span className="text-[9px] text-[#5f7469] block">步</span>
            </div>
          </div>

          {/* Contextual Note about Record */}
          <div className="mb-3">
            {isNewRecord ? (
              previousBest !== null && previousBest !== undefined ? (
                <p className="text-[11px] text-amber-800 bg-amber-50/90 py-1 px-2.5 rounded-xl border border-amber-200 inline-block font-medium">
                  太棒了！比原记录节省了{' '}
                  <strong className="text-amber-950 font-bold">{previousBest - stepsUsed}</strong>{' '}
                  步！
                </p>
              ) : (
                <p className="text-[11px] text-teal-800 bg-teal-50/90 py-1 px-2.5 rounded-xl border border-teal-200 inline-block font-medium">
                  首次通过本关，成功唤醒此地花谱！
                </p>
              )
            ) : (
              bestSteps !== undefined && (
                <p className="text-[11px] text-[#52665e] bg-[#f0f4ee] py-1 px-2.5 rounded-xl border border-[#e2ebd0] inline-block">
                  距离最佳记录还有{' '}
                  <strong className="text-teal-800 font-semibold">{stepsUsed - bestSteps}</strong>{' '}
                  步差距，继续加油！
                </p>
              )
            )}
          </div>

          {/* Newly Unlocked Achievements Badge & List */}
          {unlockedAchievements.length > 0 && (
            <div className="p-2.5 mb-3 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-300 shadow-xs text-left animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                  <Trophy className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                  <span>达成新成就！({unlockedAchievements.length})</span>
                </div>
                <span className="text-[9px] text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded-full font-bold">
                  +荣誉奖杯
                </span>
              </div>
              <div className="space-y-1">
                {unlockedAchievements.map((ach) => {
                  const rStyle = RARITY_STYLES[ach.rarity];
                  return (
                    <div
                      key={ach.id}
                      className="flex items-center gap-2 p-1.5 bg-white/90 rounded-xl border border-amber-200/80 shadow-xs"
                    >
                      <AchievementIcon
                        iconName={ach.icon}
                        rarity={ach.rarity}
                        isUnlocked={true}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-[#1c2e27] truncate">
                            {ach.title}
                          </span>
                          <span
                            className={`text-[8px] px-1 py-0.2 rounded border font-semibold ${rStyle.badge}`}
                          >
                            {rStyle.label}
                          </span>
                        </div>
                        <p className="text-[9px] text-[#52655b] truncate">{ach.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-1.5 shrink-0 pt-1">
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm sm:text-base font-bold rounded-2xl shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>前往下一重天</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRestart}
              className="py-2 px-3 bg-white hover:bg-[#edf3e8] text-[#2c4038] border border-[#d2dcd0] text-xs sm:text-sm font-semibold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#52665e]" />
              <span>重新挑战</span>
            </button>

            <button
              onClick={onOpenLevelSelect}
              className="py-2 px-3 bg-white hover:bg-[#edf3e8] text-[#2c4038] border border-[#d2dcd0] text-xs sm:text-sm font-semibold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>神木通天图</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {onOpenFloraCompendium && (
              <button
                onClick={onOpenFloraCompendium}
                className="py-1.5 px-2.5 bg-[#e8f5ed] hover:bg-[#d8ede0] text-[#1c4b35] border border-emerald-300 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>百花图鉴</span>
              </button>
            )}

            {onOpenAchievements && (
              <button
                onClick={onOpenAchievements}
                className="py-1.5 px-2.5 bg-[#f0f4ee] hover:bg-[#e4ece0] text-[#34483e] border border-[#d2dcd0] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>荣誉殿堂</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
