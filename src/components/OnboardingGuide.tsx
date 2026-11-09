/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Droplets, Flower2, Star, Sparkles, Hand, X } from 'lucide-react';

interface OnboardingGuideProps {
  isOpen: boolean;
  levelTitle: string;
  maxSteps: number;
  parSteps?: number;
  onClose: () => void;
  onOpenRules?: () => void;
}

/**
 * First-run coach marks for level 1. Three short beats:
 * how to rotate -> how to win -> how the 4-star rating works.
 */
const SLIDE_COUNT = 3;

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  isOpen,
  levelTitle,
  maxSteps,
  parSteps,
  onClose,
  onOpenRules,
}) => {
  const [slide, setSlide] = useState(0);

  // Arrow keys move between beats on desktop; Esc closes the guide.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlide((s) => Math.max(0, s - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSlide((s) => Math.min(SLIDE_COUNT - 1, s + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const par = parSteps && parSteps > 0 ? parSteps : Math.max(1, Math.round(maxSteps * 0.5));

  const slides = [
    {
      tag: '第一步 · 引泉',
      title: '点一下水渠，就转 90°',
      body: '轻点任意一段水渠，它会顺时针旋转 90°，每一次旋转都消耗 1 步。',
      note: '长按棋盘可以透视所有水渠的端口朝向。',
      icon: Hand,
      accent: 'from-emerald-500 to-teal-600',
      visual: (
        <div className="flex items-center justify-center gap-3">
          <div className="relative w-16 h-16 rounded-2xl bg-[#0f2f24] border border-emerald-400/40 flex items-center justify-center shadow-inner">
            <div className="w-12 h-3 rounded-full bg-gradient-to-r from-emerald-300 to-teal-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            <span className="absolute -top-2 -right-2 text-[10px] font-bold text-emerald-200 bg-emerald-700/80 rounded-full px-1.5 py-0.5 border border-emerald-400/50">
              0°
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-500" />
          <div className="relative w-16 h-16 rounded-2xl bg-[#0f2f24] border border-emerald-400/40 flex items-center justify-center shadow-inner">
            <div className="w-3 h-12 rounded-full bg-gradient-to-b from-emerald-300 to-teal-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            <span className="absolute -top-2 -right-2 text-[10px] font-bold text-emerald-200 bg-emerald-700/80 rounded-full px-1.5 py-0.5 border border-emerald-400/50">
              90°
            </span>
          </div>
        </div>
      ),
    },
    {
      tag: '第二步 · 通脉',
      title: '让灵泉流到每一朵仙花',
      body: '从泉眼出发，把水渠端口对齐，连成一条不断的水脉。全部仙花点亮即可通关。',
      note: '断开的水渠会让下游整片熄灭，先接通主干再处理支路。',
      icon: Flower2,
      accent: 'from-teal-500 to-emerald-700',
      visual: (
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-900/40 border border-cyan-400/50 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-cyan-300" />
          </div>
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          <div className="w-12 h-12 rounded-2xl bg-emerald-900/40 border border-emerald-400/50 flex items-center justify-center">
            <Flower2 className="w-6 h-6 text-pink-300" />
          </div>
          <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" />
          <div className="w-12 h-12 rounded-2xl bg-amber-900/40 border border-amber-400/50 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
        </div>
      ),
    },
    {
      tag: '第三步 · 评分',
      title: '用最少步数拿下第 4 颗星',
      body: `本关限定 ${maxSteps} 步，其中 ${par} 步就是设计上的最少步数——达成即可点亮第 4 颗星。`,
      note: '步数超了也能通关，但星星会相应减少：通关 1★，越接近最少步数星越多。',
      icon: Star,
      accent: 'from-amber-400 to-orange-500',
      visual: (
        <div className="flex items-center justify-center gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <Star
              key={n}
              className={`w-7 h-7 ${
                n === 4
                  ? 'text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                  : 'text-amber-500 fill-amber-400'
              }`}
            />
          ))}
        </div>
      ),
    },
  ];

  const current = slides[slide];
  const Icon = current.icon;
  const isLast = slide === slides.length - 1;

  return (
    <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full sm:max-w-sm bg-[#f7faf4] border-t sm:border border-[#dce3d5] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
              新手引导
            </span>
            <span className="text-[11px] text-[#5c7167]">第 1 关 · {levelTitle}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="跳过引导"
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual */}
        <div className="mx-4 mb-3 h-32 rounded-2xl bg-gradient-to-b from-[#0e2b21] to-[#08201a] border border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,#34d399_0%,transparent_60%)]" />
          <div className="relative z-10">{current.visual}</div>
        </div>

        {/* Copy */}
        <div className="px-5 pb-1">
          <div className={`flex items-center gap-1.5 text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r ${current.accent}`}>
            <Icon className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">{current.tag}</span>
          </div>
          <h3 className="text-lg font-black text-[#133325] mt-1 leading-snug">
            {current.title}
          </h3>
          <p className="text-xs text-[#48604f] leading-relaxed mt-1.5">{current.body}</p>
          <p className="text-[11px] text-[#7a8c81] leading-relaxed mt-1.5">{current.note}</p>
        </div>

        {/* Footer */}
        <div className="px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`第 ${idx + 1} 步`}
                onClick={() => setSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === slide ? 'w-5 bg-emerald-600' : 'w-1.5 bg-[#cfdccb]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onOpenRules && (
              <button
                onClick={onOpenRules}
                className="px-3 py-2.5 text-xs font-semibold text-[#3f5a4c] bg-white border border-[#d6e0d1] rounded-xl hover:bg-[#eef4e9] transition-colors cursor-pointer"
              >
                规则
              </button>
            )}
            <button
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              disabled={slide === 0}
              aria-label="上一步"
              className={`shrink-0 px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-0.5 transition-colors ${
                slide === 0
                  ? 'bg-[#f1f4ee] border-[#e3e9dd] text-[#9fada3] cursor-not-allowed'
                  : 'bg-[#eaf3e6] border-[#cfe0c8] text-[#2f4a3b] hover:bg-[#dfeeda] active:scale-[0.99] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一步</span>
            </button>
            <button
              onClick={() => (isLast ? onClose() : setSlide((s) => s + 1))}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm font-bold shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>{isLast ? '开始引泉' : '下一步'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
