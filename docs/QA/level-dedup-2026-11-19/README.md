# 主线 99 关去重与曲线修复（2026-11-19）

结论：**通过。** 10 组完全同题、24 关近重复、3 组重复提示全部消除；
盘面去重审计 99/99 通过，最大两关相似度从 1.000 降到 0.667；
章节 par 曲线、机制轮换、提示回放与 16 个回归脚本全部保持通过。

## 1. 改动前的问题

### 1.1 完全同题 10 组（盘面/朝向/规则/目标/容差全一致，只换了标题和提示）

| 组 | 关卡 | 章/角色 | par | 标题 |
|---|---|---|---:|---|
| 1 | L2 = L4 | 1 章 练 / 练 | 8 | 星灯柱·闪耀 / 气球摊·开张 |
| 2 | L3 = L7 | 1 章 练 / 谷 | 9 | 售票亭·开窗 / 花坛·开花 |
| 3 | L26 = L51 | 2 章 回声 / 3 章 回声 | 14 | 许愿树·回缝 / 风铃塔·回缝 |
| 4 | L29 = L47 | 2 章 教 / 3 章 回声 | 15 | 露珠池·保三 / 气球摊·取舍回声 |
| 5 | L35 = L58 | 2 章 考 / 3 章 练 | 16 | 花钟·双组峰 / 云海灯·齿轮回声二 |
| 6 | L46 = L83 | 3 章 变 / 5 章 回声 | 18 | 云朵秋千·诱饵顺序 / 大舞台·焊死回声 |
| 7 | L50 = L70 | 3 章 考 / 4 章 回声 | 17 | 云梯·双源顺序 / 凌霄七彩·焊死回声 |
| 8 | L61 = L63 | 4 章 教 / 4 章 练 | 17 | 云桥·跨缝一步 / 云中双瀑·一拐两用 |
| 9 | L68 = L79 | 4 章 考 / 4 章 考 | 21 | 闸控双极·缝外诱饵 / 星罗棋布·双缝峰 |
| 10 | L69 = L78 | 4 章 考 / 4 章 考 | 20 | 虚空栈道·四角相邻 / 灵河织锦·密度峰 |

另有 3 组同盘面、只差 0–2 格或规则：L45→L52（仅差 weld 规则）、L40→L91（少 2 个齿轮格）、L16→L18（1 格：直管改断闸）。

### 1.2 盘面复用规模

- 99 关只有 **65 种**「管件种类 + 位置」布局（占用格 64 种）。
- 最大一张环面盘面被 **10 关**共用：L26/51/61/62/63/65/68/69/78/79（第 4 章 20 关里占 8 关）。
- **24 关**与更早关卡差 ≤4 格（12 关差 0 格、6 关差 1 格）。
- 提示整句重复 3 组：L19/23/48/53/75 共 5 关一句、L26/L51、L90/L91。

### 1.3 由此带出的曲线问题

- R2 低波动 5 关窗口 3 处（L6–L10、L61–L65、L84–L88）。
- R6 取舍考 challenge 断崖（L59 67 → L90 52）。
- R7 第 3→4 章 challenge 回落 2.80（上限 2）。

## 2. 根因

- 生成器跨关复用同一份 solved 拓扑：
  - `chapter1-gen.ts` 的 `BASIC_BLUEPRINTS` 重复（L2/L4 → 4 号、L3/L6/L7 → 7 号）；
  - 第 4/5 章环面关统一从 `LAB_LEVELS` 的 T3 拓扑打乱，只换初始角度；
  - 第 2 章 boss 与第 5 章取舍关共用 `LEGACY_LEVELS` L90；第 5 章 L97 取第 3 章 L60。
- 门禁只校验 par 曲线 / 机制轮换，没有盘面去重规则；布局指纹按 id 固化，重复被长期保留。

## 3. 修复方式

1. 新增 `scripts/level-builders.ts`：solved 拓扑 → 按目标 par 打乱、双色双路生成、齿轮配对、诱饵注入、D4（旋转/镜像/换色/轴组）去重指纹与相似度。
2. 新增 `scripts/chapter-repairs.ts`：**37 关**显式修复配方（legacy / torus / wrap / colors / layout），确定性可复现；5 个章节生成器产出后统一覆盖。
3. `scripts/torus-gen.ts`：随机树源点无端口时返回 null（原实现直接抛异常）。
4. `scripts/generate_theme_content.ts`：提示去重（重复时顺延路线模板）；不再覆盖人工校订的 `src/content/collection.ts`。
5. 新增 `scripts/audit-distinct.ts`：完全同题 / 相似度 ≥0.86 / 提示重复 → 失败；≥0.80 → 警告。已接入 `npm test` 与 `npm run audit:distinct`。

### 3.1 重建的 37 关

| 类型 | 关卡 |
|---|---|
| 旧拓扑重打乱（每个 donor 只此一关） | L4/6/7/33/36/42/47/52/57/70/83/91/97 |
| 旧拓扑重打乱 + 齿轮 | L58 |
| 旧拓扑重打乱 + 零容差取舍 | L59 |
| 环面重新长树 | L18/26/51/62/63/65 |
| 环面 + 焊死 / 齿轮 | L68/69/78/79/81/82/84/85 |
| 双色双路新拓扑（部分注入诱饵还原扫描负担） | L66/71/72/74/80/87/88 |
| 6×6 算法布局（取舍峰，par 18） | L90 |

> 其中 L7、L65、L68、L79、L82、L85、L70、L71、L72、L74、L80、L90 等为兼顾 par 曲线（相邻跳变/平台/峰谷/boss）与负担曲线（R6/R7）二次选型。

## 4. 改动后数据

- 盘面：**99/99 张不同**；两两最大相似度 **0.667**（L22~L25）；相似度 ≥0.80 的 **0 对**。
- 提示：99 条展示提示 **无整句重复**。
- 章节 par 均值：9.40 / 14.80 / 15.95 / 18.40 / 20.47（改动前 9.30 / 14.75 / 16.00 / 18.35 / 20.68，曲线形态不变）。
- 网格：6×6 共 95 关、7×7 共 4 关（L93/94/95/99），7×7 首次出现仍为 L93。

## 5. 验收

```text
tsc --noEmit                       0 error
test_chapter1..5                   全部 PASS
audit-mainline                    通过（R1–R7 / Q1–Q4 / C1–C2）
audit-distinct                    [PASS] 99 张不同盘面 / 相似度≥0.86 0 对 / 重复提示 0 组
test_theme_content                通过（99 文案 / 99 藏品 / 布局指纹）
audit-rules                       54/54 通过
test_circuits / test_park_progress / audit_theme / test_hint_engine / phase0 全部通过
```

复现：

```powershell
npm run chapter1:gen; npm run chapter2:gen; npm run chapter3:gen; npm run chapter4:gen; npm run chapter5:gen
npx tsx scripts/generate_theme_content.ts   # 重算文案与布局指纹
npm test
npm run audit:distinct
```

## 6. 环境边界

- 本机没有系统 Node/npm；使用 DSH 内置 Node 执行 `vite build` 时，`@rolldown/binding-darwin-arm64` 原生绑定因签名 Team ID 不一致无法加载。该问题与本次改动无关（数据层已由 `tsc --noEmit` 与全部测试覆盖）。
- `minigame/` 的 99 关是旧「神树灵泉」主题的独立数据，与主线不同步，不在本轮范围内。

## 7. 回滚

```powershell
git checkout -- src/data/chapter1Levels.ts src/data/chapter2Levels.ts src/data/chapter3Levels.ts src/data/chapter4Levels.ts src/data/chapter5Levels.ts src/content/levels.ts scripts/fixtures/level-layout-hash.json
git checkout -- scripts/chapter1-gen.ts scripts/chapter2-gen.ts scripts/chapter3-gen.ts scripts/chapter4-gen.ts scripts/chapter5-gen.ts scripts/torus-gen.ts scripts/generate_theme_content.ts
```

新增文件（`scripts/level-builders.ts`、`scripts/chapter-repairs.ts`、`scripts/audit-distinct.ts`）可直接保留或一并移除。
