import type { LevelConfig, LevelRules } from "../types/game";
import { DEFAULT_LEVELS } from "./defaultLevels";
import { LAB_LEVELS } from "./labLevels";

export interface Phase0Slice {
  key: string;
  kind: "rule" | "combo";
  sourceCode: string;
  validates: string[];
  level: LevelConfig;
}

const source = (code: string) => {
  const level =
    LAB_LEVELS.find((candidate) => candidate.code === code) ??
    DEFAULT_LEVELS.find((candidate) => candidate.code === code);
  if (!level) throw new Error(`Phase 0 缺少实验关 ${code}`);
  return level;
};

const ruleSlice = (key: string, code: string, validates: string[]): Phase0Slice => ({
  key,
  kind: "rule",
  sourceCode: code,
  validates,
  level: source(code),
});

const comboSlice = (
  key: string,
  code: string,
  sourceCode: string,
  id: number,
  title: string,
  rules: LevelRules,
  validates: string[],
): Phase0Slice => {
  const base = source(sourceCode);
  return {
    key,
    kind: "combo",
    sourceCode,
    validates,
    level: {
      ...base,
      id,
      code,
      title,
      subtitle: "组合探针",
      rules,
    },
  };
};

export const PHASE0_SLICES: Phase0Slice[] = [
  ruleSlice("axis", "P1", ["axis", "exact-par", "actionable-hint"]),
  ruleSlice("wrap-1", "T1", ["wrap", "seam-visual", "actionable-hint"]),
  ruleSlice("wrap-2", "T2", ["wrap", "two-seams", "actionable-hint"]),
  ruleSlice("wrap-3", "T3", ["wrap", "readability", "actionable-hint"]),
  ruleSlice("axis-conflict", "P2", ["axis", "conflict", "actionable-hint"]),
  ruleSlice("axis-boss", "P3", ["axis", "boss-shape", "actionable-hint"]),
  ruleSlice("goal", "S1", ["goal", "partial-clear", "actionable-hint"]),
  ruleSlice("weld-order", "W1", ["weld", "order", "lock-feedback"]),
  ruleSlice("weld-recovery", "W2", ["weld", "recovery", "lock-feedback"]),
  ruleSlice("colors", "73", ["colors", "colorblind redundancy", "actionable-hint"]),
  comboSlice(
    "wrap-weld",
    "W-1",
    "T1",
    934,
    "组合 · 跨缝后焊死",
    { wrap: true, weld: true },
    ["wrap", "weld", "combo", "actionable-hint"],
  ),
  comboSlice(
    "colors-weld",
    "C-2",
    "C2",
    935,
    "组合 · 串色后焊死",
    { colors: 2, weld: true },
    ["colors", "weld", "combo", "actionable-hint"],
  ),
];

export const PHASE0_COMBO_LEVELS = PHASE0_SLICES
  .filter((slice) => slice.kind === "combo")
  .map((slice) => slice.level);
