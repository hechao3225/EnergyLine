/** 由 scripts/weld-gen.ts 生成，勿手改。焊死实验关 W1–W3（id 931–933）。 */
import type { LevelConfig } from "../types/game";

export const WELD_TEST_LEVELS: LevelConfig[] = [
  {
    "id": 931,
    "code": "W1",
    "totalLevels": 99,
    "title": "焊死 · 先远后近",
    "subtitle": "顺序",
    "hintText": "通电的管子会焊死，不能再转。先修离源最远的那盏，再一路往回接。",
    "winText": "试验通过：从远往近修，才修得完。",
    "parSteps": 10,
    "maxSteps": 12,
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
        "basePorts": 14
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
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
      }
    ]
  },
  {
    "id": 932,
    "code": "W2",
    "totalLevels": 99,
    "title": "焊死 · 别急着接源头",
    "subtitle": "忍住",
    "hintText": "源头附近一接通就焊住了。中间那条捷径看着最顺，接了就没法回头。",
    "winText": "试验通过：先接通的地方，最后才碰。",
    "parSteps": 14,
    "maxSteps": 16,
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
        "basePorts": 14
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
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
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
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
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 933,
    "code": "W3",
    "totalLevels": 99,
    "title": "焊死 · 一次都不能错",
    "subtitle": "承诺",
    "hintText": "四盏灯，预算只比最少步数多三步。每一下都要先想清楚它会不会把后面的路焊死。",
    "winText": "试验通过：每一步都算过。",
    "parSteps": 14,
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
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
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
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 0,
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
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      }
    ]
  }
];
