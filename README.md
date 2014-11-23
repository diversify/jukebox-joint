jukebox-joint
=============

If you have a Spotify account - let's start a jukebox!

Setup
==========
Install the pip packages using:

    pip install -r requirements.txt

Start postgres (install postgres if you don't have it):

    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

Create a local db: 

    /scripts/createdb.sh
    
Run the server:

    python jukebox/jukebox.py
    
API
==========
Create a playlist
----------

    /create-playlist/user/<userid>/playlist-name/<name>

Creates a new playlist and adds it to the database

Add a track to a playlist
----------

    /add-song/playlist/<playlistid>/track/<trackid>
    
Adds a track to the specified playlist

Fetch a playlist
----------

    /get-playlist/<playlistid>
    
Fetches a playlist with its info
