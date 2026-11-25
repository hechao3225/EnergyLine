import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Tile, SimulationResult } from "../types/game";
import { TileView } from "./TileView";
import { getRotorRingPositions } from "../utils/rotor";

/** 齿轮分组配色：同色 = 同一组；相邻两格咬合，点一下一顺一反。 */
const GEAR_COLORS = ["#d8b264", "#7fc9b4", "#d9a3bb", "#9ec4dd", "#b3a3d1"];

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
  /** 提示引擎高亮的格子 id */
  hintTileId?: string | null;
  /** 环面关卡：左右、上下边界相接 */
  wrap?: boolean;
  /** 焊死关卡：通电的格子锁住 */
  weld?: boolean;
}

interface RotorMotion {
  rotor: Tile;
  fromTiles: Tile[];
}

export function GameBoard({
  tiles,
  gridRows,
  gridCols,
  simulation,
  isPeekActive,
  onTileClick,
  interactive = true,
  levelId,
  hintTileId,
  wrap = false,
  weld = false,
}: GameBoardProps) {
  const cells = new Map(tiles.map((tile) => [`${tile.row},${tile.col}`, tile]));
  const wrapLinks = useMemo(() => {
    if (!wrap) return [];
    const links = new Map<
      string,
      {
        key: string;
        fromSide: "up" | "down" | "left" | "right";
        toSide: "up" | "down" | "left" | "right";
        fromRow: number;
        fromCol: number;
        toRow: number;
        toCol: number;
      }
    >();
    for (const edge of simulation.poweredEdges) {
      const [from, to] = edge.split("->");
      const [fromRow, fromCol] = from.split(",").map(Number);
      const [toRow, toCol] = to.split(",").map(Number);
      let fromSide: "up" | "down" | "left" | "right" | null = null;
      let toSide: "up" | "down" | "left" | "right" | null = null;
      if (fromCol === gridCols - 1 && toCol === 0) {
        fromSide = "right";
        toSide = "left";
      } else if (fromCol === 0 && toCol === gridCols - 1) {
        fromSide = "left";
        toSide = "right";
      } else if (fromRow === gridRows - 1 && toRow === 0) {
        fromSide = "down";
        toSide = "up";
      } else if (fromRow === 0 && toRow === gridRows - 1) {
        fromSide = "up";
        toSide = "down";
      }
      if (!fromSide || !toSide) continue;
      const pairKey =
        from < to ? `${from}|${to}` : `${to}|${from}`;
      links.set(pairKey, {
        key: pairKey,
        fromSide,
        toSide,
        fromRow,
        fromCol,
        toRow,
        toCol,
      });
    }
    return [...links.values()];
  }, [gridCols, gridRows, simulation.poweredEdges, wrap]);
  // 焊死：齿轮组只要有一格通电，整组锁住
  const weldedAxes = new Set<string>();
  if (weld) {
    for (const tile of tiles) {
      if (tile.axis && simulation.poweredTileIds.has(tile.id)) weldedAxes.add(tile.axis);
    }
  }
  const axisIndex = useMemo(() => {
    const ids = [...new Set(tiles.map((tile) => tile.axis).filter(Boolean))] as string[];
    ids.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
    return new Map(ids.map((id, index) => [id, index + 1]));
  }, [tiles]);
  const rotor = tiles.find((tile) => tile.type === "rotor");
  const rotorRing = useMemo(
    () =>
      new Set(
        rotor
          ? getRotorRingPositions(rotor).map(({ row, col }) => `${row},${col}`)
          : [],
      ),
    [rotor],
  );
  const rotorActive = Boolean(rotor?.rotorActivated);
  const previousRotorActive = useRef(rotorActive);
  const previousTiles = useRef(tiles);
  const [rotorSpinning, setRotorSpinning] = useState(false);
  const [rotorMotion, setRotorMotion] = useState<RotorMotion | null>(null);

  useLayoutEffect(() => {
    if (rotorActive && !previousRotorActive.current && rotor) {
      setRotorMotion({ rotor: { ...rotor }, fromTiles: previousTiles.current });
      setRotorSpinning(true);
    }
    previousRotorActive.current = rotorActive;
  }, [rotorActive, rotor]);

  useLayoutEffect(() => {
    previousTiles.current = tiles;
  }, [tiles]);

  useEffect(() => {
    if (!rotorSpinning) return;
    const timer = setTimeout(() => {
      setRotorSpinning(false);
      setRotorMotion(null);
    }, 960);
    return () => clearTimeout(timer);
  }, [rotorSpinning]);

  const rotorMotionItems = useMemo(() => {
    if (!rotorMotion) return [];
    const positions = getRotorRingPositions(rotorMotion.rotor);
    return positions.flatMap((position, index) => {
      const tile = rotorMotion.fromTiles.find(
        (candidate) =>
          candidate.row === position.row && candidate.col === position.col,
      );
      if (!tile) return [];
      const destination = positions[(index + 1) % positions.length];
      const moveX = destination.col - position.col;
      const moveY = destination.row - position.row;
      return [
        {
          tile,
          style: {
            left: `${(position.col / gridCols) * 100}%`,
            top: `${(position.row / gridRows) * 100}%`,
            width: `${100 / gridCols}%`,
            height: `${100 / gridRows}%`,
            "--rotor-glide-x": `${moveX * 68}%`,
            "--rotor-glide-y": `${moveY * 68}%`,
            "--rotor-lock-x": `${moveX * 96}%`,
            "--rotor-lock-y": `${moveY * 96}%`,
            "--rotor-over-x": `${moveX * 102}%`,
            "--rotor-over-y": `${moveY * 102}%`,
            "--rotor-settle-x": `${moveX * 99}%`,
            "--rotor-settle-y": `${moveY * 99}%`,
            "--rotor-move-x": `${moveX * 100}%`,
            "--rotor-move-y": `${moveY * 100}%`,
          } as React.CSSProperties,
        },
      ];
    });
  }, [gridCols, gridRows, rotorMotion]);

  // 只有真的转过的格子才闪：撤销、进关都不触发。
  const previousRotation = useRef(new Map<string, number>());
  const [flash, setFlash] = useState<Record<string, number>>({});
  useEffect(() => {
    const nextRotation = new Map<string, number>();
    const turned: string[] = [];
    for (const tile of tiles) {
      if (!tile.axisDir) continue;
      nextRotation.set(tile.id, tile.rotation);
      const before = previousRotation.current.get(tile.id);
      if (before !== undefined && before !== tile.rotation) turned.push(tile.id);
    }
    previousRotation.current = nextRotation;
    if (!turned.length) return;
    setFlash((current) => {
      const updated = { ...current };
      for (const id of turned) updated[id] = (current[id] ?? 0) + 1;
      return updated;
    });
  }, [tiles]);

  return (
    <div
      className={`park-board ${simulation.isAllLit ? "is-complete" : ""} ${simulation.overloaded ? "is-overloaded" : ""} ${wrap ? "is-wrap" : ""} ${rotorSpinning ? "is-rotor-spin" : ""}`}
      data-wrap={wrap ? "true" : undefined}
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
              colorMask={simulation.tileColors?.get(tile.id) ?? 0}
              isLit={simulation.litBulbIds.has(tile.id)}
              isPeekActive={isPeekActive}
              onClick={onTileClick}
              interactive={interactive}
              isHint={Boolean(hintTileId) && hintTileId === tile.id}
              isRotorRing={rotorRing.has(`${tile.row},${tile.col}`)}
              levelId={levelId}
              gearIndex={tile.axis ? axisIndex.get(tile.axis) ?? 0 : 0}
              gearFlash={flash[tile.id] ?? 0}
              weldLocked={
                weld &&
                tile.type !== "battery" &&
                tile.type !== "bulb" &&
                (tile.axis
                  ? weldedAxes.has(tile.axis)
                  : simulation.poweredTileIds.has(tile.id))
              }
              wrapEdges={
                wrap
                  ? [
                      ...(tile.row === 0 ? (["up"] as const) : []),
                      ...(tile.row === gridRows - 1 ? (["down"] as const) : []),
                      ...(tile.col === 0 ? (["left"] as const) : []),
                      ...(tile.col === gridCols - 1 ? (["right"] as const) : []),
                    ]
                  : undefined
              }
            />
          ) : (
            <div className="park-tile" key={`space-${i}`} />
          );
        })}
        {rotor && (
          <span
            className="park-rotor-orbit"
            style={{
              left: `${((rotor.col - Math.max(1, rotor.rotorRadius ?? 1)) / gridCols) * 100}%`,
              top: `${((rotor.row - Math.max(1, rotor.rotorRadius ?? 1)) / gridRows) * 100}%`,
              width: `${((Math.max(1, rotor.rotorRadius ?? 1) * 2 + 1) / gridCols) * 100}%`,
              height: `${((Math.max(1, rotor.rotorRadius ?? 1) * 2 + 1) / gridRows) * 100}%`,
            }}
            aria-hidden="true"
          />
        )}
        {rotorMotion && (
          <div className="park-rotor-motion" aria-hidden="true">
            {rotorMotionItems.map(({ tile, style }) => (
              <div
                key={tile.id}
                className="park-rotor-moving-tile"
                style={style}
              >
                <TileView
                  tile={tile}
                  isPowered={simulation.poweredTileIds.has(tile.id)}
                  colorMask={simulation.tileColors?.get(tile.id) ?? 0}
                  onClick={() => {}}
                  interactive={false}
                  levelId={levelId}
                />
              </div>
            ))}
          </div>
        )}
        {rotorSpinning && rotor && (
          <b
            className="park-rotor-callout"
            style={{
              left: `${((rotor.col + 0.5) / gridCols) * 100}%`,
              top: `${((rotor.row + 0.5) / gridRows) * 100}%`,
            }}
            aria-hidden="true"
          >
            环轨换位
          </b>
        )}
      </div>
      {wrapLinks.length > 0 && (
        <div className="park-wrap-ghosts" aria-hidden="true">
          {wrapLinks.map((link) => {
            const fromVertical =
              link.fromSide === "left" || link.fromSide === "right";
            const toVertical = link.toSide === "left" || link.toSide === "right";
            return (
              <React.Fragment key={link.key}>
                <span
                  className={`park-wrap-ghost is-${link.fromSide}`}
                  style={
                    fromVertical
                      ? {
                          top: `${((link.fromRow + 0.5) / gridRows) * 100}%`,
                          height: `${45 / gridRows}%`,
                        }
                      : {
                          left: `${((link.fromCol + 0.5) / gridCols) * 100}%`,
                          width: `${45 / gridCols}%`,
                        }
                  }
                />
                <span
                  className={`park-wrap-ghost is-${link.toSide}`}
                  style={
                    toVertical
                      ? {
                          top: `${((link.toRow + 0.5) / gridRows) * 100}%`,
                          height: `${45 / gridRows}%`,
                        }
                      : {
                          left: `${((link.toCol + 0.5) / gridCols) * 100}%`,
                          width: `${45 / gridCols}%`,
                        }
                  }
                />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
