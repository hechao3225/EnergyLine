import { Art } from "./ParkArt";
import { ZONES, getZoneProgress } from "../content";

export function WorldMapModal({
  cleared,
  onEnterCenter,
}: {
  cleared: number[];
  onEnterCenter: () => void;
}) {
  return (
    <div className="park-world">
      <p className="park-lead">修复乐园中心，解锁更多主题区。</p>
      <div className="park-world-grid">
        {ZONES.map((zone) => {
          const progress = getZoneProgress(zone.id, cleared);
          const open = zone.status === "open";
          return (
            <button
              key={zone.id}
              className={`park-world-card ${open ? "is-open" : "is-locked"}`}
              onClick={() => {
                if (open) onEnterCenter();
              }}
              disabled={!open}
              aria-label={open ? `进入${zone.name}` : `${zone.name}，即将开放`}
              title={zone.teaser}
            >
              <Art name={zone.nodeArt} className="park-world-icon" />
              <strong>{zone.name}</strong>
              <span>{zone.energyName}</span>
              <small>
                {open
                  ? `${progress.cleared}/${progress.total} 处设施`
                  : `即将开放 · ${progress.total} 处设施`}
              </small>
            </button>
          );
        })}
      </div>
      <p className="park-fine-print">
        乐园中心的 99 处设施修复后，主题区会陆续开放。
      </p>
    </div>
  );
}
