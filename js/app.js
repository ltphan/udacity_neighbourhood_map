var initialLocations = [
    {
        name: 'Ajisai Sushi Restaurant',
        location: {lat: 49.233934, lng: -123.1536816}
    },
    {
        name: 'Doplan Korean Restuarant',
        location: {lat: 49.1856592, lng: -123.1292477}
    },
    {
        name: 'Nightingale Restaurant',
        location: {lat: 49.2874341, lng: -123.1175606}
    },
    {
        name: 'Hoi An Cafe',
        location: {lat: 49.2388517, lng: -123.0652127}
    },
    {
        name: 'Jam Cafe',
        location: {lat: 49.2802619, lng: -123.1096419}
    }
]


// global variables
var map;
var clientID;
var clientSecret;

function initMap() {
    console.log('map printing');
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.2827291, lng: -123.1207375},
        zoom: 13,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });
}

function setMarkers() {
    for (var i = 0; i < initialLocations.length; i++) {
        var position = initialLocations[i].location;
        var name = initialLocations[i].name;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: name,
            animcation: google.maps.Animation.DROP,
            id: i
        });
}
    var largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    
    intialLocations[i].marker = marker;
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
        });
    
    map.fitBounds(bounds);   
    }
   


    function setDescription(marker, infowindow) {
        
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker(null);
            });
        }
        
    }


    function filteredItems(initialLocations) {
        input = document.getElementById("theInput");
        filter = input.nodeValue.toLowerCase();

    }


// ko.applyBindings(new viewModel());