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
        this.lastScrollY = 0;
        this.scrollTimeout = null;
        
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
            'Um Desenvolvedor Full Stack.',
            'Apaixonado por inovação.',
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
        const body = document.body;
        
        if (mobileMenu) {
            if (this.mobileMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('block');
                // Criar overlay
                this.createMobileOverlay();
                // Prevent scroll
                body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('block');
                mobileMenu.classList.add('hidden');
                // Remover overlay
                this.removeMobileOverlay();
                // Restore scroll
                body.style.overflow = '';
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

    createMobileOverlay() {
        if (document.querySelector('.mobile-menu-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Ativar overlay após um pequeno delay para animação
        setTimeout(() => {
            overlay.classList.add('active');
        }, 50);
        
        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });
    }

    removeMobileOverlay() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
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
            toggleButton.textContent = 'Ver mais projetos';
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

        // Update navbar background on scroll - especialmente importante no mobile
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        // Auto-hide mobile menu on scroll if open
        if (this.mobileMenuOpen && window.innerWidth <= 768) {
            // Pequeno delay para não fechar muito rapidamente
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                if (window.scrollY > this.lastScrollY + 50) {
                    this.closeMobileMenu();
                }
            }, 300);
        }
        
        this.lastScrollY = window.scrollY;
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
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize any additional features that require full page load
    console.log('Portfolio fully loaded');
});

// =========================================
// ANIMAÇÕES RESPONSIVAS
// =========================================

function initializeAnimations() {
    // Intersection Observer para animar elementos quando entram na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Skills Cards - Animação com flip
                if (target.classList.contains('skill-cards')) {
                    const skillCards = target.querySelectorAll('div');
                    skillCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-flip-in');
                            // Adicionar hover interativo (sem floating)
                            addSkillCardInteraction(card);
                        }, index * 150);
                    });
                }
                
                // Project Cards - Animação escalonada com bounce
                if (target.classList.contains('project-card') || target.closest('.grid')) {
                    if (target.classList.contains('project-card')) {
                        setTimeout(() => {
                            target.classList.add('animate-zoom-in-rotate');
                            addProjectCardInteraction(target);
                        }, 100);
                    } else {
                        const projectCards = target.querySelectorAll('.project-card');
                        projectCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate-zoom-in-rotate');
                                addProjectCardInteraction(card);
                            }, index * 120);
                        });
                    }
                }
                
                // Experience Cards - Animação suave e harmoniosa
                if (target.id === 'experience' || target.closest('#experience')) {
                    const experienceCards = target.querySelectorAll('.bg-white') || 
                                          target.closest('#experience')?.querySelectorAll('.bg-white');
                    if (experienceCards) {
                        experienceCards.forEach((card, index) => {
                            setTimeout(() => {
                                // Animação mais suave, sem alternância excessiva
                                card.classList.add('animate-slide-in-scale');
                                addExperienceCardInteraction(card);
                            }, index * 150);
                        });
                    }
                }

                // Personal Experience Cards - Animação mais suave
                if (target.id === 'experience-personal' || target.closest('#experience-personal')) {
                    const personalCards = target.querySelectorAll('.bg-white') || 
                                        target.closest('#experience-personal')?.querySelectorAll('.bg-white');
                    if (personalCards) {
                        personalCards.forEach((card, index) => {
                            setTimeout(() => {
                                // Animação mais suave e consistente
                                card.classList.add('animate-slide-in-scale');
                                addExperienceCardInteraction(card);
                            }, index * 150);
                        });
                    }
                }

                // Education Cards - Animação com escala
                if (target.id === 'education' || target.closest('#education')) {
                    const educationCards = target.querySelectorAll('.education-card') ||
                                         target.closest('#education')?.querySelectorAll('.education-card');
                    if (educationCards) {
                        educationCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate-slide-in-scale');
                                addEducationCardInteraction(card);
                            }, index * 180);
                        });
                    }
                }

                // Education Grid fallback
                if (target.classList.contains('education-grid')) {
                    const educationCards = target.querySelectorAll('.education-card');
                    educationCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-slide-in-scale');
                            addEducationCardInteraction(card);
                        }, index * 180);
                    });
                }
                
                // Generic fade-in for other elements
                if (target.dataset.animate === 'fade-in') {
                    target.classList.add('animate-fade-in');
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observar seções principais
    const sectionsToAnimate = [
        document.querySelector('.skill-cards'),
        document.querySelector('.projects-grid'),
        document.getElementById('experience'),
        document.getElementById('experience-personal'),
        document.getElementById('education'),
        document.querySelector('.education-grid'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('[data-animate="fade-in"]')
    ].filter(Boolean);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // Adicionar classes iniciais para preparar animações
    initializeCardStates();
}

// =========================================
// INTERAÇÕES AVANÇADAS PARA CARDS
// =========================================

function addSkillCardInteraction(card) {
    card.addEventListener('mouseenter', () => {
        // Efeito de "respiração" nos ícones
        const icons = card.querySelectorAll('i');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'pulse 0.6s ease-in-out';
            }, index * 100);
        });
        
        // Efeito de borda gradiente
        card.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
        card.style.borderImage = 'linear-gradient(45deg, #84d917, #94e327) 1';
    });

    card.addEventListener('mouseleave', () => {
        const icons = card.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.animation = '';
        });
        card.style.background = '';
        card.style.borderImage = '';
    });

    // Efeito de clique
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
}

function addProjectCardInteraction(card) {
    const overlay = card.querySelector('.project-overlay');
    const image = card.querySelector('img');
    const tags = card.querySelectorAll('.project-tag');

    card.addEventListener('mouseenter', () => {
        // Animação sequencial das tags
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
                tag.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
            }, index * 50);
        });

        // Efeito parallax na imagem
        if (image) {
            image.style.transform = 'scale(1.1) translateZ(0)';
        }
    });

    card.addEventListener('mouseleave', () => {
        tags.forEach(tag => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
        });
        
        if (image) {
            image.style.transform = '';
        }
    });

    // Efeito de ondulação no clique
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(22, 163, 74, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

function addExperienceCardInteraction(card) {
    const tags = card.querySelectorAll('.project-tag');

    card.addEventListener('mouseenter', () => {
        // Efeito de cascata nas tags
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(0.95) rotateX(10deg)';
                tag.style.opacity = '0.8';
            }, index * 30);
        });

        // Adicionar indicador visual
        const indicator = card.querySelector('.experience-indicator');
        if (!indicator) {
            const newIndicator = document.createElement('div');
            newIndicator.className = 'experience-indicator';
            newIndicator.style.cssText = `
                position: absolute;
                left: -5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 60%;
                background: linear-gradient(to bottom, #84d917, #94e327);
                border-radius: 0 5px 5px 0;
                opacity: 0;
                transition: all 0.3s ease;
            `;
            card.style.position = 'relative';
            card.appendChild(newIndicator);
            
            setTimeout(() => {
                newIndicator.style.opacity = '1';
            }, 100);
        }
    });

    card.addEventListener('mouseleave', () => {
        tags.forEach(tag => {
            tag.style.transform = '';
            tag.style.opacity = '';
        });

        const indicator = card.querySelector('.experience-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }
    });
}

function addEducationCardInteraction(card) {
    const icon = card.querySelector('i');

    card.addEventListener('mouseenter', () => {
        if (icon) {
            icon.style.animation = 'bounce 1s infinite';
            icon.style.color = '#84d917';
        }

        // Efeito de brilho
        card.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
        card.style.boxShadow = '0 10px 25px rgba(22, 163, 74, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)';
    });

    card.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.animation = '';
            icon.style.color = '';
        }
        card.style.background = '';
        card.style.boxShadow = '';
    });
}

function initializeCardStates() {
    // Preparar todos os cards para animação
    const allCards = [
        ...document.querySelectorAll('.skill-cards > div'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('#experience .bg-white'),
        ...document.querySelectorAll('#experience-personal .bg-white'),
        ...document.querySelectorAll('.education-card')
    ];

    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.3s ease';
    });
}

// =========================================
// CSS DINÂMICO PARA ANIMAÇÕES
// =========================================

// Adicionar keyframes dinâmicos
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// =========================================
// CURSOR INTERATIVO
// =========================================

function initializeCursorEffects() {
    const interactiveElements = document.querySelectorAll(`
        .skill-cards > div,
        .project-card,
        #experience .bg-white,
        #experience-personal .bg-white,
        .education-card
    `);

    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
        });

        element.addEventListener('mouseleave', () => {
            element.style.setProperty('--mouse-x', '50%');
            element.style.setProperty('--mouse-y', '50%');
        });
    });
}

// =========================================
// PARALLAX SCROLLING SUAVE
// =========================================

function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.skill-cards > div, .project-card');
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const speed = 0.5 + (index * 0.1);
                const yPos = scrollTop * speed * 0.1;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    };

    // Throttle scroll events para performance
    let ticking = false;
    const throttledScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
}

// =========================================
// SYSTEM DE PARTÍCULAS DINÂMICO
// =========================================

function addParticleEffects() {
    const cards = document.querySelectorAll('.skill-cards > div, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createParticles(card);
        });
    });
}

function createParticles(container) {
    const particles = document.createElement('div');
    particles.className = 'card-particles';
    
    // Criar múltiplas partículas
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: radial-gradient(circle, #84d917, #94e327);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float 2s ease-out infinite;
            animation-delay: ${i * 0.5}s;
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
        `;
        particles.appendChild(particle);
    }
    
    container.style.position = 'relative';
    container.appendChild(particles);
    
    // Remover partículas após animação
    setTimeout(() => {
        if (particles.parentNode) {
            particles.remove();
        }
    }, 3000);
}

// =========================================
// LAZY LOADING PARA IMAGENS
// =========================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// =========================================
// PERFORMANCE MONITORING
// =========================================

function initializePerformanceOptimizations() {
    // Detectar dispositivos com baixa performance
    const isLowPerformance = () => {
        return navigator.hardwareConcurrency <= 2 || 
               navigator.deviceMemory <= 4 ||
               /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    if (isLowPerformance()) {
        // Reduzir animações em dispositivos baixa performance
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        document.documentElement.classList.add('low-performance');
        
        // Desabilitar parallax em mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .floating-card { animation: none !important; }
                * { will-change: auto !important; }
            }
        `;
        document.head.appendChild(style);
    }
}

// =========================================
// SMOOTH SCROLL NAVIGATION
// =========================================

function initializeSmoothNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Adicionar efeito de highlight ao target
                targetElement.style.boxShadow = '0 0 20px rgba(22, 163, 74, 0.3)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 2000);

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =========================================
// INICIALIZAÇÃO GERAL
// =========================================

// =========================================
// CURSOR CUSTOMIZADO INTERATIVO
// =========================================

function initializeCustomCursor() {
    // Verificar se é dispositivo com mouse e tela adequada
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
        return; // Sair se for touch device ou mobile
    }

    const cursor = document.createElement('div');
    const cursorTrail = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorTrail.className = 'cursor-trail';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let isMoving = false;

    // Atualizar posição do mouse com throttling para performance
    let lastMoveTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMoveTime < 6) return; // ~165fps max
        lastMoveTime = now;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Cursor principal segue imediatamente usando transform
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    }, { passive: true });

    // Animação ultra-suave do trail com RAF otimizado
    let rafId;
    let lastFrame = 0;
    
    function animateTrail(currentTime) {
        // Limitar a 120fps para suavidade
        if (currentTime - lastFrame < 8.33) {
            rafId = requestAnimationFrame(animateTrail);
            return;
        }
        lastFrame = currentTime;
        
        // Trail segue com easing dinâmico
        const ease = isMoving ? 0.28 : 0.12;
        trailX += (mouseX - trailX) * ease;
        trailY += (mouseY - trailY) * ease;
        
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
        
        // Controle inteligente da animação
        const distance = Math.abs(mouseX - trailX) + Math.abs(mouseY - trailY);
        if (distance > 0.5) {
            rafId = requestAnimationFrame(animateTrail);
        } else {
            isMoving = false;
            rafId = requestAnimationFrame(animateTrail); // Manter rodando
        }
    }
    rafId = requestAnimationFrame(animateTrail);

    // Cache de seletores para performance máxima
    const interactiveSelector = 'a, button, .project-card, .skill-cards > div, .mobile-menu-item, .theme-toggle, input, textarea, [role="button"], .interactive-card, .contact-btn, .btn, .skill-card, .social-link';
    
    let currentState = '';
    let isClicking = false;

    // Otimizar event delegation
    document.addEventListener('mouseover', (e) => {
        const element = e.target.closest(interactiveSelector);
        if (!element) return;
        
        let newState = 'hover';
        
        // Determinar estado específico baseado no elemento
        if (element.matches('button, .btn, a[href], .contact-btn, .social-link')) {
            newState = 'button';
        } else if (element.matches('input[type="text"], input[type="email"], textarea')) {
            newState = 'text';
        }
        
        // Aplicar apenas se o estado mudou
        if (currentState !== newState) {
            cursor.className = `custom-cursor ${newState}`;
            cursorTrail.className = `cursor-trail ${newState}`;
            currentState = newState;
        }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        const element = e.target.closest(interactiveSelector);
        if (!element) return;
        
        cursor.className = 'custom-cursor';
        cursorTrail.className = 'cursor-trail';
        currentState = '';
    }, { passive: true });

    // Efeito de clique ultra-responsivo
    document.addEventListener('mousedown', (e) => {
        if (isClicking) return;
        isClicking = true;
        
        cursor.classList.add('click');
        cursorTrail.classList.add('click');
        
        // Criar partículas com base na performance do dispositivo
        const particleCount = navigator.hardwareConcurrency > 4 ? 8 : 6;
        createParticleEffect(mouseX, mouseY, particleCount);
    }, { passive: true });

    document.addEventListener('mouseup', () => {
        if (!isClicking) return;
        isClicking = false;
        
        // Delay mínimo para transição suave
        setTimeout(() => {
            cursor.classList.remove('click');
            cursorTrail.classList.remove('click');
        }, 40);
    }, { passive: true });

    // Esconder/mostrar cursor otimizado
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    }, { passive: true });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '1';
    }, { passive: true });

    // Cleanup na saída
    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
    });
}

function createParticleEffect(x, y, count = 6) {
    // Pool de partículas para reutilização e melhor performance
    const particlePool = window.particlePool || [];
    window.particlePool = particlePool;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            let particle = particlePool.pop();
            
            if (!particle) {
                particle = document.createElement('div');
                particle.className = 'cursor-particle';
            }
            
            // Posicionamento mais dinâmico
            const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
            const velocity = 18 + Math.random() * 25;
            const offsetX = Math.cos(angle) * velocity;
            const offsetY = Math.sin(angle) * velocity;
            
            // Reset inicial
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = '1';
            particle.style.transform = 'scale(1) translateY(0)';
            
            document.body.appendChild(particle);
            
            // Forçar reflow para garantir posição inicial
            particle.offsetHeight;
            
            // Aplicar animação final
            particle.style.transform = `translate(${offsetX}px, ${offsetY - 35}px) scale(0.3)`;
            particle.style.opacity = '0';
            
            // Cleanup e retorno ao pool
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                
                // Reset para reutilização
                particle.style.transform = '';
                particle.style.opacity = '';
                particle.style.left = '';
                particle.style.top = '';
                
                // Retornar ao pool (máximo 15 para não usar muita memória)
                if (particlePool.length < 15) {
                    particlePool.push(particle);
                }
            }, 800);
        }, i * 12); // Stagger para efeito mais natural
    }
}

// Adicionar todas as inicializações ao window load
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize all advanced features
    initializeAnimations();
    initializeCursorEffects();
    initializeParallaxEffects();
    addParticleEffects();
    initializeLazyLoading();
    initializePerformanceOptimizations();
    initializeSmoothNavigation();
    initializeCustomCursor(); // Adicionar cursor customizado
    
    // Initialize any additional features that require full page load
    console.log('Portfolio fully loaded with advanced interactions and custom cursor');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
