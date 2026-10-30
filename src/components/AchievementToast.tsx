/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Trophy, X, Sparkles } from 'lucide-react';
import { Achievement } from '../types/achievement';
import { AchievementIcon, RARITY_STYLES } from './AchievementIcon';

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
  onOpenCabinet?: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onDismiss,
  onOpenCabinet,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 4800);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const style = RARITY_STYLES[achievement.rarity];

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 transform pointer-events-auto ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-5 opacity-0 scale-95'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-2 border-amber-300 rounded-2xl p-3.5 shadow-2xl shadow-amber-500/10 flex items-start gap-3">
        {/* Left Trophy Icon */}
        <div className="relative shrink-0">
          <AchievementIcon
            iconName={achievement.icon}
            rarity={achievement.rarity}
            isUnlocked={true}
            size="md"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-md">
              成就达成
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md border font-semibold ${style.badge}`}>
              {style.label}
            </span>
          </div>

          <h4 className="text-sm font-bold text-[#1c2e27] truncate">
            {achievement.title}
          </h4>
          <p className="text-xs text-[#52655b] line-clamp-2 mt-0.5 leading-snug">
            {achievement.description}
          </p>

          {onOpenCabinet && (
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  onDismiss();
                  onOpenCabinet();
                }, 150);
              }}
              className="mt-2 text-[11px] font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <Trophy className="w-3 h-3 text-amber-600" />
              <span>查看荣誉殿堂</span>
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 200);
          }}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
