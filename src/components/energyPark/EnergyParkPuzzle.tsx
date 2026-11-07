import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Lightbulb, RotateCcw, Undo2 } from 'lucide-react';
import { LevelConfig, SimulationResult, Tile } from '../../types/game';
import { getStarsForSteps } from '../../utils/rating';
import { energyPark } from '../../assets/energyPark';
import { GameBoard } from '../GameBoard';
import { EnergyParkButton } from './EnergyParkButton';
import { EnergyParkPanel } from './EnergyParkPanel';

interface EnergyParkPuzzleProps {
  level: LevelConfig;
  tiles: Tile[];
  remainingSteps: number;
  bestSteps?: number;
  simulation: SimulationResult;
  isPeekActive: boolean;
  canUndo: boolean;
  onBack: () => void;
  onHelp: () => void;
  onHint: () => void;
  onUndo: () => void;
  onRestart: () => void;
  onTileClick: (tile: Tile, action?: 'rotate' | 'toggle-switch') => void;
  onLongPressStart: () => void;
  onLongPressEnd: () => void;
}

export const EnergyParkPuzzle: React.FC<EnergyParkPuzzleProps> = ({
  level,
  tiles,
  remainingSteps,
  bestSteps,
  simulation,
  isPeekActive,
  canUndo,
  onBack,
  onHelp,
  onHint,
  onUndo,
  onRestart,
  onTileClick,
  onLongPressStart,
  onLongPressEnd,
}) => {
  const [showHint, setShowHint] = useState(false);
  const earnedStars = bestSteps === undefined ? 0 : getStarsForSteps(bestSteps, level);
  return (
    <section className="energy-screen energy-puzzle-screen" style={{ backgroundImage: `url(${energyPark.scenes.puzzle})` }}>
      <header className="energy-puzzle-header">
        <button type="button" className="energy-round-button" onClick={onBack} aria-label="返回乐园"><ArrowLeft size={30} /></button>
        <div className="energy-level-cloud">
          <strong>第 {level.id} 关</strong>
          <div className="energy-stars" aria-label={`已获得 ${earnedStars} 颗星`}>
            {[1, 2, 3].map((starNumber) => <img key={starNumber} src={energyPark.icons.star} alt="" className={starNumber <= earnedStars ? 'is-earned' : ''} />)}
          </div>
        </div>
        <button type="button" className="energy-round-button" onClick={onHelp} aria-label="查看规则"><HelpCircle size={30} /></button>
      </header>

      <EnergyParkPanel variant="status" className="energy-puzzle-instruction">
        <img src={energyPark.facilities.carouselBroken} alt="待修复旋转木马" />
        <p>{level.hintText || '旋转木马连接能量，让它重新运转！'}</p>
        <img src={energyPark.facilities.carouselActive} alt="已修复旋转木马" />
      </EnergyParkPanel>

      <div className="energy-puzzle-board-wrap">
        <GameBoard
          tiles={tiles}
          gridRows={level.gridRows}
          gridCols={level.gridCols}
          simulation={simulation}
          isPeekActive={isPeekActive}
          onTileClick={onTileClick}
          onLongPressStart={onLongPressStart}
          onLongPressEnd={onLongPressEnd}
          levelId={level.id}
        />
      </div>

      <div className="energy-puzzle-stats">
        <div><span>👣</span><strong>步数&nbsp; {remainingSteps}</strong></div>
        <div><img src={energyPark.icons.star} alt="" /><strong>最佳&nbsp; {bestSteps ?? '—'}</strong></div>
        <div className="energy-stars-inline">{[1, 2, 3].map((n) => <img key={n} src={energyPark.icons.star} alt="" className={n <= earnedStars ? 'is-earned' : ''} />)}</div>
      </div>

      <div className="energy-puzzle-actions">
        <button type="button" className="energy-action-button" onClick={onUndo} disabled={!canUndo} aria-label="撤销"><Undo2 size={34} /><span>撤销</span></button>
        <button type="button" className="energy-action-button" onClick={onRestart} aria-label="重置"><RotateCcw size={34} /><span>重置</span></button>
        <button type="button" className="energy-action-button" onClick={() => { setShowHint(true); onHint(); }} aria-label="提示"><Lightbulb size={34} /><span>提示</span><b>3</b></button>
      </div>

      {showHint && (
        <div className="energy-puzzle-hint" role="status">
          <span>{level.hintText}</span>
          <button type="button" onClick={() => setShowHint(false)} aria-label="关闭提示">×</button>
        </div>
      )}

      <div className="energy-puzzle-characters" aria-hidden="true">
        <img src={energyPark.characters.xingya} alt="" />
        <img src={energyPark.characters.boling} alt="" />
        <img src={energyPark.characters.yunrong} alt="" />
      </div>
    </section>
  );
};
