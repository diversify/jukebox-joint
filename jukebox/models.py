from sqlalchemy import Column, Integer, Unicode
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Playlist(Base):
	__tablename__ = 'playlists'
	
	_id = Column(Unicode, primary_key=True)
	name = Column(Unicode)
	owner = Column(Unicode)

	def __init__(self, id, name, owner):
		self._id = id
		self.name = name
		self.owner = owner

class Track(Base):
	__tablename__ = 'tracks'
	
	_id = Column(Integer, autoincrement=True, primary_key=True)
	track_id = Column(Unicode, primary_key=True)
	playlist_id = Column(Unicode)
	vote_count = Column(Integer)

	def __init__(self, id, playlist_id):
		self.track_id = id
		self.playlist_id = playlist_id
		self.vote_count = 0