from flask import Flask, send_file, jsonify
app = Flask(__name__, static_url_path='', static_folder='../static')

import db

@app.route('/')
def root():
    return send_file('../templates/index.html')

@app.route('/add-song/playlist/<playlistid>/track/<trackid>')
def add_song(playlistid, trackid):
	db.add_track(trackid, playlistid)
	return jsonify(Success="Track was added")


@app.route('/add-playlist/user/<userid>/playlist/<playlistid>')
def add_playlist(userid, playlistid):
	db.add_playlist(playlistid, userid)
	return jsonify(Success="Playlist was added")

@app.route('/get-playlist/<playlistid>')
def get_playlist(playlistid):
	playlist = db.get_playlist(playlistid)
	tracks = []

	for track_entry in db.get_tracks_for_playlist(playlistid):
		track = {}
		track['ID'] = track_entry._id
		track['voteCount'] = track_entry.vote_count
		tracks.append(track)

	print tracks

	if not playlist:
		return jsonify(Error="Playlist ID was not found")
	
	return jsonify(playlist=(dict(
		id=playlist._id,
		owner=playlist.owner,
		tracks=tracks)))


if __name__ == '__main__':
    app.run(debug=True)