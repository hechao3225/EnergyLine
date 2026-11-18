# 玩法曲线 Phase 0 验收报告

日期：2026-11-17
结论：**通过。** 12 个规则切片均有精确 par，提示可逐步通关，组合规则与手机端反馈可用。

## 自动验证

| 项目 | 结果 |
|---|---|
| 12 个切片精确 par | 12/12 |
| 连续使用提示通关 | 12/12，实际步数均等于 par |
| 实验场 par 与规则回放 | 23/23 |
| 四类负担与 challenge | 12/12 在有效范围 |
| TypeScript / Vite build | 通过 |
| 390×844 浏览器回放 | 通过，无控制台错误 |
| 360×800 紧凑屏 | 通过，无横向溢出 |
| 12 关当前 UI 点击通关 | 12/12，实际步数均等于 par |

跨缝强度按最优解的通电穿边界边计数：T1 `4`、T2 `8`、T3 `12`。`W-1` 同时验证环面、焊死和 8 条穿缝边。

## 视觉证据

总览：[contact-sheet.png](./contact-sheet.png)

| 状态 | 390×844 截图 |
|---|---|
| 环面初始 | [01-wrap-initial.png](./01-wrap-initial.png) |
| 环面可执行提示 | [02-wrap-hint.png](./02-wrap-hint.png) |
| 跨缝通电幽灵线 | [03-wrap-seams-lit.png](./03-wrap-seams-lit.png) |
| 焊死瞬间反馈 | [04-weld-lock.png](./04-weld-lock.png) |
| 双色 + 焊死 | [05-colors-weld-initial.png](./05-colors-weld-initial.png) |
| 环面 + 焊死初始 | [06-wrap-weld-initial.png](./06-wrap-weld-initial.png) |
| 环面 + 焊死跨缝亮线 | [07-wrap-weld-seams.png](./07-wrap-weld-seams.png) |

360×800 紧凑屏：[08-colors-weld-360x800.png](./08-colors-weld-360x800.png)

12 关真实点击矩阵：[matrix-contact-sheet.jpg](./matrix-contact-sheet.jpg)

矩阵覆盖 P1、T1、T2、T3、P2、P3、S1、W1、W2、主线 L73、W-1、C-2。每关都从当前 UI 入口进入并逐次点击操作按钮，不使用注入棋盘或直接改状态；全部 `steps = par`，无横向溢出，控制台错误为 0。

## 视觉检查

- 跨缝幽灵线出现在棋盘内外边界，成对表示同一接缝；T1 与 `W-1` 均可见。
- 焊死时出现扩散描边与「焊死」浮标，随后保留「焊」章；点击已锁格不扣步。
- 双色关使用 `◆ / ● / ×` 与红蓝底色双重编码，颜色不是唯一信息。
- 390×844 下棋盘格约 `59×59`，紧凑屏约 `54×54`；无文字裁切、横向溢出或按钮重叠。
- 组合关盘下文案分别说明「环面 + 焊死」与「双色 + 焊死」，不覆盖单规则说明。

## 本轮边界

本轮只建立实验场 12 项验证切片，正式 99 关仍保持原排期。旧存档补偿、未来主题随机环境规则不进入本轮。

旧 UI2 自动化脚本仍依赖 `开始挑战` 文案，`test_park_ui` 还要求本机缺少的 Playwright ffmpeg；本轮使用独立的 Phase 0 浏览器回放覆盖当前界面，不把旧脚本计为通过。

机器可读结果：[result.json](./result.json)
