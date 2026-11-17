# 奖励图标糖果果冻尝试（2026-11-14，已回滚）

> 结论：发起人反馈「更丑了」，已恢复图集原图标。本文与 `raw/`、成品 PNG 保留作为素材记录，管线里没有任何引用。

发起人反馈胜利页「修复奖励」里的金币和星星偏红、不好看，希望像蓝色果冻精灵那样的糖果质感。

## 做法

按项目约定走生图工具（不使用代码绘制画面），路由与参数：

| 项 | 值 |
| --- | --- |
| 路由 | `~/.agents/skills/sub2api-imagegen/scripts/images_api_generation.py`（images API） |
| 网关 / 模型 | `https://api.thqllm.com/v1` / `gpt-image-2-1k` |
| 尺寸 / 质量 | 1024×1024 / high，`--background opaque`（该模型不支持透明底） |
| 原始生成图 | `docs/UI设计稿2.0/generated-sources/candy-icons/raw/` |
| 透明成品 | `docs/UI设计稿2.0/generated-sources/candy-icons/icon-{star,coin,gem}.png`（512×512 RGBA） |

抠图脚本在主机上跑：绿幕色度键 → 按 `C = (P-(1-a)Bg)/a` 反预乘去溢色 → 裁边 → 补方形 → 512。边缘不留绿边/暗边。

生成的是三件一套的果冻材质：

- **星星**：淡紫→紫罗兰渐变果冻，白色高光（另有粉色备选 `raw/icon-star-pink.png`）
- **金币**：蜜糖果冻圆币，中心压印五角星
- **宝石**：青→粉虹彩果冻切面

## 接入

`scripts/prepare_park_assets.py` 在跑完图集切片后，若 `docs/UI设计稿2.0/generated-sources/candy-icons/` 存在，会用这三张成品覆盖 `icon-star / icon-coin / icon-gem`（`asset(..., trim=False, square=False)` 保持 512 画布），参数与其它图标一致，管线可复现。

## 影响范围

这三个图标是全局的，因此同时作用在：

- 胜利页「修复奖励」三个数值
- 结算页的星级（4 星评分）
- 首页顶部资源条（星级 / 金币 / 钻石）
- 商店、任务、背包等使用 `Icon name="coin|gem|star"` 的界面

真机证据（Chrome 390×844 DPR3）：`victory-rewards.png`、`victory-390x844.png`、`header-resources.png`、`icons-before-after.png`。

## 备选

如果觉得紫罗兰星星还是偏冷，`raw/icon-star-pink.png` 是粉版（同样工艺），换掉 `candy-icons/icon-star.png` 再跑一次管线即可。


## 回滚记录

- `scripts/prepare_park_assets.py` 中的 candy 覆盖段已删除；
- `icon-star / coin / gem` 重新从 `docs/UI设计稿2.0/generated-sources/icons.png` 切片生成，尺寸 249/240/254，与 `HEAD` 版本逐像素平均差 ≤0.5（仅 WebP 编码器差异）；
- 真机复核：奖励条恢复金色星星 / 金币 / 粉蓝宝石，顶部资源条同步恢复。
