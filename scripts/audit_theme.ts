/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 主题审计：正式 UI/配置/关卡数据里不得再出现旧世界观词。
 * 内容层的 glossary.ts 自身除外（它必须列出禁用词）。
 */

import fs from 'node:fs';
import path from 'node:path';
import { BANNED_TERMS } from '../src/content/glossary';

const ROOT = process.cwd();
const TARGETS = [
  'src',
  'index.html',
  'vite.config.ts',
  'metadata.json',
  'android/app/src/main/res/values/strings.xml',
];
const EXCLUDED = new Set(['src/content/glossary.ts']);
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.html', '.json', '.css', '.xml']);

const hits: string[] = [];

function scan(file: string) {
  if (!fs.existsSync(file)) return;
  const stat = fs.statSync(file);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(file)) scan(path.join(file, entry));
    return;
  }
  const rel = path.relative(ROOT, file);
  if (EXCLUDED.has(rel) || !EXTENSIONS.has(path.extname(file))) return;
  const text = fs.readFileSync(file, 'utf8');
  for (const term of BANNED_TERMS) {
    let index = 0;
    while ((index = text.indexOf(term, index)) !== -1) {
      const line = text.slice(0, index).split('\n').length;
      hits.push(`${rel}:${line} ${term}`);
      index += term.length;
    }
  }
}

TARGETS.forEach((target) => scan(path.resolve(ROOT, target)));

if (hits.length > 0) {
  console.error(`主题审计失败：${hits.length} 处旧世界观词`);
  hits.slice(0, 80).forEach((hit) => console.error(`  ${hit}`));
  process.exit(1);
}

console.log('主题审计通过：0 处旧世界观词');
