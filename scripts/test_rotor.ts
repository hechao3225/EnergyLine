import assert from "node:assert/strict";
import { LAB_LEVELS } from "../src/data/labLevels";
import { simulateCircuit } from "../src/utils/circuit";
import { activatePoweredRotors } from "../src/utils/rotor";

const level = LAB_LEVELS.find((candidate) => candidate.code === "R1");
assert(level, "缺少 R1 动力转盘实验关");

const rotor = level.tiles.find((tile) => tile.type === "rotor");
assert(rotor, "R1 缺少动力转盘");

const initial = simulateCircuit(
  level.tiles,
  level.gridRows,
  level.gridCols,
  level.rules,
);
assert.equal(initial.litCount, 0, "R1 开局不应白送设施");
assert.equal(initial.isAllLit, false, "R1 开局不能已通关");
assert.equal(rotor.rotorActivated, undefined, "R1 转盘开局应为待启动");

const feeder = level.tiles.find((tile) => tile.row === 2 && tile.col === 1);
assert(feeder, "R1 缺少左侧供能直管");
const firstTap = level.tiles.map((tile) =>
  tile.id === feeder.id ? { ...tile, rotation: tile.rotation + 90 } : tile,
);
const activated = activatePoweredRotors(level, firstTap);
assert.deepEqual(activated.activatedIds, [rotor.id], "首次通电应启动转盘");

const activatedRotor = activated.tiles.find((tile) => tile.id === rotor.id);
assert.equal(activatedRotor?.rotorActivated, true, "转盘启动状态应写入盘面");
const shiftedSwitch = activated.tiles.find((tile) => tile.id === "lab-1-2");
assert(shiftedSwitch, "换位后能量闸消失");
assert.equal(shiftedSwitch.row, 1, "能量闸应换位到第 2 行");
assert.equal(shiftedSwitch.col, 3, "能量闸应换位到第 4 列");
assert.equal(shiftedSwitch.rotation, 90, "环轨换位不应改变管道朝向");

const afterShift = simulateCircuit(
  activated.tiles,
  level.gridRows,
  level.gridCols,
  level.rules,
);
assert.equal(afterShift.litCount, 1, "首次换位后应点亮右侧设施");
assert.equal(afterShift.isAllLit, false, "首次换位后还应缺一盏设施");

const finalTiles = activated.tiles.map((tile) =>
  tile.id === shiftedSwitch.id
    ? { ...tile, switchClosed: !shiftedSwitch.switchClosed }
    : tile,
);
const final = simulateCircuit(
  finalTiles,
  level.gridRows,
  level.gridCols,
  level.rules,
);
assert.equal(final.isAllLit, true, "两指定操作后应点亮全部设施");
assert.equal(final.litCount, 2, "R1 应点亮两盏设施");

const repeated = activatePoweredRotors(level, finalTiles);
assert.deepEqual(repeated.activatedIds, [], "已启动转盘不能重复换位");
assert.deepEqual(
  repeated.tiles.map(({ id, row, col }) => ({ id, row, col })),
  finalTiles.map(({ id, row, col }) => ({ id, row, col })),
  "重复通电不应继续移动环轨",
);

console.log("R1 动力转盘：首次换位、朝向保持、单次启动与两步通关均通过");
