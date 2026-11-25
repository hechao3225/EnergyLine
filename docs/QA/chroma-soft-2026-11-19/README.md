# 全站彩度柔化（首页「物品太艳」→「稍微掉色」回调） · 2026-11-19

## 0. 追加（2026-11-21）：主按钮只降饱和（替代 11-20 的压暗方案）

用户反馈首页「开始修复」金色按钮的黄色仍偏跳，要求**不要压暗、只降饱和度**。
（11-20 先做过一版「压暗」，被指出像蒙了一层灰/黑，已回退，改为纯彩度处理。）

- 文件：`public/assets/park/button-gold.webp`（所有金色主按钮共用同一张底板，改一次全站生效）；
- 参数：`scripts/park_chroma.py` 的 `CTA_SOFT = {f:0.75, knee:8}`——只在 Lab 空间把 C* 高于 8 的部分 ×0.75，**L* 明度、色相、alpha 全部不变**；
- 实测按钮区域：平均 L* 73.5 → 73.6（亮度不变），平均 C* 60.8 → 52.0（彩度 −14.5%）；素材本身 C* 74.6 → 57.6；
- 迁移脚本：`scripts/soften_park_cta.py`（幂等：已降饱和只补 manifest 哈希与标记）；管线已同步（`prepare_park_assets.py` 生成时自动应用）；
- 对比图：`06-cta-button-before-after.png`、`07-cta-home-before-after.png`（整页）。

## 1. 问题与方向

> 说明：本文档主体记录的是 11-19 的「全站彩度柔化」；首页主按钮的单独调整见第 0 节。

用户反馈：首页物品整体饱和度过高、刺眼；此前的「宁静主题」只把背景调暗，观感不协调、背景与物件脱节。

本轮方向：**不碰亮度、不单独压背景**，把「图 + CSS 色块」统一做一次**保明度的彩度压缩**——亮度关系、文字对比度都不变，只有"艳度"整体降一档。
首版强度压得偏重，用户反馈「稍微有点掉色」，于是分两轮回调，最终强度见第 3 节。

## 2. 方法：CIELAB 只压 C*，保留 L* 与色相

- 在 CIELAB 空间计算彩度 C* = sqrt(a²+b²)，按软膝曲线压缩：`C* ≤ 6` 不动；高于 6 的部分 `C* → 6 + (C*-6)*k`，封顶 `cap`；色相与 L* 不变。
- 为什么不用 HSV 降 S：实测 HSV 降饱和会把颜色整体提亮（首页整屏平均亮度 +6，过亮像素 24.2%→30.9%），反而更刺眼；Lab 保 L* 后整屏亮度基本不变，且文字对比度几乎不受影响。
- 范围：166 张非管件素材 + `src/index.css` 全部颜色字面量 + `index.html` theme-color。管件沿用 2026-11-18 的 `ENERGY_SOFT`，不二次降饱和。

## 3. 强度迭代与最终效果

| 强度 (k / cap) | 平均彩度 | 高彩像素 >0.5 | 备注 |
| --- | --- | --- | --- |
| 原始 | 40.9% | 32.1% | 刺眼 |
| 0.65 / 62（首版） | 26.9% | 4.7% | 用户反馈「稍微有点掉色」 |
| 0.75 / 70（中间版） | 30.5% | 7.9% | 回调一档 |
| **0.82 / 76（最终）** | **33.1%** | **9.8%** | 与原始保持 19% 彩度差，高彩面积只剩 1/3 |

最终分区彩度（max-min）：

| 区域 | 原始 | 最终 |
| --- | --- | --- |
| 侧边圆钮 | 45.4 | 37.4 |
| 进度条 | 38.3 | 31.2 |
| 关卡卡 | 33.2 | 27.7 |
| 底部导航 | 42.0 | 34.1 |
| 开始修复按钮 | 62.7 | 49.7 |
| 岛插画 | 43.8 | 35.6 |
| 标题 logo | 51.4 | 39.8 |

整屏平均亮度 52.7% → 53.8%（基本不变）；166 张素材的 alpha 通道逐像素与原始完全一致。

## 4. 文件与参数

| 文件 | 作用 |
| --- | --- |
| `scripts/park_chroma.py` | 公共函数 + 参数 `CHROMA_SOFT = {k:0.82, cap:76, knee:6}` |
| `scripts/soften_park_chroma.py` | 素材一次性迁移（幂等，manifest 标记「彩度柔化」），同步哈希 |
| `scripts/prepare_park_assets.py` | 管线接入：非管件素材生成时自动应用同一曲线 |
| `scripts/soften_park_css_chroma.py` | CSS 一次性迁移（带标记守卫） |
| `scripts/retune_park_css_chroma.py` | 调强度时回补 CSS：`--old-k/--old-cap` 指定当前曲线，按新参数重压 |
| `public/assets/park/*.webp`(166) + `manifest.json`、`src/index.css`、`index.html` | 已迁移内容 |

## 5. 调档步骤

1. 改 `scripts/park_chroma.py` 的 `CHROMA_SOFT`（`k` 越大越艳，`cap` 越大越艳）；
2. 素材：`git checkout -- public/assets/park` → `python scripts/soften_energy_assets.py` → `python scripts/soften_park_chroma.py`；
3. CSS：`python scripts/retune_park_css_chroma.py --old-k <上一档k> --old-cap <上一档cap>`（当前档为 0.82/76）。

参考：还嫌艳 → 0.75/70；仍觉得掉色 → 0.88/84。

## 6. 未覆盖

- 管件（`pipe-*`）保持 2026-11-18 的青蓝柔化；小游戏端（`minigame/`）是独立 Canvas 代码，未同步；
- `dist/` 与 Android 里的 Web 产物是旧素材，发布前需要 `npm run build` + `npx cap sync android`。

## 7. 截图

| 文件 | 说明 |
| --- | --- |
| `00-home-before-after.png` | 原始（左）/ 最终（右） |
| `01-home-after.png` | 最终首页 |
| `02-board-after.png` | 最终棋盘 |
| `03-dual-color.png` | 双色关 |
| `04-gear.png` | 齿轮关 |
| `05-strength-compare.png` | 原始 / 首版 0.65 / 最终 0.82 三档对比 |
