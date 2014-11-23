CREATE TABLE playlists(_id TEXT PRIMARY KEY,
					  owner TEXT);

CREATE TABLE tracks(_id SERIAL PRIMARY KEY,
					track_id TEXT,
					playlist_id TEXT,
					vote_count INTEGER);