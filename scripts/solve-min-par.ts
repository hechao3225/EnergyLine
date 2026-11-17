/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 精确求解「本关最少步数」（par）：点亮全部花蕾所需的最少点击次数。
 *
 * ── 旧逻辑的缺陷 ──
 * 旧 par 来自生成器的 computeParSteps()：只算「把盘面还原成设计图」需要点几下。
 * 那只是众多可行解里的一个，玩家常能找到更短的等价解（设计图 13 步，实际 10 步即可），
 * 于是结算界面出现「仅用 10 步，正好是最少步数」和「本关最少步数 13 步」自相矛盾。
 *
 * ── 本求解器 ──
 * 求「任意合法解中的最少点击次数」：
 *   · 一次点击 = 顺时针旋转 90° 或 水闸合闸，均计 1 步
 *   · 每格枚举「端口组合 → 最少点击次数」
 *   · 点亮全部花蕾 ⟺ 存在一片含电池与全部花蕾的导通区域（取其生成树即可）
 *     → 以电池为根的有根树 DP：R[v][父端口][花蕾集合]，格子代价只付一次
 *   · 灵梭（diode）单向导通：父端口必须等于它的允许入流方向
 *   · 多电池 = Steiner 森林，按花蕾集合划分合并
 *
 * 用法：
 *   npx tsx scripts/solve-min-par.ts            # 只体检，打印差异
 *   npx tsx scripts/solve-min-par.ts --write    # 把新 par 写回关卡数据
 *   npx tsx scripts/solve-min-par.ts --level=3  # 只算一关
 */

import fs from 'fs';
import path from 'path';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import { Direction, LevelConfig, Tile } from '../src/types/game';
import { getDefaultBasePorts, rotatePorts, simulateCircuit } from '../src/utils/circuit';
import { getLevelContent } from '../src/content';
import { applyPlan, solveMinTaps } from '../src/utils/hint-solver';
import type { SolveResult } from '../src/utils/hint-solver';
export * from '../src/utils/hint-solver';

async function main() {
  const args = process.argv.slice(2);
  const shouldWrite = args.includes('--write');
  const forceAll = args.includes('--all-bulbs');
  const levelArg = args.find((a) => a.startsWith('--level='));
  const onlyLevel = levelArg ? Number(levelArg.split('=')[1]) : 0;
  const dataArg = (args.find((a) => a.startsWith('--data=')) || '--data=src').split('=')[1];
  const isMiniGame = dataArg === 'minigame';

  const levels: LevelConfig[] = isMiniGame
    ? ((await import('../minigame/src/logic/data/defaultLevels')) as any).DEFAULT_LEVELS
    : DEFAULT_LEVELS;

  const rows: string[] = [];
  const newPars = new Map<number, number>();
  let changed = 0;
  let failed = 0;
  let skipped = 0;
  const bigger: string[] = [];
  const trivial: string[] = [];
  let slowest = 0;

  for (const level of levels) {
    if (onlyLevel && level.id !== onlyLevel) {
      newPars.set(level.id, level.parSteps ?? 0);
      continue;
    }
    // 带 rules / 联动轴的关卡不走无约束求解器：无约束最短解可能串色/成环。
    if (level.rules || level.tiles.some((t) => t.axis)) {
      skipped++;
      newPars.set(level.id, level.parSteps ?? 0);
      rows.push(`SKIP L${level.id} ${(getLevelContent(level.id)?.title ?? `L${level.id}`)} 带规则/联动轴，par 由 audit-rules 复核`);
      continue;
    }
    const t0 = Date.now();
    let res: SolveResult;
    try {
      res = solveMinTaps(level, { ignoreGoal: forceAll });
    } catch (e) {
      failed++;
      rows.push(`❌ L${level.id} ${(getLevelContent(level.id)?.title ?? `L${level.id}`)} 求解异常：${(e as Error).message}`);
      continue;
    }
    const applied = applyPlan(level, res.plan);
    const goal = forceAll ? applied.total : (level.goal ?? applied.total);
    const ok = applied.lit >= goal && applied.taps === res.par;
    const ms = Date.now() - t0;
    slowest = Math.max(slowest, ms);
    newPars.set(level.id, res.par);
    const oldPar = level.parSteps ?? 0;

    if (!ok) {
      failed++;
      rows.push(
        `❌ L${level.id} ${(getLevelContent(level.id)?.title ?? `L${level.id}`)} 复核失败：方案点击 ${applied.taps} 步（声明 ${res.par}），点亮 ${applied.lit}/${applied.total}，目标 ${goal}`
      );
      continue;
    }
    if (res.par <= 5) trivial.push(`L${level.id}（${res.par} 步）`);
    if (res.par === oldPar) continue;
    changed++;
    const delta = oldPar - res.par;
    if (delta < 0) bigger.push(`L${level.id} ${(getLevelContent(level.id)?.title ?? `L${level.id}`)}: ${oldPar} → ${res.par}`);
    rows.push(
      `L${String(level.id).padStart(2, '0')} ${(getLevelContent(level.id)?.title ?? `L${level.id}`)}  旧 par ${oldPar} → 新 par ${res.par}  (${delta > 0 ? '-' : '+'}${Math.abs(delta)} 步)`
    );
  }

  console.log(rows.join('\n'));
  console.log(`\n合计 ${levels.length} 关：需修正 ${changed} 关，复核失败 ${failed} 关，跳过 ${skipped} 关（规则/联动轴，见 audit-rules），单关最慢 ${slowest}ms`);
  if (bigger.length) {
    console.log('\n真实最少步数比旧 par 更大的关卡（旧值偏乐观，玩家原本拿不到 4★）：');
    bigger.forEach((r) => console.log('  ' + r));
  }
  if (trivial.length) {
    console.log(`\n⚠️ 真正的「一/几点击穿」关卡 ${trivial.length} 关：${trivial.join(' ')}`);
    console.log('   （这些关的开局盘面几乎已经导通，属关卡设计问题，不是显示问题）');
  }

  if (!shouldWrite || failed > 0) return;

  const target = path.resolve(
    process.cwd(),
    isMiniGame ? 'minigame/src/logic/data/defaultLevels.ts' : 'src/data/defaultLevels.ts'
  );
  const importLine = isMiniGame
    ? "import { LevelConfig } from '../../types/game';"
    : "import { LevelConfig } from '../types/game';";
  const updated = levels.map((l) => ({ ...l, parSteps: newPars.get(l.id) ?? l.parSteps }));
  const header = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

${importLine}

`;
  fs.writeFileSync(target, header + `export const DEFAULT_LEVELS: LevelConfig[] = ${JSON.stringify(updated, null, 2)};\n`, 'utf8');
  console.log(`\n已写入 ${target}`);
}

if (process.argv[1] && process.argv[1].endsWith('solve-min-par.ts')) void main();
