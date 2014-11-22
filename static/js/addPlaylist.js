angular.module('jukeboxApp')
  .controller('AddPlaylistCtrl', function ($rootScope, $scope, Spotify, Playlist) {
    
    $scope.playlist = {};
    
    /* Called by view, saves a playlist */
    $scope.addPlaylist = function()
    {
      /* Save it in Spotify */
      Spotify.createPlaylist($rootScope.user.id, {name: $scope.playlist.name}).then(function(data) {
        $scope.playlist.playlistId = data.id;
        $scope.playlist.userId = $rootScope.user.id;
        console.log('Saved in Spotify');
        
        /* Save it in Jukebox */
        Playlist.create($scope.playlist);
        
        /* NOW REDIRECT TO IT DAWG */
      });
    };
    
  });