import type {
  CosmeticId,
  CosmeticShopItem,
  SupplyId,
  SupplyShopItem,
} from "../types/shop";

export const SUPPLY_ITEMS: readonly SupplyShopItem[] = [
  {
    id: "hint",
    name: "提示灯泡",
    description: "查看当前局面下一步正确操作",
    price: 120,
    stockKey: "hints",
    iconArt: "icon-hint",
  },
  {
    id: "lens",
    name: "火花透镜",
    description: "连续查看接下来的 3 步正确操作",
    price: 260,
    stockKey: "lenses",
    iconArt: "icon-lens",
  },
  {
    id: "rewind",
    name: "时光回针",
    description: "当前这一局回溯次数 +1",
    price: 180,
    stockKey: "rewindTokens",
    iconArt: "icon-undo",
  },
  {
    id: "step",
    name: "加步电池",
    description: "步数用完时，立即补回 3 步",
    price: 300,
    stockKey: "stepTokens",
    iconArt: "icon-step",
  },
];

export const COSMETIC_ITEMS: readonly CosmeticShopItem[] = [
  {
    id: "joy-greeting",
    name: "开心问候",
    description: "三位伙伴在首页显示开心表情",
    price: 450,
    unlockAt: 5,
    previewArt: "mood-joy",
    effect: "mood",
  },
  {
    id: "starlight-outfit",
    name: "星愿礼服",
    description: "三位伙伴换上星光庆典装",
    price: 900,
    unlockAt: 20,
    previewArt: "outfit-sheep-starlight",
    effect: "outfit",
  },
  {
    id: "exhibit-display",
    name: "星空展台",
    description: "在乐园首页陈列一件已修复设施",
    price: 1200,
    unlockAt: 10,
    previewArt: "exhibit-carousel",
    effect: "exhibit",
  },
  {
    id: "calm-theme",
    name: "宁静夜灯",
    description: "深靛夜空与暖纸阅读界面主题",
    price: 1800,
    unlockAt: 40,
    previewArt: "theme-calm-preview",
    effect: "theme",
  },
];

const SUPPLY_IDS = new Set<string>(SUPPLY_ITEMS.map((item) => item.id));
const COSMETIC_IDS = new Set<string>(COSMETIC_ITEMS.map((item) => item.id));

export function getSupplyItem(id: string): SupplyShopItem | null {
  return SUPPLY_ITEMS.find((item) => item.id === id) ?? null;
}

export function getCosmeticItem(id: string): CosmeticShopItem | null {
  return COSMETIC_ITEMS.find((item) => item.id === id) ?? null;
}

export function isSupplyId(value: unknown): value is SupplyId {
  return typeof value === "string" && SUPPLY_IDS.has(value);
}

export function isCosmeticId(value: unknown): value is CosmeticId {
  return typeof value === "string" && COSMETIC_IDS.has(value);
}
