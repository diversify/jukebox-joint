angular.module('jukeboxApp')
  .controller('SearchSongCtrl', function ($scope, Spotify, $routeParameters) {
    
    $scope.searchSong = function()
    {
      $scope.searching = true;
      Spotify.search($scope.searchQuery, 'track', {limit: 50}).then(function(data) {
        $scope.searching = false;
        $scope.searchResults = data;
      });
    };
    
    $scope.addSong = function()
    {
      $http.post('/upvote/playlist/' + $scope.playlistId + '/track/' + track.id).
        success(function(data, status, headers, config) {
          
          console.log('Track added');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    };
    
    
  });
