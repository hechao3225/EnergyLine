/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 乐园宇宙内容层回归：99 关文案、99 件藏品、11 个区域、14 个成就，
 * 以及主题迁移前后关卡布局完全不变。
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  BANNED_TERMS,
  CENTER_DISTRICTS,
  COLLECTION,
  LEVEL_CONTENT,
  ZONES,
  getCollectionEntry,
  getLevelContent,
  getZoneForLevel,
} from '../src/content';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { ALL_ACHIEVEMENTS } from '../src/utils/achievements';
import { PARK_STORAGE_KEY, PROGRESS_VERSION_KEY } from '../src/utils/parkProgress';
import { layoutHash } from './level_hash';

const failures: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) failures.push(message);
};

const contentIds = LEVEL_CONTENT.map((entry) => entry.levelId);
const collectionIds = COLLECTION.map((entry) => entry.id);
const titles = LEVEL_CONTENT.map((entry) => entry.title);
const names = COLLECTION.map((entry) => entry.name);

check(LEVEL_CONTENT.length === 99, `关卡文案应为 99 条，实际 ${LEVEL_CONTENT.length}`);
check(COLLECTION.length === 99, `藏品应为 99 条，实际 ${COLLECTION.length}`);
check(new Set(contentIds).size === 99, '关卡文案 levelId 有重复');
check(new Set(collectionIds).size === 99, '藏品 id 有重复');
check(new Set(titles).size === 99, '关卡标题有重复');
check(new Set(names).size === 99, '藏品名字有重复');
check(contentIds.every((id) => id >= 1 && id <= 99), '关卡文案 levelId 必须落在 1–99');
check(collectionIds.every((id) => id >= 1 && id <= 99), '藏品 id 必须落在 1–99');

const ART_KEY_RE = /^exhibit-(?:[a-z][a-z-]*|\d{3})$/;
const ART_KEYS = new Set([
  'exhibit-carousel',
  'exhibit-wheel',
  'exhibit-fountain',
  'exhibit-arch',
  'exhibit-lamp',
  'exhibit-stage',
  'exhibit-balloon',
  'exhibit-train',
  'exhibit-aquarium',
  'exhibit-telescope',
  'exhibit-toy',
  'exhibit-clock',
]);

for (const entry of LEVEL_CONTENT) {
  check(entry.title.length <= 16, `L${entry.levelId} 标题过长：${entry.title}`);
  check(entry.hint.length <= 80, `L${entry.levelId} 提示过长：${entry.hint.length} 字`);
  for (const term of BANNED_TERMS) {
    check(!entry.title.includes(term), `L${entry.levelId} 标题含禁用词 ${term}`);
    check(!entry.hint.includes(term), `L${entry.levelId} 提示含禁用词 ${term}`);
  }
}

check(new Set(COLLECTION.map((entry) => entry.artKey)).size === COLLECTION.length, '藏品 artKey 应唯一，不能复用分类图');

for (const entry of COLLECTION) {
  check(ART_KEY_RE.test(entry.artKey), `L${entry.levelId} 藏品 artKey 非法：${entry.artKey}`);
  check(entry.zoneId === 'center', `L${entry.levelId} 藏品 zoneId 应为 center`);
  for (const term of BANNED_TERMS) {
    check(!entry.name.includes(term), `L${entry.levelId} 藏品名含禁用词 ${term}`);
    check(!entry.lore.includes(term), `L${entry.levelId} 藏品故事含禁用词 ${term}`);
  }
}

check(ZONES.length === 11, `区域应为 11 个，实际 ${ZONES.length}`);
check(CENTER_DISTRICTS.length === 5, `中心分区应为 5 个，实际 ${CENTER_DISTRICTS.length}`);
const center = ZONES.find((zone) => zone.id === 'center');
check(center?.levelRange?.[0] === 1 && center?.levelRange?.[1] === 99, '中心关卡区间应为 1–99');
for (const zone of ZONES.filter((item) => item.id !== 'center')) {
  check(zone.status === 'comingSoon', `${zone.name} 首版应为 comingSoon`);
  check(zone.levelRange !== null && zone.levelRange[1] - zone.levelRange[0] + 1 === 9, `${zone.name} 规划关卡应为 9 关`);
}

const ACHIEVEMENT_IDS = [
  'ten_steps_clear',
  'undo_master',
  'consecutive_perfect',
  'first_spark',
  'circuit_adept',
  'master_engineer',
  'circuit_grandmaster',
  'switch_operator',
  'time_traveler',
  'speed_optimizer',
  'perfectionist',
  'endless_scout',
  'endless_champion',
  'hall_of_fame',
];
check(ALL_ACHIEVEMENTS.length === ACHIEVEMENT_IDS.length, '成就数量变化');
check(
  ALL_ACHIEVEMENTS.every((achievement, index) => achievement.id === ACHIEVEMENT_IDS[index]),
  '成就 ID 或顺序发生变化（会重置已解锁记录）',
);
for (const achievement of ALL_ACHIEVEMENTS) {
  for (const term of BANNED_TERMS) {
    check(!achievement.title.includes(term), `${achievement.id} 标题含禁用词 ${term}`);
    check(!achievement.description.includes(term), `${achievement.id} 描述含禁用词 ${term}`);
  }
}

check(PARK_STORAGE_KEY === 'energy_park_progress_v2', '存档键被修改');
check(PROGRESS_VERSION_KEY === 'honeycomb_progress_version', '进度版本键被修改');

// 布局指纹：主题迁移不能改变任何 tiles/par/maxSteps
const fixturePath = path.resolve(process.cwd(), 'scripts/fixtures/level-layout-hash.json');
check(fs.existsSync(fixturePath), '缺少布局指纹文件');
if (fs.existsSync(fixturePath)) {
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8')) as Record<string, string>;
  check(DEFAULT_LEVELS.length === 99, `关卡布局应为 99 关，实际 ${DEFAULT_LEVELS.length}`);
  for (const level of DEFAULT_LEVELS) {
    check(
      layoutHash(level) === fixture[String(level.id)],
      `L${level.id} 布局与基线不一致（有意改动请跑 npm run baseline:levels）`,
    );
    for (const key of ['title', 'subtitle', 'hintText', 'winText']) {
      check(!(key in level), `L${level.id} 仍带展示字段 ${key}，应放在 src/content/levels.ts`);
    }
  }
}

// 提示必须提到本关实际机制
for (const level of DEFAULT_LEVELS) {
  const entry = getLevelContent(level.id);
  check(entry !== null, `L${level.id} 缺少关卡文案`);
  if (!entry) continue;
  const has = (type: string) => level.tiles.some((tile) => tile.type === type);
  const locked = level.tiles.some(
    (tile) => tile.locked && tile.type !== 'battery' && tile.type !== 'bulb',
  );
  const batteries = level.tiles.filter((tile) => tile.type === 'battery').length;
  const bulbs = level.tiles.filter((tile) => tile.type === 'bulb').length;
  if (has('switch')) check(entry.hint.includes('闸'), `L${level.id} 提示未提能量闸`);
  if (has('diode')) check(entry.hint.includes('单向阀'), `L${level.id} 提示未提单向阀`);
  if (has('cross')) check(entry.hint.includes('十字'), `L${level.id} 提示未提十字管`);
  if (locked) check(entry.hint.includes('固定管道'), `L${level.id} 提示未提固定管道`);
  if (batteries > 1) check(entry.hint.includes('多源'), `L${level.id} 提示未提多源`);
  if (bulbs >= 5) check(entry.hint.includes('主干'), `L${level.id} 提示未提主干/支路`);
}

check(getLevelContent(999) === null, 'getLevelContent(999) 应返回 null');
check(getCollectionEntry(999) === null, 'getCollectionEntry(999) 应返回 null');
check(getZoneForLevel(-1) === null, 'getZoneForLevel(-1) 应返回 null');
check(getZoneForLevel(1)?.id === 'center', '第 1 关应属于乐园中心');
check(getCollectionEntry(1) !== null, '第 1 关应有藏品');

if (failures.length > 0) {
  console.error(`主题内容回归失败：${failures.length} 项`);
  failures.slice(0, 80).forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log('主题内容回归通过：99 关文案 / 99 件藏品 / 11 个区域 / 14 个成就 / 布局指纹一致');
