# 管件素材 B1 改版（香槟金 + 暖白）

改动日期：2026-11-12　基线：`master@4c8facd`

## 起因

玩家/发起人反馈三件事：

1. 白色管身"有污染"，像脏了；
2. 边缘有蓝色；
3. 黄色部分难看，且游戏内盘面是紫色。

## 量化诊断（改前）

| 现象 | 实测 |
| --- | --- |
| 白管不是白 | 断电管身均值 `#E5DAEB`，H=279°，b−r=+6.5；暗部 `#C8B1CE`。瓦片实际渲染色约 `#8F4BC1`（H=275°，L\*=45.3，由 tile.webp 叠 CSS 渐变再 saturate(0.65) 估得）：明度差距足够，问题在色相几乎同一族，白管因此看着像脏了 |
| 边缘发蓝 | `standardize_couplers()` 把 `pipe-line-on` 的整块端口（86px）贴给所有管型，断电管每个端口带约 12px 宽青色带 `#40C6E8→#4A8EAB`；十字管 4 端口共 5070 个青色像素 |
| 金色刺眼 | 本体 `#FDDE15`，H=52°，S=0.92；81% 金色像素 S>0.92，31% 高光顶格；板底 `#431984` H=264°，正好互补 |
| 能量闸被切 | `switch-*` 纵向标定把轮盘顶推出画布，第 0 行有 107–120 个完全不透明像素 |

## 改动

1. **接头几何统一、开口按管身色上色**：`standardize_couplers()` 仍然复用同一枚标准接头（512 画布、INNER=86、
   管径 139px），但开口里的通电光管改用 `tint_bore()` 按本管件端口内侧的管身色重新上色 —— 通电管保持青光，
   断电/单向管得到暖白暗腔，不再出现青色硬边。
2. **B1 调色** `grade_b1()`：金色 H 52→39.5、饱和按明度收（S≈0.9 在高光侧降到 0.55）。
   管身暖白重映射默认关闭（`B1_WHITE = None`）—— 发起人偏好保留原图的紫白，只去掉青色污染；
   接头色 `B1_GOLD` 现为中调淡紫（H300 / S0.50 / v_lift 0，实测 `#D69AD4` L*71.3）：亮度介于瓦片 `#8F4BC1`（L*45.3）与管身（L*85）之间，
   需要暖白方案时把 `B1_WHITE` 设为 `{'hue':36.0,'sat':0.10,'lift':0.06}` 即可。
   通电青色光管与红/绿阀门轮不做色相迁移。
3. **能量闸纵向标定**补上轮盘顶锚点（`switch-*`: `ys=[58,142,256] → yd=[8,148,364]`），轮盘按 1.667 与管身同比例
   落进 8px 边距，管身段标定不变。
4. 无 OpenCV 环境自动退回 numpy 双三次重采样（Catmull-Rom a=-0.75），管线可跨机复现。

## 验收结果

| 项 | 结果 |
| --- | --- |
| 端口中心 | 12 张全部 255/256（与改前逐像素一致，容差 ≤1） |
| 端口管径 | 统一 139px（8px 采样带），无漂移 |
| 断电态青色像素 | 0（改前每端口约 1250） |
| 能量闸顶行不透明像素 | 0（改前 107–120），轮盘四向完整 |
| 管身 vs 瓦片 | 管身 L\*=90.3 / 暗部 76.9，瓦片 L\*=45.3；色相 40° vs 275°，分离 ≈235°（改前两者同为 275–279°） |
| 逻辑回归 | `scripts/test_circuits.ts` 5/5 PASS |

## 证据

- `before-after.png`：改前 / 改后 / 74px 游戏内尺寸
- `port-cyan-before-after.png`：端口 5× 放大对照
- `switch-rotation.png`：能量闸两种状态 × 四向旋转
- `collar-cyan-diagnosis.png`：改前青色带定位

## 复现

```bash
python scripts/prepare_park_assets.py     # 正式管线，含 B1 调色
PARK_SKIP_PLATFORM=1 python scripts/prepare_park_assets.py   # 只重出素材，不动 PWA/Android 图标
python scripts/prepare_pipe_restyle.py    # 只重出 12 张管件
```

原图集 `docs/UI设计稿2.0/generated-sources/pipes.png` 未改动，改前素材可从 `4c8facd` 取回。

## 端头收窄（未采用，需重绘）

发起人要求"管两头再窄一点"。现端头由原画定死：轴向 87px/512，外径 215 而管身 182（粗 18%）。
两种纯后处理做法都试过：

| 做法 | 结果 |
| --- | --- |
| 整幅沿端口轴分段重映射（`slim_ports()`） | 端头确实变短，但同一张图的异轴端口一起被压：corner 口径 139→173/175、cross 132~187、中心偏移 16px，**口径不一致，已回滚**（`SLIM_ENDS = 1.0`） |
| 逐端口拼接（压缩接头贴图 + 管身带填充） | 单轴管型成立，corner/cross/t_shape 出现拼接缝与错位环 |

结论：端头宽度属于原画几何，纯后处理无法在保持 139 口径与 255.5 中心的前提下收窄，
需要重出图集（一次生图）后仍用同一套切片 + 标定管线。参考图见 `slim-ends-options.png`。

## 接头配色备选（未采用）

实测瓦片色 `#8F4BC1`（H275 / L\*45.3）下，接头若改糖果紫会与背景同族：

| 方案 | 接头实测 | 与瓦片 ΔL\* / ΔH | 结论 |
| --- | --- | --- | --- |
| 香槟金 | `#DEB360` | 30 / 235° | 段位清晰，金属读感保留（曾采用） |
| 淡紫（曾采用） | `#E9BEE5` | 37 / 31° | 真机下与管身 L\*85 同值，接头与管身糊在一起 |
| **中调淡紫（现采用）** | `#D69AD4` | 26 / 28° | 亮度夹在瓦片 45 与管身 85 之间，真机上接头仍可辨 |
| 糖果紫 | `#C78CDB` | 21 / 10° | 融进盘面，70px 下接头几乎消失 |
| 淡彩糖果粉紫 | `#E2A4DF` | 30 / 28° | 能读，但失去金属感，且与红阀门轮抢色 |
| 糖果粉 | `#E29AC1` | 27 / 53° | 可读性最好，整体偏粉 |

对照图见 `collar-options.png`。

## 修正说明

规划阶段把 CSS 渐变端点 `#A8A1E5` 当成瓦片亮部，得出明度只差 5.8 的结论；实际瓦片是 `tile.webp`
（中心 `#AB46FC`，84% 不透明）铺在渐变上、再经 `saturate(0.65)` 与 0.85 不透明度，等效色约 `#8F4BC1`（L\*45.3）。
即改前的核心问题不是明度不足，而是白管被染成同色相紫白。本方案按此实施，未改动瓦片 CSS。

## 真机渲染验收（Chrome / 390×844 / DPR3）

用 Vite dev server + Playwright（channel=chrome，iPhone 视口，DPR3）跑真实渲染，覆盖首页、第 1 关初始/旋转/通关、第 5 关多管件盘面。
截图在 `device/`（已降采样到 585×1266 存档，原始 1170×2532 由脚本可重跑）：

| 文件 | 内容 |
| --- | --- |
| `device-contact-sheet.png` | 第 5 关盘面 / 通关 / 第 1 关 / 故事页 四联 |
| `device-collar-brightness-ab.png` | 同一盘面三档接头亮度（改前金 / 淡紫 L82 / 中调淡紫 L71） |
| `device-before-after.png` | 改前与改后的同区域对照 |
| `08-midlilac-level5-board.png` | 当前配色下的第 5 关整屏 |
| `06-level5-board-390x844.png` | 淡紫 L82 版本（问题证据） |
| `04-level1-powered-390x844.png` | 第 1 关通电过程中的整屏 |

复跑方式（本机已验证）：用 `node` 起 `vite --port 4199`，再用 Playwright `chromium.launch({channel:'chrome'})`、
`viewport 390×844 / deviceScaleFactor 3 / isMobile / hasTouch` 打开页面，依次点"开始挑战 → 下一步×2 → 开始连接"，
用 `[data-tile-id=...] .park-tile-rotate` 触发真实旋转后截图。

真机结论（与之前只看素材的判断有出入）：

1. 瓦片在真机上比 CSS 渐变估算的更亮、更饱和，管身（紫白 L\*85）与接头必须拉开**亮度层次**才有段位感；
2. 淡紫 `#E9BEE5`（L\*82）在真机上和管身同值，接头退化成"白棍两端的浅色带"，结构明显弱于改前金色；
3. 中调淡紫 `#D69AD4`（L\*71）夹在 45 与 85 之间，接头重新可辨，同时保留紫色家族；
4. 改前柠檬金在真机上仍是结构读数最强的一档——如果后续觉得中调淡紫还不够清楚，回到金色是唯一"零成本"的强对比解。

## 设施格去掉十字进管（2026-11-12 追加）

发起人反馈旋转木马格上叠的十字管"突兀"。改动：

| 位置 | 改动 |
| --- | --- |
| `src/components/TileView.tsx` | 删除设施格额外渲染的 `pipe-cross-*`（`.park-goal-inlets`），设施只渲染自身贴图 |
| `src/index.css` | `.park-tile.is-goal .park-facility-art` 从 88%（left 6%/top 4%）改为 100% 铺满，让相邻管道端口直接贴住设施轮廓 |
| `scripts/test_pipe_alignment.ts` | 设施格不再有独立进管贴图：改用格子 `rect` 的边界中点作为进料口坐标，避免 `cell.image!` 空引用 |

真机验证图：`goal-tile-before-after.png`（前 / 后）、`device/09-goal-tile-nocross.png`、`device/10-board-nocross.png`。
设施点亮时的 `drop-shadow` 与 `is-lit` 光效不受影响（设施本身仍带 `park-pipe` 类）。

## 浅色盘面（2026-11-12 试验，2026-11-14 已回滚）

发起人给出参考图，要求把盘面从深紫换成浅紫。改动：

| 位置 | 改动 |
| --- | --- |
| `scripts/park_pipe_geometry.py` | 新增 `grade_tile()`：瓦片底图从浓紫（`#AB46FC`，S0.72）压到淡粉紫（`#EBBAE5`，H307/S0.26/V0.88），保留高光与描边结构 |
| `scripts/prepare_park_assets.py` | `tile` 接入 `grade_tile`，并把它移出"已存在即跳过"的白名单，否则不会重出 |
| `src/index.css` | `.park-tile::before` 底色改淡、`saturate(.65)→(.92)`、`opacity .85→.94`；`.park-board` 渐变从 `#ff9fdd/#a341e7/#431984/#f2a5e9` 改为 `#ffd2ee/#d0a3ea/#a87cd2/#ffd9f2` |

**已回滚**：发起人反馈饱和度太低，盘面恢复最初的深紫（`tile.webp` 不再走 `grade_tile`，`TILE_PALE = False`；`.park-board` 与 `.park-tile::before` 恢复原值）。对照图 `board-deep-restored.png`。

**当时的连带影响**：盘面变浅后，淡紫接头（L\*71）与浅底（L\*~78）几乎同值，管道整体发糊。
参考图之所以成立，是因为它的接头是金色。因此接头配色回到 B1 香槟金（`#DEB360`，L\*75，ΔH 235°），
在浅底上靠色相而不是亮度建立结构。对照见 `pale-board-collar-choice.png`；
旧深紫盘面对照见 `pale-board-before-after.png`，真机截图 `device/14-pale-board-gold-level1.png`、`device/15-pale-board-gold-victory.png`。

## 未覆盖

浏览器端 `npm run test:pipes` / `test:ui` 需要 `@playwright/test`，本机未安装；真机比例截图与触控验收待补。
