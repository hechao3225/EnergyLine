/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** 乐园宇宙的顶层区域；center 为现有 99 关主线。 */
export type ZoneId =
  | 'center'
  | 'cloud'
  | 'garden'
  | 'ocean'
  | 'observatory'
  | 'toy'
  | 'food'
  | 'cinema'
  | 'zoo'
  | 'dream'
  | 'festival';

export type ZoneStatus = 'open' | 'comingSoon';

export type CollectionRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CenterDistrict {
  id: string;
  name: string;
  /** 中心关卡区间，1-based，闭区间 */
  range: [number, number];
  subtitle: string;
  description: string;
}

export interface ZoneDef {
  id: ZoneId;
  order: number;
  name: string;
  subtitle: string;
  energyName: string;
  energyColor: string;
  palette: {
    primary: string;
    secondary: string;
    glow: string;
  };
  /** 该区域在主线中的代表设施 */
  facility: string;
  /** 世界地图节点占位图（public/assets/park 下的资源名） */
  nodeArt: string;
  /** 已实现的关卡区间；comingSoon 时为规划区间 */
  levelRange: [number, number] | null;
  plannedLevels: number;
  status: ZoneStatus;
  teaser: string;
}

export interface LevelContent {
  levelId: number;
  zoneId: ZoneId;
  district: string;
  title: string;
  subtitle: string;
  hint: string;
  winText: string;
}

export interface CollectionEntry {
  id: number;
  levelId: number;
  zoneId: ZoneId;
  name: string;
  alias: string;
  rarity: CollectionRarity;
  /** public/assets/park 下的资源名；Phase 2 用 exhibit-*，未生成前回退 carousel */
  artKey: string;
  lore: string;
  blessing: string;
}
