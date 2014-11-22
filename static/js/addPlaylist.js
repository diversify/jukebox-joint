angular.module('jukeboxApp')
  .controller('AddPlaylistCtrl', function ($rootScope, $scope, Playlist, $location) {
    
    $scope.playlist = {};
    
    /* Called by view, saves a playlist */
    $scope.addPlaylist = function()
    {
        
      /* Save it in Jukebox */
      Playlist.create($scope.playlist, function() {
        /* GET THE PLAYLIST AGAIN */
        $location.path("/playlist/");
      });
        
    };
    
  });