export type SupplyId = "hint" | "lens" | "rewind" | "step";
export type CosmeticId =
  | "joy-greeting"
  | "starlight-outfit"
  | "exhibit-display"
  | "calm-theme";
export type ShopTab = "supply" | "cosmetic";
export type SupplyStockKey = "hints" | "lenses" | "rewindTokens" | "stepTokens";
export type EquippedMood = "default" | "joy";
export type EquippedOutfit = "default" | "starlight";
export type EquippedTheme = "default" | "calm";

export interface SupplyShopItem {
  id: SupplyId;
  name: string;
  description: string;
  price: number;
  stockKey: SupplyStockKey;
  iconArt: string;
}

export interface CosmeticShopItem {
  id: CosmeticId;
  name: string;
  description: string;
  price: number;
  unlockAt: number;
  previewArt: string;
  effect: "mood" | "outfit" | "exhibit" | "theme";
}
