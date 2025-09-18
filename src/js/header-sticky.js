// Header Sticky Behavior - Enhanced
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  let isScrollingDown = false;
  let isAtTop = true;

  // Function to handle scroll behavior
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Check if we're at the top
    isAtTop = scrollTop <= 50;
    
    // Add scrolled class when scrolling down
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Always keep navbar visible - remove hide/show behavior
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';

    lastScrollTop = scrollTop;
  }

  // Throttled scroll handler for performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll event listener
  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-menu-item[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Enhanced mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Toggle menu
      mobileMenu.classList.toggle('hidden');
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Add animation class
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.animation = 'slideDown 0.3s ease-out';
      }
      
      // Close menu when clicking outside
      if (!mobileMenu.classList.contains('hidden')) {
        document.addEventListener('click', function closeMenu(e) {
          if (!navbar.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            hamburger.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', closeMenu);
          }
        });
      }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Add active page highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-link, .mobile-menu-item');
  
  navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('current-page');
    }
  });

  // Initial call
  handleScroll();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    }
  }
});

// Intersection Observer for performance (optional enhancement)
if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '-50px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      const navbar = document.querySelector('.navbar');
      if (entry.isIntersecting) {
        navbar.classList.remove('scrolled');
      } else {
        navbar.classList.add('scrolled');
      }
    });
  }, observerOptions);

  // Observe a sentinel element at the top of the page
  const sentinel = document.createElement('div');
  sentinel.style.height = '50px';
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  sentinel.style.width = '100%';
  document.body.insertBefore(sentinel, document.body.firstChild);
  observer.observe(sentinel);
}
