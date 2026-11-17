# 玩法曲线 Phase 0 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 在实验场建立 12 个规则验证切片，证明联动轴、环面、取舍、焊死、双色及两个组合规则具备精确 par、可执行提示和手机端可读反馈。

**架构：** 新增统一规则求解器，复用现有精确树 DP，叠加联动轴相位枚举、双色供能约束、环面邻居和焊死顺序证明；提示引擎从统一解中取第一项合法操作。实验场只挂 Phase 0 切片，不改正式 99 关排期。

**技术栈：** React 19、TypeScript、Vite、现有 `simulateCircuit` / `solveMinTaps`、tsx 脚本、Playwright。

---

## 文件结构

- 创建：`src/data/phase0Levels.ts`，声明 12 个 Phase 0 切片及其验证标签。
- 创建：`src/utils/rule-solver.ts`，统一精确求解、消歧与规则结果。
- 创建：`src/utils/weld-order.ts`，生产环境可复用的焊死顺序 DFS。
- 创建：`src/utils/burden.ts`，四类负担与 challenge 的单一计算口径。
- 修改：`src/utils/hint-solver.ts`，在树 DP 中约束双色供能。
- 修改：`src/utils/hint-engine.ts`，接受规则关与联动轴并返回可执行动作。
- 修改：`scripts/axis-solver.ts`、`scripts/weld-order.ts`、`scripts/lab-par.ts`，改为复用生产工具。
- 创建：`scripts/test_phase0_spec.ts`，从玩家操作视角回放提示并校验 12 个切片。
- 修改：`src/components/GameBoard.tsx`、`src/components/TileView.tsx`、`src/index.css`，补跨缝亮线、焊死反馈和颜色符号。
- 修改：`src/components/CandyThemeShell.tsx`，实验场暴露两个组合探针。

### 任务 1：声明 Phase 0 切片并写失败测试

**文件：**
- 创建：`src/data/phase0Levels.ts`
- 创建：`scripts/test_phase0_spec.ts`

- [x] **步骤 1：声明 12 个切片**

```ts
export const PHASE0_SLICES: Phase0Slice[] = [
  slice("axis", "P1"),
  slice("wrap", "T1"),
  slice("wrap", "T2"),
  slice("wrap", "T3"),
  slice("axis-conflict", "P2"),
  slice("axis-boss", "P3"),
  slice("goal", "S1"),
  slice("weld", "W1"),
  slice("weld", "W2"),
  slice("colors", "C1"),
  combo("wrap-weld", "T1", "W-1", { wrap: true, weld: true }),
  combo("colors-weld", "C1", "C-2", { colors: 2, weld: true }),
];
```

- [x] **步骤 2：先验证提示引擎必须支持规则切片**

```ts
for (const slice of PHASE0_SLICES) {
  if (!supportsHintEngine(slice.level)) {
    throw new Error(`${slice.key} 仍被提示引擎拒绝`);
  }
}
```

- [x] **步骤 3：运行测试确认失败**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_phase0_spec.ts`

预期：FAIL，首个联动轴切片报告“仍被提示引擎拒绝”。

### 任务 2：统一规则求解

**文件：**
- 修改：`src/utils/hint-solver.ts`
- 创建：`src/utils/rule-solver.ts`
- 测试：`scripts/test_phase0_spec.ts`

- [x] **步骤 1：给树 DP 加双色供给掩码**

```ts
const allowedMask = cells.reduce((mask, tile, index) => {
  if (tile.type !== "bulb") return mask;
  const sourceColor = cells[batteryIndex].color ?? 0;
  return (tile.color ?? 0) === sourceColor
    ? mask | (1 << bulbBit.get(index)!)
    : mask;
}, 0);
if (s & ~allowedMask) return INF;
```

- [x] **步骤 2：枚举联动轴相位并调用精确树 DP**

```ts
export interface RuleSolution {
  par: number;
  phases: Record<string, number>;
  plan: { id: string; rotateTaps: number; toggle: boolean }[];
  usedCells: string[];
  orderedSteps: ClickStep[];
}

export function solveRuleLevel(level: LevelConfig): RuleSolution | null
```

- [x] **步骤 3：运行切片测试**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_phase0_spec.ts`

预期：PASS 到“提示可执行”断言，下一项因提示引擎仍返回旧接口失败。

### 任务 3：提示引擎输出真实可执行动作

**文件：**
- 修改：`src/utils/hint-engine.ts`
- 测试：`scripts/test_phase0_spec.ts`

- [x] **步骤 1：扩展示例动作**

```ts
export type HintAction = "rotate" | "toggle-switch" | "rotate-axis";

export interface HintMove {
  tileId: string;
  row: number;
  col: number;
  label: string;
  action: HintAction;
  taps: number;
  stepsNeeded: number;
  reachable: boolean;
}
```

- [x] **步骤 2：从统一解取第一项合法操作**

```ts
const solution = solveRuleLevel({ ...level, tiles });
const step = solution?.orderedSteps[0];
if (!solution || !step) return null;
const tile = step.axis
  ? tiles.find((candidate) => candidate.axis === step.axis)
  : tiles.find((candidate) => candidate.id === step.id);
```

- [x] **步骤 3：回放 12 个切片的提示直到通关**

```ts
let state = slice.level.tiles;
let steps = 0;
while (!isSolved(slice.level, state)) {
  const move = findHint(slice.level, state, slice.level.maxSteps - steps);
  if (!move) throw new Error(`${slice.key} 在 ${steps} 步后失去提示`);
  state = applyHintAction(slice.level, state, move);
  steps++;
}
if (steps !== slice.level.parSteps) {
  throw new Error(`${slice.key} 提示路径 ${steps} 步，par ${slice.level.parSteps}`);
}
```

- [x] **步骤 4：运行测试确认通过**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_phase0_spec.ts`

预期：`12/12 切片精确、提示可通关`。

### 任务 4：合并脚本入口与负担审计

**文件：**
- 创建：`src/utils/burden.ts`
- 修改：`scripts/lab-par.ts`
- 创建：`scripts/audit-phase0.ts`
- 修改：`package.json`

- [x] **步骤 1：输出四类负担**

```ts
export interface BurdenScore {
  op: number;
  rule: number;
  irr: number;
  scan: number;
  challenge: number;
}

export function scoreBurden(level: LevelConfig, solution: RuleSolution): BurdenScore
```

- [x] **步骤 2：接入脚本**

```json
"audit:phase0": "tsx scripts/audit-phase0.ts"
```

- [x] **步骤 3：运行**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/audit-phase0.ts`

预期：每项输出 `par`、`seamCount`、`challenge` 和通过状态，退出码 0。

### 任务 5：补手机端规则反馈

**文件：**
- 修改：`src/components/GameBoard.tsx`
- 修改：`src/components/TileView.tsx`
- 修改：`src/components/CandyThemeShell.tsx`
- 修改：`src/index.css`

- [x] **步骤 1：画出通电穿缝的两端幽灵线**

```tsx
{wrapLinks.map((link) => (
  <React.Fragment key={link.key}>
    <span className={`park-wrap-ghost is-${link.fromSide} is-active`} />
    <span className={`park-wrap-ghost is-${link.toSide} is-active`} />
  </React.Fragment>
))}
```

- [x] **步骤 2：给焊死瞬间和颜色类别增加非颜色反馈**

```tsx
{justWelded && <span className="park-weld-flash" aria-hidden="true" />}
{shownColor > 0 && (
  <span className="park-color-mark" data-symbol={shownColor === 1 ? "◆" : shownColor === 2 ? "●" : "×"} />
)}
```

- [x] **步骤 3：暴露两个组合探针**

```ts
const comboLevels = PHASE0_SLICES.filter((slice) => slice.kind === "combo");
```

- [x] **步骤 4：构建**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsc --noEmit`

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/vite build`

预期：均退出码 0。

### 任务 6：自动回归与真实手机视觉验收

**文件：**
- 创建：`scripts/phase0-playthrough.mjs`
- 输出：`docs/QA/phase0-2026-11-17/`

- [x] **步骤 1：运行规则测试**

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_circuits.ts`

运行：`PATH="/Users/lxjj/.codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_hint_engine.ts`

运行：`PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" node_modules/.bin/tsx scripts/test_phase0_spec.ts`

- [x] **步骤 2：390×844 浏览器实测**

依次打开环面、焊死、双色、两个组合探针，验证：

- 穿缝亮线只在通电跨缝时出现；
- 焊死锁定有动画且不扣步；
- 红蓝/符号同时可辨；
- 提示可点击并推进最优解；
- 无文字截断、溢出或对比度不足。

- [x] **步骤 3：保存截图与验收报告**

报告写入 `docs/QA/phase0-2026-11-17/README.md`，只记录产品结果、证据路径和剩余限制。

### 任务 7：代码审查与提交

- [x] **步骤 1：审查差异**

运行：`git diff --check`

运行：`git status --short`

人工检查：不误改正式 99 关；共享求解逻辑单一；提示与 UI 使用同一动作语义。

- [x] **步骤 2：提交**

```bash
git add docs/superpowers/specs/2026-11-17-mechanic-curve-redesign-design.md
git add docs/superpowers/plans/2026-11-17-mechanic-curve-phase0.md
git add src scripts package.json
git commit -m "feat: 建立玩法曲线 Phase 0 规则切片"
```
