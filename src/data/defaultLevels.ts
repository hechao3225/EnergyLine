/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelConfig } from '../types/game';

export const DEFAULT_LEVELS: LevelConfig[] = [
  {
    "id": 1,
    "code": "01",
    "totalLevels": 99,
    "title": "单线启明",
    "subtitle": "地脉之根 · 引导首脉活水",
    "hintText": "点击水渠进行顺时针旋转，接通灵泉与花蕾。",
    "winText": "第一朵灵花已盛开！活水顺畅注入树根。",
    "maxSteps": 12,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    "parSteps": 7
  },
  {
    "id": 2,
    "code": "02",
    "totalLevels": 99,
    "title": "双路分流",
    "subtitle": "地脉之根 · 三通分流上下齐开",
    "hintText": "利用三通玉管分流，将清泉同时送往上下两路。",
    "winText": "双花同放！灵脉分流和谐运转。",
    "maxSteps": 18,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    "parSteps": 12
  },
  {
    "id": 3,
    "code": "03",
    "totalLevels": 99,
    "title": "三盏归巢",
    "subtitle": "地脉之根 · 三条支路与诱饵甄别",
    "hintText": "规划上中下三路，避开无效诱饵管道。",
    "winText": "三朵仙花璀璨盛开！水网运转如意。",
    "maxSteps": 15,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "id": "t-3-3",
        "row": 3,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    "parSteps": 10
  },
  {
    "id": 4,
    "code": "04",
    "totalLevels": 99,
    "title": "经纬初交",
    "subtitle": "地脉之根 · 十字立交纵横穿梭",
    "hintText": "十字立交允许水平与垂直水流同时穿行且互不串流。",
    "winText": "水脉纵横交织！十字立交巧妙打通两路通途。",
    "maxSteps": 15,
    "parSteps": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 180,
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
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
    ]
  },
  {
    "id": 5,
    "code": "05",
    "totalLevels": 99,
    "title": "地脉断壁",
    "subtitle": "地脉之根 · 固化地脉与外围迂回",
    "hintText": "带有锁石标记的管道已固化不可旋转，必须依其固有方向规划水路。",
    "winText": "成功绕开地脉断壁！坚韧的灵泉已灌溉双花。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "rotation": 180,
        "basePorts": 6,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    ]
  },
  {
    "id": 6,
    "code": "06",
    "totalLevels": 99,
    "title": "四方聚灵",
    "subtitle": "地脉之根 · 中心涌泉四向生机",
    "hintText": "中心灵泉向四方同时吐纳活水，梳理四方玉管通达四方仙花。",
    "winText": "四海升平！四方灵花同时绽放。",
    "maxSteps": 14,
    "parSteps": 9,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "id": "t-1-2",
        "row": 1,
        "col": 2,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "battery",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
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
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
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
    ]
  },
  {
    "id": 7,
    "code": "07",
    "totalLevels": 99,
    "title": "暗礁迷径",
    "subtitle": "地脉之根 · 点亮 3 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 7 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "basePorts": 10
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "basePorts": 10
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "rotation": 0,
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
    ]
  },
  {
    "id": 8,
    "code": "08",
    "totalLevels": 99,
    "title": "回龙引泉",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 8 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 13,
    "parSteps": 8,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 180,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 180,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "line",
        "rotation": 90,
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
        "rotation": 0,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 9,
    "code": "09",
    "totalLevels": 99,
    "title": "双十字错",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 9 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 14,
    "parSteps": 9,
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
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 90,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 90,
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
        "rotation": 0,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 10,
    "code": "10",
    "totalLevels": 99,
    "title": "寒潭墨雪",
    "subtitle": "地脉之根 · 玄冰初融仙葩初醒",
    "hintText": "寒潭九曲回环，利用立体十字与迂回玉道唤醒三朵仙花。",
    "winText": "寒霜褪尽，墨雪迎春！地脉第一至宝已收录花谱。",
    "maxSteps": 33,
    "parSteps": 22,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
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
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
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
        "rotation": 180,
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
        "locked": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
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
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
    ]
  },
  {
    "id": 11,
    "code": "11",
    "totalLevels": 99,
    "title": "歧路亡羊",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 11 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
        "type": "corner",
        "rotation": 90,
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
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 180,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 12,
    "code": "12",
    "totalLevels": 99,
    "title": "灵泉对角",
    "subtitle": "地脉之根 · 点亮 3 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 12 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "line",
        "rotation": 180,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 13,
    "code": "13",
    "totalLevels": 99,
    "title": "三叠飞瀑",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 13 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 15,
    "parSteps": 10,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
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
        "type": "corner",
        "rotation": 0,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
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
        "rotation": 90,
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
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 180,
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
    ]
  },
  {
    "id": 14,
    "code": "14",
    "totalLevels": 99,
    "title": "双环扣月",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 14 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "rotation": 0,
        "basePorts": 10
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 270,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 15,
    "code": "15",
    "totalLevels": 99,
    "title": "千丝织锦",
    "subtitle": "地脉之根 · 点亮 3 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 15 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
        "basePorts": 6,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "rotation": 180,
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
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 16,
    "code": "16",
    "totalLevels": 99,
    "title": "狭谷穿针",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 16 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 13,
    "parSteps": 8,
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
        "type": "line",
        "rotation": 90,
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
        "type": "line",
        "rotation": 270,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "line",
        "rotation": 180,
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
        "type": "line",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
    ]
  },
  {
    "id": 17,
    "code": "17",
    "totalLevels": 99,
    "title": "四明分辉",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 17 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 14,
    "parSteps": 9,
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
    ]
  },
  {
    "id": 18,
    "code": "18",
    "totalLevels": 99,
    "title": "迷津藏玉",
    "subtitle": "地脉之根 · 点亮 3 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 18 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "corner",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "rotation": 0,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 19,
    "code": "19",
    "totalLevels": 99,
    "title": "九曲黄龙",
    "subtitle": "地脉之根 · 点亮 2 朵枝头灵花",
    "hintText": "规划各条支路水脉，避开断路与死管。",
    "winText": "第 19 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 14,
    "parSteps": 9,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "corner",
        "rotation": 270,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
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
    ]
  },
  {
    "id": 20,
    "code": "20",
    "totalLevels": 99,
    "title": "地脉厚土",
    "subtitle": "地脉之根 · 第一卷关底大考",
    "hintText": "万丈根系交织贯通，四朵厚土灵花静候清泉归位！",
    "winText": "【地脉之根】圆满复苏！地脉厚土莲熠熠生辉。",
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
    ]
  },
  {
    "id": 21,
    "code": "21",
    "totalLevels": 99,
    "title": "灵闸初动",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 21 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
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
        "rotation": 0,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
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
        "type": "corner",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 22,
    "code": "22",
    "totalLevels": 99,
    "title": "分时通渠",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 22 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 15,
    "parSteps": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 270,
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 23,
    "code": "23",
    "totalLevels": 99,
    "title": "双闸并峙",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 23 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 15,
    "parSteps": 10,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 24,
    "code": "24",
    "totalLevels": 99,
    "title": "断脉之桥",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 24 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "switch",
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 90,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
    ]
  },
  {
    "id": 25,
    "code": "25",
    "totalLevels": 99,
    "title": "双源初现",
    "subtitle": "巨木之干 · 双灵泉协同并流",
    "hintText": "首次出现南北双灵泉！各自负责一条主脉，不可相互阻断。",
    "winText": "双泉齐涌！阴阳二脉同注枝干。",
    "maxSteps": 32,
    "parSteps": 21,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "rotation": 180,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    ]
  },
  {
    "id": 26,
    "code": "26",
    "totalLevels": 99,
    "title": "水脉交融",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 26 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 90,
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
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "switch",
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 270,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
    ]
  },
  {
    "id": 27,
    "code": "27",
    "totalLevels": 99,
    "title": "闸门虚设",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 27 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 28,
    "code": "28",
    "totalLevels": 99,
    "title": "穿干引泉",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 28 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 17,
    "parSteps": 11,
    "gridRows": 6,
    "gridCols": 6,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "switch",
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 180,
        "basePorts": 10
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
        "rotation": 270,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 29,
    "code": "29",
    "totalLevels": 99,
    "title": "经纬双闸",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 29 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 180,
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
    ]
  },
  {
    "id": 30,
    "code": "30",
    "totalLevels": 99,
    "title": "碧落青苍",
    "subtitle": "巨木之干 · 点亮 4 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 30 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 270,
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
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "type": "switch",
        "rotation": 0,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 31,
    "code": "31",
    "totalLevels": 99,
    "title": "串联双闸",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 31 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      }
    ]
  },
  {
    "id": 32,
    "code": "32",
    "totalLevels": 99,
    "title": "并联分闸",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 32 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
    ]
  },
  {
    "id": 33,
    "code": "33",
    "totalLevels": 99,
    "title": "双源汇流",
    "subtitle": "巨木之干 · 点亮 4 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 33 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
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
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "rotation": 0,
        "basePorts": 6
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
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
        "rotation": 0,
        "basePorts": 6
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 34,
    "code": "34",
    "totalLevels": 99,
    "title": "树皮迷宫",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 34 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 35,
    "code": "35",
    "totalLevels": 99,
    "title": "闸刀矩阵",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 35 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
    ]
  },
  {
    "id": 36,
    "code": "36",
    "totalLevels": 99,
    "title": "双源折射",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 36 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 90,
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
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "switch",
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 90,
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
    ]
  },
  {
    "id": 37,
    "code": "37",
    "totalLevels": 99,
    "title": "断流求生",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 37 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ]
  },
  {
    "id": 38,
    "code": "38",
    "totalLevels": 99,
    "title": "灵髓奔涌",
    "subtitle": "巨木之干 · 点亮 2 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 38 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
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
        "rotation": 0,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
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
        "locked": false
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "rotation": 90,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 39,
    "code": "39",
    "totalLevels": 99,
    "title": "九关锁脉",
    "subtitle": "巨木之干 · 点亮 3 朵枝头灵花",
    "hintText": "点击开关可闭合断开的水道，合理调度通水时序。",
    "winText": "第 39 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "id": "t-1-0",
        "row": 1,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-2-0",
        "row": 2,
        "col": 0,
        "type": "line",
        "rotation": 90,
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      }
    ]
  },
  {
    "id": 40,
    "code": "40",
    "totalLevels": 99,
    "title": "九霄玉兰",
    "subtitle": "巨木之干 · 第二卷关底大考",
    "hintText": "统筹双灵泉与两路闸阀，点亮树干至高处的四朵九霄玉兰！",
    "winText": "【巨木之干】全脉畅通！九霄玉兰迎风怒放。",
    "maxSteps": 30,
    "parSteps": 20,
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
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
    ]
  },
  {
    "id": 41,
    "code": "41",
    "totalLevels": 99,
    "title": "顺水推舟",
    "subtitle": "苍翠繁枝 · 单向导通谨防逆流",
    "hintText": "单向阀箭头指示灵泉允许通过的唯一方向，逆向将完全截断水流。",
    "winText": "顺向导流通达自如！二极管精准掌控水势。",
    "maxSteps": 17,
    "parSteps": 11,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "diode",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    ]
  },
  {
    "id": 42,
    "code": "42",
    "totalLevels": 99,
    "title": "逆流止步",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 42 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
    "parSteps": 12,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
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
        "rotation": 180,
        "basePorts": 6
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
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
        "type": "line",
        "rotation": 90,
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
        "locked": true
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
        "rotation": 0,
        "basePorts": 14,
        "locked": false
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "diode",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
    ]
  },
  {
    "id": 43,
    "code": "43",
    "totalLevels": 99,
    "title": "枝头分向",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 43 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 18,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
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
        "rotation": 0,
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 270,
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 90,
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
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      }
    ]
  },
  {
    "id": 44,
    "code": "44",
    "totalLevels": 99,
    "title": "单向环流",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 44 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
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
        "id": "t-2-4",
        "row": 2,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "line",
        "rotation": 270,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 45,
    "code": "45",
    "totalLevels": 99,
    "title": "双向并轨",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 45 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
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
        "type": "line",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 270,
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
        "type": "corner",
        "rotation": 270,
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
        "type": "diode",
        "rotation": 270,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
    ]
  },
  {
    "id": 46,
    "code": "46",
    "totalLevels": 99,
    "title": "繁枝分桠",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 46 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 47,
    "code": "47",
    "totalLevels": 99,
    "title": "二极立交",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 47 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "rotation": 0,
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
        "rotation": 270,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "rotation": 90,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 48,
    "code": "48",
    "totalLevels": 99,
    "title": "逆水行舟",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 48 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
    ]
  },
  {
    "id": 49,
    "code": "49",
    "totalLevels": 99,
    "title": "双源对流",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 49 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "corner",
        "rotation": 180,
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 0,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 270,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
    ]
  },
  {
    "id": 50,
    "code": "50",
    "totalLevels": 99,
    "title": "琼枝玉叶",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 50 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
    "parSteps": 14,
    "gridRows": 6,
    "gridCols": 6,
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
        "rotation": 0,
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
        "rotation": 0,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
    ]
  },
  {
    "id": 51,
    "code": "51",
    "totalLevels": 99,
    "title": "极性门禁",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 51 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 0,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
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
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
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
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 270,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ]
  },
  {
    "id": 52,
    "code": "52",
    "totalLevels": 99,
    "title": "错位三极",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 52 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
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
        "rotation": 270,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
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
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 90,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
    ]
  },
  {
    "id": 53,
    "code": "53",
    "totalLevels": 99,
    "title": "繁叶蔽日",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 53 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
    "parSteps": 14,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 270,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    ]
  },
  {
    "id": 54,
    "code": "54",
    "totalLevels": 99,
    "title": "顺流直下",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 54 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "type": "corner",
        "rotation": 180,
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
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 270,
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 270,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "rotation": 90,
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
    ]
  },
  {
    "id": 55,
    "code": "55",
    "totalLevels": 99,
    "title": "双极互锁",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 55 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "rotation": 0,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 270,
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
        "type": "corner",
        "rotation": 270,
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "diode",
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ]
  },
  {
    "id": 56,
    "code": "56",
    "totalLevels": 99,
    "title": "枝蔓缠绕",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 56 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 270,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
        "basePorts": 14,
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
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 90,
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
    ]
  },
  {
    "id": 57,
    "code": "57",
    "totalLevels": 99,
    "title": "逆流陷阱",
    "subtitle": "苍翠繁枝 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 57 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
    "gridRows": 6,
    "gridCols": 6,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 180,
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
        "type": "t_shape",
        "rotation": 180,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-1",
        "row": 5,
        "col": 1,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
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
    ]
  },
  {
    "id": 58,
    "code": "58",
    "totalLevels": 99,
    "title": "四方聚枝",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 58 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 59,
    "code": "59",
    "totalLevels": 99,
    "title": "青藤绕柱",
    "subtitle": "苍翠繁枝 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 59 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "basePorts": 6,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
    ]
  },
  {
    "id": 60,
    "code": "60",
    "totalLevels": 99,
    "title": "碧落仙荷",
    "subtitle": "苍翠繁枝 · 第三卷关底大考",
    "hintText": "五方碧水聚繁枝，四向极性定乾坤！",
    "winText": "【苍翠繁枝】灵气盎然！碧落仙荷香飘十里。",
    "maxSteps": 33,
    "parSteps": 22,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
    ]
  },
  {
    "id": 61,
    "code": "61",
    "totalLevels": 99,
    "title": "云桥初架",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 61 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 270,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "diode",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
    ]
  },
  {
    "id": 62,
    "code": "62",
    "totalLevels": 99,
    "title": "雾锁天河",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 62 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 63,
    "code": "63",
    "totalLevels": 99,
    "title": "云中双瀑",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 63 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 20,
    "parSteps": 13,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 0,
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
        "type": "corner",
        "rotation": 90,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ]
  },
  {
    "id": 64,
    "code": "64",
    "totalLevels": 99,
    "title": "风雷变幻",
    "subtitle": "云海天桥 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 64 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 0,
        "basePorts": 6
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 90,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
        "type": "t_shape",
        "rotation": 180,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "rotation": 270,
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
    ]
  },
  {
    "id": 65,
    "code": "65",
    "totalLevels": 99,
    "title": "天河倒泻",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 65 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-2-5",
        "row": 2,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-3-0",
        "row": 3,
        "col": 0,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 66,
    "code": "66",
    "totalLevels": 99,
    "title": "云岫穿行",
    "subtitle": "云海天桥 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 66 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
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
        "basePorts": 10,
        "locked": true
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
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 67,
    "code": "67",
    "totalLevels": 99,
    "title": "双源云渡",
    "subtitle": "云海天桥 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 67 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 21,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "rotation": 180,
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ]
  },
  {
    "id": 68,
    "code": "68",
    "totalLevels": 99,
    "title": "闸控双极",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 68 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 69,
    "code": "69",
    "totalLevels": 99,
    "title": "虚空栈道",
    "subtitle": "云海天桥 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 69 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "rotation": 180,
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
        "rotation": 0,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-4",
        "row": 2,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 70,
    "code": "70",
    "totalLevels": 99,
    "title": "凌霄七彩",
    "subtitle": "云海天桥 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 70 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 0,
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
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 0,
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
        "rotation": 180,
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
    ]
  },
  {
    "id": 71,
    "code": "71",
    "totalLevels": 99,
    "title": "风息水静",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 71 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "line",
        "rotation": 270,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 270,
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
        "type": "corner",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
    ]
  },
  {
    "id": 72,
    "code": "72",
    "totalLevels": 99,
    "title": "梯级云台",
    "subtitle": "云海天桥 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 72 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
      }
    ]
  },
  {
    "id": 73,
    "code": "73",
    "totalLevels": 99,
    "title": "回光返照",
    "subtitle": "云海天桥 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 73 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
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
        "rotation": 270,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
    ]
  },
  {
    "id": 74,
    "code": "74",
    "totalLevels": 99,
    "title": "天堑飞渡",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 74 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
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
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 270,
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
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 75,
    "code": "75",
    "totalLevels": 99,
    "title": "双源四象",
    "subtitle": "云海天桥 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 75 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 90,
        "basePorts": 6
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 90,
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
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 76,
    "code": "76",
    "totalLevels": 99,
    "title": "云涡暗流",
    "subtitle": "云海天桥 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 76 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "line",
        "rotation": 0,
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
        "rotation": 270,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-1",
        "row": 2,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "corner",
        "rotation": 0,
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
    ]
  },
  {
    "id": 77,
    "code": "77",
    "totalLevels": 99,
    "title": "断崖飞瀑",
    "subtitle": "云海天桥 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 77 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 78,
    "code": "78",
    "totalLevels": 99,
    "title": "灵河织锦",
    "subtitle": "云海天桥 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 78 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-5",
        "row": 0,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-1",
        "row": 3,
        "col": 1,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
    ]
  },
  {
    "id": 79,
    "code": "79",
    "totalLevels": 99,
    "title": "星罗棋布",
    "subtitle": "云海天桥 · 点亮 3 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 79 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 180,
        "basePorts": 6,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 80,
    "code": "80",
    "totalLevels": 99,
    "title": "赤血金凤",
    "subtitle": "云海天桥 · 第四卷关底大考",
    "hintText": "全要素机关融合，双源飞渡云海，唤醒绝世赤血金凤！",
    "winText": "【云海天桥】万道霞光！赤血金凤振翅凌霄。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": true
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
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
        "type": "t_shape",
        "rotation": 0,
        "basePorts": 14,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
    ]
  },
  {
    "id": 81,
    "code": "81",
    "totalLevels": 99,
    "title": "太古乾坤",
    "subtitle": "神树之巅 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 81 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 180,
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
        "rotation": 180,
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-5",
        "row": 5,
        "col": 5,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      }
    ]
  },
  {
    "id": 82,
    "code": "82",
    "totalLevels": 99,
    "title": "三生万物",
    "subtitle": "神树之巅 · 三才灵泉天地合德",
    "hintText": "天地人三灵泉首次并辔而发！三线并进，融通万象。",
    "winText": "三生万物！三道清流共铸神木辉煌。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 90,
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
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
    ]
  },
  {
    "id": 83,
    "code": "83",
    "totalLevels": 99,
    "title": "极光玄枢",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 83 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 23,
    "parSteps": 15,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 270,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "diode",
        "rotation": 180,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "line",
        "rotation": 270,
        "basePorts": 10
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10
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
      }
    ]
  },
  {
    "id": 84,
    "code": "84",
    "totalLevels": 99,
    "title": "天地逆旅",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 84 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
    "gridRows": 6,
    "gridCols": 6,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-0-1",
        "row": 0,
        "col": 1,
        "type": "line",
        "rotation": 90,
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
        "basePorts": 6
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 270,
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
        "type": "t_shape",
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "line",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
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
    ]
  },
  {
    "id": 85,
    "code": "85",
    "totalLevels": 99,
    "title": "八卦玄阵",
    "subtitle": "神树之巅 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 85 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
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
        "rotation": 180,
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "diode",
        "rotation": 270,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
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
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "corner",
        "rotation": 0,
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
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
    ]
  },
  {
    "id": 86,
    "code": "86",
    "totalLevels": 99,
    "title": "九曜贯日",
    "subtitle": "神树之巅 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 86 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-5",
        "row": 4,
        "col": 5,
        "type": "corner",
        "rotation": 270,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
    ]
  },
  {
    "id": 87,
    "code": "87",
    "totalLevels": 99,
    "title": "万化归一",
    "subtitle": "神树之巅 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 87 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 24,
    "parSteps": 16,
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
        "type": "line",
        "rotation": 0,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-2-4",
        "row": 2,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "diode",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 90,
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
    ]
  },
  {
    "id": 88,
    "code": "88",
    "totalLevels": 99,
    "title": "混沌初开",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 88 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "line",
        "rotation": 90,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10
      },
      {
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 270,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
    ]
  },
  {
    "id": 89,
    "code": "89",
    "totalLevels": 99,
    "title": "虚实相生",
    "subtitle": "神树之巅 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 89 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "rotation": 0,
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
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
        "rotation": 0,
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
    ]
  },
  {
    "id": 90,
    "code": "90",
    "totalLevels": 99,
    "title": "玄天青莲",
    "subtitle": "神树之巅 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 90 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-1",
        "row": 1,
        "col": 1,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "diode",
        "rotation": 0,
        "basePorts": 10,
        "locked": false
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
        "rotation": 270,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "switch",
        "rotation": 180,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 270,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10
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
        "type": "corner",
        "rotation": 0,
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
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 91,
    "code": "91",
    "totalLevels": 99,
    "title": "三源并辔",
    "subtitle": "神树之巅 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 91 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 26,
    "parSteps": 17,
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
        "type": "line",
        "rotation": 90,
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
        "rotation": 0,
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
        "basePorts": 6
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
        "rotation": 0,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "line",
        "rotation": 270,
        "basePorts": 10,
        "locked": true
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
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-3-5",
        "row": 3,
        "col": 5,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15,
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
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 92,
    "code": "92",
    "totalLevels": 99,
    "title": "四面楚歌",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 92 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 27,
    "parSteps": 18,
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
        "type": "corner",
        "rotation": 180,
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
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-4",
        "row": 1,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-2-1",
        "row": 2,
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 93,
    "code": "93",
    "totalLevels": 99,
    "title": "星河倒卷",
    "subtitle": "神树之巅 · 点亮 4 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 93 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 27,
    "parSteps": 18,
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
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 270,
        "basePorts": 6,
        "locked": false
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
        "type": "line",
        "rotation": 0,
        "basePorts": 10
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
        "type": "t_shape",
        "rotation": 180,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
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
        "rotation": 270,
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
    ]
  },
  {
    "id": 94,
    "code": "94",
    "totalLevels": 99,
    "title": "太素神音",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 94 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 30,
    "parSteps": 20,
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
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 10,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "rotation": 0,
        "basePorts": 6
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
        "rotation": 180,
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
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "corner",
        "rotation": 180,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
    ]
  },
  {
    "id": 95,
    "code": "95",
    "totalLevels": 99,
    "title": "生死双门",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 95 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 27,
    "parSteps": 18,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "t_shape",
        "rotation": 90,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "corner",
        "rotation": 270,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "id": "t-3-2",
        "row": 3,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 0,
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
        "rotation": 0,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 0,
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
        "rotation": 90,
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
    ]
  },
  {
    "id": 96,
    "code": "96",
    "totalLevels": 99,
    "title": "大衍之数",
    "subtitle": "神树之巅 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 96 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 29,
    "parSteps": 19,
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
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "t_shape",
        "rotation": 270,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "t_shape",
        "rotation": 180,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 97,
    "code": "97",
    "totalLevels": 99,
    "title": "无极太极",
    "subtitle": "神树之巅 · 点亮 5 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 97 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 29,
    "parSteps": 19,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6,
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
        "rotation": 180,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "id": "t-1-2",
        "row": 1,
        "col": 2,
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-1-3",
        "row": 1,
        "col": 3,
        "type": "switch",
        "rotation": 0,
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
        "rotation": 180,
        "basePorts": 10,
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
        "rotation": 270,
        "basePorts": 6
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
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "rotation": 90,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "switch",
        "rotation": 0,
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
    ]
  },
  {
    "id": 98,
    "code": "98",
    "totalLevels": 99,
    "title": "通天神树",
    "subtitle": "神树之巅 · 点亮 6 朵枝头灵花",
    "hintText": "单向阀限制了水流流向，逆向将无法点亮；注意观察水脉箭头。",
    "winText": "第 98 关已通关！甘霖已顺利滋润仙蕾。",
    "maxSteps": 29,
    "parSteps": 19,
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
        "type": "diode",
        "rotation": 270,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
        "rotation": 0,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-2-2",
        "row": 2,
        "col": 2,
        "type": "line",
        "rotation": 0,
        "basePorts": 10,
        "locked": true
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
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
        "rotation": 0,
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
        "type": "corner",
        "rotation": 270,
        "basePorts": 6
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "t_shape",
        "rotation": 180,
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
        "type": "line",
        "rotation": 180,
        "basePorts": 10,
        "locked": true
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "corner",
        "rotation": 90,
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
    ]
  },
  {
    "id": 99,
    "code": "99",
    "totalLevels": 99,
    "title": "混沌鸿蒙",
    "subtitle": "神树之巅 · 万木生辉终极大圆满",
    "hintText": "终极九十九重天境！统合三源、全开关与二极管，唤醒混沌鸿蒙树！",
    "winText": "🎉 天地同庆！通天世界树完全复苏，九十九重生灵秘境重现人间！",
    "maxSteps": 45,
    "parSteps": 30,
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
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-2",
        "row": 0,
        "col": 2,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "diode",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-0-4",
        "row": 0,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-2-1",
        "row": 2,
        "col": 1,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
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
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "diode",
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-4",
        "row": 2,
        "col": 4,
        "type": "line",
        "rotation": 90,
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
        "type": "corner",
        "rotation": 180,
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
        "id": "t-3-4",
        "row": 3,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "t-4-1",
        "row": 4,
        "col": 1,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-4-2",
        "row": 4,
        "col": 2,
        "type": "t_shape",
        "rotation": 270,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "diode",
        "rotation": 180,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
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
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-5-3",
        "row": 5,
        "col": 3,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "line",
        "rotation": 90,
        "basePorts": 10,
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
    ]
  }
];
