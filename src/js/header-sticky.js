// Header sticky - versão melhorada e garantida
(function () {
  'use strict';

  function initHeaderSticky() {
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    if (!navbar) {
      console.warn('Header sticky: navbar não encontrado');
      return;
    }

    // Forçar position fixed
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.right = '0';
    navbar.style.width = '100%';
    navbar.style.zIndex = '9999';

    navbar.classList.add('navbar-fixed');

    // Verificar se o position fixed foi aplicado
    requestAnimationFrame(() => {
      const computedPos = window.getComputedStyle(navbar).position;
      if (computedPos !== 'fixed') {
        console.warn('Header sticky: fallback aplicado');
        navbar.classList.add('is-sticky-fallback');
        navbar.style.position = 'fixed !important';
      }
    });

    navbar.style.transition = 'opacity 250ms ease, background 250ms ease, box-shadow 250ms ease';

    let lastScroll = window.scrollY || 0;
    let ticking = false;

    function onScroll() {
      lastScroll = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateNavbar(lastScroll);
          ticking = false;
        });
        ticking = true;
      }
    }

    function updateNavbar(scrollY) {
      // Garantir que o navbar continue fixo
      if (navbar.style.position !== 'fixed') {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
      }

      if (scrollY > 80) {
        navbar.classList.add('scrolled');
        navbar.style.opacity = '0.98';
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.opacity = '1';
      }
    }

    // Initialize state
    updateNavbar(window.scrollY || 0);

    // Use passive listener for better scroll perf
    window.addEventListener('scroll', onScroll, { passive: true });

    try { window.__headerStickyInitialized = true; } catch (e) { }

    // Watchdog removido
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderSticky);
  } else {
    initHeaderSticky();
  }
})();
