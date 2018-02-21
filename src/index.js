var pms = document.location.href;
var lat = pms.match("lat=([+-]?[0-9]*[.]?[0-9]+)"); 
var lng = pms.match("lng=([+-]?[0-9]*[.]?[0-9]+)"); // is the number 18
var zoom = pms.match("zoom=([+-]?[0-9]*[.]?[0-9]+)");

zoom = isNaN(zoom) && zoom.length > 1 ? 13 : parseFloat(zoom[1])
lng = isNaN(lng) && lng.length > 1 ? -72.9279 : parseFloat(lng[1])
lat = isNaN(lat) && lat.length > 1 ? 41.3083 : parseFloat(lat[1])


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
