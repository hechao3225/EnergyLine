/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { getFlowerForLevel } from '../data/flowers';
import { FlowerIcon } from './FlowerIcon';
import { Droplets, Sparkles, Trees } from 'lucide-react';

interface SacredTreeBranchWidgetProps {
  clearedCount: number;
  latestLevelId?: number;
  isSprouting?: boolean;
  onClickTree?: () => void;
}

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
      className={`group px-3 py-1.5 rounded-2xl bg-white/75 hover:bg-white border transition-all cursor-pointer flex items-center justify-between gap-2.5 shadow-xs ${
        isSprouting
          ? 'border-emerald-400 ring-2 ring-emerald-300/60 shadow-emerald-500/20'
          : 'border-[#d6dfce]'
      }`}
      title="点击查看99关通天神木生长全景"
    >
      {/* Mini living Branch with SVG leaves and flowers */}
      <div className="flex items-center gap-2">
        <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 flex items-center justify-center text-white shrink-0 shadow-xs">
          {isSprouting ? (
            <div className="animate-spin text-xs">💧</div>
          ) : (
            <Trees className="w-4 h-4 text-emerald-100" />
          )}

          {/* Tiny glowing dewdrop */}
          {isSprouting && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#143526] leading-none">
              神木生机
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-mono font-bold">
              {clearedCount}/99
            </span>
          </div>
          <span className="text-[10px] text-[#526e60] mt-0.5">
            {isSprouting ? '💧 灵泉涌动 · 萌发新芽！' : '甘霖滋养，通天大树生长中'}
          </span>
        </div>
      </div>

      {/* Decorative latest blossom */}
      <div className="flex items-center gap-1 shrink-0">
        <FlowerIcon
          isBlooming={true}
          petalColor={flower.petalColor}
          glowColor={flower.glowColor}
          coreColor={flower.coreColor}
          shape={flower.shape}
          size={22}
          className={isSprouting ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}
        />
      </div>
    </div>
  );
};
