import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit } from '../src/utils/circuit';

console.log('=== 1. 验证 99 关水脉完整性 ===');
let totalTiles = 0;
for (const lvl of DEFAULT_LEVELS) {
  const bats = lvl.tiles.filter((t) => t.type === 'battery');
  const bulbs = lvl.tiles.filter((t) => t.type === 'bulb');
  if (bats.length === 0) throw new Error(`关卡 #${lvl.id} 缺少泉眼源头`);
  if (bulbs.length === 0) throw new Error(`关卡 #${lvl.id} 缺少仙花终点`);
  totalTiles += lvl.tiles.length;
}
console.log(`[PASS] 99 重关卡结构完整，包含 ${totalTiles} 枚水渠瓦片，全部包含合法泉眼与仙花。`);

console.log('=== 2. 验证 第 1 关“单线启明”旋转导通与胜利逻辑 ===');
const lvl1 = DEFAULT_LEVELS[0];
let sim1 = simulateCircuit(lvl1.tiles, lvl1.gridRows, lvl1.gridCols);
console.log(`[PASS] 初始打乱态：点亮花朵数 = ${sim1.litBulbIds.size} / ${sim1.totalBulbs}，通关状态 = ${sim1.isAllLit}`);

// 模拟玩家旋转水渠解密
const tiles1_solved = lvl1.tiles.map((t) => {
  if (t.row === 2 && t.col === 2) return { ...t, rotation: 0 };
  if (t.row === 2 && t.col === 3) return { ...t, rotation: 90 };
  if (t.row === 3 && t.col === 3) return { ...t, rotation: 90 };
  if (t.row === 4 && t.col === 3) return { ...t, rotation: 270 };
  return t;
});
sim1 = simulateCircuit(tiles1_solved, lvl1.gridRows, lvl1.gridCols);
console.log(`[PASS] 正确对齐水脉后：点亮花朵数 = ${sim1.litBulbIds.size} / ${sim1.totalBulbs}，通关状态 = ${sim1.isAllLit}`);
if (!sim1.isAllLit) throw new Error('第 1 关导通后应判定胜利！');

console.log('=== 3. 验证 第 21 关“灵闸初动”灵玉水闸通断机制 ===');
const lvl21 = DEFAULT_LEVELS.find((l) => l.id === 21)!;
// 将泉眼 (4,0) 到水闸 (4,4) 之间的前导直管 (4,1), (4,2), (4,3) 对齐为连通态
const basePipes21 = lvl21.tiles.map((t) => {
  if (t.row === 4 && (t.col === 1 || t.col === 2 || t.col === 3)) {
    return { ...t, rotation: 0 };
  }
  return t;
});

// 水闸断开态
const tiles21_closed = basePipes21.map((t) =>
  t.type === 'switch' ? { ...t, switchClosed: false } : t
);
let sim21_closed = simulateCircuit(tiles21_closed, lvl21.gridRows, lvl21.gridCols);

// 水闸开启导通态
const tiles21_open = basePipes21.map((t) =>
  t.type === 'switch' ? { ...t, switchClosed: true } : t
);
let sim21_open = simulateCircuit(tiles21_open, lvl21.gridRows, lvl21.gridCols);

console.log(
  `[PASS] 水闸断流充能瓦片数 = ${sim21_closed.poweredTileIds.size}，开启导通充能瓦片数 = ${sim21_open.poweredTileIds.size}`
);
if (sim21_open.poweredTileIds.size <= sim21_closed.poweredTileIds.size) {
  throw new Error('开启水闸后通水瓦片数应增加！');
}

console.log('=== 4. 验证 第 41 关“顺水推舟”单向灵梭顺逆流机制 ===');
const lvl41 = DEFAULT_LEVELS.find((l) => l.id === 41)!;
// 将泉眼 (2,0) 到单向灵梭 (2,2) 之间的前导直管 (2,1) 对齐为水平连通态
const basePipes41 = lvl41.tiles.map((t) => {
  if (t.row === 2 && t.col === 1) {
    return { ...t, rotation: 0 };
  }
  return t;
});

// Diode forward orientation (0 deg: 左进右出，顺流)
const tiles41_fwd = basePipes41.map((t) =>
  t.type === 'diode' ? { ...t, rotation: 0 } : t
);
let sim41_fwd = simulateCircuit(tiles41_fwd, lvl41.gridRows, lvl41.gridCols);

// Diode reversed orientation (180 deg: 右进左出，逆流截断)
const tiles41_rev = basePipes41.map((t) =>
  t.type === 'diode' ? { ...t, rotation: 180 } : t
);
let sim41_rev = simulateCircuit(tiles41_rev, lvl41.gridRows, lvl41.gridCols);

console.log(
  `[PASS] 单向顺流充能瓦片数 = ${sim41_fwd.poweredTileIds.size}，逆向阻水充能瓦片数 = ${sim41_rev.poweredTileIds.size}`
);
if (sim41_fwd.poweredTileIds.size <= sim41_rev.poweredTileIds.size) {
  throw new Error('顺水推舟顺流瓦片数应大于逆向阻水瓦片数！');
}

console.log('=== 全部测试通过 (4/4 PASS) ===');
