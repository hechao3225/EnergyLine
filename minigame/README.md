# 神树灵泉 · 小游戏版（微信 / 抖音）

自研 Canvas 2D 运行时的小游戏工程，逻辑层与美术资源直接复用 H5 版，
不使用 Cocos / Godot 等引擎，产物首包 < 1MB。

## 快速开始

```bash
npm install

npm run dev            # 构建 + 本地预览 http://localhost:3001（浏览器）
npm run build          # 三端开发构建（wechat / douyin / web）
npm run build:prod     # 三端正式构建（压缩 + 剔除调试钩子）

npm run test           # 逻辑层回归（19,190 条断言：99 关数据/求解器/成就/进度清洗）
npm run test:gameplay  # 单关真实通关（触摸事件驱动 + BFS 求解器）
npm run test:play      # 模拟玩家测试：3 种机型 × 全核心循环 + 广告/水闸深测
npm run test:all       # 全量三套
```

> UI 类测试（gameplay / player）需要先有一个常驻的预览服务：终端 A 跑 `npm run dev`，终端 B 跑测试；
> 测试脚本会自动做一次开发构建（带 `window.__game` 调试钩子），正式包不含钩子。

## 目录结构

```
minigame/
├── src/
│   ├── adapter/        # 平台抽象：wx / tt / browser 三实现（存储/触摸/音频/震动/分享/广告/登录）
│   ├── runtime/        # 自研轻量运行时：节点树、场景、输入分发、tween、粒子、基础控件
│   ├── logic/          # 纯逻辑：电路求解、活水路径、评分、花谱、成就、进度、音效、震动
│   │   └── data/       # 99 关关卡数据（自 H5 原样迁移）
│   ├── ui/             # 界面：App 顶栏、首页天梯/网格、棋盘、游戏场景、图鉴、成就、弹窗
│   ├── types/          # 类型定义
│   ├── config.ts       # 发布配置（AppID / 广告位 / 分享文案）
│   └── main.ts         # 入口与场景路由
├── tools/
│   ├── build.mjs       # esbuild 单入口 → 三端产物
│   ├── serve.mjs       # 静态预览服务器
│   ├── test.mjs        # 逻辑层单测打包执行器
│   ├── gameplay-test.mjs
│   └── player-test.mjs # 模拟玩家测试（CDP 触摸事件）
├── tests/              # 逻辑层断言（含内存平台 mock）
└── build/              # 产物：wechat / douyin / web
```

## 架构要点

- **一套 TS 源码 → 三端产物**：`getPlatform()` 运行时探测宿主，`wx.*` / `tt.*` / 浏览器 API 全部收敛在 `adapter/`。
- **渲染**：Canvas 2D。瓦片按 H5 的 SVG 描边 1:1 翻译为 `Path2D + lineCap/round + lineDashOffset`，虚线活水逐帧偏移。
- **坐标约定**：节点子坐标系原点是父节点「左上角」；`toLocal`（命中测试）与 `toWorld`（调试定位）互为逆变换，两者都已加入回归测试。
- **存档**：沿用 H5 的 `honeycomb_*` 键名与防作弊清洗逻辑，玩家在 H5 的进度可无缝带过来（同账号同设备）。
- **调试钩子**：`src/debugHooks.ts` 仅在 `__DEV__` 构建注入（`window.__game`），正式包会被 esbuild `define` + tree-shaking 整体剔除。

## 包体预算

| 项 | 大小 |
|---|---|
| game.js（正式包，含 99 关数据） | ~362 KB |
| assets（12 张 WebP） | ~576 KB |
| **首包合计** | **~934 KB**（微信上限 4MB，抖音 20MB） |

目前不需要分包；若后续加入无尽模式/关卡编辑器，把 `src/logic/data` 拆成分包即可。

## 上线前必改

1. `src/config.ts`：填微信/抖音 AppID、激励视频与 banner 广告位 ID。
2. `tools/build.mjs`：把 `project.config.json` 里的 `touristappid` / `tt-placeholder` 换成真实 AppID（或直接在平台后台导入时填写）。
3. 执行 `npm run build:prod`，用开发者工具导入对应目录。

详细提审步骤见 [docs/上架清单.md](docs/上架清单.md)。
