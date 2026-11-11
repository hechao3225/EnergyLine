# 能量管道乐园 UI 视觉验收报告

## 验收范围

- 主页、解谜页、设施复苏页
- 900×2000 竖屏设计坐标
- 第 1 关真实旋转、撤销、提示、通关、复苏、下一关流程

## 资产引用校验

| 区域 | 原始资产 | 渲染约束 |
|---|---|---|
| 主页背景 | `assets/energy_park_art_pack_v1/01_scenes/home_background_9x20.png` | 900×2000，等比覆盖 |
| 解谜背景 | `assets/energy_park_art_pack_v1/01_scenes/puzzle_background_9x20.png` | 900×2000，等比覆盖 |
| 复苏背景 | `assets/energy_park_art_pack_v1/01_scenes/restoration_background_9x20.png` | 900×2000，等比覆盖 |
| 棋盘 | `04_puzzle_tiles/board_6x6_900.png` | 900×900，固定正方形 |
| 管道 | `04_puzzle_tiles/*_idle.png` / `*_powered.png` | 256×256，按瓦片中心旋转 |
| 角色 | `02_characters/*_main.png` | 保持透明通道和原始长宽比 |
| 设施 | `03_facilities/carousel_*.png` | 保持同一设施三状态尺寸关系 |
| 新增 UI | `09_generated_ui/*.png` | 透明 PNG，运行时叠加动态文字和图标 |

## 已完成检查

- 新增 UI 素材已通过 PNG 解码和尺寸检查。
- 前端入口 esbuild 打包通过：0 errors / 0 warnings。
- 99 关逻辑回归：5/5 PASS。
- 代码中已移除棋盘占位 Emoji，统计区使用图标组件。
- 棋盘底板、管道瓦片、UI 组件使用真实资产引用。

## 当前阻塞

浏览器本地地址权限被当前会话拒绝，无法重新打开 `http://127.0.0.1:4174` 获取本轮修复后的新鲜运行截图和录像。未把旧截图标记为本轮修复后的验收证据；允许本地预览后，需要重新采集 720×1280、900×2000 和 1080×2400 三组截图，再完成最终视觉通过标记。
