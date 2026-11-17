import type { LevelConfig, Tile } from "../types/game";
import { getDefaultBasePorts } from "../utils/circuit";
import { GEAR_TEST_LEVELS } from "./gearLevels";
import { TORUS_TEST_LEVELS } from "./torusLevels";
import { WELD_TEST_LEVELS } from "./weldLevels";
import { GEAR_WELD_LEVELS } from "./gearWeldLevels";

/**
 * 玩法实验关（垂直切片，不影响 99 关主线）。
 *
 * 两关都在验证同一块积木：**联动轴**——同一 axis 的格子共用一根转轴，
 * 点任意一格整组顺时针 90°，仍然只算 1 步。
 *   P1 = 合作：组内三格恰好都差一次 90°，点一下全部归位。
 *   P2 = 冲突：主轴被“必须用的一格”锁死，另一格永远对不上，只能放弃那条捷径。
 */

export const LAB_AXIS_ID = "ax-1";

type Put = [row: number, col: number, type: Tile["type"], rotation?: number, extra?: Partial<Tile>];

function board(puts: Put[], size = 6): Tile[] {
  const tiles: Tile[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      tiles.push({ id: `lab-${row}-${col}`, row, col, type: "empty", rotation: 0, basePorts: 0 });
    }
  }
  for (const [row, col, type, rotation = 0, extra = {}] of puts) {
    const index = tiles.findIndex((tile) => tile.row === row && tile.col === col);
    tiles[index] = {
      id: `lab-${row}-${col}`,
      row,
      col,
      type,
      rotation,
      basePorts: getDefaultBasePorts(type),
      ...extra,
    };
  }
  return tiles;
}

/**
 * P1 合作：源 → 直管 → 三通 ┬ 上：直管 → 弯管 → 设施
 *                            └ 右：三通(轴) ┬ 下：直管(轴) → 设施
 *                                          └ 右：弯管(轴) → 直管 → 设施
 * 三格轴上的正确朝向都恰好差一次 90°，点一下三处同归位。
 */
const P1: Put[] = [
  [3, 0, "battery", 0, { locked: true }],
  [3, 1, "line", 90],
  [3, 2, "t_shape", 0],
  [2, 2, "line", 0],
  [1, 2, "corner", 270],
  [1, 3, "bulb", 0, { locked: true }],
  [3, 3, "t_shape", 270, { axis: LAB_AXIS_ID }],
  [3, 4, "corner", 0, { axis: LAB_AXIS_ID }],
  [4, 3, "line", 0, { axis: LAB_AXIS_ID }],
  [4, 4, "line", 90],
  [5, 3, "bulb", 0, { locked: true }],
  [5, 4, "bulb", 0, { locked: true }],
];

/**
 * P2 冲突：源 → 直管 → 十字 ┬ 上：直管 → 三通(轴) → 顶部两设施   ← 组相位被这里锁死
 *                            ├ 下：直管 → 弯管 → 设施           ← 真正要走的路
 *                            └ 右：弯管(轴) → 直管(轴) → 同一设施 ← 看起来最顺，但永远接不上
 * 轴被上路的 T 锁在 90°，右路那格就必然被拧歪，所以只能绕下面走。
 */
const P2: Put[] = [
  [3, 0, "battery", 0, { locked: true }],
  [3, 1, "line", 90],
  [3, 2, "cross", 0],
  [2, 2, "line", 0],
  [1, 2, "t_shape", 180, { axis: LAB_AXIS_ID }],
  [0, 2, "bulb", 0, { locked: true }],
  [1, 3, "bulb", 0, { locked: true }],
  [3, 3, "corner", 90, { axis: LAB_AXIS_ID }],
  [4, 3, "line", 90, { axis: LAB_AXIS_ID }],
  [4, 2, "line", 0],
  [5, 2, "corner", 180],
  [5, 3, "bulb", 0, { locked: true }],
];

/**
 * P3 忍住不修：轴上有四格——三格必须对，第四格永远是歪的。
 * 组相位被主路锁死在 90°，那一格就必然指向墙外；玩家越想把它拧正，
 * 越会把已经通的主路弄断。这一关考的是“哪些格子就该让它歪着”。
 */
const P3: Put[] = [
  [3, 0, "battery", 0, { locked: true }],
  [3, 1, "line", 180],
  [3, 2, "cross", 0],
  [2, 2, "line", 0],
  [1, 2, "t_shape", 90],
  [0, 2, "bulb", 0, { locked: true }],
  [1, 3, "bulb", 0, { locked: true }],
  [3, 3, "corner", 0, { axis: LAB_AXIS_ID }],
  [4, 3, "line", 0, { axis: LAB_AXIS_ID }],
  [5, 3, "corner", 180, { axis: LAB_AXIS_ID }],
  [5, 2, "corner", 0, { axis: LAB_AXIS_ID }],
  [5, 4, "bulb", 0, { locked: true }],
];

/**
 * C1 双色 · 不能混：红源(3,0) 走上面一行，蓝源(5,0) 走下面一行，
 * 中间 (4,3) 那节直管把两条路连在一起——一接上就串色，两个设施都不亮。
 * 解法是把两侧的三通拧开，让它们各自闭口。
 */
const COLOR1: Put[] = [
  [3, 0, "battery", 0, { locked: true, color: 0 }],
  [3, 1, "line", 270],
  [3, 2, "line", 270],
  [3, 3, "t_shape", 0],
  [3, 4, "line", 270],
  [3, 5, "bulb", 0, { locked: true, color: 0 }],
  [4, 3, "line", 90],
  [5, 3, "t_shape", 180],
  [5, 4, "line", 270],
  [5, 5, "bulb", 0, { locked: true, color: 1 }],
  [5, 0, "battery", 0, { locked: true, color: 1 }],
  [5, 1, "line", 270],
  [5, 2, "line", 270],
];

/**
 * S1 / S2 取舍关：一根轴同时挂着红路和蓝路的一格。
 * 红格的正确朝向需要“转 1 次”，蓝格已经是“转 0 次”——轴只能选一边。
 * S1 目标 1/2（先教“不用全亮”），S2 目标 3/4（逼你算哪边多）。
 */
const S1: Put[] = [
  [3, 0, "battery", 0, { locked: true, color: 0 }],
  [3, 1, "line", 270, { axis: LAB_AXIS_ID }],
  [3, 2, "line", 270],
  [3, 3, "line", 270],
  [3, 4, "bulb", 0, { locked: true, color: 0 }],
  [4, 0, "battery", 0, { locked: true, color: 1 }],
  [4, 1, "corner", 90, { axis: LAB_AXIS_ID }],
  [5, 1, "corner", 180],
  [5, 2, "bulb", 0, { locked: true, color: 1 }],
];

const S2: Put[] = [
  [3, 0, "battery", 0, { locked: true, color: 0 }],
  [3, 1, "line", 270, { axis: LAB_AXIS_ID }],
  [3, 2, "line", 270],
  [3, 3, "line", 270],
  [3, 4, "bulb", 0, { locked: true, color: 0 }],
  [4, 0, "battery", 0, { locked: true, color: 1 }],
  [4, 1, "corner", 90, { axis: LAB_AXIS_ID }],
  [5, 1, "corner", 180],
  [5, 2, "t_shape", 90],
  [4, 2, "bulb", 0, { locked: true, color: 1 }],
  [5, 3, "t_shape", 0],
  [4, 3, "bulb", 0, { locked: true, color: 1 }],
  [5, 4, "bulb", 0, { locked: true, color: 1 }],
];

/**
 * S3 承诺关：红 2、蓝 2，目标 2——两边都够，但轴只给一边。
 * 预算 4 步（par 3），所以“先随便拧一下轴看看”会直接输掉：
 * 拧错方向要多花 3 步才能回来，而你没有 3 步。
 */
const S3: Put[] = [
  [2, 0, "battery", 0, { locked: true, color: 0 }],
  [2, 1, "line", 90],
  [2, 2, "line", 270, { axis: LAB_AXIS_ID }],
  [2, 3, "t_shape", 90],
  [1, 3, "bulb", 0, { locked: true, color: 0 }],
  [2, 4, "bulb", 0, { locked: true, color: 0 }],
  [3, 0, "battery", 0, { locked: true, color: 1 }],
  [3, 1, "line", 90],
  [3, 2, "corner", 90, { axis: LAB_AXIS_ID }],
  [4, 2, "corner", 180],
  [4, 3, "t_shape", 90],
  [3, 3, "bulb", 0, { locked: true, color: 1 }],
  [4, 4, "bulb", 0, { locked: true, color: 1 }],
];

/**
 * M1 混合格式样本：7×7 双源 + 达标 3/5。
 * 左边一个源、右边一个源，中间 (3,3) 是一节三通可把两边接起来；
 * 顶上 (0,3) 那处设施离得远，接它要多花 2–3 步——所以“保哪三个”不是随手挑。
 */
const M1: Put[] = [
  [3, 0, "battery", 0, { locked: true }],
  [3, 1, "line", 270],
  [3, 2, "cross", 0],
  [2, 2, "line", 0],
  [1, 2, "bulb", 0, { locked: true }],
  [4, 2, "line", 0],
  [5, 2, "bulb", 0, { locked: true }],
  [3, 3, "t_shape", 0],
  [2, 3, "line", 0],
  [1, 3, "line", 0],
  [0, 3, "bulb", 0, { locked: true }],
  [3, 4, "cross", 0],
  [2, 4, "line", 0],
  [1, 4, "bulb", 0, { locked: true }],
  [4, 4, "line", 0],
  [5, 4, "bulb", 0, { locked: true }],
  [3, 5, "line", 270],
  [3, 6, "battery", 180, { locked: true }],
  // 四角散放的死管：填一点盘面密度，也当诱饵
  [0, 0, "corner", 0],
  [0, 6, "corner", 90],
  [6, 0, "corner", 270],
  [6, 6, "corner", 180],
];

/**
 * X1 回路陷阱：源在左，两条支路各自往上接一盏灯。
 * (2,3) 那节管子**正好横在两条支路中间**——顺手接起来最自然，但那样就闭成一个环，
 * 整段过载、三盏灯全灭。正确做法是让它竖着（两头对着空位），主动"不接"。
 */
const X1: Put[] = [
  [3, 0, "battery", 0, { locked: true }],
  [3, 1, "line", 90],
  [3, 2, "cross", 0],
  [2, 2, "t_shape", 90],
  [1, 2, "bulb", 0, { locked: true }],
  [2, 3, "line", 0],
  [2, 4, "t_shape", 270],
  [1, 4, "bulb", 0, { locked: true }],
  [3, 3, "line", 90],
  [3, 4, "corner", 90],
  [4, 2, "line", 0],
  [5, 2, "bulb", 0, { locked: true }],
];

export const LAB_LEVELS: LevelConfig[] = [
  {
    id: 901,
    code: "P1",
    totalLevels: 99,
    title: "联动轴 · 一拧三动",
    subtitle: "合作",
    hintText: "带轴心的三格是一体的：点一次，三个方向一起转。",
    winText: "试验通过：一步带动三处。",
    parSteps: 6,
    maxSteps: 7,
    gridRows: 6,
    gridCols: 6,
    tiles: board(P1),
  },
  {
    id: 902,
    code: "P2",
    totalLevels: 99,
    title: "联动轴 · 拧不动的捷径",
    subtitle: "冲突",
    hintText: "轴只能有一个角度：顾得了上面，就顾不上右边。",
    winText: "试验通过：放弃那条捷径。",
    parSteps: 5,
    maxSteps: 7,
    gridRows: 6,
    gridCols: 6,
    tiles: board(P2),
  },
  {
    id: 903,
    code: "P3",
    totalLevels: 99,
    title: "联动轴 · 让它歪着",
    subtitle: "忍住不修",
    hintText: "轴上有四格，只有三格在解里：多出来的那格永远对不上，别为它再拧一次。",
    winText: "试验通过：忍住不修，也是一种修。",
    parSteps: 4,
    maxSteps: 6,
    gridRows: 6,
    gridCols: 6,
    tiles: board(P3),
  },
  {
    id: 904,
    code: "C1",
    totalLevels: 99,
    title: "双色 · 不能混",
    subtitle: "双色",
    hintText: "红源只喂红灯，蓝源只喂蓝灯；两色走进同一根管子，两边都会灭。",
    winText: "试验通过：两条颜色各走各的。",
    parSteps: 10,
    maxSteps: 12,
    gridRows: 6,
    gridCols: 6,
    rules: { colors: 2 },
    tiles: board(COLOR1),
  },
  {
    id: 905,
    code: "S1",
    totalLevels: 99,
    title: "取舍 · 只保一边",
    subtitle: "取舍 1",
    hintText: "轴只够满足一路：红灯通了，蓝灯就灭。这关不用全亮。",
    winText: "试验通过：放弃也是一种解。",
    parSteps: 1,
    maxSteps: 6,
    goal: 1,
    gridRows: 6,
    gridCols: 6,
    rules: { colors: 2 },
    tiles: board(S1),
  },
  {
    id: 906,
    code: "S2",
    totalLevels: 99,
    title: "取舍 · 保多的那边",
    subtitle: "取舍 2",
    hintText: "红一路、蓝三路，轴只能给一边——先算清楚再动手。",
    winText: "试验通过：算得清，才救得多。",
    parSteps: 4,
    maxSteps: 8,
    goal: 3,
    gridRows: 6,
    gridCols: 6,
    rules: { colors: 2 },
    tiles: board(S2),
  },
  {
    id: 907,
    code: "S3",
    totalLevels: 99,
    title: "取舍 · 先选边再动手",
    subtitle: "取舍 3",
    hintText: "两边都够，但轴只给一边。想清楚再拧——拧错方向就回不来了。",
    winText: "试验通过：先决定，再动手。",
    parSteps: 3,
    maxSteps: 3,
    goal: 2,
    gridRows: 6,
    gridCols: 6,
    rules: { colors: 2 },
    tiles: board(S3),
  },
  {
    id: 908,
    code: "M1",
    totalLevels: 99,
    title: "7×7 · 双源分区",
    subtitle: "7×7",
    hintText: "左边一个源、右边一个源；顶上那处设施最远，接它要多花几步。",
    winText: "试验通过：两个源各管一半。",
    parSteps: 4,
    maxSteps: 7,
    goal: 3,
    gridRows: 7,
    gridCols: 7,
    tiles: board(M1, 7),
  },
  {
    id: 909,
    code: "X1",
    totalLevels: 99,
    title: "回路 · 别接成一圈",
    subtitle: "禁环",
    hintText: "中间那节管子接上两边就会闭成一个环，整段过载——让它空着。",
    winText: "试验通过：知道什么时候不接。",
    parSteps: 9,
    maxSteps: 9,
    gridRows: 6,
    gridCols: 6,
    rules: { noCycle: true },
    tiles: board(X1),
  },
  // 齿轮咬合试验（scripts/gear-gen.ts 生成）：G1–G3，id 911–913
  ...GEAR_TEST_LEVELS,
  // 环面试验（scripts/torus-gen.ts 生成）：T1–T3，id 921–923
  ...TORUS_TEST_LEVELS,
  // 焊死试验（scripts/weld-gen.ts 生成）：W1–W3，id 931–933
  ...WELD_TEST_LEVELS,
  // 齿轮 + 焊死组合（scripts/gear-weld-gen.ts 生成）：K1–K3，id 941–943
  ...GEAR_WELD_LEVELS,
];
