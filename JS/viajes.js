// Crear mapa base
const map = L.map('map').setView([12.5840, -81.7006], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Inicializa FeatureGroup para guardar rutas creadas
const rutasCreadas = new L.FeatureGroup();
map.addLayer(rutasCreadas);

// Agrega controles de dibujo
const drawControl = new L.Control.Draw({
  draw: {
    polyline: true, // Habilita solo líneas
    polygon: false,
    rectangle: false,
    circle: false,
    marker: false,
    circlemarker: false
  },
  edit: {
    featureGroup: rutasCreadas,
    remove: true
  }
});
map.addControl(drawControl);

// Captura coordenadas de la línea dibujada
map.on('draw:created', function (e) {
  var layer = e.layer;
  map.addLayer(layer);

  // Si es una polilínea o polígono, guarda las coordenadas
  if (e.layerType === 'polyline' || e.layerType === 'polygon') {
    var coords = layer.getLatLngs();
    // Guarda en localStorage como string
    localStorage.setItem('centroRouteCoords', JSON.stringify(coords));
  }
});

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.addEventListener('DOMContentLoaded', () => {
  if (getQueryParam('route') === 'centro') {
    const coordsStr = localStorage.getItem('centroRouteCoords');
    if (coordsStr) {
      const coords = JSON.parse(coordsStr);
      // Dibuja la polilínea en el mapa
      L.polyline(coords, {color: 'blue'}).addTo(map);
      // Centra el mapa en la ruta
      map.fitBounds(coords);
    }
  }
});
