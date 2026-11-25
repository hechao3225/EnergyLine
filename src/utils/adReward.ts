import type { LevelConfig, Tile } from "../types/game";
import { findHint, supportsHintEngine } from "./hint-engine";

/** 一次续命的基础步数：和加步电池同档，玩家不会觉得「看广告」是低人一等的那条路。 */
export const AD_STEP_REWARD = 3;
/** 盘面还差 4–5 步时补到刚好够用，躲开「看完广告还是死」这种最伤人的结局。 */
export const AD_STEP_REWARD_MAX = 5;
/** 每日续命广告上限：约 2 分钟/天，够救场，又不至于把体验压垮。 */
export const DAILY_AD_STEP_CAP = 6;
/** 同一局最多续命 2 次（加步电池与广告合计），第 3 次只给重来。 */
export const REVIVES_PER_RUN = 2;

export interface AdStepOffer {
  /** 0 表示这一局不值得放广告（救不回来或算不出通路），界面应引导重来 */
  reward: number;
  /** 从当前盘面到接通还差几步；null 表示提示引擎算不出 */
  stepsNeeded: number | null;
}

/**
 * 决定这一局的续命广告补几步。
 *
 * 奖励不写成死数字：盘面只差 2 步却给 5 步，等于白送；差 7 步只给 3 步，
 * 玩家看完照样失败，那次播放换来的不是留存而是一次卸载。
 * 所以按剩余缺口分档——差 3 步以内给 3 步，差 4 步以上给 5 步（上限）。
 *
 * 缺口超过 5 步时仍然放广告，但界面会明说「可能还不够」，把选择权交回玩家；
 * 只有连通路都算不出来（盘面已堵死）才不给广告，因为那一定是重开更划算。
 *
 * 提示引擎不支持的超大联动盘面按 3 步兜底，宁少不多。
 */
export function decideAdStepOffer(level: LevelConfig, tiles: Tile[]): AdStepOffer {
  if (!supportsHintEngine(level)) {
    return { reward: AD_STEP_REWARD, stepsNeeded: null };
  }
  const hint = findHint(level, tiles, Number.MAX_SAFE_INTEGER);
  if (!hint) return { reward: 0, stepsNeeded: null };
  return {
    reward: hint.stepsNeeded <= AD_STEP_REWARD ? AD_STEP_REWARD : AD_STEP_REWARD_MAX,
    stepsNeeded: hint.stepsNeeded,
  };
}
