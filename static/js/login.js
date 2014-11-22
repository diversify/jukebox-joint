angular.module('jukeboxApp')
  .controller('LoginCtrl', function ($rootScope, $scope, Spotify) {

    $scope.loginUser = function()
    {
        Spotify.login().then(function(data) {
          Spotify.getCurrentUser().then(function(data) {
            $rootScope.user = data;
          });
        });
    };
    
  });