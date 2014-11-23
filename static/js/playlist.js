angular.module('jukeboxApp')
  .controller('PlaylistCtrl', function ($rootScope, $scope, $routeParams, Spotify, $http, _, $location) {
    $scope.playlistId = $routeParams.playlistId;
    $scope.userId = 'gaeamearth1';
    
    $scope.name = $scope.playlistId;
    
    $http.get('/get-playlist/' + $scope.playlistId).
        success(function(data, status, headers, config) {
          var tracks = data.playlist.tracks;
          $scope.newTracks = [];
          _(tracks).forEach(function(trk) {
            Spotify.getTrack(trk.ID).then(function (data) {
              var track = data;
              track.voteCount = trk.voteCount;
              $scope.newTracks.push(track);
              console.log(track);
            });
          });
          $scope.tracks = $scope.newTracks;
          console.log('Tracks loaded');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    
    $scope.upvote = function(track)
    {
      $http.post('/upvote/playlist/' + $scope.playlistId + '/track/' + track.id).
        success(function(data, status, headers, config) {
          var thisTrack = _.find($scope.tracks, function(trk) {
            return trk.id == track.id;
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
        return trk.id == track.id;
      });
      
      if(thisTrack.voteCount !== 0) {
          $http.post('/downvote/playlist/' + $scope.playlistId + '/track/' + track.id).
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