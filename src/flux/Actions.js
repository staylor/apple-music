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
			audio = Store.getAudio();

		if ( store.song !== props.song ) {
			if ( audio.src && ! audio.paused ) {
				audio.pause();
			}
			if ( props.song.src ) {
				audio.src = '/audio/' + props.song.src;
				audio.load();
				willPlay = true;
			} else {
				this.audio.src = '';
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

		store.album = props.album;
		store.song = props.song;

		Store.setData( store );
	}
};

export default Actions;