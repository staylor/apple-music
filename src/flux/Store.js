import { EventEmitter } from 'fbemitter';

let langs = {};
let data;
let audio;
let albumsById = {};
let artistsById = {};
let tracksById = {};

const emitter = new EventEmitter();

const Store = {
	AUDIO_PATH : '/audio/',

	init( records ) {
		data = records;
	},

	setAudio() {
		audio = document.createElement( 'audio' );
		if ( data.track ) {
			audio.src = `${this.AUDIO_PATH}${data.track.src}`;
		}

		audio.ontimeupdate = function ( event ) {
			Store.set( 'currentTime', event.timeStamp );
		};
	},

	getAudio() {
		if ( audio ) {
			return audio;
		}

		this.setAudio();

		return audio;
	},

	getData() {
		return data;
	},

	set( key, value, commit = true ) {
		data[ key ] = value;
		if ( commit && 'localStorage' in window ) {
			localStorage.setItem( 'data', JSON.stringify( data ) );
		}
		emitter.emit( `change:${key}` );
		emitter.emit( 'change' );
	},

	setData( newData, commit = true ) {
		data = newData;
		if ( commit && 'localStorage' in window ) {
			localStorage.setItem( 'data', JSON.stringify( newData ) );
		}
		emitter.emit( 'change' );
	},

	addListener( eventType, fn ) {
		return emitter.addListener( eventType, fn );
	},

	change() {
		emitter.emit( 'change' );
	},

	getLocale() {
		return data.locale;
	},

	getMessages() {
		const locale = this.getLocale();

		if ( langs[ locale ] ) {
			return langs[ locale ];
		}

		langs[ locale ] = require( `../langs/${locale}.js` ).default;

		return langs[ locale ];
	},

	albumById( albumId ) {
		albumId = parseInt( albumId, 10 );
		if ( albumsById[ albumId ] ) {
			return albumsById[ albumId ];
		}

		if ( ! data.catalog ) {
			return;
		}

		const album = data.catalog.albums.find( album => album.albumId === albumId );
		albumsById[ albumId ] = album;
		return album;
	},

	artistById( artistId ) {
		artistId = parseInt( artistId, 10 );
		if ( artistsById[ artistId ] ) {
			return artistsById[ artistId ];
		}

		if ( ! data.catalog ) {
			return;
		}

		const artist = data.catalog.artists.find( artist => artist.artistId === artistId );
		artistsById[ artistId ] = artist;
		return artist;
	},

	trackById( trackId ) {
		trackId = parseInt( trackId, 10 );
		if ( tracksById[ trackId ] ) {
			return tracksById[ trackId ];
		}

		if ( ! data.catalog ) {
			return;
		}

		const artist = data.catalog.tracks.find( track => track.trackId === trackId );
		tracksById[ trackId ] = artist;
		return artist;
	},

	getAlbums() {
		return data.catalog.albums;
	},

	getArtists() {
		return data.catalog.artists;
	},

	getTracks() {
		return data.catalog.tracks;
	}
};

export default Store;