# 结算页（设施复苏）问题排查与修复 — 2026-11-21

发起人反馈：修复成功大图与本次修的设施不对应、图片被压变形、「通关奖励」文字重复，要求把整页问题一次排查干净。

## 一、反馈项定位与修复

| # | 反馈 | 根因 | 修复 |
|---|---|---|---|
| 1 | 大图与下面修的物品不对应 | 整张 `victory-bg-v2.webp` 把「旋转木马 + 三个角色 + 标题 + 两个按钮」都烘焙进了背景图，而真正按关卡取素材的 `.park-victory-showcase` 被 `display: none` 关掉；玩家看到的“成功大图”其实是背景图本身，所以永远是旋转木马 | 生成无主体背景 `victory-bg-v3.webp`（只有天空/光/城堡/樱花树/云海/花簇）；大图改为 `<Art name={getExhibitArt(collection)}>`，与灰/彩对比图、修复牌统一取 `facilityArt` |
| 2 | 图片变形，三个动物玩偶和上半部分被压 | `.park-victory` 用 `center top / 100% 100%`，把 1046×2048（0.511）的图强行拉到舞台 0.462~0.5625 的比例 → 横向拉伸 10%~19% | 背景改 `center / cover`（只裁不拉）；设施/标题/角色全部独立素材 + `object-fit: contain`；标题与角色再断言“容器比例≈素材比例” |
| 3 | 「通关奖励」几个字重复 | `reward-ribbon-v2.webp` 素材本身已烘焙「通关奖励」文字，HTML 又叠了一层同样的文字 → 双层描边 | 换成无字丝带 `reward-ribbon.webp`(768×125)，文字只由 DOM 画一次 |

## 二、顺带排查出的其它问题（已修）

| 问题 | 说明 | 修复 |
|---|---|---|
| 标题与按钮画了两遍 | 背景图里烘焙了「设施复苏！」牌匾和「返回乐园 / 下一关」两个按钮，运行时又叠了一套 DOM 按钮，边缘出现双层描边/发光 | 标题改用透明素材 `victory-title-banner.webp`；按钮只由 DOM 绘制；新背景不再含标题/按钮 |
| 三个角色随背景一起变形且不可响应 | 角色也是烘焙在背景里的 | 改用透明素材 `sheep-cheer` / `spirit-cheer` / `rabbit`，按舞台高度等比摆放，底部被面板压住（与设计稿一致） |
| 重玩时奖励显示 `+0 +0 +0` | 首通奖励已领取后仍显示三个 0，看起来像发奖失败 | 零值槽位改成「已领取」并弱化图标；非剧情模式（无尽/工坊/实验室）不再显示奖励区 |
| 底部「再玩一次…」几乎看不清 | 70% 白字压在亮色花海与烘焙的按钮装饰上 | 改为深紫半透明胶囊 + 金色描边，底部居中，层级提到按钮之上 |
| 兜底文案写死「旋转木马」 | 无尽/工坊等没有藏品数据的关卡会显示「旋转木马 · 成功修复」 | 统一用本关设施名，无数据时兜底「能量设施」 |
| 三处设施素材可能取到不同图 | 大图、灰态、彩态各自写了一遍取值表达式 | 统一为组件内 `facilityArt`，门禁断言三处 `src` 相同 |

## 三、素材

- 新增：`public/assets/park/victory-bg-v3.webp` — 1046×2048，WebP q90，188,228 B，不透明；生成记录见 [victory-bg-v3 生成记录](../victory-bg-v3-2026-11-21/README.md)。
- 复用（未改动）：`victory-title-banner.webp`、`reward-ribbon.webp`、`repair-sign-v2.webp`、`arrow-transition.webp`、`icon-check.webp`、`sheep-cheer.webp`、`spirit-cheer.webp`、`rabbit.webp`、`exhibit-*.webp`、`button-purple.webp`、`button-gold.webp`。
- 旧的 `victory-bg-v2.webp`、`reward-ribbon-v2.webp` 保留在仓库（回滚用），运行时不再引用。

## 四、代码改动

- `src/components/CandyThemeShell.tsx`
  - 结算页结构：`场景层（光射线）→ 标题横幅 → 设施大图（含光晕）→ 三角色 → 面板 → 按钮 → 重玩入口`，不再依赖背景图承载内容。
  - 新增 `facilityName` / `facilityArt`，替换所有 `?? "旋转木马"` 兜底。
  - 奖励区：仅剧情模式渲染；零值槽位显示「已领取」。
- `src/index.css`
  - `.park-victory` 背景改 `cover`；新增 `.park-victory-scene/-hero/-halo/-facility`；标题、角色、重玩入口重写；奖励丝带换无字素材；`(max-aspect-ratio: 9/20)` 断点同步。
- `scripts/test_park_victory_page.ts`（新增）：7 种尺寸 × 首通/重玩 的结算页回归门禁（见下）。
- `package.json`：`test:ui` 接入新门禁。
- `scripts/test_park_star_upgrade.ts`：奖励文案断言由 `+0` 同步为「已领取」。

## 五、验证

- 门禁：`PARK_TEST_URL=http://127.0.0.1:4300 PARK_QA_DIR=docs/QA/victory-page-2026-11-21 npx tsx scripts/test_park_victory_page.ts`
  → **通过**。逐项断言：大图/灰态/彩态同素材且不是 `carousel.webp`；背景 `cover` 且指向 `victory-bg-v3.webp`；设施/标题/角色 `object-fit` 非 `fill`，标题与角色容器比例与素材比例差 <2%；奖励牌用无字丝带且页面内不再引用 `reward-ribbon-v2`；修复牌/清单/奖励/成绩/面板/按钮/重玩入口互不遮挡；首通奖励为 `+N`，重玩为「已领取」；无运行时报错。
- `tsc --noEmit`：通过。
- `vite build`：通过（新背景进入 precache）。
- 证据截图：`screens/victory-<尺寸>.png`（7 种）、`screens/before-*.png`（修复前）、`screens/after-replay-474x778.png`（重玩态），数据见 `victory-page-results.json`。

## 六、未处理 / 既有问题

- `scripts/test_park_victory_layout.ts`、`scripts/test_park_star_upgrade.ts` 两个既有脚本在本机运行时卡在“进入第 3 关 / 首次引导弹层被拦截”，报错发生在到达结算页断言之前，与本次改动路径无关；本轮未改其流程，结算页门禁由新增的 `test_park_victory_page.ts` 覆盖。
- 新背景由 897×1754 生成结果等比放大到 1046×2048，高 DPI 屏上略软（与仓库其它背景素材同级别）。

## 七、第二轮调整（2026-11-21 晚）

发起人反馈：① 修复成功的大图略微偏大，要小一点点；② 金币已经下线了。

| 项 | 调整 |
|---|---|
| 大图尺寸 | `.park-victory-facility` 高度 100%→88%、宽度 66%→64%，配套光晕 64%→58%、投影收敛；整体约缩小 12%，底边基线不变，所以不会和角色/面板脱开 |
| 金币奖励 | 金币货币已并入「钻石」（`parkProgress` 存档字段仍叫 `coins`，HUD 与商店统一显示为钻石），结算页删掉金币槽，只保留 **星星 + 钻石**；钻石数值取实际入账的 `reward.coins`（首通 100 / 地狱 150），重玩时两个槽位显示「已领取」 |
| 门禁同步 | 奖励槽位数量断言 = 2；断言奖励区不出现 `icon-coin`；重玩断言为 2 个「已领取」 |

验证：`tsc --noEmit`、`vite build` 通过；结算页门禁在 dev 与 preview（生产构建）均通过；截图 `screens/first-455x749.png`（发起人同尺寸）、`screens/replay-390x844.png`。

## 八、第三轮调整（2026-11-21 深夜）

反馈：① 修复物品被三个角色挡住，要往上移一点；② 下面星级/成绩那行显示有问题（被「下一关」按钮压住）。

| 项 | 根因 | 调整 |
|---|---|---|
| 大图被角色遮挡 | 大图底边在 39%，角色头顶在 29.5%，重叠 69px（在 456×763 上占大图高度 33%） | 大图上移并略微收小：`hero` top 8%→6%、height 31%→27%，大图 height 88%→86%；角色 height 20.5%→19%。大图底边 33%，重叠降到 11px（只有头顶发梢压住一点点） |
| 星级/成绩行被按钮压住 | 新加的「获得荣誉称号」横条把面板内容撑高：456×763 下面板可视高 234px，内容需要 247px → 成绩行溢出 12px，正好撞到 `top: 80.5%` 的按钮 | 面板 31.2%→32.2%、上内边距 4.8→4.2cqw；荣誉条 5.8/0.6/0.8→5.2/0.45/0.6cqw；奖励牌 6.9→6.6cqw、奖励卡 18.5→17.5cqw；按钮行 top 80.5%→81.6%、高度 7.8%→7.2%。改完 456×763 下内容高 242px、可视高 242px，成绩行距面板底 6px、按钮距面板底 11px |
| 门禁同步 | — | 新增 `456×763` 视口（发起人同尺寸）；新增断言「成绩行必须在面板内」「大图被角色遮挡 ≤ 4.5%」 |

验证：1~6 关（迎宾门/星灯柱/售票亭/气球摊/喷泉/长椅）在 456×763 下全部 occlusion=11px、scoreInside=6px、actionGap=11px；门禁 8 种视口在 dev 与生产构建均通过。截图：`screens/first-456x763.png`、`screens/level6-456x763.png`。


