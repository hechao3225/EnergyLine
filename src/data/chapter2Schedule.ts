import type { LevelRole, MechanicTag, QuestionType } from "../types/game";

export interface Chapter2Spec {
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
): Chapter2Spec => ({
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

export const CHAPTER2_SCHEDULE: Chapter2Spec[] = [
  row(21, "gear", ["gear"], "相变", "教", 13, "旋转木马·咬合", "相邻齿轮一顺一反；点一下整组同时换相位。"),
  row(22, "gear", ["gear"], "定位", "练", 13, "花房·双组", "两组齿轮分开算；十字管不用转，先锁定主组。"),
  row(23, "multi-source", ["basic", "multi-source"], "分区", "谷", 12, "星光拱门·分流", "多源各接一段；十字管不用转，固定管道保持原方向。"),
  row(24, "gear", ["gear"], "相变", "练", 15, "蝴蝶笼·三齿", "三齿共享一个相位；十字管不用转。"),
  row(25, "gear", ["gear", "switch"], "顺序", "变", 15, "音乐台·组闸", "先定齿轮相位，再扳能量闸；十字管不用转。"),
  row(26, "wrap", ["wrap"], "定位", "回声", 14, "许愿树·回缝", "环面回响：边界相连；先找穿缝主干，十字管不用转。"),
  row(27, "gear", ["gear"], "相变", "考", 17, "秋千·双组峰", "两组齿轮互相牵制；十字管不用转，先定锁定主组。"),
  row(28, "axis", ["axis"], "定位", "回声", 14, "蜜蜂屋·轴回响", "同轴整组共享角度；十字管不用转，先看哪组让步。"),
  row(29, "goal", ["goal"], "取舍", "教", 14, "露珠池·保三", "这关不用全亮；沿闸和单向阀选目标，固定管道保持原方向。"),
  row(30, "goal", ["goal", "multi-source"], "分区", "练", 14, "藤架·先选边", "多源先选边；十字管不用转，先找主干，按闸和单向阀算代价，固定管道不动。"),
  row(31, "multi-source", ["basic", "multi-source"], "定位", "谷", 14, "月光亭·双源", "多源各接一段；十字管不用转，沿主路分配能量，固定管道保持原方向。"),
  row(32, "gear", ["gear"], "相变", "考", 17, "花瓣路·双组牵制", "两组齿轮同时限相；先找主干，再决定哪组不动。"),
  row(33, "goal", ["goal", "multi-source"], "取舍", "练", 14, "风铃架·代价分散", "这关不用全亮；多源、闸、单向阀和十字管一起算，先找主干，固定管道不动。"),
  row(34, "decoy", ["basic", "cross", "decoy"], "定位", "谷", 13, "蘑菇灯·呼吸", "十字管不用转；固定管道不动，先绕开诱饵回主路。"),
  row(35, "gear", ["gear"], "相变", "考", 17, "花钟·双组峰", "两组齿轮同时限相；十字管不用转，先找必须锁定的主组。"),
  row(36, "switch", ["basic", "switch", "diode"], "顺序", "谷", 14, "种子库·闸阀", "单向阀定方向，能量闸定时机；固定管道保持原方向。"),
  row(37, "goal", ["goal", "gear"], "取舍", "变", 15, "香草园·至多三盏", "最多保三盏；先选目标，再用齿轮相位接通。"),
  row(38, "axis", ["axis"], "相变", "回声", 17, "玫瑰门·轴回声", "同轴整组只有一个角度；先接受取舍，再找主路。"),
  row(39, "multi-source", ["basic", "multi-source"], "分区", "谷", 14, "星光泉·双源", "多源各修一段；十字管不用转，固定管道保持原方向。"),
  row(40, "gear", ["gear", "goal"], "取舍", "boss", 19, "蝶影舞台·开演", "五盏保四盏；先找主干，齿轮、多源、十字管、闸、单向阀和固定管道一起算。", 2),
];
