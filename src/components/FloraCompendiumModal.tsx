/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { getAllFlowers, getFlowerForLevel } from '../data/flowers';
import { FlowerEntry, FlowerRarity } from '../types/flower';
import { FlowerIcon } from './FlowerIcon';
import { X, Sparkles, Droplets, Trophy, Lock, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import bulbLitImg from '../assets/bulb_lit.png';
import bulbUnlitImg from '../assets/bulb_unlit.png';
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

interface FloraCompendiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  clearedLevels: number[];
  bestStepsRecord: Record<number, number>;
  onSelectLevel?: (levelId: number) => void;
}

const RARITY_LABELS: Record<FlowerRarity, { label: string; bg: string; text: string; border: string }> = {
  common: { label: '凡品', bg: 'bg-emerald-950/70', text: 'text-emerald-300', border: 'border-emerald-600/40' },
  rare: { label: '灵品', bg: 'bg-cyan-950/70', text: 'text-cyan-300', border: 'border-cyan-500/40' },
  epic: { label: '仙品', bg: 'bg-purple-950/70', text: 'text-purple-300', border: 'border-purple-500/40' },
  legendary: { label: '神品', bg: 'bg-amber-950/80', text: 'text-amber-300', border: 'border-amber-400/60' },
};

export const FloraCompendiumModal: React.FC<FloraCompendiumModalProps> = ({
  isOpen,
  onClose,
  clearedLevels,
  bestStepsRecord,
  onSelectLevel,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<number>(0); // 0 = all, 1..5 = chapters
  const [activeFlower, setActiveFlower] = useState<FlowerEntry | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const clearedSet = useMemo(() => new Set(clearedLevels), [clearedLevels]);
  const allFlowers = useMemo(() => getAllFlowers(), []);

  // Filter flowers
  const filteredFlowers = useMemo(() => {
    if (selectedChapter === 0) return allFlowers;
    return allFlowers.filter((f) => f.chapter === selectedChapter);
  }, [allFlowers, selectedChapter]);

  // Pagination for mobile zero-scroll (12 flowers per page)
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredFlowers.length / ITEMS_PER_PAGE) || 1;
  const displayedFlowers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFlowers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFlowers, currentPage]);

  const unlockedTotal = useMemo(() => {
    return allFlowers.filter((f) => clearedSet.has(f.id)).length;
  }, [allFlowers, clearedSet]);

  const progressPercent = Math.round((unlockedTotal / 99) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#0a231b] via-[#0f2f25] to-[#081813] border-2 border-emerald-500/30 shadow-2xl flex flex-col text-white overflow-hidden"
        style={{ maxHeight: '95dvh' }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between shrink-0 bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-xs border border-emerald-300/30">
              <BookOpen className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  百花图鉴 · 神木花谱
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  {unlockedTotal} / 99
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70">
                每通关一重水脉，即在花谱中唤醒一株天地灵葩
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar & Chapter Filter Bar */}
        <div className="px-4 py-2 border-b border-emerald-500/10 bg-black/10 shrink-0 space-y-2">
          {/* Progress row */}
          <div className="flex items-center justify-between text-[11px] text-emerald-300">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>神木复苏总进度</span>
            </span>
            <span className="font-mono font-bold text-amber-300">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-emerald-500/20">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Chapter Selector Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-[11px]">
            {[
              { id: 0, label: '全部花谱', badge: null },
              { id: 1, label: '一·地脉', badge: chapterBadge1 },
              { id: 2, label: '二·巨干', badge: chapterBadge2 },
              { id: 3, label: '三·繁枝', badge: chapterBadge3 },
              { id: 4, label: '四·云海', badge: chapterBadge4 },
              { id: 5, label: '五·天巅', badge: chapterBadge5 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedChapter(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                  selectedChapter === tab.id
                    ? 'bg-emerald-500 text-white shadow-xs font-bold ring-1 ring-emerald-300/40'
                    : 'bg-white/5 text-emerald-200/70 hover:bg-white/10'
                }`}
              >
                {tab.badge && (
                  <img src={tab.badge} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                )}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Flower Grid (12 Items) */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {displayedFlowers.map((flower) => {
              const isUnlocked = clearedSet.has(flower.id);
              const rarityStyle = RARITY_LABELS[flower.rarity];
              const bestSteps = bestStepsRecord[flower.id];

              return (
                <div
                  key={flower.id}
                  onClick={() => setActiveFlower(flower)}
                  className={`relative p-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-[#133327] to-[#0c241b] border-emerald-500/40 hover:border-emerald-400 hover:scale-[1.02] shadow-sm'
                      : 'bg-black/30 border-white/5 opacity-60 hover:opacity-80'
                  }`}
                >
                  {/* Top Level ID Tag */}
                  <div className="w-full flex items-center justify-between text-[9px] font-mono px-1">
                    <span className="text-emerald-400/80">#{flower.id}</span>
                    {isUnlocked ? (
                      <span className={`px-1 py-0.2 rounded-full border text-[8px] font-bold ${rarityStyle.bg} ${rarityStyle.text} ${rarityStyle.border}`}>
                        {rarityStyle.label}
                      </span>
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-white/30" />
                    )}
                  </div>

                  {/* Visual Center Flower Icon */}
                  <div className="my-1.5 flex items-center justify-center">
                    {isUnlocked ? (
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <img
                          src={bulbLitImg}
                          alt={flower.name}
                          className="w-full h-full object-contain"
                          style={{ filter: `drop-shadow(0 0 7px ${flower.glowColor || '#34d399'})` }}
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1">
                        <img
                          src={bulbUnlitImg}
                          alt="沉睡未醒"
                          className="w-full h-full object-contain opacity-55 grayscale-[35%]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="w-full truncate text-[11px] font-bold text-white tracking-tight">
                    {isUnlocked ? flower.name : '未唤醒仙花'}
                  </div>

                  {/* Subtitle / Best steps */}
                  <div className="text-[9px] text-emerald-200/60 mt-0.5 font-mono">
                    {isUnlocked ? (
                      bestSteps ? `最佳 ${bestSteps} 步` : '已收录'
                    ) : (
                      `通关第${flower.id}关`
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination & Status Footer */}
        <div className="px-4 py-2.5 border-t border-emerald-500/20 bg-black/25 flex items-center justify-between shrink-0 text-xs">
          <div className="text-[11px] text-emerald-200/70 font-mono">
            页码 {currentPage} / {totalPages} (共 {filteredFlowers.length} 朵)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Flower Detail Overlay Modal */}
        {activeFlower && (
          <div className="absolute inset-0 z-60 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#103326] to-[#071912] border-2 border-emerald-400/50 p-5 shadow-2xl flex flex-col items-center text-center relative">
              <button
                onClick={() => setActiveFlower(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Rarity & Level Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-emerald-300">
                  第 {activeFlower.id} 关 · {activeFlower.chapterName}
                </span>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${RARITY_LABELS[activeFlower.rarity].bg} ${RARITY_LABELS[activeFlower.rarity].text} ${RARITY_LABELS[activeFlower.rarity].border}`}>
                  {RARITY_LABELS[activeFlower.rarity].label}
                </span>
              </div>

              {/* Large Flower Showcase */}
              <div className="relative my-3 w-28 h-28 flex items-center justify-center">
                {/* Background Altar Halo */}
                <div
                  className="absolute inset-0 rounded-full blur-lg opacity-40 animate-pulse"
                  style={{
                    backgroundColor: clearedSet.has(activeFlower.id)
                      ? (activeFlower.glowColor || '#10b981')
                      : '#3a5043'
                  }}
                />
                <div className="relative z-10 w-full h-full rounded-3xl bg-gradient-to-b from-[#103326] to-[#071912] border-2 border-emerald-500/40 p-2 shadow-2xl flex items-center justify-center">
                  {clearedSet.has(activeFlower.id) ? (
                    <img
                      src={bulbLitImg}
                      alt={activeFlower.name}
                      className="w-full h-full object-contain animate-in zoom-in-75 duration-300"
                      style={{
                        filter: `drop-shadow(0 0 14px ${activeFlower.glowColor || '#34d399'}) drop-shadow(0 0 4px ${activeFlower.petalColor || '#10b981'})`
                      }}
                    />
                  ) : (
                    <img
                      src={bulbUnlitImg}
                      alt="沉睡未醒"
                      className="w-[85%] h-[85%] object-contain opacity-70 grayscale-[25%]"
                    />
                  )}
                </div>
                {/* Chapter Medallion floating */}
                <div className="absolute -bottom-2 -right-2 z-20 w-8 h-8 rounded-full drop-shadow-md">
                  <img
                    src={CHAPTER_BADGES[activeFlower.chapter] || chapterBadge1}
                    alt={activeFlower.chapterName}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title & Alias */}
              <h4 className="text-xl font-extrabold text-white tracking-wide">
                {clearedSet.has(activeFlower.id) ? activeFlower.name : '沉睡未醒的仙花'}
              </h4>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                {clearedSet.has(activeFlower.id) ? `「${activeFlower.alias}」` : '等待甘霖唤醒'}
              </p>

              {/* Lore & Blessing */}
              <div className="mt-3 p-3 rounded-2xl bg-black/30 border border-emerald-500/20 text-xs text-emerald-100/90 leading-relaxed text-left w-full space-y-2">
                {clearedSet.has(activeFlower.id) ? (
                  <>
                    <p>{activeFlower.lore}</p>
                    <div className="pt-1.5 border-t border-emerald-500/20 flex items-center gap-1.5 text-[11px] text-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{activeFlower.blessing}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-white/50 py-2">
                    当前枝桠的灵脉尚未接通。<br />通关第 {activeFlower.id} 关即可唤醒此花并收录入谱。
                  </p>
                )}
              </div>

              {/* Play / Replay button */}
              {onSelectLevel && (
                <button
                  onClick={() => {
                    onSelectLevel(activeFlower.id);
                    setActiveFlower(null);
                    onClose();
                  }}
                  className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Droplets className="w-3.5 h-3.5 fill-current" />
                  <span>前往第 {activeFlower.id} 关唤醒</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
