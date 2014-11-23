angular.module('jukeboxApp')
  .controller('SearchSongCtrl', function ($scope, Spotify, $routeParams, $http, $route) {
    $scope.hasAdded = true;
    
    $scope.searchSong = function()
    {
      $scope.hasAdded = false;
      $scope.searching = true;
      Spotify.search($scope.searchQuery, 'track', {limit: 50}).then(function(data) {
        $scope.searching = false;
        $scope.searchResults = data;
      });
    };
    
    $scope.addSong = function(trackId)
    {
      $http.post('/add-song/playlist/' + $routeParams.playlistId + '/track/' + trackId).
        success(function(data, status, headers, config) {
          $scope.hasAdded = true;
          $route.reload();
          console.log('Track added');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    };
    
    
  });
