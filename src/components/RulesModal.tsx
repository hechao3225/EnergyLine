/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Lightbulb, Zap, Shield, RotateCcw } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  const [page, setPage] = useState<1 | 2>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-sm max-h-[85dvh] bg-[#f7faf4] border border-[#d6dfce] rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[#e1e8db] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-teal-50 border border-teal-200 text-[#0d9488] flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a2d25]">
                {page === 1 ? '基础供能规则' : '导线元件图解'}
              </h3>
              <p className="text-[10px] text-[#55695f]">
                第 {page} / 2 页 · 轻触切换
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Pages */}
        <div className="flex-1 py-3 text-xs text-[#2c4036] space-y-3 overflow-hidden">
          {page === 1 ? (
            <div className="space-y-2.5">
              <div className="p-2.5 bg-white rounded-xl border border-[#dfe6d9] space-y-1.5">
                <div className="font-bold text-[#115e59] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>核心目标</span>
                </div>
                <p className="text-[#475b50] leading-relaxed">
                  旋转网格中的导线，把电源输出端连接到所有目标灯泡，在步数耗尽前点亮蜂巢。
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-[#dfe6d9] space-y-1.5">
                <div className="font-bold text-[#115e59] flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
                  <span>基本操作</span>
                </div>
                <ul className="space-y-1 text-[#475b50]">
                  <li>• <strong>轻触导线</strong>：顺时针旋转 90°，每次消耗 1 步</li>
                  <li>• <strong>端口相接</strong>：端对端对齐时，电流顺畅通过</li>
                  <li>• <strong>长按导线</strong>：透视当前管件的四向端口分布</li>
                  <li>• <strong>开关阀门</strong>：轻触可切换开路/闭路通路</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Straight */}
              <div className="p-2 bg-white rounded-xl border border-[#dfe6d9] flex flex-col items-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1">
                  <path d="M20 5v30" stroke="#0d9488" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="2" fill="#fef08a" />
                </svg>
                <span className="font-bold text-[11px] text-[#1a2d25]">直管</span>
                <span className="text-[9px] text-[#55695f]">对向两端</span>
              </div>

              {/* Corner */}
              <div className="p-2 bg-white rounded-xl border border-[#dfe6d9] flex flex-col items-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1">
                  <path d="M20 5v15h15" stroke="#0d9488" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="20" cy="20" r="2" fill="#fef08a" />
                </svg>
                <span className="font-bold text-[11px] text-[#1a2d25]">弯管</span>
                <span className="text-[9px] text-[#55695f]">转角直角</span>
              </div>

              {/* T-Shape */}
              <div className="p-2 bg-white rounded-xl border border-[#dfe6d9] flex flex-col items-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1">
                  <path d="M5 20h30 M20 20v15" stroke="#0d9488" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="20" cy="20" r="2" fill="#fef08a" />
                </svg>
                <span className="font-bold text-[11px] text-[#1a2d25]">三通</span>
                <span className="text-[9px] text-[#55695f]">三向分流</span>
              </div>

              {/* Cross */}
              <div className="p-2 bg-white rounded-xl border border-[#dfe6d9] flex flex-col items-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1">
                  <path d="M20 5v30 M5 20h30" stroke="#0d9488" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="20" cy="20" r="2" fill="#fef08a" />
                </svg>
                <span className="font-bold text-[11px] text-[#1a2d25]">四通十字</span>
                <span className="text-[9px] text-[#55695f]">四向全通</span>
              </div>

              {/* Switch */}
              <div className="p-2 bg-white rounded-xl border border-[#dfe6d9] flex flex-col items-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1">
                  <path d="M5 20h10 M25 20h10 M15 20l9 -7" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="15" cy="20" r="2.5" fill="#f59e0b" />
                  <circle cx="25" cy="20" r="2.5" fill="#f59e0b" />
                </svg>
                <span className="font-bold text-[11px] text-[#1a2d25]">开关阀</span>
                <span className="text-[9px] text-[#55695f]">点击通断</span>
              </div>

              {/* Bulb */}
              <div className="p-2 bg-white rounded-xl border border-[#dfe6d9] flex flex-col items-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1">
                  <circle cx="20" cy="18" r="9" fill="#f59e0b" opacity="0.3" />
                  <circle cx="20" cy="18" r="6" fill="#f59e0b" />
                  <path d="M20 27v8" stroke="#485f55" strokeWidth="4" />
                </svg>
                <span className="font-bold text-[11px] text-[#1a2d25]">目标灯</span>
                <span className="text-[9px] text-[#55695f]">通电即亮</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Page Switcher */}
        <div className="pt-2 border-t border-[#e1e8db] flex items-center justify-between shrink-0">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
              page === 1
                ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                : 'text-[#115e59] bg-[#edf4ea] hover:bg-[#e0ebe0] cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>规则说明</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                page === 1 ? 'bg-[#115e59] w-3.5' : 'bg-slate-300'
              }`}
            />
            <span
              className={`w-2 h-2 rounded-full ${
                page === 2 ? 'bg-[#115e59] w-3.5' : 'bg-slate-300'
              }`}
            />
          </div>

          <button
            onClick={() => setPage(2)}
            disabled={page === 2}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
              page === 2
                ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                : 'text-[#115e59] bg-[#edf4ea] hover:bg-[#e0ebe0] cursor-pointer'
            }`}
          >
            <span>导线图例</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
