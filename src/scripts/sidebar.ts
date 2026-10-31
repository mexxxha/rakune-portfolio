const sidebar = document.querySelector<HTMLElement>('.main__sidebar');
const resizer = document.querySelector<HTMLElement>('.main__resizer');
const minWidth = 140;
const maxWidth = 420;

resizer?.addEventListener('pointerdown', (event) => {
  if (!sidebar) return;

  resizer.setPointerCapture(event.pointerId);

  const onMove = (moveEvent: PointerEvent) => {
    const left = sidebar.getBoundingClientRect().left;
    const width = Math.min(maxWidth, Math.max(minWidth, moveEvent.clientX - left));
    sidebar.style.width = `${width}px`;
  };

  const onUp = () => {
    resizer.removeEventListener('pointermove', onMove);
    resizer.removeEventListener('pointerup', onUp);
  };

  resizer.addEventListener('pointermove', onMove);
  resizer.addEventListener('pointerup', onUp);
});

const nav = document.querySelector<HTMLElement>('.main__nav');
const pointer = nav?.querySelector<HTMLElement>('.main__nav_pointer');
const links = [...(nav?.querySelectorAll<HTMLAnchorElement>('.main__nav_link') ?? [])];

const movePointer = (link: HTMLElement) => {
  if (!nav || !pointer) return;

  const navTop = nav.getBoundingClientRect().top;
  const linkRect = link.getBoundingClientRect();
  const y = linkRect.top - navTop + (linkRect.height - pointer.offsetHeight) / 2;

  pointer.style.translate = `0 ${y}px`;
  pointer.style.opacity = '1';
};

links.forEach((link) => {
  link.addEventListener('mouseenter', () => movePointer(link));
});

nav?.addEventListener('mouseleave', () => {
  if (!pointer) return;
  pointer.style.opacity = '0';
});