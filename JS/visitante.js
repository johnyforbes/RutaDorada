document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos de la interfaz ---
    const residenteBtn = document.getElementById('residenteBtn');
    const visitanteBtn = document.getElementById('visitanteBtn');
    const residenteRoutesSection = document.getElementById('residenteRoutes');
    const visitanteRoutesSection = document.getElementById('visitanteRoutes');
    const toggleUserButtons = document.querySelectorAll('.toggle-user button'); // Todos los botones de Residente/Visitante
    const tabs = document.querySelectorAll('.tab'); // Botones del footer
    const backBtn = document.querySelector('.back-btn'); // Botón de volver


    // --- Lógica de Favoritos ---
    // Marca favoritos al hacer clic (ahora con prevención de propagación para no activar el click de la tarjeta)
    document.querySelectorAll('.fav').forEach(button => {
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

    // --- Lógica de Estrellas Seleccionables ---
    // Las estrellas son seleccionables (con prevención de propagación)
    document.querySelectorAll('.rating span').forEach(star => {
        star.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el clic llegue al contenedor de la tarjeta
            const ratingDiv = this.parentElement;
            const stars = ratingDiv.querySelectorAll('span');
            const value = parseInt(this.getAttribute('data-value'));

            // Actualiza visualmente las estrellas
            stars.forEach((s, i) => {
                if (i < value) {
                    s.textContent = '★'; // Estrella llena
                    s.style.color = '#FFD700'; // Color dorado
                } else {
                    s.textContent = '★'; // Para que todas sean '★' por defecto y el color las diferencie
                    s.style.color = '#ccc'; // Gris para estrellas vacías
                }
            });
            // Puedes guardar el valor seleccionado si lo deseas, por ejemplo, en una base de datos
            ratingDiv.setAttribute('data-rating', value);
            console.log(`Rating para esta ruta: ${value} estrellas`);
        });
    });

    // Inicializar el color de las estrellas al cargar la página
    document.querySelectorAll('.rating').forEach(ratingDiv => {
        const rating = parseInt(ratingDiv.dataset.rating);
        ratingDiv.querySelectorAll('span').forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#FFD700'; // Dorado para estrellas llenas iniciales
            } else {
                star.style.color = '#ccc'; // Gris para estrellas vacías iniciales
            }
        });
    });


    // --- Lógica para cambiar entre Residente y Visitante ---
    function displayUserSection(type) {
        // Oculta ambas secciones
        residenteRoutesSection.classList.add('hidden');
        visitanteRoutesSection.classList.add('hidden');

        // Muestra la sección correcta
        if (type === 'residente') {
            residenteRoutesSection.classList.remove('hidden');
        } else if (type === 'visitante') {
            visitanteRoutesSection.classList.remove('hidden');
        }

        // Actualiza la clase 'active' en los botones del toggle
        toggleUserButtons.forEach(btn => btn.classList.remove('active'));
        if (type === 'residente') {
            residenteBtn.classList.add('active');
        } else if (type === 'visitante') {
            visitanteBtn.classList.add('active');
        }
    }

    // Event listeners para los botones Residente/Visitante
    residenteBtn.addEventListener('click', () => displayUserSection('residente'));
    visitanteBtn.addEventListener('click', () => displayUserSection('visitante'));

    // Asegurarse de que al cargar la página se muestre la sección de residente por defecto
    // Opcional: Podrías leer un estado del almacenamiento local para recordar la última selección del usuario
    displayUserSection('residente');


    // --- Lógica para el Footer (Tabs) ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remueve la clase 'active' y restablece iconos para todos los tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                const icon = t.querySelector('img');
                const type = t.dataset.tab;
                // Asegúrate de que tus iconos se llamen `icon-rutas.png`, `icon-historial.png`, etc.
                // Si la imagen ya tiene la ruta completa, solo asegúrate de que el nombre base coincida.
                if (icon) { // Asegura que el icono exista
                    icon.src = `../img/icon-${type}.png`; // Volver al icono normal
                }
            });

            // Añade la clase 'active' y actualiza el icono para el tab clicado
            tab.classList.add('active');
            const activeIcon = tab.querySelector('img');
            const type = tab.dataset.tab;
            // Asegúrate de que tus iconos activos se llamen `icon-rutas-active.png`, etc.
            if (activeIcon) { // Asegura que el icono exista
                activeIcon.src = `../img/icon-${type}-active.png`; // Icono activo
            }
            
            // Aquí puedes añadir lógica para cambiar el contenido principal de la APP
            // basándose en el data-tab (rutas, historial, cuenta)
            console.log(`Tab activa: ${tab.dataset.tab}`);
            // Por ejemplo, ocultar las secciones de rutas y mostrar otra sección de historial o cuenta
            // if (type === 'historial') { /* Aquí puedes mostrar la sección de historial y ocultar las de rutas */ }
            // else if (type === 'cuenta') { /* Aquí puedes mostrar la sección de cuenta y ocultar las de rutas */ }
            // else if (type === 'rutas') { /* Aquí puedes asegurarte de que las secciones de rutas estén visibles */
            //      // Si la pestaña "Rutas" está activa, asegúrate de mostrar la sección de rutas según el tipo de usuario activo
            //      const currentActiveUserBtn = document.querySelector('.toggle-user button.active');
            //      if (currentActiveUserBtn && currentActiveUserBtn.id === 'residenteBtn') {
            //          displayUserSection('residente');
            //      } else {
            //          displayUserSection('visitante');
            //      }
            // }
        });
    });

    // --- Lógica para el botón "back-btn" ---
    if (backBtn) { // Asegúrate de que el botón exista antes de añadir el listener
        backBtn.addEventListener('click', function() {
            // Redirige al login.html (asumiendo que es tu página de inicio principal)
            window.location.href = '../HTML/index.html';
        });
    }

    // --- Lógica de redirección de Route-Card ---
    document.querySelectorAll('.route-card').forEach(card => {
        // Solo aplica la redirección si la tarjeta tiene un data-route
        if (card.dataset.route) {
            card.addEventListener('click', () => {
                // Redirige al mapa y pasa el parámetro de la ruta
                window.location.href = `../HTML/viajes.html?route=${card.dataset.route}`;
            });
        }
    });

}); // Fin de DOMContentLoaded
