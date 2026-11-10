import React from "react";
import type { FlowerEntry } from "../types/flower";
export const ART_ROOT = `${import.meta.env.BASE_URL}assets/park/`;
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
      {[1, 2, 3].map((i) => (
        <Icon key={i} name="star" className={i > value ? "unearned" : ""} />
      ))}
    </span>
  );
}
export function ParkFlower({
  flower,
  unlocked,
  large = false,
}: {
  flower: FlowerEntry;
  unlocked: boolean;
  large?: boolean;
}) {
  const family = {
    lotus: 0,
    orchid: 1,
    plum: 2,
    rose: 4,
    peony: 4,
    camellia: 11,
    jasmine: 3,
    chrysanthemum: 8,
    crystal: 6,
    celestial: 7,
  }[flower.shape];
  return (
    <Art
      name={`flower-${family}`}
      className={`park-collection-flower ${large ? "large" : ""} ${unlocked ? "" : "sleeping"}`}
      alt={unlocked ? flower.name : "尚未唤醒的花"}
    />
  );
}
