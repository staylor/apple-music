import fetch from 'node-fetch';
import NodeCache from 'node-cache';

const clientId = 'b791653f8886473db15526cc8ea24588';
const clientSecret = 'fddc22b8fd85445db6477b5fe502ab90';
const tokenUrl = 'https://accounts.spotify.com/api/token';
const newReleasesUrl = 'https://api.spotify.com/v1/browse/new-releases';
const albumUrl = 'https://api.spotify.com/v1/albums/';

const tokenKey = 'spotify:token';
let cache;
let authToken;

class Spotify {
	constructor() {
		cache = new NodeCache();
	}

	getToken() {
		return new Promise( ( resolve, reject ) => {
			cache.get( tokenKey, ( err, value ) => {
				if ( err ) {
					console.warn( 'CACHE ERROR: ' + tokenKey );
					reject( err );
					return;
				}

				if ( value ) {
					console.log( 'CACHE HIT: ' + value );
					resolve( value );
					return value;
				}

				const auth = new Buffer( `${clientId}:${clientSecret}` ).toString( 'base64' );

				fetch( tokenUrl, {
					method: 'POST',
					body: 'grant_type=client_credentials',
					headers: {
						'Content-Type':'application/x-www-form-urlencoded',
						'Authorization': `Basic ${auth}`
					}
				} )
					.catch( err => reject( err ) )
					.then( response => response.json() )
					.then( json => {
						cache.set(
							tokenKey,
							json.access_token,
							json.expires_in
						);

						resolve( json.access_token );
						return json.access_token;
					} );
			} );
		} );
	}

	fetch( url, args ) {
		return this.getToken().then( token => {
			let headers = {
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`
			};
			if ( args && args.headers ) {
				headers = Object.assign( {}, headers, args.headers );
				delete args.headers;
			}

			const args = Object.assign( {}, {
				headers,
				...args
			} );

			return fetch.call( this, url, args )
				.then( response => response.json() )
				.catch( err => {
					console.log( 'ERROR', err );
				} );
		} );
	}

	getAlbums() {
		return this.fetch( newReleasesUrl ).then( json => {
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
		return this.fetch( `${albumUrl}${id}` ).then( json => {
			json.album_id = json.id;

			return json;
		} );
	}

	getArtist( id ) {

	}

	getTrack( id ) {

	}
}

export default Spotify;