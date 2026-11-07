import React, { useMemo } from 'react';
import { Tile } from '../../types/game';
import { energyPark, EnergyTileAssetType } from '../../assets/energyPark';
import { haptics } from '../../utils/haptics';

interface EnergyParkTileProps {
  tile: Tile;
  isPowered: boolean;
  isPeekActive?: boolean;
  onClick: (tile: Tile, action?: 'rotate' | 'toggle-switch') => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  interactive?: boolean;
}

export const EnergyParkTile: React.FC<EnergyParkTileProps> = ({
  tile,
  isPowered,
  isPeekActive = false,
  onClick,
  onLongPressStart,
  onLongPressEnd,
  interactive = true,
}) => {
  const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchAtRef = React.useRef(0);
  const longPressTriggeredRef = React.useRef(false);
  const suppressClickRef = React.useRef(0);
  const isRotatable = interactive && !tile.locked && tile.type !== 'empty' && tile.type !== 'blocked';
  const assetType = tile.type as EnergyTileAssetType;
  const tileAsset = useMemo(() => {
    if (tile.type === 'empty') return energyPark.tiles.empty;
    if (tile.type === 'blocked') return energyPark.tiles.blocked;
    const pair = energyPark.tiles[assetType] as { idle: string; powered: string };
    return pair[isPowered ? 'powered' : 'idle'];
  }, [assetType, isPowered, tile.type]);

  const syntheticMouse = (event: React.SyntheticEvent) =>
    event.type.startsWith('mouse') && Date.now() - lastTouchAtRef.current < 700;

  const beginPress = (event: React.SyntheticEvent) => {
    if (syntheticMouse(event)) return;
    if (event.type === 'touchstart') lastTouchAtRef.current = Date.now();
    suppressClickRef.current = 0;
    longPressTriggeredRef.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      suppressClickRef.current = 1;
      if (tile.type === 'switch' && interactive && !tile.locked) {
        haptics.tapHeavy();
        onClick(tile, 'toggle-switch');
      } else {
        onLongPressStart?.();
      }
    }, 400);
  };

  const endPress = (event: React.SyntheticEvent) => {
    if (event.type.startsWith('touch')) lastTouchAtRef.current = Date.now();
    if (syntheticMouse(event)) return;
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (longPressTriggeredRef.current) onLongPressEnd?.();
  };

  const click = () => {
    if (suppressClickRef.current > 0) {
      suppressClickRef.current -= 1;
      return;
    }
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }
    if (isRotatable) {
      haptics.tapLight();
      onClick(tile, 'rotate');
    }
  };

  return (
    <button
      type="button"
      aria-label={`${tile.type} ${tile.row + 1}-${tile.col + 1}`}
      className={`energy-tile ${isRotatable ? 'energy-tile-rotatable' : ''} ${isPowered ? 'energy-tile-powered' : ''} ${isPeekActive ? 'energy-tile-peek' : ''}`}
      onClick={click}
      onMouseDown={beginPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={beginPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
      disabled={!isRotatable}
    >
      <span
        className="energy-tile-art"
        style={{
          transform: `rotate(${tile.rotation}deg)`,
          backgroundImage: `url(${tileAsset})`,
        }}
      />
    </button>
  );
};
