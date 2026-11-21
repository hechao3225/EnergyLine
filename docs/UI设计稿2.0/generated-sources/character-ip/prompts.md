# 角色 IP 表情与庆祝姿态生成记录

日期：2026-11-21
模型：`gpt-image-2.5`（按全局约定优先使用 2.5；一次通过，未降级）
路由：OpenAI 兼容 `/images/edits`，配置来自 `~/.config/ai/imagegen.env`（`OPENAI_BASE_URL` / `OPENAI_API_KEY` / `OPENAI_IMAGE_MODEL`），客户端脚本沿用仓库内 `.tmp-victory-art/edit_client.py` 的调用方式。
输入：`public/assets/park/sheep.webp`、`spirit.webp`、`rabbit.webp` 放大 2× 并铺白底；云绒庆祝姿态以 `yunrong_main.png` 为输入。
输出：`docs/UI设计稿2.0/generated-sources/character-ip/*_raw.png`（1024×1024 白底原图）。

## 通用提示词

> Edit this cute chibi 3D cartoon game character. Keep EXACTLY the same character design: {角色外观}. Produce a clean HEAD-AND-SHOULDERS sticker crop of the same character, centered with generous empty margin, same camera angle. {情绪描述} Flat pure white background (#FFFFFF), no shadow, no aura, no extra shapes, no extra props, no text, no border, no watermark. Only the character.

## 角色外观段

- 星芽：the same cream-white chibi fawn with two big round ears, curly wooden antlers sprouting green leaf buds, copper aviator goggles on the forehead, pink inner ears, green scarf with a gold star badge, same 3D candy-render style and colors.
- 波铃：the same chibi blue-teal jelly water-drop spirit with a single curly antenna ending in a glowing yellow orb, translucent pink-purple fin hands, rosy cheeks, sparkling light dots inside the glossy body, same 3D candy-render style and colors.
- 云绒：the same chibi white fluffy cloud rabbit with two long UPRIGHT rounded ears (do not make the ears floppy or droopy), lavender inner ears, rosy cheeks, gold star medal on the chest, thin golden halo ring behind the head, same 3D candy-render style and colors.

## 情绪段

- happy：Expression: bright happy smile with open mouth and sparkling eyes, joyful and warm.
- wink：Expression: playful wink, one eye closed in a happy curve while the other eye stays open and sparkling, open smiling mouth.
- sleep：Expression: sleeping peacefully, both eyes closed in soft happy curves, relaxed small smile, calm and cozy. No letters, no Z symbols, no text.
- surprised：Expression: surprised gasp, both eyes wide open and round with bright highlights, small raised brow, mouth open in a small rounded O shape.
- sparkle：Expression: amazed starry-eyed joy, the eyes have big sparkling star-shaped highlights, joyful open-mouth smile, tiny star sparkles around the eyes.

## 云绒庆祝姿态

> Edit this cute chibi 3D cartoon game character. Keep EXACTLY the same character design: {云绒外观}. ONLY change the pose to a joyful celebration: both front paws raised up, body slightly bouncing, eyes closed in a happy smile, mouth open cheering. Keep the gold star medal, halo ring and cloud base. Whole character inside the frame, centered with a little empty margin. Flat pure white background (#FFFFFF), no shadow, no floor, no text, no letters, no confetti, no extra props, no border, no watermark. Clean sticker asset for transparent cutout.

## 文件对照

| 输出文件 | 输入 | 状态 |
| --- | --- | --- |
| `xingya_happy_raw.png` | `sheep.webp` 2× | 重新绘制，用于替换旧开心表情 |
| `xingya_wink_raw.png` | `sheep.webp` 2× | 重新绘制，替换旧眨眼表情 |
| `xingya_sleep_raw.png` | `sheep.webp` 2× | 重新绘制，替换旧睡觉表情 |
| `xingya_surprised_raw.png` | `xingya_happy.png` 4× | 首批生成，保留 |
| `xingya_sparkle_raw.png` | `xingya_happy.png` 4× | 首批生成，保留 |
| `boling_happy_raw.png` | `spirit.webp` 2× | 重新绘制 |
| `boling_wink_raw.png` | `spirit.webp` 2× | 重新绘制 |
| `boling_sleep_raw.png` | `spirit.webp` 2× | 重新绘制 |
| `boling_surprised_raw.png` | `boling_happy.png` 4× | 首批生成，保留 |
| `boling_sparkle_raw.png` | `spirit.webp` 2× | 重新生成（首版背景异常） |
| `yunrong_happy_raw.png` | `rabbit.webp` 2× | 重新绘制 |
| `yunrong_wink_raw.png` | `rabbit.webp` 2× | 重新绘制 |
| `yunrong_sleep_raw.png` | `rabbit.webp` 2× | 重新绘制 |
| `yunrong_surprised_raw.png` | `rabbit.webp` 2× | 重新生成（首版耳形偏差） |
| `yunrong_sparkle_raw.png` | `rabbit.webp` 2× | 重新生成（首版耳形偏差） |
| `yunrong_cheer_raw.png` | `yunrong_main.png` 2× | 新增庆祝姿态 |

## 处理

白底原图统一走 `scripts/prepare_character_ip_assets.py`：边界近白泛洪去底 → 透明裁边 → 表情缩放至宽 144px、庆祝姿态最长边 400px → 写回素材包与运行时清单。头像由设计图 48×48 图标区裁切，圆角遮罩去底后输出 48/96 两档。
