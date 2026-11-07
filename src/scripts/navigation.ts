/**
 * Header navigation behaviour.
 * The mobile menu is a native <details> disclosure so it still works without
 * JavaScript; this module only adds close-on-navigate, Escape and outside
 * click handling, plus a desktop resize reset.
 */
const header = document.querySelector<HTMLElement>('[data-site-header]');
const menu = header?.querySelector<HTMLDetailsElement>('[data-mobile-nav]');
const toggle = menu?.querySelector<HTMLElement>('[data-nav-toggle]');

if (menu && toggle) {
  const syncLabel = () => {
    toggle.setAttribute('aria-label', menu.open ? 'Close menu' : 'Open menu');
  };

  menu.addEventListener('toggle', syncLabel);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.open = false;
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.open) return;
    menu.open = false;
    toggle.focus();
  });

  document.addEventListener('pointerdown', (event) => {
    if (!menu.open) return;
    if (event.target instanceof Node && !menu.contains(event.target)) {
      menu.open = false;
    }
  });

  const desktop = window.matchMedia('(min-width: 48.0625rem)');
  desktop.addEventListener('change', (event) => {
    if (event.matches && menu.open) menu.open = false;
  });

  syncLabel();
}
