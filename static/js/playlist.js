angular.module('jukeboxApp')
  .factory('Playlist', function ($resource) {
    return $resource('/get-playlist/:playlistId', { playlistId: '@playlistId', userId: '@userId' }, {
      create: {
        method: 'GET',
        url: '/add-playlist/user/:userId/playlist/:playlistId'
      }
    });
});