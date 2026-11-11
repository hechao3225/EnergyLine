# 能量管道乐园三屏视觉验收报告

- 日期：2026-11-08
- 设计基准：docs/UI设计稿/能量管道乐园三屏界面.png
- 运行地址：http://localhost:3000/
- 运行方式：Vite + ChatGPT 内置浏览器
- 浏览器采集视口：1280×720；游戏画布保持 9:20 竖屏比例
- 数据策略：数字、关卡、步数、奖励继续使用真实运行数据

## 结论

**通过，核心玩法路径和三屏视觉层级可用。**

主页、解谜页和设施复苏页都能在当前浏览器高度内完整显示，第一关真实旋转和通关链路保持可用。残缺特效没有接入正式 UI，新增导航图标和庆典烟花已生成完整透明 PNG 并通过资源校验。

## 截图证据

- [主页](./01-home-redesign.png)
- [解谜页](./02-puzzle-redesign.png)
- [设施复苏页](./03-restoration-redesign.png)
- [复苏后主页](./04-home-restored-redesign.png)
- [选关界面](./05-level-select-redesign.png)
- [动态帧录制 GIF](./puzzle-playthrough-redesign.gif)

## 玩家路径

1. 从主页点击“继续挑战”进入解谜页。
2. 检查关卡云牌、说明卡、6×6 棋盘、步数条和操作按钮。
3. 真实点击棋盘管道，确认每次旋转消耗 1 步、路径状态更新。
4. 完成通关后进入设施复苏页，确认成功说明、奖励和底部按钮。
5. 返回主页，确认恢复进度和导航仍可用。
6. 打开选关页，确认当前节点和锁定节点状态。

## 设计对照结果

### 主页

- HUD、Logo、章节横幅、乐园场景、角色、进度卡、继续挑战和底部导航按设计层级排列。
- 动态进度使用真实 clearedCount / 99，不写死设计稿中的 40 / 99。
- 新增关卡、图鉴、成就、设置图标，统一使用暖金边框和紫色糖果质感。
- 在 720px 高度下通过短屏规则收紧进度卡和继续挑战按钮，底部导航不遮挡主按钮。

### 解谜页

- 关卡云牌、说明卡、棋盘、统计条和操作按钮保持设计稿的上下顺序。
- 棋盘继续使用 900×900 棋盘底图和 256×256 管道元件，端口中心保持一致。
- 真实旋转、撤销、重置、提示、步数上限和通关判定未改变。
- 管道 idle/powered 状态均来自完整正式 PNG。

### 设施复苏页

- 复苏横幅、旋转木马、三角色、成功卡、奖励卡和底部按钮按设计稿层级显示。
- 成就 Toast 已下移，不再覆盖复苏横幅和成功标题。
- 新增完整庆典烟花作为低透明度装饰，主体和光效边缘完整。
- 短屏下奖励标题与成功卡保持可辨识间距。

## 素材门禁

新增正式资源：

- assets/energy_park_art_pack_v1/10_generated_complete/nav_level_icon.png
- assets/energy_park_art_pack_v1/10_generated_complete/nav_flora_icon.png
- assets/energy_park_art_pack_v1/10_generated_complete/nav_achievement_icon.png
- assets/energy_park_art_pack_v1/10_generated_complete/nav_settings_icon.png
- assets/energy_park_art_pack_v1/10_generated_complete/celebration_firework.png

已排除：

- fx_energy_arc.png
- fx_energy_ring.png
- fx_firework_pink.png
- fx_firework_blue.png

上述片段型特效没有作为独立按钮、图标或主体装饰使用。

资源校验命令：

`PYTHONPATH=/tmp/rotategame-visual-pillow python3 scripts/verify_visual_assets.py`

结果：`verified 100 assets`

## 工程验证

- `pnpm run lint`：通过
- `pnpm run build`：通过
- 真实浏览器旋转交互：通过
- 真实通关反馈：通过
- 动态帧录制：通过

macOS 当前会话处于锁定状态，系统级 screencapture 未能生成 MOV 文件；已使用同一浏览器真实操作生成逐帧 GIF 作为动态录制证据。
