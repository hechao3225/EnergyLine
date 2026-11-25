# 应急线圈 → 加步电池 2026-11-22

## 背景

用户反馈「应急线圈增加步数，语意和图片都不够明确」。方案对比与选择见 `docs/QA/coil-redesign-proposal-2026-11-22/`，最终采用方案 A：**加步电池**（电池 + 大号「+3」+ 爪印）。

## 改了什么

| 位置 | 改前 | 改后 |
| --- | --- | --- |
| 商店名称 | 应急线圈 | **加步电池** |
| 商店描述 | 步数归零后补回 3 步 | **步数用完时，立即补回 3 步** |
| 图标 | `icon-coil`（弹簧 + 电光蓝） | `icon-step`（电池 + 大号「+3」+ 爪印） |
| 步数耗尽遮罩按钮 | 使用应急线圈 · 余 N | **使用加步电池 · 余 N** |
| 无库存引导 | 应急线圈不足 · 去商店补 | **加步电池不足 · 去商店补** |
| 补步成功提示 | 应急线圈已补回 3 步 | **加步电池已补回 3 步** |
| 广告兜底提示 | 广告暂不可用，可用应急线圈 | **广告暂不可用，可用加步电池** |

爪印特意沿用顶栏「步数」的爪印符号，把「+3 步」和步数栏钉在一起。

## 图标资产

- 源图：`docs/UI设计稿2.0/generated-sources/shop/icon-step.png`（1254×1254 白底，`gpt-image-2-1k` 生成；旧 `icon-coil.png` 已删除，历史在 git）；
- 管线：`prepare_shop_assets.py` 的 `icon-step` 条目——白底泛洪去底 → 2px 软边 → 透明裁边 → 512×512 居中画布 → 全站彩度曲线（C\* 高于软膝 6 的部分 ×0.82，封顶 C\*≤76，L\*/色相/alpha 不变）；
- 产物：`public/assets/park/icon-step.webp`，512×512 RGBA，24,498 bytes，sha256 `35d8685c…`；旧 `icon-coil.webp` 删除。

## 影响文件

- 代码：`src/data/shopCatalog.ts`、`src/components/CandyThemeShell.tsx`、`src/utils/adReward.ts`、`src/App.tsx`（后两个是注释）
- 测试：`test_shop_purchase` / `test_shop_supplies` / `test_shop_home` / `test_ad_steps_ui` 的 4 处名称与按钮断言
- 资产与清单：`icon-step.webp`、`icon-step.png`、`icon-coil.webp`/`icon-coil.png`（删除）、`shop-assets.json`、`manifest.json`、`docs/QA/shop-assets-2026-11-20/shop-assets-contact-sheet.png`
- 脚本：`prepare_shop_assets.py`（新增 `ICON_CHROMA_SOFT` 的 `global` 模式）、`audit_shop_assets.py`、`scripts/migrate_shop_step_icon.py`（幂等迁移）
- 文档：`docs/UI设计稿2.0/generated-sources/shop/README.md`、`docs/QA/shop-assets-2026-11-20/README.md`

## 验收

| 项 | 结果 |
| --- | --- |
| `tsc --noEmit` | 通过 |
| `audit_shop_assets.py` | `icon-step` 通过（512×512、24,498 bytes、alpha 0–255）；mood 三项失败是既有问题（11-21 表情重绘后期望尺寸/文案未同步），与本次无关 |
| `prepare_shop_assets.py --check` | 同上，卡在 mood 的 processing 文案；`icon-step` 已通过确定性 bytes/sha 比对 |
| `test_shop_purchase` | 通过（23 张购买状态截图） |
| `test_ad_steps_ui` | 6/6 通过，含「使用加步电池 · 余 1」「加步电池不足 · 去商店补」 |
| `test_shop_supplies` | 「加步电池更新当前历史快照，撤销后恢复 3 步」等 7 项通过；2 项失败都是 `.park-play-tools` 里的「背包」按钮被其他在途改动移除（工作区未提交 diff 可见），属既有问题 |
| `test_shop_home` | 同一既有问题：360×800 第一步就找不到「背包」按钮 |
| 实机截图 | 390×844 / 430×932 商店卡、步数耗尽遮罩（见下图） |

真实 Chrome 截图确认：卡片文字、库存、价格、按钮均正常；步数耗尽遮罩按钮变为「使用加步电池 · 余 2」。

## 未覆盖

- `dist/` 与 Android 里仍是旧素材，发版前需要 `npm run build`（必要时 `npx cap sync android`）；
- 历史设计文档（`docs/superpowers/specs/2026-11-20-shop-expansion-design.md` 等）保留旧名，作为当时记录；
- 商店背包列表、无尽关/实验关的补给入口逻辑不变，只变文案与图标。

## 回滚与调档

- 文案：`src/data/shopCatalog.ts` + `src/components/CandyThemeShell.tsx` 的四处字符串；
- 图标：替换 `docs/UI设计稿2.0/generated-sources/shop/icon-step.png` 后跑
  `SHOP_ASSETS_PYTHON=/private/tmp/rotategame-shop-assets/bin/python /private/tmp/rotategame-shop-assets/bin/python scripts/migrate_shop_step_icon.py`；
- 想整体改名：同步改 4 个测试与两份 README 的表格即可。

## 截图

| 文件 | 说明 |
| --- | --- |
| `00-card-before-after.png` | 商店卡片改前 / 改后 |
| `01-icon-before-after.png` | 图标放大对比 |
| `390x844-shop-card.png` / `430x932-shop-card.png` | 改后商店卡片（3 倍图） |
| `390x844-shop.png` / `430x932-shop.png` | 改后商店整页 |
| `390x844-out-of-steps.png` / `430x932-out-of-steps.png` | 步数耗尽遮罩（按钮已改名） |
