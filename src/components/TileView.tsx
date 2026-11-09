/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Direction, Tile } from '../types/game';
import { getTilePorts } from '../utils/circuit';
import { FlowerIcon } from './FlowerIcon';
import { getFlowerForLevel } from '../data/flowers';
import { haptics } from '../utils/haptics';
import springSourceImg from '../assets/spring_source.webp';
import bulbUnlitImg from '../assets/bulb_unlit.webp';
import bulbLitImg from '../assets/bulb_lit.webp';
import valveSwitchImg from '../assets/valve_switch.webp';
import valveDiodeImg from '../assets/valve_diode.webp';

interface TileViewProps {
  tile: Tile;
  isPowered: boolean;
  isLit?: boolean;
  isPeekActive?: boolean;
  onClick: (tile: Tile, action?: 'rotate' | 'toggle-switch') => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  interactive?: boolean;
  levelId?: number;
}

export const TileView: React.FC<TileViewProps> = ({
  tile,
  isPowered,
  isLit,
  isPeekActive = false,
  onClick,
  onLongPressStart,
  onLongPressEnd,
  interactive = true,
  levelId = 1,
}) => {
  const activePorts = useMemo(() => getTilePorts(tile), [tile]);
  const flower = useMemo(() => getFlowerForLevel(levelId), [levelId]);

  const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressTriggered = React.useRef<boolean>(false);
  // 触摸后浏览器会补发 mousedown/mouseup/click。合成 mousedown 会重置长按标记，
  // 紧随其后的 click 于是又触发一次操作（水闸被切换两次、白扣 2 步）。
  const lastTouchAtRef = React.useRef<number>(0);
  // 长按已经消费了一次操作，用来吞掉同一次手势末尾的那一次 click
  const suppressClickCountRef = React.useRef<number>(0);

  const isSyntheticMouseEvent = (e: React.SyntheticEvent) =>
    e.type.startsWith('mouse') && Date.now() - lastTouchAtRef.current < 700;

  const consumeSuppressedClick = () => {
    if (suppressClickCountRef.current > 0) {
      suppressClickCountRef.current -= 1;
      return true;
    }
    return false;
  };

  const startPress = (e: React.SyntheticEvent) => {
    // 触摸手势产生的合成鼠标事件：忽略，避免清掉长按状态
    if (isSyntheticMouseEvent(e)) return;
    if (e.type === 'touchstart') lastTouchAtRef.current = Date.now();
    // 新的手势开始，清掉上一次可能残留的抑制计数
    suppressClickCountRef.current = 0;
    isLongPressTriggered.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(() => {
      isLongPressTriggered.current = true;
      // 长按已完成操作，同一次手势的收尾 click 必须被吞掉
      suppressClickCountRef.current = 1;
      if (tile.type === 'switch' && interactive && !tile.locked) {
        haptics.tapHeavy();
        onClick(tile, 'toggle-switch');
      } else {
        onLongPressStart?.();
      }
    }, 400);
  };

  const endPress = (e: React.SyntheticEvent) => {
    if (e.type.startsWith('touch')) lastTouchAtRef.current = Date.now();
    if (isSyntheticMouseEvent(e)) return;
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (isLongPressTriggered.current) {
      onLongPressEnd?.();
    }
  };

  const handleClick = () => {
    if (consumeSuppressedClick()) return;
    if (isLongPressTriggered.current) {
      isLongPressTriggered.current = false;
      return;
    }
    if (isRotatable) {
      haptics.tapLight();
      onClick(tile, 'rotate');
    }
  };

  // Color tokens for Sacred Spring & Jade Aqueducts
  const unpoweredPipe = '#3a5043'; // Aged mossy jade groove
  const poweredPipe = '#0d9488';   // Clear emerald water canal
  const poweredWaterCore = '#38bdf8'; // Glistening flowing mountain spring
  const rivetUnpowered = '#c8d9cc';
  const rivetPowered = '#fef08a';

  const pipeColor = isPowered ? poweredPipe : unpoweredPipe;
  const rivetColor = isPowered ? rivetPowered : rivetUnpowered;
  const isRotatable = interactive && !tile.locked && tile.type !== 'empty';

  return (
    <div
      onClick={handleClick}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
      className={`relative w-full aspect-square rounded-[14px] sm:rounded-[20px] select-none flex items-center justify-center transition-all duration-200 ${
        tile.type === 'empty'
          ? 'bg-transparent'
          : isPowered
          ? 'bg-emerald-500/[0.08] shadow-[inset_0_0_12px_rgba(16,185,129,0.22)] border border-emerald-400/40'
          : isRotatable
          ? 'bg-emerald-950/[0.03] border border-emerald-900/10 hover:border-emerald-700/30 hover:bg-emerald-900/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      } ${isRotatable ? 'cursor-pointer hover:shadow-xs active:scale-[0.97]' : ''}`}
    >
      {/* Empty slot dot */}
      {tile.type === 'empty' && (
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/25" />
      )}

      {/* Spring Eye (Source) Tile: Ancient Stone Well with bubbling life spring */}
      {tile.type === 'battery' && (
        <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
            {/* Outer carved jadeite channel groove into right neighbor */}
            <path
              d="M50 40h35"
              stroke="#223328"
              strokeWidth="15"
              strokeLinecap="round"
            />
            {/* Water conduit output into the right neighbor */}
            <path
              d="M50 40h35"
              stroke="#0d9488"
              strokeWidth="10.5"
              strokeLinecap="round"
            />
            <path
              d="M50 40h35"
              stroke="#38bdf8"
              strokeWidth="3.8"
              strokeDasharray="6 4"
              strokeLinecap="round"
              className="animate-[dash_1s_linear_infinite]"
            />
            <circle cx="70" cy="40" r="3.2" fill="#fef08a" stroke="#0d9488" strokeWidth="1" />

            {/* Sacred Spring Eye Totem */}
            <image
              href={springSourceImg}
              x="8"
              y="10"
              width="60"
              height="60"
              preserveAspectRatio="xMidYMid meet"
              className="drop-shadow-md"
            />
          </svg>
        </div>
      )}

      {/* Flower Bud / Blooming Flower Tile (Goal) */}
      {tile.type === 'bulb' && (
        <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none flex items-center justify-center">
          {/* Decorative Jade Altar Pedestal Ring */}
          <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible absolute inset-0">
            <circle
              cx="40"
              cy="40"
              r="28"
              fill={isLit ? 'rgba(16, 185, 129, 0.12)' : 'rgba(34, 51, 40, 0.04)'}
              stroke={isLit ? '#10b981' : '#6b8a76'}
              strokeWidth="1.5"
              strokeDasharray={isLit ? 'none' : '4 3'}
            />
            {isLit && (
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#34d399"
                strokeWidth="1"
                strokeOpacity="0.5"
                className="animate-ping"
                style={{ animationDuration: '3s' }}
              />
            )}
          </svg>

          {/* High-definition Xianxia Flower Asset */}
          <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
            {isLit ? (
              <img
                src={bulbLitImg}
                alt={flower.name || 'Blooming Lotus'}
                className="w-[88%] h-[88%] object-contain drop-shadow-[0_0_14px_rgba(52,211,153,0.8)] animate-in zoom-in-75 duration-300"
                style={{ filter: `drop-shadow(0 0 10px ${flower.glowColor || '#34d399'})` }}
              />
            ) : (
              <img
                src={bulbUnlitImg}
                alt="Sleeping Bud"
                className="w-[72%] h-[72%] object-contain drop-shadow-md opacity-95 transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>
      )}

      {/* Rotatable Jade Aqueduct Elements */}
      {['line', 'corner', 't_shape', 'cross', 'switch', 'diode'].includes(tile.type) && (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-visible pointer-events-none transition-transform duration-200 ease-out"
          style={{ transform: `rotate(${tile.rotation}deg)` }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
            {/* 1. Straight Aqueduct Line */}
            {tile.type === 'line' && (
              <>
                {/* Outer carved jadeite channel groove */}
                <path d="M-5 40h90" stroke="#223328" strokeWidth="15" strokeLinecap="round" />
                {/* Polished inner jade pipe */}
                <path d="M-5 40h90" stroke={pipeColor} strokeWidth="10.5" strokeLinecap="round" />
                {isPowered && (
                  <path
                    d="M-5 40h90"
                    stroke={poweredWaterCore}
                    strokeWidth="3.8"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="16" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 2. Corner / Elbow Aqueduct */}
            {tile.type === 'corner' && (
              <>
                {/* Outer carved jadeite channel groove */}
                <path
                  d="M40 85V40h45"
                  stroke="#223328"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Polished inner jade pipe */}
                <path
                  d="M40 85V40h45"
                  stroke={pipeColor}
                  strokeWidth="10.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {isPowered && (
                  <path
                    d="M40 85V40h45"
                    stroke={poweredWaterCore}
                    strokeWidth="3.8"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="40" cy="40" r="3.8" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="64" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 3. T-Shape Junction Aqueduct */}
            {tile.type === 't_shape' && (
              <>
                {/* Outer carved jadeite channel groove */}
                <path
                  d="M-5 40h90 M40 40v45"
                  stroke="#223328"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Polished inner jade pipe */}
                <path
                  d="M-5 40h90 M40 40v45"
                  stroke={pipeColor}
                  strokeWidth="10.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {isPowered && (
                  <path
                    d="M-5 40h90 M40 40v45"
                    stroke={poweredWaterCore}
                    strokeWidth="3.8"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="40" cy="40" r="3.8" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="16" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="64" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 4. Cross 4-Way Aqueduct */}
            {tile.type === 'cross' && (
              <>
                {/* Outer carved jadeite channel groove */}
                <path
                  d="M-5 40h90 M40 -5v90"
                  stroke="#223328"
                  strokeWidth="15"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Polished inner jade pipe */}
                <path
                  d="M-5 40h90 M40 -5v90"
                  stroke={pipeColor}
                  strokeWidth="10.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {isPowered && (
                  <path
                    d="M-5 40h90 M40 -5v90"
                    stroke={poweredWaterCore}
                    strokeWidth="3.8"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="40" cy="40" r="4.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="16" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="16" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="64" r="3.2" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 5. Jade Sluice Gate (Switch) */}
            {tile.type === 'switch' && (
              <>
                {/* Conduits leading into switch */}
                <path d="M-5 40h24" stroke="#223328" strokeWidth="15" strokeLinecap="round" />
                <path d="M-5 40h24" stroke={pipeColor} strokeWidth="10.5" strokeLinecap="round" />
                <path d="M60 40h25" stroke="#223328" strokeWidth="15" strokeLinecap="round" />
                <path d="M60 40h25" stroke={pipeColor} strokeWidth="10.5" strokeLinecap="round" />

                {/* Sluice Gate Sprite Icon with mechanical toggle animation */}
                <g
                  style={{
                    transform: tile.switchClosed === false ? 'rotate(45deg)' : 'rotate(0deg)',
                    transformOrigin: '40px 40px',
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <image
                    href={valveSwitchImg}
                    x="14"
                    y="14"
                    width="52"
                    height="52"
                    preserveAspectRatio="xMidYMid meet"
                    className="drop-shadow-md"
                  />
                </g>

                {/* Open/Closed Water Flow Connection */}
                {tile.switchClosed !== false ? (
                  <>
                    <path
                      d="M19 40h42"
                      stroke={isPowered ? '#0d9488' : '#3a5043'}
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    {isPowered && (
                      <path
                        d="M19 40h42"
                        stroke={poweredWaterCore}
                        strokeWidth="3.2"
                        strokeDasharray="4 3"
                        strokeLinecap="round"
                        className="animate-[dash_1s_linear_infinite]"
                      />
                    )}
                    {/* Emerald active seal indicator */}
                    <circle cx="40" cy="63" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                  </>
                ) : (
                  <>
                    {/* Ancient bronze & cinnabar barrier seal blocking channel */}
                    <rect x="36" y="27" width="8" height="26" rx="2" fill="#7f1d1d" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="40" y1="29" x2="40" y2="51" stroke="#fecdd3" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="40" cy="63" r="3.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                  </>
                )}
              </>
            )}

            {/* 6. One-Way Flow Water Valve (Diode) */}
            {tile.type === 'diode' && (
              <>
                {/* Channel Conduits */}
                <path d="M-5 40h90" stroke="#223328" strokeWidth="15" strokeLinecap="round" />
                <path d="M-5 40h90" stroke={pipeColor} strokeWidth="10.5" strokeLinecap="round" />

                {/* Diode Arrow Shuttle Sprite Icon */}
                <image
                  href={valveDiodeImg}
                  x="12"
                  y="12"
                  width="56"
                  height="56"
                  preserveAspectRatio="xMidYMid meet"
                  className="drop-shadow-md"
                />

                {/* Flow Stream */}
                {isPowered && (
                  <path
                    d="M-5 40h90"
                    stroke={poweredWaterCore}
                    strokeWidth="3.8"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
              </>
            )}
          </svg>
        </div>
      )}

      {/* Switch Sluice Gate Interactive Overlay: Center Toggle Seal + Corner Rotate Handle */}
      {tile.type === 'switch' && (
        <>
          {/* Center Sluice Gate Touch Target: Toggle Open/Close */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (consumeSuppressedClick()) return;
              if (interactive && !tile.locked) {
                haptics.tapHeavy();
                onClick(tile, 'toggle-switch');
              }
            }}
            className="absolute z-20 w-[56%] h-[56%] rounded-full cursor-pointer flex items-center justify-center group active:scale-90 transition-transform"
            title="点击开闭水闸"
          >
            {/* Emerald/Cinnabar State Seal Badge */}
            <div
              className={`px-1.5 py-0.2 rounded-full text-[9px] font-black tracking-tighter border shadow-xs transition-all pointer-events-none select-none flex items-center gap-0.5 ${
                tile.switchClosed !== false
                  ? 'bg-emerald-600/90 text-white border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                  : 'bg-rose-700/90 text-rose-100 border-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.7)]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-white" />
              <span>{tile.switchClosed !== false ? '通' : '断'}</span>
            </div>
          </div>

          {/* Top-Right Dedicated Rotate Handle */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (consumeSuppressedClick()) return;
              if (interactive && !tile.locked) {
                haptics.tapLight();
                onClick(tile, 'rotate');
              }
            }}
            className="absolute -top-1.5 -right-1.5 z-30 w-7 h-7 rounded-full bg-[#1b3a2b] hover:bg-[#124231] border border-emerald-400/70 text-emerald-200 flex items-center justify-center text-[13px] leading-none cursor-pointer shadow-md active:scale-90 transition-all select-none"
            title="点击顺时针旋转90°"
          >
            ↻
          </div>
        </>
      )}

      {/* Port Peek Indicators */}
      {isPeekActive && tile.type !== 'empty' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          {Boolean(activePorts & Direction.UP) && (
            <div className="absolute top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs border border-white" />
          )}
          {Boolean(activePorts & Direction.RIGHT) && (
            <div className="absolute right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs border border-white" />
          )}
          {Boolean(activePorts & Direction.DOWN) && (
            <div className="absolute bottom-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs border border-white" />
          )}
          {Boolean(activePorts & Direction.LEFT) && (
            <div className="absolute left-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs border border-white" />
          )}
        </div>
      )}
    </div>
  );
};
