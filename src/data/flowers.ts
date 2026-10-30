/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlowerEntry, FlowerRarity, FlowerShape } from '../types/flower';

const CHAPTER_MAP: Record<number, { chapter: 1 | 2 | 3 | 4 | 5; chapterName: string }> = {
  1: { chapter: 1, chapterName: '地脉之根' },
  2: { chapter: 2, chapterName: '巨木之干' },
  3: { chapter: 3, chapterName: '苍翠繁枝' },
  4: { chapter: 4, chapterName: '云海天桥' },
  5: { chapter: 5, chapterName: '神树之巅' },
};

function getChapterForLevel(levelId: number): { chapter: 1 | 2 | 3 | 4 | 5; chapterName: string } {
  if (levelId <= 20) return CHAPTER_MAP[1];
  if (levelId <= 40) return CHAPTER_MAP[2];
  if (levelId <= 60) return CHAPTER_MAP[3];
  if (levelId <= 80) return CHAPTER_MAP[4];
  return CHAPTER_MAP[5];
}

// 99 Unique curated Sacred Flowers
const SPECIAL_FLOWERS: Record<number, Partial<FlowerEntry>> = {
  1: {
    name: '灵露初蕾',
    alias: '破土迎晨',
    rarity: 'common',
    petalColor: '#34d399',
    glowColor: '#10b981',
    coreColor: '#fef08a',
    shape: 'lotus',
    lore: '神树最古老的引泉初花，饮初晨第一缕灵露而醒，散发着草木萌发的清香。',
    blessing: '生机勃发 · 开启守树人的灵泉启程',
  },
  2: {
    name: '青玉幽兰',
    alias: '幽谷清音',
    rarity: 'common',
    petalColor: '#2dd4bf',
    glowColor: '#14b8a6',
    coreColor: '#ecfdf5',
    shape: 'orchid',
    lore: '隐于深岩阴凉石穴中，瓣若青玉凝脂，香气若有若无，能安抚焦灼的心神。',
    blessing: '宁神清心 · 步数从容不迫',
  },
  3: {
    name: '绛珠仙草',
    alias: '丹华滴翠',
    rarity: 'rare',
    petalColor: '#f43f5e',
    glowColor: '#fb7185',
    coreColor: '#fef08a',
    shape: 'plum',
    lore: '受三万年天地灵气孕育，花落结为赤红绛珠，晶莹剔透，甘甜似醴。',
    blessing: '灵脉通达 · 唤醒沉睡潜能',
  },
  4: {
    name: '琉璃水仙',
    alias: '凌波照影',
    rarity: 'rare',
    petalColor: '#38bdf8',
    glowColor: '#0ea5e9',
    coreColor: '#ffffff',
    shape: 'crystal',
    lore: '生于清泉环绕的玉池，花瓣如同透光琉璃，倒映水光时会泛起七彩虹霓。',
    blessing: '水镜澄澈 · 洞悉水道转折',
  },
  5: {
    name: '双生并蒂莲',
    alias: '同心共济',
    rarity: 'rare',
    petalColor: '#ec4899',
    glowColor: '#f472b6',
    coreColor: '#fef9c3',
    shape: 'lotus',
    lore: '一茎双花，情意相通。唯有当灵泉同时滋润两处花托时，才会相伴舒展。',
    blessing: '双路通畅 · 分流不乱',
  },
  10: {
    name: '寒潭墨雪',
    alias: '玄冰初融',
    rarity: 'epic',
    petalColor: '#818cf8',
    glowColor: '#6366f1',
    coreColor: '#e0e7ff',
    shape: 'rose',
    lore: '在地脉万丈玄冰深处绽放，冷艳绝尘，遇温润灵泉方解千年寒霜。',
    blessing: '破冰融雪 · 开启通途',
  },
  20: {
    name: '地脉厚土莲',
    alias: '根深叶茂',
    rarity: 'epic',
    petalColor: '#fbbf24',
    glowColor: '#f59e0b',
    coreColor: '#fffbeb',
    shape: 'peony',
    lore: '第一章地脉之根的守护镇物，花瓣如金土沉凝，承载神树亿万须根的生机。',
    blessing: '根基磐石 · 第一章地脉圆满',
  },
  21: {
    name: '青藤翠玉华',
    alias: '破石凌霄',
    rarity: 'common',
    petalColor: '#10b981',
    glowColor: '#059669',
    coreColor: '#d1fae5',
    shape: 'jasmine',
    lore: '登上巨木躯干的首朵神花，枝叶紧扣树皮，生生不息。',
    blessing: '攀登不屈 · 步步为营',
  },
  30: {
    name: '紫霞海棠',
    alias: '烟霞凝露',
    rarity: 'rare',
    petalColor: '#a855f7',
    glowColor: '#9333ea',
    coreColor: '#f3e8ff',
    shape: 'camellia',
    lore: '神木树干晨雾中吸收紫气所结，薄如蝉翼的花瓣宛如朝霞拂面。',
    blessing: '紫气东来 · 逢凶化吉',
  },
  40: {
    name: '翡翠木心花',
    alias: '巨干定海',
    rarity: 'epic',
    petalColor: '#059669',
    glowColor: '#10b981',
    coreColor: '#6ee7b7',
    shape: 'lotus',
    lore: '孕育于神树心髓深处，通体如纯正帝王绿翡翠，流光溢彩，为第二章终焉花神。',
    blessing: '木心不朽 · 第二章巨干圆满',
  },
  50: {
    name: '金缕秋菊',
    alias: '傲霜凌风',
    rarity: 'rare',
    petalColor: '#f59e0b',
    glowColor: '#d97706',
    coreColor: '#fef3c7',
    shape: 'chrysanthemum',
    lore: '金丝万缕，开在苍翠枝叶交错处，香气清远，经久不散。',
    blessing: '心明眼亮 · 洞破玄机',
  },
  60: {
    name: '苍翠繁生花',
    alias: '千枝吐绿',
    rarity: 'epic',
    petalColor: '#0d9488',
    glowColor: '#14b8a6',
    coreColor: '#ccfbf1',
    shape: 'peony',
    lore: '第三章繁枝之巅的仙花，盛开时万鸟朝鸣，百兽共沐甘霖。',
    blessing: '繁茂昌盛 · 第三章繁枝圆满',
  },
  70: {
    name: '天青流云蕊',
    alias: '云深不知',
    rarity: 'rare',
    petalColor: '#0284c7',
    glowColor: '#38bdf8',
    coreColor: '#e0f2fe',
    shape: 'crystal',
    lore: '生于云海天桥虚无之间，花瓣凝云雾为露，触之微凉轻柔。',
    blessing: '踏云逐风 · 纵横自如',
  },
  80: {
    name: '云海仙霓兰',
    alias: '凌空绝顶',
    rarity: 'epic',
    petalColor: '#c084fc',
    glowColor: '#a855f7',
    coreColor: '#f5d0fe',
    shape: 'orchid',
    lore: '第四章云海神桥终极仙草，集天地祥云霞光于一身，七彩光晕流转不绝。',
    blessing: '霓裳羽衣 · 第四章云海圆满',
  },
  90: {
    name: '太虚玄极花',
    alias: '星汉浩渺',
    rarity: 'epic',
    petalColor: '#6366f1',
    glowColor: '#4f46e5',
    coreColor: '#c7d2fe',
    shape: 'celestial',
    lore: '立于罡风之上的九天奇珍，吸收日月精华与星辰引力而生。',
    blessing: '星汉灿烂 · 灵气浩瀚',
  },
  99: {
    name: '万树归元 · 永恒金莲',
    alias: '百花朝宗',
    rarity: 'legendary',
    petalColor: '#eab308',
    glowColor: '#facc15',
    coreColor: '#ffffff',
    shape: 'celestial',
    lore: '通天神树至高穹顶的万花之祖！当九十九重水脉全线贯通，永恒金莲在星海中盛开，神木通体金辉万道，三界重获永恒生机！',
    blessing: '万物复苏 · 登顶神木无上守护者',
  },
};

const FLOWER_NAME_PREFIXES = [
  '灵露', '玉池', '青灵', '丹霞', '碧漪', '飞霜', '玄月', '拂晓', '紫霄', '翠羽',
  '金蕊', '瑶光', '银汉', '素心', '流风', '若木', '含香', '照影', '听雨', '醉仙'
];

const FLOWER_NAME_SUFFIXES = [
  '幽兰', '仙草', '灵草', '水仙', '海棠', '芙蕖', '秋菊', '木棉', '寒梅', '杜鹃',
  '紫薇', '玉兰', '茉莉', '昙花', '合欢', '青莲', '金盏', '仙桂', '雪莲', '琼花'
];

const SHAPES: FlowerShape[] = [
  'lotus', 'orchid', 'plum', 'rose', 'peony', 'camellia', 'jasmine', 'chrysanthemum', 'crystal'
];

const PALETTES = [
  { petal: '#f43f5e', glow: '#fb7185', core: '#fef08a' }, // Rose Pink
  { petal: '#10b981', glow: '#34d399', core: '#ecfdf5' }, // Emerald Jade
  { petal: '#06b6d4', glow: '#38bdf8', core: '#e0f2fe' }, // Cyan Water
  { petal: '#8b5cf6', glow: '#a78bfa', core: '#ede9fe' }, // Violet Dream
  { petal: '#f59e0b', glow: '#fbbf24', core: '#fffbeb' }, // Amber Gold
  { petal: '#ec4899', glow: '#f472b6', core: '#fdf2f8' }, // Pink Lotus
  { petal: '#14b8a6', glow: '#2dd4bf', core: '#f0fdfa' }, // Teal Spring
  { petal: '#6366f1', glow: '#818cf8', core: '#eef2ff' }, // Indigo Star
];

// Cache for all 99 flowers
const ALL_FLOWERS: FlowerEntry[] = [];

for (let id = 1; id <= 99; id++) {
  const { chapter, chapterName } = getChapterForLevel(id);
  const special = SPECIAL_FLOWERS[id];

  if (special) {
    ALL_FLOWERS.push({
      id,
      name: special.name || `神树奇花 ${id}`,
      alias: special.alias || '灵泉之华',
      chapter,
      chapterName,
      rarity: special.rarity || 'common',
      petalColor: special.petalColor || '#10b981',
      glowColor: special.glowColor || '#34d399',
      coreColor: special.coreColor || '#fef08a',
      shape: special.shape || 'lotus',
      lore: special.lore || '生于神树枝桠间，受灵泉活水滋养而苏醒。',
      blessing: special.blessing || '生机焕发 · 庇佑神木',
    });
  } else {
    // Deterministic generation based on level id
    const prefix = FLOWER_NAME_PREFIXES[(id * 7 + 3) % FLOWER_NAME_PREFIXES.length];
    const suffix = FLOWER_NAME_SUFFIXES[(id * 11 + 5) % FLOWER_NAME_SUFFIXES.length];
    const palette = PALETTES[(id * 13) % PALETTES.length];
    const shape = SHAPES[(id * 17) % SHAPES.length];

    let rarity: FlowerRarity = 'common';
    if (id % 10 === 0) rarity = 'epic';
    else if (id % 3 === 0) rarity = 'rare';

    ALL_FLOWERS.push({
      id,
      name: `${prefix}${suffix}`,
      alias: `第${id}阶仙品`,
      chapter,
      chapterName,
      rarity,
      petalColor: palette.petal,
      glowColor: palette.glow,
      coreColor: palette.core,
      shape,
      lore: `神树第${id}重水脉枝桠孕育的古树灵葩。在清冽泉水的涤荡下，吐露幽芬。`,
      blessing: `气韵通达 · 启悟第${id}关灵智`,
    });
  }
}

export function getAllFlowers(): FlowerEntry[] {
  return ALL_FLOWERS;
}

export function getFlowerForLevel(levelId: number): FlowerEntry {
  const clamped = Math.max(1, Math.min(99, levelId));
  return ALL_FLOWERS[clamped - 1] || ALL_FLOWERS[0];
}
