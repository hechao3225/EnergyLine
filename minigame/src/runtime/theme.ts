/**
 * 国风青玉金丝主题（自 H5 index.css 提取）。
 * @license SPDX-License-Identifier: Apache-2.0
 */

export const Theme = {
  // 页面背景（垂直渐变）
  bgTop: '#f5f8f2',
  bgMid: '#f0f6ee',
  bgBottom: '#e1ecdc',

  // 文本
  textPrimary: '#172a23',
  textSecondary: '#4b6757',
  textHint: '#526c5f',

  // 面板（jade-panel）
  panelBgTop: 'rgba(248,251,247,0.94)',
  panelBgBottom: 'rgba(233,242,232,0.94)',
  panelBorder: 'rgba(135,165,148,0.9)',

  // 按钮（jade-button）
  buttonBgTop: '#f2f7f1',
  buttonBgBottom: '#e3ede2',
  buttonBorder: '#afc6b7',
  buttonText: '#1b382a',

  // 高亮按钮（jade-button-active）
  activeBgTop: '#1c5e46',
  activeBgBottom: '#124332',
  activeBorder: '#0f392a',
  activeText: '#ffffff',

  // 药丸（jade-pill）
  pillBgTop: '#edf4eb',
  pillBgBottom: '#e1ebe0',
  pillBorder: '#b6ccbf',
  pillText: '#1a3629',

  // 游戏元素（TileView 令牌）
  groove: '#223328',
  pipeUnpowered: '#3a5043',
  pipePowered: '#0d9488',
  waterCore: '#38bdf8',
  rivetUnpowered: '#c8d9cc',
  rivetPowered: '#fef08a',

  // 功能色
  emerald: '#0d9488',
  emeraldDark: '#065f46',
  emeraldLight: '#34d399',
  amber: '#f59e0b',
  amberLight: '#fef3c7',
  red: '#dc2626',
  redLight: '#fee2e2',

  fontFamily: '"PingFang SC", -apple-system, "Helvetica Neue", Arial, sans-serif',
};

export function fontStr(size: number, bold = false): string {
  return `${bold ? '700 ' : ''}${size}px ${Theme.fontFamily}`;
}
