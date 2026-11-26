# 焊死实验关（W1–W3，2026-11-16）

> 首页「实验场 · 试玩机制」→ 钢蓝条目 **焊死 W1/W2/W3**。不进主线、不写存档。

## 机制

`rules.weld = true`：**已经通电的格子不能再转**。

- 你每接通一段，那一段就定型；要改只能先断开（转别的格子让它失去供电），或者用回溯。
- 这逼着玩家从最远的设施往回修：先接源头附近的管子，等于把后面的路焊死。
- 视觉：通电且未固定的格子右下角挂一枚「焊」章，按钮直接 `disabled`，点了不动、不扣步。

## 为什么 par 还是精确的

焊死只会**减少**可行的操作顺序，不会减少可行解：

> 无焊死的最优计划如果本身存在一个合法执行顺序，那么焊死下的最少步数就等于原 par。

所以生成器对每一关做两件事：
1. 用原求解器算出精确 par；
2. 用 `scripts/weld-order.ts` 的 DFS 证明“这个最优计划能按焊死规则一步步执行完”。

两件都成立才收关。`npm run lab:par` 会把这项检查一起跑。

## 三关

| 关 | 名称 | par / 预算 | 灯 | 要转的格子 |
|---|---|---:|---:|---:|
| W1 | 焊死 · 先远后近 | 10 / 12 | 3 | 10 下 |
| W2 | 焊死 · 别急着接源头 | 14 / 16 | 4 | — |
| W3 | 焊死 · 一次都不能错 | 14 / 17 | 4 | — |

生成器：`scripts/weld-gen.ts`；产物：`src/data/weldLevels.ts`（勿手改）。

## 实现

| 位置 | 改动 |
|---|---|
| `src/App.tsx` | `rotate` 里拦截：`rules.weld` 且该格（或联动的整组）已通电时直接返回 |
| `GameBoard` | 按 `simulation.poweredTileIds` 传入 `weldLocked`（源与设施除外） |
| `TileView` | 焊死格 `disabled`，右下角「焊」章 |
| `CandyThemeShell` | 盘下说明；首页实验场新增钢蓝条目 |
| `scripts/weld-order.ts` | 顺序可行性 DFS：给出一个能执行完的点击序列 |

## 验证

- `lab:par`：W1/W2/W3 par 与数据一致（10/14/14），解回放点亮，顺序可行。
- 端到端（无头 Chrome 390×844）：按 `weldOrder` 给出的 10 步顺序真实点击，通关；点已通电的格子时按钮 `disabled=true`、步数不变。
- `test_circuits` 6/6、`audit-rules` 2/2、`test_hint_engine`、`test_park_progress` 全过；`tsc`、`vite build` 通过。

## 已知限制

- ~~焊死只约束操作，不改可见性；玩家第一次被锁时只有「焊」章和点不动，没有额外的提示音/抖动。~~ 2026-11-25 已改为：焊死关用「钢色能量源 + 焊钢印」做关卡级标记（逐格标记方案已撤回），首见弹机制教学卡，误点焊死管有抖动/浮字/闷响兜底，见 `docs/WELD-VISUAL-2026-11-25.md`。
- 还没和齿轮、环面、双色叠加（齿轮+焊死会很有意思：整组一起焊）。
- 提示仍走关卡文案。

## 回滚

删除 `src/data/weldLevels.ts`、`scripts/weld-gen.ts`、`scripts/weld-order.ts`，还原 `labLevels.ts` 的 import 与展开；撤销
`App.tsx / GameBoard / TileView / CandyThemeShell / index.css` 里与 weld 相关的 diff（`LevelRules.weld` 字段可保留）。
