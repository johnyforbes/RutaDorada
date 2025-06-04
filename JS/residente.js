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
  const title = card.querySelector('h3');
  if (title) {
    const routeName = title.textContent.trim().toLowerCase();
    // Normaliza el nombre para la URL
    let routeParam = '';
    if (routeName === 'centro') routeParam = 'centro';
    else if (routeName === 'san luis') routeParam = 'sanluis';
    else if (routeName === 'cove') routeParam = 'cove';
    else if (routeName === 'loma') routeParam = 'loma';
    if (routeParam) {
      card.addEventListener('click', function(e) {
        // Evita que el click en rating o fav active el mapa
        if (
          e.target.classList.contains('fav') ||
          e.target.closest('.rating')
        ) return;
        window.location.href = `../HTML/viajes.html?route=${routeParam}`;
      });
    }
  }
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