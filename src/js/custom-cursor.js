/* =========================================
   CURSOR PERSONALIZADO - DESABILITADO
   ========================================= */

// Cursor personalizado desabilitado - usando cursor padrão do sistema
console.log('Cursor personalizado desabilitado - usando cursor padrão do sistema');

// Garantir que o cursor padrão esteja ativo
document.addEventListener('DOMContentLoaded', () => {
  // Remover qualquer cursor personalizado que possa existir
  const existingCursors = document.querySelectorAll('.custom-cursor, .cursor-trail');
  existingCursors.forEach(cursor => cursor.remove());
  
  // Garantir que todos os elementos usem cursor padrão
  document.body.style.cursor = '';
  document.querySelectorAll('*').forEach(el => {
    el.style.cursor = '';
  });
});
