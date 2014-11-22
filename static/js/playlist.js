angular.module('jukeboxApp')
  .controller('PlaylistCtrl', function ($rootScope, $scope, $routeParams, Spotify, $http, _, $location) {
    $scope.playlistId = $routeParams.playlistId;
    $scope.userId = 'gaeamearth1';
    
    $scope.name = 'Good playlist';
    
    $http.get('/get-playlist/' + $scope.playlistId).
        success(function(data, status, headers, config) {
          $scope.tracks = data.playlist.tracks;
          console.log($scope.playlist);
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    
    $scope.upvote = function(track)
    {
      $http.post('/upvote/playlist/' + $scope.playlistId + '/track/' + track.ID).
        success(function(data, status, headers, config) {
          var thisTrack = _.find($scope.tracks, function(trk) {
            return trk.ID == track.ID;
          });
          
          thisTrack.voteCount++;
          
          console.log('Upvoted');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    };
    
    $scope.downvote = function(track)
    {
      var thisTrack = _.find($scope.tracks, function(trk) {
        return trk.ID == track.ID;
      });
      
      if(thisTrack.voteCount !== 0) {
          $http.post('/downvote/playlist/' + $scope.playlistId + '/track/' + track.ID).
            success(function(data, status, headers, config) {
              thisTrack.voteCount--;
              console.log('Downvoted');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
      }
    };
    
    $scope.addSong = function()
    {
      $location.path('/search/' + $scope.playlistId);
    };
    
    
  });