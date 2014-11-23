from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func
from models import Playlist, Track

engine = create_engine('postgresql://jukeboxuser:@localhost/jukebox', encoding='utf-8')
session = sessionmaker(bind=engine)()

def add_track(trackid, playlistid):
	track = Track(trackid, playlistid)
	session.add(track)
	session.commit()

def add_playlist(playlistid, name, user):
	playlist = Playlist(playlistid, name, user)
	session.add(playlist)
	session.commit()

def get_playlist(playlistid):
	return session.query(Playlist).filter(Playlist._id == playlistid).first()

def get_playlists(userid):
	return session.query(Playlist).filter(
        (func.lower(Playlist.owner) == func.lower(userid))).all()

def get_owner(playlistid):
	return get_playlist(playlistid).owner

def get_tracks_for_playlist(playlistid):
	return session.query(Track).filter(Track.playlist_id == playlistid).all()

def upvote_track(playlistid, trackid):
	session.query(Track).filter(
		Track._id == trackid, 
		Track.playlist_id == playlistid).update({Track.vote_count: Track.vote_count + 1})
	session.commit()

def downvote_track(playlistid, trackid):
	session.query(Track).filter(
		Track._id == trackid, 
		Track.playlist_id == playlistid).update({Track.vote_count: Track.vote_count - 1})
	session.commit()