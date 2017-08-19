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

var ViewModel = function(initialLocations) {
    this.initialLocations = ko.observableArray(initialLocations);


    this.initialLocations().forEach(function(location) {
      location.visible = ko.observable(true);
    });

  };

  var vm = new ViewModel();

  ko.applyBindings(vm);