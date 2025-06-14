// notificaciones.js

document.addEventListener('DOMContentLoaded', () => {

    // Proteger la página (igual que en otros archivos)
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
        window.location.href = "../HTML/index.html";
        return;
    }

    const notificationList = document.getElementById('notificationList');
    const noNotificationsMessage = document.querySelector('.no-notifications-message');

    // Cargar notificaciones desde localStorage
    function loadNotifications() {
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        return notifications.filter(n => n.userId === usuarioActivo.id); // Filtrar por usuario si es necesario
    }

    // Guardar notificaciones en localStorage
    function saveNotifications(notifications) {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    // Añadir una nueva notificación
    function addNotification(title, message, type = 'info', userId = usuarioActivo.id) {
        let notifications = loadNotifications();
        const newNotification = {
            id: Date.now(),
            userId: userId,
            title: title,
            message: message,
            type: type, // 'info', 'warning', 'success', 'urgent'
            timestamp: new Date().toISOString(),
            read: false
        };
        notifications.unshift(newNotification); // Añadir al principio
        saveNotifications(notifications);
        displayNotifications(); // Volver a renderizar
        // Actualizar el contador en cuenta.html si estamos en esa página o al volver
    }

    // Renderizar notificaciones en la página
    function displayNotifications() {
        let notifications = loadNotifications();
        notificationList.innerHTML = ''; // Limpiar la lista existente

        if (notifications.length === 0) {
            noNotificationsMessage.style.display = 'block';
            return;
        } else {
            noNotificationsMessage.style.display = 'none';
        }

        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
            notificationItem.dataset.id = notification.id;

            const iconClass = {
                'info': 'fas fa-info-circle',
                'warning': 'fas fa-exclamation-triangle',
                'success': 'fas fa-check-circle',
                'urgent': 'fas fa-exclamation-circle'
            };

            const timestampDate = new Date(notification.timestamp);
            const formattedDate = timestampDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
            const formattedTime = timestampDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

            notificationItem.innerHTML = `
                <div class="notification-icon">
                    <i class="${iconClass[notification.type] || iconClass['info']}"></i>
                </div>
                <div class="notification-content">
                    <h3>${notification.title}</h3>
                    <p>${notification.message}</p>
                    <div class="notification-timestamp">${formattedDate} ${formattedTime}</div>
                </div>
            `;

            notificationItem.addEventListener('click', () => {
                markAsRead(notification.id);
            });

            notificationList.appendChild(notificationItem);
        });
    }

    // Marcar notificación como leída
    function markAsRead(id) {
        let notifications = loadNotifications();
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications[index].read = true;
            saveNotifications(notifications);
            displayNotifications(); // Volver a renderizar para actualizar el estado visual
            // Opcional: Volver a la página anterior o cerrar la notificación
        }
    }

    // --- Lógica del Footer (replicada y adaptada) ---
    const tabs = document.querySelectorAll('footer .tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.dataset.tab;

            if (tabName === 'rutas') {
                window.location.href = '../HTML/visitante.html';
            } else if (tabName === 'historial') {
                window.location.href = '../HTML/historial.html';
            } else if (tabName === 'cuenta') {
                window.location.href = '../HTML/cuenta.html';
            } else if (tabName === 'notificaciones') {
                // Ya estamos en notificaciones.html
            }
        });
    });

    // Lógica para el botón "Volver" (back-btn) en el header (replicado)
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    // --- Notificaciones de ejemplo para la temática de buses en San Andrés ---
    // (Añádelas solo si no hay notificaciones o para propósitos de prueba)
    function addSampleNotifications() {
        let notifications = loadNotifications();
        if (notifications.length === 0) { // Solo si no hay notificaciones existentes
            addNotification(
                '¡Ruta Centro Disponible!',
                'El bus de la ruta Centro ya está en camino. ¡Aprovecha para explorar el comercio!',
                'success'
            );
            addNotification(
                'Actualización de Horarios',
                'Debido a un evento en San Luis, la ruta "San Luis" tendrá un retraso de 15 minutos hoy. Disculpa las molestias.',
                'warning'
            );
            addNotification(
                'Alerta de Tráfico en Cove',
                'Se presenta tráfico pesado en la ruta Cove. Tu viaje podría tardar más de lo habitual.',
                'urgent'
            );
            addNotification(
                '¡Viaje Completado!',
                'Tu viaje a Loma ha sido registrado en tu historial. ¡Esperamos que hayas disfrutado las vistas!',
                'info'
            );
            addNotification(
                'Oferta Especial',
                '¡Presenta tu pasaje digital y obtén un 10% de descuento en el restaurante "El Paraíso del Pescador" en el Centro!',
                'info'
            );
            addNotification(
                '¡Bus en camino!',
                'El bus 007 de la ruta San Luis está a 2 minutos de tu parada actual. ¡Prepárate!',
                'success'
            );
            addNotification(
                'Mantenimiento Programado',
                'Algunas rutas podrían experimentar interrupciones el domingo de 6 AM a 8 AM por mantenimiento de la flota. Planifica tu viaje con antelación.',
                'info'
            );
        }
    }

    // Mostrar las notificaciones al cargar la página
    displayNotifications();

    // Añadir notificaciones de ejemplo (puedes comentar esta línea si solo quieres notificaciones generadas por el usuario)
    addSampleNotifications();
});