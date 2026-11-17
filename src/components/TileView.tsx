import React from "react";
import type { Tile } from "../types/game";
import { Art, Icon, getExhibitArt } from "./ParkArt";
import { getCollectionEntry } from "../content";
import { getDefaultBasePorts, isRotationNoop, rotatePorts } from "../utils/circuit";
interface TileViewProps {
  tile: Tile;
  isPowered: boolean;
  /** 双色关卡：到达色掩码（1=0 号色，2=1 号色，3=串色） */
  colorMask?: number;
  isLit?: boolean;
  isPeekActive?: boolean;
  onClick: (tile: Tile, action?: "rotate" | "toggle-switch") => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  interactive?: boolean;
  levelId?: number;
  /** 齿轮组序号（1 起）：同色 = 同一组 */
  gearIndex?: number;
  /** 每转过一次 +1：用来重放闪光与角标弹跳 */
  gearFlash?: number;
  /** 环面关卡：这一格的哪些边会从对面折回来 */
  wrapEdges?: ("up" | "down" | "left" | "right")[];
  /** 焊死关卡：这一格已通电，不能再转 */
  weldLocked?: boolean;
  /** 提示引擎高亮的格子 */
  isHint?: boolean;
}
const TILE_NAMES: Record<Tile["type"], string> = {
  empty: "空格",
  battery: "能量源",
  bulb: "设施",
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
  colorMask = 0,
  isLit,
  isPeekActive,
  onClick,
  interactive = true,
  levelId,
  gearIndex = 0,
  gearFlash = 0,
  wrapEdges,
  weldLocked = false,
  isHint = false,
}) => {
  const isGoal = tile.type === "bulb",
    isSource = tile.type === "battery";
  /** 双色关：未通电时也要能看出源/设施要什么颜色 */
  const staticColor = tile.color === undefined ? 0 : tile.color === 0 ? 1 : 2;
  const shownColor = colorMask || staticColor;
  const goalEntry = isGoal && levelId ? getCollectionEntry(levelId) : null;
  /** 转了也不会变形的格子（十字管）：不该看起来、也不该表现得像个可转按钮。 */
  const noop = tile.type !== "empty" && !tile.axis && isRotationNoop(tile);
  const locked = interactive && (tile.locked || tile.type === "empty" || noop || weldLocked);
  const base = getDefaultBasePorts(tile.type);
  const offset =
    [0, 90, 180, 270].find(
      (angle) => rotatePorts(base, angle) === tile.basePorts,
    ) ?? 0;
  const artName = isGoal
    ? (goalEntry ? getExhibitArt(goalEntry) : "carousel")
    : isSource
      ? "pipe-source"
      : tile.type === "switch"
        ? `pipe-switch-${tile.switchClosed === false ? "off" : "on"}`
        : tile.type === "diode"
          ? "pipe-diode"
          : `pipe-${tile.type}-${isPowered ? "on" : "off"}`;
  return (
    <div
      className={`park-tile ${isPowered ? "is-powered" : ""} ${isGoal ? "is-goal" : ""} ${isLit ? "is-lit" : ""} ${tile.locked ? "is-fixed" : ""} ${noop ? "is-noop" : ""} ${tile.axis ? "has-axis" : ""} ${weldLocked ? "is-welded" : ""} ${isHint ? "is-hint" : ""} ${shownColor ? `color-${shownColor}` : ""}`}
      data-tile-id={tile.id}
      data-type={tile.type}
      data-axis={tile.axis}
      data-axis-dir={tile.axisDir}
      data-gear-index={gearIndex || undefined}
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
        aria-label={`${tile.row + 1}行${tile.col + 1}列${TILE_NAMES[tile.type]}${tile.type === "empty" ? "不可操作" : tile.locked ? "固定" : noop ? "四向对称，无需旋转" : "旋转"}`}
      >
        {tile.type !== "empty" && (
          <Art
            name={artName}
            className={`park-pipe ${isGoal ? "park-facility-art" : ""} ${isGoal && !isLit ? "sleeping" : ""}`}
            style={{
              transform: `rotate(${isGoal ? 0 : tile.rotation + offset}deg)`,
            }}
          />
        )}
        {tile.type === "empty" && <span className="park-empty-spark" />}
        {(wrapEdges ?? []).map((edge) => (
          <span key={edge} className={`park-wrap-tick is-${edge}`} aria-hidden="true" />
        ))}
        {shownColor > 0 && (
          <span
            className="park-color-mark"
            style={{ background: shownColor === 3 ? "#a855f7" : shownColor === 2 ? "#2f8bff" : "#ff3b21" }}
          />
        )}
        {tile.axis && (
          <span
            key={gearFlash || undefined}
            className={`park-axis-mark ${tile.axisDir ? "is-gear" : ""} ${gearFlash ? "is-pop" : ""}`}
            aria-hidden="true"
          >
            {tile.axisDir ? (tile.axisDir < 0 ? "↺" : "↻") : "轴"}
          </span>
        )}
        {weldLocked && (
          <span className="park-weld-mark" aria-hidden="true">
            焊
          </span>
        )}

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
          aria-label={`${tile.row + 1}行${tile.col + 1}列能量闸${tile.switchClosed === false ? "断开，点击接通" : "接通，点击断开"}`}
          onClick={() => onClick(tile, "toggle-switch")}
        >
          {tile.switchClosed === false ? "断" : "通"}
        </button>
      )}
    </div>
  );
};
