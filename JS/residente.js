// Marca favoritos al hacer clic
document.querySelectorAll('.fav').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '♡' ? '♥' : '♡';
  });
});

// Cambiar entre residente y visitante
const toggleButtons = document.querySelectorAll('.toggle-user button');
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Aquí puedes cargar las rutas del visitante si lo deseas
  });
});

// Estrellas seleccionables
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

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('active');
      const icon = t.querySelector('img');
      const type = t.dataset.tab;
      icon.src = `icon-${type}.png`; // volver al icono normal
    });

    tab.classList.add('active');
    const activeIcon = tab.querySelector('img');
    const type = tab.dataset.tab;
    activeIcon.src = `icon-${type}-activo.png`; // icono activo
  });
});

document.querySelectorAll('.route-card').forEach(card => {
  const title = card.querySelector('h3');
  if (title && title.textContent.trim().toLowerCase() === 'centro') {
    card.addEventListener('click', () => {
      // Redirige al mapa y pasa un parámetro para mostrar la ruta de Centro
      window.location.href = '../HTML/viajes.html?route=centro';
    });
  }
});
