/* Mobile Menu Universal Handler */
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔧 Inicializando menu mobile...');
  
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  
  if (!hamburger) {
    console.error('❌ Botão hamburger não encontrado');
    return;
  }
  
  if (!mobileMenu) {
    console.error('❌ Menu mobile não encontrado');
    return;
  }
  
  console.log('✅ Elementos do menu mobile encontrados');
  
  // Função para mostrar/ocultar menu
  function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      // Mostrar menu
      mobileMenu.classList.remove('hidden');
      mobileMenu.style.display = 'block';
      
      // Força o layout antes da animação
      mobileMenu.offsetHeight;
      
      // Animação de entrada
      mobileMenu.style.opacity = '1';
      mobileMenu.style.transform = 'translateY(0)';
      mobileMenu.style.visibility = 'visible';
      mobileMenu.style.pointerEvents = 'all';
      
      hamburger.setAttribute('aria-expanded', 'true');
      console.log('📱 Menu aberto');
    } else {
      // Ocultar menu
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-20px)';
      mobileMenu.style.visibility = 'hidden';
      mobileMenu.style.pointerEvents = 'none';
      
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      
      hamburger.setAttribute('aria-expanded', 'false');
      console.log('📱 Menu fechado');
    }
  }
  
  // Event listener para o botão hamburger
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  });
  
  // Fechar menu ao clicar nos itens
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      setTimeout(() => {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.style.opacity = '0';
          mobileMenu.style.transform = 'translateY(-20px)';
          mobileMenu.style.visibility = 'hidden';
          mobileMenu.style.pointerEvents = 'none';
          
          setTimeout(() => {
            mobileMenu.classList.add('hidden');
          }, 300);
          
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }, 100);
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.pointerEvents = 'none';
        
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
        
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Fechar menu com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-20px)';
      mobileMenu.style.visibility = 'hidden';
      mobileMenu.style.pointerEvents = 'none';
      
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
  
  console.log('✅ Menu mobile inicializado com sucesso!');
});
