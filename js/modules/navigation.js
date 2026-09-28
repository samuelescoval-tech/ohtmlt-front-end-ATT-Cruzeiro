export function iniciarNavegacao() {
  const nav = document.querySelector('nav');
  const menu = nav.querySelector('#menu-principal');
  const menuToggle = nav.querySelector('.menu-toggle');
  const item = nav.querySelector('.nav-item');
  const submenu = nav.querySelector('.submenu');
  const submenuToggle = nav.querySelector('.submenu-toggle');
  const desktop = matchMedia('(min-width: 768px)');

  function abrirSubmenu(aberto) {
    if (!aberto && submenu.contains(document.activeElement)) submenuToggle.focus();
    submenu.hidden = !aberto;
    submenuToggle.setAttribute('aria-expanded', String(aberto));
  }

  function abrirMenu(aberto) {
    if (!aberto) {
      abrirSubmenu(false);
      if (menu.contains(document.activeElement)) menuToggle.focus();
    }
    menu.hidden = !aberto;
    menuToggle.setAttribute('aria-expanded', String(aberto));
  }

  function ajustarLargura() {
    abrirSubmenu(false);
    if (desktop.matches) {
      menu.hidden = false;
      if (document.activeElement === menuToggle) menu.querySelector('a').focus();
      menuToggle.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuToggle.hidden = false;
      abrirMenu(false);
    }
  }

  nav.dataset.menuAtivo = 'true';
  submenuToggle.hidden = false;
  ajustarLargura();
  desktop.addEventListener('change', ajustarLargura);
  menuToggle.addEventListener('click', () => abrirMenu(menu.hidden));
  submenuToggle.addEventListener('click', () => abrirSubmenu(submenu.hidden));
  nav.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (!submenu.hidden) {
      event.preventDefault();
      abrirSubmenu(false);
      submenuToggle.focus();
    } else if (!desktop.matches && !menu.hidden) {
      event.preventDefault();
      abrirMenu(false);
      menuToggle.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    abrirSubmenu(false);
    if (!desktop.matches) abrirMenu(false);
  });
  nav.addEventListener('focusout', event => {
    // relatedTarget identifica o destino, mesmo durante a troca de foco pelo Tab.
    if (!item.contains(event.relatedTarget)) abrirSubmenu(false);
    if (!desktop.matches && !nav.contains(event.relatedTarget)) abrirMenu(false);
  });
  document.addEventListener('click', event => {
    if (nav.contains(event.target)) return;
    abrirSubmenu(false);
    if (!desktop.matches) abrirMenu(false);
  });
}
