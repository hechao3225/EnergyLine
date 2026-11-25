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

const chain = LAB_LEVELS.find((candidate) => candidate.code === "R2");
assert(chain, "缺少 R2 双转盘实验关");
const chainRotors = chain.tiles.filter((tile) => tile.type === "rotor");
assert.equal(chainRotors.length, 2, "R2 应包含两台动力转盘");
const chainInitial = simulateCircuit(
  chain.tiles,
  chain.gridRows,
  chain.gridCols,
  chain.rules,
);
assert.equal(chainInitial.litCount, 0, "R2 开局不应白送设施");

const chainFeeder = chain.tiles.find(
  (tile) => tile.row === 0 && tile.col === 2,
);
assert(chainFeeder, "R2 缺少左侧转盘供能直管");
const chainFirstTap = chain.tiles.map((tile) =>
  tile.id === chainFeeder.id
    ? { ...tile, rotation: tile.rotation + 90 }
    : tile,
);
const chainActivated = activatePoweredRotors(chain, chainFirstTap);
assert.equal(chainActivated.steps.length, 2, "A 转盘应连锁启动 B 转盘");
assert.deepEqual(
  chainActivated.activatedIds,
  chainRotors.map((tile) => tile.id),
  "两台转盘应按 A、B 顺序启动",
);

const chainSwitch = chainActivated.tiles.find(
  (tile) => tile.id === "lab-3-2",
);
assert(chainSwitch, "R2 换位后能量闸消失");
assert.equal(chainSwitch.row, 4, "能量闸应换位到第 5 行");
assert.equal(chainSwitch.col, 2, "能量闸应换位到第 3 列");
assert.equal(chainSwitch.switchClosed, false, "换位后的能量闸应保持断开");

const chainAfterShift = simulateCircuit(
  chainActivated.tiles,
  chain.gridRows,
  chain.gridCols,
  chain.rules,
);
assert.equal(chainAfterShift.litCount, 0, "双转盘启动后仍需玩家扳闸");

const chainFinalTiles = chainActivated.tiles.map((tile) =>
  tile.id === chainSwitch.id
    ? { ...tile, switchClosed: true }
    : tile,
);
const chainFinal = simulateCircuit(
  chainFinalTiles,
  chain.gridRows,
  chain.gridCols,
  chain.rules,
);
assert.equal(chainFinal.isAllLit, true, "R2 扳闸后应点亮设施");

console.log("R2 双转盘：A→B 连锁、两次顺序换位与最终扳闸均通过");
