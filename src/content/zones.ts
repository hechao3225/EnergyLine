/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CenterDistrict, ZoneDef, ZoneId } from '../types/content';

/** 乐园中心的 5 个分区，沿用现有 20/20/20/20/19 的节奏。 */
export const CENTER_DISTRICTS: CenterDistrict[] = [
  {
    id: 'lost',
    name: '失落乐园',
    range: [1, 20],
    subtitle: '入口与迎宾区',
    description: '从迎宾门到星光门廊，第一束星光在这里重新亮起。',
  },
  {
    id: 'garden',
    name: '星光花园',
    range: [21, 40],
    subtitle: '旋转木马与花园区',
    description: '旋转木马、花房和音乐台，乐园最柔软的一段。',
  },
  {
    id: 'cloud',
    name: '云端奇境',
    range: [41, 60],
    subtitle: '摩天轮与云端区',
    description: '摩天轮、缆车与云桥，把星光送到最高的观景台。',
  },
  {
    id: 'rainbow',
    name: '虹彩天桥',
    range: [61, 80],
    subtitle: '天桥与光影区',
    description: '彩虹桥、棱镜塔和天幕，乐园最亮的一段。',
  },
  {
    id: 'peak',
    name: '梦幻之巅',
    range: [81, 99],
    subtitle: '城堡与终局区',
    description: '城堡、星门与大舞台，乐园中心的最后一处星光。',
  },
];

export const ZONES: ZoneDef[] = [
  {
    id: 'center',
    order: 0,
    name: '乐园中心',
    subtitle: '星光重新亮起的地方',
    energyName: '星光',
    energyColor: '#ffd76a',
    palette: { primary: '#ffcc45', secondary: '#712ed0', glow: '#ff9be0' },
    facility: '旋转木马',
    nodeArt: 'island',
    levelRange: [1, 99],
    plannedLevels: 99,
    status: 'open',
    teaser: '修复 99 处设施，让乐园中心重新亮起来。',
  },
  {
    id: 'cloud',
    order: 1,
    name: '云上飞行岛',
    subtitle: '把星光送上云层',
    energyName: '气流',
    energyColor: '#8fe3ff',
    palette: { primary: '#8fe3ff', secondary: '#5a8dee', glow: '#d8f6ff' },
    facility: '热气球',
    nodeArt: 'icon-map',
    levelRange: [100, 108],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '热气球、飞艇与风车，等一阵能把星光托起来的风。',
  },
  {
    id: 'garden',
    order: 2,
    name: '魔法植物园',
    subtitle: '会发光的植物',
    energyName: '生长能量',
    energyColor: '#7ee787',
    palette: { primary: '#7ee787', secondary: '#2f9e6b', glow: '#d9ffe0' },
    facility: '温室',
    nodeArt: 'flower-1',
    levelRange: [109, 117],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '温室、发光花与藤桥，生长能量正在土壤里醒来。',
  },
  {
    id: 'ocean',
    order: 3,
    name: '海底奇境馆',
    subtitle: '被海流点亮的水族馆',
    energyName: '海流',
    energyColor: '#4fd1c5',
    palette: { primary: '#4fd1c5', secondary: '#1d5f8a', glow: '#bff7ff' },
    facility: '水族馆',
    nodeArt: 'icon-gem',
    levelRange: [118, 126],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '水族馆、鲸鱼与珊瑚灯，海流会把星光带进深海。',
  },
  {
    id: 'observatory',
    order: 4,
    name: '星空天文台',
    subtitle: '离星光最近的地方',
    energyName: '星光',
    energyColor: '#a78bfa',
    palette: { primary: '#a78bfa', secondary: '#3b2f8f', glow: '#e9e0ff' },
    facility: '望远镜',
    nodeArt: 'icon-star',
    levelRange: [127, 135],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '望远镜、星门与行星仪，把乐园的星光接回夜空。',
  },
  {
    id: 'toy',
    order: 5,
    name: '奇趣玩具工坊',
    subtitle: '会自己运转的玩具',
    energyName: '机械动力',
    energyColor: '#ff9f68',
    palette: { primary: '#ff9f68', secondary: '#d94f3d', glow: '#ffe3c2' },
    facility: '玩具生产线',
    nodeArt: 'icon-gift',
    levelRange: [136, 144],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '玩具线、发条与积木，机械动力一接通就会自己玩起来。',
  },
  {
    id: 'food',
    order: 6,
    name: '甜梦美食街',
    subtitle: '香气也是一条能量线',
    energyName: '香气',
    energyColor: '#ffb7c5',
    palette: { primary: '#ffb7c5', secondary: '#c06a3a', glow: '#fff0e6' },
    facility: '甜品屋',
    nodeArt: 'icon-shop',
    levelRange: [145, 153],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '甜品屋、摊位与烤箱，香气会把游客一路引过来。',
  },
  {
    id: 'cinema',
    order: 7,
    name: '时光放映厅',
    subtitle: '把记忆投在银幕上',
    energyName: '光 / 记忆',
    energyColor: '#f6d365',
    palette: { primary: '#f6d365', secondary: '#7a4a2b', glow: '#fff6d9' },
    facility: '放映机',
    nodeArt: 'icon-play',
    levelRange: [154, 162],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '放映机、胶片与银幕，老乐园的记忆正在重新转动。',
  },
  {
    id: 'zoo',
    order: 8,
    name: '机械动物园',
    subtitle: '齿轮做的动物',
    energyName: '机械动力',
    energyColor: '#8bd3a8',
    palette: { primary: '#8bd3a8', secondary: '#4e6b5a', glow: '#e3ffe9' },
    facility: '机械象',
    nodeArt: 'icon-paw',
    levelRange: [163, 171],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '机械象、齿轮兽与笼车，通电之后它们会慢慢醒过来。',
  },
  {
    id: 'dream',
    order: 9,
    name: '梦境游乐场',
    subtitle: '会变化的奇幻关卡',
    energyName: '梦境能量',
    energyColor: '#c4b5fd',
    palette: { primary: '#c4b5fd', secondary: '#5b4b9e', glow: '#f1eaff' },
    facility: '梦境鲸',
    nodeArt: 'icon-hint',
    levelRange: [172, 180],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '梦境鲸、旋转杯与云朵，这里的关卡会在梦里换形状。',
  },
  {
    id: 'festival',
    order: 10,
    name: '节日庆典岛',
    subtitle: '烟花与舞台的终点',
    energyName: '庆典能量',
    energyColor: '#ffd166',
    palette: { primary: '#ffd166', secondary: '#c0392b', glow: '#fff3c4' },
    facility: '烟花台',
    nodeArt: 'icon-crown',
    levelRange: [181, 189],
    plannedLevels: 9,
    status: 'comingSoon',
    teaser: '烟花、舞台与雪人，乐园宇宙的每一年都在这里庆祝。',
  },
];

export function getZone(id: ZoneId): ZoneDef {
  return ZONES.find((zone) => zone.id === id) ?? ZONES[0];
}

export function getZoneForLevel(levelId: number): ZoneDef | null {
  return (
    ZONES.find(
      (zone) =>
        zone.levelRange !== null &&
        levelId >= zone.levelRange[0] &&
        levelId <= zone.levelRange[1],
    ) ?? null
  );
}

export function getDistrictForLevel(levelId: number): CenterDistrict | null {
  return (
    CENTER_DISTRICTS.find(
      (district) => levelId >= district.range[0] && levelId <= district.range[1],
    ) ?? null
  );
}

export interface ZoneProgress {
  cleared: number;
  total: number;
  percent: number;
}

export function getZoneProgress(zoneId: ZoneId, cleared: number[]): ZoneProgress {
  const zone = getZone(zoneId);
  const total =
    zone.status === 'open' && zone.levelRange
      ? zone.levelRange[1] - zone.levelRange[0] + 1
      : zone.plannedLevels;
  const count = zone.levelRange
    ? cleared.filter(
        (id) => id >= zone.levelRange![0] && id <= zone.levelRange![1],
      ).length
    : 0;
  return {
    cleared: count,
    total,
    percent: total > 0 ? Math.round((count / total) * 100) : 0,
  };
}
