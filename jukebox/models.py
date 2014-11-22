from sqlalchemy import Column, Integer, Unicode
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Playlist(Base):
	__tablename__ = 'playlists'
	
	_id = Column(Integer, primary_key=True)
	owner = Column(Unicode)

	def __init__(self, owner):
		self.owner = owner

class Track(Base):
	__tablename__ = 'tracks'
	
	_id = Column(Integer, primary_key=True)
	name = Column(Unicode)
	artist = Column(Unicode)
