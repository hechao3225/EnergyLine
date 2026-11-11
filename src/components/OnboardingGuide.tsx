import React, { useState } from "react";
import { Art, ParkButton, Stars } from "./ParkArt";
import { getParSteps } from "../utils/rating";

interface OnboardingGuideProps {
  isOpen: boolean;
  levelTitle: string;
  maxSteps: number;
  parSteps?: number;
  onClose: () => void;
  onOpenRules?: () => void;
}

export function OnboardingGuide(p: OnboardingGuideProps) {
  const [slide, setSlide] = useState(0);
  if (!p.isOpen) return null;
  const slides = [
    { title: "点一下管道，旋转 90°", art: "pipe-corner-off",
      copy: "每次旋转消耗 1 步。把相邻接头对齐，让能量继续前进。", note: "每次挑战可回溯 3 次，重试后重新补满。" },
    { title: "把能量送到每一座设施", art: "pipe-source",
      copy: "从星星能量源出发，连接所有灰色设施。设施全部亮起即可通关。", note: "先连主干，再处理支路。能量闸的管身可以旋转，角标切换通断。" },
    { title: "用最少步数点亮第四颗星", art: "icon-star",
      copy: `本关最多 ${p.maxSteps} 步，最少 ${getParSteps(p)} 步。达到最少步数即可获得四星。`, note: "通关至少一星；越接近最少步数，获得的星星越多。" },
  ];
  const current = slides[slide];
  return <div className="park-onboarding">
    <p className="park-fine-print">第 1 关 · {p.levelTitle} · {slide + 1}/3</p>
    <Art name={current.art} className="park-modal-mascot" />
    {slide === 2 && <Stars value={4} />}
    <h3>{current.title}</h3>
    <p className="park-hint-copy">{current.copy}</p>
    <p>{current.note}</p>
    <div className="park-mode-links">
      <ParkButton purple disabled={slide === 0} onClick={() => setSlide(slide - 1)}>上一步</ParkButton>
      <ParkButton onClick={() => slide === 2 ? p.onClose() : setSlide(slide + 1)}>{slide === 2 ? "开始连接" : "下一步"}</ParkButton>
    </div>
    <button className="park-text-link" onClick={p.onClose}>跳过引导</button>
    <button className="park-text-link" onClick={p.onOpenRules}>查看完整规则</button>
  </div>;
}
