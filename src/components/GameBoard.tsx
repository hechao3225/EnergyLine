import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Tile, SimulationResult } from "../types/game";
import { TileView } from "./TileView";
import {
  getRotorRingPositions,
  type RotorActivationStep,
} from "../utils/rotor";

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
  /** 点了焊死格：播拒绝音效/震动 */
  onWeldBlocked?: () => void;
  /** 本次操作触发的连续转盘换位 */
  rotorAnimation?: RotorActivationStep[] | null;
}

interface RotorMotion {
  rotor: Tile;
  fromTiles: Tile[];
  step: number;
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
  onWeldBlocked,
  rotorAnimation,
}: GameBoardProps) {
  const [visualTiles, setVisualTiles] = useState<Tile[] | null>(null);
  const displayTiles = visualTiles ?? tiles;
  const cells = new Map(
    displayTiles.map((tile) => [`${tile.row},${tile.col}`, tile]),
  );
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
    for (const tile of displayTiles) {
      if (tile.axis && simulation.poweredTileIds.has(tile.id)) weldedAxes.add(tile.axis);
    }
  }
  const axisIndex = useMemo(() => {
    const ids = [...new Set(displayTiles.map((tile) => tile.axis).filter(Boolean))] as string[];
    ids.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
    return new Map(ids.map((id, index) => [id, index + 1]));
  }, [displayTiles]);
  const rotors = displayTiles.filter((tile) => tile.type === "rotor");
  const rotorRing = useMemo(
    () =>
      new Set(
        rotors.flatMap((rotor) =>
          getRotorRingPositions(rotor).map(({ row, col }) => `${row},${col}`),
        ),
      ),
    [rotors],
  );
  const [rotorSpinning, setRotorSpinning] = useState(false);
  const [rotorMotion, setRotorMotion] = useState<RotorMotion | null>(null);
  const rotorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playRotorStep = useCallback(
    (steps: RotorActivationStep[], index: number) => {
      if (rotorTimer.current) clearTimeout(rotorTimer.current);
      const step = steps[index];
      if (!step) return;
      setVisualTiles(step.fromTiles);
      setRotorMotion({
        rotor: step.rotor,
        fromTiles: step.fromTiles,
        step: index,
      });
      setRotorSpinning(true);
      rotorTimer.current = setTimeout(() => {
        if (index + 1 < steps.length) {
          setVisualTiles(step.toTiles);
          playRotorStep(steps, index + 1);
          return;
        }
        setVisualTiles(null);
        setRotorMotion(null);
        setRotorSpinning(false);
      }, 880);
    },
    [],
  );

  useLayoutEffect(() => {
    if (!rotorAnimation?.length) {
      if (rotorTimer.current) clearTimeout(rotorTimer.current);
      setVisualTiles(null);
      setRotorMotion(null);
      setRotorSpinning(false);
      return;
    }
    playRotorStep(rotorAnimation, 0);
    return () => {
      if (rotorTimer.current) clearTimeout(rotorTimer.current);
    };
  }, [playRotorStep, rotorAnimation]);

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
      return [
        {
          tile,
          style: {
            left: `${(position.col / gridCols) * 100}%`,
            top: `${(position.row / gridRows) * 100}%`,
            width: `${100 / gridCols}%`,
            height: `${100 / gridRows}%`,
            "--rotor-move-x": `${(destination.col - position.col) * 100}%`,
            "--rotor-move-y": `${(destination.row - position.row) * 100}%`,
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
              interactive={interactive && !rotorSpinning}
              isHint={Boolean(hintTileId) && hintTileId === tile.id}
              isRotorRing={rotorRing.has(`${tile.row},${tile.col}`)}
              weldLevel={weld}
              levelId={levelId}
              gearIndex={tile.axis ? axisIndex.get(tile.axis) ?? 0 : 0}
              gearFlash={flash[tile.id] ?? 0}
              weldLocked={
                weld &&
                !tile.locked &&
                tile.type !== "battery" &&
                tile.type !== "bulb" &&
                (tile.axis
                  ? weldedAxes.has(tile.axis)
                  : simulation.poweredTileIds.has(tile.id))
              }
              onWeldBlocked={onWeldBlocked}
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
        {rotors.map((rotor) => (
          <span
            key={`rotor-orbit-${rotor.id}`}
            className="park-rotor-orbit"
            style={{
              left: `${((rotor.col - Math.max(1, rotor.rotorRadius ?? 1)) / gridCols) * 100}%`,
              top: `${((rotor.row - Math.max(1, rotor.rotorRadius ?? 1)) / gridRows) * 100}%`,
              width: `${((Math.max(1, rotor.rotorRadius ?? 1) * 2 + 1) / gridCols) * 100}%`,
              height: `${((Math.max(1, rotor.rotorRadius ?? 1) * 2 + 1) / gridRows) * 100}%`,
            }}
            aria-hidden="true"
          />
        ))}
        {rotorMotion && (
          <div className="park-rotor-motion" aria-hidden="true">
            {rotorMotionItems.map(({ tile, style }) => (
              <div
                key={`${rotorMotion.step}-${tile.id}`}
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
        {rotorSpinning && rotorMotion && (
          <b
            className="park-rotor-callout"
            style={{
              left: `${((rotorMotion.rotor.col + 0.5) / gridCols) * 100}%`,
              top: `${((rotorMotion.rotor.row + 0.5) / gridRows) * 100}%`,
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
