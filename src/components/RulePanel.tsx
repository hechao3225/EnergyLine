/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Eye, Undo2, Redo2 } from 'lucide-react';

interface RulePanelProps {
  isPeekActive: boolean;
  onTogglePeek: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  canUndo?: boolean;
  onUndo?: () => void;
  canRedo?: boolean;
  onRedo?: () => void;
  historyCount?: number;
}

export const RulePanel: React.FC<RulePanelProps> = ({
  isPeekActive,
  onTogglePeek,
  isMuted,
  onToggleMute,
  canUndo,
  onUndo,
  canRedo,
  onRedo,
  historyCount = 0,
}) => {
  return (
    <div className="w-full max-w-sm bg-[#f7faf4] border border-[#dce3d5] rounded-[28px] p-6 sm:p-7 shadow-[0_4px_24px_rgba(30,45,35,0.03)] flex flex-col justify-between">
      <div>
        {/* Main Instruction Headline */}
        <h2 className="text-2xl font-black tracking-tight text-[#143526] mb-2">
          引甘泉 · 唤百花
        </h2>

        {/* Subtitle / Objective */}
        <p className="text-[15px] text-[#3d5549] leading-relaxed mb-6 font-normal">
          旋转翡翠水渠，引导灵泉活水唤醒所有沉睡仙花。
        </p>

        {/* Rules */}
        <div className="space-y-2 text-sm sm:text-[15px] text-[#3d5549] font-normal leading-relaxed mb-7">
          <p>💧 轻触：顺时针旋转 90° 水渠</p>
          <p>⏳ 每次旋转消耗 1 步</p>
          <p>🌱 榫卯贯通，活水甘霖方能奔流</p>
          <p>👁️ 长按：显现枝桠灵光水路</p>
        </div>

        {/* Visual Conduit Legend */}
        <div className="pt-2">
          <div className="grid grid-cols-3 gap-3 text-center mb-3">
            {/* 直渠 */}
            <div className="flex flex-col items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-9 h-9 mb-1.5">
                <path d="M20 5v30" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" />
                <circle cx="20" cy="20" r="1.5" fill="#fef08a" />
              </svg>
              <span className="text-xs font-medium text-[#2d4e41]">直渠</span>
            </div>

            {/* 弯渠 */}
            <div className="flex flex-col items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-9 h-9 mb-1.5">
                <path d="M20 35V20h15" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="20" cy="20" r="1.5" fill="#fef08a" />
              </svg>
              <span className="text-xs font-medium text-[#2d4e41]">弯渠</span>
            </div>

            {/* 三通渠 */}
            <div className="flex flex-col items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-9 h-9 mb-1.5">
                <path d="M5 20h30 M20 20v15" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="20" cy="20" r="1.5" fill="#fef08a" />
              </svg>
              <span className="text-xs font-medium text-[#2d4e41]">三通渠</span>
            </div>
          </div>

          <p className="text-xs text-[#526b5e] mt-2">
            灵泉之眼与仙花花苞位置固定
          </p>
        </div>
      </div>

      {/* Quick Action Toggles & Controls */}
      <div className="mt-8 pt-4 border-t border-[#e2e9dc] flex items-center justify-between gap-2">
        <button
          onClick={onTogglePeek}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
            isPeekActive
              ? 'bg-[#14b8a6] text-white shadow-xs'
              : 'bg-white text-[#41534c] border border-[#d6dfcf] hover:bg-[#edf3e8]'
          }`}
          title="切换端口指示透视"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isPeekActive ? '关闭透视' : '端口透视'}</span>
        </button>

        <div className="flex items-center gap-1.5">
          {onUndo && (
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-xl transition-colors ${
                canUndo
                  ? 'bg-white text-[#41534c] border border-[#d6dfcf] hover:bg-[#edf3e8]'
                  : 'bg-white/50 text-[#41534c]/40 border border-[#d6dfcf]/50 cursor-not-allowed'
              }`}
              title="撤销上一步 (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>撤销</span>
              {historyCount > 0 && (
                <span className="text-[10px] px-1 py-0.2 rounded-full bg-teal-100 text-teal-800 font-semibold">
                  {historyCount}
                </span>
              )}
            </button>
          )}

          {canRedo && onRedo && (
            <button
              onClick={onRedo}
              className="flex items-center gap-1 px-2 py-2 text-xs font-medium rounded-xl bg-white text-[#41534c] border border-[#d6dfcf] hover:bg-[#edf3e8] transition-colors"
              title="重做 (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={onToggleMute}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-white text-[#41534c] border border-[#d6dfcf] hover:bg-[#edf3e8] transition-colors"
          title={isMuted ? '开启音效' : '静音'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-red-500" />
              <span>静音中</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#0d9488]" />
              <span>音效开</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
