// Model

var locations = [
  {
      name: 'Ajisai Sushi Restaurant',
      position: {lat: 49.233934, lng: -123.1536816}
  },
  {
      name: 'Doplan Korean Restuarant',
      position: {lat: 49.1856592, lng: -123.1292477}
  },
  {
      name: 'Nightingale Restaurant',
      position: {lat: 49.2874341, lng: -123.1175606}
  },
  {
      name: 'Hoi An Cafe',
      position: {lat: 49.2388517, lng: -123.0652127}
  },
  {
      name: 'Jam Cafe',
      position: {lat: 49.2802619, lng: -123.1096419}
  }
]

// Mapper between model and view

var map;
var markers = [];
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2827291, lng: -123.1207375},
    zoom: 13,
    mapTypeControl: false
  });
  setMarkers(locations, vm);
}

function setMarkers(locations,vm) {
  locations.forEach(function(location, i) {
    console.log(location);
    var position = {lat: location.position.lat, lng: location.position.lng};
    var name = location.name;
   // location.infoWindow = new google.maps.InfoWindow();
    marker = new google.maps.Marker({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP
    })

   vm.listingList()[i].marker = marker;

    markers.push(location.marker);
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    })
  });
}

function populateInfoWindow(marker,infoWindow) {

  // foursquare information
  var CLIENT_ID = 'F3T5F3US0WH4QBJTBSGSA2WIMCTUIXPECQK2RZXRQ01N1QW4';
  var CLIENT_SECRET = 'CACMXCC2LGMQKBIJCDJJD3ZRGKIOPFVFKPQC2IXWS3NFNJUV';
 // var url = 'https://api.foursquare.com/v2/venues/venues/search?ll=' + ;
  
}


// View

var Listing = function(data) {
  var self = this;
  this.location = data.location;
  self.name = data.name;
  self.lat = data.position.lat;
  self.lng = data.position.lng;
  self.fourSquareID = data.fourSquareID;
}

var ViewModel = function() {
    var self = this;

    this.listingList = ko.observableArray([]);

    locations.forEach(function(listingItem){
      self.listingList.push(new Listing(listingItem));
    });
  }

  var vm = new ViewModel();

  ko.applyBindings(vm);