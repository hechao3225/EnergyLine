export type HonorTitleId =
  | "first_light"
  | "park_trainee"
  | "starlight_engineer"
  | "park_guardian"
  | "lamplighter"
  | "garden_watcher"
  | "cloud_guide"
  | "rainbow_tuner"
  | "park_reviver"
  | "precision_calibrator"
  | "steady_calibrator"
  | "perfect_circuit_master";

export type HonorTitleCategory = "growth" | "chapter" | "mastery";

export interface HonorTitle {
  id: HonorTitleId;
  name: string;
  description: string;
  category: HonorTitleCategory;
  achievementId: string;
  order: number;
}
