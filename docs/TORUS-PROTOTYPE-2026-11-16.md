# 环面实验关（T1–T3，2026-11-16）

> 首页「实验场 · 试玩机制」→ 薄荷色 **环面 T1/T2/T3**。不进主线、不写存档。

## 机制

`rules.wrap = true`：左右边界相接、上下边界相接。从第 6 列右边出去，落在第 1 列；从第 1 行上边出去，落在第 6 行。

- 6×6 盘面在拓扑上是一个甜甜圈，屏幕上的“距离”不再等于实际步数。
- 一关可以同时用两条接缝（T3 的最优解用了 12 条穿边界边）。
- 视觉：外圈青色虚线 + 处在边界上的格子外缘有一条青色刻线，表示“这一边会从对面回来”；盘下常驻一句说明。

## 实现

| 位置 | 改动 |
|---|---|
| `src/types/game.ts` | `LevelRules.wrap?: boolean` |
| `src/utils/circuit.ts` | 主 BFS 与双色 BFS 的邻居坐标按 `wrap` 取模，不再越界丢弃 |
| `src/utils/hint-solver.ts` | `buildBoard` 的 `neighbor` 按 `wrap` 取模，精确 par 仍然成立 |
| `scripts/lab-par.ts` | 回放校验时把 `rules` 传给 `simulateCircuit`，否则环面解会被判失败 |
| `GameBoard / TileView` | `wrap` 属性、边界刻线、外圈虚线 |
| `CandyThemeShell` | 盘下说明按规则切换 |

## 三关

生成器：`scripts/torus-gen.ts`（在环面上长树 → 挑叶子做设施 → 打乱 → 用带 wrap 的精确求解器复核）。
产物：`src/data/torusLevels.ts`（勿手改）。复核：`npm run lab:par`。

| 关 | 名称 | par / 预算 | 灯 | 解里穿边界的边 |
|---|---|---:|---:|---:|
| T1 | 环面 · 从左边出去 | 9 / 11 | 3 | 3 |
| T2 | 环面 · 绕一圈回来 | 12 / 14 | 4 | 5 |
| T3 | 环面 · 别按距离算 | 16 / 19 | 4 | 12 |

生成时会强制检查：最优解至少有一条穿边界的边，否则这一关不算环面关。

## 怎么试

1. 首页右侧「实验场 · 试玩机制」，薄荷色 **环面 T1**。
2. 先读盘下那句说明，再动手；T1 的源在左边，最快的路其实是从右边穿过去。
3. 点亮后看媒体：同一根管子在左右两边同时通电，就是接缝生效。

## 验证

- `npm run lab:par`：T1/T2/T3 par 与数据一致（9/12/16），解回放全部点亮。
- `test_circuits` 6/6、`audit-rules` 2/2、`test_hint_engine`、`test_park_progress` 全过；`vite build` 通过。
- 无头 Chrome 390×844：入口 → T1，`data-wrap=true`、边界刻线、盘下说明都正常（截图 `docs/QA/gear-2026-11-15/09-torus.png`）。

## 已知限制

- 只在实验场；提示走关卡文案（求解器不认 wrap 之外的规则组合，环面本身可以算）。
- 还没和双色 / 齿轮 / 禁环叠加。
- 接缝目前靠“边界刻线 + 说明”表达，没有画一条跨屏的连线；如果试玩时觉得“右边那根为什么亮了”不够直观，下一步可以加一条只在通电时出现的短弧线。
- 焊死（`rules.weld`）字段已经预留，还没实现。

## 回滚

删除 `src/data/torusLevels.ts`、`scripts/torus-gen.ts`，还原 `labLevels.ts` 的 import 与展开；撤销
`game.ts / circuit.ts / hint-solver.ts / lab-par.ts / GameBoard / TileView / CandyThemeShell / index.css` 里与 wrap 相关的 diff。
