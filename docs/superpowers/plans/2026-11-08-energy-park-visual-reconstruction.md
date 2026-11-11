# 能量管道乐园视觉还原实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框跟踪进度。

**目标：** 将主页、6×6 解谜页和设施复苏页按 900×2000、9:20 设计坐标还原到设计稿，同时保留真实动态数据和解谜逻辑。

**架构：** 保留现有 App 状态、关卡模拟和导航，将三屏 UI 组件作为独立视觉层重排。资源入口集中在 `src/assets/energyPark.ts`，缺失的完整透明图标放入 `assets/energy_park_art_pack_v1/10_generated_complete/`，片段型特效不进入正式路径。

**技术栈：** React 19、TypeScript、Vite、CSS、现有 energy park PNG 资源、内置 image_gen、浏览器运行时截图和 macOS 屏幕录制。

---

### 任务 1：完成正式素材清单与完整图标生成

**文件：**
- 创建：`assets/energy_park_art_pack_v1/10_generated_complete/nav_level_icon.png`
- 创建：`assets/energy_park_art_pack_v1/10_generated_complete/nav_flora_icon.png`
- 创建：`assets/energy_park_art_pack_v1/10_generated_complete/nav_achievement_icon.png`
- 创建：`assets/energy_park_art_pack_v1/10_generated_complete/nav_settings_icon.png`
- 创建：`assets/energy_park_art_pack_v1/10_generated_complete/celebration_firework.png`
- 修改：`assets/energy_park_art_pack_v1/manifest.json`

- [ ] 步骤 1：以三屏设计稿作为风格参考，使用 image_gen 生成五张透明 PNG；每张图只包含完整主体，不带文字、不带水印、不裁切边缘。
- [ ] 步骤 2：检查每张图片的尺寸、alpha bounding box、深色背景和浅色背景边缘；主体不得贴边截断。
- [ ] 步骤 3：将最终素材移动到 `10_generated_complete/`，在 manifest 中加入尺寸、用途和完整性说明。
- [ ] 步骤 4：提交素材变更。

运行：`python3 scripts/verify_visual_assets.py`（任务 5 创建）

### 任务 2：集中资源入口并移除残缺素材路径

**文件：**
- 修改：`src/assets/energyPark.ts`
- 修改：`src/components/energyPark/EnergyParkHome.tsx`
- 修改：`src/components/energyPark/EnergyParkHud.tsx`

- [ ] 步骤 1：在 `energyPark.ts` 中新增四个导航图标和完整庆典特效的 import，并从正式对象中删除未使用的片段型 fireworks 引用。
- [ ] 步骤 2：主页底部导航改用完整 PNG 图标；HUD 设置入口改用完整设置图标，保留 aria-label 和点击逻辑。
- [ ] 步骤 3：运行 `pnpm lint`，确认资源 import 和类型通过。
- [ ] 步骤 4：提交资源入口变更。

### 任务 3：按设计坐标重排主页

**文件：**
- 修改：`src/components/energyPark/EnergyParkHome.tsx`
- 修改：`src/index.css`

- [ ] 步骤 1：将主页区块保持为 HUD、Logo、乐园主体、角色、进度卡、继续挑战、底部导航的固定层级。
- [ ] 步骤 2：使用设计稿比例调整 `.energy-home-title`、`.energy-home-characters`、`.energy-home-progress` 和 `.energy-home-continue` 的 top/height/bottom 关系；进度数字仍绑定 `clearedCount`。
- [ ] 步骤 3：让底部导航使用设计稿图标尺寸、激活态橙金底和文字层级，禁止 emoji 或占位符。
- [ ] 步骤 4：执行 `pnpm build`，确认页面资源可打包。

### 任务 4：按设计坐标重排解谜页与复苏页

**文件：**
- 修改：`src/components/energyPark/EnergyParkPuzzle.tsx`
- 修改：`src/components/energyPark/EnergyParkRestoration.tsx`
- 修改：`src/index.css`
- 修改：`src/App.tsx`

- [ ] 步骤 1：解谜页把关卡云牌、说明卡、棋盘、数据条和操作按钮按设计稿固定区间排布，保持 `GameBoard` 的点击、长按和旋转回调。
- [ ] 步骤 2：复苏页将横幅、设施、角色、成功卡、奖励卡和底部按钮按设计稿重排，所有文字和奖励数字动态读取。
- [ ] 步骤 3：调整成就 Toast 的显示位置或出现时机，确保不覆盖复苏横幅和成功标题。
- [ ] 步骤 4：删除会造成残缺视觉的片段型特效引用；完整庆典特效只在有明确容器尺寸时使用。
- [ ] 步骤 5：运行 `pnpm lint` 和 `pnpm build`。

### 任务 5：视觉资产和运行时验收

**文件：**
- 创建：`scripts/verify_visual_assets.py`
- 创建：`docs/visual-review-2026-11-08-redesign/visual_validation_report.md`
- 创建：`docs/visual-review-2026-11-08-redesign/*.png`
- 创建：`docs/visual-review-2026-11-08-redesign/*.mov`

- [ ] 步骤 1：脚本读取 manifest，核对正式资产文件存在、尺寸一致、alpha 不为空且主体不贴边截断。
- [ ] 步骤 2：启动 Vite，在浏览器中采集主页、解谜初始、解谜操作中、通关复苏、返回首页和选关状态截图。
- [ ] 步骤 3：真实完成第一关，采集实际旋转录屏和关键帧。
- [ ] 步骤 4：逐屏对照设计稿检查字体裁切、按钮边界、主体透明边缘、棋盘端口对齐和层级覆盖。
- [ ] 步骤 5：输出中文视觉验收报告，列出通过项、非阻塞风险和未覆盖平台。
- [ ] 步骤 6：提交实现和验收证据。
