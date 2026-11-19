# 护眼配色复查 · 2026-11-18

## 1. 问题

手机端反馈：「蓝色管道饱和度太高，刺眼睛」。要求全量排查同类荧光亮色并给出改法。

## 2. 根因

刺眼主因不是 CSS 颜色，而是**通电管道位图本身**：

- 断电管身是珍珠白/淡紫（pipe-*-off.webp），看着很软；
- 通电管身保留原图高饱和小青蓝（pipe-*-on.webp）：青色像素平均 S≈58%、最饱和 10% 像素 S≈93%、亮度 V≈95%；
- 一关点亮后整条通路都换成这张图，棋盘中央形成一整片发光青蓝，这是手机上最刺眼的区域。

同族荧光青还出现在：首页主视觉瀑布（island.webp，青色 S≈67%、p90 S≈98%）、蓝色伴生花精（spirit / spirit-cheer，p90 S≈93%），以及若干 CSS 霓虹光晕（#69ecff、#4fa8ff、#7ef6ff、#26eaff、#b6ff40、#fa8cfc、#ff9ffb）。

## 3. 改动

### 3.1 素材调色（主改动）

在美术管线新增 ENERGY_SOFT 护眼调色，只重映射色相/饱和度/明度，**不改像素形状、不改 alpha**：

| 对象 | 参数 | 说明 |
| --- | --- | --- |
| pipe-*-on.webp、pipe-source.webp | hue 200 / hue_pull 0.45 / sat_cap 0.58 / v_scale 0.90 | 荧光青 → 天青蓝；压低最饱和处、略降明度，保证通电/断电仍可一眼区分 |
| spirit.webp、spirit-cheer.webp | sat_cap 0.52 / v_scale 0.97 | 角色保留明亮度，只压彩度 |
| island.webp（首页与剧情主视觉） | sat_cap 0.52 / v_scale 0.97 | 瀑布、水池同族青色压一档 |

- 管线入口：scripts/park_pipe_geometry.py 的 ENERGY_SOFT + soften_energy()，grade_b1() 生成 *-on 与 pipe-source 时自动调用；
- scripts/prepare_park_assets.py 对 island / spirit / spirit-cheer 调用同一函数，重跑管线不会退回荧光色；
- 已生成的 webp 由一次性迁移脚本 scripts/soften_energy_assets.py 追平（幂等：manifest 带「护眼复查」标记的条目跳过），并同步 public/assets/park/manifest.json 的 sha256/bytes/processing。

量化（青色像素掩码：H 150–235、S>0.12、alpha>0.5）：

| 素材 | 平均 S | 最饱和 10% S | 平均 V |
| --- | --- | --- | --- |
| pipe-line-on | 58.0 → 42.9 | 93.8 → 58.3 | 94.7 → 84.5 |
| pipe-corner-on | 57.4 → 43.8 | 92.7 → 58.3 | 94.6 → 84.7 |
| pipe-t_shape-on | 59.6 → 44.3 | 93.0 → 58.4 | 94.8 → 84.6 |
| pipe-cross-on | 60.4 → 45.3 | 91.6 → 58.4 | 94.2 → 84.1 |
| pipe-source | 57.7 → 41.9 | 93.4 → 58.2 | 93.1 → 82.8 |
| spirit | 60.6 → 44.2 | 93.2 → 52.5 | 94.8 → 91.9 |
| spirit-cheer | 49.1 → 40.4 | 78.9 → 52.3 | 95.2 → 92.1 |
| island | 67.3 → 46.9 | 98.3 → 52.7 | 93.0 → 87.0 |

9 张素材 alpha 通道逐像素比对完全一致，端口几何/像素位置未动（护眼改色不触碰 test:pipes 依赖的端口像素）。

### 3.2 CSS 霓虹光晕与大面积高饱和填充（36 处）

| 位置 | 改前 | 改后 |
| --- | --- | --- |
| 通电管道光晕 .park-tile.is-powered .park-pipe | drop-shadow(0 0 1.2cqw #69ecff) | drop-shadow(0 0 0.8cqw rgba(150,206,219,.55)) |
| 点亮设施光晕 .park-tile.is-lit .park-pipe | #fff079 2cqw | rgba(255,233,168,.6) 1.2cqw |
| 联动轴环 .park-tile.has-axis::before | #7ef6ff + #7ef6ff70 | #9ccfd6 + #9ccfd640 |
| 联动轴虚线 / 轴心徽章 | #a9f9ff、#dcfeff→#4fd8ef→#1a8fb0、#7ef6ffb0 | #c3e4e6、#eaf6f7→#93c6d2→#3f6b76、#9ccfd680 |
| 环面刻线 / 幽灵接缝 / 棋盘轮廓 | #7ef6ff 系列 | #9ccfd6 系列 + 低 alpha |
| 双色格底 .park-tile.color-1/2::before | #ffb497,#dc3316,#ff8a63 / #a8d8ff,#1452c8,#6fb6ff + saturate(1.05) | 红 #e8b3a3,#b8574a,#dc9a86 / 蓝 #9fc4dd,#3f6f9e,#86aecb + saturate(0.62) |
| 双色格管道外发光 | #ff6a4d / #4fa8ff / #b26bff | 同族低 alpha rgba |
| 齿轮分组色 --gear | #ffc53d #5ff0c8 #ff8ad0 #7fd4ff | #d8b264 #7fc9b4 #d9a3bb #9ec4dd |
| 满电脉冲 / 设施点亮脉冲 | #d5ffff / #ffea76 | #e6f4f3 / #f3dc95 |
| 过载警报 | #ff3b3b #ffb3b3 #ff2a2a99 #ff6b6b + 亮度 0.92↔1.12 | 低 alpha rgba + 亮度 0.96↔1.06 |
| 焦点框 outline | #26eaff | #8fd0d8 |
| 首页进度条 | #b6ff40,#3fdf0b,#119e08（荧光柠檬绿） | #c3d98a,#7fae4f,#4f7d33 |
| 首页岛屿 / 伙伴光晕 | #fa8cfc、#ffddff | 低 alpha 暖紫 |
| 导航 / 棋盘 / 弹窗洋红辉光 | #ff9ffb、#f990eb、#e68bff、#ffc5ff | 低 alpha 柔紫 |
| 实验入口 / 开关 / 地狱徽章 | #7ef6ff、#5ff0c8、#a7f1ba、#ffafb9、#ff5a5a→#b40000 | 降档后的青/绿/红 |

### 3.3 组件内联色

- src/components/TileView.tsx：双色标记 #ff3b21 / #2f8bff / #a855f7 → #c25a44 / #4f86b0 / #9b74c4；
- src/components/GameBoard.tsx：GEAR_COLORS 五色 neon pastel → 同族降饱和版本。

## 4. 刻意保留

- 紫色主题本体（瓦片、云海、紫色面板）：改前/改后瓦片像素均值完全一致（167,99,204），设计识别度不变；
- 香槟金/暖白按钮、奶油色卡片、金色徽章：暖色小面积高饱和不构成刺眼源，保留作视觉焦点；
- 金色能量源与点亮设施：暖光是「修复成功」的正反馈。

剩余 S≥85 且 L≥55 的色值仍有 100 个，但全部是 L≥88 的近白高光/米金描边（如 #fff9e7、#ffe9a8）或小面积暖金/粉色点缀（如 #ffcc45、#ff4d6d 实验徽章），已无大面积青/洋红荧光区。若还要再降一档：#ff4d6d（实验场「新」徽章）、#d37bff（章节页签选中态）、#ff9fdd（棋盘渐变起始角）是下一批候选。

## 5. 验证

- npm run lint（tsc --noEmit）通过；
- manifest.json 178 条哈希与文件逐一比对一致，9 条带护眼标记；
- 移动端 390×844 @3x、系统 Chrome 实机渲染截图（见下表）；
- 2026-11-19 复核：`pnpm test`、TypeScript 与 Vite 生产构建通过；`pnpm test:pipes` 已改为跨平台字体探测并通过 48 个方向、5 个真实玩法状态，运行时最大接头误差 0.25 CSS 像素。证据见 [eyecare-2026-11-19/pipe-alignment](./../eyecare-2026-11-19/pipe-alignment/runtime-port-results.json)。
- 9 张修改素材的尺寸与 alpha 通道已逐像素对比，全部一致；178 条 manifest 哈希和文件字节数全部一致。

## 6. 截图索引

| 文件 | 内容 |
| --- | --- |
| board-before.png / board-after.png | 第 1 关通电态：改前整条管道荧光青，改后柔和天青蓝 |
| board-before-off.png / board-after-off.png | 未通电棋盘：紫色主题与布局未变 |
| board-zoom-after.png | 棋盘特写（改后） |
| pipes-before-after.png | 6 种管件/花精素材：左列改前、右列改后 |
| onboarding-before.png / onboarding-after.png | 剧情主视觉瀑布：改前荧光青，改后柔和 |
| waterfall-before-after.png | 瀑布区域上下对比拼图 |
| [../eyecare-2026-11-19/pipe-alignment](./../eyecare-2026-11-19/pipe-alignment/) | 当前素材的端口像素审计、运行时对齐与多尺寸棋盘截图 |

## 7. 复现

```bash
# 只重出管件 + 新调色
python scripts/prepare_pipe_restyle.py
# 全量重出（含 island / spirit / spirit-cheer）
python scripts/prepare_park_assets.py
```

## 8. 小游戏端（minigame/）审计结论（只读，未改）

小游戏端不加载 pipe-*.webp，管道由 Canvas 2D 现画，本改动不会传导过去。但同族问题存在且更动态：

- waterCore = #38bdf8（H198 S93 L60，sky-400）同时用于瓦片水芯、棋盘流光水珠与泉眼脉冲环，每帧流动；
- 活水辉光 rgba(56,189,248,0.4) 逐段覆盖棋盘，满通路时形成青蓝线网；
- particles.ts 气泡 #67e8f9，shadowBlur=10 的 #34d399 阴影；
- 无夜间/护眼档位；theme.ts 与 tile.ts 各存一份颜色令牌，改色需双处同步。

建议（与本次口径一致）：#38bdf8 → #3795be、#67e8f9 → #6ec3cf，辉光 alpha ×0.55、脉冲环 alpha ×0.6；粉/紫/红点缀按同比例降 25–35%。
