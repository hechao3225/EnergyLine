/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import type { LevelConfig } from "../types/game";
import { Art, Icon } from "./ParkArt";
import { CENTER_DISTRICTS } from "../content";
import { getParSteps, getStarsForLights, getStarsForSteps } from "../utils/rating";

export interface ChapterMapViewProps {
  levels: LevelConfig[];
  currentLevelId: number;
  clearedLevels: number[];
  bestSteps: Record<number, number>;
  bestLights: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  initialChapter?: number;
}

const CHAPTERS = [
  "失落乐园",
  "星光花园",
  "云端奇境",
  "虹彩天桥",
  "梦幻之巅",
];

const candlesOf = (lv: LevelConfig) =>
  lv.tiles.filter((t) => t.type === "bulb").length;

const starsOf = (lv: LevelConfig, bestStep?: number, bestLight?: number) => {
  if (bestStep == null && bestLight == null) return 0;
  return lv.goal !== undefined
    ? getStarsForLights(lv.goal, candlesOf(lv), bestLight ?? 0)
    : getStarsForSteps(bestStep ?? 0, lv);
};

export function ChapterMapView({
  levels,
  currentLevelId,
  clearedLevels,
  bestSteps,
  bestLights,
  onSelectLevel,
  onBack,
  initialChapter = 0,
}: ChapterMapViewProps) {
  // Determine chapter based on current active level (0 to 4)
  const [chapter, setChapter] = useState(() => {
    const ch = Math.floor((currentLevelId - 1) / 20);
    return Math.max(0, Math.min(4, isNaN(ch) ? initialChapter : ch));
  });

  const [unlockAll, setUnlockAll] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentNodeRef = useRef<HTMLButtonElement>(null);

  const showToast = (msg: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = window.setTimeout(() => setToast(null), 2500);
  };

  const district = CENTER_DISTRICTS[chapter] ?? CENTER_DISTRICTS[0];
  const chapterLevels = levels.filter(
    (lvl) => lvl.id >= district.range[0] && lvl.id <= district.range[1],
  );

  const districtClearedCount = chapterLevels.filter((lvl) =>
    clearedLevels.includes(lvl.id),
  ).length;

  // Chapter lock condition (must clear end of previous chapter)
  const isChapterLocked = (chIdx: number) => {
    if (unlockAll || chIdx === 0) return false;
    const prevBossLevel = chIdx * 20;
    return !clearedLevels.includes(prevBossLevel);
  };

  // Find the highest unlocked uncompleted level in this chapter
  const highestActiveLevelId = (() => {
    for (const lvl of chapterLevels) {
      if (!clearedLevels.includes(lvl.id)) return lvl.id;
    }
    return chapterLevels[chapterLevels.length - 1]?.id ?? 1;
  })();

  const isLevelUnlocked = (lvlId: number) => {
    if (unlockAll) return true;
    if (clearedLevels.includes(lvlId)) return true;
    if (lvlId === 1) return true;
    return clearedLevels.includes(lvlId - 1);
  };

  // Auto-scroll to center on current/active level
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentNodeRef.current && scrollContainerRef.current) {
        currentNodeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [chapter]);

  // S-curve coordinates calculation:
  // Nodes oscillate left (24%), center (50%), right (76%) along a smooth sine wave
  const getNodePosition = (index: number) => {
    const angle = (index / 5.5) * 2 * Math.PI;
    const xPct = 50 + 26 * Math.sin(angle);
    // Vertical spacing: 140px per node, starting with 60px padding
    const yPx = 60 + index * 140;
    return { xPct, yPx };
  };

  return (
    <div className="chapter-map-view" aria-label="关卡路线章节地图">
      {/* Top Header */}
      <header className="chapter-map-header">
        <button
          className="chapter-map-back-btn"
          onClick={onBack}
          aria-label="返回乐园"
          title="返回乐园"
        >
          <Art name="map-btn-back" alt="返回" />
        </button>

        <div className="chapter-map-banner-wrap">
          <div className="chapter-map-banner-art">
            <Art name="map-chapter-banner" alt="章节招牌" />
            <div className="chapter-map-banner-title">
              第{chapter + 1}章 · {CHAPTERS[chapter]}
            </div>
          </div>

          {/* Chapter Selector Tabs / Arrows */}
          <div className="chapter-map-nav-arrows">
            <button
              className="chapter-arrow-btn prev"
              disabled={chapter === 0}
              onClick={() => setChapter((c) => Math.max(0, c - 1))}
              aria-label="上一章"
            >
              ◀
            </button>
            <span className="chapter-progress-pill">
              关卡 {district.range[0]}~{district.range[1]} · 已修 {districtClearedCount}/{chapterLevels.length}
            </span>
            <button
              className="chapter-arrow-btn next"
              disabled={chapter === CENTER_DISTRICTS.length - 1}
              onClick={() => {
                if (!unlockAll && isChapterLocked(chapter + 1)) {
                  showToast(`请先通关第 ${chapter + 1} 章的关底设施`);
                  return;
                }
                setChapter((c) => Math.min(CENTER_DISTRICTS.length - 1, c + 1));
              }}
              aria-label="下一章"
            >
              ▶
            </button>
          </div>
        </div>

        <button
          className={`chapter-unlock-toggle ${unlockAll ? "active" : ""}`}
          onClick={() => setUnlockAll((u) => !u)}
          title="临时全解锁切换"
          aria-label="切换全部解锁"
        >
          {unlockAll ? "全开" : "锁定"}
        </button>
      </header>

      {/* Main Scrollable Canvas */}
      <div className="chapter-map-scroll-area" ref={scrollContainerRef}>
        <div
          className="chapter-map-canvas"
          style={{ height: `${80 + chapterLevels.length * 140 + 140}px` }}
        >
          {/* Island Treasure Chest Decor */}
          <div
            className="chapter-map-chest-island"
            onClick={() =>
              showToast(
                `第 ${chapter + 1} 章宝箱：通关全章 ${chapterLevels.length} 关可开启章节大奖！`,
              )
            }
            title="章节宝藏"
          >
            <Art name="map-chest" alt="章节宝箱" />
          </div>

          {/* Road Connectors between nodes */}
          {chapterLevels.slice(0, -1).map((lvl, i) => {
            const p1 = getNodePosition(i);
            const p2 = getNodePosition(i + 1);
            const dx = (p2.xPct - p1.xPct) * 3.6;
            const dy = p2.yPx - p1.yPx;
            const dist = Math.hypot(dx, dy);
            const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

            return (
              <div
                key={`road-${lvl.id}`}
                className="chapter-map-road-segment"
                style={{
                  left: `${p1.xPct}%`,
                  top: `${p1.yPx + 36}px`,
                  width: `${dist}px`,
                  transform: `rotate(${angleDeg}deg)`,
                  transformOrigin: "0 50%",
                }}
              >
                <Art name="map-road-segment" alt="" />
              </div>
            );
          })}

          {/* Level Nodes along the path (Clean 1:1 with 4.png, NO text labels underneath) */}
          {chapterLevels.map((lvl, index) => {
            const pos = getNodePosition(index);
            const isCleared = clearedLevels.includes(lvl.id);
            const isCurrent =
              lvl.id === highestActiveLevelId || lvl.id === currentLevelId;
            const isUnlocked = isLevelUnlocked(lvl.id);
            const isLocked = !isUnlocked;
            const stars = starsOf(lvl, bestSteps[lvl.id], bestLights[lvl.id]);
            const par = getParSteps(lvl);

            let nodeArtName = "map-node-unlocked";
            if (isCleared) nodeArtName = "map-node-cleared";
            else if (isCurrent && !isLocked) nodeArtName = "map-node-current";
            else if (isLocked) nodeArtName = "map-node-locked";

            return (
              <div
                key={lvl.id}
                className={`chapter-level-node-wrap ${isCurrent ? "is-current" : ""} ${isCleared ? "is-cleared" : ""} ${isLocked ? "is-locked" : ""}`}
                style={{
                  left: `${pos.xPct}%`,
                  top: `${pos.yPx}px`,
                }}
              >
                <button
                  ref={isCurrent ? currentNodeRef : undefined}
                  className={`chapter-level-node-btn ${nodeArtName}`}
                  onClick={() => {
                    if (isLocked) {
                      showToast(`请先通关第 ${lvl.id - 1} 关解锁此设施`);
                      return;
                    }
                    onSelectLevel(lvl.id);
                  }}
                  title={
                    isLocked
                      ? `第 ${lvl.id} 关 尚未解锁`
                      : `第 ${lvl.id} 关 · 最少 ${par} 步四星`
                  }
                  aria-label={`第 ${lvl.id} 关 ${isCleared ? "已通关" : isLocked ? "未解锁" : "进行中"}`}
                >
                  <Art name={nodeArtName} className="chapter-node-disc-art" />

                  {/* Level Number */}
                  {!isLocked && (
                    <span
                      className={`chapter-node-number ${isCurrent ? "number-white" : isCleared ? "number-brown" : "number-purple"}`}
                    >
                      {lvl.id}
                    </span>
                  )}

                  {/* Star indicators underneath cleared nodes */}
                  {isCleared && (
                    <div className="chapter-node-stars">
                      {Array.from({ length: 3 }).map((_, sIdx) => (
                        <Icon
                          key={sIdx}
                          name="star"
                          className={sIdx < stars ? "earned" : "unearned"}
                        />
                      ))}
                    </div>
                  )}

                  {/* Current Active Halo Badge */}
                  {isCurrent && !isCleared && !isLocked && (
                    <div className="chapter-current-badge">
                      <span>挑战</span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Notice / Toast */}
      {toast && (
        <div className="chapter-map-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
