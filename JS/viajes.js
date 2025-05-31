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

// Obtén el nombre de la ruta desde la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const currentRoute = getQueryParam('route') || 'centro';

// Captura coordenadas de la línea dibujada
map.on('draw:created', function (e) {
  var layer = e.layer;
  map.addLayer(layer);

  if (e.layerType === 'polyline' || e.layerType === 'polygon') {
    var coords = layer.getLatLngs();
    // Guarda en localStorage con la clave de la ruta
    localStorage.setItem(currentRoute + 'RouteCoords', JSON.stringify(coords));
  }
});

// Mostrar la ruta guardada al cargar
window.addEventListener('DOMContentLoaded', () => {
  const coordsStr = localStorage.getItem(currentRoute + 'RouteCoords');
  if (coordsStr) {
    const coords = JSON.parse(coordsStr);
    L.polyline(coords, {color: 'blue'}).addTo(map);
    map.fitBounds(coords);
  }
});
