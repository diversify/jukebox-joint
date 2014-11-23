import requests
import json

refresh_token = 'AQCTzySWQRMfXbACwv77MHEJfGHAmCIk_qLRx0cKdhXy-GLfCfdHX0F9sDV3FFiEjn6pGD8lYyFb0wVU_tmd9h-Yw2mEFRRKXJ6UFvOJRKgiXjgIfzMWsLpVa6WEwESSgtM'
secret = 'ODI5ZGM1ZjczNmE5NDJiNGI4OTVhZDZjZGI2YjE3MmU6ZmI3NTQ1YjhkNTQ3NDg0OWIzYWRkYjQ3OGIxMzg3NWY='
userid = 'gaeamearth1'

API = 'https://api.spotify.com/v1/users/gaeamearth1'

def headers():
	return {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + get_access_token()}

def body(data):
	return json.dumps(data)

def create_playlist(userid, name):
	url = '{0}/playlists'.format(API)
	request = requests.request('POST', url, data=body({'name': name}), headers=headers())

	playlistid = json.loads(request.text)['id']
	userid = json.loads(request.text)['owner']['id']

	return request, playlistid, name, userid

def refresh_order(tracks, playlistid):
	uris = {}
	track_ids = []

	for sorted_track in tracks:
		track_ids.append('spotify:track:' + sorted_track['track_id'])

	uris['uris'] = track_ids

	url = '{0}/playlists/{1}/tracks'.format(API, playlistid)
	request = requests.request('PUT', url, data=body(uris), headers=headers())

def add_song(playlistid, trackid):
	url = '{0}/playlists/{1}/tracks'.format(API, playlistid)
	request = requests.request('POST', url, data=body({'uris': ['spotify:track:' + trackid]}), headers=headers())
	return request, trackid, playlistid

def get_access_token():
	url = "https://accounts.spotify.com/api/token"
	payload = {'grant_type': 'refresh_token', 'refresh_token': refresh_token}
	headers = {'Authorization': 'Basic ' + secret}
	request = requests.post(url, data=payload, headers=headers)
	return json.loads(request.text)['access_token']