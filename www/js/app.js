// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('beaconApp', ['ionic','LocalStorageModule']);

app.config(function (localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('beaconApp');
})

.run(function($ionicPlatform, $ionicLoading) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('LoadingCtrl', function($scope, $ionicLoading) {
  // loading();

  $scope.loading = function() {
    $ionicLoading.show({
      templateUrl: 'templates/loading.html',
      duration: 3000
    }).then(function(){
       // console.log("The loading indicator is now displayed");
    });
  };
  
});

//configuracion de rutas
app.config(function($stateProvider, $urlRouterProvider) {
 
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: 'templates/beacons.html',
      controller : 'beaconsController'
    })    

    ;
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');
 
});

