/**
 * 构建管线：单一 TS 入口 → 微信 / 抖音 / 浏览器三端产物。
 * 用法：node tools/build.mjs [--prod]
 */
import { build } from 'esbuild';
import { cpSync, mkdirSync, writeFileSync, existsSync, statSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const miniRoot = join(root, '..');
const h5Root = join(miniRoot, '..');
const prod = process.argv.includes('--prod');

const cacheDir = join(miniRoot, '.cache');
mkdirSync(cacheDir, { recursive: true });

console.log(`[build] bundling src/main.ts (prod=${prod}) ...`);
await build({
  entryPoints: [join(miniRoot, 'src/main.ts')],
  bundle: true,
  format: 'cjs',
  target: 'es2018',
  minify: prod,
  sourcemap: false,
  legalComments: 'none',
  charset: 'utf8',
  outfile: join(cacheDir, 'game.js'),
  logLevel: 'warning',
  define: { __DEV__: prod ? 'false' : 'true' },
});

const gameJs = (await import('node:fs')).readFileSync(join(cacheDir, 'game.js'), 'utf8');

// ---------- 资源（暂全量拷贝，M4 压缩裁剪） ----------
const assetSrc = join(h5Root, 'src', 'assets');
const assetFiles = existsSync(assetSrc)
  ? readdirSync(assetSrc, { withFileTypes: true })
      .filter((d) => d.isFile() && /\.(png|jpe?g|svg|webp)$/i.test(d.name))
      .map((d) => d.name)
  : [];

function copyAssets(destDir) {
  const destAssets = join(destDir, 'assets');
  mkdirSync(destAssets, { recursive: true });
  for (const name of assetFiles) {
    cpSync(join(assetSrc, name), join(destAssets, name));
  }
}

function dirSize(p) {
  let total = 0;
  if (!existsSync(p)) return 0;
  for (const d of readdirSync(p, { withFileTypes: true })) {
    const child = join(p, d.name);
    total += d.isDirectory() ? dirSize(child) : statSync(child).size;
  }
  return total;
}

// 清空旧产物（避免历史资源残留导致包体虚高）
for (const d of ['wechat', 'douyin', 'web']) {
  rmSync(join(miniRoot, 'build', d), { recursive: true, force: true });
}

const KB = 1024;
const fmt = (bytes) => (bytes / KB).toFixed(1) + ' KB';

// ---------- 微信小游戏 ----------
const wechatDir = join(miniRoot, 'build', 'wechat');
mkdirSync(wechatDir, { recursive: true });
writeFileSync(join(wechatDir, 'game.js'), gameJs);
writeFileSync(
  join(wechatDir, 'game.json'),
  JSON.stringify(
    {
      deviceOrientation: 'portrait',
      showStatusBar: false,
      networkTimeout: { request: 10000, connectSocket: 10000, uploadFile: 10000, downloadFile: 10000 },
    },
    null,
    2
  )
);
writeFileSync(
  join(wechatDir, 'project.config.json'),
  JSON.stringify(
    {
      appid: 'touristappid', // TODO(M6): 替换为正式 AppID
      projectname: 'sacred-tree-spring',
      compileType: 'game',
      libVersion: 'latest',
      setting: { urlCheck: false, es6: true, enhance: true, postcss: false, minified: true },
    },
    null,
    2
  )
);
copyAssets(wechatDir);

// ---------- 抖音小游戏 ----------
const douyinDir = join(miniRoot, 'build', 'douyin');
mkdirSync(douyinDir, { recursive: true });
writeFileSync(join(douyinDir, 'game.js'), gameJs);
writeFileSync(
  join(douyinDir, 'game.json'),
  JSON.stringify({ deviceOrientation: 'portrait' }, null, 2)
);
writeFileSync(
  join(douyinDir, 'project.config.json'),
  JSON.stringify(
    {
      appid: 'tt-placeholder', // TODO(M6): 替换为抖音 AppID
      projectname: 'sacred-tree-spring',
    },
    null,
    2
  )
);
copyAssets(douyinDir);

// ---------- 浏览器开发预览 ----------
const webDir = join(miniRoot, 'build', 'web');
mkdirSync(webDir, { recursive: true });
writeFileSync(join(webDir, 'game.js'), gameJs);
writeFileSync(
  join(webDir, 'index.html'),
  `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="theme-color" content="#064e3b" />
<link rel="icon" href="data:," />
<title>神树灵泉 · 小游戏开发预览</title>
<style>
  html, body { margin: 0; padding: 0; background: #064e3b; overflow: hidden; touch-action: none; -webkit-user-select: none; user-select: none; }
  #game { width: 100vw; height: 100vh; display: block; }
</style>
</head>
<body>
<canvas id="game"></canvas>
<script src="game.js"></script>
</body>
</html>
`
);
copyAssets(webDir);

console.log(`[build] wechat  -> ${join('build', 'wechat')}  (${fmt(dirSize(wechatDir))}, assets: ${assetFiles.length})`);
console.log(`[build] douyin  -> ${join('build', 'douyin')}  (${fmt(dirSize(douyinDir))})`);
console.log(`[build] web     -> ${join('build', 'web')}     (${fmt(dirSize(webDir))})`);
console.log('[build] done. dev: npm run dev  (http://localhost:3001)');
