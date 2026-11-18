# 第 4 章 20 关生产实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 完成 L61–L80，把环面提升为章节招牌，加入双色与禁环，并以环面+双色 boss 收束。

**架构：** 导出环面生成器，新增第 4 章目录和数据生成器；双色关复用 L73 与颜色拓扑，禁环关使用无环树解。运行时覆盖 L61–L80，L81–L99 不变。

**技术栈：** React 19、TypeScript、Vite、tsx、Playwright、统一规则求解器。

---

## 文件结构

- 创建：`src/data/chapter4Schedule.ts`
- 创建：`src/data/chapter4Levels.ts`
- 创建：`scripts/chapter4-gen.ts`
- 创建：`scripts/test_chapter4.ts`
- 创建：`scripts/audit-chapter4.ts`
- 创建：`scripts/chapter4-playthrough.ts`
- 修改：`scripts/torus-gen.ts`
- 修改：`src/data/defaultLevels.ts`
- 修改：`src/content/levels.ts`
- 修改：`scripts/fixtures/level-layout-hash.json`
- 修改：`package.json`

### 任务 1：章节目录与失败测试

```ts
row(61, "wrap", ["wrap"], "定位", "教", 17)
row(71, "colors", ["colors"], "分区", "教", 17)
row(76, "noCycle", ["noCycle"], "禁忌", "教", 18)
row(80, "wrap", ["wrap", "colors"], "分区", "boss", 23)
```

运行：`node_modules/.bin/tsx scripts/test_chapter4.ts`

预期：当前 L61 没有 `wrap`，FAIL。

### 任务 2：环面主块

- L61：单缝教学，par 17。
- L62：双缝返回，par 16。
- L63：缝外诱饵，par 17。
- L65：拓扑捷径，par 18。
- L66：双源跨边界，par 18。
- L67：边界能量闸，par 18。
- L68：缝外诱饵峰，par 21。
- L69：四角相邻峰，par 20。
- L78/L79：双缝密度峰，par 20/21。

每个主环面关必须满足 `seamCount > 0`。

### 任务 3：双色与禁环

- L71：从 L73 拓扑重调为 17 步。
- L72：同色分路，18 步。
- L73：环面 + 双色，20 步。
- L74：颜色峰，18 步。
- L76/L77：无环树解，18/19 步。
- L80：环面 + 双色，23 步。

### 任务 4：回声与呼吸

- L64：15 步基础谷。
- L70：17 步焊死回声。
- L75：16 步多源谷。

### 任务 5：组合与内容

```ts
if (level.id <= 60) return CHAPTER3_LEVELS[level.id - 41];
if (level.id <= 80) return CHAPTER4_LEVELS[level.id - 61];
return level;
```

- 更新 L61–L80 标题与提示。
- 重建对应布局指纹。

### 任务 6：审计与真实回放

```ts
assert.ok(level.rules?.wrap);
assert.ok(seamCount > 0);
assert.equal(hintReplaySteps, solution.par);
```

390×844 下逐关点击通关，并检查跨缝幻影线、双色符号和禁环过载反馈。

### 任务 7：提交

```bash
git add src/data/chapter4Schedule.ts src/data/chapter4Levels.ts scripts/chapter4-gen.ts
git add scripts/test_chapter4.ts scripts/audit-chapter4.ts scripts/chapter4-playthrough.ts
git add src/content/levels.ts src/data/defaultLevels.ts scripts/fixtures/level-layout-hash.json
git commit -m "feat: 完成第 4 章 20 关玩法重排"
```
