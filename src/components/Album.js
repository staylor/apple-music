import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormattedNumber, FormattedPlural, } from 'react-intl';
import classNames from 'classnames';
import AlbumImage from '~/components/Album/Image';
import AlbumLink from '~/components/Album/Link';
import ArtistLink from '~/components/Artist/Link';
import Track from '~/components/Track';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import styles from '~/scss/Album.scss';

let trackCounts = {};

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

		let tracks = 0,
			className = classNames( styles.album, {
				[styles.paused]: this.state.current && audio.paused,
				[styles.playing]: this.state.current && ! audio.paused,
				[styles.notPlaying]: ! this.state.current
			} );

		if ( trackCounts[ album.id ] ) {
			tracks = trackCounts[ album.id ];
		} else {
			album.discs.forEach( disc => tracks += disc.tracks.edges.length );
			trackCounts[ album.id ] = tracks;
		}

		return (
			<div className={className}>
				<figure className={styles.artwork}>
					<span className={playClass} onClick={Actions.toggleControl}></span>
					<span className={pauseClass} onClick={Actions.toggleControl}></span>
					<AlbumImage album={album} />
					<figcaption className={styles.details}>
						<FormattedNumber value={tracks} />
						&nbsp;<FormattedPlural value={tracks}
							one={messages['album.song']}
							other={messages['album.songs']}
						/>, {album.length}</figcaption>
				</figure>
				<div className={styles.info}>
					<header>
						<h1><AlbumLink album={album} /></h1>
						<h2>{album.artist.edges.map( ({ node }) => <ArtistLink key={node.id} artist={node} />)}</h2>

						<div className={styles.meta}>
							{album.genre} &bull; {album.year}
						</div>
					</header>
					{album.discs.map( ( disc, index ) => {
						return (
							<ol key={index}>
							{disc.tracks.edges.map( ({ node }, i) => <Track key={i} track={node} album={album} />)}
							</ol>
						);
					} )}

				</div>
			</div>
		);
	}
}

export default Relay.createContainer( Album, {
	fragments: {
		album: () => Relay.QL`
			fragment on Album {
				id,
				albumId,
				name,
				image,
				genre,
				year,
				length,
				artist(first: 1) {
					edges {
						node {
							id,
							artistId,
							name
						}
					}
				},
				discs {
					tracks(first: 100) {
						edges {
							node {
								${Track.getFragment( 'track' )}
							}
						}
					}
				}
			}
		`,
	}
} );