var map;
var marker;
var markers = [];
var infoWindow;

// error message if the Google maps page does not load
function mapError() {
  alert("The Google Maps API was not able to load.");
}

// loads Google map on page using Google Maps API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.245, lng: -123.1207375},
    zoom: 12,
    mapTypeControl: false
  });


  }

// location constructor that includes setting the markers, defines location
// properties, and information window for each location
function LocationModel(listing, vm) {
  var self = this;
  self.name = listing.name;
  self.position = {lat: listing.location.lat, lng: listing.location.lng};
  self.address = listing.location.city;
  self.state = listing.location.state;
  self.zip = listing.location.postalCode;
  self.phone = listing.contact.formattedPhone;
  self.venueID = listing.id;
  
function fourSquareCalls(listings) {
  var url = 'https://api.foursquare.com/v2/venues/search?ll=49.245,-123.1207375&client_id=F3T5F3US0WH4QBJTBSGSA2WIMCTUIXPECQK2RZXRQ01N1QW4&client_secret=CACMXCC2LGMQKBIJCDJJD3ZRGKIOPFVFKPQC2IXWS3NFNJUV&v=20170822&limit=40';
    
  $.ajax({
    method: "GET",
    dataType: "json",
    url: url
  }).done(function(data) {
    var locations = data.response.venues;
    locations.forEach(function(location, l) {
    vm.listings.push(new LocationModel(location,vm));
  });
    vm.errorMsg("");
  }).fail(function() {
    vm.errorMsg("Foursquare data not able to load");
  });
}
}

// function setMarkers(locations,vm) {
//   locations.forEach(function(location, i) {
//     //console.log(location);
//     var position = {lat: location.position.lat, lng: location.position.lng};
//     var name = location.name;
//     marker = new google.maps.Marker({
//       map: map,
//       position: position,
//       title: name,
//       animation: google.maps.Animation.DROP
//     })
//     vm.locationList()[i].marker = marker;
//     infowindow = new google.maps.InfoWindow();

//     markers.push(location.marker);
//     marker.addListener('click', function() {
//       populateInfoWindow(this, infoWindow);
//     })
//   });
  
// }

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    locations.forEach(function(locationItem){
      self.locationList.push(new LocationModel(locationItem));
    });
  }

  var vm = new ViewModel();

  ko.applyBindings(vm);
