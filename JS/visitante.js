// visitante.js

// Esperar que cargue el DOM

// Proteger la página: solo usuarios logueados pueden acceder
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
  window.location.href = "../HTML/index.html"; // Redirige al login si no hay usuario activo
}

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

// Generar y mostrar ocupación aleatoria en cada route-card
document.querySelectorAll('.route-card').forEach(card => {
  const ocupacion = Math.floor(Math.random() * 76) + 20;
  const p = document.createElement('p');
  p.className = 'ocupacion';
  p.textContent = `Ocupación actual: ${ocupacion}%`;
  const details = card.querySelector('.route-details');
  if (details) {
    details.appendChild(p);
  }
});

// Generar y mostrar hora de llegada y distancia aleatorias en cada route-card
document.querySelectorAll('.route-card').forEach(card => {
  const minutos = Math.floor(Math.random() * 18) + 3;
  const horaLlegada = card.querySelector('.hora-llegada');
  if (horaLlegada) {
    horaLlegada.textContent = `Ruta ${card.dataset.route} - a ${minutos} minutos`;
  }

  const distanciaKm = (Math.random() * 2.5 + 0.5).toFixed(1);
  const distancia = card.querySelector('.distancia');
  if (distancia) {
    distancia.textContent = `${distanciaKm} kilómetros de la parada`;
  }
});

function agregarAccionAlHistorial(accion) {
  let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo) return;

  usuarioActivo.historial.push(accion);

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios = usuarios.map(u => u.username === usuarioActivo.username ? usuarioActivo : u);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
}

// Redirigir al apartado de cuenta desde el botón de cuenta en el footer
document.querySelectorAll('footer .tab[data-tab="cuenta"]').forEach(btn => {
    btn.addEventListener('click', function() {
        window.location.href = 'cuenta.html';
    });
});