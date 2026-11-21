/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 主线盘面去重审计（只读）：
 *   1. 不允许两关是同一盘面（D4 旋转/镜像 + 换色等价）；
 *   2. 任意两关盘面相似度不得超过阈值（默认 0.86），超过 0.80 记为警告；
 *   3. 展示文案的提示句不得整句重复。
 */
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { LEVEL_CONTENT } from '../src/content';
import { boardSimilarity, canonicalBoardKey } from './level-builders';

const SIMILARITY_FAIL = 0.86;
const SIMILARITY_WARN = 0.8;

const failures: string[] = [];
const warnings: string[] = [];

const keys = new Map<string, number[]>();
for (const level of DEFAULT_LEVELS) {
  const key = canonicalBoardKey(level);
  const bucket = keys.get(key) ?? [];
  bucket.push(level.id);
  keys.set(key, bucket);
}
for (const ids of keys.values()) {
  if (ids.length > 1) {
    failures.push('L' + ids.join('/L') + ' 是完全相同的盘面（含旋转/镜像等价）');
  }
}

const pairs: { a: number; b: number; score: number }[] = [];
for (let i = 0; i < DEFAULT_LEVELS.length; i++) {
  for (let j = i + 1; j < DEFAULT_LEVELS.length; j++) {
    const score = boardSimilarity(DEFAULT_LEVELS[i], DEFAULT_LEVELS[j]);
    if (score >= SIMILARITY_WARN) {
      pairs.push({ a: DEFAULT_LEVELS[i].id, b: DEFAULT_LEVELS[j].id, score: Number(score.toFixed(3)) });
    }
  }
}
pairs.sort((left, right) => right.score - left.score);
for (const pair of pairs) {
  const message = 'L' + pair.a + '~L' + pair.b + ' 盘面相似度 ' + pair.score.toFixed(3);
  if (pair.score >= SIMILARITY_FAIL) failures.push(message);
  else warnings.push(message);
}

const hints = new Map<string, number[]>();
for (const entry of LEVEL_CONTENT) {
  const bucket = hints.get(entry.hint) ?? [];
  bucket.push(entry.levelId);
  hints.set(entry.hint, bucket);
}
for (const [hint, ids] of hints) {
  if (ids.length > 1) {
    failures.push('L' + ids.join('/L') + ' 使用同一句提示：' + hint.slice(0, 30) + '…');
  }
}

const distinctBoards = keys.size;
console.log(
  '盘面去重审计：' + DEFAULT_LEVELS.length + ' 关 / ' + distinctBoards + ' 张不同盘面；' +
    '相似度≥' + SIMILARITY_FAIL + ' 有 ' + pairs.filter((pair) => pair.score >= SIMILARITY_FAIL).length + ' 对，' +
    '≥' + SIMILARITY_WARN + ' 有 ' + pairs.length + ' 对；' +
    '重复提示 ' + (LEVEL_CONTENT.length - hints.size) + ' 组',
);
if (warnings.length) {
  console.warn('相似度警告：');
  warnings.slice(0, 20).forEach((item) => console.warn('  ! ' + item));
}
if (failures.length) {
  console.error('盘面去重审计失败：' + failures.length + ' 项');
  failures.slice(0, 40).forEach((item) => console.error('  - ' + item));
  process.exit(1);
}
console.log('[PASS] 盘面去重审计通过');
