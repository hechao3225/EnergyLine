/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 主线盘面修复配方（2026-11-19 去重）。
 *
 * 背景：v0.4.1 重排后出现 10 组完全同题、24 关与更早关只差 ≤4 格、
 * 一张环面盘面被 10 关共用；根因是生成器跨关复用同一份 solved 拓扑。
 * 这里用显式配方为冲突关重新选底盘（legacy / torus / wrap / colors / axis），
 * 配方确定性可复现，由 chapter*-gen.ts 产出后覆盖对应关卡。
 */
import type { LevelConfig, LevelRules } from '../src/types/game';
import { addSwitchToPlan, withScheduleMeta, type ScheduleMeta } from './chapter-level-utils';
import {
  addGearPair,
  scrambleSolved,
  solvedFromLegacy,
  solvedFromTorus,
  solvedTwoColorPaths,
} from './level-builders';
import { generateTorusLevel } from './torus-gen';
import { generateAlgorithmLayout } from './generate-99-levels';
import { generate as generateAxis } from './axis-gen';
import { solveRuleLevel } from '../src/utils/rule-solver';
import { CHAPTER1_SCHEDULE } from '../src/data/chapter1Schedule';
import { CHAPTER2_SCHEDULE } from '../src/data/chapter2Schedule';
import { CHAPTER3_SCHEDULE } from '../src/data/chapter3Schedule';
import { CHAPTER4_SCHEDULE } from '../src/data/chapter4Schedule';
import { CHAPTER5_SCHEDULE } from '../src/data/chapter5Schedule';

type Spec = ScheduleMeta;

const SPECS: Spec[] = [
  ...(CHAPTER1_SCHEDULE as unknown as Spec[]),
  ...(CHAPTER2_SCHEDULE as unknown as Spec[]),
  ...(CHAPTER3_SCHEDULE as unknown as Spec[]),
  ...(CHAPTER4_SCHEDULE as unknown as Spec[]),
  ...(CHAPTER5_SCHEDULE as unknown as Spec[]),
];

type ParBand = { parMin?: number; parMax?: number; decoys?: number };

export type RepairRecipe = ({ kind: 'legacy'; donor: number; rules?: LevelRules; goal?: number; gear?: boolean; tolerance: number }
  | { kind: 'torus'; seed: number; cells: number; bulbs: number; addSwitch?: boolean; tolerance: number }
  | { kind: 'wrap'; seed: number; cells: number; bulbs: number; rules: LevelRules; gear?: boolean; tolerance: number }
  | {
      kind: 'colors';
      seed: number;
      wrap?: boolean;
      weld?: boolean;
      minLen: number;
      maxLen: number;
      tolerance: number;
    }
  | { kind: 'axis'; seed: number; cells: number; bulbs: number; groups: number[]; tolerance: number }
  | {
      kind: 'layout';
      rows: number;
      cols: number;
      sources: number;
      bulbs: number;
      variant: number;
      goal?: number;
      tolerance: number;
    }) &
  ParBand;

/** 修复配方表：只列需要重建的关卡，键为关卡 id。 */
export const REPAIR_RECIPES: Record<number, RepairRecipe> = {
  4: {kind: "legacy", donor: 67, tolerance: 3},
  6: {kind: "legacy", donor: 72, tolerance: 3},
  7: {kind: "legacy", donor: 2, decoys: 6, parMin: 9, parMax: 9, tolerance: 3},
  18: {kind: "torus", seed: 48, cells: 17, bulbs: 2, addSwitch: true, tolerance: 2},
  26: {kind: "torus", seed: 273, cells: 24, bulbs: 3, tolerance: 2},
  33: {kind: "legacy", donor: 47, goal: 3, tolerance: 2},
  36: {kind: "legacy", donor: 94, tolerance: 2},
  42: {kind: "legacy", donor: 95, rules: {weld: true}, tolerance: 2},
  47: {kind: "legacy", donor: 30, goal: 2, tolerance: 2},
  51: {kind: "torus", seed: 654, cells: 24, bulbs: 3, tolerance: 2},
  52: {kind: "legacy", donor: 88, tolerance: 2},
  57: {kind: "legacy", donor: 98, rules: {weld: true}, tolerance: 2},
  58: {kind: "legacy", donor: 3, gear: true, tolerance: 2},
  59: {kind: "legacy", donor: 85, goal: 4, parMin: 17, parMax: 17, tolerance: 0},
  62: {kind: "torus", seed: 1358, cells: 24, bulbs: 4, tolerance: 2},
  63: {kind: "torus", seed: 361, cells: 23, bulbs: 4, tolerance: 2},
  65: {kind: "torus", seed: 1029, cells: 22, bulbs: 4, tolerance: 2},
  66: {kind: "colors", seed: 1, wrap: true, minLen: 6, maxLen: 9, tolerance: 2},
  68: {kind: "wrap", seed: 681, cells: 26, bulbs: 4, rules: {wrap: true}, parMin: 21, parMax: 21, tolerance: 2},
  69: {kind: "wrap", seed: 165, cells: 25, bulbs: 4, rules: {wrap: true}, tolerance: 2},
  70: {kind: "legacy", donor: 34, rules: {weld: true}, decoys: 2, parMin: 17, parMax: 17, tolerance: 2},
  71: {kind: "colors", seed: 1, minLen: 6, maxLen: 10, decoys: 6, parMin: 17, parMax: 17, tolerance: 2},
  72: {kind: "colors", seed: 40, minLen: 6, maxLen: 10, decoys: 6, parMin: 19, parMax: 19, tolerance: 2},
  74: {kind: "colors", seed: 80, minLen: 6, maxLen: 10, decoys: 6, parMin: 19, parMax: 19, tolerance: 2},
  78: {kind: "wrap", seed: 594, cells: 25, bulbs: 4, rules: {wrap: true}, tolerance: 2},
  79: {kind: "wrap", seed: 341, cells: 24, bulbs: 4, rules: {wrap: true}, tolerance: 2},
  80: {kind: "colors", seed: 121, wrap: true, minLen: 7, maxLen: 11, decoys: 4, parMin: 23, parMax: 23, tolerance: 2},
  81: {kind: "wrap", seed: 165, cells: 24, bulbs: 4, rules: {wrap: true, weld: true}, tolerance: 2},
  82: {kind: "wrap", seed: 487, cells: 23, bulbs: 4, rules: {wrap: true, weld: true}, parMin: 20, parMax: 20, tolerance: 2},
  83: {kind: "legacy", donor: 25, rules: {weld: true}, tolerance: 2},
  84: {kind: "wrap", seed: 165, cells: 24, bulbs: 4, rules: {wrap: true}, gear: true, tolerance: 2},
  85: {kind: "wrap", seed: 1086, cells: 24, bulbs: 4, rules: {wrap: true}, gear: true, parMin: 22, parMax: 22, tolerance: 2},
  87: {kind: "colors", seed: 161, weld: true, minLen: 6, maxLen: 10, tolerance: 2},
  88: {kind: "colors", seed: 202, weld: true, minLen: 6, maxLen: 10, tolerance: 2},
  90: {kind: "layout", rows: 6, cols: 6, sources: 1, bulbs: 5, variant: 0, goal: 4, tolerance: 2},
  91: {kind: "legacy", donor: 97, goal: 4, tolerance: 2},
  97: {kind: "legacy", donor: 99, rules: {weld: true}, goal: 5, tolerance: 2},
};

function specOf(id: number): Spec {
  const spec = SPECS.find((item) => item.id === id);
  if (!spec) throw new Error('修复配方缺少排期：L' + id);
  return spec;
}

function buildFromRecipe(id: number, recipe: RepairRecipe): LevelConfig {
  const spec = specOf(id);
  const band = {
    id,
    targetPar: spec.targetPar,
    parMin: recipe.parMin ?? spec.parMin,
    parMax: recipe.parMax ?? spec.parMax,
  };
  if (recipe.kind === 'legacy') {
    let solved = solvedFromLegacy(recipe.donor);
    if (!solved) throw new Error('L' + id + ' 修复拓扑 L' + recipe.donor + ' 无解');
    if (recipe.gear) {
      const geared = addGearPair(solved);
      if (!geared) throw new Error('L' + id + ' 拓扑 L' + recipe.donor + ' 没有可配对齿轮');
      solved = geared;
    }
    const built = scrambleSolved(band, solved, {
      rules: recipe.rules,
      goal: recipe.goal,
      tolerance: recipe.tolerance,
      decoys: recipe.decoys,
      seedLimit: 400,
    });
    return withScheduleMeta(built, spec, recipe.tolerance);
  }
  if (recipe.kind === 'torus') {
    let level = generateTorusLevel(
      {
        id,
        code: String(id),
        title: spec.title,
        subtitle: '',
        hint: spec.hint,
        win: '',
        cells: recipe.cells,
        bulbs: recipe.bulbs,
        par: [band.parMin, band.parMax],
        tolerance: recipe.tolerance,
        seed: recipe.seed,
      },
      recipe.seed,
    );
    if (!level) throw new Error('L' + id + ' 环面配方生成失败');
    if (recipe.addSwitch) {
      level = addSwitchToPlan(level);
      const solution = solveRuleLevel({ ...level, id });
      if (!solution) throw new Error('L' + id + ' 加闸后无解');
      level = { ...level, parSteps: solution.par, maxSteps: solution.par + recipe.tolerance };
    }
    return withScheduleMeta(level, spec, recipe.tolerance);
  }
  if (recipe.kind === 'wrap') {
    let solved = solvedFromTorus(id, recipe.seed, {
      cells: recipe.cells,
      bulbs: recipe.bulbs,
      par: [Math.max(4, spec.parMin - 6), spec.parMax + 6],
    });
    if (!solved) throw new Error('L' + id + ' 环面基线生成失败');
    if (recipe.gear) {
      const geared = addGearPair(solved);
      if (!geared) throw new Error('L' + id + ' 无可配对齿轮');
      solved = geared;
    }
    const built = scrambleSolved(band, solved, {
      rules: recipe.rules,
      requireSeam: true,
      tolerance: recipe.tolerance,
      decoys: recipe.decoys,
      seedLimit: 400,
    });
    return withScheduleMeta(built, spec, recipe.tolerance);
  }
  if (recipe.kind === 'layout') {
    const config = {
      range: [1, 99] as [number, number],
      chapterName: '乐园',
      rows: recipe.rows,
      cols: recipe.cols,
      minSources: recipe.sources,
      maxSources: recipe.sources,
      minBulbs: recipe.bulbs,
      maxBulbs: recipe.bulbs,
      allowSwitch: false,
      allowDiode: false,
      allowCross: true,
      lockedObstacles: 0,
      parRange: [spec.parMin, spec.parMax] as [number, number],
      parFloor: spec.parMin,
      titles: [spec.title],
    };
    const solved = generateAlgorithmLayout(id, config, recipe.variant).solved;
    const built = scrambleSolved(band, solved, {
      goal: recipe.goal,
      tolerance: recipe.tolerance,
      rows: recipe.rows,
      cols: recipe.cols,
      decoys: recipe.decoys,
      seedLimit: 400,
    });
    return withScheduleMeta(built, spec, recipe.tolerance);
  }
  if (recipe.kind === 'colors') {
    const solved = solvedTwoColorPaths(recipe.seed, {
      wrap: recipe.wrap,
      minLen: recipe.minLen,
      maxLen: recipe.maxLen,
    });
    if (!solved) throw new Error('L' + id + ' 双色拓扑生成失败');
    const built = scrambleSolved(band, solved, {
      rules: { colors: 2, ...(recipe.wrap ? { wrap: true } : {}), ...(recipe.weld ? { weld: true } : {}) },
      requireSeam: Boolean(recipe.wrap),
      tolerance: recipe.tolerance,
      decoys: recipe.decoys,
      seedLimit: 300,
    });
    return withScheduleMeta(built, spec, recipe.tolerance);
  }
  const generated = generateAxis({
    id,
    code: String(id),
    title: spec.title,
    hint: spec.hint,
    cells: recipe.cells,
    bulbs: recipe.bulbs,
    groups: recipe.groups,
    decoys: 1,
    par: [spec.parMin, spec.parMax],
    tolerance: recipe.tolerance,
    seed: recipe.seed,
    gear: true,
  });
  if (!generated) throw new Error('L' + id + ' 齿轮配方生成失败');
  return withScheduleMeta(generated.level, spec, recipe.tolerance);
}

const repaired = new Map<number, LevelConfig>();

/** 按配方重建单关（供脚本与审计复用）。 */
export function buildRepairedLevel(id: number): LevelConfig {
  const recipe = REPAIR_RECIPES[id];
  if (!recipe) throw new Error('L' + id + ' 没有修复配方');
  return buildFromRecipe(id, recipe);
}

/** 用修复配方覆盖指定关卡；未列出的关卡原样返回。 */
export function applyLevelRepairs(levels: LevelConfig[]): LevelConfig[] {
  return levels.map((level) => {
    const recipe = REPAIR_RECIPES[level.id];
    if (!recipe) return level;
    const cached = repaired.get(level.id);
    if (cached) return cached;
    const built = buildFromRecipe(level.id, recipe);
    repaired.set(level.id, built);
    return built;
  });
}