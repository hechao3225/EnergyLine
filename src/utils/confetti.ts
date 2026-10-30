/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function triggerConfetti() {
  if (typeof document === 'undefined') return;

  try {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '99999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const colors = ['#14b8a6', '#f59e0b', '#10b981', '#fbbf24', '#38bdf8', '#0d9488'];
    const count = 36;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 6;
      const startX = 50 + (Math.random() - 0.5) * 20; // 40% - 60%
      const destX = (Math.random() - 0.5) * 500;
      const destY = -(Math.random() * 320 + 200);

      piece.style.position = 'absolute';
      piece.style.left = `${startX}%`;
      piece.style.top = '65%';
      piece.style.width = `${size}px`;
      piece.style.height = `${size * 0.7}px`;
      piece.style.backgroundColor = color;
      piece.style.borderRadius = '2px';
      piece.style.transform = `translate(0, 0) rotate(0deg)`;
      piece.style.transition = 'all 1.1s cubic-bezier(0.2, 0.9, 0.3, 1)';
      piece.style.opacity = '1';
      container.appendChild(piece);

      requestAnimationFrame(() => {
        piece.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg)`;
        piece.style.opacity = '0';
      });
    }

    setTimeout(() => {
      try {
        container.remove();
      } catch {
        // ignore
      }
    }, 1300);
  } catch {
    // fallback gracefully
  }
}
