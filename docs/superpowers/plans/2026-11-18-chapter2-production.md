# 第 2 章 20 关生产实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 按 v0.4 排期完成 L21–L40，建立齿轮教学、环面与轴回声、取舍块、呼吸关和齿轮+取舍 boss。

**架构：** 复用第 1 章生成器与现有齿轮/环面/取舍拓扑；新增第 2 章目录和生成器，运行时用新章节覆盖 L21–L40，L41–L99 不变。

**技术栈：** React 19、TypeScript、Vite、tsx、Playwright、现有统一规则求解器。

---

## 文件结构

- 创建：`src/data/chapter2Schedule.ts`
- 创建：`src/data/chapter2Levels.ts`
- 创建：`scripts/chapter2-gen.ts`
- 创建：`scripts/test_chapter2.ts`
- 创建：`scripts/audit-chapter2.ts`
- 创建：`scripts/chapter2-playthrough.ts`
- 修改：`src/data/defaultLevels.ts`
- 修改：`src/content/levels.ts`
- 修改：`scripts/fixtures/level-layout-hash.json`
- 修改：`package.json`

### 任务 1：声明规格与失败测试

```ts
row(21, "gear", ["gear"], "相变", "教", 13)
row(26, "wrap", ["wrap"], "定位", "回声", 14)
row(29, "goal", ["goal"], "取舍", "教", 14)
row(40, "gear", ["gear", "goal"], "取舍", "boss", 19)
```

运行：`node_modules/.bin/tsx scripts/test_chapter2.ts`

预期：当前 L21 没有齿轮轴组，FAIL。

### 任务 2：生成齿轮与轴回声

```ts
generateAxisLevel({
  cells: 18,
  bulbs: 3,
  groups: [2],
  par: [13, 13],
  seed: 18,
  gear: true,
});
```

- L21：单组 2 齿，par 13。
- L22：两组独立齿轮，par 13。
- L24：三齿组，par 15。
- L25：齿轮主路加能量闸，par 15。
- L27/L32/L35：双齿轮组峰，par 不超过 16。
- L28/L38：纯联动轴回声，par 14。

### 任务 3：生成基础与多源呼吸

```ts
const layout = generateAlgorithmLayout(id, {
  minSources: 2,
  maxSources: 2,
  allowSwitch: false,
  allowDiode: false,
});
```

L23、L31、L39 使用无闸无阀的多源盘面；L34 使用十字与诱饵；L36 使用闸阀组合。

### 任务 4：生成取舍与组合

- L26：T3 下调到 par 14。
- L29：旧取舍蓝图重调为 par 15。
- L30、L33：多源取舍重调为 par 14。
- L37：齿轮 + 取舍，par 15。
- L40：旧五灯取舍蓝图叠加一组齿轮，par 18；章内非 boss 最高 16，满足 boss +2。

### 任务 5：接入第 2 章

```ts
export const DEFAULT_LEVELS = LEGACY_LEVELS.map((level) => {
  if (level.id <= 20) return CHAPTER1_LEVELS[level.id - 1];
  if (level.id <= 40) return CHAPTER2_LEVELS[level.id - 21];
  return level;
});
```

### 任务 6：文案、曲线与提示

- 更新 L21–L40 标题和提示。
- 提示必须提到齿轮、闸、阀、取舍和多源等实际机制。
- 规则关提示 100% 可执行。

### 任务 7：真实 UI 回放

```ts
for (const level of CHAPTER2_LEVELS) {
  await openStoryLevel(page, BASE_URL, level.id);
  for (const step of solveRuleLevel(level)!.orderedSteps) await clickStep(page, step);
  await page.locator(".park-victory").waitFor();
}
```

### 任务 8：提交

```bash
git add src/data/chapter2Schedule.ts src/data/chapter2Levels.ts
git add scripts/chapter2-gen.ts scripts/test_chapter2.ts scripts/audit-chapter2.ts
git add src/content/levels.ts src/data/defaultLevels.ts scripts/fixtures/level-layout-hash.json
git commit -m "feat: 完成第 2 章 20 关玩法重排"
```
