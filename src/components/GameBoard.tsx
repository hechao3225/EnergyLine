import React from "react";
import type { Tile, SimulationResult } from "../types/game";
import { TileView } from "./TileView";
interface GameBoardProps {
  tiles: Tile[];
  gridRows: number;
  gridCols: number;
  simulation: SimulationResult;
  isPeekActive: boolean;
  onTileClick: (tile: Tile, action?: "rotate" | "toggle-switch") => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  interactive?: boolean;
  levelId?: number;
}
export function GameBoard({
  tiles,
  gridRows,
  gridCols,
  simulation,
  isPeekActive,
  onTileClick,
  interactive = true,
}: GameBoardProps) {
  const cells = new Map(tiles.map((tile) => [`${tile.row},${tile.col}`, tile]));
  return (
    <div
      className={`park-board ${simulation.isAllLit ? "is-complete" : ""}`}
      aria-label="能量管道棋盘"
    >
      <div
        className="park-grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
          aspectRatio: `${gridCols}/${gridRows}`,
        }}
      >
        {Array.from({ length: gridRows * gridCols }, (_, i) => {
          const tile = cells.get(`${Math.floor(i / gridCols)},${i % gridCols}`);
          return tile ? (
            <TileView
              key={tile.id}
              tile={tile}
              isPowered={simulation.poweredTileIds.has(tile.id)}
              isLit={simulation.litBulbIds.has(tile.id)}
              isPeekActive={isPeekActive}
              onClick={onTileClick}
              interactive={interactive}
            />
          ) : (
            <div className="park-tile" key={`space-${i}`} />
          );
        })}
      </div>
    </div>
  );
}
