/** 由 scripts/chapter2-gen.ts 生成，勿手改。 */
import type { LevelConfig } from "../types/game";

export const CHAPTER2_LEVELS: LevelConfig[] = [
  {
    "id": 21,
    "code": "21",
    "totalLevels": 99,
    "parSteps": 13,
    "maxSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
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
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
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
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
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
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      }
    ],
    "mechanicTags": [
      "gear"
    ],
    "primaryMechanic": "gear",
    "questionType": "相变",
    "role": "教"
  },
  {
    "id": 22,
    "code": "22",
    "totalLevels": 99,
    "parSteps": 13,
    "maxSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-5-0",
        "row": 5,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      }
    ],
    "mechanicTags": [
      "gear"
    ],
    "primaryMechanic": "gear",
    "questionType": "定位",
    "role": "练"
  },
  {
    "id": 23,
    "code": "23",
    "totalLevels": 99,
    "maxSteps": 15,
    "parSteps": 12,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ],
    "mechanicTags": [
      "basic",
      "multi-source"
    ],
    "primaryMechanic": "multi-source",
    "questionType": "分区",
    "role": "谷"
  },
  {
    "id": 24,
    "code": "24",
    "totalLevels": 99,
    "parSteps": 15,
    "maxSteps": 17,
    "gridRows": 6,
    "gridCols": 6,
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
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
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
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
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
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      }
    ],
    "mechanicTags": [
      "gear"
    ],
    "primaryMechanic": "gear",
    "questionType": "相变",
    "role": "练"
  },
  {
    "id": 25,
    "code": "25",
    "totalLevels": 99,
    "parSteps": 15,
    "maxSteps": 17,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-5-0",
        "row": 5,
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
        "type": "switch",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      }
    ],
    "mechanicTags": [
      "gear",
      "switch"
    ],
    "primaryMechanic": "gear",
    "questionType": "顺序",
    "role": "变"
  },
  {
    "id": 26,
    "code": "26",
    "totalLevels": 99,
    "parSteps": 14,
    "maxSteps": 16,
    "gridRows": 6,
    "gridCols": 6,
    "rules": {
      "wrap": true
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
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
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
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-4-4",
        "row": 4,
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
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
    ],
    "mechanicTags": [
      "wrap"
    ],
    "primaryMechanic": "wrap",
    "questionType": "定位",
    "role": "回声"
  },
  {
    "id": 27,
    "code": "27",
    "totalLevels": 99,
    "parSteps": 17,
    "maxSteps": 19,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
        "axisDir": -1
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-4-5",
        "row": 4,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      }
    ],
    "mechanicTags": [
      "gear"
    ],
    "primaryMechanic": "gear",
    "questionType": "相变",
    "role": "考"
  },
  {
    "id": 28,
    "code": "28",
    "totalLevels": 99,
    "parSteps": 14,
    "maxSteps": 16,
    "gridRows": 6,
    "gridCols": 6,
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
        "rotation": 0,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1"
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
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
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
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
        "locked": false,
        "axis": "ax-1"
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1"
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "axis": "ax-1"
      }
    ],
    "mechanicTags": [
      "axis"
    ],
    "primaryMechanic": "axis",
    "questionType": "定位",
    "role": "回声"
  },
  {
    "id": 29,
    "code": "29",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "goal": 2,
    "maxSteps": 17,
    "parSteps": 15,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
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
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "switch",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ],
    "mechanicTags": [
      "goal"
    ],
    "primaryMechanic": "goal",
    "questionType": "取舍",
    "role": "教"
  },
  {
    "id": 30,
    "code": "30",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "goal": 3,
    "maxSteps": 16,
    "parSteps": 14,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ],
    "mechanicTags": [
      "goal",
      "multi-source"
    ],
    "primaryMechanic": "goal",
    "questionType": "分区",
    "role": "练"
  },
  {
    "id": 31,
    "code": "31",
    "totalLevels": 99,
    "maxSteps": 17,
    "parSteps": 14,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ],
    "mechanicTags": [
      "basic",
      "multi-source"
    ],
    "primaryMechanic": "multi-source",
    "questionType": "定位",
    "role": "谷"
  },
  {
    "id": 32,
    "code": "32",
    "totalLevels": 99,
    "parSteps": 17,
    "maxSteps": 19,
    "gridRows": 6,
    "gridCols": 6,
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
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
        "axisDir": -1
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "t_shape",
        "rotation": 180,
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
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      }
    ],
    "mechanicTags": [
      "gear"
    ],
    "primaryMechanic": "gear",
    "questionType": "相变",
    "role": "考"
  },
  {
    "id": 33,
    "code": "33",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 16,
    "parSteps": 14,
    "rules": {},
    "goal": 3,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 450,
        "basePorts": 6,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 450,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 450,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "diode",
        "rotation": 450,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "switch",
        "rotation": 360,
        "basePorts": 10,
        "locked": false,
        "switchClosed": true
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 360,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 450,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 630,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 360,
        "basePorts": 6
      }
    ],
    "mechanicTags": [
      "goal",
      "multi-source"
    ],
    "primaryMechanic": "goal",
    "questionType": "取舍",
    "role": "练"
  },
  {
    "id": 34,
    "code": "34",
    "totalLevels": 99,
    "maxSteps": 16,
    "parSteps": 13,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ],
    "mechanicTags": [
      "basic",
      "cross",
      "decoy"
    ],
    "primaryMechanic": "decoy",
    "questionType": "定位",
    "role": "谷"
  },
  {
    "id": 35,
    "code": "35",
    "totalLevels": 99,
    "parSteps": 16,
    "maxSteps": 18,
    "gridRows": 6,
    "gridCols": 6,
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
        "rotation": 180,
        "basePorts": 14,
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
        "rotation": 90,
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
        "rotation": 180,
        "basePorts": 6,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": -1
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
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
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      }
    ],
    "mechanicTags": [
      "gear"
    ],
    "primaryMechanic": "gear",
    "questionType": "相变",
    "role": "考"
  },
  {
    "id": 36,
    "code": "36",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 15,
    "rules": {},
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 450,
        "basePorts": 6,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 540,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "diode",
        "rotation": 540,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "switch",
        "rotation": 540,
        "basePorts": 10,
        "locked": false,
        "switchClosed": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 450,
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 360,
        "basePorts": 6,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 450,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 630,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 630,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "switch",
        "rotation": 360,
        "basePorts": 10,
        "locked": false,
        "switchClosed": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "t_shape",
        "rotation": 720,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ],
    "mechanicTags": [
      "basic",
      "switch",
      "diode"
    ],
    "primaryMechanic": "switch",
    "questionType": "顺序",
    "role": "谷"
  },
  {
    "id": 37,
    "code": "37",
    "totalLevels": 99,
    "parSteps": 15,
    "maxSteps": 17,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "battery",
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
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
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": -1
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
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
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      }
    ],
    "goal": 3,
    "mechanicTags": [
      "goal",
      "gear"
    ],
    "primaryMechanic": "goal",
    "questionType": "取舍",
    "role": "变"
  },
  {
    "id": 38,
    "code": "38",
    "totalLevels": 99,
    "parSteps": 17,
    "maxSteps": 19,
    "gridRows": 6,
    "gridCols": 6,
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
        "id": "t-2-1",
        "row": 2,
        "col": 1,
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
        "rotation": 90,
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
        "locked": false,
        "axis": "ax-1"
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1"
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1"
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
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
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
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
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "axis": "ax-1"
      }
    ],
    "mechanicTags": [
      "axis"
    ],
    "primaryMechanic": "axis",
    "questionType": "相变",
    "role": "回声"
  },
  {
    "id": 39,
    "code": "39",
    "totalLevels": 99,
    "maxSteps": 17,
    "parSteps": 14,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      }
    ],
    "mechanicTags": [
      "basic",
      "multi-source"
    ],
    "primaryMechanic": "multi-source",
    "questionType": "分区",
    "role": "谷"
  },
  {
    "id": 40,
    "code": "40",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "goal": 4,
    "maxSteps": 21,
    "parSteps": 19,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "g-boss",
        "axisDir": -1
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "axis": "g-boss",
        "axisDir": 1
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ],
    "mechanicTags": [
      "gear",
      "goal"
    ],
    "primaryMechanic": "gear",
    "questionType": "取舍",
    "role": "boss"
  }
];
