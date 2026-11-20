# 商店素材验收 2026-11-20

## 素材范围

独立清单：`public/assets/park/shop-assets.json`

| 资源 | 规格 | 来源 |
| --- | --- | --- |
| `icon-lens.webp` | 512×512 RGBA | 火花透镜白底生成源 |
| `icon-coil.webp` | 512×512 RGBA | 应急线圈白底生成源 |
| `outfit-sheep-starlight.webp` | 951×1017 RGBA | 羊伙伴星愿礼服白底生成源 |
| `outfit-rabbit-starlight.webp` | 719×1024 RGBA | 兔子伙伴星愿礼服白底生成源 |
| `outfit-spirit-starlight.webp` | 988×1015 RGBA | 精灵伙伴星愿礼服白底生成源 |
| `mood-sheep-happy.webp` | 144×100 RGBA | 现有 `xingya_happy.png` |
| `mood-rabbit-happy.webp` | 144×132 RGBA | 现有 `yunrong_happy.png` |
| `mood-spirit-happy.webp` | 144×136 RGBA | 现有 `boling_happy.png` |
| `mood-joy.webp` | 512×256 RGBA | 三张开心表情横向合成 |
| `theme-calm-preview.webp` | 512×512 RGB | 宁静主题真实首页截图 |

## 复现与自动验收

素材格式与编解码使用固定版本，先确认当前解释器满足门禁：

```bash
python3 -c "import importlib.metadata as m; print(m.version('Pillow'))"
```

要求输出 `13.0.0`。若版本不符或无法导入，使用 Python 3.12 在仓库外创建临时虚拟环境并安装固定依赖：

```bash
PYTHON312=$(command -v python3.12)
"$PYTHON312" -m venv /private/tmp/rotategame-shop-assets
/private/tmp/rotategame-shop-assets/bin/python3 -m pip install --disable-pip-version-check -r scripts/requirements-shop-assets.txt
```

随后使用该虚拟环境执行验收：

```bash
SHOP_PYTHON=/private/tmp/rotategame-shop-assets/bin/python3
"$SHOP_PYTHON" scripts/prepare_shop_assets.py --check
"$SHOP_PYTHON" scripts/audit_shop_assets.py
```

若本机 `python3` 已安装 Pillow 13.0.0，也可直接运行：

```bash
python3 scripts/prepare_shop_assets.py --check
python3 scripts/audit_shop_assets.py
```

两个脚本默认要求 `Pillow==13.0.0`，版本不符时拒绝运行并输出固定依赖安装命令。

`prepare_shop_assets.py --check` 不重写图片；它会在内存中重新处理全部源图，将新产物的 bytes 与 sha256 对照独立清单和 `public/assets/park/*.webp`，并确定性重建 1500×640 QA 联系表后与现有 PNG 比对。源图或联系表变化但未重新生成时，检查会失败并输出对应文件名及 expected/actual bytes、sha256。

`audit_shop_assets.py` 要求 Pillow 识别文件格式为 `WEBP`，扩展名不参与格式判定；10 个资源尺寸均按清单精确匹配。透明资源必须实际具有 A 通道且 alpha 范围为 0–255；`has_alpha=false` 的资源必须是纯 RGB，RGBA 或带 `transparency` 信息时会失败。QA 联系表必须存在、为 1500×640 PNG，且确定性重建后的 bytes/sha256 与现有文件一致。

需要重新生成时运行：

```bash
python3 scripts/prepare_shop_assets.py
```

联系表：`shop-assets-contact-sheet.png`，透明资源同时放在深浅背景上检查轮廓与边缘。

## 浏览器验收

使用真实 Chrome 分别以 390×844 和 360×800 打开首页装扮状态与商店：

1. 首页确认三套星愿礼服、三张开心表情与展台名称完整显示。
2. 商店补给页确认火花透镜与应急线圈加载。
3. 商店装扮页确认开心问候、星愿礼服与宁静夜灯预览加载。
4. 10 个资源均要求 `naturalWidth > 0`，展台名称不得出现横向或纵向裁切。

验收结果：通过。两个视口均覆盖全部 10 个 WebP，所有资源 `naturalWidth > 0`，无破图和页面运行错误。

| 视口 | 展台文字 | 字号 | 行高 | 文字边界 |
| --- | --- | --- | --- | --- |
| 390×844 | 迎宾门 | 12.48px | 14.352px | 完整位于展台内 |
| 360×800 | 迎宾门 | 12px | 13.8px | 完整位于展台内 |

新鲜截图：

- `390x844-home.png`
- `390x844-shop-supply.png`
- `390x844-shop-cosmetic.png`
- `360x800-home.png`
- `360x800-shop-supply.png`
- `360x800-shop-cosmetic.png`

类型检查：`pnpm exec tsc --noEmit` 通过。
