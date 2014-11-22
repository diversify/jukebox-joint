jukebox-joint
=============

If you have a Spotify account - let's start a jukebox!

Setup
==========
requirements.txt
----------
Install the pip packages using:

    pip install -r requirements.txt

Start postgres (install postgres if you don't have it):

    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

Create a local db: 

    /scripts/createdb.sh
    
Run the server:

    python jukebox/jukebox.py
