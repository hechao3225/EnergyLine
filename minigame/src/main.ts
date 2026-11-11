/**
 * 小游戏入口：资源预载 + 首页/关卡场景路由。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { getPlatform } from './adapter/platform';
import { Director } from './runtime/director';
import { preloadImages, CORE_IMAGES } from './runtime/assets';
import { GameScene } from './ui/gameScene';
import { HomeScene } from './ui/homeScene';
import { CollectionScene } from './ui/collectionScene';
import { AppView } from './ui/appHeader';
import { loadProgress } from './logic/progress';
import { CONFIG } from './config';
import { installDebugHooks } from './debugHooks';

const platform = getPlatform();
platform.log('[main] platform =', platform.name);

const sys = platform.sysInfo();
const canvas = platform.mainCanvas();
const director = Director.init(canvas, sys);

function openLevel(id: number): void {
  director.replace(new GameScene(director, id, {
    onSelectLevel: openLevel,
    onHome: openHome,
    onNav: openNav,
  }));
}

function openHome(): void {
  director.replace(new HomeScene(director, {
    onOpenLevel: openLevel,
    onNav: openNav,
  }));
}

function openNav(view: AppView): void {
  if (view === 'tree') {
    openHome();
    return;
  }
  director.replace(new CollectionScene(director, view, {
    onOpenLevel: openLevel,
    onNav: openNav,
  }));
}

// 右上角菜单分享内容（微信/抖音）
platform.setShareInfo({ title: CONFIG.share.title, imageUrl: CONFIG.share.imageUrl, query: CONFIG.share.query });

// 静默登录（无后端时仅打印 code，M6 接服务端后可换 openid）
platform.login().then((code) => {
  if (code) platform.log('[login] code =', code.slice(0, 8) + '…');
});

// 调试钩子仅在开发构建注入（正式包会被 define + tree-shaking 整体剔除）
if (__DEV__) {
  installDebugHooks(director, openLevel, () =>
    director.current instanceof GameScene ? director.current : null
  );
}

// 图片异步预载（加载完成前瓦片用兜底画法，完成后自动替换）
preloadImages(CORE_IMAGES).catch((e) => console.warn('[assets]', e));

// 首次进入首页；若已有进度，首页高亮续玩关卡
void loadProgress;
openHome();
director.run();
