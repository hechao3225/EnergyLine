/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Smartphone, Download, CheckCircle2, Vibrate, Maximize, ExternalLink, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { haptics } from '../utils/haptics';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isHapticsEnabled: boolean;
  onToggleHaptics: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({
  isOpen,
  onClose,
  isFullscreen,
  onToggleFullscreen,
  isHapticsEnabled,
  onToggleHaptics,
}) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    haptics.tapLight();
    await install();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0a261d] via-[#0d2f25] to-[#071b14] border-2 border-emerald-500/30 shadow-2xl flex flex-col text-white overflow-hidden max-h-[92dvh]">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-emerald-500/20 flex items-center justify-between shrink-0 bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-xs border border-emerald-300/30 text-emerald-100">
              <Smartphone className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white tracking-wide">
                  安卓原生版 · 安装与设置
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Android WebAPK
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70">
                适配 21:9 手机竖屏 · 零滚动沉浸体验
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

        {/* Content body */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-emerald-100/90">
          {/* Status Badge */}
          <div className="p-3 rounded-2xl bg-black/30 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center">
                {isInstalled ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Download className="w-4 h-4 text-cyan-400 animate-bounce" />
                )}
              </div>
              <div>
                <p className="font-bold text-white text-xs">
                  {isInstalled ? '已作为安卓独立应用运行' : '支持一键安装至安卓手机桌面'}
                </p>
                <p className="text-[10px] text-emerald-300/70">
                  {isInstalled
                    ? '已锁定竖屏显示，无浏览器地址栏'
                    : '无需应用商店下载，免流秒开离线畅玩'}
                </p>
              </div>
            </div>

            {!isInstalled && isInstallable && (
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                立即安装
              </button>
            )}
          </div>

          {/* Quick Hardware Controls (Haptics & Fullscreen) */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 px-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>安卓专属硬件适配选项</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Fullscreen Button */}
              <button
                onClick={() => {
                  haptics.tapLight();
                  onToggleFullscreen();
                }}
                className={`p-2.5 rounded-xl border flex flex-col items-start gap-1 text-left transition-all cursor-pointer ${
                  isFullscreen
                    ? 'bg-emerald-900/60 border-emerald-400 text-white shadow-xs'
                    : 'bg-black/25 border-emerald-500/20 text-emerald-200 hover:bg-black/40'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Maximize className="w-4 h-4 text-cyan-400" />
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-black/40 text-emerald-300">
                    {isFullscreen ? '已全屏' : '窗口'}
                  </span>
                </div>
                <span className="font-bold text-xs">沉浸式全屏</span>
                <span className="text-[10px] text-emerald-300/60 leading-tight">
                  隐藏系统状态栏与地址栏
                </span>
              </button>

              {/* Haptic Vibration Toggle */}
              <button
                onClick={() => {
                  onToggleHaptics();
                }}
                className={`p-2.5 rounded-xl border flex flex-col items-start gap-1 text-left transition-all cursor-pointer ${
                  isHapticsEnabled
                    ? 'bg-emerald-900/60 border-emerald-400 text-white shadow-xs'
                    : 'bg-black/25 border-emerald-500/20 text-emerald-200 hover:bg-black/40'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Vibrate className="w-4 h-4 text-amber-400" />
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-black/40 text-emerald-300">
                    {isHapticsEnabled ? '震动开' : '静音'}
                  </span>
                </div>
                <span className="font-bold text-xs">马达触感震动</span>
                <span className="text-[10px] text-emerald-300/60 leading-tight">
                  旋转水渠与点亮百花触觉
                </span>
              </button>
            </div>
          </div>

          {/* Android Manual Install Steps if prompt not active */}
          {!isInstalled && !isInstallable && (
            <div className="p-3 rounded-2xl bg-black/25 border border-emerald-500/15 space-y-1.5">
              <p className="font-bold text-white text-[11px]">
                {isIOS ? '苹果 Safari 安装指引' : '安卓浏览器手动安装步骤'}
              </p>
              {isIOS ? (
                <p className="text-[10px] text-emerald-200/70 leading-relaxed">
                  1. 点击 Safari 底部工具栏的「分享」按钮。<br />
                  2. 向上滑动并选择「添加到主屏幕」即可。
                </p>
              ) : (
                <p className="text-[10px] text-emerald-200/70 leading-relaxed">
                  1. 点击安卓浏览器右上角「三个点 ⋮」菜单。<br />
                  2. 选择「添加到主屏幕」或「安装应用」图标。<br />
                  3. 即可在手机桌面像原生 App 一样启动！
                </p>
              )}
            </div>
          )}

          {/* Native Capacitor APK info */}
          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-[11px] flex items-center gap-1">
                <span>📦</span>
                <span>Capacitor 安卓原生 APK 工程</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                capacitor.config.ts
              </span>
            </div>
            <p className="text-[10px] text-emerald-300/70 leading-relaxed">
              工程已完成 Capacitor 与 Android 原生容器配置（包名: <code className="text-cyan-300 font-mono">com.sacredtree.waterflow</code>），可直接在 Android Studio 中编译为 Release APK。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-emerald-500/20 bg-black/30 flex items-center justify-between">
          <span className="text-[10px] text-emerald-300/60 font-mono">
            神树灵泉 v2.0 · Android Ready
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
