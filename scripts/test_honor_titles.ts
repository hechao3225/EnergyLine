import assert from "node:assert/strict";
import {
  HONOR_TITLES,
  chooseAutoEquipHonorTitle,
  getHonorTitle,
  getHonorTitleForAchievement,
  getNewHonorTitles,
  resolveEquippedHonorTitle,
} from "../src/data/honorTitles";

let passed = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`通过：${name}`);
  passed += 1;
}

test("首版称号目录包含 12 个唯一条目", () => {
  assert.equal(HONOR_TITLES.length, 12);
  assert.equal(new Set(HONOR_TITLES.map((title) => title.id)).size, 12);
  assert.equal(
    new Set(HONOR_TITLES.map((title) => title.achievementId)).size,
    12,
  );
});

test("每个称号都能按 ID 和成就反查", () => {
  for (const title of HONOR_TITLES) {
    assert.equal(getHonorTitle(title.id)?.id, title.id);
    assert.equal(
      getHonorTitleForAchievement(title.achievementId)?.id,
      title.id,
    );
  }
  assert.equal(getHonorTitle("missing-title"), null);
  assert.equal(getHonorTitleForAchievement("missing-achievement"), null);
});

test("只把本次新解锁且有称号的成就转换成称号", () => {
  const titles = getNewHonorTitles([
    { id: "first_spark" },
    { id: "ten_steps_clear" },
  ]);
  assert.deepEqual(
    titles.map((title) => title.id),
    ["first_light"],
  );
});

test("自动佩戴按 order 选择本次最高称号", () => {
  const titles = getNewHonorTitles([
    { id: "levels_30" },
    { id: "chapter_garden_complete" },
  ]);
  assert.equal(chooseAutoEquipHonorTitle(titles)?.id, "garden_watcher");
});

test("佩戴中的称号必须真实存在且对应成就是已解锁状态", () => {
  assert.equal(
    resolveEquippedHonorTitle("first_light", {
      first_spark: 1,
    })?.id,
    "first_light",
  );
  assert.equal(resolveEquippedHonorTitle("first_light", {}), null);
  assert.equal(
    resolveEquippedHonorTitle("missing-title", { first_spark: 1 }),
    null,
  );
});

console.log(`称号测试通过：${passed} 项`);
