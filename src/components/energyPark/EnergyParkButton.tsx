import React from 'react';
import { energyPark } from '../../assets/energyPark';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'cream';
type ButtonSize = 'large' | 'medium' | 'small';

interface EnergyParkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

export const EnergyParkButton: React.FC<EnergyParkButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  className = '',
  children,
  ...props
}) => {
  const buttonSet = energyPark.buttons[variant] as Partial<Record<ButtonSize, string>>;
  const source = buttonSet[size] || buttonSet.medium || buttonSet.large || buttonSet.small;
  return (
    <button
      {...props}
      className={`energy-button energy-button-${size} ${className}`}
      style={{ ...props.style, backgroundImage: `url(${source})` }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};
