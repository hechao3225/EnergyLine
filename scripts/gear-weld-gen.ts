/**
 * 齿轮 + 焊死 组合实验关（K1–K3）。
 * 用 axis-gen 生成齿轮盘面并打上 weld 规则，再用顺序 DFS 证明最优解能按焊死规则执行完。
 * 只有“精确 par 的计划本身可行”才收关，这样焊死 par 才仍然等于原 par。
 */
import fs from 'node:fs';
import type { LevelConfig, Tile } from '../src/types/game';
import { simulateCircuit, rotatePorts } from '../src/utils/circuit';
import { generate, type GenSpec } from './axis-gen';
import { weldPlanSteps, weldStepsOrder } from './weld-order';

interface Spec extends GenSpec {
  subtitle: string;
  win: string;
  brief: string;
  minPhase: number;
}

const SPECS: Spec[] = [
  {
    id: 941,
    code: 'K1',
    title: '齿焊 · 整组一次成型',
    subtitle: '组合',
    hint: '齿轮一咬一反，焊死让它们只能对一次：先想清楚这组要转几下，再动手。',
    win: '试验通过：整组一次到位。',
    brief: '3 灯 · 1 组 2 齿 · 焊死',
    seed: 1,
    minPhase: 1,
    cells: 19,
    bulbs: 3,
    groups: [2],
    decoys: 3,
    par: [9, 12],
    tolerance: 2,
  },
  {
    id: 942,
    code: 'K2',
    title: '齿焊 · 先动远的',
    subtitle: '顺序',
    hint: '近处一接通，那组齿轮就焊死了。先把远的路上该转的转完。',
    win: '试验通过：远近分得清。',
    brief: '4 灯 · 1 组 3 齿 · 焊死',
    seed: 1,
    minPhase: 1,
    cells: 23,
    bulbs: 4,
    groups: [3],
    decoys: 3,
    par: [11, 15],
    tolerance: 2,
  },
  {
    id: 943,
    code: 'K3',
    title: '齿焊 · 两组都得算',
    subtitle: '双组',
    hint: '两组齿轮各要转不同的下数，而且谁先通电谁先锁。顺序比方向更要紧。',
    win: '试验通过：两组都没焊死。',
    brief: '4 灯 · 2 组（2 齿 + 2 齿）· 焊死',
    seed: 1,
    minPhase: 1,
    cells: 24,
    bulbs: 4,
    groups: [2, 2],
    decoys: 2,
    par: [12, 16],
    tolerance: 2,
  },
];

function ascii(level: LevelConfig): string {
  const chars: Record<number, string> = {
    1: '╵', 2: '╶', 3: '└', 4: '╷', 5: '│', 6: '┌', 7: '├',
    8: '╴', 9: '┘', 10: '─', 11: '┴', 12: '┐', 13: '┤', 14: '┬', 15: '┼',
  };
  const rows: string[] = [];
  for (let r = 0; r < level.gridRows; r++) {
    let line = '';
    for (let c = 0; c < level.gridCols; c++) {
      const t = level.tiles.find((x) => x.row === r && x.col === c);
      if (!t || t.type === 'empty') { line += ' ·'; continue; }
      if (t.type === 'battery') { line += ' S'; continue; }
      if (t.type === 'bulb') { line += ' O'; continue; }
      line += ' ' + (chars[rotatePorts(t.basePorts, t.rotation) % 16] ?? '?');
    }
    rows.push(line);
  }
  return rows.join('\n');
}

const levels: LevelConfig[] = [];
for (const spec of SPECS) {
  let hit: LevelConfig | null = null;
  let tapped = 0;
  for (let seed = 1; seed < 4000 && !hit; seed++) {
    const res = generate({ ...spec, seed, gear: true, weld: true });
    if (!res) continue;
    const candidate: LevelConfig = { ...res.level, subtitle: spec.subtitle, winText: spec.win };
    const init = simulateCircuit(candidate.tiles, candidate.gridRows, candidate.gridCols, candidate.rules);
    if (init.litCount !== 0) continue;
    const gears = candidate.tiles.filter((t: Tile) => t.axis);
    const dirs = new Set(gears.map((t: Tile) => t.axisDir ?? 1));
    if (dirs.size < 2) continue;
    const maxPhase = Math.max(0, ...Object.values(res.phases ?? {}).map(Number));
    if (maxPhase < spec.minPhase) continue;
    const steps = weldPlanSteps(
      res.phases ?? {},
      (res.individual ?? []).map((p: any) => ({ id: p.id, rotateTaps: p.taps })),
    );
    if (!weldStepsOrder(candidate, steps, 300000)) continue;
    hit = candidate;
    tapped = steps.reduce((sum, s) => sum + s.taps, 0);
  }
  if (!hit) {
    console.log('✗ ' + spec.code + ' 没有找到合格盘面');
    process.exitCode = 1;
    continue;
  }
  levels.push(hit);
  console.log('✓ ' + spec.code + ' ' + spec.title + ' —— par ' + hit.parSteps + ' / 预算 ' + hit.maxSteps + '，' + spec.brief);
  console.log(ascii(hit));
}

if (levels.length === SPECS.length && !process.argv.includes('--dry')) {
  const text =
    '/** 由 scripts/gear-weld-gen.ts 生成，勿手改。齿轮+焊死实验关 K1–K3（id 941–943）。 */\n' +
    'import type { LevelConfig } from "../types/game";\n\n' +
    'export const GEAR_WELD_LEVELS: LevelConfig[] = ' +
    JSON.stringify(levels, null, 2) +
    ';\n';
  fs.writeFileSync('src/data/gearWeldLevels.ts', text);
  console.log('写入 src/data/gearWeldLevels.ts（' + levels.length + ' 关）');
} else {
  console.log('未写文件：' + levels.length + '/' + SPECS.length);
}
