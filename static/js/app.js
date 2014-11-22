angular
  .module('jukeboxApp', [
    'ngRoute',
    'ngResource',
    'spotify',
    'underscore'
  ])
  
  .config(function($routeProvider, $locationProvider, SpotifyProvider) {
/*    SpotifyProvider.setClientId('829dc5f736a942b4b895ad6cdb6b172e');
    SpotifyProvider.setRedirectUri('http://127.0.0.1:5000/callback');
    SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public'); */
    
    $routeProvider
      .when('/search', {
        templateUrl : 'search.html'
      })
      .when('/playlists', {
        templateUrl : 'addPlaylist.html'
      })
      .when('/playlist/:playlistId', {
        templateUrl : 'playlist.html'
      })
      .otherwise({
        redirectTo: '/playlists'
      });
  });