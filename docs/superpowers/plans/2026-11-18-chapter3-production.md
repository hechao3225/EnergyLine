# 第 3 章 20 关生产实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 完成 L41–L60，使焊死顺序成为章节主问题，并用取舍、环面、齿轮回声与呼吸关控制认知压力。

**架构：** 扩展焊死生成器为可复用章节入口；复用旧取舍拓扑、齿轮/轴生成器与无特殊机制生成器。新增第 3 章目录、数据、审计与 UI 回放。

**技术栈：** React 19、TypeScript、Vite、tsx、Playwright、统一规则求解器。

---

## 文件结构

- 创建：`src/data/chapter3Schedule.ts`
- 创建：`src/data/chapter3Levels.ts`
- 创建：`scripts/chapter3-gen.ts`
- 创建：`scripts/test_chapter3.ts`
- 创建：`scripts/audit-chapter3.ts`
- 创建：`scripts/chapter3-playthrough.ts`
- 修改：`scripts/weld-gen.ts`，导出可复用焊死生成函数
- 修改：`src/data/defaultLevels.ts`
- 修改：`src/content/levels.ts`
- 修改：`scripts/fixtures/level-layout-hash.json`
- 修改：`package.json`

### 任务 1：声明规格与失败测试

```ts
row(41, "weld", ["weld"], "顺序", "教", 15)
row(49, "weld", ["weld"], "顺序", "考", 17)
row(56, "goal", ["goal", "weld"], "取舍", "变", 17)
row(60, "weld", ["weld", "goal"], "顺序", "boss", 21)
```

运行：`node_modules/.bin/tsx scripts/test_chapter3.ts`

预期：当前 L41 没有 `rules.weld`，FAIL。

### 任务 2：导出焊死生成入口

```ts
export interface WeldGenSpec {
  id: number;
  code: string;
  title: string;
  hint: string;
  cells: number;
  bulbs: number;
  par: [number, number];
  tolerance: number;
  minTapped: number;
  seed: number;
}

export function generateWeldLevel(spec: WeldGenSpec): LevelConfig | null
```

### 任务 3：生成焊死主块

- L41：19 格、3 灯、15 步。
- L42：22 格、4 灯、15 步。
- L43：带十字的焊死盘面。
- L45、L49、L55、L57：逐步增加焊死峰值。
- L50：焊死 + 多源。
- L56、L60：焊死 + 取舍。

### 任务 4：生成回声与呼吸关

- L44：13 步基础谷。
- L47：15 步取舍回声。
- L48：14 步多源谷。
- L51：14 步环面回声。
- L52：15 步闸阀谷。
- L53：14 步多源谷。
- L54/L58：16 步齿轮回声。
- L59：目标少于全部设施，`maxSteps === parSteps`。

### 任务 5：章节组合

```ts
export const DEFAULT_LEVELS = LEGACY_LEVELS.map((level) => {
  if (level.id <= 20) return CHAPTER1_LEVELS[level.id - 1];
  if (level.id <= 40) return CHAPTER2_LEVELS[level.id - 21];
  if (level.id <= 60) return CHAPTER3_LEVELS[level.id - 41];
  return level;
});
```

### 任务 6：文案与布局指纹

- L41–L43 明确“先远后近”“不要先接源头”“十字通电后锁死”。
- L56/L60 同时提示取舍与焊死顺序。
- 运行主题回归并重建 L41–L60 指纹。

### 任务 7：审计与回放

```ts
assert.ok(level.rules?.weld);
assert.ok(solution.orderedSteps.length === solution.par);
assert.equal(hintReplaySteps, solution.par);
```

L59 额外检查 `maxSteps === parSteps`；L60 检查目标少于灯泡数量。

### 任务 8：提交

```bash
git add src/data/chapter3Schedule.ts src/data/chapter3Levels.ts scripts/chapter3-gen.ts
git add scripts/test_chapter3.ts scripts/audit-chapter3.ts scripts/chapter3-playthrough.ts
git add src/content/levels.ts src/data/defaultLevels.ts scripts/fixtures/level-layout-hash.json
git commit -m "feat: 完成第 3 章 20 关玩法重排"
```
