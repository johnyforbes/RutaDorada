// cuenta.js

// Esperar que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {

    // Proteger la página: solo usuarios logueados pueden acceder (igual que en visitante.js)
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
        window.location.href = "../HTML/index.html"; // Redirige al login si no hay usuario activo
        return; // Detener la ejecución del script
    }

    // --- Funcionalidad de Notificaciones ---
    const notificationButton = document.getElementById('notificationButton');
    const notificationCountSpan = document.getElementById('notificationCount');

    // Función para actualizar el contador de notificaciones
    function updateNotificationCount() {
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const unreadCount = notifications.filter(n => !n.read).length;
        if (unreadCount > 0) {
            notificationCountSpan.textContent = `+${unreadCount}`;
            notificationCountSpan.style.display = 'inline-block';
        } else {
            notificationCountSpan.style.display = 'none';
        }
    }

    // Redirigir a la página de notificaciones al hacer clic en el botón
    if (notificationButton) {
        notificationButton.addEventListener('click', () => {
            window.location.href = '../HTML/notificaciones.html';
        });
    }

    // Inicializar el contador de notificaciones al cargar la página
    updateNotificationCount();

    // Funcionalidad para los checkboxes de los descuentos
    document.querySelectorAll('.discount-item .checkbox-container input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const discountText = event.target.closest('.discount-item').querySelector('.discount-details').textContent;
            if (event.target.checked) {
                console.log(`Descuento "${discountText}" activado.`);
                agregarAccionAlHistorial(`Activado descuento: ${discountText}`);
            } else {
                console.log(`Descuento "${discountText}" desactivado.`);
                agregarAccionAlHistorial(`Desactivado descuento: ${discountText}`);
            }
        });
    });

    // Lógica para los tabs del footer (replicado y adaptado de visitante.js)
    const tabs = document.querySelectorAll('footer .tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir la navegación predeterminada

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.dataset.tab;

            if (tabName === 'rutas') {
                window.location.href = '../HTML/visitante.html';
            } else if (tabName === 'historial') {
                window.location.href = '../HTML/historial.html';
            } else if (tabName === 'cuenta') {
                // Ya estamos en cuenta.html, no hacemos nada o recargamos si es necesario.
            }
        });
    });

    // Lógica para el botón "Volver" (back-btn) en el header (replicado de visitantes.js si aplica)
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Función para agregar acciones al historial del usuario activo (replicada de visitante.js)
    function agregarAccionAlHistorial(accion) {
        let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!usuarioActivo) return;

        if (!usuarioActivo.historial) {
            usuarioActivo.historial = [];
        }
        usuarioActivo.historial.push({
            tipo: "cuenta",
            descripcion: accion,
            fecha: new Date().toISOString()
        });

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios = usuarios.map(u => u.username === usuarioActivo.username ? usuarioActivo : u);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
        console.log("Acción agregada al historial del usuario activo:", accion);
    }
    // Redirigir al apartado de historial desde el botón de historial en el footer
    document.querySelectorAll('footer .tab[data-tab="historial"]').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'historial.html';
        });
    });

    // Redirigir al apartado de cuenta desde el botón de cuenta en el footer
    document.querySelectorAll('footer .tab[data-tab="cuenta"]').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'cuenta.html';
        });
    });

    // Mostrar el nombre del usuario en el header si está en localStorage
    document.addEventListener('DOMContentLoaded', function() {
        const username = localStorage.getItem('username');
        if (username && document.querySelector('.header-title')) {
            document.querySelector('.header-title').textContent = username;
        }
    });

});

