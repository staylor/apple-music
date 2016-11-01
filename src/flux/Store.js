import { EventEmitter } from 'fbemitter';

let data;
let audio;

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

	setAudio( src = null ) {
		audio = document.createElement( 'audio' );
		if ( src ) {
			audio.src = src;
		}
		audio.ontimeupdate = function ( event ) {
			Store.set( 'currentTime', event.timeStamp );
		};
	},

	getAudio() {
		if ( audio ) {
			return audio;
		}

		if ( data.song && data.song.src ) {
			this.setAudio( this.AUDIO_PATH + data.song.src );
		} else {
			this.setAudio();
		}

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
		emitter.addListener( eventType, fn );
	}
};

export default Store;