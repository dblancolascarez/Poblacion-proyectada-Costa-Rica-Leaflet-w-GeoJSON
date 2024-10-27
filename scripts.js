// Crear el mapa centrado en Costa Rica
var map = L.map('map').setView([9.7489, -83.7534], 8); // Coordenadas del centro de Costa Rica


// Crear un 'pane' especial para las capas de imagen (PNG) con un alto zIndex
map.createPane('imagePane');
map.getPane('imagePane').style.zIndex = 500;

// Agregar el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Crear un objeto para almacenar las capas y la capa actual
var layers = {};
var currentLayer = null; 

// Función para cargar y almacenar capas GeoJSON
function loadGeoJSON(url, name) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de la red');
            return response.json();
        })
        .then(data => {
            const layer = L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("ID: " + feature.properties.fid + "<br>Nombre: " + feature.properties.NOMBRE);
                }
            });
            layers[name] = { type: 'geojson', layer: layer };
        })
        .catch(error => console.error('Error al cargar el GeoJSON:', error));
}

// Función para cargar y almacenar capas PNG en el pane especial
function loadPNG(url, bounds, name) {
    const layer = L.imageOverlay(url, bounds, { pane: 'imagePane' });
    layers[name] = { type: 'image', layer: layer };
}

// Cargar capas GeoJSON
Promise.all([
    loadGeoJSON('proyectados/cantones2022_proyectados.geojson', 'Cantones2022'),
    loadGeoJSON('proyectados/hospitales_poblacion_alta_2021_proyectados.geojson', 'Hospitales2021'),
    loadGeoJSON('proyectados/hospitales_poblacionAlta_2022_proyectados.geojson', 'Hospitales2022'),
    loadGeoJSON('proyectados/escuelas_poblacionAlta_2021_proyectados.geojson', 'Escuelas2021'),
    loadGeoJSON('proyectados/escuelas_poblacionAlta_2022_proyectados.geojson', 'Escuelas2022')
]).then(() => {
    // Cargar una capa inicial al cargar el mapa, sin visualizarla aún
});

// Cargar la capa PNG
loadPNG('pngs/Mapa_Calor_2021.png', [[8.0, -86.0], [11.0, -82.0]], 'MapaCalor2021');
loadPNG('pngs/Mapa_Calor_2022.png', [[8.0, -86.0], [11.0, -82.0]], 'MapaCalor2022');
loadPNG('pngs/PuntosAleatorios2021.png', [[8.0, -86.0], [11.0, -82.0]], 'PuntosAleatorios2021');
loadPNG('pngs/PuntosAleatorios2022.png', [[8.0, -86.0], [11.0, -82.0]], 'PuntosAleatorios2022');

// Función para cambiar entre capas
function switchLayer(layerName) {
    // Remover la capa actual si existe
    if (currentLayer) {
        map.removeLayer(currentLayer.layer);
    }
    // Agregar la nueva capa
    if (layers[layerName]) {
        currentLayer = layers[layerName];
        currentLayer.layer.addTo(map);
    }
}

// Agregar botones para cambiar entre capas
const controls = document.createElement('div');
controls.innerHTML = `
    <button onclick="switchLayer('Cantones2022')">Mostrar Cantones 2022</button>
    <button onclick="switchLayer('Hospitales2021')">Mostrar Hospitales 2021</button>
    <button onclick="switchLayer('Hospitales2022')">Mostrar Hospitales 2022</button>
    <button onclick="switchLayer('Escuelas2021')">Mostrar Escuelas 2021</button>
    <button onclick="switchLayer('Escuelas2022')">Mostrar Escuelas 2022</button>

    <button onclick="switchLayer('MapaCalor2021')">Mapa Calor 2021</button>
    <button onclick="switchLayer('MapaCalor2022')">Mapa Calor 2022</button>
    <button onclick="switchLayer('PuntosAleatorios2021')">Puntos Aleatorios 2021</button>
    <button onclick="switchLayer('PuntosAleatorios2022')">Puntos Aleatorios 2022</button>
`;
document.body.appendChild(controls);





