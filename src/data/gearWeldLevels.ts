/** 由 scripts/gear-weld-gen.ts 生成，勿手改。齿轮+焊死实验关 K1–K3（id 941–943）。 */
import type { LevelConfig } from "../types/game";

export const GEAR_WELD_LEVELS: LevelConfig[] = [
  {
    "id": 941,
    "code": "K1",
    "totalLevels": 99,
    "title": "齿焊 · 整组一次成型",
    "hintText": "齿轮一咬一反，焊死让它们只能对一次：先想清楚这组要转几下，再动手。",
    "winText": "试验通过：整组一次到位。",
    "parSteps": 12,
    "maxSteps": 14,
    "gridRows": 6,
    "gridCols": 6,
    "rules": {
      "weld": true
    },
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 270,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      }
    ],
    "subtitle": "组合"
  },
  {
    "id": 942,
    "code": "K2",
    "totalLevels": 99,
    "title": "齿焊 · 先动远的",
    "hintText": "近处一接通，那组齿轮就焊死了。先把远的路上该转的转完。",
    "winText": "试验通过：远近分得清。",
    "parSteps": 15,
    "maxSteps": 17,
    "gridRows": 6,
    "gridCols": 6,
    "rules": {
      "weld": true
    },
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 270,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      }
    ],
    "subtitle": "顺序"
  },
  {
    "id": 943,
    "code": "K3",
    "totalLevels": 99,
    "title": "齿焊 · 两组都得算",
    "hintText": "两组齿轮各要转不同的下数，而且谁先通电谁先锁。顺序比方向更要紧。",
    "winText": "试验通过：两组都没焊死。",
    "parSteps": 13,
    "maxSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "rules": {
      "weld": true
    },
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 270,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-2",
        "axisDir": -1
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      }
    ],
    "subtitle": "双组"
  }
];
