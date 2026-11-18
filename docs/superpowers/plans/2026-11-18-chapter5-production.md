# 第 5 章 19 关生产实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 完成 L81–L99，以组合波峰、7×7 规模变化、取舍终局和三机制 L99 结束主线。

**架构：** 新增第 5 章目录与生成器；复用环面、颜色、齿轮和焊死生成器，补一个 7×7 求解/打散入口。运行时覆盖 L81–L99。

**技术栈：** React 19、TypeScript、Vite、tsx、Playwright、统一规则求解器。

---

## 文件结构（已完成）

- 创建：`src/data/chapter5Schedule.ts`
- 创建：`src/data/chapter5Levels.ts`
- 创建：`scripts/chapter5-gen.ts`
- 创建：`scripts/test_chapter5.ts`
- 创建：`scripts/audit-chapter5.ts`
- 创建：`scripts/chapter5-playthrough.ts`
- 修改：`src/data/defaultLevels.ts`
- 修改：`src/content/levels.ts`
- 修改：`scripts/fixtures/level-layout-hash.json`
- 修改：`package.json`

### 任务 1：规格与失败测试（已完成）

```ts
row(81, "wrap", ["wrap", "weld"], "分区", "变", 20)
row(87, "colors", ["colors", "weld"], "分区", "变", 20)
row(93, "7x7", ["7x7"], "规模", "变", 22)
row(99, "wrap", ["wrap", "weld", "goal"], "取舍", "boss", 25)
```

运行：`node_modules/.bin/tsx scripts/test_chapter5.ts`

预期：L81 缺少组合规则，FAIL。

### 任务 2：组合波峰（已完成）

- [x] L81/L82：环面 + 焊死。
- [x] L84/L85：环面 + 齿轮。
- [x] L87/L88：双色 + 焊死。

- [x] 每个组合关同时满足两条规则、可执行提示和精确 par。

### 任务 3：取舍与呼吸（已完成）

- [x] L83：焊死回声。
- [x] L86、L89、L92、L96、L98：基础或回响谷关。
- [x] L90/L91：取舍峰。
- [x] L95：环面 + 取舍。
- [x] L97：焊死 + 取舍。

### 任务 4：7×7 与终局（已完成）

- [x] L93：7×7 基础盘面。
- [x] L94：7×7 + 环面。
- [x] L99：环面 + 焊死 + 取舍，目标少于全部设施。

### 任务 5：接入与验证（已完成）

```ts
if (level.id <= 80) return CHAPTER4_LEVELS[level.id - 61];
if (level.id <= 99) return CHAPTER5_LEVELS[level.id - 81];
return level;
```

- [x] 更新 L81–L99 文案。
- [x] 重建布局指纹。
- [x] 390×844 逐关回放。
- [x] 最终 par：`20 / 21 / 18 / 21 / 22 / 19 / 20 / 21 / 18 / 19 / 20 / 19 / 22 / 20 / 23 / 21 / 22 / 22 / 25`。

### 任务 6：提交（已完成）

```text
git add src/data/chapter5Schedule.ts src/data/chapter5Levels.ts scripts/chapter5-gen.ts
git add scripts/test_chapter5.ts scripts/audit-chapter5.ts scripts/chapter5-playthrough.ts
git add src/content/levels.ts src/data/defaultLevels.ts scripts/fixtures/level-layout-hash.json
git commit -m "feat: 完成第 5 章 19 关玩法重排"
```
