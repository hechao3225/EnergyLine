/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { getFlowerForLevel } from '../data/flowers';
import bulbLitImg from '../assets/bulb_lit.png';
import chapterBadge1 from '../assets/chapter_badge_1.png';
import chapterBadge2 from '../assets/chapter_badge_2.png';
import chapterBadge3 from '../assets/chapter_badge_3.png';
import chapterBadge4 from '../assets/chapter_badge_4.png';
import chapterBadge5 from '../assets/chapter_badge_5.png';

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
      className={`group px-2.5 py-1.5 rounded-2xl bg-white/85 hover:bg-white border transition-all cursor-pointer flex items-center justify-between gap-2.5 shadow-xs ${
        isSprouting
          ? 'border-emerald-400 ring-2 ring-emerald-300/60 shadow-emerald-500/20'
          : 'border-[#d6dfce]'
      }`}
      title="点击查看99关通天神木生长全景"
    >
      {/* Chapter Medallion & Title */}
      <div className="flex items-center gap-2 min-w-0">
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
            <span className="text-xs font-bold text-[#143526] leading-none truncate">
              {flower.chapterName}
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100/90 px-1.5 py-0.2 rounded font-mono font-bold shrink-0">
              {clearedCount}/99
            </span>
          </div>
          <span className="text-[10px] text-[#526e60] mt-0.5 truncate">
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
