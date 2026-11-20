# 商店扩充玩家路径与视觉验收

最终代码提交：`3b88df73c00247835ce0b23e217f91b67d2ccbc3`

QA 证据提交：本目录所在的 `docs: 重录商店独立验收证据` 提交。

## 交付内容

- `screens/`：clean archive 生成的 53 张原尺寸截图。
- `contact-sheet.jpg`：1500×7700 最终联系表。
- `browser-results.json`：截图尺寸、图片解码数量、文字溢出、元素边界与展台遮挡的结构化结果。
- `purchase-results.json`：8 次真实购买、装备、展品选择、滚动和异常状态记录。
- `park-delivery-audit.json`：clean archive 中重新运行的发行审计结果。
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
export PARK_QA_DIR=/private/tmp/rotategame-shop-qa

pnpm exec tsc --noEmit
pnpm test
pnpm build
pnpm preview --host 127.0.0.1 --port 4173
"$SHOP_ASSETS_PYTHON" scripts/prepare_shop_assets.py --check
"$SHOP_ASSETS_PYTHON" scripts/test_shop_asset_generator.py
"$SHOP_ASSETS_PYTHON" scripts/audit_shop_assets.py
pnpm exec tsx scripts/test_shop_home.ts
pnpm exec tsx scripts/test_shop_purchase.ts
pnpm exec tsx scripts/test_shop_supplies.ts
PARK_QA_DIR="$PARK_QA_DIR/park-ui" pnpm exec tsx scripts/test_park_ui.ts
PARK_QA_DIR="$PARK_QA_DIR/park-ui" python3 scripts/audit_park_delivery.py
"$SHOP_ASSETS_PYTHON" scripts/build_shop_qa_contact_sheet.py "$PARK_QA_DIR/screens" "$PARK_QA_DIR/contact-sheet.jpg"
```

`test_shop_home.ts` 与 `test_shop_purchase.ts` 默认写入 `output/qa/shop-expansion`。clean archive 显式设置临时 `PARK_QA_DIR`，验证完成后才把最终证据复制到本目录。430×932 的补给/装扮顶部与底部、余额不足、未开放、已拥有/使用中、展品选择器、购买后背包与首页均已纳入最终联系表。

## 本轮缺陷修复

实验场入口原定位为 `top: 30%`、`max-height: 40vh`，实际覆盖首页旋转木马展台底部。调整到 `top: 35%`、`max-height: 30vh` 后，三个目标视口均避开展台并在首页进度区前结束。重拍截图已替换修复前证据。

重置自动化用 `Promise.race` 同时等待一次性 dialog 处理器和游戏内“确定重置”按钮，1500ms 内任一分支成功即继续；分支错误写入 `pageErrors`。clean archive 三次均走原生 `window.confirm`，当前工作区三次均走游戏内弹窗。

`prepare_shop_assets.py` 生成 `mood-joy` 的三个完整仓库相对 source，并把 name/file/source/size/processing/透明 metadata 全部纳入 `--check`。`test_shop_asset_generator.py` 验证确定性清单通过，同时验证篡改 processing 或 source 都会失败。
