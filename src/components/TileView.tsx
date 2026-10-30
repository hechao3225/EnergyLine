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
      onClick={() => {
        if (isRotatable) {
          haptics.tapLight();
          onClick(tile);
        }
      }}
      onMouseDown={() => onLongPressStart?.()}
      onMouseUp={() => onLongPressEnd?.()}
      onTouchStart={() => onLongPressStart?.()}
      onTouchEnd={() => onLongPressEnd?.()}
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

            {/* Mossy stone pedestal */}
            <rect
              x="12"
              y="18"
              width="44"
              height="44"
              rx="12"
              fill="#1e3a30"
              stroke="#132720"
              strokeWidth="2.5"
            />
            {/* Inner Spring Pool */}
            <circle
              cx="34"
              cy="40"
              r="17"
              fill="#064e3b"
              stroke="#059669"
              strokeWidth="2"
            />
            {/* Swirling Spring Ripples */}
            <circle
              cx="34"
              cy="40"
              r="12"
              fill="#0ea5e9"
              opacity="0.3"
              className="animate-pulse"
            />
            <circle
              cx="34"
              cy="40"
              r="7"
              fill="#38bdf8"
            />
            <circle
              cx="32"
              cy="38"
              r="2.5"
              fill="#ffffff"
            />

            {/* Droplet emblem on spring basin */}
            <path
              d="M34 29 Q 31 33 34 37 Q 37 33 34 29 Z"
              fill="#ffffff"
              opacity="0.9"
            />

            {/* Jade outlet collar */}
            <rect
              x="54"
              y="32"
              width="7"
              height="16"
              rx="2.5"
              fill="#10b981"
            />
          </svg>
        </div>
      )}

      {/* Flower Bud / Blooming Flower Tile (Goal) */}
      {tile.type === 'bulb' && (
        <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
            {/* Incoming aqueduct conduit from left neighbor (-5 to 28) */}
            <path
              d="M-5 40h33"
              stroke={pipeColor}
              strokeWidth="11"
              strokeLinecap="round"
            />
            {isPowered && (
              <>
                <path
                  d="M-5 40h33"
                  stroke={poweredWaterCore}
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  className="animate-[dash_1s_linear_infinite]"
                />
                <circle cx="12" cy="40" r="3" fill="#fef08a" />
              </>
            )}

            {/* Aqueduct stone socket base */}
            <rect
              x="25"
              y="33"
              width="9"
              height="14"
              rx="3"
              fill={isLit ? '#134e4a' : '#334139'}
            />
          </svg>

          {/* Centered Flower Graphic */}
          <div className="absolute left-[26px] sm:left-[28px] top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {isLit ? (
              <FlowerIcon
                isBlooming={true}
                petalColor={flower.petalColor}
                glowColor={flower.glowColor}
                coreColor={flower.coreColor}
                shape={flower.shape}
                size={48}
                className="animate-in zoom-in-75 duration-300"
              />
            ) : (
              <FlowerIcon
                isBlooming={false}
                petalColor={flower.petalColor}
                size={34}
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
                <path
                  d="M-5 40h90"
                  stroke={pipeColor}
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                {isPowered && (
                  <path
                    d="M-5 40h90"
                    stroke={poweredWaterCore}
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="16" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 2. Corner / Elbow Aqueduct */}
            {tile.type === 'corner' && (
              <>
                <path
                  d="M40 85V40h45"
                  stroke={pipeColor}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {isPowered && (
                  <path
                    d="M40 85V40h45"
                    stroke={poweredWaterCore}
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="40" cy="40" r="3.5" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="64" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 3. T-Shape Junction Aqueduct */}
            {tile.type === 't_shape' && (
              <>
                <path
                  d="M-5 40h90 M40 40v45"
                  stroke={pipeColor}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {isPowered && (
                  <path
                    d="M-5 40h90 M40 40v45"
                    stroke={poweredWaterCore}
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="40" cy="40" r="3.5" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="16" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="64" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 4. Cross 4-Way Aqueduct */}
            {tile.type === 'cross' && (
              <>
                <path
                  d="M-5 40h90 M40 -5v90"
                  stroke={pipeColor}
                  strokeWidth="11"
                  strokeLinecap="round"
                  fill="none"
                />
                {isPowered && (
                  <path
                    d="M-5 40h90 M40 -5v90"
                    stroke={poweredWaterCore}
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}
                <circle cx="40" cy="40" r="4" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="16" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="64" cy="40" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="16" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
                <circle cx="40" cy="64" r="3" fill={rivetColor} stroke={isPowered ? '#0d9488' : '#2d4036'} strokeWidth="1" />
              </>
            )}

            {/* 5. Jade Sluice Gate (Switch) */}
            {tile.type === 'switch' && (
              <>
                <path d="M-5 40h33" stroke={pipeColor} strokeWidth="11" strokeLinecap="round" />
                <path d="M52 40h33" stroke={pipeColor} strokeWidth="11" strokeLinecap="round" />
                <circle cx="28" cy="40" r="4.5" fill="#475569" />
                <circle cx="52" cy="40" r="4.5" fill="#475569" />

                {/* Sluice gate blade */}
                {tile.switchClosed !== false ? (
                  <path
                    d="M28 40h24"
                    stroke={isPowered ? '#10b981' : '#3a5043'}
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M28 40L48 24"
                    stroke="#f43f5e"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                )}

                <circle
                  cx="40"
                  cy="56"
                  r="3.5"
                  fill={tile.switchClosed !== false ? '#10b981' : '#f43f5e'}
                />
              </>
            )}

            {/* 6. One-Way Flow Water Valve (Diode) */}
            {tile.type === 'diode' && (
              <>
                <path d="M-5 40h90" stroke={pipeColor} strokeWidth="11" strokeLinecap="round" />
                <rect x="25" y="27" width="30" height="26" rx="6" fill="#1e293b" />
                <polygon
                  points="32,32 32,48 44,40"
                  fill={isPowered ? '#38bdf8' : '#64748b'}
                />
                <line
                  x1="45"
                  y1="32"
                  x2="45"
                  y2="48"
                  stroke={isPowered ? '#38bdf8' : '#64748b'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
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
