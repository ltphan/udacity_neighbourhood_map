// Model

var locations = [
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

// Mapper between model and view

var map;
var markers = [];
var infoWindow;

function initMap() {
  console.log("map printed");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2827291, lng: -123.1207375},
    zoom: 13,
    mapTypeControl: false
  });
}


var Location = function(data) {
  var self = this;
  self.name = data.name;
  self.lat = data.lat;
  self.lng = data.lng;
  self.fourSquareID = data.fourSquareID;
}

function setMarkers(locations) {
  locations.forEach(function(location) {
    var positions = {lat: location.lat, lng: location.lng};
    var name = location.name;
    location.infoWindow = new google.maps.InfoWindow();
    location.marker = new google.maps.Makrer({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP
    })

    markers.push(location.marker);
    location.marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow);
    })
  });
}

function populateInfoWindow(marker,infoWindow) {

  // foursquare information
  var CLIENT_ID = 'F3T5F3US0WH4QBJTBSGSA2WIMCTUIXPECQK2RZXRQ01N1QW4';
  var CLIENT_SECRET = 'CACMXCC2LGMQKBIJCDJJD3ZRGKIOPFVFKPQC2IXWS3NFNJUV';

  

  
}


// View

var Listing = function(data) {
  this.name = ko.observable(data.name);
  this.location = ko.observable(data.location);
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