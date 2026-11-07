/**
 * The board keeps the original circuit simulation and input contract while
 * rendering the 6x6 Energy Park art pack.
 */
import React, { useMemo } from 'react';
import { SimulationResult, Tile } from '../types/game';
import { energyPark } from '../assets/energyPark';
import { EnergyParkTile } from './energyPark/EnergyParkTile';

interface GameBoardProps {
  tiles: Tile[];
  gridRows: number;
  gridCols: number;
  simulation: SimulationResult;
  isPeekActive: boolean;
  onTileClick: (tile: Tile, action?: 'rotate' | 'toggle-switch') => void;
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
}) => {
  const tileGrid = useMemo(() => {
    const grid: (Tile | undefined)[][] = Array.from({ length: gridRows }, () =>
      Array.from({ length: gridCols }, () => undefined)
    );
    for (const tile of tiles) {
      if (tile.row < gridRows && tile.col < gridCols) grid[tile.row][tile.col] = tile;
    }
    return grid;
  }, [gridCols, gridRows, tiles]);

  return (
    <div className="energy-board-shell" aria-label={`${gridRows}×${gridCols} 能量管道棋盘`}>
      <img className="energy-board-frame" src={energyPark.board} alt="" aria-hidden="true" />
      <div
        className="energy-board-grid"
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {tileGrid.flatMap((row, rowIndex) =>
          row.map((tile, colIndex) => {
            if (!tile) {
              return <div key={`empty-${rowIndex}-${colIndex}`} className="energy-board-empty" />;
            }
            return (
              <EnergyParkTile
                key={tile.id}
                tile={tile}
                isPowered={simulation.poweredTileIds.has(tile.id)}
                isPeekActive={isPeekActive}
                onClick={onTileClick}
                onLongPressStart={onLongPressStart}
                onLongPressEnd={onLongPressEnd}
                interactive={interactive}
              />
            );
          })
        )}
      </div>
      {simulation.isAllLit && <div className="energy-board-complete-glow" aria-hidden="true" />}
    </div>
  );
};
