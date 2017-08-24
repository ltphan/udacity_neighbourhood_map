var map;
var infoWindow;
var markers = [];


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
  infoWindow = new google.maps.InfoWindow();
  fourSquareCalls();

  }

// retrieving locations from Foursquare API 
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
function LocationModel(location) {
  var self = this;
  self.name = location.name;
  self.position = {lat: location.location.lat, lng: location.location.lng};
  self.address = location.location.city;
  self.state = location.location.state;
  self.zip = location.location.postalCode;
  self.phone = location.contact.formattedPhone;
  self.venueID = location.id;
  self.website = location.location.url;
  self.infoWindow = new google.maps.InfoWindow({
    content: contentString
 })
  self.marker = new google.maps.Marker({
    map: map,
    position: self.position,
    title: self.name,
    animation: google.maps.Animation.DROP
  })
  markers.push(self.marker);
  
  var website = function(location) {
    return website = '<a href="' + self.website + '"taget="_blank">Visit Website</a>' + '<br>';
  }

  var contentString = function(location) {
    return (
    '<div id="content">' + '<div id="siteNotice">' +
    '</div>' + 
    '<h1 id="firstHEading" class="firstHeading">' + self.name + '</h1>' +
    '<div id="bodyContent">' + '<p>' +  self.address + ', ' + self.state + ', ' + self.zip 
    + '<br>' + self.phone + '<br>' + '</p>' + 
    '</div>' + website + '</div>'); 
  }


  // set markers on the Google map alongside with its information content
  self.marker.addListener('click', function() {
    console.log(contentString);
    infoWindow.setContent(self.infoWindow[0]);
    infoWindow.open(map,self.marker);
  })


}

// displaying the points on Google Maps
var ViewModel = function(LocationModel) {
    var self = this;
    self.query = ko.observable();
    self.locationList = ko.observableArray([]);

    // filtering the list of locations based on user's input
    self.filteredList = ko.computed(function() {
      // toLowerCase doesn't work, but it does for line 94??
      var filter = self.query();
      if (!filter) {
        self.locationList().forEach(function(location) {
          if (location.marker) {
            location.marker.setVisible(true);
          }
        });
        return self.locationList()
      } else {
        return ko.utils.arrayFilter(self.locationList(), function(location) {
          if (location.name.toLowerCase().indexOf(filter) != -1 ) {
            location.marker.setVisible(true);
            return true;
          } else {
            location.marker.setVisible(false);
            return false;
          }
          return location.marker;
        });
      }
    }, self.animateMarker = function(location){
      google.maps.event.trigger(location.marker, 'click');
    });
  }

  var vm = new ViewModel();

  ko.applyBindings(vm);
