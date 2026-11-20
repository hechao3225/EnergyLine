# 视觉与功能验收报告

## 结论

本轮商店扩充的购买、玩家路径、主题切换、补给使用、装扮展示和非主线提示禁用通过验收。clean archive 生成 53 张截图，尺寸与视口完全一致，所有 `<img>` 的 `naturalWidth > 0`，未发现文字截断、页面根层溢出、弹窗框越界或首页展台遮挡。

验收发现并修复一项真实视觉问题：实验场入口覆盖旋转木马展台底部。修复后已重新构建、重新点击并重拍全部证据。

## 环境与基线

| 项目 | 值 |
| --- | --- |
| 最终代码提交 SHA | `3b88df73c00247835ce0b23e217f91b67d2ccbc3` |
| 构建 | Vite 8.3.6 生产构建 |
| 浏览器 | Chrome，Playwright headless |
| 截图倍率 | 1，原尺寸输出 |
| 素材运行时 | Python 3.12，Pillow 13.0.0 |
| 联系表 | 1500×7700 JPEG，SHA-256 `1b67cc04b6b204174268fccce8afe216a0a312cc1b4a3389dd976296795282f1` |
| 结构化证据 | `browser-results.json` |

生产构建命令 `pnpm build` 通过。构建仅报告主 JS chunk 超过 500 kB 的非阻塞警告，不影响页面加载与交互。

## 状态 × 视口矩阵

每个“通过”同时表示：真实点击到达、截图尺寸精确、图片已解码、无目标文字溢出、无根层越界。

| 状态 | 360×800 | 390×844 | 430×932 |
| --- | --- | --- | --- |
| 首页默认 | 通过 | 通过 | 通过 |
| 首页全装扮 + calm | 通过 | 通过 | 通过 |
| 商店补给 | 通过 | 通过 | 通过 |
| 商店装扮 | 通过 | 通过 | 通过 |
| 背包 | 通过 | 通过 | 通过 |
| 3 步透镜 | 通过 | 通过 | 通过 |
| 历史回针 | 通过 | 通过 | 通过 |
| 步数耗尽线圈 | 通过 | 通过 | 通过 |
| 线圈补回 3 步 | 通过 | 通过 | 通过 |
| 无尽挑战提示禁用 | 通过 | 通过 | 通过 |

购买状态矩阵：

| 状态 | 360×800 | 430×932 |
| --- | --- | --- |
| 补给顶部 / 底部 | 通过 | 通过 |
| 装扮顶部 / 底部 | 通过 | 通过 |
| 余额不足 | 通过 | 通过 |
| 未开放 | 通过 | 通过 |
| 已拥有 / 使用中顶部 / 底部 | 通过 | 通过 |
| 展品选择器 | 通过 | 通过 |
| 购买后首页 / 背包 | 通过 | 通过 |

补给与装扮底部截图均由真实鼠标滚轮滚动后拍摄，`purchase-results.json` 记录每个状态的 `scrollTop`。390×844 另保留购买后展品选择器截图。截图文件位于 `screens/`，命名为 `<状态>-<宽度>x<高度>.png`；最终联系表包含 53 张证据。

## 玩家路径校验

### 首页装扮与主题

- 40 关可达存档刷新后，`html[data-theme="calm"]` 正确恢复。
- 三个伙伴的图片源分别为 `outfit-sheep-starlight.webp`、`outfit-rabbit-starlight.webp`、`outfit-spirit-starlight.webp`。
- 三张开心表情全部可见且 `naturalWidth > 0`。
- 第 21 关展品显示“旋转木马”；展台与实验场入口、标题、侧栏和伙伴区域均无遮挡。
- 展品设为 5、但只修复 1–4 关时，首页不显示展台。

### 主题覆盖与即时切换

- calm 存档无 URL 参数刷新，保持 calm。
- calm 存档访问 `?theme=default`，切换为 default。
- default 存档访问 `?theme=calm`，切换为 calm。
- 商店“宁静夜灯”点击“恢复默认”后即时移除主题；点击“使用”后即时恢复 calm。

### 补给与状态反馈

- 火花透镜打开通路提示并显示 3 条连续操作。
- 时光回针从库存 1 用至 0，历史弹窗即时显示“余 0”和“时光回针已使用”。
- 步数耗尽后显示应急线圈入口；使用后剩余步数从 0 恢复为 3。
- 无尽挑战顶部“提示”按钮为 disabled，背包中的“使用提示灯泡”同时禁用。
- 主线提示库存耗尽后，顶部“提示”按钮禁用；背包仍可通过“前往商店”进入补给页。
- 工坊与实验场使用同一主线限定判断；自动路径覆盖无尽挑战，代码条件覆盖 `story` 以外的全部玩法。
- 重置流程兼容两套确认 UI：clean HEAD 的三次重置均实际记录为“原生 window.confirm”；当前工作区的三次重置均实际记录为“游戏内确认弹窗”。

### 真实购买

- 初始状态为 40 关已修复、7000 钻石、四类补给均为 0、未拥有装扮。
- 依次购买提示灯泡 120、火花透镜 260、时光回针 180、应急线圈 300，以及开心问候 450、星愿礼服 900、星空展台 1200、宁静夜灯 1800。
- 最终钻石为 1790；四类补给库存均为 1；四件装扮全部进入 `ownedCosmetics`。
- 装备 joy、starlight、calm，并选择第 21 关旋转木马为展品，最终 `equippedCosmetics` 为 `joy/starlight/21/calm`。
- 50 钻石状态四件补给按钮均为 disabled 并显示“钻石不足”；仅修复 4 关时四件装扮均为 locked 且不可购买。
- 购买后按钮切换为“使用/选择展品”，装备后切换为“恢复默认/更换展品”。

## 素材真实性

10 个商店资源与 `shop-assets.json`、主 manifest 的 name/file/source/size/bytes/sha256/alpha/processing 元数据一致。透明资源使用 `alpha > 28` 计算 bbox；宁静主题预览的 `has_alpha=false`，不按透明资源处理。`mood-joy` 的三个组合来源均记录为完整仓库相对路径。

`prepare_shop_assets.py --check` 同时比较 name/file/source/size/processing/透明 metadata。负向验证脚本先确认确定性清单通过，再分别篡改 `mood-joy` 的 processing 与 source，两者均按预期失败。

| 资源 | 尺寸 | 通道 | alpha bbox |
| --- | --- | --- | --- |
| icon-lens | 512×512 | RGBA | 56,33,455,480 |
| icon-coil | 512×512 | RGBA | 114,32,398,480 |
| outfit-sheep-starlight | 951×1017 | RGBA | 14,14,937,1008 |
| outfit-rabbit-starlight | 719×1024 | RGBA | 14,5,705,1019 |
| outfit-spirit-starlight | 988×1015 | RGBA | 14,8,974,1001 |
| mood-sheep-happy | 144×100 | RGBA | 11,9,137,89 |
| mood-rabbit-happy | 144×132 | RGBA | 13,6,131,126 |
| mood-spirit-happy | 144×136 | RGBA | 15,15,129,121 |
| mood-joy | 512×256 | RGBA | 24,68,482,188 |
| theme-calm-preview | 512×512 | RGB | null |

透明资源四角 alpha 均为 0；深色、浅色双底色联系表和浏览器渲染均未发现白边、绿边、主体裁切或透明背景异常。礼服与表情在首页使用 `object-fit: contain`，保持原始比例。

浏览器证据中各状态包含 17–53 个图片节点，全部满足 `complete && naturalWidth > 0`。商店两个页签的隐藏资源也在 DOM 中完成解码，因此补给的 4 个图标和装扮的 6 个预览均被覆盖。

## 自动化命令结果

| 命令 | 结果 |
| --- | --- |
| `pnpm exec tsc --noEmit` | 通过 |
| `tsx scripts/test_shop_catalog.ts` | 通过 |
| `tsx scripts/test_park_progress.ts` | 28 项通过 |
| `tsx scripts/test_hint_engine.ts` | 通过 |
| `scripts/prepare_shop_assets.py --check` | 10 个素材与确定性产物一致 |
| `scripts/test_shop_asset_generator.py` | 确定性清单通过；篡改 processing/source 均失败 |
| `scripts/audit_shop_assets.py` | 10 个素材、主 manifest 与联系表通过 |
| clean HEAD `pnpm test` | 通过；不含用户工作区 `audit-distinct` |
| 当前工作区 `pnpm test` | 通过；包含用户未提交 `audit-distinct` |
| `pnpm build` | 通过 |
| clean HEAD `test_shop_supplies.ts` | 9 项通过 |
| clean HEAD `test_shop_home.ts` | 3 视口、30 张截图通过；三次走原生 confirm |
| clean HEAD `test_shop_purchase.ts` | 8 次购买通过；23 张购买状态截图 |
| clean HEAD `test_park_ui.ts` | 13 项真实玩家路径通过 |
| `audit_park_delivery.py` | 188 个资产、53 张截图、3 组设计稿对照通过 |

完整 clean HEAD 验证从 `git archive 3b88df73c00247835ce0b23e217f91b67d2ccbc3` 导出到仓库外 `/private/tmp`，软链接复用 `node_modules`。archive SHA、命令、成功输出、构建产物、日志、53 张截图和联系表哈希记录在 `clean-head-verification.json`。当前工作区保留用户未提交的 manifest 彩度差量和大量资源改动；用户 chroma 与 `audit-distinct` 均未进入 clean archive。

## 未覆盖范围

- 未在 Android 与 iOS 真机重复本轮 53 张矩阵或购买后真实滚轮列表；触控与滚轮命中已通过 Playwright 原生输入验证。
- 未覆盖读屏软件、系统级大字体、横屏与平板布局。
- 未进行弱网、离线 PWA 首装和低端机长时间帧率测试。
