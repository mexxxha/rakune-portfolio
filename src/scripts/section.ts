const content = document.querySelector<HTMLElement>('.main__content');

const show = (id: string) => {
  if (!content) return;

  const target = content.querySelector<HTMLElement>(`#${id}`);
  if (!target) return;

  content.querySelectorAll('section').forEach((section) => {
    section.hidden = section !== target;
  });

  content.scrollTop = 0;
};

show('profile');

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute('href')?.slice(1);
  if (!id || !content?.querySelector(`#${id}`)) return;

  event.preventDefault();
  show(id);
});