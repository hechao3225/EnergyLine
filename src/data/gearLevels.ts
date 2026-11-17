/** 由 scripts/gear-gen.ts 生成，勿手改。齿轮咬合实验关 G1–G3（id 911–913）。 */
import type { LevelConfig } from "../types/game";

export const GEAR_TEST_LEVELS: LevelConfig[] = [
  {
    "id": 911,
    "code": "G1",
    "totalLevels": 99,
    "title": "齿轮 · 一咬一反",
    "hintText": "带齿轮的两格是一对咬合的齿轮：点一下，一格顺时针、另一格逆时针。它们只能一起对，或者一起错。",
    "winText": "试验通过：一格顺、一格反，一起归位。",
    "parSteps": 9,
    "maxSteps": 11,
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
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
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
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
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
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 270,
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
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 0,
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
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 270,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      }
    ],
    "subtitle": "咬合"
  },
  {
    "id": 912,
    "code": "G2",
    "totalLevels": 99,
    "title": "齿轮 · 两组各转各的",
    "hintText": "两条齿轮组不在同一条路上：先把步数分给要转 3 下的那组，另一组只需 1 下。",
    "winText": "试验通过：两组各转各的，没有互相拖死。",
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
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
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
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "axis": "ax-1",
        "axisDir": 1
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 0,
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
        "id": "t-2-1",
        "row": 2,
        "col": 1,
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
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 0,
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
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      }
    ],
    "subtitle": "分工"
  },
  {
    "id": 913,
    "code": "G3",
    "totalLevels": 99,
    "title": "齿轮 · 三个格子的一条命",
    "hintText": "最长的一组要连点三下：中途任何一下都不会亮，点满才通。别在第二下就以为走错了。",
    "winText": "试验通过：三下点满，齿才咬到位。",
    "parSteps": 18,
    "maxSteps": 21,
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
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 90,
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
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
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
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
        "axisDir": 1
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false,
        "axis": "ax-2",
        "axisDir": -1
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false,
        "axis": "ax-1",
        "axisDir": 1
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
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "axis": "ax-1",
        "axisDir": -1
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
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
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      }
    ],
    "subtitle": "承诺"
  }
];
