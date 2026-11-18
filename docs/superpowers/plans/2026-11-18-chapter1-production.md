# 第 1 章 20 关生产实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 按 v0.4 排期替换主线 L1–L20，做出可解、可提示、有机制轮换且曲线审计通过的第一章 20 关。

**架构：** 新增机器可读的章节目录与生成器；基础关复用现有拓扑并重新打散，联动轴和环面复用已验证生成器。`DEFAULT_LEVELS` 在运行时组合新第 1 章与 L21–99 原数据，旧 20 关保留为生成素材，其他章节不变。

**技术栈：** React 19、TypeScript、Vite、现有 `solveRuleLevel` / `simulateCircuit`、tsx 脚本、Playwright。

---

## 文件结构

- 创建：`src/data/chapter1Schedule.ts`，固定 20 关角色、问题类型、机制标签与 par 带。
- 创建：`src/data/chapter1Levels.ts`，由生成器产出的正式 L1–L20。
- 创建：`scripts/chapter1-gen.ts`，复用旧拓扑、轴生成器和环面生成器，输出精确盘面。
- 创建：`scripts/audit-chapter1.ts`，检查机制断言、R1/R3/R5、精确 par 与提示通关。
- 创建：`scripts/test_chapter1.ts`，从玩家通关视角验证 20 关。
- 修改：`src/types/game.ts`，加入机制标签、问题类型和角色字段。
- 修改：`src/data/defaultLevels.ts`，运行时用新第 1 章覆盖 L1–L20。
- 修改：`src/content/levels.ts`，重写 L1–L20 的标题与提示。
- 修改：`scripts/fixtures/level-layout-hash.json`，重建前 20 关指纹。
- 修改：`package.json`，接入章节生成与审计。

### 任务 1：固定章节规格并写失败测试

**文件：**
- 创建：`src/data/chapter1Schedule.ts`
- 创建：`scripts/test_chapter1.ts`

- [x] **步骤 1：声明 20 关目录**

```ts
export const CHAPTER1_SCHEDULE: Chapter1Spec[] = [
  spec(1, "基础", ["basic"], "定位", "教", 5),
  spec(13, "联动轴", ["axis"], "相变", "教", 9),
  spec(16, "环面", ["wrap"], "定位", "预演", 6),
  spec(20, "联动轴", ["axis", "switch"], "相变", "boss", 14),
];
```

- [x] **步骤 2：写章节验收**

```ts
assert.equal(levels.length, 20);
assert.deepEqual(levels.map((level) => level.id), Array.from({ length: 20 }, (_, i) => i + 1));
assert.ok(levels[12].tiles.some((tile) => tile.axis));
assert.ok(levels[15].rules?.wrap);
assert.ok(levels[19].tiles.some((tile) => tile.type === "switch"));
```

- [x] **步骤 3：运行确认失败**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_chapter1.ts`

预期：FAIL，L13 没有联动轴。

### 任务 2：加入关卡机制元数据

**文件：**
- 修改：`src/types/game.ts`

- [x] **步骤 1：定义字段**

```ts
export type MechanicTag =
  | "basic" | "cross" | "multi-source" | "decoy" | "switch" | "diode"
  | "axis" | "wrap" | "goal" | "weld" | "gear" | "colors" | "noCycle" | "7x7";
export type QuestionType = "定位" | "顺序" | "取舍" | "相变" | "禁忌" | "分区" | "规模";
export type LevelRole = "教" | "练" | "变" | "回声" | "谷" | "考" | "boss" | "预演";

export interface LevelConfig {
  mechanicTags?: MechanicTag[];
  primaryMechanic?: MechanicTag;
  questionType?: QuestionType;
  role?: LevelRole;
}
```

- [x] **步骤 2：类型检查**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsc --noEmit`

预期：PASS。

### 任务 3：复用一个打散器生成基础关

**文件：**
- 修改：`scripts/generate-99-levels.ts`
- 创建：`scripts/chapter1-gen.ts`

- [x] **步骤 1：导出已验证的布局打散 API**

```ts
export function createScrambledLevel(
  id: number,
  title: string,
  subtitle: string,
  hintText: string,
  winText: string,
  solvedTiles: Tile[],
  seedModifier = 42,
  opts: ScrambleOptions = {},
) { /* 现有实现 */ }

export function requiredCellsOf(id: number, solvedTiles: Tile[]): Set<string>
```

- [x] **步骤 2：用现有拓扑建立 L1–L12、L19 候选**

```ts
const blueprintIds = [1, 2, 3, 4, 25, 6, 7, 28, 51, 33, 6, 53, 21, 25];
const solved = solvedTilesFromLegacy(blueprintId);
const built = createScrambledLevel(
  targetId,
  spec.title,
  "失落乐园",
  spec.hint,
  spec.win,
  solved,
  spec.seed,
  { targetPar: spec.targetPar, requiredCells: requiredCellsOf(targetId, solved) },
);
```

- [x] **步骤 3：按真实求解结果筛选**

```ts
const solvedResult = solveRuleLevel(built.level);
if (!solvedResult || outOfBand(solvedResult.par, spec)) continue;
built.level.parSteps = solvedResult.par;
```

### 任务 4：接入联动轴与环面切片

**文件：**
- 修改：`scripts/chapter1-gen.ts`

- [x] **步骤 1：生成 L13–L15**

```ts
const axisSpecs = [
  { id: 13, cells: 16, bulbs: 3, groups: [3], par: 9, seed: 5 },
  { id: 14, cells: 18, bulbs: 3, groups: [3], par: 10, seed: 20 },
  { id: 15, cells: 19, bulbs: 3, groups: [4], par: 9, seed: 7 },
];
```

- [x] **步骤 2：生成 L16–L18**

```ts
const wrapSources = [TORUS_TEST_LEVELS[0], TORUS_TEST_LEVELS[1]];
chapter1[15] = retag(wrapSources[0], 16, "跨缝一步");
chapter1[16] = retag(wrapSources[1], 17, "双缝返回");
chapter1[17] = addBoundarySwitch(retag(wrapSources[0], 18, "缝上闸"), 8);
```

- [x] **步骤 3：生成 L20**

```ts
const boss = generate({
  id: 20,
  cells: 20,
  bulbs: 3,
  groups: [2, 2],
  par: [14, 14],
  seed: 18,
  tolerance: 2,
});
chapter1[19] = addAxisPathSwitch(boss.level);
```

### 任务 5：组合正式数据

**文件：**
- 创建：`src/data/chapter1Levels.ts`
- 修改：`src/data/defaultLevels.ts`

- [x] **步骤 1：生成数据文件**

```ts
export const CHAPTER1_LEVELS: LevelConfig[] = [/* 20 个精确盘面 */];
```

- [x] **步骤 2：运行时覆盖前 20 关**

```ts
import { CHAPTER1_LEVELS } from "./chapter1Levels";

export const DEFAULT_LEVELS: LevelConfig[] = LEGACY_LEVELS.map((level) =>
  level.id <= 20 ? CHAPTER1_LEVELS[level.id - 1] : level,
);
```

### 任务 6：重写章节文案

**文件：**
- 修改：`src/content/levels.ts`

- [x] **步骤 1：按机制写可执行提示**

```ts
{
  levelId: 13,
  zoneId: "center",
  district: "失落乐园",
  title: "检票闸·联动",
  hint: "带轴心的几格一起转；先让整组对准主路。"
}
```

- [x] **步骤 2：逐关检查标题与提示**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/audit_theme.ts`

预期：0 处旧世界观词。

### 任务 7：章节审计与玩家回放

**文件：**
- 创建：`scripts/audit-chapter1.ts`
- 修改：`scripts/test_chapter1.ts`
- 修改：`scripts/phase0-playthrough.ts`

- [x] **步骤 1：检查机制与曲线**

```ts
assert.equal(solution.par, level.parSteps);
assert.equal(hintSteps, solution.par);
assert.ok(Math.abs(par[i] - par[i - 1]) <= 3);
assert.ok(peaks >= 2);
assert.ok(valleys >= 1);
```

- [x] **步骤 2：检查主机制断言**

```ts
if (level.primaryMechanic === "axis") assert.ok(level.tiles.some((tile) => tile.axis));
if (level.primaryMechanic === "wrap") assert.ok(solution.seamCount > 0);
if (level.id === 20) assert.ok(level.tiles.some((tile) => tile.type === "switch"));
```

- [x] **步骤 3：跑核心回归**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_circuits.ts`

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_hint_engine.ts`

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_chapter1.ts`

### 任务 8：视觉验收与交付

**文件：**
- 输出：`docs/QA/chapter1-2026-11-18/`

- [x] **步骤 1：390×844 逐关真实点击**

从 L1 连续进入 L20，按提示播放到过关；每关保存一张截图。

- [x] **步骤 2：检查**

- 联动轴整组同转提示清楚；
- 环面穿缝亮线出现；
- L20 轴组与能量闸同时可操作；
- 无文字裁切、横向溢出和控制台错误。

- [x] **步骤 3：提交**

```bash
git add src scripts docs/superpowers/plans/2026-11-18-chapter1-production.md docs/QA/chapter1-2026-11-18
git commit -m "feat: 完成第 1 章 20 关玩法重排"
```
