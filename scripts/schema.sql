CREATE TABLE playlists(_id TEXT PRIMARY KEY,
					  owner TEXT);

CREATE TABLE tracks(_id TEXT PRIMARY KEY,
					 playlist_id TEXT,
					 vote_count INTEGER);