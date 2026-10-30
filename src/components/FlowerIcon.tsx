/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FlowerShape } from '../types/flower';

interface FlowerIconProps {
  isBlooming?: boolean;
  petalColor?: string;
  glowColor?: string;
  coreColor?: string;
  shape?: FlowerShape;
  size?: number | string;
  className?: string;
  showDew?: boolean;
}

export const FlowerIcon: React.FC<FlowerIconProps> = ({
  isBlooming = true,
  petalColor = '#f43f5e',
  glowColor = '#fb7185',
  coreColor = '#fef08a',
  shape = 'lotus',
  size = 40,
  className = '',
  showDew = true,
}) => {
  if (!isBlooming) {
    // Closed sleeping flower bud
    return (
      <svg
        viewBox="0 0 60 60"
        width={size}
        height={size}
        className={`overflow-visible select-none ${className}`}
      >
        {/* Branch / Stem */}
        <path
          d="M30 54 Q 30 44 30 36"
          stroke="#3d5a49"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tiny green leaves */}
        <path
          d="M30 46 Q 22 44 20 48"
          stroke="#4e725d"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M30 42 Q 38 40 40 44"
          stroke="#4e725d"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Sepal Calyx base */}
        <path
          d="M22 36 Q 30 40 38 36 Q 35 32 30 32 Q 25 32 22 36 Z"
          fill="#314f3e"
          stroke="#253e30"
          strokeWidth="1"
        />

        {/* Closed Outer Bud Sepals */}
        <ellipse
          cx="30"
          cy="26"
          rx="11"
          ry="15"
          fill="#3b5e4b"
          stroke="#2a4536"
          strokeWidth="1.5"
        />

        {/* Peeking petal color tip */}
        <path
          d="M26 22 Q 30 14 34 22 Q 30 26 26 22 Z"
          fill={petalColor}
          opacity="0.85"
        />

        {/* Dew drop */}
        {showDew && (
          <circle cx="34" cy="22" r="2" fill="#38bdf8" opacity="0.9" />
        )}
      </svg>
    );
  }

  // Radiant Blooming Flower with Custom Petal Shapes
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={`overflow-visible select-none ${className}`}
    >
      <defs>
        <radialGradient id={`glow-${petalColor.replace('#', '')}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.45" />
          <stop offset="60%" stopColor={petalColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={petalColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Halo Glow */}
      <circle
        cx="40"
        cy="40"
        r="36"
        fill={`url(#glow-${petalColor.replace('#', '')})`}
        className="animate-pulse"
      />

      {/* Stem Connection */}
      <path
        d="M40 70 L 40 50"
        stroke="#2d503d"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Lotus / Default Petals */}
      {shape === 'lotus' && (
        <g>
          {/* Back Petals */}
          <ellipse cx="40" cy="22" rx="9" ry="16" fill={petalColor} opacity="0.9" />
          <ellipse cx="24" cy="30" rx="9" ry="15" transform="rotate(-40 24 30)" fill={petalColor} opacity="0.85" />
          <ellipse cx="56" cy="30" rx="9" ry="15" transform="rotate(40 56 30)" fill={petalColor} opacity="0.85" />
          <ellipse cx="23" cy="48" rx="8" ry="14" transform="rotate(-80 23 48)" fill={petalColor} opacity="0.9" />
          <ellipse cx="57" cy="48" rx="8" ry="14" transform="rotate(80 57 48)" fill={petalColor} opacity="0.9" />

          {/* Front Inner Petals */}
          <ellipse cx="32" cy="38" rx="7" ry="13" transform="rotate(-20 32 38)" fill={glowColor} />
          <ellipse cx="48" cy="38" rx="7" ry="13" transform="rotate(20 48 38)" fill={glowColor} />
          <ellipse cx="40" cy="42" rx="7" ry="11" fill={petalColor} />
        </g>
      )}

      {/* Orchid Petals */}
      {shape === 'orchid' && (
        <g>
          <ellipse cx="40" cy="20" rx="6" ry="18" fill={petalColor} opacity="0.9" />
          <ellipse cx="20" cy="36" rx="7" ry="16" transform="rotate(-55 20 36)" fill={petalColor} />
          <ellipse cx="60" cy="36" rx="7" ry="16" transform="rotate(55 60 36)" fill={petalColor} />
          <path d="M40 38 Q 28 55 40 60 Q 52 55 40 38 Z" fill={glowColor} />
          <ellipse cx="34" cy="46" rx="4" ry="7" fill={petalColor} />
          <ellipse cx="46" cy="46" rx="4" ry="7" fill={petalColor} />
        </g>
      )}

      {/* Plum / 5-Petal Blossom */}
      {(shape === 'plum' || shape === 'camellia' || shape === 'jasmine') && (
        <g>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <circle
              key={i}
              cx={40 + Math.cos(((angle - 90) * Math.PI) / 180) * 16}
              cy={40 + Math.sin(((angle - 90) * Math.PI) / 180) * 16}
              r="13"
              fill={petalColor}
              stroke={glowColor}
              strokeWidth="1"
            />
          ))}
        </g>
      )}

      {/* Chrysanthemum / Peony / Multi-Petal */}
      {(shape === 'peony' || shape === 'chrysanthemum' || shape === 'rose') && (
        <g>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="40"
              cy="25"
              rx="6"
              ry="16"
              transform={`rotate(${angle} 40 40)`}
              fill={petalColor}
              opacity="0.85"
            />
          ))}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
            <ellipse
              key={`in-${i}`}
              cx="40"
              cy="29"
              rx="5"
              ry="11"
              transform={`rotate(${angle} 40 40)`}
              fill={glowColor}
            />
          ))}
        </g>
      )}

      {/* Celestial / Crystal Shape */}
      {(shape === 'crystal' || shape === 'celestial') && (
        <g>
          <polygon
            points="40,10 49,29 70,30 53,44 59,65 40,52 21,65 27,44 10,30 31,29"
            fill={petalColor}
            stroke={glowColor}
            strokeWidth="1.5"
          />
          <polygon
            points="40,20 46,33 60,33 49,42 53,55 40,47 27,55 31,42 20,33 34,33"
            fill={glowColor}
          />
        </g>
      )}

      {/* Center Pistil / Core with Dew & Pollen */}
      <circle cx="40" cy="40" r="8" fill={coreColor} stroke="#eab308" strokeWidth="1.5" />
      <circle cx="37" cy="37" r="2.5" fill="#ffffff" />
      <circle cx="43" cy="42" r="1.5" fill="#f59e0b" />
      <circle cx="38" cy="43" r="1.2" fill="#f59e0b" />
      <circle cx="42" cy="37" r="1.2" fill="#f59e0b" />

      {/* Sparkles around bloom */}
      <circle cx="22" cy="18" r="1.5" fill="#fef08a" className="animate-ping" />
      <circle cx="58" cy="20" r="1.8" fill="#ffffff" />
      <circle cx="62" cy="54" r="1.5" fill="#fef08a" />
      <circle cx="18" cy="52" r="1.5" fill="#38bdf8" />
    </svg>
  );
};
