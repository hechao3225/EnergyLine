/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { History, Undo2, Redo2, RotateCcw, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { HistorySnapshot } from '../types/game';

interface UndoHistoryTimelineProps {
  timeline: HistorySnapshot[];
  currentIndex: number;
  onUndo: () => void;
  onRedo: () => void;
  onJumpToStep: (index: number) => void;
  onResetToStart?: () => void;
  compact?: boolean;
}

export const UndoHistoryTimeline: React.FC<UndoHistoryTimelineProps> = ({
  timeline,
  currentIndex,
  onUndo,
  onRedo,
  onJumpToStep,
  onResetToStart,
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll timeline to keep active node in view
  useEffect(() => {
    if (activeNodeRef.current && containerRef.current) {
      activeNodeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < timeline.length - 1;
  const totalStepsTaken = Math.max(0, timeline.length - 1);
  const currentSnapshot = timeline[currentIndex] || timeline[0] || {
    id: 'snap-0',
    stepNumber: 0,
    tiles: [],
    remainingSteps: 0,
    litCount: 0,
    totalBulbs: 0,
    description: '初始状态',
  };

  if (compact) {
    return (
      <div className="w-full flex items-center justify-between gap-1.5 px-2.5 py-1 jade-panel shrink-0 select-none">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex items-center gap-0.5 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
            canUndo
              ? 'jade-button cursor-pointer'
              : 'opacity-35 text-slate-400 cursor-not-allowed bg-[#edf3e8]'
          }`}
          title="撤销 (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span className="text-[11px] whitespace-nowrap">撤销</span>
        </button>

        {/* Center: Scrollable Step Node Pills + Current Step Tag */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center gap-1.5 overflow-x-auto py-0.5 px-1 no-scrollbar justify-center"
        >
          {timeline.map((snapshot, idx) => {
            const isCurrent = idx === currentIndex;
            const isStart = idx === 0;
            return (
              <button
                key={snapshot.id || `snap-${idx}`}
                ref={isCurrent ? activeNodeRef : undefined}
                onClick={() => onJumpToStep(idx)}
                className={`shrink-0 w-6 h-6 rounded-full text-[10px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'jade-button-active scale-105'
                    : idx < currentIndex
                    ? 'bg-[#d8e8dd] text-[#144230] border border-[#a8c4b2]'
                    : 'bg-[#e5eee3] text-slate-400 border border-[#cadacb]'
                }`}
                title={`第 ${idx} 步: ${snapshot.description}`}
              >
                {isStart ? '始' : idx}
              </button>
            );
          })}
        </div>

        {currentIndex > 1 && onResetToStart && (
          <button
            onClick={onResetToStart}
            className="p-1 text-[#436252] hover:text-[#0e2a1d] jade-button rounded-md transition-colors cursor-pointer"
            title="复位至初始状态"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`flex items-center gap-0.5 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
            canRedo
              ? 'jade-button cursor-pointer'
              : 'opacity-35 text-slate-400 cursor-not-allowed bg-[#edf3e8]'
          }`}
          title="重做 (Ctrl+Y)"
        >
          <span className="text-[11px] whitespace-nowrap">重做</span>
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-3.5 bg-[#f7faf4] border border-[#dce3d5] rounded-2xl p-3.5 sm:p-4 shadow-[0_2px_16px_rgba(30,45,35,0.03)] transition-all">
      {/* Header: Title & Backtrack Status & Buttons */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#0d9488]">
            <History className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#1c2e27]">
                操作回溯历史
              </span>
              {/* Backtrack state badge */}
              {currentIndex < totalStepsTaken ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100/90 text-amber-800 border border-amber-200">
                  回溯中: 步数 {currentIndex} / {totalStepsTaken}
                </span>
              ) : totalStepsTaken === 0 ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#edf3e8] text-[#55695d]">
                  初始状态
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                  当前最新 (第 {currentIndex} 步)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Undo / Redo controls */}
        <div className="flex items-center gap-1.5">
          {currentIndex > 1 && onResetToStart && (
            <button
              onClick={onResetToStart}
              className="p-1.5 text-xs text-[#52665a] hover:text-[#1c2e27] hover:bg-[#edf3e8] rounded-lg transition-colors"
              title="回到初始状态"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
              canUndo
                ? 'bg-white text-[#21352b] border border-[#cbd8c6] hover:bg-[#edf3e8] hover:border-[#b0c4aa] shadow-xs active:scale-95'
                : 'opacity-40 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
            title="撤销上一步 (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>撤销</span>
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
              canRedo
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-xs active:scale-95'
                : 'opacity-40 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
            title="重做下一步 (Ctrl+Y)"
          >
            <span>重做</span>
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Timeline Track */}
      <div className="relative pt-1 pb-1">
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto py-2 px-1 scroll-smooth no-scrollbar"
        >
          {timeline.map((snapshot, idx) => {
            const isCurrent = idx === currentIndex;
            const isPast = idx < currentIndex;
            const isFuture = idx > currentIndex;
            const isStart = idx === 0;

            return (
              <React.Fragment key={snapshot.id || `snap-${idx}`}>
                {/* Connecting track line between nodes */}
                {idx > 0 && (
                  <div
                    className={`h-0.5 w-4 sm:w-6 flex-shrink-0 rounded-full transition-colors ${
                      idx <= currentIndex ? 'bg-[#0d9488]' : 'bg-[#d2ded1]'
                    }`}
                  />
                )}

                {/* Stepper Node Button */}
                <button
                  ref={isCurrent ? activeNodeRef : undefined}
                  onClick={() => onJumpToStep(idx)}
                  className={`group relative flex-shrink-0 flex flex-col items-center justify-center transition-all focus:outline-hidden ${
                    isCurrent
                      ? 'scale-110 z-10'
                      : 'hover:scale-105 active:scale-95'
                  }`}
                  title={`${isStart ? '初始状态' : `第 ${idx} 步: ${snapshot.description}`} (通电灯泡: ${snapshot.litCount}/${snapshot.totalBulbs})`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-[#0d9488] text-white shadow-md ring-3 ring-teal-400/40'
                        : isPast
                        ? 'bg-[#dff0e6] text-[#0f766e] border border-[#a2cfb7] hover:bg-[#cceeda]'
                        : 'bg-[#edf2e7] text-[#71877b] border border-dashed border-[#b6c7b9] hover:bg-[#e2ebe0]'
                    }`}
                  >
                    {isStart ? '始' : idx}
                  </div>

                  {/* Lit bulbs counter pill below node */}
                  <span
                    className={`mt-1 text-[10px] font-medium leading-none flex items-center gap-0.5 ${
                      isCurrent
                        ? 'text-[#0d9488] font-bold'
                        : isFuture
                        ? 'text-gray-400'
                        : 'text-[#476054]'
                    }`}
                  >
                    <Lightbulb className="w-2.5 h-2.5 inline" />
                    {snapshot.litCount}
                  </span>

                  {/* Active Indicator Pin */}
                  {isCurrent && (
                    <span className="absolute -top-1.5 w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Snapshot Info Footer */}
      <div className="mt-2 pt-2 border-t border-[#e2e9dc] flex flex-wrap items-center justify-between gap-2 text-xs text-[#52665a]">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#1c2e27]">
            {currentIndex === 0
              ? '初始布局'
              : `第 ${currentIndex} 步: ${currentSnapshot.description}`}
          </span>
          <span className="text-[#889b90]">·</span>
          <span className="inline-flex items-center gap-1 text-[#476054]">
            <Zap className="w-3 h-3 text-amber-500" />
            剩余 {currentSnapshot.remainingSteps} 步
          </span>
          <span className="text-[#889b90]">·</span>
          <span className="inline-flex items-center gap-1 text-[#476054]">
            <Lightbulb className="w-3 h-3 text-[#0d9488]" />
            通电 {currentSnapshot.litCount} / {currentSnapshot.totalBulbs}
          </span>
        </div>

        <div className="text-[11px] text-[#788d81] flex items-center gap-1">
          <span>点击节点快速跳转</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </div>
      </div>
    </div>
  );
};
