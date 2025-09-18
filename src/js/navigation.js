/* =========================================
   NAVEGAÇÃO FLUIDA E TRANSIÇÕES
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
  
  // Adicionar preloader
  function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'page-preloader hidden';
    preloader.innerHTML = '<div class="preloader-spinner"></div>';
    document.body.appendChild(preloader);
    return preloader;
  }

  const preloader = createPreloader();

  // Navegação fluida entre páginas
  function smoothNavigation() {
    const navLinks = document.querySelectorAll('a[href$=".html"], a[href^="./"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Se for link externo ou âncora, não interceptar
        if (href.startsWith('http') || href.startsWith('#')) {
          return;
        }
        
        e.preventDefault();
        
        // Mostrar preloader
        preloader.classList.remove('hidden');
        document.body.classList.add('page-loading');
        
        // Aguardar um pouco para o efeito visual
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
  }

  // Ocultar preloader quando a página carregar
  function hidePreloader() {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('page-loading');
      
      // Adicionar classe de entrada para animação
      document.body.classList.add('page-enter');
    }, 200);
  }

  // Marcar link da página atual como ativo
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-item');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage || 
           (currentPage === '' && linkPage === 'index.html') ||
           (currentPage === 'index.html' && href === '#')) {
          link.classList.add('current-page');
        }
      }
    });
  }

  // Animações de scroll
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stagger-animation');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll(
      '.skill-card-modern, .timeline-item, .project-card-modern, .education-card-modern, .certification-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));
  }

  // Melhorar performance de scroll
  function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Navegação por teclado melhorada
  function enhanceKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
      // Navegação com Alt + número
      if (e.altKey) {
        switch(e.key) {
          case '1':
            e.preventDefault();
            window.location.href = 'index.html';
            break;
          case '2':
            e.preventDefault();
            window.location.href = 'skills.html';
            break;
          case '3':
            e.preventDefault();
            window.location.href = 'experiences.html';
            break;
          case '4':
            e.preventDefault();
            window.location.href = 'projects.html';
            break;
          case '5':
            e.preventDefault();
            window.location.href = 'education.html';
            break;
        }
      }
    });
  }

  // Transições de tema suaves
  function smoothThemeTransitions() {
    const themeButtons = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
    
    themeButtons.forEach(button => {
      button.addEventListener('click', function() {
        document.body.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
          document.body.style.transition = '';
        }, 300);
      });
    });
  }

  // Lazy loading para imagens
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // Feedback visual para cliques
  function addClickFeedback() {
    document.addEventListener('click', function(e) {
      const target = e.target;
      
      if (target.matches('button, .btn, .nav-link, .mobile-menu-item')) {
        target.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          target.style.transform = '';
        }, 150);
      }
    });
  }

  // Menu móvel melhorado
  function enhanceMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('#mobile-menu');
    
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.style.opacity = '0';
          mobileMenu.style.transform = 'translateY(-10px)';
          
          setTimeout(() => {
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateY(0)';
          }, 10);
        } else {
          mobileMenu.style.opacity = '0';
          mobileMenu.style.transform = 'translateY(-10px)';
          
          setTimeout(() => {
            mobileMenu.classList.add('hidden');
          }, 200);
        }
      });
    }
  }

  // Inicializar todas as funcionalidades
  smoothNavigation();
  hidePreloader();
  setActiveNavLink();
  initScrollAnimations();
  optimizeScrollPerformance();
  enhanceKeyboardNavigation();
  smoothThemeTransitions();
  initLazyLoading();
  addClickFeedback();
  enhanceMobileMenu();

  // Adicionar classe GPU accelerated aos elementos animados
  const animatedElements = document.querySelectorAll(
    '.skill-card-modern, .timeline-item, .project-card-modern, .education-card-modern, .nav-link'
  );
  
  animatedElements.forEach(el => el.classList.add('gpu-accelerated'));

  console.log('🚀 Navegação fluida inicializada com sucesso!');
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(registration) {
        console.log('SW registrado com sucesso:', registration.scope);
      })
      .catch(function(registrationError) {
        console.log('Falha no registro do SW:', registrationError);
      });
  });
}
