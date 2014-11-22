angular.module('jukeboxApp')
  .controller('PlaylistCtrl', function ($rootScope, $scope, $routeParams, Spotify, $http, _, $location) {
    $scope.playlistId = $routeParams.playlistId;
    $scope.userId = 'gaeamearth1';
    
    $scope.name = 'Good playlist';
    
    $scope.tracks = [
      {title: 'Hejsan Svejsan 1', id: 214124, vote: 0},
      {title: 'Hejsan Svejsan 2', id: 214125, vote: 0},
      {title: 'Hejsan Svejsan 3', id: 214126, vote: 0},
      {title: 'Hejsan Svejsan 4', id: 214127, vote: 0},
      {title: 'Hejsan Svejsan 5', id: 214128, vote: 0},
      {title: 'Hejsan Svejsan 6', id: 214129, vote: 0},
      {title: 'Hejsan Svejsan 7', id: 214123, vote: 0}
    ];
    
    $scope.upvote = function(track)
    {
      $http.post('/upvote/playlist/' + $scope.playlistId + '/track/' + track.id).
        success(function(data, status, headers, config) {
          var thisTrack = _.find($scope.tracks, function(trk) {
            return trk.id == track.id;
          });
          
          thisTrack.vote++;
          
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
      
      if(thisTrack.vote !== 0) {
          $http.post('/downvote/playlist/' + $scope.playlistId + '/track/' + track.id).
            success(function(data, status, headers, config) {
              thisTrack.vote--;
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