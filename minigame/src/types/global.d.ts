/**
 * 小游戏宿主全局对象声明。
 * 微信小游戏的宿主暴露 wx，抖音小游戏的宿主暴露 tt。
 * 在浏览器/Node 中它们不存在，通过 platform.ts 的运行时探测选择实现。
 */
declare const wx: any;
declare const tt: any;

/** 构建期注入：dev 预览为 true，正式包为 false */
declare const __DEV__: boolean;
