import type { LevelRole, MechanicTag, QuestionType } from "../types/game";

export interface Chapter4Spec {
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
): Chapter4Spec => ({
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

export const CHAPTER4_SCHEDULE: Chapter4Spec[] = [
  row(61, "wrap", ["wrap"], "定位", "教", 17, "云桥·跨缝一步", "边界相连：从右边出去会从左边回来，先找穿缝主干。"),
  row(62, "wrap", ["wrap"], "定位", "练", 16, "雾锁天河·双缝", "两条缝都能走；先算清出口落在哪一格。"),
  row(63, "wrap", ["wrap", "decoy"], "定位", "练", 17, "云中双瀑·一拐两用", "假捷径也会穿缝；先确认它真的接得到设施。"),
  row(64, "basic", ["basic"], "定位", "谷", 15, "风雷变幻·呼吸", "回到普通盘面；十字管不用转，固定管道保持原方向。"),
  row(65, "wrap", ["wrap"], "定位", "变", 18, "天河倒泻·拓扑捷径", "看着很远的两格，可能只隔一条边界。"),
  row(66, "wrap", ["wrap", "multi-source"], "分区", "变", 18, "云岫穿行·双源隔海", "多源各自找缝；十字管不用转，固定管道保持原方向。"),
  row(67, "wrap", ["wrap", "switch"], "顺序", "变", 18, "双源云渡·缝上闸", "先扳通能量闸，再让能量穿缝。"),
  row(68, "wrap", ["wrap", "decoy"], "定位", "考", 21, "闸控双极·缝外诱饵", "两条假捷径都在缝外断开；先认真正主干。"),
  row(69, "wrap", ["wrap"], "定位", "考", 20, "虚空栈道·四角相邻", "四个角在拓扑上互相相邻，先比较四条出口。"),
  row(70, "weld", ["weld"], "顺序", "回声", 17, "凌霄七彩·焊死回声", "通电即锁；从远端规划，再回到源头。"),
  row(71, "colors", ["colors"], "分区", "教", 17, "风息水静·分色", "红源只喂红灯，蓝源只喂蓝灯。"),
  row(72, "colors", ["colors"], "分区", "练", 18, "梯级云台·跨色桥", "看着顺手的桥会把两色接通；先让路线分开。"),
  row(73, "colors", ["colors", "wrap"], "分区", "变", 20, "回光返照·缝上分色", "多源分段接；颜色区域也会跨缝，顺着边界分清每一段。"),
  row(74, "colors", ["colors"], "分区", "考", 18, "天堑飞渡·颜色峰", "两色都亮才算通；留意闸和单向阀，串色支路必须放弃。"),
  row(75, "multi-source", ["basic", "multi-source"], "分区", "谷", 16, "双源四象·呼吸", "多源各接一段；十字管不用转，固定管道保持原方向。"),
  row(76, "noCycle", ["noCycle"], "禁忌", "教", 18, "云涡暗流·禁忌识别", "通路不能连成圈；接成环会让整段过载。"),
  row(77, "noCycle", ["noCycle"], "禁忌", "练", 19, "断崖飞瀑·双环", "两个环只有一个致命；先找不能接的那一格。"),
  row(78, "wrap", ["wrap"], "定位", "考", 20, "灵河织锦·密度峰", "穿缝边越来越多；先画主干，再补设施。"),
  row(79, "wrap", ["wrap"], "定位", "考", 21, "星罗棋布·双缝峰", "双缝峰：一条主线可能要连续穿边界两次。"),
  row(80, "wrap", ["wrap", "colors"], "分区", "boss", 23, "云上终章·映彩", "环面与双色一起收束；多源分段接，先定颜色再穿缝。", 2),
];
