angular.module('jukeboxApp')
  .controller('SearchSongCtrl', function ($scope, Spotify) {
    
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
      alert('something should happen here');
    };
    
    
  });
