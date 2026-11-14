import React from "react";
import type { CollectionEntry } from "../types/content";
import { MAX_STARS } from "../utils/rating";
const BASE_URL =
  (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";
export const ART_ROOT = `${BASE_URL}assets/park/`;
export type IconName =
  | "star"
  | "coin"
  | "gem"
  | "gift"
  | "settings"
  | "mail"
  | "task"
  | "bag"
  | "shop"
  | "castle"
  | "map"
  | "hint"
  | "undo"
  | "reset"
  | "play"
  | "crown"
  | "lock"
  | "paw"
  | "back"
  | "check";
export function Art({
  name,
  className = "",
  alt = "",
  style,
}: {
  name: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={`${ART_ROOT}${name}.webp`}
      className={`park-art ${className}`}
      alt={alt}
      style={style}
      draggable={false}
    />
  );
}
export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return <Art name={`icon-${name}`} className={`park-icon ${className}`} />;
}
export function ParkButton({
  children,
  onClick,
  disabled,
  purple = false,
  className = "",
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  purple?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <button
      className={`park-button ${purple ? "is-purple" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  );
}
export function Stars({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={`park-stars ${className}`} aria-label={`${value}星`}>
      {Array.from({ length: MAX_STARS }, (_, index) => index + 1).map((i) => (
        <Icon key={i} name="star" className={i > value ? "unearned" : ""} />
      ))}
    </span>
  );
}

/**
 * 12 类展品图标还没生成前，统一回退到现有的旋转木马图；
 * 生成 public/assets/park/exhibit-*.webp 后把 EXHIBIT_ART_READY 改成 true 即可。
 */
export const EXHIBIT_ART_READY = true;

export function getExhibitArt(entry: CollectionEntry): string {
  return EXHIBIT_ART_READY ? entry.artKey : "carousel";
}

export function ParkExhibit({
  entry,
  unlocked,
  large = false,
}: {
  entry: CollectionEntry;
  unlocked: boolean;
  large?: boolean;
}) {
  return (
    <Art
      name={getExhibitArt(entry)}
      className={`park-collection-flower ${large ? "large" : ""} ${unlocked ? "" : "sleeping"}`}
      alt={unlocked ? entry.name : "尚未修复的藏品"}
    />
  );
}
