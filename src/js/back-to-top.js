// Back to Top Button Controller - Enhanced
document.addEventListener('DOMContentLoaded', function() {
  console.log('Back to top script loaded');
  
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) {
    console.error('Back to top button not found!');
    return;
  }

  console.log('Back to top button found:', backToTopBtn);

  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 200) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  // Smooth scroll to top
  function scrollToTop(e) {
    e.preventDefault();
    console.log('Scrolling to top...');
    
    // Método mais compatível
    const scrollToTopSmooth = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTopSmooth);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    };
    
    // Tentar primeiro com behavior smooth
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback para navegadores mais antigos
      scrollToTopSmooth();
    }
  }

  // Throttled scroll event listener for performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        toggleBackToTopButton();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Event listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTopBtn.addEventListener('click', scrollToTop);

  // Initial check
  toggleBackToTopButton();
  
  console.log('Back to top event listeners attached');
});
