// Configuração do ScrollReveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
});

// Animações de entrada
sr.reveal('.title', {
    origin: 'left',
    delay: 500
});

sr.reveal('.description', {
    origin: 'right',
    delay: 600
});

sr.reveal('#banner', {
    origin: 'bottom',
    delay: 800
});

sr.reveal('.dish', {
    origin: 'bottom',
    interval: 100,
    delay: 300
});

sr.reveal('.feedback', {
    origin: 'left',
    interval: 200
});

sr.reveal('.section-title', {
    origin: 'top',
    delay: 300
});

sr.reveal('.nav-link', {
    origin: 'top',
    interval: 200,
    delay: 100
});

sr.reveal('.faq-item', {
    origin: 'bottom',
    interval: 150
});

sr.reveal('#newsletter-form', {
    origin: 'bottom',
    delay: 400
});

sr.reveal('footer *', {
    origin: 'bottom',
    interval: 200
});

// Animação flutuante para imagens de produtos
const dishImages = document.querySelectorAll('.linkedin.png');
let isUp = true;

setInterval(() => {
    dishImages.forEach(img => {
        img.style.transform = `translateY(${isUp ? 0 : 10}px)`;
        img.style.transition = 'transform 1.5s ease-in-out';
    });
    isUp = !isUp;
}, 1500); 