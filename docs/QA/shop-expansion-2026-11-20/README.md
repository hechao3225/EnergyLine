# 商店扩充玩家路径与视觉验收

最终代码提交：`341c0f24f53061c4d83521795b174d0f88997bf3`

## 交付内容

- `screens/`：360×800、390×844、430×932 三视口的 30 张原尺寸真实玩家路径截图。
- `contact-sheet.jpg`：1500×4200 全状态联系表。
- `browser-results.json`：截图尺寸、图片解码数量、文字溢出、元素边界与展台遮挡的结构化结果。
- `clean-head-verification.json`：从最终代码提交通过 `git archive` 导出的干净副本验证摘要。
- `visual_validation_report.md`：资产真实性、功能路径、视觉结论和未覆盖范围。

## 玩家状态

完整装扮种子对应可达到的 40 关进度：

- 已修复第 1–40 关。
- 拥有并装备开心问候、星愿礼服、星空展台、宁静夜灯。
- 首页展品为第 21 关旋转木马。
- 存档主题为 calm。

另用第 1–4 关已完成、装备第 5 关展品的状态验证未修复展品不会显示。

## 复现命令

```bash
export PATH="/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/lxjj/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
export SHOP_ASSETS_PYTHON=/private/tmp/rotategame-shop-assets/bin/python3
export PARK_TEST_URL=http://127.0.0.1:4173

pnpm exec tsc --noEmit
pnpm test
pnpm build
pnpm preview --host 127.0.0.1 --port 4173
"$SHOP_ASSETS_PYTHON" scripts/prepare_shop_assets.py --check
"$SHOP_ASSETS_PYTHON" scripts/audit_shop_assets.py
pnpm exec tsx scripts/test_shop_supplies.ts
pnpm exec tsx scripts/test_shop_home.ts
PARK_QA_DIR=/private/tmp/rotategame-park-ui pnpm exec tsx scripts/test_park_ui.ts
python3 scripts/audit_park_delivery.py
```

截图命令会覆盖本目录自己的 `screens/` 和 `browser-results.json`。既有玩家路径测试在 clean HEAD 副本中使用临时 QA 目录，不改写历史验收截图。430×932 的补给和装扮截图位于 `screens/shop-supply-430x932.png`、`screens/shop-cosmetic-430x932.png`，并已纳入最终联系表。

## 本轮缺陷修复

实验场入口原定位为 `top: 30%`、`max-height: 40vh`，实际覆盖首页旋转木马展台底部。调整到 `top: 35%`、`max-height: 30vh` 后，三个目标视口均避开展台并在首页进度区前结束。重拍截图已替换修复前证据。

重置自动化先注册一次性 dialog 处理器并自动接受。若 750ms 内出现原生 `window.confirm`，clean HEAD 直接继续；未出现时才等待并点击当前工作区的新游戏内“确定重置”弹窗。
