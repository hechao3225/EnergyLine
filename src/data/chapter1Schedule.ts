import type { LevelRole, MechanicTag, QuestionType } from "../types/game";

export interface Chapter1Spec {
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
): Chapter1Spec => ({
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

export const CHAPTER1_SCHEDULE: Chapter1Spec[] = [
  row(1, "basic", ["basic"], "定位", "教", 5, "迎宾门·接通", "点一下直管，把迎宾门接到能量源。"),
  row(2, "basic", ["basic"], "相变", "练", 7, "星灯柱·闪耀", "弯管的两个口要同时朝向主路。"),
  row(3, "basic", ["basic", "cross"], "分区", "练", 8, "售票亭·开窗", "三通先接主干，再把能量分给两条支路。"),
  row(4, "cross", ["basic", "cross"], "定位", "练", 8, "气球摊·开张", "十字管四面同形，转它不会改变接法。"),
  row(5, "multi-source", ["basic", "multi-source"], "分区", "变", 9, "中央喷泉·汇聚", "多源各接一边；十字管不用转，固定管道保持原方向。"),
  row(6, "decoy", ["basic", "decoy"], "定位", "变", 11, "长椅·歇脚", "看着能接通的断头管不提供能量，先认主路。"),
  row(7, "basic", ["basic"], "顺序", "谷", 9, "花坛·开花", "只修最短主干，三步内就能看清路线。"),
  row(8, "switch", ["basic", "switch"], "相变", "变", 12, "导览牌·指路", "管道转到位后再扳通能量闸，确认角标变成“通”。"),
  row(9, "diode", ["basic", "diode"], "定位", "变", 11, "糖果车·出摊", "单向阀只允许能量顺着箭头进入。"),
  row(10, "multi-source", ["basic", "multi-source", "decoy"], "分区", "考", 12, "许愿池·点亮", "多源各自供能；十字管不用转，固定管道保持原方向。"),
  row(11, "decoy", ["basic", "decoy", "cross"], "定位", "谷", 9, "报时钟楼·报时", "盘面里有三条假路，先回到最短主干。"),
  row(12, "switch", ["basic", "switch", "diode"], "顺序", "变", 12, "旗杆·升旗", "先判断单向阀方向，再把能量闸扳通。"),
  row(13, "axis", ["axis"], "相变", "教", 9, "检票闸·联动", "带轴心的几格一起转；先让整组对准主路。"),
  row(14, "axis", ["axis"], "定位", "练", 10, "小卖部·同轴", "同轴格子共享相位，点任意一格都会带动整组。"),
  row(15, "axis", ["axis"], "取舍", "变", 9, "照相亭·断电", "轴组只能选一个相位，有些支路必须放弃。"),
  row(16, "wrap", ["wrap"], "定位", "预演", 6, "音乐盒·跨缝", "从右边出去会从左边回来，对面就是隔壁。"),
  row(17, "wrap", ["wrap", "decoy"], "顺序", "预演", 7, "邮筒·双缝", "两条接缝都能走，先找真正连到设施的那条。"),
  row(18, "wrap", ["wrap", "switch"], "相变", "预演", 8, "雨棚·缝上闸", "能量闸可能就在边界格，扳通后再跨缝。"),
  row(19, "multi-source", ["basic", "multi-source"], "分区", "谷", 9, "石阶·通行", "多源各接一段；十字管不用转，固定管道保持原方向。"),
  row(20, "axis", ["axis", "switch"], "顺序", "boss", 14, "星光门廊·开启", "轴相位锁定主路，再用能量闸决定最后一段是否通电。", 2),
];
