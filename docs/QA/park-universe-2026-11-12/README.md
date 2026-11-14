# 乐园宇宙主题重构 · 第一轮视觉验证

日期：2026-11-12 / 更新：2026-11-13
视口：390 × 844（DPR 2），真实交互使用本机 Vite dev server（`http://127.0.0.1:4174`）。

## 已完成

- 世界观：能量管道乐园 / 乐园修复师 / 小羊玩家化身 / 白兔游客 / 能量精灵向导 / 熊猫园长。
- 99 关展示文案：标题、副标题、提示、胜利语进入 `src/content/levels.ts`；关卡布局与 par 保持原样。
- 99 件乐园藏品：`src/content/collection.ts`；图鉴从「百花图鉴」改为「乐园图鉴」。
- 11 个区域：`src/content/zones.ts`；首页侧边新增「乐园宇宙」入口，世界地图显示中心可玩、10 个主题区即将开放。
- 14 个成就：ID 不变、文案乐园化；修正「实际通关第 5/10 关」与「重复刷同一关不计连续完美」。
- 首页卡片顺序修正为 1/2/3；选关按分区显示 `0/20 处设施`；胜利页显示本关具体设施名与动态清单。
- 无尽/工坊提示标题修正：不再出现「第 -1 关」「第 999 关」。
- **12 个展品图标 v5 已定稿**：先确认旋转木马样图与胜利页 mock，再按“高亮通透 + 暖金发光 + 中低饱和粉紫”批量出 12 张；`gpt-image-2-1k` 生成，统一抠绿底、裁边、8% 边距、512×512 WebP。
- **图鉴 1–99 全部唯一化**：99 件藏品已全部改为每关独立图标（`exhibit-001`…`exhibit-099`），5 页无重复；证据：[第一页](collection-page1.png)、[第二页](collection-page2.png)、[第三页](collection-page3.png)、[第四页](collection-page4.png)、[第五页](collection-page5.png)、[1–20](exhibit-icons-contact-1-20-unique.png)、[21–40](exhibit-icons-contact-21-40-unique.png)、[41–60](exhibit-icons-contact-41-60-unique.png)、[61–80](exhibit-icons-contact-61-80-unique.png)、[81–99](exhibit-icons-contact-81-99-unique.png)。
- 迭代对照：[v1 粉金](exhibit-icons-contact-v1-pinkgold.png) · [v2 鲜艳紫](exhibit-icons-contact-v2-vividpurple.png) · [v3 过淡](exhibit-icons-contact-v3-pastel.png) · [v4 偏暗](exhibit-icons-contact-v4-midpastel.png) · [v5 当前](exhibit-icons-contact.png) · [已确认样图](carousel-sample-v5.png) · [胜利页 mock](victory-carousel-mock.png)。
- **棋盘目标也换成对应设施图标**：第 1 关显示紫色迎宾门，不再统一显示旋转木马；关卡目标与图鉴/胜利页一致。

## 生图通道（2026-11-13）

- 持久环境文件：`~/.config/ai/imagegen.env`（600，不在仓库）。
- `OPENAI_BASE_URL=https://api.thqllm.com/v1`，`OPENAI_IMAGE_MODEL=gpt-image-2-1k`；`gpt-image-2` / `gpt-image-2.5` 在该 gateway 上返回 502，`gpt-image-2-1k` / `gpt-image-2.5-flare-1k` 可用。
- 已写入 `~/.zshenv`、`~/.zshrc`、`~/.bash_profile`、`~/.bashrc`、`~/.profile`，并注册 `~/Library/LaunchAgents/com.lxjj.imagegen-env.plist`，登录后通过 `launchctl setenv` 进入 GUI 会话。
- Skill 更新：`~/.agents/skills/sub2api-imagegen/SKILL.md`、`scripts/images_api_generation.py`（stdlib Images API，无 SDK 依赖）、`scripts/hosted_image_generation.py`（env/file 优先）。
- 生成记录：`docs/UI设计稿2.0/generated-sources/generation-records.json` 的 `park_universe_exhibits`。

## 证据

| 页面 | 截图 |
|---|---|
| 首页（新图标） | [home-icons.png](home-icons.png) |
| 世界地图 | [world-map.png](world-map.png) |
| 选关 | [level-select.png](level-select.png) |
| 关卡（新目标图标） | [play-icons.png](play-icons.png) |
| 胜利（迎宾门） | [victory-icons.png](victory-icons.png) |
| 图鉴（新图标） | [collection-icons.png](collection-icons.png) |
| 提示 | [hint.png](hint.png) |
| 修复手册 | [profile.png](profile.png) |
| 12 图标对照 | [exhibit-icons-contact.png](exhibit-icons-contact.png) |

## 已知占位（下一步）

- 世界地图 10 个主题区节点暂用现有图标；区域主视觉在 Phase 4 逐区生成。
- 首页浮空岛插画里的旋转木马仍是原画的一部分；如需也统一成紫版，需要重生成 `island` 背景。
- 99 关文案中 1–20 为待审样板；21–99 为同模板草稿，待语气确认后批量润色。

## 验证命令

```bash
npx tsx scripts/test_circuits.ts          # 5/5
npx tsx scripts/test_park_progress.ts     # 9/9
npx tsx scripts/test_theme_content.ts     # 99 关文案/99 藏品/11 区/14 成就/布局指纹
npx tsx scripts/audit_theme.ts            # 0 处旧世界观词
npx tsx scripts/solve-min-par.ts          # 99/99，0 修正
```

本机 `vite build` 受 rolldown 原生绑定签名限制无法执行；类型检查（`tsc --noEmit`）的 `src` 无错误。构建验证需在正常环境补跑。
