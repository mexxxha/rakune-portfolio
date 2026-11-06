const menu = document.querySelector<HTMLButtonElement>('.dock__folder .dock__icon');
const root = menu?.closest('.dock__folder');

const setOpen = (open: boolean) => {
  menu?.setAttribute('aria-expanded', String(open));
};

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  setOpen(!open);
});

root?.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest('[data-illustration]')) return;
  setOpen(false);
});

document.addEventListener('pointerdown', (event) => {
  if (menu?.getAttribute('aria-expanded') !== 'true') return;
  if (event.target instanceof Node && root?.contains(event.target)) return;
  setOpen(false);
});

export {};