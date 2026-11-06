const content = document.querySelector<HTMLElement>('.main__content');

const show = (id: string) => {
  if (!content) return;

  const target = content.querySelector<HTMLElement>(`#${id}`);
  if (!target) return;

  document.documentElement.dataset.section = id;

  content.scrollTop = 0;
  setCurrent(id);
};

const setCurrent = (id: string) => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    const target = link.getAttribute('href')?.slice(1);
    if (target === id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};

const idFromHash = () => {
  const id = location.hash.slice(1);
  if (id && content?.querySelector(`#${id}`)) return id;
  return 'profile';
};
show(idFromHash());

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute('href')?.slice(1);
  if (!id || !content?.querySelector(`#${id}`)) return;

  event.preventDefault();
  if (id === idFromHash()) return;
  history.pushState(null, '', `#${id}`);
  show(id);
});

window.addEventListener('popstate', () => {
  show(idFromHash());
});
