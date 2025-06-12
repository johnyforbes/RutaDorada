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

// Redirigir al apartado de visitantes al hacer clic en el botón "Visitante"
document.querySelectorAll('.toggle-user button').forEach(btn => {
  if (btn.textContent.trim().toLowerCase() === 'visitante') {
    btn.addEventListener('click', function() {
      window.location.href = '../HTML/visitante.html';
    });
  }
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

// Botón volver: redirige al login
document.querySelector('.back-btn').addEventListener('click', function() {
  window.location.href = '../HTML/index.html';
});

// Detener propagación en rating y fav
document.querySelectorAll('.rating span').forEach(star => {
  star.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click llegue al contenedor
    const ratingDiv = this.parentElement;
    const stars = ratingDiv.querySelectorAll('span');
    const value = parseInt(this.getAttribute('data-value'));
    stars.forEach((s, i) => {
      s.textContent = i < value ? '★' : '☆';
    });
    ratingDiv.setAttribute('data-rating', value);
  });
});

 document.querySelectorAll('fav').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el clic llegue al contenedor de la tarjeta
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            // Aquí puedes añadir lógica para guardar/eliminar de favoritos en un backend si lo tuvieras
            if (this.textContent === '♥') {
                console.log('Ruta añadida a favoritos');
                // Puedes añadir una clase visual si quieres un efecto diferente
                this.classList.add('favorited');
            } else {
                console.log('Ruta eliminada de favoritos');
                this.classList.remove('favorited');
            }
        });
    });
