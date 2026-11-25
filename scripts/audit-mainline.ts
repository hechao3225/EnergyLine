import { CHAPTER1_SCHEDULE, type Chapter1Spec } from "../src/data/chapter1Schedule";
import { CHAPTER2_SCHEDULE, type Chapter2Spec } from "../src/data/chapter2Schedule";
import { CHAPTER3_SCHEDULE, type Chapter3Spec } from "../src/data/chapter3Schedule";
import { CHAPTER4_SCHEDULE, type Chapter4Spec } from "../src/data/chapter4Schedule";
import { CHAPTER5_SCHEDULE, type Chapter5Spec } from "../src/data/chapter5Schedule";
import { DEFAULT_LEVELS } from "../src/data/defaultLevels";
import { scoreBurden, type BurdenScore } from "../src/utils/burden";
import { getTilePorts } from "../src/utils/circuit";
import { solveRuleLevel } from "../src/utils/rule-solver";

type MainlineSpec =
  | Chapter1Spec
  | Chapter2Spec
  | Chapter3Spec
  | Chapter4Spec
  | Chapter5Spec;

interface AuditRow {
  spec: MainlineSpec;
  chapter: number;
  par: number;
  burden: BurdenScore;
}

const SPECS: MainlineSpec[] = [
  ...CHAPTER1_SCHEDULE,
  ...CHAPTER2_SCHEDULE,
  ...CHAPTER3_SCHEDULE,
  ...CHAPTER4_SCHEDULE,
  ...CHAPTER5_SCHEDULE,
];

let failures = 0;

function fail(rule: string, message: string) {
  failures++;
  console.error(`[FAIL] ${rule} ${message}`);
}

function chapterOf(id: number): number {
  return Math.min(5, Math.ceil(id / 20));
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function range(values: number[]): number {
  return Math.max(...values) - Math.min(...values);
}

function percentile(values: number[], ratio: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.ceil(ratio * sorted.length) - 1];
}

function auditR1(rows: AuditRow[]) {
  for (let chapter = 1; chapter <= 5; chapter++) {
    const chapterRows = rows.filter((row) => row.chapter === chapter);
    for (let index = 1; index < chapterRows.length; index++) {
      const maxJump = index === chapterRows.length - 1 ? 5 : 3;
      const jump = chapterRows[index].par - chapterRows[index - 1].par;
      if (Math.abs(jump) > maxJump) {
        fail(
          "R1",
          `L${chapterRows[index - 1].spec.id} → L${chapterRows[index].spec.id} ` +
            `par 跳变 ${jump >= 0 ? "+" : ""}${jump}`,
        );
      }
    }
  }
}

function auditR2(rows: AuditRow[]) {
  for (let chapter = 1; chapter <= 5; chapter++) {
    const pars = rows
      .filter((row) => row.chapter === chapter)
      .map((row) => row.par);
    let runStart = -1;
    let lastQualifiedEnd = -1;
    let longest: { start: number; end: number } | null = null;

    for (let end = 3; end < pars.length; end++) {
      const windowStart = end - 3;
      if (range(pars.slice(windowStart, end + 1)) > 2) continue;
      if (runStart < 0 || lastQualifiedEnd !== end - 1) {
        runStart = windowStart;
      }
      lastQualifiedEnd = end;
      if (!longest || end - runStart > longest.end - longest.start) {
        longest = { start: runStart, end };
      }
    }

    if (longest && longest.end - longest.start + 1 > 4) {
      const firstId = rows.filter((row) => row.chapter === chapter)[longest.start].spec.id;
      const lastId = rows.filter((row) => row.chapter === chapter)[longest.end].spec.id;
      fail(
        "R2",
        `第 ${chapter} 章 L${firstId}–L${lastId} 低波动窗口长 ${longest.end - longest.start + 1} 关`,
      );
    }
  }
}

function auditR3AndR5(rows: AuditRow[]) {
  for (let chapter = 1; chapter <= 5; chapter++) {
    const chapterRows = rows.filter((row) => row.chapter === chapter);
    const pars = chapterRows.map((row) => row.par);
    const chapterMean = mean(pars);
    const peaks = pars.filter((par) => par >= chapterMean + 2).length;
    const valleys = pars.filter((par) => par <= chapterMean - 2).length;
    if (peaks < 2) fail("R3", `第 ${chapter} 章只有 ${peaks} 个峰关`);
    if (valleys < 1) fail("R3", `第 ${chapter} 章只有 ${valleys} 个谷关`);

    const boss = chapterRows.at(-1)!;
    const secondHighest = Math.max(...pars.slice(0, -1));
    if (boss.par < secondHighest + 2) {
      fail(
        "R5",
        `L${boss.spec.id} boss ${boss.par} 未高于次高 ${secondHighest} + 2`,
      );
    }
  }
}

function auditR4(rows: AuditRow[]) {
  const chapterThresholds = new Map<number, number>();
  for (let chapter = 1; chapter <= 5; chapter++) {
    chapterThresholds.set(
      chapter,
      percentile(
        rows
          .filter((row) => row.chapter === chapter)
          .map((row) => row.burden.challenge),
        0.8,
      ),
    );
  }

  const seen = new Set<string>();
  for (const row of rows) {
    for (const tag of row.spec.mechanicTags) {
      if (tag === "basic" || seen.has(tag)) continue;
      seen.add(tag);
      const threshold = chapterThresholds.get(row.chapter)!;
      if (row.burden.challenge > threshold) {
        fail(
          "R4",
          `L${row.spec.id} 首次出现 ${tag}：challenge ${row.burden.challenge} > 章内 P80 ${threshold}`,
        );
      }
    }
  }
}

function auditR6(rows: AuditRow[]) {
  const lastByMechanicAndRole = new Map<string, AuditRow>();
  for (const row of rows) {
    if (row.spec.role !== "变" && row.spec.role !== "考" && row.spec.role !== "boss") {
      continue;
    }
    const key = `${row.spec.primaryMechanic}|${row.spec.role}`;
    const previous = lastByMechanicAndRole.get(key);
    if (
      previous &&
      previous.burden.challenge - row.burden.challenge > 10
    ) {
      fail(
        "R6",
        `L${previous.spec.id} → L${row.spec.id} ${row.spec.primaryMechanic} ` +
          `challenge ${previous.burden.challenge} → ${row.burden.challenge}（${row.spec.role}）`,
      );
    }
    lastByMechanicAndRole.set(key, row);
  }
}

function auditR7(rows: AuditRow[]) {
  const means: number[] = [];
  for (let chapter = 1; chapter <= 5; chapter++) {
    means.push(
      mean(
        rows
          .filter((row) => row.chapter === chapter)
          .map((row) => row.burden.challenge),
      ),
    );
  }

  if (means[0] < 45 || means[0] > 55) {
    fail("R7", `第 1 章 challenge 章均 ${means[0].toFixed(2)} 不在 45–55`);
  }
  for (const [fromIndex, toIndex] of [
    [0, 1],
    [1, 2],
  ] as const) {
    const delta = means[toIndex] - means[fromIndex];
    if (delta < 6) {
      fail(
        "R7",
        `第 ${fromIndex + 1} → ${toIndex + 1} 章 challenge 章均只增加 ${delta.toFixed(2)}`,
      );
    }
  }
  if (means[3] < means[2] - 2) {
    fail(
      "R7",
      `第 3 → 4 章 challenge 章均回落 ${(means[2] - means[3]).toFixed(2)}，超过 2`,
    );
  }
  if (means[4] < means[3]) {
    fail(
      "R7",
      `第 4 → 5 章 challenge 章均回落 ${(means[3] - means[4]).toFixed(2)}`,
    );
  }
  if (means[4] - means[0] < 15) {
    fail(
      "R7",
      `第 1 → 5 章 challenge 章均只增加 ${(means[4] - means[0]).toFixed(2)}`,
    );
  }
  if (means[4] > 80) {
    fail("R7", `第 5 章 challenge 章均 ${means[4].toFixed(2)} > 80`);
  }
}

function auditQuestionRotation(rows: AuditRow[]) {
  for (let index = 1; index < rows.length; index++) {
    if (rows[index].spec.questionType === rows[index - 1].spec.questionType) {
      fail(
        "Q1",
        `L${rows[index - 1].spec.id} → L${rows[index].spec.id} 连续同为「${rows[index].spec.questionType}」`,
      );
    }
  }

  for (let start = 0; start <= rows.length - 5; start++) {
    const window = rows.slice(start, start + 5);
    const types = new Set(window.map((row) => row.spec.questionType));
    if (types.size < 3) {
      fail(
        "Q2",
        `L${window[0].spec.id}–L${window[4].spec.id} 只有 ${types.size} 类问题`,
      );
    }
  }

  let mechanicStart = 0;
  for (let index = 1; index <= rows.length; index++) {
    if (
      index === rows.length ||
      rows[index].spec.primaryMechanic !== rows[mechanicStart].spec.primaryMechanic
    ) {
      if (index - mechanicStart > 6) {
        fail(
          "Q3",
          `L${rows[mechanicStart].spec.id}–L${rows[index - 1].spec.id} ` +
            `连续 ${rows[mechanicStart].spec.primaryMechanic} ${index - mechanicStart} 关`,
        );
      }
      mechanicStart = index;
    }
  }

  for (let chapter = 1; chapter <= 5; chapter++) {
    const echoes = rows.filter(
      (row) => row.chapter === chapter && row.spec.role === "回声",
    );
    if (echoes.length > 3) {
      fail("Q4", `第 ${chapter} 章有 ${echoes.length} 个回声关`);
    }
  }

  let echoMechanic = "";
  let echoRun = 0;
  for (const row of rows) {
    if (row.spec.role === "回声" && row.spec.primaryMechanic === echoMechanic) {
      echoRun++;
      if (echoRun > 2) {
        fail(
          "Q4",
          `L${row.spec.id} ${row.spec.primaryMechanic} 连续回声 ${echoRun} 关`,
        );
      }
    } else {
      echoMechanic = row.spec.role === "回声" ? row.spec.primaryMechanic : "";
      echoRun = row.spec.role === "回声" ? 1 : 0;
    }
  }
}

function auditMechanicCombinations(rows: AuditRow[]) {
  for (const row of rows) {
    const hasWrap = Boolean(row.spec.mechanicTags.includes("wrap"));
    const hasWeld = Boolean(row.spec.mechanicTags.includes("weld"));
    const hasZeroToleranceGoal = row.par === (DEFAULT_LEVELS[row.spec.id - 1]?.maxSteps ?? -1);
    if (
      hasWrap &&
      hasWeld &&
      row.spec.mechanicTags.includes("goal") &&
      hasZeroToleranceGoal
    ) {
      fail("C1", `L${row.spec.id} 同时叠加环面、焊死与零容差取舍`);
    }
  }

  for (const row of rows) {
    if (row.spec.id < 61 || row.spec.id === 99) continue;
    if (row.spec.mechanicTags.length > 2) {
      fail(
        "C2",
        `L${row.spec.id} 有 ${row.spec.mechanicTags.length} 种机制：${row.spec.mechanicTags.join(" + ")}`,
      );
    }
  }
}

/**
 * R8 能量源必须单口：美术（scripts/audit_pipe_ports.py）只给能量源画了朝右一个接口，
 * 四向源会让玩家看到“源朝右却四面都亮”的破规盘面（L11 曾出现，已修）。
 */
function auditSourcePorts() {
  const dirs = [1, 2, 4, 8];
  for (const level of DEFAULT_LEVELS) {
    for (const tile of level.tiles) {
      if (tile.type !== "battery") continue;
      const ports = getTilePorts(tile);
      const count = dirs.filter((bit) => ports & bit).length;
      if (count !== 1) {
        fail("R8", "L" + level.id + " 能量源 " + tile.id + " 有 " + count + " 个朝向端口（只允许单口）");
      }
    }
  }
}

function buildRows(): AuditRow[] {
  return SPECS.map((spec) => {
    const level = DEFAULT_LEVELS.find((item) => item.id === spec.id);
    if (!level) throw new Error(`缺少 L${spec.id}`);
    const solution = solveRuleLevel(level);
    if (!solution) throw new Error(`L${spec.id} 无规则解`);
    if (solution.par !== level.parSteps) {
      fail("PAR", `L${spec.id} 求解 ${solution.par} / 数据 ${level.parSteps}`);
    }
    return {
      spec,
      chapter: chapterOf(spec.id),
      par: solution.par,
      burden: scoreBurden(level, solution),
    };
  });
}

const rows = buildRows();
if (rows.length !== 99) fail("COUNT", `主线应有 99 关，实际 ${rows.length}`);

auditR1(rows);
auditR2(rows);
auditR3AndR5(rows);
auditR4(rows);
auditR6(rows);
auditR7(rows);
auditQuestionRotation(rows);
auditMechanicCombinations(rows);
auditSourcePorts();

for (let chapter = 1; chapter <= 5; chapter++) {
  const chapterRows = rows.filter((row) => row.chapter === chapter);
  const pars = chapterRows.map((row) => row.par);
  const challenges = chapterRows.map((row) => row.burden.challenge);
  console.log(
    `第 ${chapter} 章：${chapterRows.length} 关，par 均 ${mean(pars).toFixed(2)}，` +
      `challenge 均 ${mean(challenges).toFixed(2)}`,
  );
}

console.log(`\n主线审计：${failures === 0 ? "通过" : `${failures} 项失败`}`);
process.exitCode = failures ? 1 : 0;
