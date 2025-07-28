/**
 * PORTFOLIO THEME MANAGER - RYAN RODRIGUES
 * Advanced theme management with system preference detection,
 * smooth transitions, and accessibility features
 */

class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'auto'];
    this.currentTheme = this.getStoredTheme();
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.updateThemeIcons();
    this.handleSystemThemeChange();
  }

  /**
   * Get stored theme from localStorage or default to 'auto'
   */
  getStoredTheme() {
    const stored = localStorage.getItem('portfolio-theme');
    return this.themes.includes(stored) ? stored : 'auto';
  }

  /**
   * Store theme preference in localStorage
   */
  setStoredTheme(theme) {
    localStorage.setItem('portfolio-theme', theme);
  }

  /**
   * Get the effective theme (resolves 'auto' to 'light' or 'dark')
   */
  getEffectiveTheme(theme = this.currentTheme) {
    if (theme === 'auto') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }
    return theme;
  }

  /**
   * Apply theme to the document
   */
  applyTheme(theme) {
    const effectiveTheme = this.getEffectiveTheme(theme);
    const html = document.documentElement;
    
    // Remove existing theme classes
    html.removeAttribute('data-theme');
    html.classList.remove('light', 'dark');
    
    // Apply new theme
    html.setAttribute('data-theme', effectiveTheme);
    html.classList.add(effectiveTheme);
    
    // Update current theme
    this.currentTheme = theme;
    this.setStoredTheme(theme);
    
    // Trigger custom event for theme change
    this.dispatchThemeChangeEvent(effectiveTheme);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(effectiveTheme);
    
    // Announce theme change to screen readers
    this.announceThemeChange(effectiveTheme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const effectiveTheme = this.getEffectiveTheme();
    const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
    
    // Add rotation animation to theme toggle buttons
    this.animateThemeToggle();
    
    // Apply new theme with a slight delay for better UX
    setTimeout(() => {
      this.applyTheme(newTheme);
      this.updateThemeIcons();
    }, 150);
  }

  /**
   * Set specific theme
   */
  setTheme(theme) {
    if (this.themes.includes(theme)) {
      this.applyTheme(theme);
      this.updateThemeIcons();
    }
  }

  /**
   * Update theme toggle icons
   */
  updateThemeIcons() {
    const effectiveTheme = this.getEffectiveTheme();
    const icons = document.querySelectorAll('.theme-icon');
    
    icons.forEach(icon => {
      // Remove existing classes
      icon.classList.remove('fa-moon', 'fa-sun', 'fa-circle-half-stroke');
      
      // Add appropriate icon based on current theme
      if (this.currentTheme === 'auto') {
        icon.classList.add('fa-circle-half-stroke');
      } else if (effectiveTheme === 'dark') {
        icon.classList.add('fa-sun');
      } else {
        icon.classList.add('fa-moon');
      }
    });

    // Update button aria-labels
    const toggleButtons = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
    toggleButtons.forEach(button => {
      const newLabel = this.getThemeToggleLabel(effectiveTheme);
      button.setAttribute('aria-label', newLabel);
    });
  }

  /**
   * Get appropriate aria-label for theme toggle button
   */
  getThemeToggleLabel(theme) {
    const labels = {
      light: 'Alternar para modo escuro',
      dark: 'Alternar para modo claro',
      auto: 'Alternar tema'
    };
    
    if (this.currentTheme === 'auto') {
      return 'Alternar tema (automático)';
    }
    
    return labels[theme] || 'Alternar tema';
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Desktop theme toggle
    const desktopToggle = document.getElementById('theme-toggle');
    if (desktopToggle) {
      desktopToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile theme toggle
    const mobileToggle = document.getElementById('mobile-theme-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
        this.updateThemeIcons();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + T to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  /**
   * Handle system theme change
   */
  handleSystemThemeChange() {
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.currentTheme === 'auto') {
        const newTheme = e.matches ? 'dark' : 'light';
        this.dispatchThemeChangeEvent(newTheme);
        this.updateMetaThemeColor(newTheme);
      }
    });
  }

  /**
   * Animate theme toggle button
   */
  animateThemeToggle() {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
      button.classList.add('rotating');
      setTimeout(() => {
        button.classList.remove('rotating');
      }, 300);
    });
  }

  /**
   * Dispatch custom theme change event
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: { 
        theme,
        previousTheme: this.getEffectiveTheme()
      }
    });
    document.dispatchEvent(event);
  }

  /**
   * Update meta theme-color for mobile browsers
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    const colors = {
      light: '#ffffff',
      dark: '#1e293b'
    };
    
    metaThemeColor.content = colors[theme] || colors.light;
  }

  /**
   * Announce theme change to screen readers
   */
  announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Tema alterado para ${theme === 'dark' ? 'escuro' : 'claro'}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Get current theme info
   */
  getThemeInfo() {
    return {
      current: this.currentTheme,
      effective: this.getEffectiveTheme(),
      system: this.mediaQuery.matches ? 'dark' : 'light',
      available: this.themes
    };
  }
}

/**
 * Mobile Menu Manager
 */
class MobileMenuManager {
  constructor() {
    this.menuButton = document.getElementById('menu-btn');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.isOpen = false;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }

  setupEventListeners() {
    if (this.menuButton) {
      this.menuButton.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu when clicking on menu items
    const menuItems = this.mobileMenu?.querySelectorAll('a');
    menuItems?.forEach(item => {
      item.addEventListener('click', () => this.closeMenu());
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.mobileMenu?.contains(e.target) && !this.menuButton?.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu on window resize if desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  setupKeyboardNavigation() {
    if (!this.mobileMenu) return;

    const focusableElements = this.mobileMenu.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element, index) => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && index === 0) {
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
          } else if (!e.shiftKey && index === focusableElements.length - 1) {
            e.preventDefault();
            focusableElements[0].focus();
          }
        }
      });
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (!this.mobileMenu) return;
    
    this.isOpen = true;
    this.mobileMenu.classList.remove('hidden');
    this.menuButton?.classList.add('active');
    this.menuButton?.setAttribute('aria-expanded', 'true');
    
    // Focus first menu item
    const firstMenuItem = this.mobileMenu.querySelector('a, button');
    firstMenuItem?.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    if (!this.mobileMenu) return;
    
    this.isOpen = false;
    this.mobileMenu.classList.add('hidden');
    this.menuButton?.classList.remove('active');
    this.menuButton?.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to menu button
    this.menuButton?.focus();
  }
}

/**
 * Initialize managers when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Initialize mobile menu manager
  window.mobileMenuManager = new MobileMenuManager();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (window.mobileMenuManager.isOpen) {
          window.mobileMenuManager.closeMenu();
        }
      }
    });
  });
  
  // Add loading states and animations
  document.body.classList.add('loaded');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeManager, MobileMenuManager };
}
