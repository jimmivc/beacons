app.controller('beaconsController',function($scope, $ionicModal, localStorageService,$interval,$timeout){
 


function getRandomBetween(min,max){
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
}

//////////////

  ////config////
  beaconsIdsList = ['C1:E9:DC:18:A9:3B','CF:C6:23:E1:5E:8D','F4:13:15:D9:18:99','F2:6D:40:71:03:35','D1:8D:09:D5:6B:C4'];
  // beaconDistance = 10;
  //////NOT used/////////
  
  $scope.beaconsList = [{proximity:"..."}];

  beaconHot = 5.0;
  beaconWarm = 10.0;
  beaconArround = 20.0;
  searchInterval = 1000;//busca beacons cada x tiempo
  $scope.scanTimes = 0;

  beaconsList = [];
  distanceCache = null;
  closeCounter = 0;

  // localStorage.clear();
  // localStorage.setItem('beacons',JSON.stringify([]));

  $scope.closestBeaconInfo = "...";


  $scope.scanBeacons = function (){
    // alert('casual escaneando');
    startRangingBeacons();
  }

  // ------------- Private helper function ------------- //

  function onDeviceReady()
  {
    // TODO: Add functionality if needed.
    console.log('onDeviceReady')
  }

  // ------------- Initialisation ------------- //

  document.addEventListener('deviceready', onDeviceReady, false);


  function startRangingBeacons()
  {

    function onRange(beaconInfo)
    {
      displayBeconInfo(beaconInfo);
    }

    function onError(errorMessage)
    {
      console.log('Range error: ' + errorMessage);
    }

    function displayBeconInfo(beaconInfo)
    {
      // $scope.beaconsList = beaconInfo['beacons'];
      $scope.displaytimes = ++$scope.scanTimes;

      if(beaconInfo['beacons'].length>0){
        $scope.beaconsList = beaconInfo['beacons'];
      }else{
        $scope.beaconsList = [];
      }
    };

    // Request authorisation.
    estimote.beacons.requestAlwaysAuthorization();
    alert('starting scan');

    // Start ranging.
    
    estimote.beacons.startRangingBeaconsInRegion(
      {}, // Empty region matches all beacons.
      onRange,
      onError);
    
    function filterByMacAddress(pbeaconsList){
      var filteredList = [];
      for (var i = 0; i < pbeaconsList.length; i++) {
        for (var j = 0; j < beaconsIdsList.length; j++) {
          if (pbeaconsList[i].macAddress == beaconsIdsList[j]) {
            filteredList.push(pbeaconsList[i]);
            break;
          }
        }
      }

      return filteredList;
    };

  };

  function callMedia(beacon){

    // if(!findByMacAddress(beacon.macAddress)){

    //   //test
      
    // }
  }

  
  function isClose(meters, limit){
    if(meters<=limit){
      return true;
    }else{
      return false;
    }
  }

  function stopRangingBeacons()
  {
    estimote.beacons.stopRangingBeaconsInRegion({});
  };


});