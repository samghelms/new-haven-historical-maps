
var params = (new URL(document.location)).searchParams;
var lat = parseFloat(params.get("lat")); // is the string "Jonathan"
var lng = parseFloat(params.get("lng")); // is the number 18
var zoom = parseFloat(params.get("zoom"));

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

afterMap.on('moveend', function () {
    var center = afterMap.getCenter()
    var params = "?zoom="+afterMap.getZoom()+"&lat="+center.lat+"&lng="+center.lng
    window.history.pushState("test", "Title", params);

})



