angular.module('jukeboxApp')
  .controller('LoginCtrl', function ($scope, Spotify) {

    $scope.loginUser = function()
    {
        Spotify.login();
    };
    
  });