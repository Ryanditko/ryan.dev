// Header sticky - versão limpa e defensiva
(function() {
  'use strict';

  function initHeaderSticky() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.classList.add('navbar-fixed');
  navbar.style.top = '0';

  requestAnimationFrame(() => {
    const computedPos = window.getComputedStyle(navbar).position;
    if (computedPos !== 'fixed') {
      navbar.classList.add('is-sticky-fallback');
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
      if (scrollY > 80) {
        navbar.classList.add('scrolled');
        navbar.style.opacity = '0.98';
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.opacity = '1';
      }
      // Log leve apenas na primeira mudança acima/abaixo do limite
      // log inicial removido

      // Diagnóstico contínuo (apenas a cada ~10 mudanças) para capturar deslocamento involuntário
      // diagnóstico periódico removido para isolar se o próprio script causava jitter
    }

    // Initialize state
    updateNavbar(window.scrollY || 0);

    // Use passive listener for better scroll perf
    window.addEventListener('scroll', onScroll, { passive: true });

    try { window.__headerStickyInitialized = true; } catch(e) {}

    // Watchdog removido
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderSticky);
  } else {
    initHeaderSticky();
  }
})();
