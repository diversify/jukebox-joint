angular.module('jukeboxApp')
  .factory('Playlist', function ($resource) {
    return $resource('/get-playlist/:playlistId', { playlistId: '@playlistId' }, {
      create: {
        method: 'POST',
        url: '/add-playlist/user/gaeamearth1/playlist/:playlistId'
      }
    });
});