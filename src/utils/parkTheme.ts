import type { EquippedTheme } from "../types/shop";

export function applyParkTheme(theme: EquippedTheme) {
  if (theme === "calm") document.documentElement.dataset.theme = "calm";
  else delete document.documentElement.dataset.theme;
}
