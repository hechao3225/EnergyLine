/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 关卡布局指纹：只包含会影响玩法/可解性的字段，主题迁移前后必须一致。
 */

import crypto from 'node:crypto';
import type { LevelConfig } from '../src/types/game';

export function layoutHash(level: LevelConfig): string {
  const payload: Record<string, unknown> = {
    id: level.id,
    gridRows: level.gridRows,
    gridCols: level.gridCols,
    maxSteps: level.maxSteps,
    parSteps: level.parSteps ?? null,
    goal: level.goal ?? null,
    tiles: level.tiles.map((tile) => ({
      row: tile.row,
      col: tile.col,
      type: tile.type,
      rotation: tile.rotation,
      basePorts: tile.basePorts,
      locked: Boolean(tile.locked),
      switchClosed: tile.switchClosed ?? null,
      ...(tile.axis ? { axis: tile.axis } : {}),
      ...(tile.color !== undefined ? { color: tile.color } : {}),
    })),
  };
  // 规则/联动轴/颜色也算玩法字段：加进来，防止以后悄悄改规则不更新指纹。
  if (level.rules) payload.rules = level.rules;
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}
