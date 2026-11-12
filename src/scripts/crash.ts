const close = document.querySelector<HTMLButtonElement>('.header__buttons_close');
const crash = document.querySelector<HTMLElement>('#crash');
const container = document.querySelector<HTMLElement>('.container');

if (crash) {
  const sources = JSON.parse(crash.dataset.sources ?? '[]') as string[];

  let count = 0;
  let timer = 0;
  let picked: string[] = [];
  let exit = 0;

  let z = 1;

  const dragDialog = (dialog: HTMLElement, bar: HTMLElement) => {
    let drag: { dx: number; dy: number } | null = null;
    dialog.addEventListener('pointerdown', () => {
      z += 1;
      dialog.style.zIndex = String(z);
    });

    bar.addEventListener('pointerdown', (event) => {
      const rect = dialog.getBoundingClientRect();
      drag = { dx: event.clientX - rect.left, dy: event.clientY - rect.top };
      bar.setPointerCapture(event.pointerId);
    });

    bar.addEventListener('pointermove', (event) => {
      if (!drag) return;

      const bounds = crash.getBoundingClientRect();
      const left = Math.min(Math.max(0, event.clientX - bounds.left - drag.dx), crash.clientWidth - dialog.offsetWidth);
      const top = Math.min(Math.max(0, event.clientY - bounds.top - drag.dy), crash.clientHeight - dialog.offsetHeight);

      dialog.style.left = `${left}px`;
      dialog.style.top = `${top}px`;
    });

    const endDrag = () => {
      drag = null;
    };

    bar.addEventListener('pointerup', endDrag);
    bar.addEventListener('pointercancel', endDrag);
  };

  const spawn = () => {
    if (count >= picked.length) return;

    const index = count;
    count += 1;
    crash.hidden = false;

    const dialog = document.createElement('div');
    dialog.className = 'crash__dialog';

    const bar = document.createElement('p');
    bar.className = 'crash__bar';
    bar.textContent = 'WARNING';

    const mark = document.createElement('span');
    mark.className = 'crash__mark';
    mark.setAttribute('aria-hidden', 'true');
    bar.append(mark);
    dragDialog(dialog, bar);

    const body = document.createElement('div');
    body.className = 'crash__body';

    const image = document.createElement('img');
    image.className = 'crash__img';
    image.alt = '';
    image.src = picked[index] ?? '';
    body.append(image);

    const ok = document.createElement('button');
    ok.className = 'crash__ok';
    ok.type = 'button';
    ok.textContent = 'OK';
    ok.addEventListener('click', () => {
      if (index !== exit) {
        dialog.remove();
        return;
      }
      window.clearInterval(timer);
      crash.replaceChildren();
      crash.hidden = true;
      container?.classList.remove('is-closed');
      count = 0;
    });

    dialog.append(bar, body, ok);
    crash.append(dialog);
    const maxLeft = Math.max(0, crash.clientWidth - dialog.offsetWidth);
    const maxTop = Math.max(0, crash.clientHeight - dialog.offsetHeight);
    dialog.style.left = `${Math.random() * maxLeft}px`;
    dialog.style.top = `${Math.random() * maxTop}px`;
  };

  close?.addEventListener('click', () => {
    if (count > 0) return;

    const order = [...sources];
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const item = order[i];
      order[i] = order[j];
      order[j] = item;
    }
    picked = order.slice(0, 5);
    exit = Math.floor(Math.random() * picked.length);
    container?.classList.add('is-closed');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      exit = 0;
      spawn();
      return;
    }

    timer = window.setInterval(() => {
      spawn();
      if (count >= picked.length) window.clearInterval(timer);
    }, 40);
  });
}

export {};
