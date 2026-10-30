/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Droplets, Sparkles, Flower2, ChevronRight, Play, BookOpen, Compass, ArrowRight } from 'lucide-react';

interface StoryPrologueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: () => void;
}

export const StoryPrologueModal: React.FC<StoryPrologueModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      chapter: '序幕 · 乾坤灵脉',
      title: '万载神树 · 灵泉枯竭',
      subtitle: '古老的通天世界树，滋养着九十九重生灵秘境',
      narrative:
        '天地初开，混沌孕育出一株擎天巨木——通天神树。它的根系扎入大地灵脉深处，自源头涌出永不枯竭的生命灵泉，沿树干玉石水渠分流流淌，维系着整座大千世界的生机平衡。',
      loreDetail: '然而一次天地灵脉异动，震落了神树躯干内的翡翠水渠，清泉断流，干涸的阴影自树根蔓延……',
      icon: Droplets,
      iconColor: 'text-cyan-500',
      bgGradient: 'from-[#0b2720] via-[#0f382c] to-[#061814]',
      badge: '世界之树的危机',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a231c] to-[#04120e] flex items-center justify-center border border-emerald-500/20 shadow-inner">
          {/* Animated Background Ripple Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-cyan-500/20 animate-ping opacity-30" />
            <div className="w-28 h-28 rounded-full border border-emerald-400/30 animate-pulse" />
          </div>

          {/* SVG Ancient Dried Tree Illustration */}
          <svg viewBox="0 0 200 160" className="w-48 h-36 z-10">
            {/* Roots */}
            <path d="M70 140 Q 100 115 100 80 Q 100 115 130 140" stroke="#3d5a49" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M85 140 Q 100 125 100 95 Q 100 125 115 140" stroke="#2c4236" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            
            {/* Trunk */}
            <path d="M96 110 L96 45 Q 80 30 65 25" stroke="#4a6b57" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M104 110 L104 45 Q 120 30 135 25" stroke="#4a6b57" strokeWidth="6" fill="none" strokeLinecap="round" />
            
            {/* Dried Conduit Slot */}
            <path d="M100 100 L100 50" stroke="#1b2a22" strokeWidth="3" strokeDasharray="4 3" fill="none" />
            
            {/* Central Spring Eye Well */}
            <circle cx="100" cy="115" r="14" fill="#143026" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="100" cy="115" r="7" fill="#06b6d4" className="animate-pulse" />
            <circle cx="100" cy="115" r="3" fill="#ffffff" />

            {/* Droplets descending */}
            <circle cx="100" cy="85" r="2" fill="#38bdf8" opacity="0.6" />
            <circle cx="100" cy="65" r="2" fill="#38bdf8" opacity="0.4" />
          </svg>

          <div className="absolute bottom-2.5 px-3 py-1 bg-black/40 backdrop-blur-xs rounded-full border border-emerald-500/20 text-[11px] text-emerald-200/90 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            灵脉断绝 · 九十九重枝桠陷入枯寂
          </div>
        </div>
      ),
    },
    {
      chapter: '第二幕 · 沉眠之谷',
      title: '百花闭阖 · 待泉重辉',
      subtitle: '沉睡的花蕾失去了生命露华，唯有甘霖能令其舒展',
      narrative:
        '散落在神树各重天际的仙灵奇花，因断绝了甘霖，纷纷闭阖成紧锁的花苞。若长此以往，花心孕育的天地灵种将彻底消散，神树繁茂的枝冠亦将随之枯萎凋零。',
      loreDetail: '传说只要重新将翡翠水渠榫卯对齐，引导涓涓泉水直达花蒂，仙花便会在一瞬之间舒展盛放，重新将无尽灵韵反哺整株神树。',
      icon: Flower2,
      iconColor: 'text-amber-400',
      bgGradient: 'from-[#17241c] via-[#21382b] to-[#0c1813]',
      badge: '沉睡的花仙之魂',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-b from-[#132820] to-[#091510] flex items-center justify-center border border-amber-500/20 shadow-inner">
          <div className="flex items-center justify-center gap-6 sm:gap-10 z-10">
            {/* Closed Bud (Sleeping) */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#1e3b2e] border-2 border-emerald-800/80 flex items-center justify-center shadow-lg relative">
                <svg viewBox="0 0 40 40" className="w-9 h-9">
                  {/* Stem */}
                  <path d="M20 36 L20 28" stroke="#485f55" strokeWidth="3" strokeLinecap="round" />
                  {/* Closed Sepals & Bud */}
                  <ellipse cx="20" cy="20" rx="9" ry="12" fill="#2d4a3b" stroke="#475f50" strokeWidth="1.5" />
                  <path d="M15 24 Q 20 12 25 24" fill="#3a5c4a" />
                  <circle cx="20" cy="18" r="3" fill="#608b73" />
                </svg>
                <div className="absolute -bottom-2 px-1.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-600 text-[9px] text-slate-300">
                  沉睡待引
                </div>
              </div>
              <span className="text-xs text-emerald-300/80 font-medium mt-3">未通活水 · 闭阖</span>
            </div>

            {/* Dynamic Water Arrow */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-2 bg-gradient-to-r from-emerald-800 via-cyan-400 to-emerald-400 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40 animate-[shimmer_1.5s_infinite]" />
              </div>
              <span className="text-[10px] text-cyan-300 font-mono mt-1">清泉引灌 💧</span>
            </div>

            {/* Blooming Flower (Awakened) */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#264b3c] to-[#122e23] border-2 border-[#10b981] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)] relative animate-pulse">
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  {/* Petals Radiant */}
                  <circle cx="20" cy="20" r="15" fill="#f43f5e" opacity="0.15" />
                  <circle cx="20" cy="13" r="5" fill="#fb7185" />
                  <circle cx="20" cy="27" r="5" fill="#fb7185" />
                  <circle cx="13" cy="20" r="5" fill="#fb7185" />
                  <circle cx="27" cy="20" r="5" fill="#fb7185" />
                  <circle cx="20" cy="20" r="6" fill="#fef08a" stroke="#f59e0b" strokeWidth="1" />
                  <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
                </svg>
                <div className="absolute -bottom-2 px-1.5 py-0.5 rounded-full bg-emerald-600 text-[9px] text-white font-bold shadow-xs">
                  绽放觉醒 🌸
                </div>
              </div>
              <span className="text-xs text-amber-300 font-semibold mt-3">百花盛放 · 吐露灵韵</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      chapter: '第三幕 · 守树人之誓',
      title: '旋转水渠 · 唤醒神树',
      subtitle: '你将化身引水灵官，重筑九十九重登仙古渠',
      narrative:
        '而今，你手握通天神树的「灵木转轴」。每一次轻触旋转古玉水渠，都是在编织大地与苍穹的生命经络。步数有限，唯有最敏锐的智慧，方能让甘霖不偏不倚流向每一朵沉睡之花！',
      loreDetail: '自地脉之根（1~20关），历巨木之干（21~40关）、苍翠繁枝（41~60关）、云海天桥（61~80关），直至九十九重天顶神树之巅，开启万花朝宗盛景！',
      icon: Sparkles,
      iconColor: 'text-emerald-400',
      bgGradient: 'from-[#0b2b22] via-[#103d30] to-[#081a14]',
      badge: '启程出征',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e3127] to-[#071913] flex flex-col items-center justify-center border border-emerald-400/30 shadow-inner px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg border border-emerald-300/40 mb-2.5 animate-bounce">
            <Compass className="w-6 h-6 text-emerald-100" />
          </div>
          <h4 className="text-base font-extrabold text-emerald-100 tracking-wide">
            神树已待，灵泉初涌
          </h4>
          <p className="text-xs text-emerald-200/80 mt-1 max-w-xs leading-relaxed">
            轻触旋转水渠，连通水脉回路。<br />
            将沉睡的花苞悉数唤醒，谱写属于你的通天神木传奇！
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-600/40 text-[10px] text-emerald-300">
              🌱 5大古树仙境
            </span>
            <span className="px-2 py-0.5 rounded-md bg-cyan-900/60 border border-cyan-600/40 text-[10px] text-cyan-300">
              💧 99道神木玄关
            </span>
            <span className="px-2 py-0.5 rounded-md bg-amber-900/60 border border-amber-600/40 text-[10px] text-amber-300">
              🌸 步数极限探秘
            </span>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem('sacred_tree_story_seen', 'true');
    onClose();
    if (onStartGame) onStartGame();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div
        className={`w-full max-w-lg rounded-3xl bg-gradient-to-b ${current.bgGradient} border-2 border-emerald-500/40 shadow-2xl overflow-hidden flex flex-col text-white transition-all duration-300`}
        style={{ maxHeight: '94dvh' }}
      >
        {/* Top Header / Progress Indicator */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
              {current.badge}
            </span>
            <span className="text-xs text-emerald-200/60 font-medium font-mono">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          <button
            onClick={handleFinish}
            className="text-xs text-emerald-300/70 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            跳过序幕
          </button>
        </div>

        {/* Story Body Scrollable Area */}
        <div className="px-5 py-3 sm:py-4 overflow-y-auto space-y-3.5 flex-1">
          {/* Main Visual Illustration */}
          {current.illustration}

          {/* Titles */}
          <div>
            <div className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase mb-0.5">
              {current.chapter}
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{current.title}</span>
            </h3>
            <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
              {current.subtitle}
            </p>
          </div>

          {/* Narrative Paragraph */}
          <div className="p-3 rounded-2xl bg-black/25 border border-emerald-500/20 text-xs text-emerald-100/90 leading-relaxed font-sans space-y-2">
            <p>{current.narrative}</p>
            <p className="text-[11px] text-emerald-300/80 italic border-l-2 border-cyan-400 pl-2 mt-1">
              {current.loreDetail}
            </p>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between shrink-0 gap-3">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`第 ${idx + 1} 幕`}
              />
            ))}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <button
                onClick={() => setCurrentSlide(currentSlide - 1)}
                className="px-3 py-1.5 rounded-xl border border-white/20 text-xs text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              >
                上一幕
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              {currentSlide === slides.length - 1 ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>踏上神木之旅</span>
                </>
              ) : (
                <>
                  <span>下一幕</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
