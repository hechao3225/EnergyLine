# 能量管道乐园

以星空云海与梦幻乐园为主题的 99 关管道解谜游戏。旋转管道，将能量源接入所有设施，唤醒乐园与伴生花。

## UI 2.0

设计参考为 `docs/UI设计稿2.0/1.png`、`2.png`、`3.png`。首页、真实管道棋盘、设施复苏结算以及选关、图鉴、成就、规则、设置、任务、背包、商店、无尽挑战与关卡工坊使用统一主题。

- 99 关数据、连通仿真、旋转、能量闸通断、单向管、多源多目标继续使用现有玩法。
- 新玩家从第 1 关进入；通关、最佳步数与既有成就记录继续读取旧存档。
- 星级按剩余步数比例计算：40% 及以上为三星，15% 及以上为二星，其余成功通关为一星。
- 每关首次通关获得 100 金币和 10 钻石，重玩提升星级时只显示新增星星。
- 每日本地自然日完成任意一关，可领取一次 100 金币任务奖励。
- 初始提供 3 个提示灯泡；商店每 50 金币兑换 1 个，挑战中使用时消耗 1 个。
- 提示显示关卡说明；撤销、重做与操作足迹可用于重新规划通路。
- 无尽挑战提供 2、3、4 设施难度；关卡工坊支持绘制、导出、导入和试玩。

## 本地运行

Web 开发需要 Node.js 20.20 或更新版本；Capacitor CLI 需要 Node.js 22 或更新版本。

```powershell
npm install --legacy-peer-deps
npm run dev
```

默认打开 `http://localhost:3000`。

```powershell
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

生产产物在 `dist`。PWA 预缓存覆盖当前主题的真实资源。

## 玩家路径测试

需要已安装的 Chrome。测试在独立浏览器上下文运行，通过真实按钮与棋盘点击验证，不修改游戏运行状态。

```powershell
$env:PARK_TEST_URL='http://127.0.0.1:4173'
npm run test:ui
# 管件端口的素材像素与真实游玩专项
npm run test:pipes
python scripts/audit_park_delivery.py
```

报告入口为 `docs/QA/ui2-2026-11-10/visual_validation_report.md`，包含实际截图、设计稿对照、资产检查、玩家路径与未覆盖范围。

## 美术与字体

- 原始生成图：`docs/UI设计稿2.0/generated-sources/`。
- 运行资产及清单：`public/assets/park/`。
- 资产处理：`python scripts/prepare_park_assets.py`，保留原图，执行透明裁切、朝向归一、切片和图标派生。
- 补充图标与牌匾：`python scripts/prepare_park_details.py`，使用 rembg 去底并输出深浅底审查图；完整原件保存在仓库。
- 字体：Noto Sans SC，采用 SIL Open Font License 1.1；许可位于 `src/assets/park-font-LICENSE.txt` 和发行目录的 `assets/park/font-license.txt`。
- 字体子集：`python scripts/prepare_park_font.py --source <本地NotoSansSC字体文件>`；省略 source 时从 Google Fonts 官方仓库读取。

## Android

包名保持 `com.sacredtree.waterflow`，保留应用数据。应用名称、图标、启动画面与 WebView 界面使用新主题。

```powershell
npx cap sync android
./android/gradlew.bat -p android assembleDebug
```

没有在线设备时，编译或浏览器截图不能代替真机安装、触控、震动与听感验收。
