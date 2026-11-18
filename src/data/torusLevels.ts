/** 由 scripts/torus-gen.ts 生成，勿手改。环面实验关 T1–T3（id 921–923）。 */
import type { LevelConfig } from "../types/game";

export const TORUS_TEST_LEVELS: LevelConfig[] = [
  {
    "id": 921,
    "code": "T1",
    "totalLevels": 99,
    "title": "环面 · 从左边出去",
    "subtitle": "出界",
    "hintText": "盘面是卷起来的：从右边出去，会从左边回来；从上边下去，会从下边上来。别按屏幕上的距离算。",
    "winText": "试验通过：走出边界，又回来了。",
    "parSteps": 6,
    "maxSteps": 8,
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
        "rotation": 90,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "line",
        "rotation": 270,
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
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 922,
    "code": "T2",
    "totalLevels": 99,
    "title": "环面 · 绕一圈回来",
    "subtitle": "绕行",
    "hintText": "最短的路可能是穿过边界的那条；角落的管子常常有两套接法。",
    "winText": "试验通过：绕了一圈，反而更近。",
    "parSteps": 9,
    "maxSteps": 11,
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
        "rotation": 180,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
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
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "id": "t-5-4",
        "row": 5,
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
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
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
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
    "id": 923,
    "code": "T3",
    "totalLevels": 99,
    "title": "环面 · 别按距离算",
    "subtitle": "错觉",
    "hintText": "这一关的近路都在对面：先想清楚“穿出去”落在哪一格，再动手。",
    "winText": "试验通过：距离是假的。",
    "parSteps": 16,
    "maxSteps": 19,
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
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
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
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 90,
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
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "id": "t-4-1",
        "row": 4,
        "col": 1,
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
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  }
];
