import type { LevelConfig } from "../types/game";

/** 由 scripts/generate-axis-trial.ts 生成，勿手改。44–50。 */
export const AXIS_TRIAL_LEVELS: LevelConfig[] = [
  {
    "id": 44,
    "code": "44",
    "totalLevels": 99,
    "title": "双轴 · 各管一路",
    "hintText": "两根轴，各锁一段路。",
    "winText": "修复完成。",
    "parSteps": 11,
    "maxSteps": 13,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 45,
    "code": "45",
    "totalLevels": 99,
    "title": "双轴 · 顾此失彼",
    "hintText": "这根轴的相位，会决定另一段路通不通。",
    "winText": "修复完成。",
    "parSteps": 12,
    "maxSteps": 14,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-a"
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 46,
    "code": "46",
    "totalLevels": 99,
    "title": "三轴 · 连锁",
    "hintText": "三根轴互相咬住，先想清楚再动手。",
    "winText": "修复完成。",
    "parSteps": 13,
    "maxSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-a"
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-c"
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-c"
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 47,
    "code": "47",
    "totalLevels": 99,
    "title": "三轴 · 交叉",
    "hintText": "有一根轴横跨主干和支路。",
    "winText": "修复完成。",
    "parSteps": 14,
    "maxSteps": 16,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-c"
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-c"
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 48,
    "code": "48",
    "totalLevels": 99,
    "title": "三轴 · 咬合",
    "hintText": "每根轴都跨着两段路，顾此必失彼。",
    "winText": "修复完成。",
    "parSteps": 16,
    "maxSteps": 18,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-a"
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 49,
    "code": "49",
    "totalLevels": 99,
    "title": "四轴 · 联锁",
    "hintText": "四根轴，一处不对，整片不通。",
    "winText": "修复完成。",
    "parSteps": 17,
    "maxSteps": 19,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-a"
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-c"
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-c"
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 50,
    "code": "50",
    "totalLevels": 99,
    "title": "四轴 · 总考",
    "hintText": "四根轴、五处设施，一步都不能错。",
    "winText": "修复完成。",
    "parSteps": 17,
    "maxSteps": 18,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-c"
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-a"
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-a"
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-b"
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "axis": "ax-c"
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "axis": "ax-d"
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-b"
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "axis": "ax-d"
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  }
];
