const main = document.querySelector<HTMLElement>('.main');
const sidebar = document.querySelector<HTMLElement>('.main__sidebar');
const resizer = document.querySelector<HTMLElement>('.main__resizer');
const minWidth = 200;
const maxWidth = 420;

resizer?.addEventListener('pointerdown', (event) => {
  if (!sidebar) return;

  resizer.setPointerCapture(event.pointerId);

  const onMove = (moveEvent: PointerEvent) => {
    const left = sidebar.getBoundingClientRect().left;
    const width = Math.min(maxWidth, Math.max(minWidth, moveEvent.clientX - left));
    main?.style.setProperty('--sidebar-width', `${width}px`);
  };

  const onUp = () => {
    resizer.removeEventListener('pointermove', onMove);
    resizer.removeEventListener('pointerup', onUp);
  };

  resizer.addEventListener('pointermove', onMove);
  resizer.addEventListener('pointerup', onUp);
});

const toggle = document.querySelector<HTMLButtonElement>('.main__sidebar_toggle');
let busy = false;

toggle?.addEventListener('click', () => {
  if (busy || !main || !sidebar) return;

  const collapsed = main.classList.contains('is-sidebar-collapsed');

  if (collapsed) {
    busy = true;
    main.classList.remove('is-sidebar-collapsed');
    main.classList.add('is-opening');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'サイドバーを閉じる');

    const onOpenEnd = (event: AnimationEvent) => {
      if (event.target !== sidebar) return;

      sidebar.removeEventListener('animationend', onOpenEnd);
      main.classList.remove('is-opening');
      busy = false;
    };

    sidebar.addEventListener('animationend', onOpenEnd);
    return;
  }

  busy = true;
  main.classList.add('is-closing');

  const onCloseEnd = (event: AnimationEvent) => {
    if (event.target !== sidebar) return;

    sidebar.removeEventListener('animationend', onCloseEnd);
    main.classList.remove('is-closing');
    main.classList.add('is-sidebar-collapsed');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'サイドバーを開く');
    busy = false;
  };

  sidebar.addEventListener('animationend', onCloseEnd);
});
