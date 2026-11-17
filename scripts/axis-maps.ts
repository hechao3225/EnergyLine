/**
 * 44–50 的布局规格：沿用 41–43 的语言——左边一个泉眼、一条主干、若干竖直支路，
 * 支路尽头是设施；轴上 2–3 格连成一串。同一行的支路必须隔列，否则两个设施会相邻。
 */
export interface CombSpec {
  id: number;
  title: string;
  hint: string;
  up: number[];
  down: number[];
  trunkTo: number;
  rightBulb: boolean;
  groups: [number, number][][];
  par: number;
  tolerance: number;
}

export const COMBS: CombSpec[] = [
  {
    id: 44, title: '双轴 · 各管一路', hint: '两根轴，各锁一段路。',
    up: [1, 3], down: [2], trunkTo: 4, rightBulb: true,
    groups: [[[3, 1], [3, 2]], [[3, 3], [2, 3]]],
    par: 11, tolerance: 2,
  },
  {
    id: 45, title: '双轴 · 顾此失彼', hint: '这根轴的相位，会决定另一段路通不通。',
    up: [1, 4], down: [2], trunkTo: 4, rightBulb: true,
    groups: [[[3, 1], [2, 1]], [[3, 3], [3, 4]]],
    par: 12, tolerance: 2,
  },
  {
    id: 46, title: '三轴 · 连锁', hint: '三根轴互相咬住，先想清楚再动手。',
    up: [1, 3], down: [2, 4], trunkTo: 4, rightBulb: true,
    groups: [[[3, 1], [2, 1]], [[3, 2], [4, 2]], [[3, 3], [3, 4]]],
    par: 13, tolerance: 2,
  },
  {
    id: 47, title: '三轴 · 交叉', hint: '有一根轴横跨主干和支路。',
    up: [1, 3, 5], down: [2, 4], trunkTo: 5, rightBulb: false,
    groups: [[[3, 1], [3, 2]], [[3, 3], [2, 3]], [[3, 4], [4, 4]]],
    par: 14, tolerance: 2,
  },
  {
    id: 48, title: '三轴 · 咬合', hint: '每根轴都跨着两段路，顾此必失彼。',
    up: [1, 3, 5], down: [2, 4], trunkTo: 5, rightBulb: false,
    groups: [[[3, 1], [2, 1], [3, 2]], [[3, 4], [4, 4]]],
    par: 16, tolerance: 2,
  },
  {
    id: 49, title: '四轴 · 联锁', hint: '四根轴，一处不对，整片不通。',
    up: [1, 3, 5], down: [2, 4], trunkTo: 5, rightBulb: false,
    groups: [[[3, 1], [2, 1]], [[3, 2], [4, 2]], [[3, 3], [2, 3]]],
    par: 17, tolerance: 2,
  },
  {
    id: 50, title: '四轴 · 总考', hint: '四根轴、五处设施，一步都不能错。',
    up: [1, 3, 5], down: [2, 4], trunkTo: 5, rightBulb: false,
    groups: [[[3, 1], [2, 1]], [[3, 2], [4, 2]], [[3, 3], [1, 3]], [[3, 4], [4, 4]]],
    par: 17, tolerance: 1,
  },
];
