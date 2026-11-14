/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 把关卡数据从「布局 + 文案」改为「只保留布局」。
 * 运行前必须已有 scripts/fixtures/level-layout-hash.json（由 generate_theme_content.ts 生成）。
 *
 *   npx tsx scripts/strip_level_text.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import type { LevelConfig } from '../src/types/game';
import { layoutHash } from './level_hash';

const fixturePath = path.resolve(process.cwd(), 'scripts/fixtures/level-layout-hash.json');
if (!fs.existsSync(fixturePath)) {
  throw new Error('缺少布局指纹，请先运行 scripts/generate_theme_content.ts');
}
const expected = JSON.parse(fs.readFileSync(fixturePath, 'utf8')) as Record<string, string>;

const mismatched = DEFAULT_LEVELS.filter(
  (level) => layoutHash(level) !== expected[String(level.id)],
);
if (mismatched.length > 0) {
  throw new Error(
    `布局与指纹不一致：${mismatched.map((level) => `L${level.id}`).join(', ')}。请重新生成指纹或回滚关卡数据。`,
  );
}

const layoutOnly: LevelConfig[] = DEFAULT_LEVELS.map((level) => ({
  id: level.id,
  code: level.code,
  totalLevels: level.totalLevels,
  gridRows: level.gridRows,
  gridCols: level.gridCols,
  maxSteps: level.maxSteps,
  parSteps: level.parSteps,
  tiles: level.tiles,
}));

const header = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 关卡布局与步数数据。展示文案在 src/content/levels.ts，主题迁移不再修改本文件。
 * 由 scripts/generate-99-levels.ts / scripts/strip_level_text.ts 生成。
 */

import { LevelConfig } from '../types/game';

export const DEFAULT_LEVELS: LevelConfig[] = `;

const target = path.resolve(process.cwd(), 'src/data/defaultLevels.ts');
fs.writeFileSync(target, `${header}${JSON.stringify(layoutOnly, null, 2)};\n`, 'utf8');
console.log(`已写入 ${layoutOnly.length} 关布局；布局指纹全部一致。`);
