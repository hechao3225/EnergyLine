/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 关卡布局指纹：只包含会影响玩法/可解性的字段，主题迁移前后必须一致。
 */

import crypto from 'node:crypto';
import type { LevelConfig } from '../src/types/game';

export function layoutHash(level: LevelConfig): string {
  const payload = {
    id: level.id,
    gridRows: level.gridRows,
    gridCols: level.gridCols,
    maxSteps: level.maxSteps,
    parSteps: level.parSteps ?? null,
    tiles: level.tiles.map((tile) => ({
      row: tile.row,
      col: tile.col,
      type: tile.type,
      rotation: tile.rotation,
      basePorts: tile.basePorts,
      locked: Boolean(tile.locked),
      switchClosed: tile.switchClosed ?? null,
    })),
  };
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}
