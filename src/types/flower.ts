/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FlowerRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type FlowerShape =
  | 'lotus'
  | 'orchid'
  | 'plum'
  | 'rose'
  | 'peony'
  | 'camellia'
  | 'jasmine'
  | 'chrysanthemum'
  | 'crystal'
  | 'celestial';

export interface FlowerEntry {
  id: number;              // Corresponds to Level ID (1..99)
  name: string;            // Poetic flower name
  alias: string;           // Short title
  chapter: 1 | 2 | 3 | 4 | 5;
  chapterName: string;     // e.g. "地脉之根", "巨木之干", "苍翠繁枝", "云海天桥", "神树之巅"
  rarity: FlowerRarity;
  petalColor: string;      // Main petal hex
  glowColor: string;       // Outer glow aura
  coreColor: string;       // Flower center
  shape: FlowerShape;
  lore: string;            // Poetic story & healing lore
  blessing: string;        // Spiritual blessing / attribute
}
