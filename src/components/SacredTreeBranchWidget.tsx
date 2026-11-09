/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { getFlowerForLevel } from '../data/flowers';
import bulbLitImg from '../assets/bulb_lit.webp';
import chapterBadge1 from '../assets/chapter_badge_1.webp';
import chapterBadge2 from '../assets/chapter_badge_2.webp';
import chapterBadge3 from '../assets/chapter_badge_3.webp';
import chapterBadge4 from '../assets/chapter_badge_4.webp';
import chapterBadge5 from '../assets/chapter_badge_5.webp';

interface SacredTreeBranchWidgetProps {
  clearedCount: number;
  latestLevelId?: number;
  isSprouting?: boolean;
  onClickTree?: () => void;
}

const CHAPTER_BADGES: Record<number, string> = {
  1: chapterBadge1,
  2: chapterBadge2,
  3: chapterBadge3,
  4: chapterBadge4,
  5: chapterBadge5,
};

export const SacredTreeBranchWidget: React.FC<SacredTreeBranchWidgetProps> = ({
  clearedCount,
  latestLevelId = 1,
  isSprouting = false,
  onClickTree,
}) => {
  const flower = useMemo(() => getFlowerForLevel(latestLevelId), [latestLevelId]);

  return (
    <div
      onClick={onClickTree}
      className={`group px-3 py-1.5 jade-panel jade-panel-hover cursor-pointer flex items-center justify-between gap-2.5 ${
        isSprouting
          ? 'ring-2 ring-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.35)]'
          : ''
      }`}
      title="点击查看99关通天神木生长全景"
    >
      {/* Chapter Medallion & Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 flex items-center justify-center shrink-0 drop-shadow-sm">
          <img
            src={CHAPTER_BADGES[flower.chapter] || chapterBadge1}
            alt={flower.chapterName}
            className="w-full h-full object-contain"
          />
          {isSprouting && (
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-[#0e2a1d] leading-none whitespace-nowrap">
              {flower.chapterName}
            </span>
            <span className="text-[10px] text-emerald-800 bg-[#deede1] px-1.5 py-0.2 rounded border border-[#afcbb9] font-mono font-bold shrink-0">
              {clearedCount}/99
            </span>
          </div>
          <span className="text-[10px] text-[#4b6757] mt-0.5 truncate">
            {isSprouting ? '💧 灵泉涌动 · 萌发新芽！' : `第 ${flower.chapter} 卷 · 滋养神木主脉`}
          </span>
        </div>
      </div>

      {/* Decorative latest blossom */}
      <div className="flex items-center gap-1 shrink-0 pl-1">
        <img
          src={bulbLitImg}
          alt={flower.name}
          className={`w-6 h-6 object-contain drop-shadow-[0_0_6px_rgba(52,211,153,0.7)] ${
            isSprouting ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'
          }`}
          style={{ filter: `drop-shadow(0 0 6px ${flower.glowColor || '#10b981'})` }}
        />
      </div>
    </div>
  );
};
