angular.module('jukeboxApp')
  .controller('AddPlaylistCtrl', function ($rootScope, $scope, Playlist, $location, $http) {
    
    $scope.playlist = {};
    
    $http.get('/get-user-playlists/' + 'gaeamearth1').
        success(function(data, status, headers, config) {
          $scope.playlists = data;
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    
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