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
assert.equal(chainActivated.steps.length, 1, "A 转盘不应自动启动 B 转盘");
assert.deepEqual(
  chainActivated.activatedIds,
  [chainRotors[0].id],
  "玩家只接通 A 时，只应启动 A",
);

const chainASwitch = chainActivated.tiles.find(
  (tile) => tile.id === "lab-3-1",
);
assert(chainASwitch, "R2 左侧能量闸消失");
assert.equal(chainASwitch.switchClosed, false, "左侧能量闸应保持断开");

const chainAfterA = simulateCircuit(
  chainActivated.tiles,
  chain.gridRows,
  chain.gridCols,
  chain.rules,
);
assert.equal(chainAfterA.litCount, 0, "A 启动后仍需玩家扳闸");

const chainAfterASwitch = chainActivated.tiles.map((tile) =>
  tile.id === chainASwitch.id
    ? { ...tile, switchClosed: true }
    : tile,
);
const chainAAfterToggle = simulateCircuit(
  chainAfterASwitch,
  chain.gridRows,
  chain.gridCols,
  chain.rules,
);
assert.equal(chainAAfterToggle.litCount, 1, "左侧路线应点亮第一处设施");

const chainBFeeder = chain.tiles.find(
  (tile) => tile.row === 5 && tile.col === 3,
);
assert(chainBFeeder, "R2 缺少右侧转盘供能直管");
const chainBTap = chainAfterASwitch.map((tile) =>
  tile.id === chainBFeeder.id
    ? { ...tile, rotation: tile.rotation + 90 }
    : tile,
);
const chainBActivated = activatePoweredRotors(chain, chainBTap);
assert.equal(chainBActivated.steps.length, 1, "B 转盘应独立启动");
assert.deepEqual(
  chainBActivated.activatedIds,
  [chainRotors[1].id],
  "B 转盘启动顺序应独立",
);

const chainBSwitch = chainBActivated.tiles.find(
  (tile) => tile.id === "lab-2-4",
);
assert(chainBSwitch, "R2 右侧能量闸消失");
assert.equal(chainBSwitch.rotation, 0, "右侧能量闸需要玩家先转向");
assert.equal(chainBSwitch.switchClosed, false, "右侧能量闸应保持断开");

const chainBSwitchAligned = chainBActivated.tiles.map((tile) =>
  tile.id === chainBSwitch.id
    ? { ...tile, rotation: tile.rotation + 90, switchClosed: true }
    : tile,
);
const chainFinal = simulateCircuit(
  chainBSwitchAligned,
  chain.gridRows,
  chain.gridCols,
  chain.rules,
);
assert.equal(chainFinal.isAllLit, true, "两条独立路线完成后应点亮全部设施");

console.log("R2 双转盘：左右独立启动、转向与扳闸共五步均通过");
