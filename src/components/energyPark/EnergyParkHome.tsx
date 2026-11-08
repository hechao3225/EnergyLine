import React from 'react';
import { Play } from 'lucide-react';
import { LevelConfig } from '../../types/game';
import { energyPark } from '../../assets/energyPark';
import { EnergyParkButton } from './EnergyParkButton';
import { EnergyParkHud } from './EnergyParkHud';
import { EnergyParkPanel } from './EnergyParkPanel';

interface EnergyParkHomeProps {
  level: LevelConfig;
  clearedCount: number;
  onContinue: () => void;
  onOpenLevelSelect: () => void;
  onOpenFlora: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export const EnergyParkHome: React.FC<EnergyParkHomeProps> = ({
  level,
  clearedCount,
  onContinue,
  onOpenLevelSelect,
  onOpenFlora,
  onOpenProfile,
  onOpenSettings,
}) => {
  const progress = Math.min(100, Math.round((clearedCount / 99) * 100));
  const chapter = Math.min(5, Math.floor(Math.max(0, clearedCount - 1) / 20) + 1);
  const chapterStart = (chapter - 1) * 20 + 1;
  const chapterEnd = Math.min(99, chapter * 20);
  return (
    <section className="energy-screen energy-home-screen" style={{ backgroundImage: `url(${energyPark.scenes.home})` }}>
      <EnergyParkHud onOpenProfile={onOpenProfile} onOpenSettings={onOpenSettings} />

      <div className="energy-home-title">
        <img className="energy-home-logo" src={energyPark.generated.energyParkLogo} alt="能量管道乐园" />
        <div>第1章 · 失落乐园（1-99关）</div>
      </div>

      <div className="energy-home-characters" aria-hidden="true">
        <img className="energy-character-xingya" src={energyPark.characters.xingya} alt="" />
        <img className="energy-character-boling" src={energyPark.characters.boling} alt="" />
        <img className="energy-character-yunrong" src={energyPark.characters.yunrong} alt="" />
      </div>

      <EnergyParkPanel variant="card" className="energy-home-progress">
        <div className="energy-home-progress-heading">
          <span>乐园恢复进度</span>
          <strong>{clearedCount} / 99 关</strong>
        </div>
        <div className="energy-progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="乐园恢复进度">
          <span style={{ width: `${progress}%` }} />
        </div>
        <button type="button" className="energy-home-goal" onClick={onOpenLevelSelect}>
          <img src={energyPark.facilities.carouselActive} alt="旋转木马" />
          <span>当前目标：修复旋转木马<br /><small>（第 {chapterStart} - {chapterEnd} 关）</small></span>
          <span className="energy-goal-arrow">›</span>
        </button>
      </EnergyParkPanel>

      <EnergyParkButton size="large" className="energy-home-continue" icon={<Play size={26} fill="currentColor" />} onClick={onContinue}>
        继续挑战&nbsp; 第{level.id}关
      </EnergyParkButton>

      <nav className="energy-bottom-nav" aria-label="乐园导航">
        <button type="button" className="is-active" onClick={onContinue}><img src={energyPark.facilities.carouselActive} alt="" /><span>乐园</span></button>
        <button type="button" onClick={onOpenLevelSelect}><img src={energyPark.navigation.level} alt="" /><span>关卡</span></button>
        <button type="button" onClick={onOpenFlora}><img src={energyPark.navigation.flora} alt="" /><span>图鉴</span></button>
        <button type="button" onClick={onOpenProfile}><img src={energyPark.navigation.achievement} alt="" /><span>成就</span></button>
        <button type="button" onClick={onOpenSettings}><img src={energyPark.navigation.settings} alt="" /><span>设置</span></button>
      </nav>
    </section>
  );
};
