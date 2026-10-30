/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  X,
  Sparkles,
  Award,
  Activity,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { Achievement, PlayerStats } from '../types/achievement';
import { getDecoratedAchievements, loadPlayerStats } from '../utils/achievements';
import { CircularProgress } from './CircularProgress';
import { AchievementCard } from './AchievementCard';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'career'>('achievements');
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'efficiency' | 'skill' | 'progress' | 'endless'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const achievements = useMemo(() => getDecoratedAchievements(), [isOpen]);
  const stats: PlayerStats = useMemo(() => loadPlayerStats(), [isOpen]);

  const unlockedCount = useMemo(
    () => achievements.filter((a) => a.unlockedAt).length,
    [achievements]
  );
  const totalCount = achievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  // Determine honorific title based on progress & achievements
  const playerRank = useMemo(() => {
    if (unlockedCount >= 12 || stats.clearedLevelIds.length >= 25) {
      return {
        title: '蜂巢特级电气院士',
        color: 'from-amber-500 to-yellow-600',
        badge: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    }
    if (unlockedCount >= 7 || stats.clearedLevelIds.length >= 10) {
      return {
        title: '高级电路架构师',
        color: 'from-purple-600 to-indigo-600',
        badge: 'bg-purple-100 text-purple-900 border-purple-300',
      };
    }
    if (unlockedCount >= 3 || stats.clearedLevelIds.length >= 5) {
      return {
        title: '敏锐供能工程师',
        color: 'from-teal-600 to-emerald-600',
        badge: 'bg-teal-100 text-teal-900 border-teal-300',
      };
    }
    return {
      title: '见习电气学员',
      color: 'from-slate-600 to-slate-700',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
    };
  }, [unlockedCount, stats]);

  const filteredAchievements = useMemo(() => {
    if (filter === 'all') return achievements;
    if (filter === 'unlocked') return achievements.filter((a) => a.unlockedAt);
    return achievements.filter((a) => a.category === filter);
  }, [achievements, filter]);

  // Mobile page size: 4 items (2x2) so it fits without scrolling; Desktop: 6 items (3x2)
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(filteredAchievements.length / pageSize));

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Ensure currentPage is in range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedAchievements = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAchievements.slice(start, start + pageSize);
  }, [filteredAchievements, currentPage, pageSize]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="w-full max-w-2xl max-h-[94dvh] bg-[#f7faf4] border border-[#d6dfce] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/95 border-b border-[#e1e8db] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-[#fffbeb] rounded-[10px] flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#192b23] leading-tight">
                个人档案 · 荣誉殿堂
              </h2>
              <p className="text-[11px] text-[#52665b] hidden sm:block">
                按页切换浏览，无需长途滑动
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Achievements vs Career Stats) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 bg-[#edf3e8] border border-[#d8e2d4] rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'achievements'
                    ? 'bg-white text-[#115e59] shadow-xs'
                    : 'text-[#50665b] hover:text-[#115e59]'
                }`}
              >
                奖杯陈列
              </button>
              <button
                onClick={() => setActiveTab('career')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'career'
                    ? 'bg-white text-[#115e59] shadow-xs'
                    : 'text-[#50665b] hover:text-[#115e59]'
                }`}
              >
                生涯战绩
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area - Designed for Zero-Scroll (Paginated) */}
        <div className="flex-1 p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden">
          {activeTab === 'achievements' ? (
            <div className="flex flex-col h-full justify-between gap-3">
              {/* Top Overview: Circular Progress Ring & Filter Pills */}
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white border border-[#e2e9dc] shrink-0">
                {/* Circular Progress Gauge */}
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <CircularProgress
                      percent={progressPercent}
                      size={52}
                      strokeWidth={5}
                      color="gradient"
                      trackColor="#dfe7d9"
                      glow={true}
                    >
                      <span className="text-xs font-bold font-mono text-[#0d594f]">
                        {progressPercent}%
                      </span>
                    </CircularProgress>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#192e25]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>成就完成度</span>
                    </div>
                    <span className="text-[11px] text-[#556b60] font-mono block">
                      已解锁 {unlockedCount} / {totalCount} 座
                    </span>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                  {(['all', 'unlocked', 'skill', 'efficiency', 'progress', 'endless'] as const).map((cat) => {
                    const labels: Record<string, string> = {
                      all: '全部',
                      unlocked: '已解锁',
                      skill: '技巧',
                      efficiency: '效率',
                      progress: '进程',
                      endless: '无尽',
                    };
                    const isActive = filter === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#115e59] text-white shadow-xs'
                            : 'bg-[#f4f7f1] text-[#4d6257] hover:bg-[#e9efe5]'
                        }`}
                      >
                        {cat === 'unlocked' && <CheckCircle2 className="w-2.5 h-2.5 inline mr-1 text-emerald-300" />}
                        {labels[cat]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Achievement Grid (4 items per page strictly fitting without scrolling) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 content-start">
                {pagedAchievements.map((ach) => (
                  <AchievementCard key={ach.id} achievement={ach} />
                ))}

                {/* Empty State */}
                {pagedAchievements.length === 0 && (
                  <div className="col-span-full py-8 text-center text-xs text-[#63776c]">
                    该分类下暂无对应成就，切换筛选标签查看更多。
                  </div>
                )}
              </div>

              {/* Pagination Controller (上一页 / 下一页 + 页码圆点) */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#e2ebd0] shrink-0">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentPage <= 1
                      ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                      : 'text-[#115e59] bg-[#edf4ea] hover:bg-[#e0ebe0] cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>上一页</span>
                </button>

                {/* Page Indicator & Dots */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#2d4237]">
                    {currentPage} / {totalPages}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                          currentPage === idx + 1
                            ? 'bg-[#115e59] w-4'
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentPage >= totalPages
                      ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                      : 'text-[#115e59] bg-[#edf4ea] hover:bg-[#e0ebe0] cursor-pointer'
                  }`}
                >
                  <span>下一页</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Career & Rank View (Zero Scroll) */
            <div className="flex flex-col h-full justify-between gap-3">
              {/* Rank Avatar & Title */}
              <div className="p-3 sm:p-4 bg-white rounded-2xl border border-[#dfe6d9] flex items-center gap-3 sm:gap-4 shrink-0">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${playerRank.color} p-0.5 shadow-sm flex items-center justify-center shrink-0`}
                >
                  <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center text-center p-1">
                    <Award className="w-6 h-6 text-amber-600" />
                    <span className="text-[9px] font-bold text-slate-800">
                      LV.{unlockedCount}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-[#1a2d25]">蜂巢工程师</h3>
                    <span
                      className={`text-[11px] px-2 py-0.2 rounded-full font-bold border ${playerRank.badge}`}
                    >
                      {playerRank.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#52665b] leading-tight">
                    严密布线，精简电能，让每个蜂巢单元无碍通畅。
                  </p>
                </div>
              </div>

              {/* 6 Stats Boxes Grid */}
              <div className="grid grid-cols-3 gap-2 flex-1 content-center">
                <div className="p-2.5 bg-white rounded-xl border border-[#e2e9dc] text-center">
                  <span className="text-[10px] text-[#5c7166] block">已通关卡</span>
                  <span className="text-lg font-bold font-mono text-[#1a2d25]">
                    {stats.clearedLevelIds.length}
                  </span>
                  <span className="text-[9px] text-[#71857b] block">关</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#e2e9dc] text-center">
                  <span className="text-[10px] text-amber-700 block">三星满分</span>
                  <span className="text-lg font-bold font-mono text-amber-600">
                    {stats.threeStarLevelIds.length}
                  </span>
                  <span className="text-[9px] text-[#71857b] block">关</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#e2e9dc] text-center">
                  <span className="text-[10px] text-[#5c7166] block">完美连胜</span>
                  <span className="text-lg font-bold font-mono text-emerald-600">
                    {stats.maxConsecutivePerfect}
                  </span>
                  <span className="text-[9px] text-[#71857b] block">连胜</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#e2e9dc] text-center">
                  <span className="text-[10px] text-[#5c7166] block">十步速通</span>
                  <span className="text-lg font-bold font-mono text-teal-700">
                    {stats.tenStepClearCount}
                  </span>
                  <span className="text-[9px] text-[#71857b] block">次</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#e2e9dc] text-center">
                  <span className="text-[10px] text-[#5c7166] block">累计撤销</span>
                  <span className="text-lg font-bold font-mono text-indigo-600">
                    {stats.totalUndos}
                  </span>
                  <span className="text-[9px] text-[#71857b] block">次</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#e2e9dc] text-center">
                  <span className="text-[10px] text-[#5c7166] block">无尽最高</span>
                  <span className="text-lg font-bold font-mono text-purple-700">
                    {stats.maxEndlessStreak}
                  </span>
                  <span className="text-[9px] text-[#71857b] block">关</span>
                </div>
              </div>

              {/* Bottom Quick Switch back to Trophies */}
              <button
                onClick={() => setActiveTab('achievements')}
                className="w-full py-2 bg-[#edf4ea] hover:bg-[#e0ebe0] text-[#115e59] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>翻阅成就奖杯陈列馆 (共 {totalCount} 座)</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2 bg-[#edf2e7] border-t border-[#dfe6d9] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#52665b]">
            悬停或轻触任意奖杯图标，可查看准确进度数值。
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#115e59] hover:bg-[#0e4e4a] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
