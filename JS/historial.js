// js/historial.js

// Proteger la página: solo usuarios logueados pueden acceder
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
  window.location.href = "../HTML/index.html"; // Redirige al login si no hay usuario activo
} else if (usuarioActivo.historial) {
  usuarioActivo.historial.forEach(accion => {
    // Crea y muestra elementos HTML con los datos de la acción
  });
}

/**
 * Clase que representa una Ruta en el historial.
 */
class RutaHistorial {
    constructor(id, ruta, origen, destino, fecha, costo, rating, imagen, normalizedRouteId) {
        this.id = id;
        this.ruta = ruta;
        this.origen = origen;
        this.destino = destino;
        this.fecha = new Date(fecha);
        this.costo = costo;
        this.rating = rating;
        this.imagen = imagen;
        this.normalizedRouteId = normalizedRouteId;
    }

    getFormattedCosto() {
        return this.costo.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
    }

    getFormattedFecha() {
        return this.fecha.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    }

    getStarsHtml() {
        return '★'.repeat(this.rating) + '☆'.repeat(5 - this.rating);
    }
}

/**
 * Clase principal que gestiona la interfaz y lógica del Historial de Rutas.
 */
class HistorialApp {
    constructor(historialData, historialListElementId, backButtonSelector, footerTabsSelector) {
        this.historialData = this._createRutaHistorialObjects(historialData);
        this.historialListElement = document.getElementById(historialListElementId);
        this.backButton = document.querySelector(backButtonSelector);
        this.footerTabs = document.querySelectorAll(footerTabsSelector);

        this._addEventListeners();
        this.renderHistorial();
        this._setActiveTab();
    }

    _createRutaHistorialObjects(data) {
        return data.map(item => new RutaHistorial(
            item.id,
            item.ruta,
            item.origen,
            item.destino,
            item.fecha,
            item.costo,
            item.rating,
            item.imagen,
            item.normalizedRouteId
        ));
    }

    _addEventListeners() {
        if (this.backButton) {
            this.backButton.addEventListener('click', this._handleBackButtonClick.bind(this));
        }

        this.footerTabs.forEach(tab => {
            tab.addEventListener('click', this._handleTabClick.bind(this));
        });
    }

    _handleBackButtonClick() {
        history.back();
    }

    _handleTabClick(event) {
        this.footerTabs.forEach(t => t.classList.remove('active'));
        event.currentTarget.classList.add('active');
        // La navegación a otras secciones se define con onclick en el HTML
    }

    // --- Nueva versión de renderHistorial con eliminación dinámica ---
    renderHistorial() {
        // Refrescar datos desde el historial del usuario activo
        let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!usuarioActivo) return;
        this.historialData = this._createRutaHistorialObjects(usuarioActivo.historial || []);

        this.historialListElement.innerHTML = '';

        if (this.historialData.length === 0) {
            this.historialListElement.innerHTML = '<p class="text-center text-muted mt-5">No hay historial de rutas disponibles.</p>';
            return;
        }

        this.historialData.forEach((item, index) => {
            const div = this._createHistorialItemElement(item, index);
            this.historialListElement.appendChild(div);
        });
    }

    _createHistorialItemElement(item, index) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('historial-item');
        tarjeta.dataset.routeId = item.normalizedRouteId;

        tarjeta.innerHTML = `
            <div class="historial-icon">
                <img src="${item.imagen}" alt="Ícono de ruta ${item.ruta}">
            </div>
            <div class="historial-details">
                <h3>${item.ruta}</h3>
                <p>De: ${item.origen}</p>
                <p>A: ${item.destino}</p>
            </div>
            <div class="historial-meta">
                <p>${item.getFormattedFecha()}</p>
                <p class="costo">${item.getFormattedCosto()}</p>
                <div class="rating">${item.getStarsHtml()}</div>
            </div>
        `;

        // Mover el botón de eliminar dentro del contenedor de la imagen
        const iconContainer = tarjeta.querySelector('.historial-icon');
        iconContainer.style.position = 'relative';

        // Crear y configurar botón Eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '✕';  // Icono de cruz para más discreto
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.addEventListener('click', () => {
            // Eliminar del historial del usuario activo
            let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
            if (!usuarioActivo) return;
            usuarioActivo.historial = usuarioActivo.historial || [];
            usuarioActivo.historial.splice(index, 1);

            // Actualiza el usuario en el array de usuarios
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            usuarios = usuarios.map(u => u.username === usuarioActivo.username ? usuarioActivo : u);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

            // Re-renderizar para reindexar
            this.renderHistorial();
        });

        iconContainer.appendChild(btnEliminar);
        return tarjeta;
    }

    _addHistorialItemClickListeners() {
        document.querySelectorAll('.historial-item').forEach(itemEl => {
            itemEl.addEventListener('click', this._handleHistorialItemClick.bind(this));
        });
    }

    _handleHistorialItemClick(event) {
        const routeId = event.currentTarget.dataset.routeId;
        if (routeId) {
            window.location.href = `../HTML/viajes.html?route=${routeId}`;
        }
    }

    _setActiveTab() {
        const historialTab = Array.from(this.footerTabs)
            .find(tab => tab.dataset.tab === 'historial');
        if (historialTab) {
            this.footerTabs.forEach(t => t.classList.remove('active'));
            historialTab.classList.add('active');
        }
    }
}

// Inicialización
function initHistorial() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const datos = usuarioActivo && usuarioActivo.historial ? usuarioActivo.historial : [];
    new HistorialApp(datos, 'historial-list', '.back-btn', 'footer .tab');
}

document.addEventListener('DOMContentLoaded', initHistorial);

// Función para agregar una ruta al historial del usuario activo
function agregarRutaAlHistorial(historialItem) {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) return;

    usuarioActivo.historial = usuarioActivo.historial || [];
    usuarioActivo.historial.unshift(historialItem);

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios = usuarios.map(u => u.username === usuarioActivo.username ? usuarioActivo : u);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
}

