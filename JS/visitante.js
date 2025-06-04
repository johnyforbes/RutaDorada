// visitante.js

// Esperar que cargue el DOM









document.querySelectorAll('.fav').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '♡' ? '♥' : '♡';
  });
});




document.querySelectorAll('.rating').forEach(ratingDiv => {
  const stars = ratingDiv.querySelectorAll('span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.getAttribute('data-value'));
      // Actualiza visualmente las estrellas
      stars.forEach((s, i) => {
        s.textContent = i < value ? '★' : '☆';
      });
      // Puedes guardar el valor seleccionado si lo deseas
      ratingDiv.setAttribute('data-rating', value);
    });
  });
});

// Redirigir al apartado de residentes al hacer clic en el botón "Residente"
document.querySelectorAll('.toggle-user button').forEach(btn => {
  if (btn.textContent.trim().toLowerCase() === 'residente') {
    btn.addEventListener('click', function() {
      window.location.href = '../HTML/residete.html';
    });
  }
});