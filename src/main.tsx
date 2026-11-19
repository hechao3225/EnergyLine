import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import './theme-calm.css';

// 配色 A/B：?theme=calm 切到「夜灯 + 暖纸」方案，缺省保持现有主题
const themeParam = new URLSearchParams(window.location.search).get('theme');
if (themeParam) document.documentElement.dataset.theme = themeParam;

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
