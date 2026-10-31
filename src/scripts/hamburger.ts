const menu = document.querySelector<HTMLButtonElement>('.dock__menu');

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.setAttribute('aria-label', open ? 'メニュー' : 'メニューを閉じる');
});