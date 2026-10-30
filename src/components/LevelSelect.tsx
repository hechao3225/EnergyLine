/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LevelConfig } from '../types/game';
import {
  X,
  CheckCircle2,
  Navigation,
  Trophy,
  Star,
  Sparkles,
  Lock,
  Play,
  LayoutGrid,
  Trees,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getFlowerForLevel } from '../data/flowers';
import { FlowerIcon } from './FlowerIcon';
import chapterBadge1 from '../assets/chapter_badge_1.png';
import chapterBadge2 from '../assets/chapter_badge_2.png';
import chapterBadge3 from '../assets/chapter_badge_3.png';
import chapterBadge4 from '../assets/chapter_badge_4.png';
import chapterBadge5 from '../assets/chapter_badge_5.png';

const CHAPTER_BADGES: Record<string, string> = {
  ch1: chapterBadge1,
  ch2: chapterBadge2,
  ch3: chapterBadge3,
  ch4: chapterBadge4,
  ch5: chapterBadge5,
};

interface LevelSelectProps {
  levels: LevelConfig[];
  currentLevelIndex: number;
  clearedLevels: number[];
  bestSteps?: Record<number, number>;
  onSelectLevel: (index: number) => void;
  onClose: () => void;
  onOpenFloraCompendium?: () => void;
}

interface Chapter {
  id: string;
  name: string;
  range: [number, number];
  description: string;
  altitudeLabel: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'ch1', name: '地脉之根', range: [1, 20], description: '探寻古老暗河，引导最初的灵泉涓流', altitudeLabel: '地脉渊薮' },
  { id: 'ch2', name: '巨木之干', range: [21, 40], description: '四通玉渠与多支路花田灌溉', altitudeLabel: '翡翠主干' },
  { id: 'ch3', name: '苍翠繁枝', range: [41, 60], description: '灵玉水闸与分区引水调控', altitudeLabel: '苍翠树冠' },
  { id: 'ch4', name: '云海天桥', range: [61, 80], description: '单向回水符与迷雾步数极限', altitudeLabel: '云海秘境' },
  { id: 'ch5', name: '神树之巅', range: [81, 99], description: '万花朝宗，唤醒永恒九霄金莲', altitudeLabel: '九霄天顶' },
];

const NODE_SPACING = 88;
const TOP_PADDING = 240;
const BOTTOM_PADDING = 180;
const TOTAL_LEVELS = 99;
const TREE_HEIGHT = TOP_PADDING + (TOTAL_LEVELS - 1) * NODE_SPACING + BOTTOM_PADDING;

// Calculate coordinates for level node (1 is bottom, 99 is top)
function getLevelCoords(levelId: number) {
  const indexFromBottom = levelId - 1; // 0 to 98
  const y = TREE_HEIGHT - BOTTOM_PADDING - indexFromBottom * NODE_SPACING;
  // Sinusoidal winding curve: swings smoothly between 22% and 78%
  const xPercent = 50 + 28 * Math.sin(indexFromBottom * 0.58);
  return { xPercent, y };
}

// Calculate stars for a level
function getLevelStars(level: LevelConfig, isCleared: boolean, bestStep?: number): number {
  if (!isCleared) return 0;
  if (bestStep === undefined) return 3;
  const remainingEst = Math.max(0, level.maxSteps - bestStep);
  const ratio = remainingEst / level.maxSteps;
  if (ratio >= 0.4) return 3;
  if (ratio >= 0.15) return 2;
  return 1;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  levels,
  currentLevelIndex,
  clearedLevels,
  bestSteps = {},
  onSelectLevel,
  onClose,
  onOpenFloraCompendium,
}) => {
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');
  const [selectedPreviewLevel, setSelectedPreviewLevel] = useState<LevelConfig | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentNodeRef = useRef<HTMLDivElement>(null);

  // Highest unlocked level (can play any cleared level plus the next one)
  const maxCleared = useMemo(() => {
    return clearedLevels.length > 0 ? Math.max(...clearedLevels) : 1;
  }, [clearedLevels]);

  const maxUnlockedLevel = Math.min(TOTAL_LEVELS, maxCleared + 1);

  // Total stars earned
  const totalStars = useMemo(() => {
    let count = 0;
    levels.forEach((lvl) => {
      if (clearedLevels.includes(lvl.id)) {
        count += getLevelStars(lvl, true, bestSteps[lvl.id]);
      }
    });
    return count;
  }, [levels, clearedLevels, bestSteps]);

  // Center scroll container on current level when opening or switching to tree view
  const scrollToCurrentLevel = (smooth = true) => {
    if (scrollContainerRef.current && currentNodeRef.current) {
      currentNodeRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'center',
      });
    }
  };

  useEffect(() => {
    if (viewMode === 'tree') {
      const timer = setTimeout(() => {
        scrollToCurrentLevel(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  // Jump to specific level or chapter
  const scrollToLevel = (lvlId: number) => {
    if (!scrollContainerRef.current) return;
    const { y } = getLevelCoords(lvlId);
    const containerHeight = scrollContainerRef.current.clientHeight;
    scrollContainerRef.current.scrollTo({
      top: y - containerHeight / 2,
      behavior: 'smooth',
    });
  };

  // Generate SVG vine trunk path
  const { fullVinePath, energizedVinePath } = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    for (let i = 1; i <= TOTAL_LEVELS; i++) {
      const { xPercent, y } = getLevelCoords(i);
      // Map xPercent (22..78) to SVG viewbox width of 100
      points.push({ x: xPercent, y });
    }

    // Build smooth cubic bezier path
    let path = `M ${points[0].x} ${points[0].y + 60} Q ${points[0].x} ${points[0].y + 20} ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      path += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    // Path top into canopy
    const lastP = points[points.length - 1];
    path += ` Q ${lastP.x} ${lastP.y - 40} 50 ${lastP.y - 120}`;

    // Energized path up to maxCleared
    const clearedLimit = Math.min(TOTAL_LEVELS, maxCleared);
    let energized = `M ${points[0].x} ${points[0].y + 60} Q ${points[0].x} ${points[0].y + 20} ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < clearedLimit - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      energized += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }

    return { fullVinePath: path, energizedVinePath: energized };
  }, [maxCleared]);

  const handleNodeClick = (lvl: LevelConfig, isLocked: boolean) => {
    if (isLocked) {
      sound.playFail();
      setSelectedPreviewLevel(lvl);
      return;
    }
    sound.playRotate();
    setSelectedPreviewLevel(lvl);
  };

  const handleStartLevel = (lvlId: number) => {
    sound.playWin();
    onSelectLevel(lvlId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center sm:p-4">
      {/* Main Container */}
      <div className="w-full h-full sm:h-[94dvh] sm:max-h-[900px] max-w-lg bg-[#0e271d] sm:border sm:border-emerald-600/30 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative select-none animate-in fade-in zoom-in-95 duration-200">
        {/* Floating Top Canopy Header */}
        <div className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-[#0a1f17]/95 via-[#0e271d]/90 to-transparent pb-4 pt-3 px-3.5 sm:px-4 backdrop-blur-xs flex items-center justify-between border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            {/* Tree Icon */}
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-600 to-emerald-800 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0d2c20] rounded-[14px] flex items-center justify-center text-emerald-300">
                <Trees className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-1">
                  <span>通天供能神树</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                    99 关
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-200/80 mt-0.5">
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{totalStars} 星</span>
                </span>
                <span>·</span>
                <span>已点亮 {clearedLevels.length}/99</span>
              </div>
            </div>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-1.5">
            {/* View Flora Compendium */}
            {onOpenFloraCompendium && (
              <button
                onClick={onOpenFloraCompendium}
                title="打开百花图鉴"
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-400/40 text-emerald-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <span>🌸</span>
                <span className="hidden xs:inline">花谱</span>
              </button>
            )}

            {/* Fast Locate Current */}
            {viewMode === 'tree' && (
              <button
                onClick={() => scrollToCurrentLevel(true)}
                title="定位当前关卡"
                className="px-2.5 py-1.5 rounded-xl bg-emerald-700/40 hover:bg-emerald-600/60 border border-emerald-400/40 text-emerald-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xs:inline">定位</span>
              </button>
            )}

            {/* View Mode Toggle: Tree vs Grid */}
            <button
              onClick={() => setViewMode(viewMode === 'tree' ? 'grid' : 'tree')}
              title={viewMode === 'tree' ? '切换紧凑号码盘' : '返回成长神树'}
              className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 transition-colors cursor-pointer"
            >
              {viewMode === 'tree' ? (
                <LayoutGrid className="w-4 h-4" />
              ) : (
                <Trees className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode: TREE (开心消消乐 Growing Beanstalk Tree) */}
        {viewMode === 'tree' ? (
          <div className="relative flex-1 w-full h-full overflow-hidden">
            {/* Tree Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="w-full h-full overflow-y-auto overscroll-contain relative scroll-smooth no-scrollbar"
              style={{
                // Natural sky gradient from deep green ground to cloud sky, sunlight, and starlit heaven
                background:
                  'linear-gradient(to top, #062b1a 0%, #0d4a2d 6%, #125e3b 15%, #18794e 30%, #208e5e 45%, #2bb078 60%, #3ec38d 75%, #4fd19e 88%, #f8fafc 94%, #fef08a 97%, #6366f1 100%)',
              }}
            >
              {/* Internal Giant Canvas for 99 Levels */}
              <div
                className="relative w-full mx-auto max-w-md"
                style={{ height: `${TREE_HEIGHT}px` }}
              >
                {/* 1. Background Environmental Elements */}
                {/* Summit Hive Sanctuary (Top of the World Tree) */}
                <div
                  className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
                  style={{ top: '30px' }}
                >
                  <div className="w-24 h-24 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
                  <div className="relative -mt-20 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-1 shadow-2xl flex items-center justify-center">
                      <div className="w-full h-full bg-[#3e2608] rounded-[22px] flex flex-col items-center justify-center text-amber-300 border border-amber-300/40">
                        <Trophy className="w-8 h-8 text-amber-400 drop-shadow-md" />
                        <span className="text-[10px] font-bold text-amber-200 mt-1">蜂王圣殿</span>
                      </div>
                    </div>
                    <div className="mt-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-400/50 text-[11px] font-bold text-amber-200 shadow-lg">
                      ✨ 第 99 关 · 巅峰之境
                    </div>
                  </div>
                </div>

                {/* 2. Floating Clouds & Chapter Milestones */}
                {CHAPTERS.map((ch, idx) => {
                  const boundaryLevel = ch.range[1];
                  const { y } = getLevelCoords(boundaryLevel);
                  if (idx === CHAPTERS.length - 1) return null; // Top handled by sanctuary
                  return (
                    <div
                      key={ch.id}
                      className="absolute inset-x-0 z-10 flex flex-col items-center pointer-events-none"
                      style={{ top: `${y - 45}px` }}
                    >
                      {/* Cloud shape */}
                      <div className="relative w-full px-6 flex items-center justify-between opacity-85">
                        {/* Cloud puff Left */}
                        <div className="w-28 h-10 bg-white/70 rounded-full blur-[2px] shadow-sm transform -translate-x-3" />
                        {/* Signpost */}
                        <div className="px-4 py-1.5 rounded-2xl bg-[#0f3424]/95 border border-emerald-400/40 text-emerald-100 shadow-xl flex items-center gap-2 text-xs font-bold pointer-events-auto backdrop-blur-xs">
                          <img
                            src={CHAPTER_BADGES[CHAPTERS[idx + 1].id]}
                            alt={CHAPTERS[idx + 1].name}
                            className="w-5 h-5 object-contain"
                          />
                          <span>第 {idx + 2} 篇章 · {CHAPTERS[idx + 1].name}</span>
                          <span className="text-[10px] text-emerald-300/70 font-mono">
                            ({CHAPTERS[idx + 1].range[0]}-{CHAPTERS[idx + 1].range[1]})
                          </span>
                        </div>
                        {/* Cloud puff Right */}
                        <div className="w-28 h-10 bg-white/70 rounded-full blur-[2px] shadow-sm transform translate-x-3" />
                      </div>
                    </div>
                  );
                })}

                {/* 3. Base Grass Roots & Ground */}
                <div
                  className="absolute bottom-0 inset-x-0 h-44 z-10 pointer-events-none flex flex-col justify-end"
                  style={{
                    background:
                      'linear-gradient(to top, #052013 0%, #09331e 60%, transparent 100%)',
                  }}
                >
                  <div className="text-center pb-5 text-emerald-300/70 text-xs font-semibold">
                    🌱 大地灵脉 · 开启神树通天之旅
                  </div>
                </div>

                {/* 4. Giant SVG Winding Vine Trunk */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox={`0 0 100 ${TREE_HEIGHT}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Vine bark gradient */}
                    <linearGradient id="treeVineBark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#082b1b" />
                      <stop offset="35%" stopColor="#145233" />
                      <stop offset="70%" stopColor="#1e784c" />
                      <stop offset="100%" stopColor="#0a3823" />
                    </linearGradient>

                    {/* Energized electric conduit pulse */}
                    <linearGradient id="energizedSap" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#fef08a" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="vineGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Outer Thick Vine Trunk */}
                  <path
                    d={fullVinePath}
                    fill="none"
                    stroke="url(#treeVineBark)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Woody Texture Line */}
                  <path
                    d={fullVinePath}
                    fill="none"
                    stroke="#041a10"
                    strokeWidth="2.5"
                    strokeDasharray="16 12"
                    strokeLinecap="round"
                    opacity="0.4"
                  />

                  {/* Energized Sap Stream flowing up */}
                  <path
                    d={energizedVinePath}
                    fill="none"
                    stroke="url(#energizedSap)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#vineGlow)"
                    opacity="0.9"
                  />

                  {/* Branch leaves along the trunk */}
                  {levels.map((lvl) => {
                    const { xPercent, y } = getLevelCoords(lvl.id);
                    const isLeft = xPercent < 50;
                    return (
                      <g key={`leaf-${lvl.id}`}>
                        <circle
                          cx={isLeft ? xPercent - 1.5 : xPercent + 1.5}
                          cy={y + 6}
                          r="3"
                          fill="#10b981"
                          opacity="0.7"
                        />
                        <path
                          d={
                            isLeft
                              ? `M ${xPercent} ${y} Q ${xPercent - 6} ${y + 8} ${xPercent - 12} ${y + 4}`
                              : `M ${xPercent} ${y} Q ${xPercent + 6} ${y + 8} ${xPercent + 12} ${y + 4}`
                          }
                          stroke="#10b981"
                          strokeWidth="1.8"
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* 5. Level Interactive Nodes (Fruits/Blossoms on the Vine) */}
                {levels.map((lvl) => {
                  const { xPercent, y } = getLevelCoords(lvl.id);
                  const isCurrent = lvl.id === currentLevelIndex;
                  const isCleared = clearedLevels.includes(lvl.id);
                  const isLocked = lvl.id > maxUnlockedLevel;
                  const isNextToPlay = lvl.id === maxCleared + 1 && !isCleared;
                  const stars = getLevelStars(lvl, isCleared, bestSteps[lvl.id]);

                  return (
                    <div
                      key={lvl.id}
                      ref={isCurrent ? currentNodeRef : null}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{
                        left: `${xPercent}%`,
                        top: `${y}px`,
                      }}
                    >
                      {/* Current Spring Guide Indicator */}
                      {(isCurrent || isNextToPlay) && (
                        <div className="absolute -top-9 z-30 flex flex-col items-center animate-bounce pointer-events-none">
                          <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-emerald-950 font-black text-[10px] shadow-lg flex items-center gap-1 border border-cyan-200">
                            <span>💧</span>
                            <span>{isCurrent ? '当前灵脉' : '最新生长'}</span>
                          </div>
                          <div className="w-1.5 h-1.5 bg-cyan-300 rotate-45 -mt-0.5" />
                        </div>
                      )}

                      {/* Main Tactile Level Node Button */}
                      <button
                        onClick={() => handleNodeClick(lvl, isLocked)}
                        className={`relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${
                          isNextToPlay || isCurrent
                            ? 'scale-110 z-25'
                            : 'hover:scale-105'
                        }`}
                      >
                        {/* Outer Glow Halo for Active / Cleared */}
                        {(isNextToPlay || isCurrent) && (
                          <div className="absolute -inset-1.5 rounded-3xl bg-amber-400/40 animate-ping opacity-60" />
                        )}

                        {/* Node Body with 3D Tactile Fruit Finish */}
                        <div
                          className={`w-full h-full rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 transition-colors relative overflow-hidden ${
                            isCleared
                              ? 'bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] border-[#6ee7b7] text-white shadow-emerald-900/60'
                              : isNextToPlay || isCurrent
                              ? 'bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#d97706] border-[#fef08a] text-amber-950 shadow-amber-900/60'
                              : isLocked
                              ? 'bg-[#183629]/90 border-[#2a5944] text-emerald-500/60 shadow-black/40'
                              : 'bg-white border-emerald-400 text-emerald-900'
                          }`}
                        >
                          {/* Inner Gloss Highlight */}
                          <div className="absolute top-0 inset-x-0 h-2/5 bg-white/20 rounded-t-xl" />

                          {/* Level Number or Lock */}
                          {isLocked ? (
                            <div className="flex flex-col items-center justify-center">
                              <Lock className="w-4 h-4 text-emerald-500/50 mb-0.5" />
                              <span className="text-[11px] font-mono font-bold opacity-60">
                                {lvl.id}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center -mt-0.5">
                              <span className="text-base font-black font-mono leading-none drop-shadow-xs">
                                {lvl.id}
                              </span>
                              {isCleared && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-200 mt-0.5" />
                              )}
                            </div>
                          )}
                        </div>
                      </button>

                      {/* Stars Rating under the Node */}
                      {isCleared ? (
                        <div className="flex items-center gap-0.5 -mt-1.5 z-25 bg-[#0a271c]/90 px-1.5 py-0.2 rounded-full border border-emerald-500/30 shadow-xs">
                          {[1, 2, 3].map((starNum) => (
                            <Star
                              key={starNum}
                              className={`w-2.5 h-2.5 ${
                                starNum <= stars
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                                  : 'text-emerald-800'
                              }`}
                            />
                          ))}
                        </div>
                      ) : !isLocked ? (
                        <span className="text-[10px] font-bold text-amber-300 drop-shadow-md -mt-1 z-25 bg-amber-950/80 px-1.5 py-0.2 rounded-full border border-amber-400/40">
                          待通电
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side Chapter Elevator Rail (快捷章节电梯) */}
            <div className="absolute right-2 top-20 bottom-16 z-30 flex flex-col justify-center gap-1.5 pointer-events-auto">
              <div className="bg-[#0b2419]/85 backdrop-blur-md p-1 rounded-2xl border border-emerald-500/30 shadow-2xl flex flex-col items-center gap-1">
                {/* Scroll to Top */}
                <button
                  onClick={() => scrollToLevel(99)}
                  title="攀至顶端 (第 99 关)"
                  className="w-7 h-7 rounded-xl bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                {/* Chapter Buttons (5 to 1, top to bottom) */}
                {[...CHAPTERS].reverse().map((ch) => {
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollToLevel(ch.range[0])}
                      title={`${ch.name} (${ch.range[0]}-${ch.range[1]}关)`}
                      className="w-7 h-7 rounded-full bg-emerald-950/70 hover:bg-emerald-800/80 border border-emerald-400/40 p-0.5 flex items-center justify-center transition-all cursor-pointer hover:scale-115 active:scale-95 shadow-md"
                    >
                      <img src={CHAPTER_BADGES[ch.id]} alt={ch.name} className="w-full h-full object-contain" />
                    </button>
                  );
                })}

                {/* Locate current level shortcut */}
                <button
                  onClick={() => scrollToCurrentLevel(true)}
                  title="定位当前挑战"
                  className="w-7 h-7 rounded-xl bg-teal-500/30 hover:bg-teal-500/50 text-amber-300 flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 fill-amber-400" />
                </button>

                {/* Scroll to Bottom */}
                <button
                  onClick={() => scrollToLevel(1)}
                  title="返回根系 (第 1 关)"
                  className="w-7 h-7 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* View Mode: GRID (Compact 99 Number Dial) */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 pt-18 bg-[#f7faf4] text-[#1b2f27]">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-[#52665c] pb-2 border-b border-[#e1e9db]">
                <span>全部 99 关精选电路</span>
                <span className="font-mono text-teal-700 font-bold">
                  已通关 {clearedLevels.length} / 99
                </span>
              </div>

              {CHAPTERS.map((ch) => {
                const chapterLevels = levels.filter(
                  (l) => l.id >= ch.range[0] && l.id <= ch.range[1]
                );
                return (
                  <div key={ch.id} className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-[#e1e9db]">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={CHAPTER_BADGES[ch.id]}
                          alt={ch.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-xs font-bold text-[#1b2f27]">
                          {ch.name} ({ch.range[0]}-{ch.range[1]})
                        </span>
                      </div>
                      <span className="text-[10px] text-[#5d7367]">
                        {ch.description}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                      {chapterLevels.map((lvl) => {
                        const isCurrent = lvl.id === currentLevelIndex;
                        const isCleared = clearedLevels.includes(lvl.id);
                        const isLocked = lvl.id > maxUnlockedLevel;

                        return (
                          <button
                            key={lvl.id}
                            onClick={() => handleStartLevel(lvl.id)}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center border font-mono font-bold text-sm transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#115e59] text-white border-[#0d4f4b] shadow-md ring-2 ring-teal-500/40 scale-105'
                                : isCleared
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                                : isLocked
                                ? 'bg-slate-50 border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-700'
                                : 'bg-white border-[#d8e2d4] hover:border-teal-500 text-[#33463e]'
                            }`}
                          >
                            <span>{lvl.id}</span>
                            {isCleared && (
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 -mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Level Node Preview Popover Card (When tapping a node on the Tree) */}
        {selectedPreviewLevel && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-full max-w-xs bg-[#f7faf4] rounded-3xl p-5 border border-emerald-600/30 shadow-2xl text-center relative overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPreviewLevel(null)}
                className="absolute top-3.5 right-3.5 w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Node Icon Header */}
              <div className="w-14 h-14 mx-auto mb-2.5 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-700 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#f0fdf4] rounded-[14px] flex items-center justify-center">
                  <span className="font-mono text-2xl font-black text-[#0d9488]">
                    {selectedPreviewLevel.id}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-[#1b2f27]">
                {selectedPreviewLevel.title}
              </h3>
              <p className="text-xs text-[#52665c] mt-1 mb-3">
                {selectedPreviewLevel.subtitle || selectedPreviewLevel.hintText}
              </p>

              {/* Level Status & Stats */}
              {selectedPreviewLevel.id > maxUnlockedLevel ? (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs mb-4">
                  <Lock className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  <span>该关卡尚未生长出芽，请先通关前面的关卡！</span>
                </div>
              ) : (
                <div className="p-3 bg-white rounded-2xl border border-[#dce3d5] space-y-2 mb-4 text-xs text-[#384c42]">
                  <div className="flex items-center justify-between">
                    <span>挑战限制</span>
                    <span className="font-bold font-mono">
                      {selectedPreviewLevel.maxSteps} 步
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>历史最佳</span>
                    <span className="font-bold font-mono text-amber-700">
                      {bestSteps[selectedPreviewLevel.id] !== undefined
                        ? `${bestSteps[selectedPreviewLevel.id]} 步`
                        : '尚未点亮'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#edf2e8]">
                    <span>星级评价</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((starNum) => {
                        const earned = getLevelStars(
                          selectedPreviewLevel,
                          clearedLevels.includes(selectedPreviewLevel.id),
                          bestSteps[selectedPreviewLevel.id]
                        );
                        return (
                          <Star
                            key={starNum}
                            className={`w-3.5 h-3.5 ${
                              starNum <= earned
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Associated Sacred Flower preview */}
              {(() => {
                const flw = getFlowerForLevel(selectedPreviewLevel.id);
                const isCleared = clearedLevels.includes(selectedPreviewLevel.id);
                return (
                  <div className="p-2 mb-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-xl bg-white border border-emerald-300 flex items-center justify-center shrink-0">
                      <FlowerIcon
                        isBlooming={isCleared}
                        petalColor={flw.petalColor}
                        glowColor={flw.glowColor}
                        coreColor={flw.coreColor}
                        shape={flw.shape}
                        size={22}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-emerald-800 font-bold">
                          🌸 伴生仙花:
                        </span>
                        <span className="text-xs font-black text-emerald-950 truncate">
                          {flw.name}
                        </span>
                      </div>
                      <p className="text-[9px] text-emerald-700/80 truncate">
                        {isCleared ? '已唤醒入谱' : '通关后唤醒并收录图鉴'}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Action Button */}
              <button
                onClick={() => handleStartLevel(selectedPreviewLevel.id)}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>
                  {clearedLevels.includes(selectedPreviewLevel.id)
                    ? '重新沐泉'
                    : selectedPreviewLevel.id <= maxUnlockedLevel
                    ? '开始引泉唤醒'
                    : '自由演练此关'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
