/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 重设 99 关布局指纹基线（scripts/fixtures/level-layout-hash.json）。
 *
 * 指纹的作用是"关卡数据不许被悄悄改动"：主题迁移、UI 重构都不该动到盘面。
 * 但难度重调（换初始朝向、重算 par、改预算）本来就会改指纹，所以需要一条
 * 明确的重新基线入口，而不是让 test_theme_content 一直红着。
 *
 * 跑之前必须先证明改动是有意的、且数据是自洽的：
 *   tsx scripts/solve-min-par.ts       → 需修正 0 关
 *   tsx scripts/audit-difficulty.ts    → 0 悬崖、0 毛刺
 * 然后把本文件和关卡数据放在同一个提交里，提交信息写清为什么重设。
 */

import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { layoutHash } from './level_hash';

const fixturePath = path.resolve(
  process.cwd(),
  'scripts/fixtures/level-layout-hash.json',
);

const before: Record<string, string> = fs.existsSync(fixturePath)
  ? (JSON.parse(fs.readFileSync(fixturePath, 'utf8')) as Record<string, string>)
  : {};

const next: Record<string, string> = {};
const changed: number[] = [];
for (const level of DEFAULT_LEVELS) {
  const key = String(level.id);
  next[key] = layoutHash(level);
  if (before[key] && before[key] !== next[key]) changed.push(level.id);
}

fs.writeFileSync(fixturePath, `${JSON.stringify(next, null, 2)}\n`);

console.log(
  `布局指纹已重设：${DEFAULT_LEVELS.length} 关，其中 ${changed.length} 关与旧基线不同`,
);
if (changed.length > 0) {
  const preview = changed.slice(0, 20).join(', ');
  console.log(
    `变化关：${preview}${changed.length > 20 ? ` …（共 ${changed.length} 关）` : ''}`,
  );
}
console.log(
  '提交前确认：solve-min-par 需修正 0 关；audit-difficulty 需 0 悬崖、0 毛刺。',
);
