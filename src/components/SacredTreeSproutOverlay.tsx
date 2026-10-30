/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Sparkles, Droplets, Leaf } from 'lucide-react';
import { getFlowerForLevel } from '../data/flowers';
import { FlowerIcon } from './FlowerIcon';

export interface SproutEvent {
  id: number;
  levelId: number;
  flowerName: string;
  type: 'leaf' | 'flower';
}

interface SacredTreeSproutOverlayProps {
  event: SproutEvent | null;
  clearedCount: number;
  onAnimationEnd?: () => void;
}

export const SacredTreeSproutOverlay: React.FC<SacredTreeSproutOverlayProps> = ({
  event,
  clearedCount,
  onAnimationEnd,
}) => {
  const [stage, setStage] = useState<'idle' | 'infusing' | 'sprouting' | 'bloomed'>('idle');

  useEffect(() => {
    if (!event) {
      setStage('idle');
      return;
    }

    // Sequence the animation steps:
    // 0ms: infusing (water rushing up)
    // 600ms: sprouting (new branch leaf/bud unfolding)
    // 1600ms: bloomed (pollen glow & sparkling)
    // 4200ms: finish
    setStage('infusing');

    const t1 = setTimeout(() => setStage('sprouting'), 600);
    const t2 = setTimeout(() => setStage('bloomed'), 1600);
    const t3 = setTimeout(() => {
      setStage('idle');
      if (onAnimationEnd) onAnimationEnd();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [event, onAnimationEnd]);

  if (!event || stage === 'idle') return null;

  const flower = getFlowerForLevel(event.levelId);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden flex items-start justify-center">
      {/* 1. Ethereal Screen-wide Spring Water Surge Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-emerald-500/10 to-transparent transition-opacity duration-700 ${
          stage === 'infusing' ? 'opacity-100' : 'opacity-40'
        }`}
      />

      {/* 2. Floating Water Droplets rising upward across the screen */}
      <div className="absolute inset-x-0 bottom-0 h-full flex justify-around pointer-events-none">
        {[10, 25, 45, 60, 75, 90].map((leftPercent, idx) => (
          <div
            key={idx}
            className="absolute bottom-10 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] animate-[bounce_2s_infinite]"
            style={{
              left: `${leftPercent}%`,
              animationDelay: `${idx * 0.15}s`,
              transform: `translateY(-${(idx % 3) * 60}px)`,
              opacity: stage === 'infusing' || stage === 'sprouting' ? 0.8 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
      </div>

      {/* 3. Global Sprout Announcement Card at the top */}
      <div className="mt-14 sm:mt-16 mx-4 w-full max-w-sm sm:max-w-md z-60 animate-in slide-in-from-top-4 fade-in duration-500">
        <div className="relative p-3.5 sm:p-4 rounded-3xl bg-[#0a271c]/90 backdrop-blur-md border-2 border-emerald-400/60 shadow-[0_10px_35px_rgba(16,185,129,0.35)] flex items-center gap-3.5 text-white">
          {/* Animated Sprouting Node */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#123829] to-[#071912] border border-emerald-400/40 flex items-center justify-center shrink-0 overflow-visible">
            {/* Pulsing Water Spring Aura */}
            <div className="absolute -inset-1 rounded-2xl bg-cyan-400/30 animate-ping opacity-60" />

            {/* Rising Leaf / Flower Graphic */}
            <div
              className={`transform transition-all duration-700 ${
                stage === 'infusing'
                  ? 'scale-0 rotate-[-45deg] opacity-0'
                  : stage === 'sprouting'
                  ? 'scale-125 rotate-6 opacity-100'
                  : 'scale-100 rotate-0 opacity-100'
              }`}
            >
              {event.type === 'flower' ? (
                <FlowerIcon
                  isBlooming={true}
                  petalColor={flower.petalColor}
                  glowColor={flower.glowColor}
                  coreColor={flower.coreColor}
                  shape={flower.shape}
                  size={42}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Leaf className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                </div>
              )}
            </div>

            {/* Tiny Dew droplet glint */}
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-300 border border-white flex items-center justify-center shadow-xs">
              <Droplets className="w-2 h-2 text-cyan-900 fill-current" />
            </div>
          </div>

          {/* Text Lore Feedback */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>灵泉注入神木 · 枝桠生长！</span>
            </div>
            <div className="text-sm sm:text-base font-black text-white truncate mt-0.5 flex items-center gap-1.5">
              <span>第 {event.levelId} 关已润泽</span>
              <span className="text-xs px-2 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                {event.type === 'flower' ? '🌸 灵花吐蕊' : '🍃 抽新嫩芽'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-0.5 truncate">
              甘霖入体，【{event.flowerName}】在枝头迎晨绽放
            </p>
          </div>

          {/* Tree Vitality Badge */}
          <div className="text-right shrink-0">
            <span className="text-[10px] text-emerald-300 block font-medium">神木生机</span>
            <span className="font-mono text-sm sm:text-base font-black text-amber-300">
              {clearedCount}
              <span className="text-xs text-emerald-400 font-normal">/99</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
