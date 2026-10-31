/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameView } from '../types/game';
import { Sparkles, Compass, Hammer, Volume2, VolumeX, Trophy, ScrollText, Maximize } from 'lucide-react';

interface GameHeaderProps {
  currentView: GameView;
  onSelectView: (view: GameView) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  unlockedCount?: number;
  totalCount?: number;
  onOpenProfile?: () => void;
  onOpenRules?: () => void;
  onOpenStory?: () => void;
  onOpenFloraCompendium?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentView,
  onSelectView,
  isMuted,
  onToggleMute,
  unlockedCount = 0,
  totalCount = 14,
  onOpenProfile,
  onOpenRules,
  onOpenStory,
  onOpenFloraCompendium,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-1 sm:pt-1.5 pb-1 sm:pb-2 shrink-0 select-none">
      {/* Desktop Window Title Bar (>= sm) */}
      <div className="hidden sm:flex items-center justify-between py-1 px-3 mb-2 jade-panel text-xs text-[#355244] font-sans">
        <div className="flex items-center gap-2">
          <span className="text-sm">🌱</span>
          <span className="font-bold text-[#102e21] tracking-wide">神树灵泉 · 唤醒百花</span>
          <span className="text-[11px] text-[#4e6b5c] bg-[#e1ece1] px-2 py-0.5 rounded-full border border-[#bad1c3]">
            九十九重通天神木
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {onOpenStory && (
            <button
              onClick={onOpenStory}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg jade-button cursor-pointer text-[11px] font-medium"
              title="重温神树序幕故事"
            >
              <ScrollText className="w-3.5 h-3.5 text-emerald-700" />
              <span>序幕背景</span>
            </button>
          )}

          {onOpenFloraCompendium && (
            <button
              onClick={onOpenFloraCompendium}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg jade-button cursor-pointer text-[11px] font-medium"
              title="查看神木已唤醒的百花图鉴"
            >
              <span className="text-xs">🌸</span>
              <span>百花图鉴</span>
            </button>
          )}

          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg jade-button cursor-pointer text-[11px] font-medium"
              title="查看个人档案与成就奖杯"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>荣誉殿堂</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300">
                {unlockedCount}/{totalCount}
              </span>
            </button>
          )}

          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg jade-button cursor-pointer"
              title={isFullscreen ? '退出全屏' : '全屏体验'}
            >
              <Maximize className="w-3.5 h-3.5 text-emerald-800" />
            </button>
          )}

          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg jade-button cursor-pointer"
            title={isMuted ? '取消静音' : '静音'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-800" />}
          </button>
        </div>
      </div>

      {/* Main Header Row - Unified Jade Panel Decor for Mobile & Desktop */}
      <div className="w-full max-w-[420px] sm:max-w-none mx-auto jade-panel px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left Side: Emblem + Game Title (Strictly Single Line, Never Wraps) */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <button
            onClick={onOpenFloraCompendium}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 p-0.5 shadow-xs flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
            title="点击打开百花图鉴"
          >
            <div className="w-full h-full rounded-[10px] bg-[#edf6ee] flex items-center justify-center text-xs sm:text-base border border-emerald-300/60">
              🌸
            </div>
          </button>

          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-2xl font-black tracking-wider text-[#0e2a1d] leading-none whitespace-nowrap flex items-center gap-1.5">
              <span>神树灵泉</span>
              <span className="hidden sm:inline-block text-[11px] font-normal text-[#4e6b5c] bg-[#e1ece1] px-2 py-0.5 rounded-full border border-[#bad1c3]">
                引水通脉
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-[#4b6757] mt-0.5 tracking-wide hidden sm:block whitespace-nowrap">
              旋转翡翠水渠 · 引导活水甘霖 · 唤醒神树百花
            </p>
          </div>
        </div>

        {/* Right Side: Mode Switcher Tabs + Quick Buttons (Unified, Horizontal, No Wrapping) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Mode Selector Tabs */}
          <div className="flex items-center p-0.5 bg-[#deece0] border border-[#a8c3b2] rounded-xl shadow-inner">
            <button
              onClick={() => onSelectView('story')}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'story'
                  ? 'jade-button-active'
                  : 'text-[#2a4638] hover:text-[#0e2a1d] hover:bg-white/40'
              }`}
              title="主线关卡"
            >
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>神木</span>
            </button>

            <button
              onClick={() => onSelectView('endless')}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'endless'
                  ? 'jade-button-active'
                  : 'text-[#2a4638] hover:text-[#0e2a1d] hover:bg-white/40'
              }`}
              title="无尽挑战"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>无尽</span>
            </button>

            <button
              onClick={() => onSelectView('editor')}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'editor'
                  ? 'jade-button-active'
                  : 'text-[#2a4638] hover:text-[#0e2a1d] hover:bg-white/40'
              }`}
              title="水渠工坊"
            >
              <Hammer className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>工坊</span>
            </button>
          </div>

          {/* Quick story & audio toggle on mobile */}
          {onOpenStory && (
            <button
              onClick={onOpenStory}
              className="sm:hidden p-1.5 rounded-lg jade-button cursor-pointer shrink-0"
              title="重温故事序幕"
            >
              <ScrollText className="w-3.5 h-3.5 text-emerald-800" />
            </button>
          )}

          <button
            onClick={onToggleMute}
            className="sm:hidden p-1.5 rounded-lg jade-button cursor-pointer shrink-0"
            title={isMuted ? '开启音效' : '静音'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-800" />}
          </button>
        </div>
      </div>
    </header>
  );
};
