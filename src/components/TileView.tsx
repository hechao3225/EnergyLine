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
import springSourceImg from '../assets/spring_source.png';
import bulbUnlitImg from '../assets/bulb_unlit.png';
import bulbLitImg from '../assets/bulb_lit.png';
import valveSwitchImg from '../assets/valve_switch.png';
import valveDiodeImg from '../assets/valve_diode.png';

interface TileViewProps {
  tile: Tile;
  isPowered: boolean;
  isLit?: boolean;
  isPeekActive?: boolean;
  onClick: (tile: Tile) => void;
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

  const startPress = () => {
    isLongPressTriggered.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(() => {
      isLongPressTriggered.current = true;
      onLongPressStart?.();
    }, 450);
  };

  const endPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (isLongPressTriggered.current) {
      onLongPressEnd?.();
    }
  };

  const handleClick = () => {
    if (isLongPressTriggered.current) {
      isLongPressTriggered.current = false;
      return;
    }
    if (isRotatable) {
      haptics.tapLight();
      onClick(tile);
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
      className={`relative w-full aspect-square rounded-[14px] sm:rounded-[20px] select-none flex items-center justify-center transition-colors duration-200 ${
        tile.type === 'empty'
          ? 'bg-[#e2e9dd]/70'
          : isPowered
          ? 'bg-[#eef8f5] border-2 border-[#10b981] shadow-[0_2px_14px_rgba(16,185,129,0.22)]'
          : 'bg-[#ffffff] border-2 border-[#d9e2d3] hover:border-[#b4c5ad]'
      } ${isRotatable ? 'cursor-pointer hover:shadow-xs active:scale-[0.98]' : ''}`}
    >
      {/* Empty slot dot */}
      {tile.type === 'empty' && (
        <div className="w-2 h-2 rounded-full bg-[#9bb0a3]" />
      )}

      {/* Spring Eye (Source) Tile: Ancient Stone Well with bubbling life spring */}
      {tile.type === 'battery' && (
        <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
            {/* Water conduit output into the right neighbor */}
            <path
              d="M56 40h29"
              stroke="#0d9488"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M56 40h29"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeDasharray="6 4"
              className="animate-[dash_1s_linear_infinite]"
            />
            <circle cx="70" cy="40" r="3" fill="#fef08a" />

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
          {/* Decorative Jade Base Ring */}
          <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible absolute inset-0">
            <circle
              cx="40"
              cy="40"
              r="28"
              fill={isLit ? '#e6fcf1' : '#f0f5ee'}
              stroke={isLit ? '#10b981' : '#bacbbb'}
              strokeWidth="2"
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
