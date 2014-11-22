from flask import Flask, send_file, jsonify
app = Flask(__name__, static_url_path='', static_folder='../static')

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import Playlist, Track

engine = create_engine('postgresql://jukeboxuser:@localhost:1234/jukebox', encoding='utf-8')
session = sessionmaker(bind=engine)()

@app.route('/')
def root():
    return send_file('../templates/index.html')

@app.route('/get-playlist/<hash>')
def get_playlist(hash):
	return jsonify(dict(hash=hash))

if __name__ == '__main__':
    app.run(debug=True)