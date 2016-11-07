import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormattedNumber, FormattedPlural, } from 'react-intl';
import classNames from 'classnames';
import AlbumImage from '~/components/Album/Image';
import AlbumLink from '~/components/Album/Link';
import ArtistLink from '~/components/Artist/Link';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import styles from '~/scss/Album.scss';

class Album extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			current: this.isCurrent()
		};
	}

	componentDidMount() {
		this.subscription = Store.addListener( 'change', () => {
			this.setState( {
				current: this.isCurrent()
			} );
		} );
	}

	componentWillUnmount() {
		this.subscription.remove();
	}

	isCurrent() {
		let album;
		const store = Store.getData();

		if ( store.album ) {
			album = this.props.album;
			return album && album.albumId === parseInt( store.album, 10 );
		}
	}

	render() {
		const messages = Store.getMessages(),
			audio = Store.getAudio(),
			{ album } = this.props,
			playClass = `dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`,
			pauseClass = `dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`;;

		let className = classNames( styles.album, {
				[styles.paused]: this.state.current && audio.paused,
				[styles.playing]: this.state.current && ! audio.paused,
				[styles.notPlaying]: ! this.state.current
			} );

		return (
			<div className={className}>
				<figure className={styles.artwork}>
					<span className={playClass} onClick={Actions.toggleControl}></span>
					<span className={pauseClass} onClick={Actions.toggleControl}></span>
					<AlbumImage album={album} />
					<figcaption className={styles.details}>
						<FormattedNumber value={album.tracks.items.length} />
						&nbsp;<FormattedPlural value={album.tracks.items.length}
							one={messages['album.song']}
							other={messages['album.songs']}
						/></figcaption>
				</figure>
				<div className={styles.info}>
					<header>
						<h1><AlbumLink album={album} /></h1>
						<h2>{album.artists.map( artist => <ArtistLink key={artist.id} artist={artist} />)}</h2>

						<div className={styles.meta}>
							&bull; {album.release_data}
						</div>
					</header>

				</div>
			</div>
		);
	}
}

export default Relay.createContainer( Album, {
	fragments: {
		album: () => Relay.QL`
			fragment on Album {
				id
				name
				album_id
				images {
				  url
				  width
				  height
				}
				artists {
				  id
				  name
				  href
				  external_urls {
					spotify
				  }
				}
				genres
				copyrights {
				  text
				  type
				}
				label
				popularity
				release_date
				tracks {
				  items {
					id
					name
					track_number
					duration_ms
					preview_url
					artists {
					  id
					  name
					}
				  }
				}
			}
		`,
	}
} );