/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { SimulationResult, Tile } from '../types/game';
import { TileView } from './TileView';
import { computeActiveWaterPaths } from '../utils/flowPaths';

interface GameBoardProps {
  tiles: Tile[];
  gridRows: number;
  gridCols: number;
  simulation: SimulationResult;
  isPeekActive: boolean;
  onTileClick: (tile: Tile) => void;
  onLongPressStart: () => void;
  onLongPressEnd: () => void;
  interactive?: boolean;
  levelId?: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  gridRows,
  gridCols,
  simulation,
  isPeekActive,
  onTileClick,
  onLongPressStart,
  onLongPressEnd,
  interactive = true,
  levelId = 1,
}) => {
  // Map tiles in row-major order
  const tileGrid = useMemo(() => {
    const grid: (Tile | undefined)[][] = Array.from({ length: gridRows }, () =>
      Array.from({ length: gridCols }, () => undefined)
    );
    for (const t of tiles) {
      if (t.row < gridRows && t.col < gridCols) {
        grid[t.row][t.col] = t;
      }
    }
    return grid;
  }, [tiles, gridRows, gridCols]);

  // Compute active fluid water paths
  const { segments, sourceTile, sourceTiles, bulbTiles } = useMemo(() => {
    return computeActiveWaterPaths(tiles, gridRows, gridCols, simulation.poweredTileIds);
  }, [tiles, gridRows, gridCols, simulation.poweredTileIds]);

  // Cell center percentage inside 100x100 SVG coordinate space
  const getCellCenterPercent = (row: number, col: number) => {
    const x = ((col + 0.5) / gridCols) * 100;
    const y = ((row + 0.5) / gridRows) * 100;
    return { x, y };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto select-none">
      {/* 6x6 Tile Grid dynamically scaled for Android portrait 21:9 & 19.5:9 phone screens */}
      <div className="relative w-full max-w-[min(calc(100vw-24px),calc(100dvh-260px),410px)] aspect-square">
        <div
          className="w-full h-full grid gap-1 sm:gap-2 p-2 sm:p-3.5 rounded-2xl sm:rounded-[26px] bg-[#edf4e9] border-2 border-[#cfe0cb] shadow-[inset_0_2px_12px_rgba(16,185,129,0.06)] overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          }}
        >
          {tileGrid.map((rowArr, r) =>
            rowArr.map((tile, c) => {
              if (!tile) {
                return (
                  <div
                    key={`empty-${r}-${c}`}
                    className="w-full aspect-square rounded-[12px] sm:rounded-2xl bg-[#e5ebe0]/40 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9eb1a4]" />
                  </div>
                );
              }

              const isPowered = simulation.poweredTileIds.has(tile.id);
              const isLit = tile.type === 'bulb' && simulation.litBulbIds.has(tile.id);

              return (
                <TileView
                  key={tile.id}
                  tile={tile}
                  isPowered={isPowered}
                  isLit={isLit}
                  isPeekActive={isPeekActive}
                  onClick={onTileClick}
                  onLongPressStart={onLongPressStart}
                  onLongPressEnd={onLongPressEnd}
                  interactive={interactive}
                  levelId={levelId}
                />
              );
            })
          )}
        </div>

        {/* Sacred Spring Water Flow & Infusion Particle Layer */}
        <svg
          className="pointer-events-none absolute inset-0 z-20 w-full h-full p-2 sm:p-3.5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="springFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <filter id="springParticleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Active Water Streams */}
          {segments.map((seg) => {
            const p1 = getCellCenterPercent(seg.r1, seg.c1);
            const p2 = getCellCenterPercent(seg.r2, seg.c2);
            return (
              <g key={seg.id}>
                {/* Luminous water stream glow */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#38bdf8"
                  strokeWidth="1.6"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
                {/* Flowing animated dash water beads */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="url(#springFlowGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 3.5"
                  strokeLinecap="round"
                  className="animate-dash"
                  filter="url(#springParticleGlow)"
                />
              </g>
            );
          })}

          {/* Spring Source fountain pulse effect for all active sources */}
          {(sourceTiles || (sourceTile ? [sourceTile] : [])).map((st) => {
            const sp = getCellCenterPercent(st.row, st.col);
            return (
              <circle
                key={`source-pulse-${st.id}`}
                cx={sp.x}
                cy={sp.y}
                r="4"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.8"
                strokeOpacity="0.6"
                className="animate-ping"
                style={{ animationDuration: '2.5s' }}
              />
            );
          })}

          {/* Active Lit Bulbs Golden/Cyan Bloom */}
          {bulbTiles
            .filter((b) => simulation.litBulbIds.has(b.id))
            .map((b) => {
              const bp = getCellCenterPercent(b.row, b.col);
              return (
                <circle
                  key={`lit-bloom-${b.id}`}
                  cx={bp.x}
                  cy={bp.y}
                  r="5"
                  fill="#f472b6"
                  fillOpacity="0.25"
                  className="animate-spring-pulse"
                />
              );
            })}
        </svg>

        {/* Global '灵泉注入' Spiritual Stream Infusion Ascending Orbs towards SacredTreeBranchWidget */}
        {simulation.isAllLit && (
          <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
            {bulbTiles
              .filter((b) => simulation.litBulbIds.has(b.id))
              .map((b, idx) => {
                const bp = getCellCenterPercent(b.row, b.col);
                return (
                  <div
                    key={`orb-stream-${b.id}`}
                    className="absolute"
                    style={{
                      left: `${bp.x}%`,
                      top: `${bp.y}%`,
                    }}
                  >
                    {/* Primary glowing water pearl */}
                    <div
                      className="animate-rise-to-tree w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-300 via-teal-200 to-white shadow-[0_0_14px_rgba(56,189,248,0.9)] flex items-center justify-center text-[8px]"
                      style={{
                        animationDelay: `${idx * 0.4}s`,
                        animationDuration: '2.2s',
                      }}
                    >
                      ✨
                    </div>
                    {/* Secondary trailing energy droplet */}
                    <div
                      className="animate-rise-to-tree w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-200 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                      style={{
                        animationDelay: `${idx * 0.4 + 0.3}s`,
                        animationDuration: '2.4s',
                      }}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Subtle Caption at Bottom */}
      <div className="mt-1 sm:mt-2 text-center shrink-0">
        <p className="text-[11px] sm:text-xs font-medium text-[#466657] tracking-wide transition-all">
          {simulation.isAllLit
            ? '🌸 灵泉满溢 · 活水正汩汩注入神树枝头！'
            : '💧 引导灵泉活水，沿翡翠水脉流淌。'}
        </p>
      </div>
    </div>
  );
};
