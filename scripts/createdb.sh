#!/bin/bash

DATABASE="jukebox"
USER="jukeboxuser"

# remove the database if it already exists
dropdb $DATABASE

# drop user if it already exist
dropuser $USER

# create user for the database
echo "Creating new user <$USER>..."
createuser -d  -s $USER

# create the database
echo "Creating new database <$DATABASE>..."
createdb $DATABASE -U $USER -W -h localhost -w

# create the database schema
echo "Creating tables..."
psql -d $DATABASE -f schema.sql