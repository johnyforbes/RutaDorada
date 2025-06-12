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

document.querySelectorAll('.route-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Evita que el click en rating o fav active el historial
    if (
      e.target.classList.contains('fav') ||
      e.target.closest('.rating')
    ) return;

    // Obtener datos de la ruta
    const routeName = card.dataset.route;
    const routeDetails = card.querySelector('.route-details');
    const h3 = routeDetails ? routeDetails.querySelector('h3') : null;
    const origen = "Origen desconocido"; // Puedes ajustar si tienes el dato
    const destino = h3 ? h3.textContent : routeName;
    const precio = card.parentElement.previousElementSibling
      ? card.parentElement.previousElementSibling.querySelector('.precio').textContent.replace(/\D/g, '')
      : "0";
    const imagen = card.querySelector('img') ? card.querySelector('img').src : '';
    const ratingDiv = card.querySelector('.rating');
    const rating = ratingDiv ? parseInt(ratingDiv.getAttribute('data-rating')) : 0;

    // Crear objeto historial
    const historialItem = {
      id: Date.now(),
      ruta: routeName,
      origen: origen,
      destino: destino,
      fecha: new Date().toISOString(),
      costo: parseInt(precio),
      rating: rating,
      imagen: imagen,
      normalizedRouteId: routeName
    };

    // Guardar en localStorage
    let historial = JSON.parse(localStorage.getItem('historialRutas')) || [];
    historial.unshift(historialItem); // Añade al inicio
    localStorage.setItem('historialRutas', JSON.stringify(historial));

    // Redirigir a viajes.html
    window.location.href = `../HTML/viajes.html?route=${routeName}`;
  });
});