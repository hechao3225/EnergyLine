# 12 个展品图标 · 生图规格（风格锁定 v5）

> **状态：v5 已定稿（2026-11-13，不再改动）。** 用户先确认了旋转木马样图 `carousel-sample-v5.png` 和胜利页 mock，再按同一套 prompt 批量生成 12 张。核心是**高亮通透 + 暖金发光 + 中低饱和粉紫**，解决了前几版发暗/发灰/荧光的问题。
>
> 迭代对照：[v1 粉金](exhibit-icons-contact-v1-pinkgold.png) · [v2 鲜艳紫](exhibit-icons-contact-v2-vividpurple.png) · [v3 过淡](exhibit-icons-contact-v3-pastel.png) · [v4 中低调但偏暗](exhibit-icons-contact-v4-midpastel.png) · [v5 当前](exhibit-icons-contact.png)

## 风格锚点

| 类型 | 文件 | 用途 |
|---|---|---|
| 色相/明度锚点 | 用户提供的浮空岛截图 + `public/assets/park/island.webp` | 明亮粉紫、奶油、暖金发光、通透感 |
| 已确认样图 | `carousel-sample-v5.png`、`victory-carousel-mock.png` | 批量基准：高亮、暖金、粉紫、圆润 3D |
| 体积/材质锚点 | `public/assets/park/carousel.webp` | 圆润玩具比例、星形装饰、3D 糖皮质感 |
| v5 成品 | `public/assets/park/exhibit-*.webp` | 12 张高亮粉紫图标 |

## 统一风格描述（v5）

> Bright luminous 3D cartoon game icon of {subject}, dreamy candy amusement-park style, chunky rounded forms, high-key airy lighting. Palette: bright pastel lavender #C9A7E8, orchid pink #F0A6CE, creamy white #FFF8F0, glowing warm gold #FFD36E, soft moon-white highlights. {detail} Warm light glows from the star and lamps; soft sparkle and gentle bloom. Medium-low saturation but bright and radiant; NOT dark, NOT gray, NOT muddy, NOT muted, NOT neon, NO deep violet. Glossy soft 3D toy material, gentle clear highlights, bright airy shadows, single object centered, 3/4 front view. Isolated on a flat solid pure chroma-key green background #00FF00, uniform green, no gradient, no shadow, no floor, no background scenery, no text, no letters, no numbers, no frame. The icon itself must not contain any green color.

## 12 个图标

| # | 文件名 | 主体 | v5 高亮落点 |
|---:|---|---|---|
| 1 | `exhibit-carousel` | 旋转木马 | 已确认样图；粉紫顶棚、暖金顶星与檐灯 |
| 2 | `exhibit-wheel` | 摩天轮 | 粉紫车厢、暖金星轮毂、檐圈灯 |
| 3 | `exhibit-fountain` | 喷泉 | 粉紫水盘、浅青发光水、暖金水冠 |
| 4 | `exhibit-arch` | 迎宾门 | 粉紫立柱、暖金星牌匾与两盏灯 |
| 5 | `exhibit-lamp` | 星光灯柱 | 暖金星灯泡、奶油灯罩、粉紫柱 |
| 6 | `exhibit-stage` | 小舞台 | 粉紫帷幕、暖金台口、舞台灯 |
| 7 | `exhibit-balloon` | 热气球 | 粉紫/奶油条纹、暖金篮与星徽 |
| 8 | `exhibit-train` | 乐园小火车 | 粉紫车身、暖金车灯、奶油车窗 |
| 9 | `exhibit-aquarium` | 玻璃水族箱 | 浅青发光水、暖金星顶、粉紫底座 |
| 10 | `exhibit-telescope` | 黄铜望远镜 | 暖金镜身、粉紫三脚架、发光星镜片 |
| 11 | `exhibit-toy` | 发条玩具 | 粉紫外壳、暖金发条、发光星胸标 |
| 12 | `exhibit-clock` | 乐园钟 | 粉紫钟体、暖金指针、窗内暖光 |

## 生成路线（本机已验证）

- gateway：`https://api.thqllm.com/v1`
- 模型：`gpt-image-2-1k`。该 gateway 上 `gpt-image-2` / `gpt-image-2.5` 会返回 502，`gpt-image-2-1k` 是实际可用的 gpt-image-2 1024 变体；`gpt-image-2.5-flare-1k` 作为备用。
- helper：`~/.agents/skills/sub2api-imagegen/scripts/images_api_generation.py`
- 参数：1024×1024 请求（实际 1254×1254），`quality high`，`background opaque` + 纯绿底提示
- 后处理：绿底移除、边缘去绿、裁边、8% 边距、512×512 WebP；不使用代码绘制画面内容

## 验收

- 12 张 512×512 RGBA、透明角、无绿边、无裁切、无文字；运行时无失败图片请求。
- 首页设施卡、图鉴、胜利页、棋盘目标均使用 v5，和参考图亮度/粉紫色相统一。
- 对照：`exhibit-icons-contact.png`（v5）

## v6 图鉴唯一化（1–99，2026-11-14）

图鉴有 99 件藏品，但此前只有 12 个 `artKey` 分类，导致第一页出现大量重复的灯/拱门/机器人。本轮已把 **99 件全部改为每关一张独立图标**：

- 文件：`public/assets/park/exhibit-001.webp` … `exhibit-099.webp`
- 数据：`src/content/collection.ts` 的 1–99 `artKey` 改为 `exhibit-001`…`exhibit-099`（99 个 key 全部唯一）
- 生成器：`artKeyFor(facility, levelId)` 对 1–99 全部返回独立 key；12 个分类 artKey 不再被藏品使用
- 测试：artKey 校验改为允许 `exhibit-###`；`test_theme_content` 通过
- 画风：继续使用 v5 高亮粉紫 + 暖金；每件单独出图，不再复用 12 类
- 对照：[第一页](collection-page1.png)、[第二页](collection-page2.png)、[第三页](collection-page3.png)、[第四页](collection-page4.png)、[第五页](collection-page5.png)；[1–20](exhibit-icons-contact-1-20-unique.png)、[21–40](exhibit-icons-contact-21-40-unique.png)、[41–60](exhibit-icons-contact-41-60-unique.png)、[61–80](exhibit-icons-contact-61-80-unique.png)、[81–99](exhibit-icons-contact-81-99-unique.png)

图鉴 5 页已全部无重复；测试新增 artKey 唯一性断言，防止以后回退。
