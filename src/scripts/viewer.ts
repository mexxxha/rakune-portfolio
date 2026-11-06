const viewer = document.querySelector<HTMLElement>('#viewer');
const title = viewer?.querySelector<HTMLElement>('.viewer__title');
const image = viewer?.querySelector<HTMLImageElement>('.viewer__img');
const close = viewer?.querySelector<HTMLButtonElement>('.viewer__close');

const open = (source: HTMLElement) => {
  if (!viewer || !title || !image) return;

  image.src = source.dataset.src ?? '';
  image.alt = source.dataset.alt ?? '';
  title.textContent = source.dataset.title ?? '';
  viewer.hidden = false;
};

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const source = event.target.closest<HTMLElement>('[data-illustration]');
  if (!source) return;

  open(source);
});

close?.addEventListener('click', () => {
  if (!viewer) return;
  viewer.hidden = true;
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !viewer || viewer.hidden) return;
  viewer.hidden = true;
});

export {};
