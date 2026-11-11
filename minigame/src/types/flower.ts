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
  id: number;
  name: string;
  alias: string;
  chapter: 1 | 2 | 3 | 4 | 5;
  chapterName: string;
  rarity: FlowerRarity;
  petalColor: string;
  glowColor: string;
  coreColor: string;
  shape: FlowerShape;
  lore: string;
  blessing: string;
}
