var map;
var infoWindow;

// error message if the Google maps page does not load
function mapError() {
  alert("The Google Maps API was not able to load.");
}

// loads Google map on page using Google Maps API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.245, lng: -123.1207375},
    zoom: 16,
    mapTypeControl: false
  });
  infoWindow = new google.maps.InfoWindow();
  fourSquareCalls();

  }


  function fourSquareCalls() {
    var url = 'https://api.foursquare.com/v2/venues/search?ll=49.245,-123.1207375&client_id=F3T5F3US0WH4QBJTBSGSA2WIMCTUIXPECQK2RZXRQ01N1QW4&client_secret=CACMXCC2LGMQKBIJCDJJD3ZRGKIOPFVFKPQC2IXWS3NFNJUV&v=20170822&limit=40';
      
    $.ajax({
      method: "GET",
      dataType: "json",
      url: url
    }).done(function(data) {
      console.log(data);
      var locations = data.response.venues;
      locations.forEach(function(location, l) {
      vm.locationList.push(new LocationModel(location));
    });
    }).fail(function() {
      alert("Foursquare data not able to load");
    });
  }


// location constructor that includes setting the markers, defines location
// properties, and information window for each location
function LocationModel(listing) {
  var self = this;
  self.name = listing.name;
  self.position = {lat: listing.location.lat, lng: listing.location.lng};
  self.address = listing.location.city;
  self.state = listing.location.state;
  self.zip = listing.location.postalCode;
  self.phone = listing.contact.formattedPhone;
  self.venueID = listing.id;
  self.marker = new google.maps.Marker({
    map: map,
    position: self.position,
    title: self.name,
    animation: google.maps.Animation.DROP
  })
  
  // self.infoWindow = new google.maps.InfoWindow({
  //   return 
  // });

  // set markers on the Google map
  self.marker.addListener('click', function() {
    infoWindow.setContent(self.name);
    infoWindow.open(map,this);
  })


}


var ViewModel = function(LocationModel) {
    var self = this;
    self.query = ko.observable('');
    self.locationList = ko.observableArray('');

    self.filterLocations = ko.computed(function() {
      var filter = self.filter();
      if (!filter) {
        alert("not printing");
      }
    })

  }

  var vm = new ViewModel();

  ko.applyBindings(vm);
