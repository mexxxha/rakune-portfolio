const main = document.querySelector<HTMLElement>('.main');
const sidebar = document.querySelector<HTMLElement>('.main__sidebar');
const resizer = document.querySelector<HTMLElement>('.main__resizer');

const setWidth = (width: number) => {
  if (!resizer) return;

  const minWidth = Number(resizer.getAttribute('aria-valuemin'));
  const maxWidth = Number(resizer.getAttribute('aria-valuemax'));
  const next = Math.round(Math.min(maxWidth, Math.max(minWidth, width)));

  main?.style.setProperty('--sidebar-width', `${next}px`);
  resizer.setAttribute('aria-valuenow', String(next));
};

resizer?.addEventListener('pointerdown', (event) => {
  if (!sidebar) return;

  resizer.setPointerCapture(event.pointerId);

  const onMove = (moveEvent: PointerEvent) => {
    const left = sidebar.getBoundingClientRect().left;
    setWidth(moveEvent.clientX - left);
  };

  const onUp = () => {
    resizer.removeEventListener('pointermove', onMove);
    resizer.removeEventListener('pointerup', onUp);
    resizer.removeEventListener('pointercancel', onUp);
  };

  resizer.addEventListener('pointermove', onMove);
  resizer.addEventListener('pointerup', onUp);
  resizer.addEventListener('pointercancel', onUp);
});

resizer?.addEventListener('keydown', (event) => {
  if (!resizer) return;

  const current = Number(resizer.getAttribute('aria-valuenow'));
  const minWidth = Number(resizer.getAttribute('aria-valuemin'));
  const maxWidth = Number(resizer.getAttribute('aria-valuemax'));

  if (event.key === 'ArrowLeft') setWidth(current - 16);
  else if (event.key === 'ArrowRight') setWidth(current + 16);
  else if (event.key === 'Home') setWidth(minWidth);
  else if (event.key === 'End') setWidth(maxWidth);
  else return;

  event.preventDefault();
});

export {};
