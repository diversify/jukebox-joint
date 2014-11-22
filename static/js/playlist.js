angular.module('jukeboxApp')
  .controller('PlaylistCtrl', function ($rootScope, $scope, $routeParams) {
    $scope.playlistId = $routeParams;
  });