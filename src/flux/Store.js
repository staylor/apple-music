import { EventEmitter } from 'fbemitter';

let data;
let audio;
let albumsById = {};
let artistsById = {};
let albumsByArtist = {};

const emitter = new EventEmitter();

const Store = {
	AUDIO_PATH : '/audio/',

	init( records ) {
		const storage = 'localStorage' in window ? localStorage.getItem( 'data' ) : null;
		if ( ! storage ) {
			data = records;
		} else {
			data = JSON.parse( storage );
		}
	},

	setAudio() {
		audio = document.createElement( 'audio' );
		if ( data.song ) {
			audio.src = this.AUDIO_PATH + data.song.src;
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
		emitter.emit( 'change:' + key );
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

	albumById( albumId ) {
		if ( albumsById[ albumId ] ) {
			return albumsById[ albumId ];
		}

		if ( ! data.catalog ) {
			return;
		}

		albumsById[ albumId ] = data.catalog.find( album => album.id === albumId );
		return albumsById[ albumId ];
	},

	artistById( artistId ) {
		if ( artistsById[ artistId ] ) {
			return artistsById[ artistId ];
		}

		if ( ! data.catalog ) {
			return;
		}

		let album = data.catalog.find( album => album.artist.id === artistId );
		artistsById[ artistId ] = album.artist;
		return artistsById[ artistId ];
	},

	albumsByArtist( artistId ) {
		if ( albumsByArtist[ artistId ] ) {
			return albumsByArtist[ artistId ];
		}

		if ( ! data.catalog ) {
			return;
		}

		const albums = data.catalog.filter( album => album.artist.id === artistId );
		albumsByArtist[ artistId ] = albums;
		return albums;
	}
};

export default Store;