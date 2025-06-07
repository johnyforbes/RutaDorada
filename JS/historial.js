// js/historial.js

/**
 * Clase que representa una Ruta en el historial.
 * Podría ser útil si cada ruta tuviera métodos específicos (ej. calcular duración).
 * Por ahora, servirá como una estructura de datos clara.
 */
class RutaHistorial {
    constructor(id, ruta, origen, destino, fecha, costo, rating, imagen, normalizedRouteId) {
        this.id = id;
        this.ruta = ruta;
        this.origen = origen;
        this.destino = destino;
        this.fecha = new Date(fecha); // Convertir a objeto Date para facilitar manejo
        this.costo = costo;
        this.rating = rating;
        this.imagen = imagen;
        this.normalizedRouteId = normalizedRouteId;
    }

    // Método para formatear el costo a moneda local
    getFormattedCosto() {
        return this.costo.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
    }

    // Método para formatear la fecha y hora
    getFormattedFecha() {
        return this.fecha.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    }

    // Método para obtener las estrellas de calificación
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

    // Crea instancias de RutaHistorial a partir de los datos brutos
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

    // Añade todos los escuchadores de eventos
    _addEventListeners() {
        if (this.backButton) {
            this.backButton.addEventListener('click', this._handleBackButtonClick.bind(this));
        }

        this.footerTabs.forEach(tab => {
            tab.addEventListener('click', this._handleTabClick.bind(this));
        });
    }

    // Maneja el clic en el botón "Volver"
    _handleBackButtonClick() {
        history.back();
    }

    // Maneja el clic en las pestañas del footer
    _handleTabClick(event) {
        // Remover 'active' de todas las pestañas
        this.footerTabs.forEach(t => t.classList.remove('active'));
        // Añadir 'active' a la pestaña clickeada
        event.currentTarget.classList.add('active');

        // La redirección ya se maneja con 'onclick' en el HTML para otros tabs
        // Si quisieras que JavaScript lo maneje:
        /*
        const targetPage = event.currentTarget.dataset.tab;
        if (targetPage === 'rutas') {
            window.location.href = 'residente.html';
        } else if (targetPage === 'cuenta') {
            window.location.href = 'cuenta.html';
        }
        // Para 'historial', no hace falta redirigir porque ya estamos aquí
        */
    }

    // Renderiza la lista de elementos del historial
    renderHistorial() {
        this.historialListElement.innerHTML = ''; // Limpiar el contenido actual

        if (this.historialData.length === 0) {
            this.historialListElement.innerHTML = '<p class="text-center text-muted mt-5">No hay historial de rutas disponibles.</p>';
            return;
        }

        this.historialData.forEach(item => {
            const historialItemDiv = this._createHistorialItemElement(item);
            this.historialListElement.appendChild(historialItemDiv);
        });

        // Añadir el escuchador de clic a cada ítem del historial DESPUÉS de que se renderizan
        this._addHistorialItemClickListeners();
    }

    // Crea el elemento DOM para un ítem del historial
    _createHistorialItemElement(item) {
        const historialItemDiv = document.createElement('div');
        historialItemDiv.classList.add('historial-item');
        historialItemDiv.dataset.routeId = item.normalizedRouteId; // Almacenar el ID normalizado

        historialItemDiv.innerHTML = `
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
                <div class="rating">
                    ${item.getStarsHtml()}
                </div>
            </div>
        `;
        return historialItemDiv;
    }

    // Añade los event listeners para cada ítem de historial después de que se renderizan
    _addHistorialItemClickListeners() {
        document.querySelectorAll('.historial-item').forEach(itemElement => {
            itemElement.addEventListener('click', this._handleHistorialItemClick.bind(this));
        });
    }

    // Maneja el clic en un ítem individual del historial
    _handleHistorialItemClick(event) {
        const routeId = event.currentTarget.dataset.routeId;
        if (routeId) {
            // Redirigir a la página de viajes, pasando el ID de la ruta como parámetro
            window.location.href = `../HTML/viajes.html?route=${routeId}`;
        }
    }

    // Activa la pestaña del footer correspondiente a la página actual
    _setActiveTab() {
        const currentPath = window.location.pathname;
        const historialTab = Array.from(this.footerTabs).find(tab =>
            tab.dataset.tab === 'historial'
        );
        if (historialTab) {
            this.footerTabs.forEach(t => t.classList.remove('active'));
            historialTab.classList.add('active');
        }
    }
}

// --- DATOS DE EJEMPLO DEL HISTORIAL ---
// Estos datos son la fuente de verdad y se usan para crear los objetos RutaHistorial
const historialRawData = [
    {
        id: 1,
        ruta: 'Ruta del Centro',
        origen: 'Playa Spratt Bight',
        destino: 'Centro Comercial',
        fecha: '2024-05-30 09:30',
        costo: 3500,
        rating: 5,
        imagen: '../img/centro.jpg',
        normalizedRouteId: 'centro'
    },
    {
        id: 2,
        ruta: 'sanluis',
        origen: 'Hotel Decameron',
        destino: 'West View',
        fecha: '2024-05-29 14:00',
        costo: 4000,
        rating: 4,
        imagen: '../img/sanluis.jpg',
        normalizedRouteId: 'sanluis'
    },
    {
        id: 3,
        ruta: 'loma',
        origen: 'Parque Regional',
        destino: 'entrada la laguna',
        fecha: '2024-05-28 10:15',
        costo: 3800,
        rating: 3,
        imagen: '../img/loma.jpg',
        normalizedRouteId: 'loma'
    },
    {
        id: 4,
        ruta: 'cove',
        origen: 'Aeropuerto',
        destino: 'Hotel bluecove',
        fecha: '2024-05-27 18:45',
        costo: 5000,
        rating: 5,
        imagen: '../img/cove.jpg',
        normalizedRouteId: 'cove'
    }
];

// --- Inicialización de la aplicación del historial ---
document.addEventListener('DOMContentLoaded', () => {
    new HistorialApp(
        historialRawData,
        'historial-list',
        '.back-btn',
        'footer .tab'
    );
});