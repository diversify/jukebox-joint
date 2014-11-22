angular.module('jukeboxApp')
  .controller('SearchSongCtrl', function ($scope, Spotify, $routeParams, $http) {
    
    $scope.searchSong = function()
    {
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
          
          console.log('Track added');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    };
    
    
  });
