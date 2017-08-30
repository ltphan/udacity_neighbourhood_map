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
    zoom: 15,
    mapTypeControl: false
  });
  fourSquareCalls();
  infoWindow = new google.maps.InfoWindow();

  }

// retrieving locations from Foursquare API 
  function fourSquareCalls() {
    var url = 'https://api.foursquare.com/v2/venues/search?ll=49.245,-123.1207375&client_id=F3T5F3US0WH4QBJTBSGSA2WIMCTUIXPECQK2RZXRQ01N1QW4&client_secret=CACMXCC2LGMQKBIJCDJJD3ZRGKIOPFVFKPQC2IXWS3NFNJUV&v=20170822&limit=20';
      
    $.ajax({
      method: "GET",
      dataType: "json",
      url: url
    }).done(function(data) {
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
function LocationModel(location) {
  var self = this;
  self.name = location.name? location.name : "";
  self.position = {lat: location.location.lat, lng: location.location.lng};
  self.address = location.location.city ? location.location.city : "No address available";
  self.state = location.location.state? location.location.state : "";
  self.postalCode = location.location.postalCode? location.location.postalCode : "";
  self.phone = location.contact.formattedPhone? location.contact.formattedPhone : "";
  self.venueID = location.id;
  self.marker = new google.maps.Marker({
    map: map,
    position: self.position,
    title: self.name,
    animation: google.maps.Animation.DROP
  });
  
  self.contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">' + self.name + '</h1>' + '<div id="bodyContent">' + '<p>' +  self.address + ', ' + self.state + '<br>' + self.postalCode + '<br>' + self.phone + '<br>' + '</p>' + '</div>' + '</div>';

  // set markers on the Google map alongside with its information content
  self.marker.addListener('click', function() {
    console.log(vm.locationList());
    infoWindow.setContent(self.contentString);
    infoWindow.open(map,self.marker);
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      self.marker.setAnimation(null);
    }, 1400);
  });
}

// displaying the points on Google Maps
var ViewModel = function(LocationModel) {
    var self = this;
    self.query = ko.observable();
    self.locationList = ko.observableArray([]);
    
    self.locationClick = function(location) {
      google.maps.event.trigger(location.marker, 'click');
    };

    // filtering the list of locations based on user's input
    self.filteredList = ko.computed(function() {
      var filter = self.query();
      if (!filter) {
        self.locationList().forEach(function(location) {
          if (location.marker) {
            location.marker.setVisible(true);
          }
        });
        return self.locationList();
      } else {
        return ko.utils.arrayFilter(self.locationList(), function(location) {
          if (location.name.toLowerCase().indexOf(filter) != -1 ) {
            location.marker.setVisible(true);
            return location;
          } else {
            location.marker.setVisible(false);
            infoWindow.close();
          }
        });
      }
    }, self.animateMarker = function(location){
      google.maps.event.trigger(location.marker, 'click');
    });
  };

  var vm = new ViewModel();

  ko.applyBindings(vm);