/**
 * PORTFOLIO APP - RYAN RODRIGUES
 * Sistema simplificado apenas com temas - SEM TRADUÇÃO
 */

class PortfolioApp {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.typedInstance = null;
        this.mobileMenuOpen = false;
        this.projectsExpanded = false;
        
        // Bind methods
        this.toggleTheme = this.toggleTheme.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.closeMobileMenu = this.closeMobileMenu.bind(this);
        this.toggleProjects = this.toggleProjects.bind(this);
        
        this.init();
    }

    // =======================
    // INITIALIZATION
    // =======================

    init() {
        this.initTheme();
        this.setupEventListeners();
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeAfterDOM();
            });
        } else {
            this.initializeAfterDOM();
        }
    }

    initializeAfterDOM() {
        this.initTypedJS();
        this.initObserver();
        this.initBackToTop();
        this.initProjectsToggle();
        this.handleResponsive();
        
        // Mark as loaded
        document.body.classList.add('loaded');
        
        console.log('Portfolio App initialized successfully');
    }

    // =======================
    // THEME MANAGEMENT
    // =======================

    getStoredTheme() {
        const stored = localStorage.getItem('portfolio-theme');
        if (stored && ['light', 'dark', 'auto'].includes(stored)) {
            return stored;
        }
        return 'auto';
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        // Remove existing theme classes
        root.removeAttribute('data-theme');
        
        if (theme === 'auto') {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                root.setAttribute('data-theme', 'dark');
            }
        } else {
            root.setAttribute('data-theme', theme);
        }
        
        this.updateThemeIcons(theme);
    }

    updateThemeIcons(theme) {
        const themeButtons = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
        
        themeButtons.forEach(button => {
            const icon = button.querySelector('i');
            if (!icon) return;
            
            // Add rotation effect
            button.classList.add('rotating');
            setTimeout(() => button.classList.remove('rotating'), 300);
            
            // Update icon based on current effective theme
            const isDark = this.isCurrentlyDark();
            
            icon.className = '';
            if (theme === 'auto') {
                icon.className = 'fas fa-adjust';
            } else if (isDark) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }

    isCurrentlyDark() {
        if (this.currentTheme === 'dark') return true;
        if (this.currentTheme === 'light') return false;
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        this.currentTheme = themes[nextIndex];
        localStorage.setItem('portfolio-theme', this.currentTheme);
        this.applyTheme(this.currentTheme);
        
        console.log(`Theme changed to: ${this.currentTheme}`);
    }

    initTheme() {
        this.applyTheme(this.currentTheme);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.currentTheme === 'auto') {
                this.applyTheme('auto');
            }
        });
    }

    // =======================
    // TYPED.JS MANAGEMENT
    // =======================

    initTypedJS() {
        if (typeof Typed === 'undefined') {
            console.warn('Typed.js not loaded');
            return;
        }

        const typedElement = document.getElementById('typed-text');
        if (!typedElement) return;

        // Strings fixas em português
        const strings = [
            'Ryan Rodrigues!',
            'um Desenvolvedor Full Stack.',
            'especialista em tecnologias modernas.',
            'apaixonado por inovação.',
            'criativo e solucionador de problemas.'
        ];
        
        this.typedInstance = new Typed('#typed-text', {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // =======================
    // MOBILE MENU MANAGEMENT
    // =======================

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu) {
            if (this.mobileMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('block');
            } else {
                mobileMenu.classList.remove('block');
                mobileMenu.classList.add('hidden');
            }
        }
        
        if (hamburger) {
            if (this.mobileMenuOpen) {
                hamburger.classList.add('active');
            } else {
                hamburger.classList.remove('active');
            }
        }
        
        // Update ARIA
        const menuButton = document.querySelector('[aria-expanded]');
        if (menuButton) {
            menuButton.setAttribute('aria-expanded', this.mobileMenuOpen.toString());
        }
    }

    closeMobileMenu() {
        if (this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    // =======================
    // PROJECTS TOGGLE
    // =======================

    initProjectsToggle() {
        const toggleButton = document.getElementById('toggle-projects');
        if (toggleButton) {
            toggleButton.addEventListener('click', this.toggleProjects);
        }
    }

    toggleProjects(e) {
        e.preventDefault();
        
        const extraProjects = document.getElementById('extra-projects');
        const toggleButton = document.getElementById('toggle-projects');
        
        if (!extraProjects || !toggleButton) return;
        
        this.projectsExpanded = !this.projectsExpanded;
        
        if (this.projectsExpanded) {
            extraProjects.classList.remove('hidden');
            extraProjects.classList.add('grid');
            toggleButton.textContent = 'Ver menos projetos';
        } else {
            extraProjects.classList.remove('grid');
            extraProjects.classList.add('hidden');
            toggleButton.textContent = 'Ver todos os projetos';
        }
    }

    // =======================
    // EVENT LISTENERS
    // =======================

    setupEventListeners() {
        // Theme toggle buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle') || e.target.closest('.mobile-theme-toggle')) {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.hamburger')) {
                e.preventDefault();
                this.toggleMobileMenu();
            }
        });

        // Close mobile menu on link click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mobile-menu-item') && !e.target.closest('.mobile-theme-toggle')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && 
                !e.target.closest('#mobile-menu') && 
                !e.target.closest('.hamburger')) {
                this.closeMobileMenu();
            }
        });

        // Handle smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResponsive();
        });

        // Handle scroll events
        window.addEventListener('scroll', () => {
            this.updateScrollElements();
        });
    }

    // =======================
    // SCROLL MANAGEMENT
    // =======================

    initBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    updateScrollElements() {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        }

        // Update navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // =======================
    // INTERSECTION OBSERVER
    // =======================

    initObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const elementsToObserve = document.querySelectorAll(
            '.card-hover, .project-card, .skill-item, .contact-form'
        );
        
        elementsToObserve.forEach(el => observer.observe(el));
    }

    animateSkillBar(skillItem) {
        const skillBar = skillItem.querySelector('.skill-bar');
        if (skillBar) {
            const percentage = skillBar.getAttribute('data-percentage') || '0';
            setTimeout(() => {
                skillBar.style.width = percentage + '%';
            }, 200);
        }
    }

    // =======================
    // RESPONSIVE HANDLING
    // =======================

    handleResponsive() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // =======================
    // PUBLIC API
    // =======================

    // Method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method to check if dark mode is active
    isDarkMode() {
        return this.isCurrentlyDark();
    }
}

// =======================
// GLOBAL INITIALIZATION
// =======================

// Initialize the portfolio app
let portfolioApp;

document.addEventListener('DOMContentLoaded', () => {
    portfolioApp = new PortfolioApp();
    
    // Make app available globally for debugging
    if (typeof window !== 'undefined') {
        window.portfolioApp = portfolioApp;
    }
});

// Handle page load
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize any additional features that require full page load
    console.log('Portfolio fully loaded');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
