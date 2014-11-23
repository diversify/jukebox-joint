angular.module('jukeboxApp')
  .controller('PlaylistCtrl', function ($rootScope, $scope, $routeParams, Spotify, $http, _, $location) {
    $scope.playlistId = $routeParams.playlistId;
    $scope.userId = 'gaeamearth1';
    $scope.upvoted = [];
    $scope.downvoted = [];
    
    $scope.name = $scope.playlistId;
    
    $http.get('/get-playlist/' + $scope.playlistId).
        success(function(data, status, headers, config) {
          $scope.name = data.playlist.name;
          var tracks = data.playlist.tracks;
          $scope.newTracks = [];
          _(tracks).forEach(function(trk) {
            Spotify.getTrack(trk.track_id).then(function (data) {
              var track = data;
              track.voteCount = trk.voteCount;
              track.dbid = trk.id;
              $scope.newTracks.push(track);
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
      if(typeof $scope.upvoted[track.dbid] !== 'undefined' && $scope.upvoted[track.dbid] !== false) {
        return;
      }
      
      track.voteCount++;
      

      $http.post('/upvote/playlist/' + $scope.playlistId + '/track/' + track.dbid).
        success(function(data, status, headers, config) {
          $scope.upvoted[track.dbid] = true;
          $scope.downvoted[track.dbid] = false;
          var thisTrack = _.find($scope.tracks, function(trk) {
            return trk.id == track.id;
          });
          
          console.log('Upvoted');
        }).
        error(function(data, status, headers, config) {
          console.log('Dun goofed');
        });
    };
    
    $scope.downvote = function(track)
    {
      if(typeof $scope.downvoted[track.dbid] !== 'undefined' && $scope.downvoted[track.dbid] !== false) {
        return;
      }

      var thisTrack = _.find($scope.tracks, function(trk) {
        return trk.id == track.id;
      });
      
        thisTrack.voteCount--;

      
        $scope.downvoted[track.dbid] = true;
        $scope.upvoted[track.dbid] = false;
        $http.post('/downvote/playlist/' + $scope.playlistId + '/track/' + track.dbid).
          success(function(data, status, headers, config) {
            console.log('Downvoted');
      }).
      error(function(data, status, headers, config) {
        console.log('Dun goofed');
      });
      
    };

    $scope.determineRating = function(track){
      $scope.ratingClass = 'neutral';
      if(track.voteCount > 0){
        $scope.ratingClass = 'good';
      }
      else if(track.voteCount < 0){
        $scope.ratingClass = 'bad';
      };
    };
    
  });