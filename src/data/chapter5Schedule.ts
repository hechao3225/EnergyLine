import type { LevelRole, MechanicTag, QuestionType } from "../types/game";

export interface Chapter5Spec {
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
): Chapter5Spec => ({
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

export const CHAPTER5_SCHEDULE: Chapter5Spec[] = [
  row(81, "wrap", ["wrap", "weld"], "分区", "变", 20, "星门·跨缝后焊死", "先看清穿缝路线，再从远端接通；通电后立即锁住。"),
  row(82, "wrap", ["wrap", "weld"], "分区", "考", 21, "王座·先焊后缝", "顺序与接缝互相牵制；最后再接源头。"),
  row(83, "weld", ["weld"], "顺序", "回声", 18, "大舞台·焊死回声", "纯焊死泄压：先远后近，十字管先转到位。"),
  row(84, "wrap", ["wrap", "gear"], "相变", "变", 21, "烟花台·跨缝齿轮", "齿轮组也会跨缝；先锁定同组相位。"),
  row(85, "wrap", ["wrap", "gear"], "相变", "考", 22, "星光塔·双组跨缝", "两组齿轮跨缝牵制；先确定主组。"),
  row(86, "basic", ["basic"], "定位", "谷", 19, "永恒灯·峰后呼吸", "回到普通盘面；固定管道保持原方向。"),
  row(87, "colors", ["colors", "weld"], "分区", "变", 20, "庆典台·分色焊死", "两种能量不能混；通电的管子会立刻锁住。"),
  row(88, "colors", ["colors", "weld"], "分区", "考", 21, "云端王座·颜色锁", "先分色，再决定哪些格子最后接电。"),
  row(89, "basic", ["basic"], "定位", "谷", 20, "星冠·峰后呼吸", "只修最短主干，让颜色与焊死压力回落。"),
  row(90, "goal", ["goal"], "取舍", "考", 19, "星河门·取舍峰", "五盏保四盏；多源分段接，先找主干，十字管、闸、单向阀和固定管道一起算。"),
  row(91, "goal", ["goal"], "取舍", "考", 20, "梦境池·零余量取舍", "五盏保四盏；多源分段接，先找主干，十字管、闸、单向阀和固定管道一起算。"),
  row(92, "basic", ["basic"], "定位", "谷", 20, "天穹剧场·三机制前谷", "最后泄压；固定管道保持原方向。"),
  row(93, "7x7", ["7x7"], "规模", "变", 20, "星冠·7×7 大盘", "多源分段接；7×7 盘面更大，先找主干和十字主线。"),
  row(94, "7x7", ["7x7", "wrap"], "规模", "考", 21, "庆典台·7×7 环面", "多源分段接；大盘也能穿缝，先找边界捷径。"),
  row(95, "wrap", ["wrap", "goal"], "取舍", "变", 23, "光柱·跨缝取舍", "这关不用全亮；先找主干，最便宜的设施可能在缝对面。"),
  row(96, "basic", ["basic"], "定位", "谷", 21, "星桥·终局前谷", "多源分段接；最后一关前只修主干，十字管不用转。"),
  row(97, "weld", ["weld", "goal"], "取舍", "考", 22, "天际之门·焊死取舍", "先选目标；给错的灯通电会立即锁死。"),
  row(98, "basic", ["basic"], "定位", "谷", 22, "万光台·最后呼吸", "终局前只处理一条清晰主干。"),
  row(99, "wrap", ["wrap", "weld", "goal"], "取舍", "boss", 25, "永恒星环·终局", "六盏保五盏；环面、焊死与取舍一起收束。", 2),
];
