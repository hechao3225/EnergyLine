/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Zap,
  Undo2,
  Flame,
  Sparkles,
  Cpu,
  Award,
  Trophy,
  Shield,
  RotateCcw,
  Star,
  StarHalf,
  Compass,
  Crown,
  Medal,
  HelpCircle,
} from 'lucide-react';
import { AchievementRarity } from '../types/achievement';

interface AchievementIconProps {
  iconName: string;
  rarity: AchievementRarity;
  isUnlocked: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RARITY_STYLES: Record<AchievementRarity, {
  border: string;
  bgUnlocked: string;
  text: string;
  glow: string;
  badge: string;
  label: string;
}> = {
  common: {
    border: 'border-slate-300',
    bgUnlocked: 'bg-gradient-to-br from-slate-100 to-slate-200',
    text: 'text-slate-700',
    glow: 'shadow-slate-300/50',
    badge: 'bg-slate-200 text-slate-700 border-slate-300',
    label: '普通',
  },
  rare: {
    border: 'border-blue-300',
    bgUnlocked: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    text: 'text-blue-600',
    glow: 'shadow-blue-300/50',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    label: '稀有',
  },
  epic: {
    border: 'border-purple-300',
    bgUnlocked: 'bg-gradient-to-br from-purple-50 to-pink-100',
    text: 'text-purple-600',
    glow: 'shadow-purple-300/50',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    label: '史诗',
  },
  legendary: {
    border: 'border-amber-400',
    bgUnlocked: 'bg-gradient-to-br from-amber-100 via-amber-200 to-yellow-300',
    text: 'text-amber-800',
    glow: 'shadow-amber-400/60 ring-2 ring-amber-300/60',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    label: '传说',
  },
};

export const AchievementIcon: React.FC<AchievementIconProps> = ({
  iconName,
  rarity,
  isUnlocked,
  className = '',
  size = 'md',
}) => {
  const style = RARITY_STYLES[rarity];

  const getIconElement = () => {
    const iconProps = {
      className: `transition-transform duration-300 ${
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-5 h-5'
      } ${isUnlocked ? style.text : 'text-slate-400'}`,
    };

    switch (iconName) {
      case 'Zap': return <Zap {...iconProps} />;
      case 'Undo2': return <Undo2 {...iconProps} />;
      case 'Flame': return <Flame {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Award': return <Award {...iconProps} />;
      case 'Trophy': return <Trophy {...iconProps} />;
      case 'Shield': return <Shield {...iconProps} />;
      case 'RotateCcw': return <RotateCcw {...iconProps} />;
      case 'Star': return <Star {...iconProps} />;
      case 'StarHalf': return <StarHalf {...iconProps} />;
      case 'Compass': return <Compass {...iconProps} />;
      case 'Crown': return <Crown {...iconProps} />;
      case 'Medal': return <Medal {...iconProps} />;
      default: return <HelpCircle {...iconProps} />;
    }
  };

  const containerSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl',
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 border transition-all ${
        containerSizes[size]
      } ${
        isUnlocked
          ? `${style.border} ${style.bgUnlocked} shadow-md ${style.glow}`
          : 'border-slate-200/90 bg-slate-100/80 grayscale opacity-55'
      } ${className}`}
    >
      {getIconElement()}
    </div>
  );
};

export { RARITY_STYLES };
