/**
 * GameBoard：H5 GameBoard 的 Canvas 复刻。
 * 玉坛祭坛边框 + 84% 内区瓦片网格 + 活水流光 / 泉眼脉冲 / 花光绽放层 + 升腾光珠。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { Node } from '../runtime/node';
import { TileSprite, TileAction } from './tile';
import { getImage } from '../runtime/assets';
import { SimulationResult, Tile } from '../types/game';
import { computeActiveWaterPaths } from '../logic/flowPaths';

export class GameBoard extends Node {
  private tileSprites = new Map<string, TileSprite>();
  private tiles: Tile[];
  private gridRows: number;
  private gridCols: number;
  private simulation: SimulationResult;
  private isPeekActive = false;
  private interactive: boolean;
  private levelId: number;
  private onTileClick: (tile: Tile, action?: TileAction) => void;

  constructor(opts: {
    tiles: Tile[];
    gridRows: number;
    gridCols: number;
    simulation: SimulationResult;
    width: number;
    height: number;
    interactive?: boolean;
    levelId?: number;
    onTileClick: (tile: Tile, action?: TileAction) => void;
    onLongPressStart?: () => void;
    onLongPressEnd?: () => void;
  }) {
    super();
    this.tiles = opts.tiles;
    this.gridRows = opts.gridRows;
    this.gridCols = opts.gridCols;
    this.simulation = opts.simulation;
    this.interactive = opts.interactive ?? true;
    this.levelId = opts.levelId ?? 1;
    this.onTileClick = opts.onTileClick;
    this.width = opts.width;
    this.height = opts.height;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this.rebuild();
  }

  private rebuild(): void {
    this.removeAllChildren();
    this.tileSprites.clear();

    // 瓦片网格（内区 84%）
    const inner = this.width * 0.84;
    const cell = inner / Math.max(this.gridRows, this.gridCols);
    const gridW = cell * this.gridCols;
    const gridH = cell * this.gridRows;

    for (const t of this.tiles) {
      const sprite = new TileSprite({
        tile: t,
        isPowered: this.simulation.poweredTileIds.has(t.id),
        isLit: this.simulation.litBulbIds.has(t.id),
        interactive: this.interactive,
        levelId: this.levelId,
        onTap: (tile, action) => this.onTileClick(tile, action),
        onPeekStart: () => {
          this.isPeekActive = true;
          this.syncPeek();
        },
        onPeekEnd: () => {
          this.isPeekActive = false;
          this.syncPeek();
        },
      });
      sprite.width = cell;
      sprite.height = cell;
      sprite.x = (this.width - gridW) / 2 + t.col * cell + cell / 2;
      sprite.y = (this.height - gridH) / 2 + t.row * cell + cell / 2;
      this.addChild(sprite);
      this.tileSprites.set(t.id, sprite);
    }
  }

  /** 状态同步（每步操作后调用）：更新供电/点亮/旋转补间 */
  syncState(tiles: Tile[], simulation: SimulationResult): void {
    this.tiles = tiles;
    this.simulation = simulation;

    const inner = this.width * 0.84;
    const cell = inner / Math.max(this.gridRows, this.gridCols);
    const gridW = cell * this.gridCols;
    const gridH = cell * this.gridRows;

    for (const t of tiles) {
      let sprite = this.tileSprites.get(t.id);
      if (!sprite) {
        sprite = new TileSprite({
          tile: t,
          isPowered: false,
          isLit: false,
          interactive: this.interactive,
          levelId: this.levelId,
          onTap: (tile, action) => this.onTileClick(tile, action),
          onPeekStart: () => {
            this.isPeekActive = true;
            this.syncPeek();
          },
          onPeekEnd: () => {
            this.isPeekActive = false;
            this.syncPeek();
          },
        });
        sprite.width = cell;
        sprite.height = cell;
        sprite.x = (this.width - gridW) / 2 + t.col * cell + cell / 2;
        sprite.y = (this.height - gridH) / 2 + t.row * cell + cell / 2;
        this.addChild(sprite);
        this.tileSprites.set(t.id, sprite);
      }
      const wasLit = sprite.isLit;
      // 布局防御：每次同步时按当前尺寸重排（修复构造顺序依赖）
      sprite.width = cell;
      sprite.height = cell;
      sprite.x = (this.width - gridW) / 2 + t.col * cell + cell / 2;
      sprite.y = (this.height - gridH) / 2 + t.row * cell + cell / 2;
      sprite.tile = t;
      sprite.isPowered = simulation.poweredTileIds.has(t.id);
      sprite.isLit = t.type === 'bulb' && simulation.litBulbIds.has(t.id);
      sprite.syncRotation();
      if (sprite.isLit && !wasLit) sprite.bloomIn();
    }
    this.syncPeek();
  }

  setPeek(active: boolean): void {
    this.isPeekActive = active;
    this.syncPeek();
  }

  private syncPeek(): void {
    for (const s of this.tileSprites.values()) s.isPeekActive = this.isPeekActive;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    // 白玉祭坛边框
    const altar = getImage('assets/board_altar.webp');
    if (altar) {
      ctx.drawImage(altar, 0, 0, this.width, this.height);
    } else {
      // 加载完成前的兜底底板
      ctx.fillStyle = 'rgba(255, 252, 245, 0.85)';
      ctx.strokeStyle = 'rgba(135, 165, 148, 0.9)';
      ctx.lineWidth = 2;
      const r = 18;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(this.width, 0, this.width, this.height, r);
      ctx.arcTo(this.width, this.height, 0, this.height, r);
      ctx.arcTo(0, this.height, 0, 0, r);
      ctx.arcTo(0, 0, this.width, 0, r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // 子节点（瓦片）绘制之后，再叠加活水流光层：
    // Canvas 2D 无 z 分层，这里在 children 之前绘制底板、之后由 overlay 节点绘制流光。
  }

  /** 活水流光覆盖层（作为兄弟节点叠加在棋盘之上，需自行 setPos 对齐棋盘中心） */
  createFlowOverlay(): FlowOverlay {
    return new FlowOverlay(this);
  }

  /** 单元格中心坐标（与瓦片布局同一公式） */
  cellCenter(row: number, col: number): { x: number; y: number } {
    const c = (this.width * 0.84) / Math.max(this.gridRows, this.gridCols);
    const gx = (this.width - c * this.gridCols) / 2;
    const gy = (this.height - c * this.gridRows) / 2;
    return { x: gx + (col + 0.5) * c, y: gy + (row + 0.5) * c };
  }

  dumpTiles(): Array<Record<string, number | boolean | string>> {
    const out: Array<Record<string, number | boolean | string>> = [];
    for (const [id, sp] of this.tileSprites.entries()) {
      out.push({ id, x: sp.x, y: sp.y, w: sp.width, h: sp.height, touchable: sp.touchable, visible: sp.visible, parent: sp.parent === this });
    }
    return out;
  }

  get rows(): number { return this.gridRows; }
  get cols(): number { return this.gridCols; }

  get boardTiles(): Tile[] {
    return this.tiles;
  }
  get boardSim(): SimulationResult {
    return this.simulation;
  }
  get peekActive(): boolean {
    return this.isPeekActive;
  }
}

/** 活水流光 / 泉眼脉冲 / 花光绽放层（绘制于瓦片之上，与棋盘同尺寸同锚点） */
export class FlowOverlay extends Node {
  private board: GameBoard;

  constructor(board: GameBoard) {
    super();
    this.board = board;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this.width = board.width;
    this.height = board.height;
  }

  protected onDraw(ctx: CanvasRenderingContext2D): void {
    const b = this.board;
    const sim = b.boardSim;
    const flow = computeActiveWaterPaths(b.boardTiles, b.rows, b.cols, sim.poweredTileIds);
    const unit = b.width * 0.01; // 百分比坐标系 → 像素（对应 H5 的 100x100 视口）

    // 活水溪流
    ctx.lineCap = 'round';
    for (const seg of flow.segments) {
      const p1 = b.cellCenter(seg.r1, seg.c1);
      const p2 = b.cellCenter(seg.r2, seg.c2);
      // 辉光
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = unit * 1.6;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      // 流动水珠
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = unit * 1.2;
      ctx.setLineDash([unit * 2.5, unit * 3.5]);
      ctx.lineDashOffset = -((Date.now() * 0.03) % (unit * 6));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 泉眼脉冲
    const t = (Date.now() * 0.001) % 2.5;
    for (const st of flow.sourceTiles) {
      const p = b.cellCenter(st.row, st.col);
      ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 0.6 * (1 - t / 2.5))})`;
      ctx.lineWidth = unit * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, unit * (4 + t * 1.6), 0, Math.PI * 2);
      ctx.stroke();
    }

    // 盛放花光
    const pulse = 0.8 + 0.2 * Math.sin(Date.now() * 0.003);
    for (const bulb of flow.bulbTiles) {
      if (!sim.litBulbIds.has(bulb.id)) continue;
      const p = b.cellCenter(bulb.row, bulb.col);
      ctx.fillStyle = `rgba(244, 114, 182, ${0.25 * pulse})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, unit * 5 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
