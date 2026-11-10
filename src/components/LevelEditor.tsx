import React, { useState } from "react";
import type { LevelConfig, Tile, TileType } from "../types/game";
import { getDefaultBasePorts, simulateCircuit } from "../utils/circuit";
import { GameBoard } from "./GameBoard";
import { Art, ParkButton } from "./ParkArt";
import { sound } from "../utils/audio";

interface Props {
  onPlayCustomLevel: (level: LevelConfig) => void;
}
const BRUSHES: { type: TileType; label: string; art: string }[] = [
  { type: "line", label: "直管", art: "pipe-line-off" },
  { type: "corner", label: "弯管", art: "pipe-corner-off" },
  { type: "t_shape", label: "三通", art: "pipe-t_shape-off" },
  { type: "cross", label: "十字管", art: "pipe-cross-off" },
  { type: "switch", label: "能量闸", art: "pipe-switch-on" },
  { type: "diode", label: "单向管", art: "pipe-diode" },
  { type: "battery", label: "能量源", art: "pipe-source" },
  { type: "bulb", label: "设施", art: "carousel" },
  { type: "empty", label: "擦除", art: "icon-reset" },
];
function initialTiles(): Tile[] {
  return Array.from({ length: 36 }, (_, i) => {
    const row = Math.floor(i / 6),
      col = i % 6;
    const type: TileType =
      row === 2 && col === 0
        ? "battery"
        : row === 2 && col === 5
          ? "bulb"
          : "empty";
    return {
      id: `editor-${row}-${col}`,
      row,
      col,
      type,
      rotation: 0,
      basePorts: getDefaultBasePorts(type),
      locked: type === "battery" || type === "bulb",
    };
  });
}
export function LevelEditor({ onPlayCustomLevel }: Props) {
  const [tiles, setTiles] = useState(initialTiles);
  const [brush, setBrush] = useState<TileType>("line");
  const [rotation, setRotation] = useState(0);
  const [title, setTitle] = useState("我的星光乐园");
  const [maxSteps, setMaxSteps] = useState(30);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const simulation = simulateCircuit(tiles, 6, 6);
  const config = (): LevelConfig => ({
    id: 999,
    code: "DIY",
    totalLevels: 1,
    title: title.trim() || "我的星光乐园",
    hintText: "转动管道，让能量抵达每一座设施。",
    winText: "星光乐园修复成功！",
    maxSteps,
    gridRows: 6,
    gridCols: 6,
    tiles,
  });
  const draw = (target: Tile) => {
    sound.playRotate();
    setTiles((current) =>
      current.map((tile) =>
        tile.id === target.id
          ? {
              ...tile,
              type: brush,
              rotation:
                tile.type === brush && brush !== "empty"
                  ? tile.rotation + 90
                  : rotation,
              basePorts: getDefaultBasePorts(brush),
              locked: brush === "battery" || brush === "bulb",
              switchClosed: brush === "switch" ? true : undefined,
            }
          : tile,
      ),
    );
  };
  const exportCode = async () => {
    const result = btoa(unescape(encodeURIComponent(JSON.stringify(config()))));
    setCode(result);
    setShareOpen(true);
    try {
      await navigator.clipboard.writeText(result);
      setMessage("关卡代码已复制");
    } catch {
      setMessage("关卡代码已生成，可长按复制");
    }
  };
  const importCode = () => {
    try {
      const imported: LevelConfig = JSON.parse(
        decodeURIComponent(escape(atob(code.trim()))),
      );
      if (
        imported.gridRows !== 6 ||
        imported.gridCols !== 6 ||
        imported.tiles.length !== 36 ||
        !imported.tiles.some((tile) => tile.type === "battery") ||
        !imported.tiles.some((tile) => tile.type === "bulb") ||
        imported.maxSteps < 1
      )
        throw new Error("invalid");
      setTiles(imported.tiles);
      setTitle(imported.title);
      setMaxSteps(imported.maxSteps);
      setShareOpen(false);
      setMessage("关卡已导入");
    } catch {
      setMessage("关卡代码无效，请粘贴完整的 6×6 关卡代码");
    }
  };
  return (
    <div className="park-editor">
      <div className="park-editor-fields">
        <label>
          关卡名称
          <input
            value={title}
            maxLength={20}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          步数
          <input
            type="number"
            min={1}
            max={999}
            value={maxSteps}
            onChange={(event) =>
              setMaxSteps(
                Math.max(1, Math.min(999, Number(event.target.value))),
              )
            }
          />
        </label>
      </div>
      <div className="park-editor-brushes">
        {BRUSHES.map((item) => (
          <button
            className={brush === item.type ? "selected" : ""}
            key={item.type}
            onClick={() => setBrush(item.type)}
            aria-label={`笔刷${item.label}`}
          >
            <Art name={item.art} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="park-editor-mini-actions">
        <button onClick={() => setRotation((rotation + 90) % 360)}>
          笔刷方向 {rotation}°
        </button>
        <button onClick={() => setTiles(initialTiles())}>清空管道</button>
      </div>
      <GameBoard
        tiles={tiles}
        gridRows={6}
        gridCols={6}
        simulation={simulation}
        isPeekActive={false}
        onTileClick={draw}
        interactive={false}
      />
      <p className="park-fine-print">
        选择笔刷后点击棋盘放置，再次点击同类管件可旋转。
      </p>
      <ParkButton
        onClick={() => onPlayCustomLevel(config())}
        disabled={
          !tiles.some((tile) => tile.type === "battery") ||
          simulation.totalBulbs === 0
        }
      >
        进入试玩
      </ParkButton>
      <div className="park-mode-links">
        <ParkButton purple onClick={exportCode}>
          导出关卡
        </ParkButton>
        <ParkButton
          purple
          onClick={() => {
            setShareOpen(!shareOpen);
            setMessage("");
          }}
        >
          导入关卡
        </ParkButton>
      </div>
      {shareOpen && (
        <div className="park-share-code">
          <label>
            关卡代码
            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              rows={4}
            />
          </label>
          <ParkButton onClick={importCode}>导入这份关卡</ParkButton>
        </div>
      )}
      {message && <p role="status">{message}</p>}
    </div>
  );
}
