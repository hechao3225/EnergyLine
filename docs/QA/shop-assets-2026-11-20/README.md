# 商店素材验收 2026-11-20

## 素材范围

独立清单：`public/assets/park/shop-assets.json`

| 资源 | 规格 | 来源 |
| --- | --- | --- |
| `icon-lens.webp` | 512×512 RGBA | 火花透镜白底生成源 |
| `icon-coil.webp` | 512×512 RGBA | 应急线圈白底生成源 |
| `outfit-sheep-starlight.webp` | 透明裁边，保持比例 | 羊伙伴星愿礼服白底生成源 |
| `outfit-rabbit-starlight.webp` | 透明裁边，保持比例 | 兔子伙伴星愿礼服白底生成源 |
| `outfit-spirit-starlight.webp` | 透明裁边，保持比例 | 精灵伙伴星愿礼服白底生成源 |
| `mood-sheep-happy.webp` | 144×100 RGBA | 现有 `xingya_happy.png` |
| `mood-rabbit-happy.webp` | 144×132 RGBA | 现有 `yunrong_happy.png` |
| `mood-spirit-happy.webp` | 144×136 RGBA | 现有 `boling_happy.png` |
| `mood-joy.webp` | 512×256 RGBA | 三张开心表情横向合成 |
| `theme-calm-preview.webp` | 512×512 RGB | 宁静主题真实首页截图 |

## 复现与自动验收

```bash
python3 scripts/prepare_shop_assets.py --check
python3 scripts/audit_shop_assets.py
```

`prepare_shop_assets.py --check` 只读取并校验现有文件，不重写图片。重新生成时运行：

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
