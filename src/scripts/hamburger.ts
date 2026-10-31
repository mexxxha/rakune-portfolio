const menu = document.querySelector<HTMLButtonElement>('.dock__menu');
const popup = document.querySelector<HTMLElement>('#dock-popup');
const root = menu?.closest('.dock__start');

const setOpen = (open: boolean) => {
  if (!menu) return;
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニュー');
};

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  setOpen(!open);
});

popup?.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest('a')) return;
  setOpen(false);
});

document.addEventListener('pointerdown', (event) => {
  if (menu?.getAttribute('aria-expanded') !== 'true') return;
  if (event.target instanceof Node && root?.contains(event.target)) return;
  setOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (menu?.getAttribute('aria-expanded') !== 'true') return;
  setOpen(false);
  menu.focus();
});