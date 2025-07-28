/**
 * PORTFOLIO UTILITIES - RYAN RODRIGUES
 * Collection of utility functions and classes for enhanced UX
 */

/**
 * Performance Monitor
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      this.measurePageLoad();
    });

    // Monitor Core Web Vitals
    this.measureWebVitals();
  }

  measurePageLoad() {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    this.metrics.pageLoad = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalTime: navigation.loadEventEnd - navigation.fetchStart
    };

    console.log('Page Load Metrics:', this.metrics.pageLoad);
  }

  measureWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.fid = entry.processingStart - entry.startTime;
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
    }).observe({ entryTypes: ['layout-shift'] });
  }

  getMetrics() {
    return this.metrics;
  }
}

/**
 * Intersection Observer Manager
 */
class IntersectionManager {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupAnimationObserver();
    this.setupLazyLoadingObserver();
    this.setupNavigationHighlighter();
  }

  setupAnimationObserver() {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animationObserver.observe(el);
    });

    this.observers.set('animation', animationObserver);
  }

  setupLazyLoadingObserver() {
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              img.classList.add('loaded');
              lazyObserver.unobserve(img);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      lazyObserver.observe(img);
    });

    this.observers.set('lazy', lazyObserver);
  }

  setupNavigationHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    const highlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding nav link
            const correspondingLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (correspondingLink) {
              correspondingLink.classList.add('active');
            }
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach(section => {
      highlightObserver.observe(section);
    });

    this.observers.set('navigation', highlightObserver);
  }

  addObserver(name, observer) {
    this.observers.set(name, observer);
  }

  getObserver(name) {
    return this.observers.get(name);
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

/**
 * Accessibility Manager
 */
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupKeyboardNavigation();
    this.setupAriaUpdates();
  }

  setupSkipLinks() {
    // Create skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupFocusManagement() {
    // Trap focus in modals and mobile menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
        const mobileMenu = document.querySelector('#mobile-menu:not(.hidden)');
        
        if (modal) {
          this.trapFocus(e, modal);
        } else if (mobileMenu) {
          this.trapFocus(e, mobileMenu);
        }
      }
    });
  }

  trapFocus(event, container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  setupKeyboardNavigation() {
    // Arrow key navigation for card grids
    document.querySelectorAll('.grid').forEach(grid => {
      const cards = grid.querySelectorAll('.card, .project-card, .skill-card');
      
      cards.forEach((card, index) => {
        card.addEventListener('keydown', (e) => {
          let newIndex = index;
          
          switch (e.key) {
            case 'ArrowRight':
              newIndex = Math.min(index + 1, cards.length - 1);
              break;
            case 'ArrowLeft':
              newIndex = Math.max(index - 1, 0);
              break;
            case 'ArrowDown':
              // Move to next row (assuming 3 columns on desktop)
              newIndex = Math.min(index + 3, cards.length - 1);
              break;
            case 'ArrowUp':
              // Move to previous row
              newIndex = Math.max(index - 3, 0);
              break;
            default:
              return;
          }
          
          if (newIndex !== index) {
            e.preventDefault();
            cards[newIndex].focus();
          }
        });
      });
    });
  }

  setupAriaUpdates() {
    // Update aria-current for pagination or tabs
    document.addEventListener('click', (e) => {
      if (e.target.matches('[role="tab"], .pagination-link')) {
        const container = e.target.closest('[role="tablist"], .pagination');
        if (container) {
          container.querySelectorAll('[aria-current]').forEach(el => {
            el.removeAttribute('aria-current');
          });
          e.target.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

/**
 * Form Validation Manager
 */
class FormValidationManager {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      this.setupFormValidation(form);
    });
  }

  setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearErrors(input));
    });

    form.addEventListener('submit', (e) => {
      if (!this.validateForm(form)) {
        e.preventDefault();
      }
    });
  }

  validateField(field) {
    const errors = [];
    const value = field.value.trim();

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errors.push('Este campo é obrigatório');
    }

    // Email validation
    if (field.type === 'email' && value && !this.isValidEmail(value)) {
      errors.push('Por favor, insira um email válido');
    }

    // Phone validation
    if (field.type === 'tel' && value && !this.isValidPhone(value)) {
      errors.push('Por favor, insira um telefone válido');
    }

    // Custom pattern validation
    if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
      errors.push(field.dataset.patternMessage || 'Formato inválido');
    }

    this.displayFieldErrors(field, errors);
    return errors.length === 0;
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  displayFieldErrors(field, errors) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    if (errors.length > 0) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');

      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error text-red-600 text-sm mt-1';
      errorDiv.textContent = errors[0];
      errorDiv.setAttribute('role', 'alert');

      field.parentNode.appendChild(errorDiv);
    } else {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    }
  }

  clearErrors(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
}

/**
 * Scroll Manager
 */
class ScrollManager {
  constructor() {
    this.scrollPosition = 0;
    this.isScrolling = false;
    this.init();
  }

  init() {
    this.setupScrollToTop();
    this.setupSmoothScrolling();
    this.setupScrollProgress();
    this.setupScrollDirection();
  }

  setupScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('opacity-0');
        scrollToTopBtn.classList.add('opacity-100');
      } else {
        scrollToTopBtn.classList.remove('opacity-100');
        scrollToTopBtn.classList.add('opacity-0');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  setupSmoothScrolling() {
    // Already handled in theme-manager.js
  }

  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-primary-light z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      progressBar.style.width = scrolled + '%';
    });
  }

  setupScrollDirection() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down
        navbar?.classList.add('nav-hidden');
      } else {
        // Scrolling up
        navbar?.classList.remove('nav-hidden');
      }
      
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
  }
}

/**
 * Initialize all managers
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize utilities
  window.performanceMonitor = new PerformanceMonitor();
  window.intersectionManager = new IntersectionManager();
  window.accessibilityManager = new AccessibilityManager();
  window.formValidationManager = new FormValidationManager();
  window.scrollManager = new ScrollManager();
  
  // Add CSS for scroll behavior
  const style = document.createElement('style');
  style.textContent = `
    .nav-hidden {
      transform: translateY(-100%);
      transition: transform 0.3s ease-in-out;
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    img.lazy {
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    img.loaded {
      opacity: 1;
    }
    
    .field-error {
      animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PerformanceMonitor,
    IntersectionManager,
    AccessibilityManager,
    FormValidationManager,
    ScrollManager
  };
}
