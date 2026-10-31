import { DEFAULT_LEVELS } from '../src/data/defaultLevels';

const switchLevels = [];
for (const lvl of DEFAULT_LEVELS) {
  const sws = lvl.tiles.filter(t => t.type === 'switch');
  if (sws.length > 0) {
    switchLevels.push({
      id: lvl.id,
      title: lvl.title,
      switches: sws.map(s => ({
        row: s.row,
        col: s.col,
        rotation: s.rotation,
        locked: s.locked,
        basePorts: s.basePorts,
        switchClosed: s.switchClosed
      }))
    });
  }
}
console.log(`共发现 ${switchLevels.length} 个关卡包含开关 (switch):`);
for (const item of switchLevels) {
  console.log(`- 关卡 #${item.id} [${item.title}]:`, item.switches);
}
