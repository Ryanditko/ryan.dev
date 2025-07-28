/**
 * PORTFOLIO APP - RYAN RODRIGUES
 * Sistema completo de portfólio com tradução e temas
 * Versão corrigida para resolver bugs de funcionalidade
 */

class PortfolioApp {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.currentLang = this.getStoredLanguage();
        this.typedInstance = null;
        this.mobileMenuOpen = false;
        
        // Bind methods
        this.toggleTheme = this.toggleTheme.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.closeMobileMenu = this.closeMobileMenu.bind(this);
        
        this.init();
    }

    // =======================
    // INITIALIZATION
    // =======================

    init() {
        this.initTheme();
        this.setupEventListeners();
        this.initLanguage();
        
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
    // LANGUAGE MANAGEMENT
    // =======================

    getStoredLanguage() {
        const stored = localStorage.getItem('portfolio-lang');
        if (stored && ['pt', 'en'].includes(stored)) {
            return stored;
        }
        // Try to detect user language
        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('pt') ? 'pt' : 'en';
    }

    translations = {
        pt: {
            // Navigation
            'nav-home': 'Início',
            'nav-about': 'Sobre',
            'nav-skills': 'Habilidades',
            'nav-projects': 'Projetos',
            'nav-contact': 'Contato',
            
            // Hero Section
            'hero-greeting': 'Olá! Eu sou',
            'hero-name': 'Ryan Rodrigues',
            'hero-typed': [
                'Ryan Rodrigues!',
                'um Desenvolvedor Full Stack.',
                'especialista em tecnologias modernas.',
                'apaixonado por inovação.',
                'criativo e solucionador de problemas.'
            ],
            'hero-description': 'Desenvolvedor Full Stack especializado em criar soluções web modernas e inovadoras. Transformo ideias em realidade através de código limpo e design intuitivo.',
            'hero-cta': 'Ver Projetos',
            'hero-contact': 'Entre em Contato',
            
            // About Section
            'about-title': 'Sobre Mim',
            'about-intro': 'Desenvolvedor Full Stack Apaixonado',
            'about-description': 'Sou um desenvolvedor Full Stack com experiência em tecnologias modernas, focado em criar soluções inovadoras e interfaces intuitivas. Minha paixão é transformar ideias complexas em aplicações simples e eficientes.',
            'about-experience': 'Anos de Experiência',
            'about-projects': 'Projetos Concluídos',
            'about-clients': 'Clientes Satisfeitos',
            
            // Skills Section
            'skills-title': 'Minhas Habilidades',
            'skills-subtitle': 'Tecnologias e Ferramentas',
            'skills-frontend': 'Frontend',
            'skills-backend': 'Backend',
            'skills-database': 'Banco de Dados',
            'skills-tools': 'Ferramentas',
            
            // Projects Section
            'projects-title': 'Meus Projetos',
            'projects-subtitle': 'Alguns dos meus trabalhos recentes',
            'projects-view': 'Ver Projeto',
            'projects-more': 'Ver Mais Projetos',
            
            // Contact Section
            'contact-title': 'Entre em Contato',
            'contact-subtitle': 'Vamos conversar sobre seu próximo projeto',
            'contact-name': 'Nome',
            'contact-email': 'Email',
            'contact-subject': 'Assunto',
            'contact-message': 'Mensagem',
            'contact-send': 'Enviar Mensagem',
            'contact-info': 'Informações de Contato',
            'contact-description': 'Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato!',
            'contact-phone': 'Telefone',
            'contact-email-label': 'Email',
            'contact-location': 'Localização',
            
            // Footer
            'footer-text': '© 2024 Ryan Rodrigues. Todos os direitos reservados.',
            
            // Theme and Language
            'theme-toggle': 'Alternar tema',
            'lang-toggle': 'Alterar idioma',
            'lang-current': 'PT'
        },
        
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-skills': 'Skills',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            
            // Hero Section
            'hero-greeting': 'Hello! I am',
            'hero-name': 'Ryan Rodrigues',
            'hero-typed': [
                'Ryan Rodrigues!',
                'a Full Stack Developer.',
                'expert in modern technologies.',
                'passionate about innovation.',
                'creative problem solver.'
            ],
            'hero-description': 'Full Stack Developer specialized in creating modern and innovative web solutions. I transform ideas into reality through clean code and intuitive design.',
            'hero-cta': 'View Projects',
            'hero-contact': 'Get in Touch',
            
            // About Section
            'about-title': 'About Me',
            'about-intro': 'Passionate Full Stack Developer',
            'about-description': 'I am a Full Stack Developer with experience in modern technologies, focused on creating innovative solutions and intuitive interfaces. My passion is transforming complex ideas into simple and efficient applications.',
            'about-experience': 'Years of Experience',
            'about-projects': 'Completed Projects',
            'about-clients': 'Satisfied Clients',
            
            // Skills Section
            'skills-title': 'My Skills',
            'skills-subtitle': 'Technologies and Tools',
            'skills-frontend': 'Frontend',
            'skills-backend': 'Backend',
            'skills-database': 'Database',
            'skills-tools': 'Tools',
            
            // Projects Section
            'projects-title': 'My Projects',
            'projects-subtitle': 'Some of my recent work',
            'projects-view': 'View Project',
            'projects-more': 'View More Projects',
            
            // Contact Section
            'contact-title': 'Get in Touch',
            'contact-subtitle': 'Let\'s talk about your next project',
            'contact-name': 'Name',
            'contact-email': 'Email',
            'contact-subject': 'Subject',
            'contact-message': 'Message',
            'contact-send': 'Send Message',
            'contact-info': 'Contact Information',
            'contact-description': 'I\'m always open to new opportunities and interesting projects. Get in touch!',
            'contact-phone': 'Phone',
            'contact-email-label': 'Email',
            'contact-location': 'Location',
            
            // Footer
            'footer-text': '© 2024 Ryan Rodrigues. All rights reserved.',
            
            // Theme and Language
            'theme-toggle': 'Toggle theme',
            'lang-toggle': 'Change language',
            'lang-current': 'EN'
        }
    };

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.language-toggle, .mobile-language-toggle');
        
        langButtons.forEach(button => {
            const langText = button.querySelector('.lang-text');
            if (langText) {
                langText.textContent = this.translations[this.currentLang]['lang-current'];
            }
        });
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLang][key];
            
            if (translation) {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update language buttons
        this.updateLanguageButtons();
        
        // Update Typed.js if it exists
        this.updateTypedJS();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
        localStorage.setItem('portfolio-lang', this.currentLang);
        this.applyTranslations();
        
        console.log(`Language changed to: ${this.currentLang}`);
    }

    initLanguage() {
        this.applyTranslations();
    }

    // =======================
    // TYPED.JS MANAGEMENT
    // =======================

    initTypedJS() {
        if (typeof Typed === 'undefined') {
            console.warn('Typed.js not loaded');
            return;
        }

        this.updateTypedJS();
    }

    updateTypedJS() {
        // Destroy existing instance
        if (this.typedInstance) {
            this.typedInstance.destroy();
            this.typedInstance = null;
        }

        const typedElement = document.getElementById('typed-text');
        if (!typedElement) return;

        // Get current language strings
        const strings = this.translations[this.currentLang]['hero-typed'];
        
        // Wait a bit before creating new instance
        setTimeout(() => {
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
        }, 100);
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

        // Language toggle buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.language-toggle') || e.target.closest('.mobile-language-toggle')) {
                e.preventDefault();
                this.toggleLanguage();
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
            if (e.target.closest('.mobile-menu-item') && !e.target.closest('.mobile-theme-toggle') && !e.target.closest('.mobile-language-toggle')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            
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
            } else {
                backToTopButton.classList.add('hidden');
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
    // UTILITY METHODS
    // =======================

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // =======================
    // PUBLIC API
    // =======================

    // Method to manually update translations (for external use)
    updateTranslations() {
        this.applyTranslations();
    }

    // Method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method to get current language
    getCurrentLanguage() {
        return this.currentLang;
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
