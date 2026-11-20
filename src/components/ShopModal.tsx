import { useState, type KeyboardEvent } from "react";
import { COLLECTION } from "../content";
import { COSMETIC_ITEMS, SUPPLY_ITEMS } from "../data/shopCatalog";
import type { CosmeticId, ShopTab, SupplyId } from "../types/shop";
import {
  isCosmeticEquipped,
  type ParkProgress,
} from "../utils/parkProgress";
import { Art, Icon, ParkButton, getExhibitArt } from "./ParkArt";

const TAB_IDS: Record<ShopTab, string> = {
  supply: "park-shop-tab-supply",
  cosmetic: "park-shop-tab-cosmetic",
};

interface ShopModalProps {
  progress: ParkProgress;
  clearedCount: number;
  clearedLevels: number[];
  onBuySupply: (id: SupplyId) => void;
  onBuyCosmetic: (id: CosmeticId) => void;
  onEquipCosmetic: (id: CosmeticId, active: boolean) => void;
  onSelectExhibit: (id: number | null) => void;
}

export function ShopModal({
  progress,
  clearedCount,
  clearedLevels,
  onBuySupply,
  onBuyCosmetic,
  onEquipCosmetic,
  onSelectExhibit,
}: ShopModalProps) {
  const [tab, setTab] = useState<ShopTab>("supply");
  const [pickerOpen, setPickerOpen] = useState(false);
  const repairedCollection = COLLECTION.filter((entry) =>
    clearedLevels.includes(entry.levelId),
  );
  const selectTab = (next: ShopTab) => {
    setTab(next);
    setPickerOpen(false);
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: ShopTab | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      next = tab === "supply" ? "cosmetic" : "supply";
    } else if (event.key === "Home") {
      next = "supply";
    } else if (event.key === "End") {
      next = "cosmetic";
    }
    if (!next) return;

    event.preventDefault();
    selectTab(next);
    document.getElementById(TAB_IDS[next])?.focus();
  };

  return (
    <section className="park-shop" aria-label="乐园商店货架">
      <div className="park-shop-balance" aria-label={`钻石余额 ${progress.coins}`}>
        <Icon name="gem" />
        <span>{progress.coins.toLocaleString()}</span>
      </div>

      <div
        className="park-shop-tabs"
        role="tablist"
        aria-label="商店分类"
        onKeyDown={handleTabKeyDown}
      >
        <button
          id={TAB_IDS.supply}
          type="button"
          role="tab"
          aria-selected={tab === "supply"}
          tabIndex={tab === "supply" ? 0 : -1}
          aria-controls="park-shop-panel-supply"
          onClick={() => selectTab("supply")}
        >
          补给
        </button>
        <button
          id={TAB_IDS.cosmetic}
          type="button"
          role="tab"
          aria-selected={tab === "cosmetic"}
          tabIndex={tab === "cosmetic" ? 0 : -1}
          aria-controls="park-shop-panel-cosmetic"
          onClick={() => selectTab("cosmetic")}
        >
          装扮
        </button>
      </div>

      <div
        id="park-shop-panel-supply"
        className="park-shop-list"
        role="tabpanel"
        aria-labelledby={TAB_IDS.supply}
        tabIndex={0}
        hidden={tab !== "supply"}
      >
        {SUPPLY_ITEMS.map((item) => {
          const affordable = progress.coins >= item.price;
          return (
            <article className="park-shop-card" key={item.id}>
              <Art
                name={item.iconArt}
                className="park-shop-card-art"
                alt={item.name}
              />
              <div className="park-shop-card-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>库存 {progress[item.stockKey]}</span>
              </div>
              <div className="park-shop-card-action">
                <span className="park-shop-price">
                  <Icon name="gem" />
                  {item.price}
                </span>
                <ParkButton
                  className="park-shop-buy"
                  disabled={!affordable}
                  label={`购买${item.name}`}
                  onClick={() => onBuySupply(item.id)}
                >
                  {affordable ? "购买" : "钻石不足"}
                </ParkButton>
              </div>
            </article>
          );
        })}
      </div>

      <div
        id="park-shop-panel-cosmetic"
        className="park-shop-list"
        role="tabpanel"
        aria-labelledby={TAB_IDS.cosmetic}
        tabIndex={0}
        hidden={tab !== "cosmetic"}
      >
        {COSMETIC_ITEMS.map((item) => {
          const owned = progress.ownedCosmetics.includes(item.id);
          const unlocked = clearedCount >= item.unlockAt;
          const equipped = isCosmeticEquipped(progress, item.id);
          const affordable = progress.coins >= item.price;
          const isExhibit = item.effect === "exhibit";

          return (
            <article
              className={`park-shop-card ${unlocked ? "" : "is-locked"}`}
              key={item.id}
            >
              <Art
                name={item.previewArt}
                className="park-shop-card-art"
                alt={item.name}
              />
              <div className="park-shop-card-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>
                  {unlocked
                    ? `开放条件：修复 ${item.unlockAt} 处 · 已完成 ${clearedCount} 处`
                    : `修复 ${item.unlockAt} 处后开放`}
                </span>
              </div>
              <div className="park-shop-card-action">
                <span className="park-shop-price">
                  {owned ? (
                    "已拥有"
                  ) : (
                    <>
                      <Icon name="gem" />
                      {item.price}
                    </>
                  )}
                </span>
                {!unlocked ? (
                  <ParkButton
                    className="park-shop-buy"
                    disabled
                    label={`修复${item.unlockAt}处后开放`}
                  >
                    尚未开放
                  </ParkButton>
                ) : !owned ? (
                  <ParkButton
                    className="park-shop-buy"
                    disabled={!affordable}
                    label={`购买${item.name}`}
                    onClick={() => onBuyCosmetic(item.id)}
                  >
                    {affordable ? "购买" : "钻石不足"}
                  </ParkButton>
                ) : isExhibit ? (
                  <ParkButton
                    className="park-shop-buy"
                    label={
                      progress.equippedCosmetics.exhibitId === null
                        ? "选择展品"
                        : "更换展品"
                    }
                    onClick={() => setPickerOpen((open) => !open)}
                  >
                    {progress.equippedCosmetics.exhibitId === null
                      ? "选择展品"
                      : "更换展品"}
                  </ParkButton>
                ) : (
                  <ParkButton
                    className="park-shop-buy"
                    label={equipped ? "恢复默认" : "使用"}
                    onClick={() => onEquipCosmetic(item.id, !equipped)}
                  >
                    {equipped ? "恢复默认" : "使用"}
                  </ParkButton>
                )}
              </div>

              {isExhibit && owned && unlocked && pickerOpen && (
                <div className="park-exhibit-picker">
                  <div className="park-exhibit-picker-head">
                    <strong>选择已修复藏品</strong>
                    <button
                      type="button"
                      aria-label="关闭藏品选择器"
                      onClick={() => setPickerOpen(false)}
                    >
                      关闭
                    </button>
                  </div>
                  <div className="park-exhibit-picker-grid">
                    {repairedCollection.map((entry) => {
                      const selected =
                        progress.equippedCosmetics.exhibitId === entry.levelId;
                      return (
                        <button
                          type="button"
                          className={selected ? "is-selected" : ""}
                          aria-pressed={selected}
                          key={entry.levelId}
                          onClick={() => {
                            onSelectExhibit(entry.levelId);
                            setPickerOpen(false);
                          }}
                        >
                          <Art name={getExhibitArt(entry)} alt="" />
                          <span>{entry.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  {progress.equippedCosmetics.exhibitId !== null && (
                    <ParkButton
                      className="park-exhibit-clear"
                      label="收起当前展品"
                      onClick={() => {
                        onSelectExhibit(null);
                        setPickerOpen(false);
                      }}
                    >
                      收起当前展品
                    </ParkButton>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
