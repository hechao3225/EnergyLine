import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { simulateCircuit, getDefaultBasePorts, rotatePorts } from '../src/utils/circuit';
import { Direction, Tile } from '../src/types/game';

// 检查每个 switch 周围的邻居是否存在可能连通的瓦片
for (const lvl of DEFAULT_LEVELS) {
  const sws = lvl.tiles.filter(t => t.type === 'switch');
  if (sws.length === 0) continue;

  for (const sw of sws) {
    // switch 在当前 rotation 下的 ports
    const currentPorts = rotatePorts(sw.basePorts, sw.rotation);
    // 检查是否有与 currentPorts 匹配的非 empty 邻居
    // currentPorts 为 10 时，为 LEFT (8) | RIGHT (2)
    // currentPorts 为 5 时，为 UP (1) | DOWN (4)
    const isHorizontal = Boolean(currentPorts & (Direction.LEFT | Direction.RIGHT));
    const isVertical = Boolean(currentPorts & (Direction.UP | Direction.DOWN));

    const left = lvl.tiles.find(t => t.row === sw.row && t.col === sw.col - 1);
    const right = lvl.tiles.find(t => t.row === sw.row && t.col === sw.col + 1);
    const up = lvl.tiles.find(t => t.row === sw.row - 1 && t.col === sw.col);
    const down = lvl.tiles.find(t => t.row === sw.row + 1 && t.col === sw.col);

    const hasHorizontalNeighbors = (left && left.type !== 'empty') || (right && right.type !== 'empty');
    const hasVerticalNeighbors = (up && up.type !== 'empty') || (down && down.type !== 'empty');

    if (isHorizontal && !hasHorizontalNeighbors) {
      console.log(`[DEADLOCK BUG] 关卡 #${lvl.id} [${lvl.title}] 的开关在 (${sw.row}, ${sw.col}) 处于水平朝向，但左右全为空白，上下却有邻居(up:${up?.type}, down:${down?.type})！由于开关无法旋转，该关必死局！`);
    } else if (isVertical && !hasVerticalNeighbors) {
      console.log(`[DEADLOCK BUG] 关卡 #${lvl.id} [${lvl.title}] 的开关在 (${sw.row}, ${sw.col}) 处于垂直朝向，但上下全为空白，左右却有邻居(left:${left?.type}, right:${right?.type})！由于开关无法旋转，该关必死局！`);
    }
  }
}
