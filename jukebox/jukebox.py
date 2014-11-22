from flask import Flask, send_file, jsonify
app = Flask(__name__, static_url_path='', static_folder='../static')

import db

refresh_token = 'AQB6SmB6U3b9Gto2AOAPyde21Jd63ew1HxE1q3K20icxitUh3kkjLVj8tN5woojpvLQHR84au1UwDK97KFHQ19rF16N5ZA2kqsOHSNEjX0OtgCXHoZBoHAnNmbfG9siOrVM'

@app.route('/')
def root():
    return send_file('../templates/index.html')
    
@app.route('/callback')
def spoti_callback():
    return send_file('../templates/callback.html')

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
	db.add_track(trackid, playlistid)
	return jsonify(Success="Track was added")

@app.route('/add-playlist/user/<userid>/playlist/<playlistid>', methods=['POST'])
def add_playlist(userid, playlistid):
	playlist = db.get_playlist(playlistid)
	if playlist:
		return jsonify(Error="Playlist is already added") 
	
	db.add_playlist(playlistid, userid)
	return jsonify(Success="Playlist was added")

def _get_tracks(playlist):
	tracks = []
	for track_entry in db.get_tracks_for_playlist(playlist._id):
		track = {}
		track['ID'] = track_entry._id
		track['voteCount'] = track_entry.vote_count
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
		playlist['owner'] = playlist_entry.owner
		playlist['tracks'] = _get_tracks(playlist_entry)
		playlists.append(playlist)
	return jsonify(playlists=playlists)


if __name__ == '__main__':
    app.run(debug=True)