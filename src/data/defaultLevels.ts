/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 关卡布局与步数数据。展示文案在 src/content/levels.ts，主题迁移不再修改本文件。
 * 由 scripts/generate-99-levels.ts / scripts/strip_level_text.ts 生成。
 */

import { LevelConfig } from '../types/game';
import { CHAPTER1_LEVELS } from './chapter1Levels';
import { CHAPTER2_LEVELS } from './chapter2Levels';
import { CHAPTER3_LEVELS } from './chapter3Levels';

export const LEGACY_LEVELS: LevelConfig[] = [
  {
    "id": 1,
    "code": "01",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 12,
    "parSteps": 7,
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
    ]
  },
  {
    "id": 2,
    "code": "02",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 14,
    "parSteps": 9,
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
        "rotation": 180,
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
        "rotation": 0,
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
        "rotation": 180,
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
    ]
  },
  {
    "id": 3,
    "code": "03",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 15,
    "parSteps": 10,
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
    ]
  },
  {
    "id": 4,
    "code": "04",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 15,
    "parSteps": 10,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 11,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 14,
    "parSteps": 9,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 11,
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
        "rotation": 270,
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
        "rotation": 90,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 15,
    "parSteps": 10,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 14,
    "parSteps": 9,
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
    "gridRows": 6,
    "gridCols": 6,
    "goal": 2,
    "maxSteps": 14,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 15,
    "parSteps": 10,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 11,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 14,
    "parSteps": 9,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 11,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 14,
    "parSteps": 9,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 19,
    "parSteps": 18,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
        "rotation": 270,
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
        "rotation": 180,
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
    "id": 22,
    "code": "22",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 20,
    "parSteps": 13,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 21,
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
        "rotation": 180,
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
        "rotation": 90,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 20,
    "parSteps": 13,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 20,
    "parSteps": 13,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 11,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 17,
    "parSteps": 11,
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
    "gridRows": 6,
    "gridCols": 6,
    "goal": 3,
    "maxSteps": 12,
    "parSteps": 12,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": true
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6,
        "locked": false
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "t-4-4",
        "row": 4,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
        "locked": false,
        "switchClosed": true
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
        "type": "corner",
        "rotation": 270,
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
    "id": 31,
    "code": "31",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 21,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 18,
    "parSteps": 12,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 20,
    "parSteps": 13,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 270,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 0,
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
        "rotation": 180,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
        "type": "corner",
        "rotation": 90,
        "basePorts": 6
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 22,
    "parSteps": 21,
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
        "rotation": 270,
        "basePorts": 10,
        "locked": false,
        "switchClosed": false
      },
      {
        "id": "t-0-3",
        "row": 0,
        "col": 3,
        "type": "corner",
        "rotation": 0,
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
        "rotation": 0,
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
        "rotation": 90,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 21,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "t_shape",
        "rotation": 180,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 270,
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
        "rotation": 270,
        "basePorts": 14,
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
        "rotation": 180,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 90,
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
        "rotation": 90,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
        "rotation": 180,
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
    "id": 45,
    "code": "45",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 26,
    "parSteps": 17,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 26,
    "parSteps": 17,
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
        "rotation": 180,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 26,
    "parSteps": 17,
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
        "rotation": 270,
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
        "rotation": 180,
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
    "id": 49,
    "code": "49",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
    "gridRows": 6,
    "gridCols": 6,
    "goal": 2,
    "maxSteps": 15,
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
    ]
  },
  {
    "id": 51,
    "code": "51",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 21,
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
        "rotation": 90,
        "basePorts": 6,
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
        "rotation": 270,
        "basePorts": 10,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 23,
    "parSteps": 15,
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
        "type": "corner",
        "rotation": 0,
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
        "rotation": 0,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-2-3",
        "row": 2,
        "col": 3,
        "type": "diode",
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
        "rotation": 180,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-4-3",
        "row": 4,
        "col": 3,
        "type": "switch",
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
    "id": 55,
    "code": "55",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 26,
    "parSteps": 17,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
    "parSteps": 19,
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
        "rotation": 0,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-3-3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 90,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 23,
    "parSteps": 15,
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
        "rotation": 0,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 26,
    "parSteps": 17,
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
    "gridRows": 6,
    "gridCols": 6,
    "tier": "hell",
    "maxSteps": 24,
    "parSteps": 24,
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
        "rotation": 90,
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
        "rotation": 270,
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
        "rotation": 0,
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
        "rotation": 90,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
    "id": 62,
    "code": "62",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 26,
    "parSteps": 17,
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
        "rotation": 270,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 24,
    "parSteps": 16,
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
    "id": 65,
    "code": "65",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 90,
        "basePorts": 6,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
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
        "rotation": 270,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
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
    "id": 69,
    "code": "69",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 32,
    "parSteps": 21,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "goal": 4,
    "maxSteps": 18,
    "parSteps": 18,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
    "parSteps": 19,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 30,
    "parSteps": 20,
    "tiles": [
      {
        "id": "t-0-0",
        "row": 0,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true,
        "color": 0
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
        "locked": true,
        "color": 0
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
        "locked": true,
        "color": 0
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
        "locked": true,
        "color": 1
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
        "rotation": 90,
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
        "rotation": 270,
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
        "locked": true,
        "color": 1
      },
      {
        "id": "t-5-0",
        "row": 5,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true,
        "color": 1
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
    ],
    "rules": {
      "colors": 2
    }
  },
  {
    "id": 74,
    "code": "74",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 180,
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
        "type": "t_shape",
        "rotation": 180,
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
        "rotation": 180,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 30,
    "parSteps": 20,
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
        "rotation": 90,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 180,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 30,
    "parSteps": 20,
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
        "rotation": 0,
        "basePorts": 6,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 33,
    "parSteps": 22,
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
        "rotation": 180,
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
        "rotation": 180,
        "basePorts": 6,
        "locked": false
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
        "rotation": 90,
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
        "rotation": 90,
        "basePorts": 10,
        "locked": false
      },
      {
        "id": "t-5-4",
        "row": 5,
        "col": 4,
        "type": "switch",
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 32,
    "parSteps": 21,
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
        "rotation": 90,
        "basePorts": 6,
        "locked": false
      },
      {
        "id": "t-1-5",
        "row": 1,
        "col": 5,
        "type": "corner",
        "rotation": 270,
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
        "rotation": 90,
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
        "rotation": 90,
        "basePorts": 6
      }
    ]
  },
  {
    "id": 80,
    "code": "80",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "tier": "hell",
    "maxSteps": 24,
    "parSteps": 24,
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
        "rotation": 180,
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
        "rotation": 180,
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
    "id": 81,
    "code": "81",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 30,
    "parSteps": 20,
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
        "rotation": 270,
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
    "id": 84,
    "code": "84",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
    "parSteps": 19,
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
        "rotation": 270,
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
    "id": 85,
    "code": "85",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 32,
    "parSteps": 21,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 32,
    "parSteps": 21,
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
        "id": "0,1",
        "row": 0,
        "col": 1,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "0,2",
        "row": 0,
        "col": 2,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "0,3",
        "row": 0,
        "col": 3,
        "type": "switch",
        "rotation": 270,
        "basePorts": 10,
        "switchClosed": false
      },
      {
        "id": "0,4",
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "1,1",
        "row": 1,
        "col": 1,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "switchClosed": false
      },
      {
        "id": "1,2",
        "row": 1,
        "col": 2,
        "type": "corner",
        "rotation": 0,
        "basePorts": 6
      },
      {
        "id": "1,3",
        "row": 1,
        "col": 3,
        "type": "line",
        "rotation": 0,
        "basePorts": 10
      },
      {
        "id": "1,4",
        "row": 1,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
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
        "id": "2,0",
        "row": 2,
        "col": 0,
        "type": "battery",
        "rotation": 0,
        "basePorts": 2,
        "locked": true
      },
      {
        "id": "2,1",
        "row": 2,
        "col": 1,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "2,2",
        "row": 2,
        "col": 2,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14,
        "locked": false
      },
      {
        "id": "2,3",
        "row": 2,
        "col": 3,
        "type": "t_shape",
        "rotation": 90,
        "basePorts": 14
      },
      {
        "id": "2,4",
        "row": 2,
        "col": 4,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
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
        "id": "3,1",
        "row": 3,
        "col": 1,
        "type": "diode",
        "rotation": 0,
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
        "id": "3,3",
        "row": 3,
        "col": 3,
        "type": "switch",
        "rotation": 0,
        "basePorts": 10,
        "switchClosed": false
      },
      {
        "id": "3,4",
        "row": 3,
        "col": 4,
        "type": "switch",
        "rotation": 90,
        "basePorts": 10,
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
        "id": "4,0",
        "row": 4,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "4,1",
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      },
      {
        "id": "4,3",
        "row": 4,
        "col": 3,
        "type": "bulb",
        "rotation": 0,
        "basePorts": 15,
        "locked": true
      },
      {
        "id": "4,4",
        "row": 4,
        "col": 4,
        "type": "line",
        "rotation": 0,
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
        "id": "5,0",
        "row": 5,
        "col": 0,
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
      },
      {
        "id": "5,1",
        "row": 5,
        "col": 1,
        "type": "cross",
        "rotation": 0,
        "basePorts": 15
      },
      {
        "id": "5,2",
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
        "id": "5,4",
        "row": 5,
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
        "type": "empty",
        "rotation": 0,
        "basePorts": 0
      }
    ],
    "rules": {
      "noCycle": true
    }
  },
  {
    "id": 87,
    "code": "87",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 33,
    "parSteps": 22,
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
    "id": 88,
    "code": "88",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
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
        "rotation": 270,
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
    "id": 89,
    "code": "89",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 29,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "goal": 4,
    "maxSteps": 19,
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
        "locked": false
      },
      {
        "id": "t-5-2",
        "row": 5,
        "col": 2,
        "type": "diode",
        "rotation": 90,
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
    "id": 91,
    "code": "91",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 27,
    "parSteps": 18,
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
        "rotation": 0,
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
        "rotation": 90,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 32,
    "parSteps": 21,
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
        "rotation": 90,
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
        "type": "corner",
        "rotation": 180,
        "basePorts": 6
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
    "id": 93,
    "code": "93",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 33,
    "parSteps": 22,
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
        "rotation": 90,
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
        "rotation": 90,
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
    "id": 94,
    "code": "94",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 33,
    "parSteps": 22,
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
        "rotation": 270,
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
        "rotation": 90,
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
    "id": 95,
    "code": "95",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 33,
    "parSteps": 22,
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
        "rotation": 270,
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
        "rotation": 0,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 35,
    "parSteps": 23,
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
        "rotation": 270,
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
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 35,
    "parSteps": 23,
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
    "id": 98,
    "code": "98",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "maxSteps": 36,
    "parSteps": 24,
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
        "rotation": 270,
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
    "id": 99,
    "code": "99",
    "totalLevels": 99,
    "gridRows": 6,
    "gridCols": 6,
    "tier": "hell",
    "maxSteps": 30,
    "parSteps": 30,
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

export const DEFAULT_LEVELS: LevelConfig[] = LEGACY_LEVELS.map((level) =>
  level.id <= 20
    ? CHAPTER1_LEVELS[level.id - 1]
    : level.id <= 40
      ? CHAPTER2_LEVELS[level.id - 21]
      : level.id <= 60
        ? CHAPTER3_LEVELS[level.id - 41]
      : level,
);
