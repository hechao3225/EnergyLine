/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COLLECTION } from './collection';
import { BANNED_TERMS, LEGACY_TO_NEW } from './glossary';
import { LEVEL_CONTENT } from './levels';
import { WORLD } from './world';
import {
  CENTER_DISTRICTS,
  ZONES,
  getDistrictForLevel,
  getZone,
  getZoneForLevel,
  getZoneProgress,
} from './zones';
import type { CollectionEntry, LevelContent, ZoneId } from '../types/content';

const LEVEL_BY_ID = new Map<number, LevelContent>(
  LEVEL_CONTENT.map((level) => [level.levelId, level]),
);
const COLLECTION_BY_ID = new Map<number, CollectionEntry>(
  COLLECTION.map((entry) => [entry.levelId, entry]),
);

export function getLevelContent(levelId: number): LevelContent | null {
  return LEVEL_BY_ID.get(levelId) ?? null;
}

export function getCollectionEntry(levelId: number): CollectionEntry | null {
  return COLLECTION_BY_ID.get(levelId) ?? null;
}

export {
  BANNED_TERMS,
  CENTER_DISTRICTS,
  COLLECTION,
  LEGACY_TO_NEW,
  LEVEL_CONTENT,
  WORLD,
  ZONES,
  getDistrictForLevel,
  getZone,
  getZoneForLevel,
  getZoneProgress,
};
export type { CollectionEntry, LevelContent, ZoneId };
