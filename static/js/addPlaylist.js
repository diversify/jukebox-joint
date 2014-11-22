angular.module('jukeboxApp')
  .controller('AddPlaylistCtrl', function ($rootScope, $scope, Spotify, Playlist) {
    
    $scope.playlist = {};
    $scope.ready = false;
    
    Spotify.getCurrentUser().then(function(data) {
      $scope.user = data;
      $scope.playlist.userId = data.id;
      $scope.ready = true;
    });
    
    
    $scope.addPlaylist = function()
    {
      Playlist.create($scope.playlist, function() {
        console.log('playlist saved');
      });
    };
    
  });