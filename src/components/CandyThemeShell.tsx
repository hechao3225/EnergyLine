import React, { useEffect, useMemo, useState } from 'react';
import { LevelSelect } from './LevelSelect';
import { LevelConfig, SimulationResult, Tile } from '../types/game';

type Screen = 'home' | 'play' | 'victory';

interface CandyThemeShellProps {
  screen: Screen;
  level: LevelConfig;
  levels: LevelConfig[];
  tiles: Tile[];
  simulation: SimulationResult;
  remainingSteps: number;
  clearedLevels: number[];
  bestSteps: Record<number, number>;
  levelSelectOpen: boolean;
  isPeekActive: boolean;
  onStartLevel: () => void;
  onBackHome: () => void;
  onNextLevel: () => void;
  onRestart: () => void;
  onUndo: () => void;
  onHint: () => void;
  onTileClick: (tile: Tile, action?: 'rotate' | 'toggle-switch') => void;
  onOpenLevels: () => void;
  onCloseLevels: () => void;
  onSelectLevel: (id: number) => void;
  onOpenProfile: () => void;
  onOpenRules: () => void;
  onOpenFlora: () => void;
}

const readNumber = (key: string, fallback: number) => {
  const value = Number.parseInt(localStorage.getItem(key) || '', 10);
  return Number.isFinite(value) ? value : fallback;
};

export const CandyThemeShell: React.FC<CandyThemeShellProps> = ({
  screen,
  level,
  levels,
  tiles,
  simulation,
  remainingSteps,
  clearedLevels,
  bestSteps,
  levelSelectOpen,
  isPeekActive,
  onStartLevel,
  onBackHome,
  onNextLevel,
  onRestart,
  onUndo,
  onHint,
  onTileClick,
  onOpenLevels,
  onCloseLevels,
  onSelectLevel,
  onOpenProfile,
  onOpenRules,
  onOpenFlora,
}) => {
  const [coins, setCoins] = useState(() => readNumber('energy_coins', 58230));
  const [gems, setGems] = useState(() => readNumber('energy_gems', 320));
  const [stars, setStars] = useState(() => readNumber('energy_stars', 40));
  const [taskClaimed, setTaskClaimed] = useState(() => localStorage.getItem('energy_task_claimed') === '1');
  const [overlay, setOverlay] = useState<'none' | 'tasks' | 'bag' | 'shop' | 'hint'>('none');

  useEffect(() => {
    if (screen !== 'victory') return;
    const rewardKey = `energy_reward_${level.id}`;
    if (localStorage.getItem(rewardKey)) return;
    const nextCoins = coins + 100;
    const nextGems = gems + 10;
    const nextStars = stars + 3;
    localStorage.setItem(rewardKey, '1');
    localStorage.setItem('energy_coins', String(nextCoins));
    localStorage.setItem('energy_gems', String(nextGems));
    localStorage.setItem('energy_stars', String(nextStars));
    setCoins(nextCoins);
    setGems(nextGems);
    setStars(nextStars);
  }, [screen, level.id]);

  const progress = useMemo(() => Math.min(99, Math.max(1, clearedLevels.length)), [clearedLevels.length]);

  const openOverlay = (target: 'tasks' | 'bag' | 'shop' | 'hint') => setOverlay(target);

  return (
    <div className="candy-shell">
      <div className="candy-stage">
        {screen === 'home' && (
          <div className="candy-screen candy-home" role="main" aria-label="能量管道乐园首页">
            <img className="candy-art" src="/assets/ui2-home.png" alt="能量管道乐园" />
            <div className="candy-home-stats" aria-label="资源状态">
              <button className="candy-avatar" onClick={onOpenProfile} aria-label="打开个人资料">🐑</button>
              <span className="candy-stat candy-stat-star">✦ {stars}</span>
              <span className="candy-stat candy-stat-coin">● {coins.toLocaleString()}</span>
              <span className="candy-stat candy-stat-gem">◆ {gems}</span>
            </div>
            <div className="candy-home-actions">
              <button className="candy-hit candy-hit-settings" onClick={onOpenRules} aria-label="设置与规则" />
              <button className="candy-hit candy-hit-message" onClick={onOpenProfile} aria-label="消息" />
              <button className="candy-hit candy-hit-gift" onClick={() => openOverlay('shop')} aria-label="奖励商店" />
              <button className="candy-hit candy-hit-task" onClick={() => openOverlay('tasks')} aria-label="任务" />
              <button className="candy-hit candy-hit-progress" onClick={onOpenLevels} aria-label="打开关卡进度" />
              <button className="candy-hit candy-hit-continue" onClick={onStartLevel}>▶ 继续挑战</button>
              <button className="candy-hit candy-hit-levels" onClick={onOpenLevels}>关卡</button>
              <button className="candy-hit candy-hit-tasks" onClick={() => openOverlay('tasks')}>任务</button>
              <button className="candy-hit candy-hit-bag" onClick={() => openOverlay('bag')}>背包</button>
              <button className="candy-hit candy-hit-shop" onClick={() => openOverlay('shop')}>商店</button>
            </div>
            <div className="candy-progress-label">{progress}/99</div>
          </div>
        )}

        {screen === 'play' && (
          <div className="candy-screen candy-play" role="main" aria-label={`第${level.id}关玩法`}>
            <img className="candy-art" src="/assets/ui2-play.jpg" alt="管道玩法" />
            <button className="candy-hit candy-hit-back" onClick={onBackHome} aria-label="返回乐园">←</button>
            <button className="candy-hit candy-hit-help" onClick={onOpenRules} aria-label="查看玩法说明">?</button>
            <div className="candy-play-status">
              <strong>第 {level.id} 关</strong>
              <span>{simulation.litCount}/{simulation.totalBulbs} 目标</span>
              <span>步数 {remainingSteps}</span>
            </div>
            <div className="candy-board-layer" aria-label="管道棋盘操作区">
              <div className="candy-hit-grid" style={{ gridTemplateColumns: `repeat(${level.gridCols}, 1fr)` }}>
                {tiles.map((tile) => (
                  <button
                    key={tile.id}
                    className="candy-tile-hit"
                    disabled={tile.locked || tile.type === 'empty'}
                    aria-label={`${tile.row + 1}行${tile.col + 1}列`}
                    style={{ gridRow: tile.row + 1, gridColumn: tile.col + 1 }}
                    onClick={() => onTileClick(tile, tile.type === 'switch' ? 'toggle-switch' : 'rotate')}
                  />
                ))}
              </div>
            </div>
            <div className="candy-play-actions">
              <button onClick={onUndo}>↶<span>撤销</span></button>
              <button onClick={() => { onHint(); setOverlay('hint'); }}>💡<span>提示</span></button>
              <button onClick={onRestart}>↻<span>重置</span></button>
            </div>
          </div>
        )}

        {screen === 'victory' && (
          <div className="candy-screen candy-victory" role="main" aria-label="设施复苏结算">
            <img className="candy-art" src="/assets/ui2-victory.jpg" alt="设施复苏成功" />
            <div className="candy-reward-live">+3 星星　+100 金币　+10 钻石</div>
            <button className="candy-hit candy-hit-home" onClick={onBackHome}>⌂ 返回乐园</button>
            <button className="candy-hit candy-hit-next" onClick={onNextLevel}>下一关 ▶</button>
          </div>
        )}

        {overlay !== 'none' && (
          <div className="candy-overlay" role="dialog" aria-modal="true">
            <div className="candy-overlay-card">
              <img src="/assets/ui2-mascots.webp" alt="乐园伙伴" className="candy-overlay-mascots" />
              <button className="candy-overlay-close" onClick={() => setOverlay('none')}>×</button>
              {overlay === 'tasks' && <><h2>每日任务</h2><p>完成 1 个关卡　奖励 100 金币</p><button disabled={taskClaimed} onClick={() => { if (taskClaimed) return; const next = coins + 100; setCoins(next); setTaskClaimed(true); localStorage.setItem('energy_coins', String(next)); localStorage.setItem('energy_task_claimed', '1'); setOverlay('none'); }}>{taskClaimed ? '已领取' : '领取奖励'}</button></>}
              {overlay === 'bag' && <><h2>背包</h2><p>提示灯泡 × 3　撤销星尘 × 5</p><button onClick={() => { onHint(); setOverlay('hint'); }}>使用提示灯泡</button></>}
              {overlay === 'shop' && <><h2>星光商店</h2><p>当前金币 {coins.toLocaleString()}<br />提示灯泡　50 金币</p><button onClick={() => { if (coins < 50) return; const next = coins - 50; setCoins(next); localStorage.setItem('energy_coins', String(next)); setOverlay('none'); }}>兑换</button></>}
              {overlay === 'hint' && <><h2>能量提示</h2><p>{level.hintText}</p><button onClick={() => setOverlay('none')}>知道了</button></>}
            </div>
          </div>
        )}

        {levelSelectOpen && (
          <LevelSelect
            levels={levels}
            currentLevelIndex={level.id}
            clearedLevels={clearedLevels}
            bestSteps={bestSteps}
            onSelectLevel={onSelectLevel}
            onClose={onCloseLevels}
          />
        )}
      </div>
    </div>
  );
};
