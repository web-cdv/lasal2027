// A short brand arrival, driven by real font/hero readiness and always dismissible.
export function initLoading(preference) {
  const loader = document.querySelector('.arrival');
  if (!loader) return;
  if (preference.matches) { loader.remove(); return; }
  const start = performance.now();
  const hero = document.querySelector('.hero-surface');
  let closed = false;
  let fontsReady = false;
  let readinessTimer;
  let pointerFrame;
  let pointer = { x: 50, y: 50 };
  loader.hidden = false;
  const observer = new MutationObserver(check);
  observer.observe(hero, { attributes: true, attributeFilter: ['data-media-state'] });
  const timeout = setTimeout(() => dismiss(), 1800);
  function cleanup() {
    observer.disconnect(); clearTimeout(timeout); clearTimeout(readinessTimer);
    cancelAnimationFrame(pointerFrame);
    window.removeEventListener('pointermove', move);
    document.removeEventListener('focusin', focus);
    document.removeEventListener('keydown', key);
    preference.removeEventListener('change', changed);
  }
  function dismiss(immediate = false) {
    if (closed) return;
    closed = true; cleanup();
    if (immediate || preference.matches) { loader.remove(); return; }
    loader.querySelector('.arrival__status').textContent = 'Bienvenido a La Sal';
    loader.classList.add('arrival--leaving');
    loader.setAttribute('aria-hidden', 'true');
    loader.inert = true;
    setTimeout(() => loader.remove(), 420);
  }
  function check() {
    if (closed || !fontsReady || !['ready','error'].includes(hero.dataset.mediaState)) return;
    readinessTimer = setTimeout(() => dismiss(), Math.max(0, 450 - (performance.now() - start)));
  }
  function move(event) {
    if (event.pointerType !== 'mouse') return;
    pointer = { x: event.clientX / innerWidth * 100, y: event.clientY / innerHeight * 100 };
    if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
      loader.style.setProperty('--arrival-x', pointer.x + '%');
      loader.style.setProperty('--arrival-y', pointer.y + '%');
      pointerFrame = null;
    });
  }
  function focus(event) { if (!loader.contains(event.target)) dismiss(true); }
  function key(event) { if (event.key === 'Escape') dismiss(true); }
  function changed() { if (preference.matches) dismiss(true); }
  loader.querySelector('button').addEventListener('click', () => {
    dismiss(true); const main=document.querySelector('#contenido'); main.tabIndex=-1; main.focus({ preventScroll: true });
  });
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('focusin', focus);
  document.addEventListener('keydown', key);
  preference.addEventListener('change', changed);
  document.fonts.ready.then(() => { fontsReady = true; check(); });
  check();
}
