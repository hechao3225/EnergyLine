# 火花透镜蓝色降饱和 2026-11-22

## 问题

用户反馈「这关火花透镜蓝色太刺眼，饱和度太高了」。

商店补给卡（`.park-shop-card`，图标 17cqw ≈ 66px）里，火花透镜的蓝色玻璃是全屏纯度最高的区域之一：蓝色像素 Lab C* 均值 38.0、p95 58.9；而同一张卡上的金色按钮、紫红标题、粉色宝石都处在 11-19 全站彩度柔化之后的语汇里（普通素材 C* 上限 76）。

## 原因

11-19 的全站彩度柔化覆盖了 166 张公园素材与 `src/index.css` 的全部颜色字面量，但 11-20 才加入的 10 张商店素材走的是独立管线 `scripts/prepare_shop_assets.py`，没有接上 `scripts/park_chroma.py` 的彩度曲线。火花透镜是这 10 张里唯一大面积蓝色玻璃的素材，所以在奶白卡片上最跳。

## 方法

只压蓝色相带（195°–292°，两端各 10° 线性过渡）的 Lab 彩度：C* 高于软膝 6 的部分 ×0.65；**L\* 明度、色相、alpha 全部保持不变**。金色镜框、珍珠环、紫色手柄都不在色带内，不做任何色彩变换（只受 WebP 重编码影响）。

落地位置在生成管线里（`prepare_shop_assets.build_assets` → `ICON_CHROMA_SOFT` → `park_chroma.soften_hue_chroma`），所以重跑管线不会把降饱和回退掉；改参数后重跑同一条命令即可。

## 参数与实测

| 指标 | 改前 | 改后 |
| --- | --- | --- |
| 蓝色区域 C* 均值 | 38.0 | 28.2（−26%） |
| 蓝色区域 C* p95 | 58.9 | 47.7（−19%） |
| 金框 / 紫手柄 RGB | — | 不做色彩变换，仅 WebP 重编码噪声（平均 Δ 1.9/255） |
| alpha 通道 | — | 逐像素完全一致 |
| WebP 字节 | 45,704 | 45,890 |
| sha256 | `4e5b603a…` | `750b64f4…` |

## 影响文件

| 文件 | 变化 |
| --- | --- |
| `public/assets/park/icon-lens.webp` | 重新生成（512×512 RGBA，alpha 不变） |
| `public/assets/park/shop-assets.json` | icon-lens 的 bytes / sha256 / alpha_bbox / processing；`generated` 改为 2026-11-22 |
| `public/assets/park/manifest.json` | 同名条目同步哈希与 processing |
| `docs/QA/shop-assets-2026-11-20/shop-assets-contact-sheet.png` | 按磁盘 10 张素材重建（同时把 11-21 表情重绘后的联系表追平） |
| `scripts/park_chroma.py` | 新增 `soften_hue_chroma()`：按色相带只压 C* |
| `scripts/prepare_shop_assets.py` | 新增 `LENS_BLUE_SOFT` / `ICON_CHROMA_SOFT` 并在生成时应用 |
| `scripts/soften_shop_lens_chroma.py` | 一次性迁移 + 两份清单 / 联系表同步（从白底源重新生成，幂等） |
| `scripts/requirements-shop-assets.txt` | 增加 numpy（`park_chroma` 依赖） |

## 验收

- `SHOP_ASSETS_PYTHON=… python scripts/audit_shop_assets.py`：`icon-lens`、`icon-coil`、三套星愿礼服、主按钮等全部通过；mood 三项失败是既有问题——11-21 表情重绘后 `audit_shop_assets.py` 里还写着旧的 144×100 / 144×132 / 144×136 期望，与本轮无关。
- `SHOP_ASSETS_PYTHON=… python scripts/prepare_shop_assets.py --check`：同样卡在 mood 三项的旧 processing 文案；`icon-lens` 已通过确定性比对。
- 主 manifest 与磁盘文件逐项哈希一致（`icon-lens` 及其余 9 项全部 file_ok / manifest_same）。
- 真实 Chrome 390×844 与 430×932：卡片布局、文字、价格、按钮均未变化，无 `naturalWidth` 失败。

## 调档

- 还嫌艳：把 `LENS_BLUE_SOFT["f"]` 降到 0.55；
- 觉得掉色：升到 0.75；
- 改完执行 `SHOP_ASSETS_PYTHON=/private/tmp/rotategame-shop-assets/bin/python python scripts/soften_shop_lens_chroma.py`，只影响 icon-lens，不会碰其它商店素材。

## 未覆盖

- `dist/` 与 Android 里的 Web 产物是旧素材；发版前需要 `npm run build`（必要时 `npx cap sync android`）。
- 小游戏端（`minigame/`）是独立 Canvas 代码，不使用这张 WebP。

## 截图

| 文件 | 说明 |
| --- | --- |
| `00-card-before-after-390x844.png` | 390 视口商店卡片改前 / 改后并排 |
| `01-icon-zoom-before-after.png` | 图标放大对比（3 倍图像素裁切） |
| `02-icon-66px-before-after.png` | 66px 实际显示尺寸对比 |
| `03-shop-page-before-after.png` | 整个商店补给页对比 |
| `390x844-before-card.png` / `390x844-after-card.png` | 原始卡片截图（3 倍图） |
| `390x844-before-shop.png` / `390x844-after-shop.png` | 原始整页截图 |
| `430x932-*-card.png` / `430x932-*-shop.png` | 430 视口同上 |

## 复现截图

```bash
# 改动前素材（来自 HEAD）
git show HEAD:public/assets/park/icon-lens.webp > /private/tmp/icon-lens-before.webp
# 起真实 Chrome，390×844 的商店补给页，Playwright route 拦截 icon-lens.webp 分别喂改动前 / 当前文件
```
