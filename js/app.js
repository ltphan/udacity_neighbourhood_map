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

var map;

function initMap() {
  console.log("map printed");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2827291, lng: -123.1207375},
    zoom: 13,
    mapTypeControl: false
  });
}

var listing = function(data) {
  this.name = ko.observable(data.name);
  this.location = ko.observable(data.location);
}

var ViewModel = function() {
    var self = this;

    this.listingList = ko.observableArray([]);

    initialLocations.forEach(function(listingItem){
      self.listingList.push(new listing(listingItem));
    });
  }

  var vm = new ViewModel();

  ko.applyBindings(vm);