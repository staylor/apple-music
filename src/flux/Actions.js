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

		if ( store.track !== props.track ) {
			if ( audio.src && ! audio.paused ) {
				audio.pause();
			}
			if ( props.track.src ) {
				audio.src = `${Store.AUDIO_PATH}${props.track.src}`;
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
		store.track = props.track;

		Store.setData( store );
	}
};

export default Actions;