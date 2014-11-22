angular.module('jukeboxApp')
  .controller('PlaylistCtrl', function ($rootScope, $scope, $routeParams, Spotify) {
    $scope.playlistId = $routeParams.playlistId;
    $scope.userId = $routeParams.userId;
    
    Spotify.getPlaylist($scope.userId, $scope.playlistId).then(function (data) {
      $scope.playlist = data;
      
      Spotify.getPlaylistTracks($scope.userId, $scope.playlistId).then(function (data) {
        $scope.tracks = data.items;
      });
    });
  });