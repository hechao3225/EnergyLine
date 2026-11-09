/**
 * 发布期配置：广告位 / AppID / 分享文案。
 * 上线前把下面占位值替换为平台后台申请到的真实值即可（M6 提审清单会逐项核对）。
 * @license SPDX-License-Identifier: Apache-2.0
 */
import { getPlatform } from './adapter/platform';

export const CONFIG = {
  /** 微信小游戏 */
  wechat: {
    appId: 'touristappid',
    /** 激励视频广告位（微信后台 → 流量主 → 广告位管理） */
    rewardedAdUnitId: '',
    /** banner 广告位 */
    bannerAdUnitId: '',
  },
  /** 抖音小游戏 */
  douyin: {
    appId: '',
    rewardedAdUnitId: '',
    bannerAdUnitId: '',
  },
  /** 分享文案 */
  share: {
    title: '神树灵泉 · 九十九重通天神木，等你引泉唤醒百花',
    imageUrl: '',
    query: 'from=share',
  },
  /** 首页是否展示 banner（审核期建议关闭） */
  enableBanner: false,
};

export function rewardedAdUnit(): string {
  const p = getPlatform();
  const cfg = p.name === 'douyin' ? CONFIG.douyin : CONFIG.wechat;
  return cfg.rewardedAdUnitId;
}

export function bannerAdUnit(): string {
  const p = getPlatform();
  const cfg = p.name === 'douyin' ? CONFIG.douyin : CONFIG.wechat;
  return cfg.bannerAdUnitId;
}

/** 通关分享文案（带关卡号与花名） */
export function victoryShareTitle(levelId: number, steps: number, flowerName: string): string {
  return `我在《神树灵泉》第 ${levelId} 关用 ${steps} 步唤醒了「${flowerName}」，来试试？`;
}
