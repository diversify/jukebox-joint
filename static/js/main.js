angular.module('jukeboxApp')
  .controller('MainCtrl', function ($rootScope, $scope, Spotify, Playlist) {
    
    $scope.playlist = {};
    $scope.playlist.playlistId = '';
    $scope.playlist.userId = '123';
    
    $scope.addPlaylist = function()
    {
      Playlist.create($scope.playlist, function() {
        console.log('saved');
      });
    };
    
  });