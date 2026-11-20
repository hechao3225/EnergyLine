import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { readParkProgress } from './utils/parkProgress';
import { applyParkTheme } from './utils/parkTheme';
import './index.css';
import './theme-calm.css';

const themeParam = new URLSearchParams(window.location.search).get('theme');
applyParkTheme(
  themeParam === 'calm' || themeParam === 'default'
    ? themeParam
    : readParkProgress(localStorage).equippedCosmetics.theme,
);

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
