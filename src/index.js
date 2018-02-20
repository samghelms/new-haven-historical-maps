
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZ2hlbG1zIiwiYSI6ImNqNm1qamZ0NDEzbzEycHBkejkwcGd4ZTMifQ.ccWemgAM6or4b6WgxSOtbQ'
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-72.9279, 41.3083],
    zoom: 13,
});

var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-72.9279, 41.3083],
    zoom: 13,
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



