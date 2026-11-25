# 续命广告（看广告 +N 步）设计

日期：2026-11-22
状态：已落地第一版（网页 mock + 安卓原生桥位）

## 背景

步数归零遮罩里原来只有一个「应急线圈」按钮，库存为 0 时变成灰色的
「应急线圈不足」——点了没反应，玩家不知道去哪补，也没有免费出口。
本设计用激励视频补步替代这个死按钮。

## 玩家可见规则

| 场景 | 界面 |
|---|---|
| 背包有应急线圈 | 「使用应急线圈 · 余 N」（线圈优先，不弹广告） |
| 没线圈、广告可用 | 「看广告 +3/+5 步」，下方小字说明今日次数或缺口 |
| 没线圈、广告额度用完 | 「应急线圈不足 · 去商店补」，点击直达商店补给页 |
| 没有广告 SDK（网页版） | 同上，退化为商店入口 |
| 本局已续命 2 次 | 只保留「撤销一步 / 重新挑战」，并提示续命次数用完 |
| 调度关（`level.goal` 有值） | 不出现任何续命入口，规则仍是「一次做对」 |

## 数值

| 项 | 值 | 说明 |
|---|---|---|
| 单次奖励 | 缺口 ≤3 给 3 步；缺口 ≥4 给 5 步 | 由提示引擎算当前盘面到接通的步数 |
| 单局续命上限 | 2 次（线圈 + 广告合计） | 第 3 次只给重来，避免靠广告硬磨卡死关 |
| 每日广告续命 | 6 次 | 按本地日期计，跨天归零 |
| 兜底发放 | 广告拉不到时照发，但扣额度 | 断网不能白嫖 |
| 星级 | 补回的步数计入真实操作步数 | 续命不能抬星级，与线圈一致 |

缺口超过 5 步时仍然放广告，但小字明说「还差 X 步，补 5 步可能还不够」；
只有提示引擎算不出通路（盘面已堵死）才不给广告，因为那时重开一定更划算。

## 技术

- `src/platform/ads.ts`：广告桥。原生插件挂 `window.EnergyParkAds.showRewardedVideo`；
  网页返回 `unavailable`；`localStorage.energy_park_dev_ads = "mock"` 打开可控 mock。
  所有异常都收敛成 `rewarded | closed | error | unavailable` 四态。
- `src/utils/adReward.ts`：`decideAdStepOffer` 按 `findHint().stepsNeeded` 分档，
  以及 `AD_STEP_REWARD / AD_STEP_REWARD_MAX / DAILY_AD_STEP_CAP / REVIVES_PER_RUN`。
- `src/utils/parkProgress.ts`：存档新增 `adStepsDate`、`adStepsUsed`，
  走现有 `sanitizeProgress` 补默认值与脏数据回落；不升 `PROGRESS_VERSION`（那会清空最佳步数记录）。
- `src/components/CandyThemeShell.tsx`：遮罩三态按钮、广告状态机、进关预加载。
- `src/App.tsx`：`addSteps(amount)` 支持按需补步。

## 验证

- `scripts/test_ad_steps.ts`：额度按天累计、跨天归零、奖励分档、脏存档回落（已接入 `npm test`）。
- `scripts/test_ad_steps_ui.ts`：真界面覆盖看完/关掉/拉不到/单局上限/每日上限/线圈优先，
  dev 与生产包均已通过。
- 现有 `test_shop_supplies.ts` 中「无尽关」与「背包」两个用例在本次改动前就已失效：
  游玩页顶部的背包按钮在当前未提交改动里已被移除，与续命广告无关。

## 待接入

1. 安卓原生插件包一层 Taku/AdUp，把结果转成四态字符串。
2. 首次启动隐私协议通过后再初始化广告 SDK。
3. 埋点：ad_request / ad_fill / ad_show / ad_complete / ad_close_early / ad_fail / reward_granted，
   以及「续命后是否通关」用于回调节奏。
