from flask import Flask, send_file, jsonify
app = Flask(__name__, static_url_path='', static_folder='../static')

import db
import service

refresh_token = 'AQCTzySWQRMfXbACwv77MHEJfGHAmCIk_qLRx0cKdhXy-GLfCfdHX0F9sDV3FFiEjn6pGD8lYyFb0wVU_tmd9h-Yw2mEFRRKXJ6UFvOJRKgiXjgIfzMWsLpVa6WEwESSgtM'
secret = 'ODI5ZGM1ZjczNmE5NDJiNGI4OTVhZDZjZGI2YjE3MmU6ZmI3NTQ1YjhkNTQ3NDg0OWIzYWRkYjQ3OGIxMzg3NWY='

API = 'https://api.spotify.com/v1'

@app.route('/')
def root():
    return send_file('../templates/index.html')
    
@app.route('/callback')
def spoti_callback():
    return send_file('../templates/callback.html')

@app.route('/create-playlist/user/<userid>/playlist-name/<name>', methods=['POST'])
def create_playlist(userid, name):
	request, playlistid, name, userid = service.create_playlist(userid, name)
	db.add_playlist(playlistid, name, userid)
	return request.text

@app.route('/upvote/playlist/<playlistid>/track/<trackid>', methods=['POST'])
def upvote(playlistid, trackid):
	db.upvote_track(playlistid, trackid)
	service.refresh_order(_get_tracks(playlistid), playlistid)
	return jsonify(Success="Track was upvoted")

@app.route('/downvote/playlist/<playlistid>/track/<trackid>', methods=['POST'])
def downvote(playlistid, trackid):
	db.downvote_track(playlistid, trackid)
	service.refresh_order(_get_tracks(playlistid), playlistid)
	return jsonify(Success="Track was downvoted")

@app.route('/add-song/playlist/<playlistid>/track/<trackid>', methods=['POST'])
def add_song(playlistid, trackid):
	request, trackid, playlistid = service.add_song(playlistid, trackid)
	db.add_track(trackid, playlistid)
	return request.text

def _get_tracks(playlist):
	tracks = []
	for track_entry in db.get_tracks_for_playlist(playlist):
		track = {}
		track['track_id'] = track_entry.track_id
		track['voteCount'] = track_entry.vote_count
		track['id'] = track_entry._id
		tracks.append(track)

	tracks.sort(key=lambda x: x['voteCount'], reverse=True)
	return tracks

@app.route('/get-playlist/<playlistid>')
def get_playlist(playlistid):
	playlist = db.get_playlist(playlistid)

	if not playlist:
		return jsonify(Error="Playlist ID was not found")

	return jsonify(playlist=(dict(
		id=playlist._id,
		name=playlist.name,
		owner=playlist.owner,
		tracks=_get_tracks(playlist._id))))

@app.route('/get-user-playlists/<userid>')
def get_playlists(userid):
	playlists = []
	for playlist_entry in db.get_playlists(userid):
		playlist = {}
		playlist['id'] = playlist_entry._id
		playlist['name'] = playlist_entry.name
		playlist['owner'] = playlist_entry.owner
		playlist['tracks'] = _get_tracks(playlist_entry._id)
		playlists.append(playlist)
	return jsonify(playlists=playlists)

if __name__ == '__main__':
    app.run(debug=True)