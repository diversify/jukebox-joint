from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import Playlist, Track

engine = create_engine('postgresql://jukeboxuser:@localhost/jukebox', encoding='utf-8')
session = sessionmaker(bind=engine)()

def add_track(trackid, playlistid):
	track = Track(trackid, playlistid)
	session.add(track)
	session.commit()

def add_playlist(playlistid, user):
	playlist = Playlist(playlistid, user)
	session.add(playlist)
	session.commit()

def get_playlist(playlistid):
	return session.query(Playlist).filter(Playlist._id == playlistid).first()

def get_tracks_for_playlist(playlistid):
	return session.query(Track).filter(Track.playlist_id == playlistid).all()