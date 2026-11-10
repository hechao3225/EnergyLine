import React from "react";
import type { Tile } from "../types/game";
import { Art, Icon } from "./ParkArt";
import { getDefaultBasePorts, rotatePorts } from "../utils/circuit";
interface TileViewProps {
  tile: Tile;
  isPowered: boolean;
  isLit?: boolean;
  isPeekActive?: boolean;
  onClick: (tile: Tile, action?: "rotate" | "toggle-switch") => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  interactive?: boolean;
  levelId?: number;
}
const TILE_NAMES: Record<Tile["type"], string> = {
  empty: "空格",
  battery: "能量源",
  bulb: "旋转木马",
  line: "直管",
  corner: "弯管",
  t_shape: "三通",
  cross: "十字管",
  switch: "能量闸",
  diode: "单向管",
};
export const TileView: React.FC<TileViewProps> = ({
  tile,
  isPowered,
  isLit,
  isPeekActive,
  onClick,
  interactive = true,
}) => {
  const isGoal = tile.type === "bulb",
    isSource = tile.type === "battery";
  const locked = interactive && (tile.locked || tile.type === "empty");
  const base = getDefaultBasePorts(tile.type);
  const offset =
    [0, 90, 180, 270].find(
      (angle) => rotatePorts(base, angle) === tile.basePorts,
    ) ?? 0;
  const artName = isGoal
    ? "carousel"
    : isSource
      ? "pipe-source"
      : tile.type === "switch"
        ? `pipe-switch-${tile.switchClosed === false ? "off" : "on"}`
        : tile.type === "diode"
          ? "pipe-diode"
          : `pipe-${tile.type}-${isPowered ? "on" : "off"}`;
  return (
    <div
      className={`park-tile ${isPowered ? "is-powered" : ""} ${isGoal ? "is-goal" : ""} ${isLit ? "is-lit" : ""} ${tile.locked ? "is-fixed" : ""}`}
      data-tile-id={tile.id}
      data-type={tile.type}
      data-rotation={tile.rotation % 360}
      data-powered={isPowered}
      data-switch={
        tile.type === "switch" ? String(tile.switchClosed !== false) : undefined
      }
    >
      <button
        className="park-tile-rotate"
        disabled={locked}
        onClick={() => onClick(tile, "rotate")}
        aria-label={`${tile.row + 1}行${tile.col + 1}列${TILE_NAMES[tile.type]}${tile.locked ? "固定" : "旋转"}`}
      >
        {tile.type !== "empty" && (
          <Art
            name={artName}
            className={`park-pipe ${isGoal && !isLit ? "sleeping" : ""}`}
            style={{
              transform: `rotate(${isGoal ? 0 : tile.rotation + offset}deg)`,
            }}
          />
        )}
        {tile.type === "empty" && <span className="park-empty-spark" />}
        {tile.locked && !isSource && !isGoal && (
          <span className="park-fixed-mark">
            <Icon name="lock" />
          </span>
        )}
        {isPeekActive && (
          <span className="park-tile-coord">
            {tile.row + 1},{tile.col + 1}
          </span>
        )}
      </button>
      {tile.type === "switch" && interactive && !tile.locked && (
        <button
          className={`park-switch-toggle ${tile.switchClosed === false ? "off" : ""}`}
          aria-label={`${tile.row + 1}行${tile.col + 1}列能量闸${tile.switchClosed === false ? "开启" : "关闭"}`}
          onClick={() => onClick(tile, "toggle-switch")}
        >
          {tile.switchClosed === false ? "开" : "关"}
        </button>
      )}
    </div>
  );
};
