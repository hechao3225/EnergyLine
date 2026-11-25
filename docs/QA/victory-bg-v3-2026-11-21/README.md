# victory-bg-v3 生成记录（2026-11-21）

## 交付
| 项目 | 值 |
|---|---|
| 最终文件 | `public/assets/park/victory-bg-v3.webp` |
| 尺寸 | 1046 × 2048（宽高比 0.51074，与源图 victory-bg-v2.webp 完全一致） |
| 字节数 | 188,228 B（约 184 KB） |
| 格式 | WebP，quality=90，method=6，RGB 不透明（无 alpha 通道） |
| PNG 源 | `docs/UI设计稿2.0/generated-sources/victory-bg-v3.png`（897×1754，生成结果原始副本，2,008,716 B 级） |
| 后处理 | 仅等比：居中裁掉 1px 宽至 896×1754（比例对齐 1046:2048）→ LANCZOS 等比放大至 1046×2048 |

## 路由与模型
- 端点：OpenAI 兼容图像网关 `{OPENAI_BASE_URL}/images/edits`（OpenAI Images "edit" 语义），凭据来自 `~/.config/ai/imagegen.env`。
- 模型：**gpt-image-2-1k**，quality=**high**，input_fidelity=**high**，size 请求 1046x2048（网关按 1K 档换算输出 897×1754，比例保持 0.5114）。
- 输入图：`public/assets/park/victory-bg-v2.webp`（1046×2048，风格基准；另以 `docs/UI设计稿2.0/3.png` 为风格/构图基准）。
- 轮次：**共 2 次调用** = 1 次低质量校准（确认比例保持、编辑保真度，产物 `.tmp-victory-art/calib.png`）+ **1 次正式生成**（本交付，`.tmp-victory-art/v1.png`）。无重试轮。

### 关于 CLI 的说明（路由降级原因，不影响模型）
首选命令 `image_gen.py edit` 在本机不可用：其依赖的 `openai` SDK 需要 `pydantic_core` 原生扩展，
本机 venv（以及新装 wheel）的 `.so` 被 macOS Hardened Runtime 的库校验拦截
（`mapping process and mapped file (non-platform) have different Team IDs`）。
因此改用**纯标准库 urllib 的等价客户端**（`.tmp-victory-art/edit_client.py`，与
`sub2api-imagegen/scripts/images_api_generation.py` 同一套 env 读取与 multipart 约定）直连同一网关、同一模型、同一 edit 语义。
仅 HTTP 管线不同，**模型/端点/参数与首选路由完全一致**。

## 提示词要点（完整原文见下）
删除并自然补齐：
1. 顶部红金牌匾 + 两簇金月桂（0%~13% 高）；
2. 中央旋转木马及其全部金饰、马匹、草地圆台、环绕金色光带（约 13%~40% 高、居中）；
3. 下方三个角色（护目镜羊 / 蓝果冻精灵 / 白兔，33%~45%）及其护目镜、耳朵、爪、尾巴、金牌、投影；
4. 底部两枚按钮（紫色「返回乐园」、金色「下一关」）与全部金色 UI 边框、奶油内衬、发光条（78%~96%）；
5. 中部那块纯平粉紫矩形占位（46%~78%）→ 改成连续云层，禁止色块/直边/描边。
保留：彩虹蓝天、顶部放射光射线、星光、右侧白蓝城堡（贴近右缘，纵向 12%~48%）、左侧粉色樱花树（贴近左缘，12%~48%）、云海、底部左右角粉色花簇与绿叶、奶油粉/薰衣草紫/暖金糖果光影。
分区硬约束：10%~42% 高度、中间 60% 宽度只允许天空 + 柔和光晕 + 几缕云；80%~100% 为云海/花海收边；全图禁止文字、角色、游乐设施、按钮/面板/UI。

完整提示词（`.tmp-victory-art/edit-prompt.txt` 同文）：

```
Edit this mobile-game "facility restored" victory background. Keep the exact same art style, same canvas
proportions, and the same palette (creamy pink, lavender purple, warm gold, candy-bright lighting). This is a
background plate only: it will be composited at runtime with transparent game objects, so subjects must be gone.

DELETE COMPLETELY and repaint the area so it blends naturally into the surrounding sky, light rays and clouds:
1) The red-and-gold banner plaque at the very top with its two clusters of golden laurel leaves (top ~0% to 13%
   of the canvas height). Replace it with the same rainbow-blue sky, the radial light rays that continue from
   below, soft clouds and a few twinkling stars. No text, no lettering, no numbers, no plaque, no laurel, no
   emblem, no ribbon anywhere in the image.
2) The carousel in the middle (roughly 13% to 40% of the height, in the horizontal center): the striped
   pink-and-white canopy, the golden star topper, the ring of white horses, the golden pillars, every bit of gold
   trim and filigree, the green grass mound pedestal under it, and the golden light ribbon that swirls around its
   base. Replace all of it with clean, bright, softly glowing sky: a warm golden-white radial halo of light in that
   central area, a few thin wispy white clouds drifting through, faint sparkles, and the same pink-to-lavender
   gradient. This central area must be smooth, empty and luminous so a game object can be placed over it later.
3) The three cartoon animals in the lower middle (goggled sheep with a green scarf, blue jelly spirit, white
   rabbit; roughly 33% to 45% of the height): erase them entirely, including goggles, ears, paws, tails, gold
   medal and any shadows. Continue the white cloud sea and the pink sky behind them naturally.
4) The two big buttons at the bottom (purple "home" button and gold "next" button) and every gold UI element that
   belongs to them: the rounded gold border of the UI frame, its cream inner edge, the glowing gold bar and its
   sparkle dots (roughly 78% to 96% of the height). Replace with a dreamy sky-to-cloud-sea transition: soft
   lavender-pink fluffy clouds, tiny golden sparkles, letting the bottom flower sea continue up into it.
5) The big flat featureless pink-lavender rectangle across the middle (roughly 46% to 78% of the height): paint
   over it so the whole image becomes one continuous scene - gentle layered clouds, a soft pink-violet sky
   gradient, a few sparkles. There must be no flat colour block, no straight edges, no border lines, no panel
   outline left.

KEEP UNCHANGED (same shapes, same colours, same positions): the rainbow-blue sky at the top, the radial sun rays
fanning out from the top centre, all twinkling stars and sparkles, the white-and-blue fairytale castle on the
RIGHT edge, the pink cherry-blossom tree on the LEFT edge, the white cloud sea, the pink flower clusters with
green leaves in the bottom-left and bottom-right corners, and the overall candy-bright glossy lighting.

COMPOSITION RULES for the finished plate:
- Vertical band 10% to 42% of the height, across the middle 60% of the width: only clean bright sky, a soft warm
  halo and a few wispy clouds. Nothing else - no castle, no tree, no flowers, no animals, no objects.
- The cherry-blossom tree frames the LEFT edge and the castle frames the RIGHT edge; both sit roughly between 12%
  and 48% of the height, hugging their edges, not crossing into the middle.
- The band 80% to 100% of the height is a pretty finish of cloud sea and flower sea, with pink blossoms and green
  leaves in both bottom corners.
- No text of any kind, no letters, no numbers, no logo, no UI buttons, no panels, no frames, no characters, no
  animals, no carousel, no rides, no equipment.

The result must look like one continuous hand-painted celebration stage: no visible seams, no rectangular
patches, no blur smears, no duplicated patterns, no cut-off objects.
```

## 验收检查结论（逐条核对）
- [x] 无文字/字母/数字：全图无任何字形；顶部牌匾与月桂已完全消失，仅剩天空、光射线与星芒（0%~9% 条带已放大核对）。
- [x] 无角色：护目镜羊、蓝果冻精灵、白兔及其道具（护目镜、围巾、金牌、耳/爪）全部清除，原位置为连续粉色天空/云层。
- [x] 无游乐设施：旋转木马、金星顶饰、马匹、金柱、草地圆台、环绕金色光带均无残留（13%~45% 区域放大核对为纯净光晕+云）。
- [x] 无按钮/面板/UI：底部两枚按钮、金色描边、奶油内衬、发光条全部消失；中部纯平粉紫占位块已改为连续云层，无直边、无色块、无补丁缝。
- [x] 保留项齐全：彩虹蓝天、顶部放射光射线、星芒/星光、右侧白蓝城堡（贴右缘）、左侧粉色樱花树（贴左缘）、云海、底部左右角粉色花簇+绿叶、奶油粉/薰衣草紫/暖金糖果光影。
- [x] 比例：1046×2048，0.51074，与源图一致；无拉伸（生成输出比例 0.5114，仅做等比缩放）。
- [x] 安全区：舞台以 `background-size: cover` 铺满、宽高比在 0.46~0.56 浮动时，最坏裁切为左右各约 5%（0.46）或上下各约 4.4%（0.56）——城堡/樱花树/底部花簇仍完整在安全区内。
- [x] 中心留白（运行时叠加「刚修好的设施」）：纵向 **约 9%~47%**，水平中间约 55% 宽度为纯净天空 + 暖白光晕（光晕最亮中心约 y=28%~30%），无任何物体遮挡；y≈47%~52% 亦仅剩柔和云层。
- [x] 文件规格：WebP q90 method=6，RGB 不透明，188,228 B（<600 KB，无需降质）。

## 已知的、可接受的细节
1. 画面最上缘左右两角保留了原生风格的樱花枝条出框（源图同样存在），运行时牌匾（top 2.2%，宽 76% 居中）不会压到它们，作为边角框景保留。
2. 右侧城堡旗杆的红旗落在 y≈13%~14%，属「城堡框景」范围（12%~48%），不在 0%~12% 牌匾区。
3. 底部 88%~100% 的花簇在极宽舞台（0.56）下会被下缘裁掉约 4%，属装饰，不影响版面。
