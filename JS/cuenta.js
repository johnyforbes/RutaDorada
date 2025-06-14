document.addEventListener('DOMContentLoaded', () => {

    const totalCostElement = document.getElementById('total-cost');
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    let currentTotalCost = 0;

    // Función para calcular y actualizar el costo total
    const updateCostTotal = () => {
        let newTotal = 0;
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                newTotal += parseFloat(checkbox.dataset.cost);
            }
        });
        currentTotalCost = newTotal;
        totalCostElement.textContent = `${currentTotalCost.toLocaleString('es-CO')} $`; // Formato de moneda
    };

    // Inicializar el costo total al cargar la página
    updateCostTotal();

    // Event listener para las casillas de verificación de servicio
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCostTotal);
    });

    // Manejar el clic en los elementos de navegación
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            const navText = item.querySelector('.nav-text').textContent;
            console.log(`¡Pestaña "${navText}" clicada!`);
            // Aquí puedes añadir lógica para cambiar el contenido de la aplicación
        });
    });

    // Convertir soporte de usuario en un botón
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', () => {
        alert('Botón de "Soporte de usuario" clicado. Aquí iría la función de búsqueda o un modal de soporte.');
        // Puedes redirigir a una página de soporte, abrir un modal de chat, etc.
    });

    // Convertir notificaciones en un botón
    const notificationsButton = document.getElementById('notifications-button');
    notificationsButton.addEventListener('click', () => {
        alert('Botón de "NOTIFICACIONES" clicado. Aquí iría la sección de notificaciones.');
        // Lógica para mostrar notificaciones
    });

    // Convertir San Andrés Islas en un botón
    const sanAndresButton = document.getElementById('san-andres-button');
    sanAndresButton.addEventListener('click', () => {
        alert('Botón de "SAN ANDRES ISLAS" clicado. Aquí iría la información de la ubicación.');
        // Lógica para mostrar detalles de San Andrés
    });

    // Nuevo botón de Rutas Favoritas
    const favoriteRoutesButton = document.getElementById('favorite-routes-button');
    favoriteRoutesButton.addEventListener('click', () => {
        alert('Botón de "RUTAS FAVORITAS" clicado. Aquí iría la lista de rutas favoritas.');
        // Lógica para mostrar rutas favoritas
    });

});
