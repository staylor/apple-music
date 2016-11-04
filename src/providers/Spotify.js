import fetch from 'node-fetch';

const base64creds = 'Yjc5MTY1M2Y4ODg2NDczZGIxNTUyNmNjOGVhMjQ1ODg6ZmRkYzIyYjhmZDg1NDQ1ZGI2NDc3YjVmZTUwMmFiOTA=';
const token = 'BQAFEbSEt53LGP178yMAghoQDHn4SktnwRF0VZbSAv4gGmO8O-qQA8bjoYrYT5EH0mBspHQciLYQYGOfwJhZFQ';
const exampleUrl = 'https://api.spotify.com/v1/browse/new-releases';

class Spotify {
	getAlbums() {
		return fetch( exampleUrl, {
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		} )
			.then( response => response.json() )
			.then( json => {
				let items = json.albums.items.map( item => {
					item.album_id = item.id;
					return item;
				} );

				return {
					results: items
				};
			} );
	}

	getAlbum( id ) {

	}

	getArtist( id ) {

	}

	getTrack( id ) {

	}
}

export default Spotify;