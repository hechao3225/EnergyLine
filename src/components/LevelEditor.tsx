/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LevelConfig, Tile, TileType } from '../types/game';
import { getDefaultBasePorts, simulateCircuit } from '../utils/circuit';
import { GameBoard } from './GameBoard';
import { Play, Copy, Check, Upload, Trash2, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/audio';

interface LevelEditorProps {
  onPlayCustomLevel: (config: LevelConfig) => void;
  onBack: () => void;
}

export const LevelEditor: React.FC<LevelEditorProps> = ({
  onPlayCustomLevel,
  onBack,
}) => {
  const [selectedBrush, setSelectedBrush] = useState<TileType>('line');
  const [brushRotation, setBrushRotation] = useState<0 | 90 | 180 | 270>(0);
  const [levelTitle, setLevelTitle] = useState('自制关卡 #1');
  const [maxSteps, setMaxSteps] = useState(15);
  const [copied, setCopied] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [showImport, setShowImport] = useState(false);

  // Initialize empty 6x6 grid with battery at (2,0) and bulb at (2,5)
  const [tiles, setTiles] = useState<Tile[]>(() => {
    const list: Tile[] = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        let type: TileType = 'empty';
        let rot: 0 | 90 | 180 | 270 = 0;
        let locked = false;

        if (r === 2 && c === 0) {
          type = 'battery';
          locked = true;
        } else if (r === 2 && c === 5) {
          type = 'bulb';
          locked = true;
        }

        list.push({
          id: `editor-${r}-${c}`,
          row: r,
          col: c,
          type,
          rotation: rot,
          basePorts: getDefaultBasePorts(type),
          locked,
        });
      }
    }
    return list;
  });

  const simulation = simulateCircuit(tiles, 6, 6);

  // Handle clicking on the board in editor mode
  const handleTileClick = (target: Tile) => {
    sound.playRotate();
    setTiles((prev) =>
      prev.map((t) => {
        if (t.row === target.row && t.col === target.col) {
          // If clicking on same type, rotate it!
          if (t.type === selectedBrush && t.type !== 'empty') {
            return {
              ...t,
              rotation: t.rotation + 90,
            };
          }
          // Otherwise place new brush
          const locked = selectedBrush === 'battery' || selectedBrush === 'bulb';
          return {
            ...t,
            type: selectedBrush,
            rotation: brushRotation,
            basePorts: getDefaultBasePorts(selectedBrush),
            locked,
            switchClosed: selectedBrush === 'switch' ? false : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleClearBoard = () => {
    setTiles((prev) =>
      prev.map((t) => ({
        ...t,
        type: 'empty',
        rotation: 0,
        basePorts: 0,
        locked: false,
      }))
    );
  };

  const handleExport = () => {
    const config: LevelConfig = {
      id: 999,
      code: 'DIY',
      totalLevels: 1,
      title: levelTitle,
      hintText: '自制关卡测试挑战。',
      winText: '自制关卡成功点亮！',
      maxSteps,
      gridRows: 6,
      gridCols: 6,
      tiles,
    };
    const jsonStr = JSON.stringify(config);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    navigator.clipboard.writeText(b64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(importCode.trim())));
      const parsed: LevelConfig = JSON.parse(decoded);
      if (parsed.tiles && Array.isArray(parsed.tiles)) {
        setTiles(parsed.tiles);
        if (parsed.title) setLevelTitle(parsed.title);
        if (parsed.maxSteps) setMaxSteps(parsed.maxSteps);
        setShowImport(false);
        setImportCode('');
      }
    } catch {
      alert('关卡代码格式不正确，请检查粘贴的内容。');
    }
  };

  const handlePlay = () => {
    const config: LevelConfig = {
      id: 999,
      code: 'DIY',
      totalLevels: 1,
      title: levelTitle || '自制关卡',
      hintText: '开辟通路，完成自制电路闭合。',
      winText: '自制关卡完美通关！',
      maxSteps,
      gridRows: 6,
      gridCols: 6,
      tiles: tiles.map((t) => ({ ...t })),
    };
    onPlayCustomLevel(config);
  };

  const brushes: { type: TileType; label: string }[] = [
    { type: 'empty', label: '橡皮擦' },
    { type: 'battery', label: '电池源' },
    { type: 'bulb', label: '目标灯' },
    { type: 'line', label: '直管' },
    { type: 'corner', label: '弯管' },
    { type: 't_shape', label: '三通' },
    { type: 'cross', label: '四通' },
    { type: 'switch', label: '开关' },
    { type: 'diode', label: '二极管' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#dce3d5]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-[#d6dfce] text-[#485b52] hover:bg-[#edf3e8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#1b2f27]">关卡工坊 (Level Studio)</h2>
            <p className="text-sm text-[#4d6057]">
              设计您自己的供能谜题，验证通路并导出分享
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlay}
            disabled={simulation.totalBulbs === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm shadow-sm transition-all ${
              simulation.totalBulbs > 0
                ? 'bg-[#115e59] text-white hover:bg-[#0d4f4b]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>进入试玩</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Element Palette & Settings */}
        <div className="lg:col-span-4 space-y-5">
          {/* Brush Selector */}
          <div className="p-5 bg-[#f7faf4] border border-[#dce3d5] rounded-3xl">
            <h3 className="font-bold text-[#1c2e27] text-base mb-3">
              选择元件笔刷
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {brushes.map((b) => (
                <button
                  key={b.type}
                  onClick={() => setSelectedBrush(b.type)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedBrush === b.type
                      ? 'bg-[#115e59] text-white border-[#115e59] shadow-sm'
                      : 'bg-white text-[#41534c] border-[#d8e0d1] hover:bg-[#edf3e8]'
                  }`}
                >
                  <span>{b.label}</span>
                </button>
              ))}
            </div>

            {/* Rotation Control for Brush */}
            <div className="mt-4 pt-3 border-t border-[#e2e9dc] flex items-center justify-between">
              <span className="text-xs font-medium text-[#4d6057]">
                初始旋转角: {brushRotation}°
              </span>
              <button
                onClick={() =>
                  setBrushRotation(
                    (((brushRotation + 90) % 360) as 0 | 90 | 180 | 270)
                  )
                }
                className="px-3 py-1 bg-white border border-[#d8e0d1] rounded-lg text-xs font-medium text-[#3b4e45] hover:bg-[#edf3e8]"
              >
                顺时针 +90°
              </button>
            </div>
          </div>

          {/* Level Meta Settings */}
          <div className="p-5 bg-[#f7faf4] border border-[#dce3d5] rounded-3xl space-y-4">
            <h3 className="font-bold text-[#1c2e27] text-base">
              关卡参数配置
            </h3>

            <div>
              <label className="text-xs font-medium text-[#4d6057] block mb-1">
                关卡名称
              </label>
              <input
                type="text"
                value={levelTitle}
                onChange={(e) => setLevelTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#d8e0d1] rounded-xl text-sm font-medium text-[#1c2e27] focus:outline-teal-600"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#4d6057] block mb-1">
                挑战限制步数: {maxSteps} 步
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={maxSteps}
                onChange={(e) => setMaxSteps(Number(e.target.value))}
                className="w-full accent-teal-700"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex-1 py-2 px-3 bg-white border border-[#d8e0d1] rounded-xl text-xs font-semibold text-[#3b4e45] hover:bg-[#edf3e8] flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制关卡码' : '复制关卡码'}</span>
              </button>

              <button
                onClick={() => setShowImport(!showImport)}
                className="py-2 px-3 bg-white border border-[#d8e0d1] rounded-xl text-xs font-semibold text-[#3b4e45] hover:bg-[#edf3e8] flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>导入</span>
              </button>

              <button
                onClick={handleClearBoard}
                className="p-2 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50"
                title="清空格子"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {showImport && (
              <div className="pt-2">
                <textarea
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  placeholder="在此粘贴导出的 Base64 关卡代码..."
                  className="w-full h-20 p-2 text-xs font-mono bg-white border border-[#d8e0d1] rounded-xl focus:outline-teal-600"
                />
                <button
                  onClick={handleImport}
                  className="w-full mt-2 py-1.5 bg-[#115e59] text-white rounded-xl text-xs font-semibold"
                >
                  确认导入
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Interactive Board */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Live Validation Banner */}
          <div className="w-full max-w-xl mb-4 p-3 rounded-2xl bg-white/80 border border-[#dce3d5] flex items-center justify-between text-xs sm:text-sm font-medium">
            <span className="text-[#41534c]">
              当前状态: {simulation.isAllLit ? '✅ 电路已全通' : '⏳ 电路未完全接通'}
            </span>
            <span className="font-mono text-[#1c2e27]">
              供能灯泡: {simulation.litCount} / {simulation.totalBulbs}
            </span>
          </div>

          <GameBoard
            tiles={tiles}
            gridRows={6}
            gridCols={6}
            simulation={simulation}
            isPeekActive={true}
            onTileClick={handleTileClick}
            onLongPressStart={() => {}}
            onLongPressEnd={() => {}}
          />

          <p className="mt-4 text-xs text-[#6e8076]">
            提示：点击已有元件可切换笔刷或旋转；选择橡皮擦点击即可清除。
          </p>
        </div>
      </div>
    </div>
  );
};
