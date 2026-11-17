import React from "react";
import { resetParkProgress } from "../utils/parkProgress";

interface Props {
  children: React.ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * 最后一道防线：渲染期异常（多为存档脏数据）不再直接白屏。
 * 玩家可以「重新加载」或「重置本地存档」自救，而不是永远打不开。
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[park] 渲染异常", error);
  }

  private reset = () => {
    try {
      resetParkProgress(window.localStorage);
    } catch {
      // 存储不可用时也要能刷新一次
    }
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="park-crash" role="alert">
        <h1>乐园暂时打不开了</h1>
        <p>
          读取本地存档时出了点问题。先点「重新加载」试试；如果还是打不开，
          可以重置本地存档（会清空钻石、星级与已修复的设施）。
        </p>
        <button className="park-crash-primary" onClick={() => window.location.reload()}>
          重新加载
        </button>
        <button className="park-crash-reset" onClick={this.reset}>
          重置本地存档
        </button>
        <p className="park-crash-detail">{this.state.error?.message}</p>
      </div>
    );
  }
}
