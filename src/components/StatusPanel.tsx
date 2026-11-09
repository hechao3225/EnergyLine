/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RotateCcw, Home, ArrowRight, Grid, Plus, Trophy, Star } from 'lucide-react';
import { getStarThresholds, getStarsForSteps } from '../utils/rating';

interface StatusPanelProps {
  currentLevelIndex: number;
  totalLevels: number;
  levelTitle: string;
  remainingSteps: number;
  litCount: number;
  totalBulbs: number;
  isAllLit: boolean;
  hintText: string;
  winText: string;
  maxSteps: number;
  bestSteps?: number;
  parSteps?: number;
  onNextLevel: () => void;
  onRestart: () => void;
  onHome: () => void;
  onAddSteps?: () => void;
  onOpenLevelSelect?: () => void;
  hasNextLevel: boolean;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  currentLevelIndex,
  totalLevels,
  levelTitle,
  remainingSteps,
  litCount,
  totalBulbs,
  isAllLit,
  hintText,
  winText,
  maxSteps,
  bestSteps,
  parSteps,
  onNextLevel,
  onRestart,
  onHome,
  onAddSteps,
  onOpenLevelSelect,
  hasNextLevel,
}) => {
  const isOutOfSteps = remainingSteps <= 0 && !isAllLit;
  const formattedIndex = String(currentLevelIndex).padStart(2, '0');
  const formattedTotal = String(totalLevels).padStart(2, '0');
  const thresholds = getStarThresholds({ maxSteps, parSteps });
  const earnedStars =
    bestSteps !== undefined ? getStarsForSteps(bestSteps, { maxSteps, parSteps }) : 0;

  return (
    <div className="w-full max-w-sm bg-[#f7faf4] border border-[#dce3d5] rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(30,45,35,0.03)] flex flex-col justify-between">
      <div>
        {/* Section 1: Level Indicator strictly matching Screenshot */}
        <div className="mb-5">
          <span className="text-sm font-normal text-[#54675e]">
            当前关卡
          </span>
          <div className="text-4xl sm:text-[42px] font-bold tracking-tight text-[#1c2e27] font-mono tabular-nums mt-1 mb-2">
            {formattedIndex} / {formattedTotal}
          </div>
          <h3 className="text-xl font-bold text-[#1c2e27]">
            {levelTitle}
          </h3>
        </div>

        {/* Section 2: Step Counter & Progress */}
        <div className="space-y-3.5 mb-6 pt-4 border-t border-[#e2e9dc]">
          {/* Steps Left */}
          <div className="flex items-baseline justify-between">
            <span className="text-base text-[#3d5147]">
              剩余步数
            </span>
            <span
              className={`text-4xl font-bold font-mono tabular-nums ${
                isOutOfSteps
                  ? 'text-red-500 animate-pulse'
                  : remainingSteps <= 3
                  ? 'text-amber-600'
                  : 'text-[#1c2e27]'
              }`}
            >
              {remainingSteps}
            </span>
          </div>

          {/* Best Steps (if recorded) / 4-star target */}
          {bestSteps !== undefined ? (
            <div className="flex items-center justify-between text-xs text-[#52665e] py-1 px-2.5 rounded-xl bg-white/70 border border-[#e2ebd0]">
              <span className="flex items-center gap-1.5 font-medium text-[#3b4e45]">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>历史最佳</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3, 4].map((n) => (
                    <Star
                      key={n}
                      className={`w-3 h-3 ${
                        n <= earnedStars
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#d3dfcd]'
                      }`}
                    />
                  ))}
                </span>
                <span className="font-mono font-bold text-teal-800">{bestSteps} 步</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-[#52665e] py-1 px-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <span className="flex items-center gap-1.5 font-medium text-amber-900">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>满星目标（4★）</span>
              </span>
              <span className="font-mono font-bold text-amber-800">≤ {thresholds.par} 步</span>
            </div>
          )}

          {/* Lit Progress */}
          <div className="text-base text-[#3d5147] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>🌸</span>
              <span>已唤醒仙花</span>
            </span>
            <span className="font-mono tabular-nums font-bold text-emerald-800">
              {litCount} / {totalBulbs}
            </span>
          </div>
        </div>

        {/* Section 3: Status / Motivational message */}
        <div className="py-2 mb-6 min-h-[60px]">
          <p className="text-[15px] leading-relaxed text-[#3d5147] whitespace-pre-line font-normal">
            {isAllLit
              ? winText || '万花盛开，灵气盎然！\n准备好踏上更高的神木枝桠了吗？'
              : isOutOfSteps
              ? '甘霖暂歇，步数已尽！\n请点击下方重新开始再试一次。'
              : hintText || '旋转榫卯水渠，引灵泉活水灌溉沉睡的花苞。'}
          </p>
        </div>
      </div>

      {/* Section 4: Action Buttons (Matching Screenshot layout) */}
      <div className="space-y-3">
        {/* If out of steps, offer quick step top-up */}
        {isOutOfSteps && onAddSteps && (
          <button
            onClick={onAddSteps}
            className="w-full py-3 px-4 bg-[#0d9488] hover:bg-[#0f766e] text-white text-sm font-semibold rounded-2xl shadow-[0_2px_10px_rgba(13,148,136,0.25)] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] animate-pulse"
          >
            <Plus className="w-4 h-4" />
            <span>补充 10 步继续探索</span>
          </button>
        )}

        {/* If Won & Has Next Level: Top button is "下一关" */}
        {isAllLit && hasNextLevel ? (
          <button
            onClick={onNextLevel}
            className="w-full py-3.5 px-5 bg-[#115e59] hover:bg-[#0e4e4a] text-white text-base font-semibold rounded-2xl shadow-[0_2px_10px_rgba(17,94,89,0.22)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>下一关</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          /* Otherwise top button is "重新开始" */
          <button
            onClick={onRestart}
            className="w-full py-3.5 px-5 bg-white hover:bg-[#edf3e8] text-[#1c2e27] border border-[#cbd6c7] text-base font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4 text-[#52665e]" />
            <span>重新开始</span>
          </button>
        )}

        {/* Bottom button is "返回首页" (Matching Screenshot) */}
        <button
          onClick={onHome}
          className="w-full py-3.5 px-5 bg-white hover:bg-[#edf3e8] text-[#1c2e27] border border-[#cbd6c7] text-base font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <Home className="w-4 h-4 text-[#52665e]" />
          <span>返回首页</span>
        </button>

        {/* Subtle quick level select switch */}
        {onOpenLevelSelect && (
          <div className="text-center pt-1">
            <button
              onClick={onOpenLevelSelect}
              className="text-xs text-[#5f7469] hover:text-[#115e59] transition-colors inline-flex items-center gap-1 font-medium"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>选择其他关卡</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
