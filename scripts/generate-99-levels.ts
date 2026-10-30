/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { Direction, LevelConfig, Tile, TileType } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';

// Helper to create empty 6x6 grid
function createEmptyGrid(): Tile[] {
  const tiles: Tile[] = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      tiles.push({
        id: `t-${r}-${c}`,
        row: r,
        col: c,
        type: 'empty',
        rotation: 0,
        basePorts: Direction.NONE,
      });
    }
  }
  return tiles;
}

function setTile(
  tiles: Tile[],
  row: number,
  col: number,
  type: Tile['type'],
  rotation: 0 | 90 | 180 | 270 = 0,
  locked: boolean = false,
  extra: Partial<Tile> = {}
) {
  const index = tiles.findIndex(t => t.row === row && t.col === col);
  const basePorts = getDefaultBasePorts(type);
  const tile: Tile = {
    id: `t-${row}-${col}`,
    row,
    col,
    type,
    rotation,
    basePorts,
    locked,
    ...extra,
  };
  if (index !== -1) {
    tiles[index] = tile;
  } else {
    tiles.push(tile);
  }
}

// Calculate minimal moves to solve a tile
function getMinRotateMoves(initial: number, solved: number, type: TileType): number {
  if (type === 'cross' || type === 'empty' || type === 'battery' || type === 'bulb') {
    return 0;
  }
  if (type === 'line') {
    // Line has 2-fold symmetry (0 and 180 are identical, 90 and 270 are identical)
    const normInit = (Math.round(initial) % 180 + 180) % 180;
    const normSol = (Math.round(solved) % 180 + 180) % 180;
    return normInit === normSol ? 0 : 1;
  }
  // Corner, t_shape, switch, diode have 4-fold orientation
  const normInit = (Math.round(initial) % 360 + 360) % 360;
  const normSol = (Math.round(solved) % 360 + 360) % 360;
  const diff = ((normSol - normInit) % 360 + 360) % 360;
  const steps = Math.floor(diff / 90) % 4;
  return steps === 3 ? 1 : steps; // clockwise or counterclockwise shortest
}

// Scramble a solved layout into an engaging, non-trivial puzzle
function createScrambledLevel(
  id: number,
  title: string,
  subtitle: string,
  hintText: string,
  winText: string,
  solvedTiles: Tile[],
  seedModifier: number = 42
): { solved: Tile[]; level: LevelConfig } {
  const rand = makePrng(id * 7919 + seedModifier);
  const scrambledTiles: Tile[] = [];
  let minMoves = 0;

  for (const st of solvedTiles) {
    if (st.locked || st.type === 'empty' || st.type === 'battery' || st.type === 'bulb') {
      scrambledTiles.push({ ...st });
      continue;
    }

    if (st.type === 'switch') {
      // Switches start open and rotated perpendicularly
      const scrambleSteps = 1 + (Math.floor(rand() * 2)); // 1 or 2 steps
      const scrambledRot = ((st.rotation + scrambleSteps * 90) % 360) as 0 | 90 | 180 | 270;
      minMoves += getMinRotateMoves(scrambledRot, st.rotation, 'switch') + 1; // +1 for closing switch
      scrambledTiles.push({
        ...st,
        rotation: scrambledRot,
        switchClosed: false, // Must be closed by player
      });
      continue;
    }

    if (st.type === 'cross') {
      // Cross doesn't need rotation, but keep as is
      scrambledTiles.push({ ...st });
      continue;
    }

    // Line, Corner, T-Shape, Diode
    let scrambleSteps = 1;
    if (st.type === 'line') {
      scrambleSteps = 1; // perpendicular
    } else {
      scrambleSteps = 1 + Math.floor(rand() * 3); // 1, 2, or 3
    }

    const scrambledRot = ((st.rotation + scrambleSteps * 90) % 360) as 0 | 90 | 180 | 270;
    minMoves += getMinRotateMoves(scrambledRot, st.rotation, st.type);
    scrambledTiles.push({
      ...st,
      rotation: scrambledRot,
    });
  }

  const code = String(id).padStart(2, '0');
  const maxSteps = Math.max(16, minMoves * 2 + 6);

  return {
    solved: solvedTiles,
    level: {
      id,
      code,
      totalLevels: 99,
      title,
      subtitle,
      hintText,
      winText,
      maxSteps,
      gridRows: 6,
      gridCols: 6,
      tiles: scrambledTiles,
    },
  };
}

// PRNG generator
function makePrng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* ================= PRESERVED & ENHANCED CHAPTER 1 HANDCRAFTED BENCHMARKS ================= */

// Level 1: 单线启明 (Preserved classic intro)
function makeLevel1(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 2, 1, 'battery', 0, true);
  setTile(solved, 2, 2, 'line', 0);
  setTile(solved, 2, 3, 'corner', 90);  // DOWN & LEFT
  setTile(solved, 3, 3, 'line', 90);    // vertical
  setTile(solved, 4, 3, 'corner', 270); // UP & RIGHT
  setTile(solved, 4, 4, 'bulb', 0, true);

  const initial = solved.map(t => ({ ...t }));
  initial.find(t => t.row === 2 && t.col === 2)!.rotation = 90;
  initial.find(t => t.row === 2 && t.col === 3)!.rotation = 180;
  initial.find(t => t.row === 3 && t.col === 3)!.rotation = 0;
  initial.find(t => t.row === 4 && t.col === 3)!.rotation = 90;

  return {
    solved,
    level: {
      id: 1,
      code: '01',
      totalLevels: 99,
      title: '单线启明',
      subtitle: '地脉之根 · 引导首脉活水',
      hintText: '点击水渠进行顺时针旋转，接通灵泉与花蕾。',
      winText: '第一朵灵花已盛开！活水顺畅注入树根。',
      maxSteps: 15,
      gridRows: 6,
      gridCols: 6,
      tiles: initial,
    },
  };
}

// Level 2: 双路分流 (Preserved classic dual-path intro)
function makeLevel2(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 3, 0, 'battery', 0, true);
  setTile(solved, 3, 1, 'line', 0);
  setTile(solved, 3, 2, 't_shape', 90); // UP, DOWN, LEFT
  // Upper branch
  setTile(solved, 2, 2, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 2, 3, 'line', 0);
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);
  // Lower branch
  setTile(solved, 4, 2, 'corner', 270); // UP & RIGHT
  setTile(solved, 4, 3, 'line', 0);
  setTile(solved, 4, 4, 'line', 0);
  setTile(solved, 4, 5, 'bulb', 0, true);

  const initial = solved.map(t => ({ ...t }));
  initial.find(t => t.row === 3 && t.col === 1)!.rotation = 90;
  initial.find(t => t.row === 3 && t.col === 2)!.rotation = 180;
  initial.find(t => t.row === 2 && t.col === 2)!.rotation = 270;
  initial.find(t => t.row === 2 && t.col === 3)!.rotation = 90;
  initial.find(t => t.row === 2 && t.col === 4)!.rotation = 90;
  initial.find(t => t.row === 4 && t.col === 2)!.rotation = 0;
  initial.find(t => t.row === 4 && t.col === 3)!.rotation = 90;
  initial.find(t => t.row === 4 && t.col === 4)!.rotation = 90;

  return {
    solved,
    level: {
      id: 2,
      code: '02',
      totalLevels: 99,
      title: '双路分流',
      subtitle: '地脉之根 · 三通分流上下齐开',
      hintText: '利用三通玉管分流，将清泉同时送往上下两路。',
      winText: '双花同放！灵脉分流和谐运转。',
      maxSteps: 20,
      gridRows: 6,
      gridCols: 6,
      tiles: initial,
    },
  };
}

// Level 3: 三盏归巢 (Preserved multi-branch with decoys)
function makeLevel3(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 2, 0, 'battery', 0, true);
  setTile(solved, 2, 1, 't_shape', 0);   // LEFT, RIGHT, DOWN
  setTile(solved, 2, 2, 't_shape', 180); // LEFT, RIGHT, UP
  // Top branch
  setTile(solved, 1, 2, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 1, 3, 'line', 0);
  setTile(solved, 1, 4, 'corner', 180); // UP & LEFT
  setTile(solved, 0, 4, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 0, 5, 'bulb', 0, true);
  // Mid branch
  setTile(solved, 2, 3, 'line', 0);
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);
  // Bottom branch
  setTile(solved, 3, 1, 'line', 90);    // vertical
  setTile(solved, 4, 1, 'corner', 270); // UP & RIGHT
  setTile(solved, 4, 2, 'line', 0);
  setTile(solved, 4, 3, 'line', 0);
  setTile(solved, 4, 4, 'corner', 90);  // DOWN & LEFT
  setTile(solved, 5, 4, 'corner', 270); // UP & RIGHT
  setTile(solved, 5, 5, 'bulb', 0, true);
  // Decoy tiles
  setTile(solved, 3, 2, 'line', 90);
  setTile(solved, 3, 3, 'corner', 180);

  const initial = solved.map(t => ({ ...t }));
  initial.find(t => t.row === 2 && t.col === 1)!.rotation = 90;
  initial.find(t => t.row === 2 && t.col === 2)!.rotation = 270;
  initial.find(t => t.row === 1 && t.col === 2)!.rotation = 90;
  initial.find(t => t.row === 1 && t.col === 4)!.rotation = 270;
  initial.find(t => t.row === 0 && t.col === 4)!.rotation = 90;
  initial.find(t => t.row === 2 && t.col === 3)!.rotation = 90;
  initial.find(t => t.row === 2 && t.col === 4)!.rotation = 90;
  initial.find(t => t.row === 3 && t.col === 1)!.rotation = 0;
  initial.find(t => t.row === 4 && t.col === 1)!.rotation = 180;
  initial.find(t => t.row === 4 && t.col === 4)!.rotation = 0;
  initial.find(t => t.row === 5 && t.col === 4)!.rotation = 90;

  return {
    solved,
    level: {
      id: 3,
      code: '03',
      totalLevels: 99,
      title: '三盏归巢',
      subtitle: '地脉之根 · 多级支路与甄别诱饵',
      hintText: '规划上中下三路，避开无效诱饵管道。',
      winText: '三朵仙花璀璨盛开！水网运转如意。',
      maxSteps: 35,
      gridRows: 6,
      gridCols: 6,
      tiles: initial,
    },
  };
}

// Level 4: 经纬初交 (REBUILT: true cross junction requiring 3D pass-through thinking)
function makeLevel4(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  // Battery at (3,0)
  setTile(solved, 3, 0, 'battery', 0, true);
  setTile(solved, 3, 1, 't_shape', 0); // LEFT, RIGHT, DOWN

  // Horizontal crossing branch: through (3,2) cross to (3,5) bulb
  setTile(solved, 3, 2, 'cross', 0);
  setTile(solved, 3, 3, 'line', 0);
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  // Vertical crossing loop: (3,1) down to (4,1) -> (4,2) -> (3,2 cross vertical) -> (2,2) -> (2,3) -> (1,3) -> (1,4) bulb!
  setTile(solved, 4, 1, 'corner', 90);  // UP & RIGHT
  setTile(solved, 4, 2, 'corner', 180); // UP & LEFT -> into (3,2) cross from bottom!
  // (3,2) cross carries vertical flow up into (2,2)!
  setTile(solved, 2, 2, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 2, 3, 'corner', 180); // UP & LEFT
  setTile(solved, 1, 3, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 1, 4, 'bulb', 0, true);

  // Decoy pipes to create interesting challenge
  setTile(solved, 2, 1, 'line', 90);
  setTile(solved, 4, 3, 'corner', 270);
  setTile(solved, 5, 2, 'line', 0);

  return createScrambledLevel(
    4,
    '经纬初交',
    '地脉之根 · 十字立交纵横穿梭',
    '十字立交允许水平与垂直水流同时穿行且互不串流。',
    '水脉纵横交织！十字立交巧妙打通两路通途。',
    solved,
    101
  );
}

// Level 5: 地脉断壁 (REBUILT: introducing locked natural obstacles)
function makeLevel5(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 1, 0, 'battery', 0, true);
  setTile(solved, 1, 1, 'line', 0);
  setTile(solved, 1, 2, 't_shape', 0); // LEFT, RIGHT, DOWN

  // Upper bypass: straight into (1,5)
  setTile(solved, 1, 3, 'line', 0);
  setTile(solved, 1, 4, 'line', 0);
  setTile(solved, 1, 5, 'bulb', 0, true);

  // Block center with 2 fixed obsidian stones (locked tiles)
  setTile(solved, 2, 2, 'line', 90, true); // FIXED OBSTACLE (cannot rotate!)
  setTile(solved, 2, 3, 'line', 0, true);  // FIXED OBSTACLE

  // Lower bypass around obstacles
  setTile(solved, 2, 1, 'corner', 90);  // UP & RIGHT: wait, from (1,2) down: at (2,1) it's not connected to (1,2).
  // Let's connect from (1,2) down: wait, (2,2) is locked vertical!
  // If (2,2) is locked vertical, water from (1,2) DOWN passes through (2,2) vertical to (3,2)!
  // That's brilliant: (2,2) is a natural fixed conduit that players CANNOT rotate, so they must use its fixed orientation!
  setTile(solved, 3, 2, 'corner', 270); // UP & RIGHT
  setTile(solved, 3, 3, 'line', 0);
  setTile(solved, 3, 4, 'corner', 90);  // DOWN & LEFT
  setTile(solved, 4, 4, 'corner', 270); // UP & RIGHT
  setTile(solved, 4, 5, 'bulb', 0, true);

  // Decoys
  setTile(solved, 3, 1, 'corner', 180);
  setTile(solved, 4, 2, 'cross', 0);

  return createScrambledLevel(
    5,
    '地脉断壁',
    '地脉之根 · 固化地脉与外围迂回',
    '带有锁石标记的管道已固化不可旋转，必须依其固有方向规划水路。',
    '成功绕开地脉断壁！坚韧的灵泉已灌溉双花。',
    solved,
    102
  );
}

// Level 6: 四方聚灵 (Center Source radiating outwards)
function makeLevel6(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  // Battery in center at (2,2)
  setTile(solved, 2, 2, 'battery', 0, true, {
    basePorts: Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
  });

  // North branch -> (0,2) bulb
  setTile(solved, 1, 2, 'line', 90);
  setTile(solved, 0, 2, 'bulb', 0, true);

  // East branch -> (2,5) bulb
  setTile(solved, 2, 3, 'line', 0);
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);

  // South branch -> (5,2) bulb
  setTile(solved, 3, 2, 'line', 90);
  setTile(solved, 4, 2, 'cross', 0);
  setTile(solved, 5, 2, 'bulb', 0, true);

  // West branch -> (2,0) bulb
  setTile(solved, 2, 1, 'line', 0);
  setTile(solved, 2, 0, 'bulb', 0, true);

  // Decoys in four quadrants
  setTile(solved, 1, 1, 'corner', 0);
  setTile(solved, 1, 3, 'corner', 90);
  setTile(solved, 3, 1, 'corner', 270);
  setTile(solved, 3, 3, 'corner', 180);

  return createScrambledLevel(
    6,
    '四方聚灵',
    '地脉之根 · 中心涌泉四向生机',
    '中心灵泉向四方同时吐纳活水，梳理四方玉管通达四方仙花。',
    '四海升平！四方灵花同时绽放。',
    solved,
    103
  );
}

// Level 10: 寒潭墨雪 (First Milestone Boss Level)
function makeLevel10(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 4, 0, 'battery', 0, true);

  // Water enters from left (4,0) into (4,1), goes UP
  setTile(solved, 4, 1, 'corner', 180); // UP & LEFT
  setTile(solved, 3, 1, 'line', 90);    // vertical UP & DOWN
  setTile(solved, 2, 1, 'corner', 0);   // DOWN & RIGHT into (2,2)
  setTile(solved, 2, 2, 'cross', 0);    // 4-way cross

  // Upper branch from (2,2) UP into (1,2)
  setTile(solved, 1, 2, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 1, 3, 'line', 0);
  setTile(solved, 1, 4, 'corner', 180); // UP & LEFT
  setTile(solved, 0, 4, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 0, 5, 'bulb', 0, true);

  // Mid branch from (2,2) RIGHT
  setTile(solved, 2, 3, 'line', 0);
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);

  // Lower branch from (2,2) DOWN into (3,2)
  setTile(solved, 3, 2, 'line', 90);    // vertical
  setTile(solved, 4, 2, 'corner', 270); // UP & RIGHT into (4,3)
  setTile(solved, 4, 3, 'corner', 90);  // DOWN & LEFT
  setTile(solved, 5, 3, 'corner', 270); // UP & RIGHT into (5,4)
  setTile(solved, 5, 4, 'line', 0);
  setTile(solved, 5, 5, 'bulb', 0, true);

  // Decoy tiles
  setTile(solved, 3, 3, 'line', 0);
  setTile(solved, 4, 4, 'corner', 180);

  return createScrambledLevel(
    10,
    '寒潭墨雪',
    '地脉之根 · 玄冰初融仙葩初醒',
    '寒潭九曲回环，利用立体十字与迂回玉道唤醒三朵仙花。',
    '寒霜褪尽，墨雪迎春！地脉第一至宝已收录花谱。',
    solved,
    110
  );
}

// Level 20: 地脉厚土 (Chapter 1 Master Exam)
function makeLevel20(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 3, 0, 'battery', 0, true);
  setTile(solved, 3, 1, 'cross', 0);

  // North branch
  setTile(solved, 2, 1, 'line', 90);
  setTile(solved, 1, 1, 'corner', 0);
  setTile(solved, 1, 2, 'cross', 0);
  setTile(solved, 0, 2, 'corner', 0);
  setTile(solved, 0, 3, 'line', 0);
  setTile(solved, 0, 4, 'line', 0);
  setTile(solved, 0, 5, 'bulb', 0, true);

  // Northeast flower
  setTile(solved, 1, 3, 'line', 0);
  setTile(solved, 1, 4, 'line', 0);
  setTile(solved, 1, 5, 'bulb', 0, true);

  // South branch
  setTile(solved, 4, 1, 'line', 90);
  setTile(solved, 5, 1, 'corner', 270);
  setTile(solved, 5, 2, 'line', 0);
  setTile(solved, 5, 3, 'corner', 180);
  setTile(solved, 4, 3, 't_shape', 270); // DOWN, UP, RIGHT
  setTile(solved, 4, 4, 'line', 0);
  setTile(solved, 4, 5, 'bulb', 0, true);

  // Southeast flower
  setTile(solved, 3, 3, 'corner', 0); // DOWN & RIGHT
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  // Decoy & locked obstacles
  setTile(solved, 2, 2, 'line', 0, true);
  setTile(solved, 4, 2, 'line', 0, true);

  return createScrambledLevel(
    20,
    '地脉厚土',
    '地脉之根 · 第一卷关底大考',
    '万丈根系交织贯通，四朵厚土灵花静候清泉归位！',
    '【地脉之根】圆满复苏！地脉厚土莲熠熠生辉。',
    solved,
    120
  );
}

// Level 25: 双源初现 (First Dual-Source Milestone Level)
function makeLevel25(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  // Battery 1 (North) at (1,0)
  setTile(solved, 1, 0, 'battery', 0, true);
  setTile(solved, 1, 1, 'line', 0);
  setTile(solved, 1, 2, 'corner', 90);  // LEFT & DOWN
  setTile(solved, 2, 2, 'corner', 270); // UP & RIGHT
  setTile(solved, 2, 3, 'line', 0);
  setTile(solved, 2, 4, 'corner', 180); // UP & LEFT
  setTile(solved, 1, 4, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 1, 5, 'bulb', 0, true);

  // Battery 2 (South) at (4,0)
  setTile(solved, 4, 0, 'battery', 0, true);
  setTile(solved, 4, 1, 'line', 0);
  setTile(solved, 4, 2, 'corner', 180); // LEFT & UP
  setTile(solved, 3, 2, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 3, 3, 'line', 0);
  setTile(solved, 3, 4, 'corner', 90);  // LEFT & DOWN
  setTile(solved, 4, 4, 'corner', 270); // UP & RIGHT
  setTile(solved, 4, 5, 'bulb', 0, true);

  // Fixed terrain between the two sources
  setTile(solved, 2, 1, 'line', 0, true);
  setTile(solved, 3, 1, 'line', 0, true);

  return createScrambledLevel(
    25,
    '双源初现',
    '巨木之干 · 双灵泉协同并流',
    '首次出现南北双灵泉！各自负责一条主脉，不可相互阻断。',
    '双泉齐涌！阴阳二脉同注枝干。',
    solved,
    125
  );
}

// Level 40: 九霄玉兰 (Chapter 2 Master Exam)
function makeLevel40(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 0, 0, 'battery', 0, true);
  setTile(solved, 5, 0, 'battery', 0, true);

  // North path with switch
  setTile(solved, 0, 1, 'line', 0);
  setTile(solved, 0, 2, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 0, 3, 'corner', 90);   // LEFT & DOWN
  setTile(solved, 1, 3, 't_shape', 270); // DOWN, UP, RIGHT
  setTile(solved, 1, 4, 'line', 0);
  setTile(solved, 1, 5, 'bulb', 0, true);
  setTile(solved, 2, 3, 'corner', 270); // UP & RIGHT
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);

  // South path with switch
  setTile(solved, 5, 1, 'line', 0);
  setTile(solved, 5, 2, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 5, 3, 'corner', 180); // LEFT & UP
  setTile(solved, 4, 3, 't_shape', 270); // DOWN, UP, RIGHT
  setTile(solved, 4, 4, 'line', 0);
  setTile(solved, 4, 5, 'bulb', 0, true);
  setTile(solved, 3, 3, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  // Obstacles
  setTile(solved, 2, 2, 'line', 90, true);
  setTile(solved, 3, 2, 'line', 90, true);

  return createScrambledLevel(
    40,
    '九霄玉兰',
    '巨木之干 · 第二卷关底大考',
    '统筹双灵泉与两路闸阀，点亮树干至高处的四朵九霄玉兰！',
    '【巨木之干】全脉畅通！九霄玉兰迎风怒放。',
    solved,
    140
  );
}

// Level 41: 顺水推舟 (Chapter 3 Diode Intro)
function makeLevel41(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 2, 0, 'battery', 0, true);
  setTile(solved, 2, 1, 'line', 0);
  setTile(solved, 2, 2, 'diode', 0); // pointing RIGHT (LEFT->RIGHT)
  setTile(solved, 2, 3, 't_shape', 90); // UP, DOWN, LEFT
  // Upper
  setTile(solved, 1, 3, 'corner', 0);   // DOWN & RIGHT
  setTile(solved, 1, 4, 'line', 0);
  setTile(solved, 1, 5, 'bulb', 0, true);
  // Lower
  setTile(solved, 3, 3, 'corner', 270); // UP & RIGHT
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  return createScrambledLevel(
    41,
    '顺水推舟',
    '苍翠繁枝 · 单向导通谨防逆流',
    '单向阀箭头指示灵泉允许通过的唯一方向，逆向将完全截断水流。',
    '顺向导流通达自如！二极管精准掌控水势。',
    solved,
    141
  );
}

// Level 60: 碧落仙荷 (Chapter 3 Master Exam)
function makeLevel60(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 1, 0, 'battery', 0, true);
  setTile(solved, 4, 0, 'battery', 0, true);

  // North branch from (1,0)
  setTile(solved, 1, 1, 'diode', 0);
  setTile(solved, 1, 2, 't_shape', 180); // LEFT, RIGHT, UP
  setTile(solved, 0, 2, 'corner', 0);    // DOWN & RIGHT
  setTile(solved, 0, 3, 'line', 0);
  setTile(solved, 0, 4, 'line', 0);
  setTile(solved, 0, 5, 'bulb', 0, true);

  setTile(solved, 1, 3, 'cross', 0);
  setTile(solved, 1, 4, 'line', 0);
  setTile(solved, 1, 5, 'bulb', 0, true);

  setTile(solved, 2, 3, 'diode', 90);    // pointing DOWN (UP->DOWN)
  setTile(solved, 3, 3, 'corner', 270);  // UP & RIGHT
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  // South branch from (4,0)
  setTile(solved, 4, 1, 'diode', 0);
  setTile(solved, 4, 2, 't_shape', 0);   // LEFT, RIGHT, DOWN
  setTile(solved, 4, 3, 'line', 0);
  setTile(solved, 4, 4, 'line', 0);
  setTile(solved, 4, 5, 'bulb', 0, true);

  setTile(solved, 5, 2, 'corner', 270);  // UP & RIGHT
  setTile(solved, 5, 3, 'line', 0);
  setTile(solved, 5, 4, 'line', 0);
  setTile(solved, 5, 5, 'bulb', 0, true);

  return createScrambledLevel(
    60,
    '碧落仙荷',
    '苍翠繁枝 · 第三卷关底大考',
    '五方碧水聚繁枝，四向极性定乾坤！',
    '【苍翠繁枝】灵气盎然！碧落仙荷香飘十里。',
    solved,
    160
  );
}

// Level 80: 赤血金凤 (Chapter 4 Master Exam)
function makeLevel80(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  setTile(solved, 0, 0, 'battery', 0, true);
  setTile(solved, 5, 0, 'battery', 0, true);

  // North branch
  setTile(solved, 0, 1, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 0, 2, 'cross', 0);
  setTile(solved, 0, 3, 'diode', 0);
  setTile(solved, 0, 4, 'line', 0);
  setTile(solved, 0, 5, 'bulb', 0, true);

  setTile(solved, 1, 2, 'line', 90);
  setTile(solved, 2, 2, 't_shape', 270); // DOWN, UP, RIGHT
  setTile(solved, 2, 3, 'line', 0);
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);

  // South branch
  setTile(solved, 5, 1, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 5, 2, 'cross', 0);
  setTile(solved, 5, 3, 'diode', 0);
  setTile(solved, 5, 4, 'line', 0);
  setTile(solved, 5, 5, 'bulb', 0, true);

  setTile(solved, 4, 2, 'cross', 0);
  setTile(solved, 3, 2, 't_shape', 270); // DOWN, UP, RIGHT
  setTile(solved, 3, 3, 'line', 0);
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  // Fifth bulb at (4,5)
  setTile(solved, 4, 3, 'line', 0);
  setTile(solved, 4, 4, 'line', 0);
  setTile(solved, 4, 5, 'bulb', 0, true);

  return createScrambledLevel(
    80,
    '赤血金凤',
    '云海天桥 · 第四卷关底大考',
    '全要素机关融合，双源飞渡云海，唤醒绝世赤血金凤！',
    '【云海天桥】万道霞光！赤血金凤振翅凌霄。',
    solved,
    180
  );
}

// Level 82: 三生万物 (First Triple-Source Level!)
function makeLevel82(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  // 3 Sources: Heaven (0,0), Human (2,0), Earth (4,0)
  setTile(solved, 0, 0, 'battery', 0, true);
  setTile(solved, 2, 0, 'battery', 0, true);
  setTile(solved, 4, 0, 'battery', 0, true);

  // Heaven line
  setTile(solved, 0, 1, 'line', 0);
  setTile(solved, 0, 2, 'line', 0);
  setTile(solved, 0, 3, 'line', 0);
  setTile(solved, 0, 4, 'line', 0);
  setTile(solved, 0, 5, 'bulb', 0, true);

  // Human line with branch
  setTile(solved, 2, 1, 'line', 0);
  setTile(solved, 2, 2, 'line', 0);
  setTile(solved, 2, 3, 't_shape', 0);   // LEFT, RIGHT, DOWN
  setTile(solved, 2, 4, 'line', 0);
  setTile(solved, 2, 5, 'bulb', 0, true);

  // 4th bulb connected from human branch
  setTile(solved, 3, 3, 'corner', 270); // UP & RIGHT
  setTile(solved, 3, 4, 'line', 0);
  setTile(solved, 3, 5, 'bulb', 0, true);

  // Earth line
  setTile(solved, 4, 1, 'line', 0);
  setTile(solved, 4, 2, 'line', 0);
  setTile(solved, 4, 3, 'line', 0);
  setTile(solved, 4, 4, 'line', 0);
  setTile(solved, 4, 5, 'bulb', 0, true);

  return createScrambledLevel(
    82,
    '三生万物',
    '神树之巅 · 三才灵泉天地合德',
    '天地人三灵泉首次并辔而发！三线并进，融通万象。',
    '三生万物！三道清流共铸神木辉煌。',
    solved,
    182
  );
}

// Level 99: 混沌鸿蒙树 (Master Final 99th Level)
function makeLevel99(): { solved: Tile[]; level: LevelConfig } {
  const solved = createEmptyGrid();
  // 3 Sources: (0,0), (2,0), (4,0)
  setTile(solved, 0, 0, 'battery', 0, true);
  setTile(solved, 2, 0, 'battery', 0, true);
  setTile(solved, 4, 0, 'battery', 0, true);

  // 6 Bulbs: (0,5), (1,5), (2,5), (3,5), (4,5), (5,5)
  setTile(solved, 0, 5, 'bulb', 0, true);
  setTile(solved, 1, 5, 'bulb', 0, true);
  setTile(solved, 2, 5, 'bulb', 0, true);
  setTile(solved, 3, 5, 'bulb', 0, true);
  setTile(solved, 4, 5, 'bulb', 0, true);
  setTile(solved, 5, 5, 'bulb', 0, true);

  // Heaven network -> (0,5) and (1,5)
  setTile(solved, 0, 1, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 0, 2, 't_shape', 0);  // LEFT, RIGHT, DOWN
  setTile(solved, 0, 3, 'diode', 0);
  setTile(solved, 0, 4, 'line', 0);

  setTile(solved, 1, 2, 'corner', 270); // UP & RIGHT
  setTile(solved, 1, 3, 'line', 0);
  setTile(solved, 1, 4, 'line', 0);

  // Human network -> (2,5) and (3,5)
  setTile(solved, 2, 1, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 2, 2, 't_shape', 0);  // LEFT, RIGHT, DOWN
  setTile(solved, 2, 3, 'diode', 0);
  setTile(solved, 2, 4, 'line', 0);

  setTile(solved, 3, 2, 'corner', 270); // UP & RIGHT
  setTile(solved, 3, 3, 'line', 0);
  setTile(solved, 3, 4, 'line', 0);

  // Earth network -> (4,5) and (5,5)
  setTile(solved, 4, 1, 'switch', 0, false, { switchClosed: true });
  setTile(solved, 4, 2, 't_shape', 0);  // LEFT, RIGHT, DOWN
  setTile(solved, 4, 3, 'diode', 0);
  setTile(solved, 4, 4, 'line', 0);

  setTile(solved, 5, 2, 'corner', 270); // UP & RIGHT
  setTile(solved, 5, 3, 'line', 0);
  setTile(solved, 5, 4, 'line', 0);

  return createScrambledLevel(
    99,
    '混沌鸿蒙',
    '神树之巅 · 万木生辉终极大圆满',
    '终极九十九重天境！统合三源、全开关与二极管，唤醒混沌鸿蒙树！',
    '🎉 天地同庆！通天世界树完全复苏，九十九重生灵秘境重现人间！',
    solved,
    199
  );
}

/* ================= PROCEDURAL SOLVER & GENERATOR FOR ALL REMAINING LEVELS ================= */

interface ChapterConfig {
  range: [number, number];
  chapterName: string;
  minSources: number;
  maxSources: number;
  minBulbs: number;
  maxBulbs: number;
  allowSwitch: boolean;
  allowDiode: boolean;
  allowCross: boolean;
  lockedObstacles: number;
  titles: string[];
}

const CHAPTER_RULES: ChapterConfig[] = [
  {
    range: [7, 19],
    chapterName: '地脉之根',
    minSources: 1,
    maxSources: 1,
    minBulbs: 2,
    maxBulbs: 3,
    allowSwitch: false,
    allowDiode: false,
    allowCross: true,
    lockedObstacles: 2,
    titles: [
      '暗礁迷径', '回龙引泉', '双十字错', '寒水回澜', '歧路亡羊',
      '灵泉对角', '三叠飞瀑', '双环扣月', '千丝织锦', '狭谷穿针',
      '四明分辉', '迷津藏玉', '九曲黄龙',
    ],
  },
  {
    range: [21, 39],
    chapterName: '巨木之干',
    minSources: 1,
    maxSources: 2,
    minBulbs: 2,
    maxBulbs: 4,
    allowSwitch: true,
    allowDiode: false,
    allowCross: true,
    lockedObstacles: 3,
    titles: [
      '灵闸初动', '分时通渠', '双闸并峙', '断脉之桥', '双源初现',
      '水脉交融', '闸门虚设', '穿干引泉', '经纬双闸', '碧落青苍',
      '串联双闸', '并联分闸', '双源汇流', '树皮迷宫', '闸刀矩阵',
      '双源折射', '断流求生', '灵髓奔涌', '九关锁脉',
    ],
  },
  {
    range: [41, 59],
    chapterName: '苍翠繁枝',
    minSources: 1,
    maxSources: 2,
    minBulbs: 3,
    maxBulbs: 4,
    allowSwitch: false,
    allowDiode: true,
    allowCross: true,
    lockedObstacles: 3,
    titles: [
      '顺水推舟', '逆流止步', '枝头分向', '单向环流', '双向并轨',
      '繁枝分桠', '二极立交', '逆水行舟', '双源对流', '琼枝玉叶',
      '极性门禁', '错位三极', '繁叶蔽日', '顺流直下', '双极互锁',
      '枝蔓缠绕', '逆流陷阱', '四方聚枝', '青藤绕柱',
    ],
  },
  {
    range: [61, 79],
    chapterName: '云海天桥',
    minSources: 2,
    maxSources: 2,
    minBulbs: 3,
    maxBulbs: 5,
    allowSwitch: true,
    allowDiode: true,
    allowCross: true,
    lockedObstacles: 4,
    titles: [
      '云桥初架', '雾锁天河', '云中双瀑', '风雷变幻', '天河倒泻',
      '云岫穿行', '双源云渡', '闸控双极', '虚空栈道', '凌霄七彩',
      '风息水静', '梯级云台', '回光返照', '天堑飞渡', '双源四象',
      '云涡暗流', '断崖飞瀑', '灵河织锦', '星罗棋布',
    ],
  },
  {
    range: [81, 98],
    chapterName: '神树之巅',
    minSources: 2,
    maxSources: 3,
    minBulbs: 4,
    maxBulbs: 5,
    allowSwitch: true,
    allowDiode: true,
    allowCross: true,
    lockedObstacles: 4,
    titles: [
      '太古乾坤', '三生万物', '极光玄枢', '天地逆旅', '八卦玄阵',
      '九曜贯日', '万化归一', '混沌初开', '虚实相生', '玄天青莲',
      '三源并辔', '四面楚歌', '星河倒卷', '太素神音', '生死双门',
      '大衍之数', '无极太极', '通天神树',
    ],
  },
];

// Algorithmic Solvable Level Generator
function generateAlgorithmLevel(
  levelId: number,
  config: ChapterConfig
): { solved: Tile[]; level: LevelConfig } {
  const rand = makePrng(levelId * 7919 + 888);
  const rows = 6;
  const cols = 6;

  const titleIdx = (levelId - config.range[0]) % config.titles.length;
  const title = config.titles[titleIdx];

  let attempt = 0;
  while (attempt < 500) {
    attempt++;
    const inTree = new Set<string>();
    const connections = new Map<string, number>();

    const getMask = (r: number, c: number) => connections.get(`${r},${c}`) || 0;
    const addEdge = (r1: number, c1: number, r2: number, c2: number, d1: Direction, d2: Direction) => {
      connections.set(`${r1},${c1}`, getMask(r1, c1) | d1);
      connections.set(`${r2},${c2}`, getMask(r2, c2) | d2);
    };

    // Determine sources count
    const numSources = config.minSources + Math.floor(rand() * (config.maxSources - config.minSources + 1));
    const sourceRows: number[] = [];
    if (numSources === 1) {
      sourceRows.push(1 + Math.floor(rand() * 4));
    } else if (numSources === 2) {
      sourceRows.push(0 + Math.floor(rand() * 2));
      sourceRows.push(4 + Math.floor(rand() * 2));
    } else {
      sourceRows.push(0);
      sourceRows.push(2 + Math.floor(rand() * 2));
      sourceRows.push(5);
    }

    for (const sr of sourceRows) {
      inTree.add(`${sr},0`);
      inTree.add(`${sr},1`);
      addEdge(sr, 0, sr, 1, Direction.RIGHT, Direction.LEFT);
    }

    // Determine target bulbs
    const numBulbs = config.minBulbs + Math.floor(rand() * (config.maxBulbs - config.minBulbs + 1));
    const bulbCandidates: [number, number][] = [];
    for (let r = 0; r < rows; r++) {
      bulbCandidates.push([r, cols - 1]);
    }
    // Shuffle
    for (let i = bulbCandidates.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [bulbCandidates[i], bulbCandidates[j]] = [bulbCandidates[j], bulbCandidates[i]];
    }
    const bulbPositions = bulbCandidates.slice(0, numBulbs);

    // BFS Connect each bulb to the nearest node in tree
    let success = true;
    for (const [tr, tc] of bulbPositions) {
      const otherBulbs = new Set(
        bulbPositions.filter(([r, c]) => r !== tr || c !== tc).map(([r, c]) => `${r},${c}`)
      );

      const queue: string[] = [];
      const parent = new Map<string, { prev: string; outD: Direction; inD: Direction; cr: number; cc: number; nr: number; nc: number }>();
      const visited = new Set<string>();

      for (const nodeKey of inTree) {
        if (!otherBulbs.has(nodeKey)) {
          queue.push(nodeKey);
          visited.add(nodeKey);
        }
      }

      let reached = false;
      const targetKey = `${tr},${tc}`;

      while (queue.length > 0) {
        const cur = queue.shift()!;
        if (cur === targetKey) {
          reached = true;
          break;
        }

        const [cr, cc] = cur.split(',').map(Number);
        const dirs: [number, number, Direction, Direction][] = [
          [-1, 0, Direction.UP, Direction.DOWN],
          [1, 0, Direction.DOWN, Direction.UP],
          [0, -1, Direction.LEFT, Direction.RIGHT],
          [0, 1, Direction.RIGHT, Direction.LEFT],
        ];
        // Shuffle
        for (let i = dirs.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
        }

        for (const [dr, dc, outD, inD] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          const nKey = `${nr},${nc}`;
          if (visited.has(nKey) || otherBulbs.has(nKey)) continue;

          visited.add(nKey);
          parent.set(nKey, { prev: cur, outD, inD, cr, cc, nr, nc });
          queue.push(nKey);
        }
      }

      if (!reached) {
        success = false;
        break;
      }

      let curr = targetKey;
      while (parent.has(curr)) {
        const edge = parent.get(curr)!;
        addEdge(edge.cr, edge.cc, edge.nr, edge.nc, edge.outD, edge.inD);
        inTree.add(curr);
        curr = edge.prev;
      }
    }

    if (!success) continue;

    // Convert connections into Tiles
    const solvedTiles: Tile[] = [];
    const straightCoords: { r: number; c: number; rot: 0 | 90 }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const mask = getMask(r, c);
        const id = `t-${r}-${c}`;

        const isSource = sourceRows.some(sr => sr === r && c === 0);
        if (isSource) {
          solvedTiles.push({
            id,
            row: r,
            col: c,
            type: 'battery',
            rotation: 0,
            basePorts: Direction.RIGHT,
            locked: true,
          });
          continue;
        }

        const isBulb = bulbPositions.some(([br, bc]) => br === r && bc === c);
        if (isBulb) {
          solvedTiles.push({
            id,
            row: r,
            col: c,
            type: 'bulb',
            rotation: 0,
            basePorts: Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
            locked: true,
          });
          continue;
        }

        if (mask === 0) {
          // Decoy or empty
          if (rand() < 0.35) {
            // Decoy pipe
            const decoyType: TileType = rand() < 0.5 ? 'line' : 'corner';
            solvedTiles.push({
              id,
              row: r,
              col: c,
              type: decoyType,
              rotation: (Math.floor(rand() * 4) * 90) as 0 | 90 | 180 | 270,
              basePorts: getDefaultBasePorts(decoyType),
            });
          } else {
            solvedTiles.push({
              id,
              row: r,
              col: c,
              type: 'empty',
              rotation: 0,
              basePorts: Direction.NONE,
            });
          }
          continue;
        }

        const hasU = Boolean(mask & Direction.UP);
        const hasR = Boolean(mask & Direction.RIGHT);
        const hasD = Boolean(mask & Direction.DOWN);
        const hasL = Boolean(mask & Direction.LEFT);
        const count = (hasU ? 1 : 0) + (hasR ? 1 : 0) + (hasD ? 1 : 0) + (hasL ? 1 : 0);

        let type: TileType = 'line';
        let basePorts = getDefaultBasePorts('line');
        let solvedRot: 0 | 90 | 180 | 270 = 0;

        if (count >= 4) {
          type = 'cross';
          basePorts = getDefaultBasePorts('cross');
          solvedRot = 0;
        } else if (count === 3) {
          type = 't_shape';
          basePorts = getDefaultBasePorts('t_shape');
          for (const rot of [0, 90, 180, 270] as const) {
            if (rotatePorts(basePorts, rot) === mask) {
              solvedRot = rot;
              break;
            }
          }
        } else if (count === 2) {
          if ((hasL && hasR) || (hasU && hasD)) {
            type = 'line';
            basePorts = getDefaultBasePorts('line');
            solvedRot = (hasL && hasR) ? 0 : 90;
            if (!sourceRows.some(sr => sr === r && c === 1)) {
              straightCoords.push({ r, c, rot: solvedRot });
            }
          } else {
            type = 'corner';
            basePorts = getDefaultBasePorts('corner');
            for (const rot of [0, 90, 180, 270] as const) {
              if (rotatePorts(basePorts, rot) === mask) {
                solvedRot = rot;
                break;
              }
            }
          }
        } else {
          type = 'line';
          basePorts = getDefaultBasePorts('line');
          solvedRot = (hasL || hasR) ? 0 : 90;
        }

        solvedTiles.push({
          id,
          row: r,
          col: c,
          type,
          rotation: solvedRot,
          basePorts,
          locked: false,
        });
      }
    }

    // Insert Switches if configured
    if (config.allowSwitch && straightCoords.length > 0) {
      const pick = straightCoords.pop()!;
      const idx = solvedTiles.findIndex(t => t.row === pick.r && t.col === pick.c);
      if (idx !== -1) {
        solvedTiles[idx] = {
          ...solvedTiles[idx],
          type: 'switch',
          basePorts: getDefaultBasePorts('switch'),
          rotation: pick.rot,
          switchClosed: true,
        };
      }
    }

    // Insert Diodes if configured
    if (config.allowDiode && straightCoords.length > 0) {
      const pick = straightCoords.pop()!;
      const idx = solvedTiles.findIndex(t => t.row === pick.r && t.col === pick.c);
      if (idx !== -1) {
        solvedTiles[idx] = {
          ...solvedTiles[idx],
          type: 'diode',
          basePorts: getDefaultBasePorts('diode'),
          rotation: pick.rot,
        };
      }
    }

    // Lock obstacles if configured
    let lockedAdded = 0;
    for (const t of solvedTiles) {
      if (lockedAdded >= config.lockedObstacles) break;
      if (t.type === 'line' && !sourceRows.some(sr => sr === t.row && t.col <= 1)) {
        t.locked = true;
        lockedAdded++;
      }
    }

    // SIMULATION CHECK
    const sim = simulateCircuit(solvedTiles, rows, cols);
    if (!sim.isAllLit || sim.litCount !== bulbPositions.length) {
      continue;
    }

    const subtitle = `${config.chapterName} · 点亮 ${bulbPositions.length} 朵枝头灵花`;
    const hintText = config.allowDiode
      ? '单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。'
      : config.allowSwitch
      ? '点击开关可闭合断开的水道，合理调度通水时序。'
      : '规划各条支路水脉，避开断路与死管。';
    const winText = `第 ${levelId} 关已通关！甘霖已顺利滋润仙蕾。`;

    return createScrambledLevel(
      levelId,
      title,
      subtitle,
      hintText,
      winText,
      solvedTiles,
      levelId * 37
    );
  }

  throw new Error(`Failed to generate level ${levelId} after 500 attempts`);
}

// Master Level Generator
export function generateAll99Levels(): LevelConfig[] {
  console.log('Generating & Validating ALL 99 Redesigned Sacred Tree Levels...');
  const result: LevelConfig[] = [];

  // Handcrafted Anchor Levels
  const handcraftedMap: Record<number, () => { solved: Tile[]; level: LevelConfig }> = {
    1: makeLevel1,
    2: makeLevel2,
    3: makeLevel3,
    4: makeLevel4,
    5: makeLevel5,
    6: makeLevel6,
    10: makeLevel10,
    20: makeLevel20,
    25: makeLevel25,
    40: makeLevel40,
    41: makeLevel41,
    60: makeLevel60,
    80: makeLevel80,
    82: makeLevel82,
    99: makeLevel99,
  };

  for (let id = 1; id <= 99; id++) {
    let levelData: { solved: Tile[]; level: LevelConfig };

    if (handcraftedMap[id]) {
      levelData = handcraftedMap[id]();
    } else {
      const chapterCfg = CHAPTER_RULES.find(c => id >= c.range[0] && id <= c.range[1])!;
      levelData = generateAlgorithmLevel(id, chapterCfg);
    }

    // Strictly verify solved layout
    const simSolved = simulateCircuit(levelData.solved, 6, 6);
    if (!simSolved.isAllLit) {
      throw new Error(`Level ${id} (${levelData.level.title}) Solved Check FAILED! lit: ${simSolved.litCount}/${simSolved.totalBulbs}`);
    }

    // Verify initial layout does NOT auto-solve
    const simInitial = simulateCircuit(levelData.level.tiles, 6, 6);
    if (simInitial.isAllLit) {
      throw new Error(`Level ${id} (${levelData.level.title}) Initial Layout is ALREADY SOLVED! Must be scrambled.`);
    }

    console.log(`✓ Level ${levelData.level.code} [${levelData.level.title}] - PASSED (Goals: ${simSolved.totalBulbs}, MaxSteps: ${levelData.level.maxSteps})`);
    result.push(levelData.level);
  }

  console.log('\n🎉 ALL 99 LEVELS SUCCESSFULLY REBUILT AND VERIFIED 100% SOLVABLE!\n');
  return result;
}

// Run directly
const levels = generateAll99Levels();
const fileContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelConfig } from '../types/game';

export const DEFAULT_LEVELS: LevelConfig[] = ${JSON.stringify(levels, null, 2)};
`;

const targetPath = path.resolve(process.cwd(), 'src/data/defaultLevels.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log(`Successfully written 99 levels to ${targetPath}`);
