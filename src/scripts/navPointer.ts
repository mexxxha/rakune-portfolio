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

const hidePointer = () => {
  if (!pointer) return;
  pointer.style.opacity = '0';
};

const focusedLink = () => {
  const active = document.activeElement;
  if (active instanceof HTMLAnchorElement && nav?.contains(active)) return active;
  return null;
};

links.forEach((link) => {
  link.addEventListener('mouseenter', () => movePointer(link));
  link.addEventListener('focus', () => movePointer(link));
});

nav?.addEventListener('mouseleave', () => {
  const active = focusedLink();
  if (active) {
    movePointer(active);
    return;
  }
  hidePointer();
});

nav?.addEventListener('focusout', (event) => {
  const next = event.relatedTarget;
  if (next instanceof Node && nav.contains(next)) return;
  if (nav.matches(':hover')) return;
  hidePointer();
});