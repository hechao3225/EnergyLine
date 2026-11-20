import assert from "node:assert/strict";
import {
  COSMETIC_ITEMS,
  SUPPLY_ITEMS,
  getCosmeticItem,
  getSupplyItem,
} from "../src/data/shopCatalog";

assert.equal(SUPPLY_ITEMS.length, 4, "补给商品数量应为 4");
assert.equal(COSMETIC_ITEMS.length, 4, "装扮商品数量应为 4");

const supplyIds = SUPPLY_ITEMS.map((item) => item.id);
const cosmeticIds = COSMETIC_ITEMS.map((item) => item.id);
assert.equal(new Set(supplyIds).size, supplyIds.length, "补给商品 ID 应唯一");
assert.equal(new Set(cosmeticIds).size, cosmeticIds.length, "装扮商品 ID 应唯一");
assert.equal(
  new Set([...supplyIds, ...cosmeticIds]).size,
  supplyIds.length + cosmeticIds.length,
  "补给与装扮商品 ID 应跨分类唯一",
);

assert.deepEqual(
  Object.fromEntries(SUPPLY_ITEMS.map((item) => [item.id, item.price])),
  {
    hint: 120,
    lens: 260,
    rewind: 180,
    step: 300,
  },
  "补给商品价格映射不符",
);

assert.deepEqual(
  Object.fromEntries(COSMETIC_ITEMS.map((item) => [item.id, item.unlockAt])),
  {
    "joy-greeting": 5,
    "starlight-outfit": 20,
    "exhibit-display": 10,
    "calm-theme": 40,
  },
  "装扮商品开放数映射不符",
);

assert.equal(getSupplyItem("lens")?.name, "火花透镜", "补给名称查询不符");
assert.equal(getCosmeticItem("calm-theme")?.name, "宁静夜灯", "装扮名称查询不符");

console.log("商店目录验证通过");
