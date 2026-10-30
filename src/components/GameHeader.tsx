/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameView } from '../types/game';
import { Sparkles, Compass, Hammer, Volume2, VolumeX, Trophy, BookOpen, ScrollText, Smartphone, Maximize } from 'lucide-react';

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
  onOpenAndroidModal?: () => void;
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
  onOpenAndroidModal,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-1 sm:pt-1.5 pb-1 sm:pb-2 shrink-0">
      {/* Desktop Window Title Bar */}
      <div className="hidden sm:flex items-center justify-between py-1 px-2.5 mb-2 bg-white/70 border border-[#dce3d5] rounded-xl text-xs text-[#465f53] font-mono">
        <div className="flex items-center gap-2">
          <span>🌱</span>
          <span className="font-semibold text-emerald-950">神树灵泉 · 唤醒百花</span>
          {onOpenAndroidModal && (
            <button
              onClick={onOpenAndroidModal}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition-colors cursor-pointer text-[10px] font-bold"
              title="查看安卓端竖屏安装与设置"
            >
              <Smartphone className="w-3 h-3 text-emerald-700" />
              <span>安卓原生版</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {onOpenStory && (
            <button
              onClick={onOpenStory}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-black/5 text-[#3b5549] transition-colors cursor-pointer font-sans"
              title="重温神树序幕故事"
            >
              <ScrollText className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-medium">序幕背景</span>
            </button>
          )}

          {onOpenFloraCompendium && (
            <button
              onClick={onOpenFloraCompendium}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-black/5 text-[#3b5549] transition-colors cursor-pointer font-sans"
              title="查看神木已唤醒的百花图鉴"
            >
              <span className="text-xs">🌸</span>
              <span className="text-[11px] font-medium">百花图鉴</span>
            </button>
          )}

          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-black/5 text-[#425a4f] transition-colors cursor-pointer font-sans"
              title="查看个人档案与成就奖杯"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-medium text-[11px]">荣誉殿堂</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300">
                {unlockedCount}/{totalCount}
              </span>
            </button>
          )}

          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-1 rounded-md hover:bg-black/5 text-[#52655b] transition-colors cursor-pointer"
              title={isFullscreen ? '退出全屏' : '全屏体验'}
            >
              <Maximize className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          )}

          <button
            onClick={onToggleMute}
            className="p-1 rounded-md hover:bg-black/5 text-[#52655b] transition-colors cursor-pointer"
            title={isMuted ? '取消静音' : '静音'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600" />}
          </button>
        </div>
      </div>

      {/* Main Title Row */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Spring & Flower Emblem */}
          <button
            onClick={onOpenFloraCompendium}
            className="w-7 h-7 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 hover:from-emerald-400 hover:to-teal-600 p-0.5 shadow-xs flex items-center justify-center shrink-0 cursor-pointer transition-transform active:scale-95"
            title="点击打开百花图鉴"
          >
            <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-[#ecfdf5] flex items-center justify-center text-xs sm:text-lg">
              🌸
            </div>
          </button>

          <div>
            <h1 className="text-sm sm:text-[30px] font-black tracking-tight text-[#133326] leading-none flex items-center gap-1">
              <span>神树灵泉</span>
              {/* Android Indicator Badge on Mobile */}
              {onOpenAndroidModal && (
                <button
                  onClick={onOpenAndroidModal}
                  className="sm:hidden flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[9px] cursor-pointer"
                >
                  <Smartphone className="w-2.5 h-2.5 text-emerald-700" />
                  <span>安卓</span>
                </button>
              )}
            </h1>
            <p className="text-[11px] sm:text-xs text-[#425e51] mt-0.5 tracking-wide hidden sm:block">
              旋转翡翠水渠 · 引导活水甘霖 · 唤醒神树百花
            </p>
          </div>
        </div>

        {/* Right side: Navigation Tabs + Quick Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick story & compendium buttons on mobile */}
          {onOpenStory && (
            <button
              onClick={onOpenStory}
              className="p-1 rounded-lg bg-white border border-[#d6dfce] text-[#3d594c] sm:hidden cursor-pointer"
              title="故事序幕"
            >
              <ScrollText className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          )}

          {onOpenFloraCompendium && (
            <button
              onClick={onOpenFloraCompendium}
              className="px-1.5 py-0.5 rounded-lg bg-[#ecfdf5] border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center gap-0.5 cursor-pointer sm:hidden"
              title="百花图鉴"
            >
              <span className="text-[11px]">🌸</span>
              <span className="text-[9px]">花谱</span>
            </button>
          )}

          {/* Mode Selector Tabs */}
          <div className="flex items-center p-0.5 bg-white/80 border border-[#d6dfce] rounded-xl sm:rounded-2xl shadow-xs">
            <button
              onClick={() => onSelectView('story')}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all cursor-pointer ${
                currentView === 'story'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xs'
                  : 'text-[#475b52] hover:text-[#115e59]'
              }`}
            >
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>神木</span>
            </button>

            <button
              onClick={() => onSelectView('endless')}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all cursor-pointer ${
                currentView === 'endless'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xs'
                  : 'text-[#475b52] hover:text-[#115e59]'
              }`}
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>无尽</span>
            </button>

            <button
              onClick={() => onSelectView('editor')}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all cursor-pointer ${
                currentView === 'editor'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xs'
                  : 'text-[#475b52] hover:text-[#115e59]'
              }`}
            >
              <Hammer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>工坊</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
