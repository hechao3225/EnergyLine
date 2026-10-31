import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit } from '../src/utils/circuit';

console.log('=== 验证第 24 关在开关支持旋转后的全流程解密 ===');

const lvl24 = DEFAULT_LEVELS.find((l) => l.id === 24)!;

// 1. 初始打乱态
let sim = simulateCircuit(lvl24.tiles, lvl24.gridRows, lvl24.gridCols);
console.log(`初始状态：已点亮花朵 = ${sim.litBulbIds.size} / ${sim.totalBulbs}，通关 = ${sim.isAllLit}`);

// 2. 模拟解密旋转：
// (3, 1) 直管转成水平 (0°)
// (2, 4) T型管转成 (0°: LEFT, RIGHT, DOWN -> 向上需要 90°/180°/270°，看 ports)
// (1, 4) 弯管转成向下与向右 (0°: DOWN & RIGHT)
// (4, 4) 开关转成垂直 (90° 或 270°) 并开启 (switchClosed: true)
// (5, 4) 弯管转成向上与向右 (270°: UP & RIGHT)

const solvedTiles = lvl24.tiles.map((t) => {
  if (t.row === 3 && t.col === 1) return { ...t, rotation: 0 };
  if (t.row === 2 && t.col === 4) return { ...t, rotation: 270 }; // UP, DOWN, RIGHT
  if (t.row === 1 && t.col === 4) return { ...t, rotation: 0 };   // DOWN & RIGHT
  if (t.row === 4 && t.col === 4) return { ...t, rotation: 90, switchClosed: true }; // 垂直通水水闸
  if (t.row === 5 && t.col === 4) return { ...t, rotation: 270 }; // UP & RIGHT
  return t;
});

sim = simulateCircuit(solvedTiles, lvl24.gridRows, lvl24.gridCols);
console.log(`解密后状态：已点亮花朵 = ${sim.litBulbIds.size} / ${sim.totalBulbs}，通关 = ${sim.isAllLit}`);

if (!sim.isAllLit) {
  throw new Error('第 24 关在开关旋转并导通后未能通过！请检查端口朝向');
}

console.log('✅ 验证成功：第 24 关在开关可旋转并开启水闸后，4 朵仙花全数点亮，完美通关！');
