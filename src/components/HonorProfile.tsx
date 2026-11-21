import { useState } from "react";
import type { Achievement } from "../types/achievement";
import type { HonorTitle } from "../types/honor";
import { HONOR_TITLES, getHonorTitle } from "../data/honorTitles";
import { Art, Icon } from "./ParkArt";

interface HonorProfileProps {
  completed: number;
  totalStars: number;
  totalUndos: number;
  achievements: Achievement[];
  unlockedAchievements: Record<string, number>;
  equippedTitle: HonorTitle | null;
  onEquipTitle: (titleId: string) => void;
}

const COMPANIONS = [
  { id: "xingya", name: "星芽", role: "乐园修复师" },
  { id: "boling", name: "波铃", role: "能量精灵" },
  { id: "yunrong", name: "云绒", role: "星光使者 / 图鉴记录员" },
] as const;

export function HonorProfile(p: HonorProfileProps) {
  const [tab, setTab] = useState<"titles" | "achievements">("titles");
  const earnedCount = Object.keys(p.unlockedAchievements).length;

  return (
    <div className="park-honor-profile">
      <div className="park-profile-intro">
        <Art name="avatar-xingya@2x" alt="星芽" />
        <div>
          <h3>星芽 · 乐园修复师</h3>
          <strong className="park-equipped-title">
            {p.equippedTitle?.name ?? "尚未佩戴称号"}
          </strong>
          <p>已修复 {p.completed} 处设施</p>
          <p>收集星星 {p.totalStars} 颗</p>
          <p>
            成就 {earnedCount}/{p.achievements.length}
          </p>
        </div>
      </div>

      <div className="park-profile-companions" aria-label="乐园伙伴">
        {COMPANIONS.map((mate) => (
          <div className="park-profile-companion" key={mate.id}>
            <Art name={`avatar-${mate.id}@2x`} alt={mate.name} />
            <b>{mate.name}</b>
            <span>{mate.role}</span>
          </div>
        ))}
      </div>

      <div className="park-honor-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "titles"}
          className={tab === "titles" ? "selected" : ""}
          onClick={() => setTab("titles")}
        >
          称号墙
        </button>
        <button
          role="tab"
          aria-selected={tab === "achievements"}
          className={tab === "achievements" ? "selected" : ""}
          onClick={() => setTab("achievements")}
        >
          成就
        </button>
      </div>

      {tab === "titles" ? (
        <div className="park-title-wall">
          {HONOR_TITLES.map((title) => {
            const achievement = p.achievements.find(
              (item) => item.id === title.achievementId,
            );
            const unlocked = Boolean(achievement?.unlockedAt);
            const equipped = p.equippedTitle?.id === title.id;
            return (
              <button
                key={title.id}
                className={`park-title-card is-${title.category} ${
                  unlocked ? "is-earned" : "is-locked"
                } ${equipped ? "is-equipped" : ""}`}
                disabled={!unlocked}
                onClick={() => p.onEquipTitle(title.id)}
                aria-label={`${equipped ? "佩戴中" : unlocked ? "佩戴称号" : "未解锁"}：${title.name}`}
              >
                <Icon name={unlocked ? "crown" : "lock"} />
                <span>
                  <b>{title.name}</b>
                  <small>{title.description}</small>
                </span>
                <em>
                  {equipped
                    ? "佩戴中"
                    : unlocked
                      ? "佩戴"
                      : achievement?.progress?.label ?? "尚未解锁"}
                </em>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="park-achievement-groups">
          {(["progress", "skill", "efficiency", "endless"] as const).map(
            (category) => (
              <section key={category}>
                <h3>{categoryLabel(category)}</h3>
                {p.achievements
                  .filter((item) => item.category === category)
                  .map((achievement) => {
                    const earned = Boolean(achievement.unlockedAt);
                    const rewardTitle = achievement.rewardTitleId
                      ? getHonorTitle(achievement.rewardTitleId)
                      : null;
                    return (
                      <div
                        key={achievement.id}
                        className={`park-achievement-card ${
                          earned ? "earned" : ""
                        }`}
                      >
                        <Icon name={earned ? "star" : "lock"} />
                        <span>
                          <b>{achievement.title}</b>
                          <small>{achievement.description}</small>
                          {rewardTitle && (
                            <strong className="park-achievement-reward">
                              称号 · {rewardTitle.name}
                            </strong>
                          )}
                          <span className="park-achievement-progress">
                            <i
                              style={{
                                width: `${achievement.progress?.percent ?? 0}%`,
                              }}
                            />
                          </span>
                          <em>
                            {achievement.progress?.label ??
                              (earned ? "已达成" : "尚未达成")}
                          </em>
                        </span>
                      </div>
                    );
                  })}
              </section>
            ),
          )}
        </div>
      )}

      <p className="park-fine-print">累计撤销 {p.totalUndos} 次</p>
    </div>
  );
}

function categoryLabel(category: Achievement["category"]): string {
  return {
    progress: "乐园成长",
    skill: "修复技艺",
    efficiency: "效率挑战",
    endless: "无尽挑战",
  }[category];
}
