/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  Zap,
  RotateCcw,
  Sparkles,
  Milestone,
  Compass,
  Star,
  Crown,
  Trophy,
  Shield,
  Calendar,
  Layers,
} from 'lucide-react';
import { Achievement, AchievementRarity } from '../types/achievement';
import { AchievementIcon, RARITY_STYLES } from './AchievementIcon';
import { CircularProgress } from './CircularProgress';

interface AchievementCardProps {
  achievement: Achievement;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isHovered: externalHovered,
  onHover: externalOnHover,
}) => {
  const [internalHovered, setInternalHovered] = useState(false);
  const isHovered = externalHovered !== undefined ? externalHovered : internalHovered;

  const setHovered = (val: boolean) => {
    setInternalHovered(val);
    if (externalOnHover) externalOnHover(val);
  };

  const isUnlocked = Boolean(achievement.unlockedAt);
  const style = RARITY_STYLES[achievement.rarity];
  const progress = achievement.progress || {
    current: isUnlocked ? 1 : 0,
    max: 1,
    percent: isUnlocked ? 100 : 0,
    unit: '次',
    label: isUnlocked ? '已完成 1/1' : '0/1',
    isCompleted: isUnlocked,
  };

  const percent = isUnlocked ? 100 : progress.percent;

  // Category Icon & Label
  const getCategoryIcon = () => {
    switch (achievement.category) {
      case 'efficiency':
        return <Zap className="w-3 h-3 text-amber-500" />;
      case 'skill':
        return <RotateCcw className="w-3 h-3 text-indigo-500" />;
      case 'progress':
        return <Milestone className="w-3 h-3 text-teal-600" />;
      case 'endless':
        return <Compass className="w-3 h-3 text-purple-600" />;
      default:
        return <Sparkles className="w-3 h-3 text-amber-500" />;
    }
  };

  // Rarity Icon
  const getRarityIcon = (rarity: AchievementRarity) => {
    switch (rarity) {
      case 'common':
        return <Shield className="w-3 h-3 text-slate-500" />;
      case 'rare':
        return <Star className="w-3 h-3 text-blue-500" />;
      case 'epic':
        return <Crown className="w-3 h-3 text-purple-500" />;
      case 'legendary':
        return <Trophy className="w-3 h-3 text-amber-500" />;
    }
  };

  // Ring color based on rarity and state
  const getRingColor = () => {
    if (isUnlocked) {
      return achievement.rarity === 'legendary' ? '#f59e0b' : '#0d9488';
    }
    return '#14b8a6';
  };

  const dateStr = achievement.unlockedAt
    ? new Date(achievement.unlockedAt).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!isHovered)}
      className={`group relative p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3.5 select-none ${
        isUnlocked
          ? 'bg-white border-[#d8e0d3] hover:border-teal-400 hover:shadow-md'
          : 'bg-[#f4f7f1]/80 border-[#e3ebdc] hover:border-slate-300 hover:bg-white'
      }`}
    >
      {/* Icon Wrapped in Circular Progress Ring */}
      <div className="relative shrink-0">
        <CircularProgress
          percent={percent}
          size={52}
          strokeWidth={4.5}
          color={getRingColor()}
          trackColor={isUnlocked ? '#d1fae5' : '#e2e9dc'}
          glow={isUnlocked}
        >
          {/* Achievement Trophy Icon at Center */}
          <AchievementIcon
            iconName={achievement.icon}
            rarity={achievement.rarity}
            isUnlocked={isUnlocked}
            size="sm"
            className="w-8 h-8 rounded-full border-0 shadow-none bg-transparent"
          />
        </CircularProgress>

        {/* Small Status Stamp (Checkmark or Mini Lock) */}
        <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
          {isUnlocked ? (
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[9px] font-bold shadow-xs">
              <Lock className="w-2.5 h-2.5" />
            </div>
          )}
        </div>
      </div>

      {/* Main Visual & Icon Information */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          <span className="text-sm font-bold text-[#1a2d25] truncate">
            {achievement.title}
          </span>
          {/* Visual Icon Pills */}
          <div className="flex items-center gap-1">
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md border text-[10px] font-semibold ${style.badge}`}
              title={`品质: ${style.label}`}
            >
              {getRarityIcon(achievement.rarity)}
            </span>
            <span
              className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md border text-[10px] bg-slate-100 text-slate-700 border-slate-200"
              title={`类别: ${achievement.category}`}
            >
              {getCategoryIcon()}
            </span>
          </div>
        </div>

        {/* Visual Progress Row with Percentage and Numerical Value */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {/* Progress bar visual indicator */}
          <div className="flex-1 h-1.5 bg-[#e4ecd9] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isUnlocked
                  ? 'bg-gradient-to-r from-teal-500 to-amber-500'
                  : 'bg-teal-600'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Quick Numerical Indicator on card */}
          <span className="text-[11px] font-mono font-semibold text-[#445a50] shrink-0">
            {isUnlocked ? '100%' : `${progress.current}/${progress.max}`}
          </span>
        </div>
      </div>

      {/* Hover Floating Details Tooltip with Exact Numerical Values */}
      {isHovered && (
        <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 -translate-y-full z-40 w-72 max-w-xs bg-[#1a2e26] text-white p-3.5 rounded-2xl shadow-2xl border border-teal-500/40 text-left animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          {/* Arrow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#1a2e26]" />

          {/* Top Title & Badges */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-sm text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{achievement.title}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 border border-white/10">
              {style.label} · {percent}%
            </span>
          </div>

          {/* Exact Numerical Progress Value (User highlight: e.g. "已撤销 45/100 次") */}
          <div className="p-2 mb-2 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {getCategoryIcon()}
              <span className="text-xs text-emerald-200 font-medium">当前进度数值</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              {progress.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-200 leading-relaxed mb-2">
            {achievement.description}
          </p>

          {/* Status and Timestamp Footer */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            {isUnlocked ? (
              <span className="text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>已达成 ({dateStr})</span>
              </span>
            ) : (
              <span className="text-amber-200/90 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-300" />
                <span>还需达成: {achievement.hint}</span>
              </span>
            )}
            <span className="font-mono text-slate-400 text-[10px]">
              {progress.current}/{progress.max} {progress.unit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
