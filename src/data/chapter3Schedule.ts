import type { LevelRole, MechanicTag, QuestionType } from "../types/game";

export interface Chapter3Spec {
  id: number;
  primaryMechanic: MechanicTag;
  mechanicTags: MechanicTag[];
  questionType: QuestionType;
  role: LevelRole;
  targetPar: number;
  parMin: number;
  parMax: number;
  title: string;
  hint: string;
}

const row = (
  id: number,
  primaryMechanic: MechanicTag,
  mechanicTags: MechanicTag[],
  questionType: QuestionType,
  role: LevelRole,
  targetPar: number,
  title: string,
  hint: string,
  slope = 1,
): Chapter3Spec => ({
  id,
  primaryMechanic,
  mechanicTags,
  questionType,
  role,
  targetPar,
  parMin: Math.max(1, targetPar - slope),
  parMax: targetPar + slope,
  title,
  hint,
});

export const CHAPTER3_SCHEDULE: Chapter3Spec[] = [
  row(41, "weld", ["weld"], "顺序", "教", 15, "摩天轮·先远后近", "通电的管子会锁住；先修远端，再一路接回源头。"),
  row(42, "weld", ["weld"], "顺序", "练", 15, "缆车·断电解锁", "想转已焊的格子，先让上游断电，再回头补电。"),
  row(43, "weld", ["weld", "cross"], "顺序", "练", 15, "云桥·焊死十字", "十字管通电后会锁死；先转到位，再接主路。"),
  row(44, "basic", ["basic"], "定位", "谷", 13, "风车·短链回收", "只修最短主干，先把不可逆压力放下来。"),
  row(45, "weld", ["weld"], "顺序", "练", 16, "观景台·一次成型", "每片区只留一次修正机会，先远后近。"),
  row(46, "weld", ["weld", "decoy"], "顺序", "变", 15, "云朵秋千·诱饵顺序", "假路也会被焊住；先确认通路再动手。"),
  row(47, "goal", ["goal"], "取舍", "回声", 15, "气球摊·取舍回声", "这关不用全亮；先挑代价最小的目标组合。"),
  row(48, "multi-source", ["basic", "multi-source"], "分区", "谷", 14, "热气球·双源", "多源各接一段；十字管不用转，固定管道保持原方向。"),
  row(49, "weld", ["weld"], "顺序", "考", 17, "飞艇·顺序峰", "先接哪一片会锁死另一片；从远端规划回源。"),
  row(50, "weld", ["weld", "multi-source"], "分区", "考", 17, "云梯·双源顺序", "两源各有自己的焊死顺序，先决定哪一片最后接。"),
  row(51, "wrap", ["wrap"], "定位", "回声", 14, "风铃塔·回缝", "环面回响：边界仍是路，先用穿缝方向找主干。"),
  row(52, "switch", ["basic", "switch", "diode"], "顺序", "谷", 15, "云端列车·闸阀", "单向阀定方向，能量闸定时机；固定管道保持原方向。"),
  row(53, "multi-source", ["basic", "multi-source"], "分区", "谷", 14, "气象站·双源", "多源各接一段；十字管不用转，固定管道保持原方向。"),
  row(54, "gear", ["gear"], "相变", "回声", 16, "彩虹滑道·齿轮回声", "齿轮组共享相位；十字管不用转，先锁定主组。"),
  row(55, "weld", ["weld", "decoy"], "顺序", "考", 19, "云端剧场·顺序峰三", "先分清假路，再从远端锁定每一片。"),
  row(56, "goal", ["goal", "weld"], "取舍", "变", 17, "星图台·锁死取舍", "先找主干并选目标；五盏保四盏，给错的灯通电会锁死。"),
  row(57, "weld", ["weld"], "顺序", "考", 16, "风筝场·断电峰", "先断电腾出可转格，再重新接回。"),
  row(58, "gear", ["gear"], "相变", "回声", 16, "云海灯·齿轮回声二", "两组齿轮共享牵制关系；十字管不用转。"),
  row(59, "goal", ["goal"], "取舍", "考", 18, "飞行器·零余量", "预算就是最少步数；主干、多源、闸、单向阀和固定管道一起算。"),
  row(60, "weld", ["weld", "goal"], "顺序", "boss", 21, "云端剧场·终幕", "五盏保四盏；先定主干，十字管、保留目标与焊死顺序一起算。", 2),
];
