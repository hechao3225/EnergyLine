# 角色 IP 资产补齐与修复验收（2026-11-21）

范围：主角三人组「星芽 / 波铃 / 云绒」的表情、角色头像与庆祝姿态。
结论：资产已补齐并登记清单；同时发现并修复了旧表情贴图全部残缺的问题（商店「开心问候」此前显示的即是残片）。

## 1. 发现的问题

旧素材包 `assets/energy_park_art_pack_v1/02_characters/expressions/` 下 9 张表情（happy / wink / sleep × 3 角色）每一张都是从合图误切的残片：

- 星芽：只剩半张脸；
- 波铃：只剩头顶和触角；
- 云绒：只剩一块紫色背景和白色团块。

这些残片被 `scripts/prepare_shop_assets.py` 原尺寸转成了 `mood-*-happy.webp`，所以商店「开心问候」上线后一直显示残缺头像。修复前对照见 `expressions-before-after.png`（上半部分为新表情，下半部分为旧残片）。

## 2. 处理结果

### 2.1 表情（15 张）

5 种情绪 × 3 角色，统一宽度 144px、透明底，写回素材包并更新 `assets/energy_park_art_pack_v1/manifest.json`（asset_count 100 → 106）：

| 情绪 | 文件 | 用途 |
| --- | --- | --- |
| 开心 | `{id}_happy.png` | 首页问候、成功反馈 |
| 眨眼 | `{id}_wink.png` | 问候、提示 |
| 睡觉 | `{id}_sleep.png` | 休息、加载 |
| 惊讶 | `{id}_surprised.png` | 引导、障碍提示 |
| 星星眼 | `{id}_sparkle.png` | 奖励、通关 |

### 2.2 运行时表情重出

`mood-sheep-happy.webp`、`mood-spirit-happy.webp`、`mood-rabbit-happy.webp`、`mood-joy.webp` 全部按新表情重出，尺寸与合并规则保持不变，`public/assets/park/manifest.json` 与 `shop-assets.json` 已同步。

### 2.3 角色头像（128 / 256 两档）

17:2x 返工：原先是从设计图 48×48 图标区裁切再放到 96×96，3 倍屏上被拉伸约 1.6 倍，带死的紫色方块底，且三张取景比例不一。第三次返工改为取运行时主立绘 `sheep` / `spirit` / `rabbit.webp`：这三张本来就是透明的正式立绘，画质干净、和设计稿是同一套形象。

为什么不直接从设计稿抠：实测云绒毛色 `(253,243,252)` 与面板底色 `(254,244,253)` 几乎完全相同，纯色/阈值/泛洪分割在数学上无法分开；生图原图路径虽然干净，但和设计稿的柔和质感有差距。主立绘是现成的透明产出，绕开了这个死结。

取景用整只完整放入（contain，不裁切任何部位）：先前按“头部特写”取景会把星芽的耳尖、波铃的天线球与下沿、云绒的下巴切掉，属于返工缺陷。现在透明裁边后按最长边等比缩放到画布的 96%，居中到 256，`@2x` 供 3 倍屏。

| 正名 | 128×128 | 256×256 |
| --- | --- | --- |
| 星芽 | `avatar-xingya.webp` | `avatar-xingya@2x.webp` |
| 波铃 | `avatar-boling.webp` | `avatar-boling@2x.webp` |
| 云绒 | `avatar-yunrong.webp` | `avatar-yunrong@2x.webp` |

### 2.4 云绒庆祝姿态

`rabbit-cheer.webp` 已生成并接入胜利结算页；胜利页三位伙伴现在都使用 cheer 姿态（`sheep-cheer` / `spirit-cheer` / `rabbit-cheer`）。

## 3. 校验

- `python scripts/prepare_character_ip_assets.py --check`：通过，runtime 204 条、shop 10 条、art 106 条一致。
- 运行时新增资产四角 alpha 均为 0；尺寸与清单一致；sha256 校验通过。
- 素材包 106 条：本轮 15 张表情与其余素材尺寸一致；`07_previews/` 下 3 张旧预览图在仓库中缺失，属既有问题，不影响本轮表情 / 头像 / 庆祝姿态。
- `expressions-before-after.png`、`avatars-contact.png`、`yunrong-cheer-preview.png` 为人眼验收图。

## 4. 生成与处理

- 模型：`gpt-image-2.5`（按全局约定优先使用 2.5；一次通过，未降级）。
- 路由：OpenAI 兼容 `/images/edits`，`~/.config/ai/imagegen.env`；客户端沿用 `.tmp-victory-art/edit_client.py` 的调用方式。
- 原始白底图与提示词：`docs/UI设计稿2.0/generated-sources/character-ip/`。
- 处理脚本：`scripts/prepare_character_ip_assets.py`。

## 5. 未覆盖 / 后续

- 头像 `avatar-*` 已接入「修复师档案」（原「修复手册」）的乐园伙伴区：界面约 60px 显示，`@2x` 256 素材适配高密度屏；首页头像位与档案页大立绘复用同一组文件。
- 运行时 Art name 仍为 `sheep` / `rabbit` / `spirit`，与正名的映射见角色设定集第 5.3 节；本轮未重命名，避免牵动存档与素材清单。
- 历史文档（2026-11-12 主题规格、旧 QA 报告）中的「小羊 / 白兔 / 能量精灵」作为历史记录保留，不再作为当前设定。

## 6. 证据文件

| 文件 | 内容 |
| --- | --- |
| `expressions-before-after.png` | 旧残片 vs 新表情对照 |
| `expressions-contact.png` | 15 张新表情全表（白底 / 深底） |
| `avatars-contact.png` | 96 / 48 头像对照 |
| `yunrong-cheer-preview.png` | 云绒庆祝姿态 |
| `character-ip-audit.json` | 生成与运行时资产清单快照 |
