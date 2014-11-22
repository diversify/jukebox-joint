angular.module('jukeboxApp')
  .controller('AddPlaylistCtrl', function ($rootScope, $scope, Spotify, Playlist, $location) {
    
    $scope.playlist = {};
    
    /* Called by view, saves a playlist */
    $scope.addPlaylist = function()
    {
      /* Save it in Spotify */
      Spotify.createPlaylist($rootScope.user.id, {name: $scope.playlist.name}).then(function(data) {
        $scope.playlist.playlistId = data.id;
        $scope.playlist.userId = $rootScope.user.id;
        
        /* Save it in Jukebox */
        Playlist.create($scope.playlist, function() {
          $location.path("/playlist/" + $scope.playlist.userId + "/" + $scope.playlist.playlistId);
        });
        
        /* NOW REDIRECT TO IT DAWG */
      });
    };
    
  });