var pms = document.location.href;
var lat = parseFloat(pms.match("lat=([+-]?[0-9]*[.]?[0-9]+)")[1]); 
var lng = parseFloat(pms.match("lng=([+-]?[0-9]*[.]?[0-9]+)")[1]); // is the number 18
var zoom = parseFloat(pms.match("zoom=([+-]?[0-9]*[.]?[0-9]+)")[1]);

zoom = isNaN(zoom) ? 13 : zoom
lng = isNaN(lng) ? -72.9279 : lng
lat = isNaN(lat) ? 41.3083 : lat


mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2hlbG1zIiwiYSI6ImNqNm1qamZ0NDEzbzEycHBkejkwcGd4ZTMifQ.ccWemgAM6or4b6WgxSOtbQ'
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [lng, lat],
    zoom: zoom,
});

var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [lng, lat],
    zoom: zoom,
});

var map = new mapboxgl.Compare(beforeMap, afterMap, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});

afterMap.addControl(new mapboxgl.NavigationControl({showCompass: false}));

var database = firebase.database();

var addLayer = function(map, source, id) { 
    if(map.getSource(id) === undefined) {
        map.addSource(id, {
            type: 'raster',
            tiles: [source],
            'tileSize': 256
        });
    }

    map.addLayer({
        'id': id,
        'type': 'raster',
        'source': id,
        'paint': {}
    });
}

afterMap.on('load', function() {
    addLayer(afterMap, dataSource.data, dataSource.id)
});
