import React from 'react';
import { energyPark } from '../../assets/energyPark';

type PanelVariant = 'modal' | 'card' | 'smallCard' | 'status';

interface EnergyParkPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PanelVariant;
}

export const EnergyParkPanel: React.FC<EnergyParkPanelProps> = ({
  variant = 'card',
  className = '',
  children,
  ...props
}) => (
  <div
    {...props}
    className={`energy-panel energy-panel-${variant} ${className}`}
    style={{ ...props.style, backgroundImage: `url(${energyPark.panels[variant]})` }}
  >
    {children}
  </div>
);
