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

const toggle = document.querySelector<HTMLButtonElement>('.main__sidebar_toggle');
let busy = false;
let runId = 0;

const finishOpen = () => {
  main?.classList.remove('is-opening');
  busy = false;
};

const finishClose = () => {
  if (!main || !toggle) return;

  main.classList.remove('is-closing');
  main.classList.add('is-sidebar-collapsed');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'サイドバーを開く');
  busy = false;
};

toggle?.addEventListener('click', () => {
  if (busy || !main || !sidebar) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    const collapsed = main.classList.contains('is-sidebar-collapsed');

    if (collapsed) {
      main.classList.remove('is-sidebar-collapsed');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'サイドバーを閉じる');
    } else {
      main.classList.add('is-sidebar-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'サイドバーを開く');
    }
    return;
  }

  const run = ++runId;
  let settled = false;

  const settle = (finish: () => void) => {
    if (settled || run !== runId) return;
    settled = true;
    finish();
  };

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
      sidebar.removeEventListener('animationcancel', onOpenEnd);
      settle(finishOpen);
    };

    sidebar.addEventListener('animationend', onOpenEnd);
    sidebar.addEventListener('animationcancel', onOpenEnd);
    window.setTimeout(() => {
      sidebar.removeEventListener('animationend', onOpenEnd);
      sidebar.removeEventListener('animationcancel', onOpenEnd);
      settle(finishOpen);
    }, 500);
    return;
  }

  busy = true;
  main.classList.add('is-closing');

  const onCloseEnd = (event: AnimationEvent) => {
    if (event.target !== sidebar) return;

    sidebar.removeEventListener('animationend', onCloseEnd);
    sidebar.removeEventListener('animationcancel', onCloseEnd);
    settle(finishClose);
  };

  sidebar.addEventListener('animationend', onCloseEnd);
  sidebar.addEventListener('animationcancel', onCloseEnd);
  window.setTimeout(() => {
    sidebar.removeEventListener('animationend', onCloseEnd);
    sidebar.removeEventListener('animationcancel', onCloseEnd);
    settle(finishClose);
  }, 500);
});
