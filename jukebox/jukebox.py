from flask import Flask, send_file, jsonify
app = Flask(__name__, static_url_path='', static_folder='../static')

import requests
import json
import db

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
	url = '{0}/users/{1}/playlists'.format(API, userid)
	payload = {'name': name}
	headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + get_access_token()}
	request = requests.post(url, data=json.dumps(payload), headers=headers)

	playlistid = json.loads(request.text)['id']
	userid = json.loads(request.text)['owner']['id']
	db.add_playlist(playlistid, name, userid)

	return request.text

@app.route('/upvote/playlist/<playlistid>/track/<trackid>', methods=['POST'])
def upvote(playlistid, trackid):
	db.upvote_track(playlistid, trackid)
	return jsonify(Success="Track was upvoted")

@app.route('/downvote/playlist/<playlistid>/track/<trackid>', methods=['POST'])
def downvote(playlistid, trackid):
	db.downvote_track(playlistid, trackid)
	return jsonify(Success="Track was downvoted")

@app.route('/add-song/playlist/<playlistid>/track/<trackid>', methods=['POST'])
def add_song(playlistid, trackid):
	userid = db.get_owner(playlistid)
	url = '{0}/users/{1}/playlists/{2}/tracks'.format(API, userid, playlistid)
	headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + get_access_token()} 
	payload = {'uris': ['spotify:track:' + trackid]}
	request = requests.post(url, data=json.dumps(payload), headers=headers)

	db.add_track(trackid, playlistid)
	return request.text

def _get_tracks(playlist):
	tracks = []
	for track_entry in db.get_tracks_for_playlist(playlist._id):
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
		owner=playlist.owner,
		tracks=_get_tracks(playlist))))

@app.route('/get-user-playlists/<userid>')
def get_playlists(userid):
	playlists = []
	for playlist_entry in db.get_playlists(userid):
		playlist = {}
		playlist['id'] = playlist_entry._id
		playlist['name'] = playlist_entry.name
		playlist['owner'] = playlist_entry.owner
		playlist['tracks'] = _get_tracks(playlist_entry)
		playlists.append(playlist)
	return jsonify(playlists=playlists)

def get_access_token():
	url = "https://accounts.spotify.com/api/token"
	payload = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}
	headers = {'Authorization': 'Basic ' + secret}
	request = requests.post(url, data=payload, headers=headers)
	return json.loads(request.text)['access_token']

if __name__ == '__main__':
    app.run(debug=True)