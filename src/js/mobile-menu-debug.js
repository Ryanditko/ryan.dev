/* Debug Script for Mobile Menu */
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔧 Debug: Mobile Menu Check Starting...');
  
  // Check if elements exist
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  
  console.log('🍔 Hamburger button:', hamburger ? '✅ Found' : '❌ Not found');
  console.log('📱 Mobile menu:', mobileMenu ? '✅ Found' : '❌ Not found');
  console.log('🔗 Menu items count:', mobileMenuItems.length);
  
  if (hamburger && mobileMenu) {
    console.log('✅ All mobile menu elements found - should work correctly');
    
    // Test click functionality
    hamburger.addEventListener('click', function() {
      console.log('🖱️ Hamburger clicked!');
      const isHidden = mobileMenu.classList.contains('hidden');
      console.log('📱 Menu state:', isHidden ? 'Hidden -> Showing' : 'Visible -> Hiding');
    });
    
    // Test menu item clicks
    mobileMenuItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        console.log(`🔗 Menu item ${index + 1} clicked:`, this.textContent);
      });
    });
  } else {
    console.error('❌ Mobile menu elements missing - check HTML structure');
  }
  
  // Check CSS classes
  if (mobileMenu) {
    console.log('🎨 Mobile menu classes:', mobileMenu.className);
    console.log('📏 Mobile menu computed styles:');
    const styles = window.getComputedStyle(mobileMenu);
    console.log('  - Position:', styles.position);
    console.log('  - Top:', styles.top);
    console.log('  - Z-index:', styles.zIndex);
    console.log('  - Display:', styles.display);
    console.log('  - Visibility:', styles.visibility);
  }
});
