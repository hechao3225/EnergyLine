/**
 * 调试钩子（仅浏览器/web 平台安装）：
 * 为 Playwright 模拟玩家测试暴露 __game 全局对象。
 * - __game.state()      当前关卡状态
 * - __game.solve(id)    BFS 求解指定关卡 → 操作序列
 * - __game.tileCenter(id) 瓦片屏幕坐标
 * - __game.goLevel(id)  跳转关卡
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { getPlatform } from './adapter/platform';
import { Director } from './runtime/director';
import { Node } from './runtime/node';
import { GameScene } from './ui/gameScene';
import { DEFAULT_LEVELS } from './logic/data/defaultLevels';
import { simulateCircuit } from './logic/circuit';
import { LevelConfig, Tile } from './types/game';

interface SolverMove {
  tileId: string;
  action: 'rotate' | 'toggle';
  type: string;
}

interface GlobalGame {
  state(): {
    levelId: number;
    remainingSteps: number;
    stepsUsed: number;
    litCount: number;
    totalBulbs: number;
    isAllLit: boolean;
    victoryModalVisible: boolean;
    cleared: number[];
    lastAction: string | null;
  };
  solve(levelId: number): { moves: SolverMove[]; steps: number } | null;
  tileCenter(tileId: string): { x: number; y: number } | null;
  goLevel(levelId: number): void;
  board(): { x: number; y: number; width: number; height: number } | null;
  hitTest(x: number, y: number): unknown;
  debugContains(tileId: string, x: number, y: number): unknown;
  dump(): unknown;
  /** 当前场景名（HomeScene / GameScene / CollectionScene） */
  scene(): string;
  /** 长按透视是否激活 */
  peek(): boolean;
  /** 第一个含水闸的关卡 id（模拟玩家测试用） */
  firstSwitchLevel(): number | null;
  /** 当前关第一个水闸瓦片的屏幕坐标 */
  switchTile(): { x: number; y: number; id: string } | null;
  /** 瓦片的世界坐标推导链（排查变换 bug 用） */
  debugChain(id: string): unknown;
  /** 列出所有可触摸节点的世界矩形（用于模拟玩家测试定位按钮） */
  tapTargets(): Array<{ cls: string; id: string | null; text: string | null; x: number; y: number; w: number; h: number; scale: number; rotation: number; visible: boolean }>;
}

/** BFS 求解器：从关卡初始乱序状态搜索到全亮的操作序列 */
function solveLevel(level: LevelConfig): { moves: SolverMove[]; steps: number } | null {
  const rotatable = level.tiles.filter((t) => !t.locked && t.type !== 'empty' && t.type !== 'switch');
  const switches = level.tiles.filter((t) => t.type === 'switch' && !t.locked);

  interface SearchNode {
    rots: number[]; // rotatable tiles 的 rotation (mod 360)
    sw: number[]; // switch tiles 的 switchClosed (1/0)
    moves: SolverMove[];
  }

  const key = (n: SearchNode): string => n.rots.join(',') + '|' + n.sw.join(',');

  const buildTiles = (n: SearchNode): Tile[] =>
    level.tiles.map((t) => {
      const ri = rotatable.findIndex((r) => r.id === t.id);
      if (ri >= 0) return { ...t, rotation: n.rots[ri] };
      const si = switches.findIndex((s) => s.id === t.id);
      if (si >= 0) return { ...t, switchClosed: n.sw[si] === 1 };
      return { ...t };
    });

  const start: SearchNode = {
    rots: rotatable.map((t) => ((t.rotation % 360) + 360) % 360),
    sw: switches.map((t) => (t.switchClosed === false ? 0 : 1)),
    moves: [],
  };

  const queue: SearchNode[] = [start];
  const visited = new Set<string>([key(start)]);
  let guard = 0;

  while (queue.length > 0 && guard < 200000) {
    guard++;
    const cur = queue.shift()!;
    const tiles = buildTiles(cur);
    const sim = simulateCircuit(tiles, level.gridRows, level.gridCols);
    if (sim.isAllLit && cur.moves.length > 0) {
      return { moves: cur.moves, steps: cur.moves.length };
    }
    if (sim.isAllLit && cur.moves.length === 0) {
      return { moves: [], steps: 0 };
    }

    // 邻居：旋转 / 切换
    for (let i = 0; i < rotatable.length; i++) {
      const next: SearchNode = {
        rots: cur.rots.slice(),
        sw: cur.sw.slice(),
        moves: [...cur.moves, { tileId: rotatable[i].id, action: 'rotate', type: rotatable[i].type }],
      };
      next.rots[i] = (next.rots[i] + 90) % 360;
      const k = key(next);
      if (!visited.has(k)) {
        visited.add(k);
        queue.push(next);
      }
    }
    for (let i = 0; i < switches.length; i++) {
      const next: SearchNode = {
        rots: cur.rots.slice(),
        sw: cur.sw.slice(),
        moves: [...cur.moves, { tileId: switches[i].id, action: 'toggle', type: switches[i].type }],
      };
      next.sw[i] = next.sw[i] === 1 ? 0 : 1;
      const k = key(next);
      if (!visited.has(k)) {
        visited.add(k);
        queue.push(next);
      }
    }
  }
  return null;
}

export function installDebugHooks(
  director: Director,
  goLevel: (id: number) => void,
  getGameScene: () => GameScene | null
): void {
  const platform = getPlatform();
  if (platform.name !== 'web') return;

  const g: GlobalGame = {
    state() {
      const scene = getGameScene();
      const c = scene?.controller;
      if (!scene || !c) return {
        levelId: -1, remainingSteps: 0, stepsUsed: 0, litCount: 0, totalBulbs: 0,
        isAllLit: false, victoryModalVisible: false, cleared: [], lastAction: null,
      };
      return {
        levelId: c.level.id,
        remainingSteps: c.remainingSteps,
        stepsUsed: c.stepsUsed,
        litCount: c.simulation.litCount,
        totalBulbs: c.simulation.totalBulbs,
        isAllLit: c.simulation.isAllLit,
        victoryModalVisible: scene.victoryModalOpen,
        cleared: c.clearedLevels,
        lastAction: c.lastAction,
      };
    },
    solve(levelId: number) {
      const level = DEFAULT_LEVELS.find((l) => l.id === levelId);
      if (!level) return null;
      return solveLevel(level);
    },
    tileCenter(tileId: string) {
      const scene = getGameScene();
      if (!scene) return null;
      const tile = scene.controller.tiles.find((t) => t.id === tileId);
      if (!tile) return null;
      const b = scene.gameBoard;
      const c = b.cellCenter(tile.row, tile.col);
      return { x: b.x - b.width / 2 + c.x, y: b.y - b.height / 2 + c.y };
    },
    board() {
      const scene = getGameScene();
      if (!scene) return null;
      const b = scene.gameBoard;
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    },
    goLevel(levelId: number) {
      goLevel(levelId);
    },
    dump(): unknown {
      const scene = getGameScene();
      if (!scene) return null;
      return {
        board: { x: scene.gameBoard.x, y: scene.gameBoard.y, w: scene.gameBoard.width, h: scene.gameBoard.height, touchable: scene.gameBoard.touchable, visible: scene.gameBoard.visible, childCount: scene.gameBoard.children.length },
        rootChildren: scene.root.children.map((c) => c.constructor.name),
        tiles: scene.gameBoard.dumpTiles(),
      };
    },
    debugContains(tileId: string, x: number, y: number): unknown {
      const scene = getGameScene();
      if (!scene) return null;
      const b = scene.gameBoard;
      const sprite = (b as unknown as { tileSprites: Map<string, { containsWorld: (x: number, y: number) => boolean; toLocal: (x: number, y: number) => { x: number; y: number } }> }).tileSprites.get(tileId);
      if (!sprite) return { error: 'no sprite' };
      const local = sprite.toLocal(x, y);
      return { local, contains: sprite.containsWorld(x, y) };
    },
    hitTest(x: number, y: number): unknown {
      const scene = getGameScene();
      if (!scene) return null;
      const hit = scene.root.hitTest(x, y);
      if (!hit) return null;
      const ctor = hit.constructor.name;
      const anyHit = hit as unknown as Record<string, unknown>;
      return {
        cls: ctor,
        tileId: anyHit.tile ? (anyHit.tile as Record<string, unknown>).id : null,
        x: hit.x,
        y: hit.y,
        w: hit.width,
        h: hit.height,
        touchable: hit.touchable,
      };
    },
    scene() {
      return director.current ? director.current.constructor.name : 'none';
    },
    peek() {
      const scene = getGameScene();
      return scene ? scene.gameBoard.peekActive : false;
    },
    firstSwitchLevel() {
      const lv = DEFAULT_LEVELS.find((l) => l.tiles.some((t) => t.type === 'switch'));
      return lv ? lv.id : null;
    },
    debugChain(tileId: string) {
      const scene = getGameScene();
      if (!scene) return null;
      const b = scene.gameBoard as unknown as { tileSprites: Map<string, Node> };
      const sprite = b.tileSprites.get(tileId);
      if (!sprite) return null;
      const chain: Array<Record<string, number | string>> = [];
      for (let n: Node | null = sprite; n; n = n.parent) {
        chain.push({ cls: n.constructor.name, x: n.x, y: n.y, w: n.width, h: n.height, ax: n.anchorX, ay: n.anchorY, rot: n.rotation, sx: n.scaleX });
      }
      const local = sprite.toLocal(sprite.width / 2, sprite.height / 2);
      const world = sprite.toWorld(sprite.width / 2, sprite.height / 2);
      return { chain, local, world, rect: sprite.worldRect() };
    },
    switchTile() {
      const scene = getGameScene();
      if (!scene) return null;
      const t = scene.controller.tiles.find((x) => x.type === 'switch');
      if (!t) return null;
      const b = scene.gameBoard;
      const c = b.cellCenter(t.row, t.col);
      return { x: b.x - b.width / 2 + c.x, y: b.y - b.height / 2 + c.y, id: t.id };
    },
    tapTargets() {
      const root = director.current?.root;
      if (!root) return [];
      const out: Array<{ cls: string; id: string | null; text: string | null; x: number; y: number; w: number; h: number; scale: number; rotation: number; visible: boolean }> = [];
      const walk = (n: Node): void => {
        if (!n.visible) return;
        if (n.touchable) {
          const r = n.worldRect();
          const label = (n as unknown as { label?: { text?: string } }).label;
          const tile = (n as unknown as { tile?: { id?: string } }).tile;
          out.push({
            cls: n.constructor.name,
            id: tile?.id ?? null,
            text: label?.text ?? null,
            x: Math.round(r.x + r.w / 2),
            y: Math.round(r.y + r.h / 2),
            w: Math.round(r.w),
            h: Math.round(r.h),
            scale: Number(n.scaleX.toFixed(2)),
            rotation: Math.round(n.rotation),
            visible: n.visible,
          });
        }
        for (const c of n.children) walk(c);
      };
      walk(root);
      return out;
    },
  };

  (globalThis as Record<string, unknown>).__game = g;
}
