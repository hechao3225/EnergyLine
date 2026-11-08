import React from 'react';
import { ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { energyPark } from '../../assets/energyPark';
import { EnergyParkButton } from './EnergyParkButton';
import { EnergyParkPanel } from './EnergyParkPanel';

interface EnergyParkRestorationProps {
  levelTitle: string;
  stepsUsed: number;
  stars: number;
  hasNext: boolean;
  onHome: () => void;
  onNext: () => void;
}

export const EnergyParkRestoration: React.FC<EnergyParkRestorationProps> = ({
  levelTitle,
  stepsUsed,
  stars,
  hasNext,
  onHome,
  onNext,
}) => (
  <section className="energy-screen energy-restoration-screen" style={{ backgroundImage: `url(${energyPark.scenes.restoration})` }}>
    <div className="energy-restoration-title-wrap">
      <img className="energy-restoration-title" src={energyPark.generated.restorationBanner} alt="" aria-hidden="true" />
      <span>设施复苏!</span>
    </div>
    <img className="energy-restoration-firework" src={energyPark.effects.celebrationFirework} alt="" aria-hidden="true" />
    <div className="energy-restoration-facility">
      <img src={energyPark.facilities.carouselActive} alt="旋转木马已复苏" />
    </div>
    <div className="energy-restoration-characters" aria-hidden="true">
      <img src={energyPark.characters.xingya} alt="" />
      <img src={energyPark.characters.boling} alt="" />
      <img src={energyPark.characters.yunrong} alt="" />
    </div>

    <EnergyParkPanel variant="card" className="energy-restoration-card">
      <h2>{levelTitle} · 成功修复</h2>
      <ul>
        <li><CheckCircle2 size={24} />连接能量管道</li>
        <li><CheckCircle2 size={24} />为旋转木马供能</li>
        <li><CheckCircle2 size={24} />设施重新运转</li>
      </ul>
      <div className="energy-restoration-before-after">
        <img src={energyPark.facilities.carouselBroken} alt="修复前" />
        <ArrowRight size={38} />
        <img src={energyPark.facilities.carouselActive} alt="修复后" />
      </div>
    </EnergyParkPanel>

    <EnergyParkPanel variant="smallCard" className="energy-reward-card">
      <h3>通关奖励</h3>
      <div><img src={energyPark.icons.star} alt="星星" /><strong>+{Math.max(1, stars)}</strong></div>
      <div><img src={energyPark.icons.coin} alt="金币" /><strong>+100</strong></div>
      <div><img src={energyPark.icons.crystal} alt="水晶" /><strong>+10</strong></div>
      <small>本次 {stepsUsed} 步</small>
    </EnergyParkPanel>

    <div className="energy-restoration-actions">
      <EnergyParkButton variant="secondary" size="large" icon={<Home size={24} />} onClick={onHome}>返回乐园</EnergyParkButton>
      {hasNext && <EnergyParkButton variant="primary" size="large" icon={<ArrowRight size={24} />} onClick={onNext}>下一关</EnergyParkButton>}
    </div>
  </section>
);
