import React from 'react';
import { Plus } from 'lucide-react';
import { energyPark } from '../../assets/energyPark';

interface EnergyParkHudProps {
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
}

const HudItem: React.FC<{ icon: string; value: string; label?: string }> = ({ icon, value, label }) => (
  <div className="energy-hud-item">
    <img src={icon} alt="" />
    <span>{label ? `${value} ${label}` : value}</span>
    <span className="energy-hud-plus" aria-hidden="true"><Plus size={16} /></span>
  </div>
);

export const EnergyParkHud: React.FC<EnergyParkHudProps> = ({ onOpenProfile, onOpenSettings }) => (
  <div className="energy-hud">
    <button type="button" className="energy-avatar" onClick={onOpenProfile} aria-label="打开个人档案">
      <img src={energyPark.characters.xingya} alt="星芽" />
      <span>Lv.12</span>
    </button>
    <div className="energy-hud-counters">
      <HudItem icon={energyPark.icons.heart} value="5/5" />
      <HudItem icon={energyPark.icons.coin} value="3200" />
      <HudItem icon={energyPark.icons.crystal} value="86" />
    </div>
    <button type="button" className="energy-hud-settings" onClick={onOpenSettings} aria-label="打开设置">
      <img src={energyPark.navigation.settings} alt="" />
    </button>
  </div>
);
