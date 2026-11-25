# 商店素材验收 2026-11-20

## 素材范围

独立清单：`public/assets/park/shop-assets.json`

| 资源 | 规格 | 来源 |
| --- | --- | --- |
| `icon-lens.webp` | 512×512 RGBA | 火花透镜白底生成源 |
| `icon-step.webp` | 512×512 RGBA | 加步电池白底生成源 |
| `outfit-sheep-starlight.webp` | 951×1017 RGBA | 羊伙伴星愿礼服白底生成源 |
| `outfit-rabbit-starlight.webp` | 719×1024 RGBA | 兔子伙伴星愿礼服白底生成源 |
| `outfit-spirit-starlight.webp` | 988×1015 RGBA | 精灵伙伴星愿礼服白底生成源 |
| `mood-sheep-happy.webp` | 144×100 RGBA | 现有 `xingya_happy.png` |
| `mood-rabbit-happy.webp` | 144×132 RGBA | 现有 `yunrong_happy.png` |
| `mood-spirit-happy.webp` | 144×136 RGBA | 现有 `boling_happy.png` |
| `mood-joy.webp` | 512×256 RGBA | 三张开心表情横向合成 |
| `theme-calm-preview.webp` | 512×512 RGB | 宁静主题真实首页截图 |

> 2026-11-22 更新（一）：`icon-coil` 更名为 `icon-step`，对应商店道具「应急线圈」→「加步电池」；图标改为电池 + 大号「+3」+ 爪印，管线按全站彩度曲线收一档（k=0.82、cap=76）。验收记录见 `docs/QA/step-battery-2026-11-22/`。

> 2026-11-22 更新（二）：`icon-lens` 的蓝色玻璃在生成管线里按 195°–292° 色相带降饱和（Lab C*×0.65，软膝 6），金色镜框、珍珠环与紫色手柄不变。参数见 `scripts/prepare_shop_assets.py` 的 `LENS_BLUE_SOFT`，验收记录见 `docs/QA/lens-blue-soft-2026-11-22/`。管线同时依赖 numpy，已写入 requirements。

## 复现与自动验收

需 Python3.12+。先设置并确认 `SHOP_ASSETS_PYTHON`：

```bash
export SHOP_ASSETS_PYTHON=python3.12
"$SHOP_ASSETS_PYTHON" --version
```

命令不可用时，将 `SHOP_ASSETS_PYTHON` 指向机器上任意可执行的 Python3.12+ 路径。随后创建仓库外虚拟环境：

```bash
"$SHOP_ASSETS_PYTHON" -m venv /private/tmp/rotategame-shop-assets
SHOP_ASSETS_PYTHON=/private/tmp/rotategame-shop-assets/bin/python3
export SHOP_ASSETS_PYTHON
/private/tmp/rotategame-shop-assets/bin/python3 -m pip install --disable-pip-version-check -r scripts/requirements-shop-assets.txt
```

检查 Pillow 版本并使用同一解释器执行验收：

```bash
"$SHOP_ASSETS_PYTHON" -c "import importlib.metadata as m; print(m.version('Pillow'))"
"$SHOP_ASSETS_PYTHON" scripts/prepare_shop_assets.py --check
"$SHOP_ASSETS_PYTHON" scripts/audit_shop_assets.py
```

两个脚本要求 `SHOP_ASSETS_PYTHON` 已设置、解释器为 Python3.12+ 且 `Pillow==13.0.0`；任一条件不符都会拒绝运行并输出可操作命令。

`prepare_shop_assets.py --check` 不重写图片；它会在内存中重新处理全部源图，将新产物的 bytes 与 sha256 对照独立清单和 `public/assets/park/*.webp`，并确定性重建 1500×640 QA 联系表后与现有 PNG 比对。源图或联系表变化但未重新生成时，检查会失败并输出对应文件名及 expected/actual bytes、sha256。

`audit_shop_assets.py` 要求 Pillow 识别文件格式为 `WEBP`，扩展名不参与格式判定；10 个资源尺寸均按清单精确匹配。透明资源必须实际具有 A 通道且 alpha 范围为 0–255；`has_alpha=false` 的资源必须是纯 RGB，RGBA 或带 `transparency` 信息时会失败。QA 联系表必须存在、为 1500×640 PNG，且确定性重建后的 bytes/sha256 与现有文件一致。

`shop-assets.json` 和共享素材 manifest 均记录透明资源的 `alpha_bbox` 与 `corner_alpha`；宁静主题预览字段为 `null`。

需要重新生成时运行：

```bash
"$SHOP_ASSETS_PYTHON" scripts/prepare_shop_assets.py
```

联系表：`shop-assets-contact-sheet.png`，透明资源同时放在深浅背景上检查轮廓与边缘。

## 浏览器验收

使用真实 Chrome 分别以 360×800、390×844 和 430×932 打开首页装扮状态与商店：

1. 首页确认三套星愿礼服、三张开心表情与展台名称完整显示。
2. 商店补给页确认火花透镜与加步电池加载。
3. 商店装扮页确认开心问候、星愿礼服与宁静夜灯预览加载。
4. 10 个资源均要求 `naturalWidth > 0`，展台名称不得出现横向或纵向裁切。

验收结果：通过。三个视口均覆盖全部 10 个 WebP，所有资源 `naturalWidth > 0`，无破图和页面运行错误。18cqw 展台与标题、侧栏、伙伴、进度、设施卡和导航均无重叠。

| 视口 | 展台文字 | 字号 | 行高 | 文字边界 |
| --- | --- | --- | --- | --- |
| 430×932 | 迎宾门 | 13.76px | 15.824px | 完整位于展台内 |
| 390×844 | 迎宾门 | 12.48px | 14.352px | 完整位于展台内 |
| 360×800 | 迎宾门 | 12px | 13.8px | 完整位于展台内 |

新鲜截图：

- `390x844-home.png`
- `390x844-shop-supply.png`
- `390x844-shop-cosmetic.png`
- `360x800-home.png`
- `360x800-shop-supply.png`
- `360x800-shop-cosmetic.png`
- `430x932-home.png`

类型检查：`pnpm exec tsc --noEmit` 通过。
