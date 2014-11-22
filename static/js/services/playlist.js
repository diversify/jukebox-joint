angular.module('jukeboxApp')
  .factory('Playlist', function ($resource) {
    return $resource('/get-playlist/:playlistId', { playlistId: '@playlistId', userId: '@userId' }, {
      create: {
        method: 'POST',
        url: '/add-playlist/user/:userId/playlist/:playlistId'
      }
    });
});