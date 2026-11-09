# 🌸 神树灵泉 (EnergyLine)

> **仙侠国风益智连通解谜游戏 · 经典 99 关通天神木奇遇**  
> *引古老灵泉之活水，经经纬玉渠与灵玉水闸，滋养百花仙草，唤醒通天建木！*

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF.svg?logo=capacitor)](https://capacitorjs.com/)

---

## 📖 游戏背景与世界观

上古通天神木沉眠，大地灵脉断绝，百花仙卉凋零。  
玩家化身引泉仙使，需旋转与调整地脉玉渠管道，引导碧波灵泉注入沉寂的花蕾。  
随着一重重水脉贯通，神树自根系节节攀升，拔地参天，唤醒封印在九十九重天境中的伴生仙花与神兽图腾！

---

## ✨ 核心特色与玩法

### 1. 经典 99 关深度重构与梯级心流
游戏拥有精心设计的 **全量 99 关阶梯式关卡体系**，彻底解决早期关卡难度跳跃与千篇一律问题：
- **第一卷 · 地脉之根 (1 ~ 20 关)**：引导单灵泉、基础直弯管、四向十字立交（Cross）、暗礁迷径（锁定死路）。关底大考：【寒潭墨雪】。
- **第二卷 · 巨木之干 (21 ~ 40 关)**：可点击通断的【灵玉水闸】（Switch）、多支路灌溉、双灵泉源头初现（L25）。关底大考：【九霄玉兰】。
- **第三卷 · 苍翠繁枝 (41 ~ 60 关)**：引入【单向逆止导流管】（Diode 二极管）、极性门禁、错位逆流机制。关底大考：【碧落仙荷】。
- **第四卷 · 云海天桥 (61 ~ 80 关)**：全要素机关综合大挑战（十字立交 + 水闸 + 二极管联动）、高空天堑。关底大考：【赤血金凤】。
- **第五卷 · 神树之巅 (81 ~ 99 关)**：三灵泉并辔而发（天地人三才灵泉）、六花蕾全屏大阵。终极大圆满：【混沌鸿蒙】。

> 📘 **完整设计书**：详见 [docs/DESIGN-BOOK-99-LEVELS.md](docs/DESIGN-BOOK-99-LEVELS.md) 与同内容独立仙侠排版 HTML [docs/DESIGN-BOOK-99-LEVELS.html](docs/DESIGN-BOOK-99-LEVELS.html)。

### 2. 双重视图自由选关
- **通天神树天梯视图**：沿垂直藤蔓画卷平滑滚动探索 99 个生长节点，生动展示当前解锁与星级通关状态（4★ 满星）。
- **精选电路网格视图**：紧凑五大篇章九宫格布局，随时定位并演练任意心仪关卡。

### 3. 百花仙草图鉴系统
每打通一关，即可在【神木花谱】中唤醒一株专属伴生仙花（如青玉幽兰、寒潭墨雪、碧落仙荷、赤血金凤等），收录花名、品阶与形态。

### 4. 极致视听与交互反馈
- 灵泉流光波纹特效（支持单/双/三灵泉同屏水纹涟漪粒子动画）。
- 完整操作历史时间线与无损步数撤销系统。
- 灵动清脆的仙石玉器音效与国风氛围。

---

## 🛠️ 技术架构

- **前端架构**：React 19 + TypeScript + Vite 8 + TailwindCSS v4
- **移动端跨平台**：Capacitor Android (SDK 34 / 36, Java 17, Gradle 8.14)
- **电路求解与仿真核心**：广度优先图搜索（BFS）双向连通性算法，保证关卡 100% 具备合法解
- **PWA 支持**：集成 `vite-plugin-pwa`，支持离线运行与移动端原生体验

---

## 🚀 本地开发与运行

### 环境要求
- Node.js >= 20.0.0
- npm / bun

### 1. 安装依赖
```bash
npm install --legacy-peer-deps
```

### 2. 启动开发服务器
```bash
npm run dev
```
启动后在浏览器中打开控制台输出的本地服务地址（如 `http://localhost:5173`）。

### 3. 运行关卡仿真验证脚本
```bash
npx tsx scripts/generate-99-levels.ts
```
该脚本将利用拓扑图生成算法对全部 99 关进行实时求解测试，并同步更新 `src/data/defaultLevels.ts`。

---

## 📱 Android 打包与构建

### 前置环境
- Android SDK (API 33+)
- JDK 17 (Adoptium / OpenJDK)

### 1. 构建 Web 资源并同步至 Android 工程
```bash
npm run build
npx cap sync android
```

### 2. 编译生成 Debug APK
```bash
cd android
./gradlew assembleDebug
```
产物 APK 路径：`android/app/build/outputs/apk/debug/app-debug.apk`。

### 3. 安装到 Android 手机或模拟器
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📂 目录结构

```
EnergyLine/
├── android/                 # Capacitor Android 原生项目工程
├── docs/                    # 关卡设计书、HTML 报告与实机测试截图
│   ├── DESIGN-BOOK-99-LEVELS.md
│   └── DESIGN-BOOK-99-LEVELS.html
├── public/                  # 静态公共资源与音频音效
├── scripts/                 # 99 关算法生成器与 HTML 渲染脚本
│   ├── generate-99-levels.ts
│   └── render-design-book-html.cjs
├── src/                     # React 游戏源码
│   ├── components/          # 棋盘、神树、选关、花谱、时间线等 UI 组件
│   ├── data/                # 99 关数据与仙花图鉴数据
│   ├── utils/               # 电路仿真算法、音频合成、成就系统等
│   ├── App.tsx              # 游戏主入口
│   └── main.tsx
├── capacitor.config.json    # Capacitor 移动端配置
├── package.json
└── vite.config.ts           # Vite 构建配置
```

---

## 📜 许可证

本项目开源发布，遵循 MIT 许可证。
