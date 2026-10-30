/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center p-6 text-center">
          <div className="max-w-sm bg-white/95 rounded-3xl p-6 border border-amber-300 shadow-xl space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1c2e27]">
              {this.props.fallbackTitle || '模式加载暂遇异常'}
            </h3>
            <p className="text-xs text-[#52665a] leading-relaxed">
              电路核心自动隔离保护已激活，点击下方按钮即可重置并恢复游戏。
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 bg-[#115e59] hover:bg-[#0e4e4a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新加载此模式</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
