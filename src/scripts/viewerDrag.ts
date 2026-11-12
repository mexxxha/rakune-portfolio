const viewer = document.querySelector<HTMLElement>('#viewer');
const bar = viewer?.querySelector<HTMLElement>('.viewer__bar');

let drag: { dx: number; dy: number } | null = null;

bar?.addEventListener('pointerdown', (e) => {
  if (!viewer || !bar) return;
  if (e.target instanceof Element && e.target.closest('.viewer__close')) return;

  const rect = viewer.getBoundingClientRect();
  drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
  bar.setPointerCapture(e.pointerId);
});

bar?.addEventListener('pointermove', (e) => {
  if (!drag || !viewer) return;

  const parent = viewer.offsetParent;
  if (!(parent instanceof HTMLElement)) return;

  const bounds = parent.getBoundingClientRect();
  const left = Math.min(Math.max(0, e.clientX - bounds.left - drag.dx), parent.clientWidth - viewer.offsetWidth);
  const top = Math.min(Math.max(0, e.clientY - bounds.top - drag.dy), parent.clientHeight - viewer.offsetHeight);

  viewer.style.left = `${left}px`;
  viewer.style.top = `${top}px`;
});

const endDrag = () => {
  drag = null;
};
bar?.addEventListener('pointerup', endDrag);
bar?.addEventListener('pointercancel', endDrag);
export {};