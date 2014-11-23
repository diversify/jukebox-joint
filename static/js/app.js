angular
  .module('jukeboxApp', [
    'ngRoute',
    'ngTouch',
    'ngResource',
    'spotify',
    'underscore'
  ])
  
  .config(function($routeProvider, $locationProvider, SpotifyProvider) {
/*    SpotifyProvider.setClientId('829dc5f736a942b4b895ad6cdb6b172e');
    SpotifyProvider.setRedirectUri('http://127.0.0.1:5000/callback');
    SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public'); */
    
    $routeProvider
      .when('/playlists', {
        templateUrl : 'addPlaylist.html'
      })
      .when('/playlist/:playlistId', {
        templateUrl : 'playlist.html'
      })
      .when('/playlist', {
        templateUrl : 'playlist.html'
      })
      .otherwise({
        redirectTo: '/playlist'
      });
  });