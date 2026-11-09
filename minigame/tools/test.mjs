/**
 * 单测运行器：esbuild 打包 tests/run.ts → node 执行（规避 Node ESM 扩展名限制）。
 */
import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const miniRoot = join(root, '..');
const cacheDir = join(miniRoot, '.cache');
mkdirSync(cacheDir, { recursive: true });
const outFile = join(cacheDir, 'test.cjs');

await build({
  entryPoints: [join(miniRoot, 'tests/run.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  sourcemap: 'inline',
  outfile: outFile,
  logLevel: 'warning',
});

const result = spawnSync('node', [outFile], { stdio: 'inherit' });
process.exit(result.status ?? 1);
