import cookie from 'react-cookie';
import Store from './Store';

const Actions = {
	toggleControl() {
		const audio = Store.getAudio();

		if ( ! audio || ! audio.src ) {
			return;
		}

		if ( audio.paused ) {
			audio.play();
		} else {
			audio.pause();
		}

		Store.change();
	},

	setSong( props ) {
		let willPlay, willPause,
			store = Store.getData(),
			audio = Store.getAudio(),
			album = Object.assign( {}, props.album );

		if ( props.album.artist && props.album.artist.edges ) {
			album.artist.edges.reverse().map( edge => album.artist = edge.node );
		}

		if ( store.track !== props.track ) {
			if ( audio.src && ! audio.paused ) {
				audio.pause();
			}
			if ( props.track.src ) {
				audio.src = `${Store.AUDIO_PATH}${props.track.src}`;
				audio.load();
				willPlay = true;
			} else {
				audio.src = '';
			}
		} else {
			if ( audio.paused ) {
				willPlay = true;
			} else {
				willPause = true;
			}
		}

		if ( willPlay ) {
			audio.play();
		} else if ( willPause ) {
			audio.pause();
		}

		cookie.save( 'album', album.albumId, { path: '/' } );
		cookie.save( 'track', props.track.trackId, { path: '/' } );
		store.album = album.albumId;
		store.track = props.track.trackId;

		Store.setData( store );
	}
};

export default Actions;