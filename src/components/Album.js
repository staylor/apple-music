import React, { Component } from 'react';
import { FormattedNumber, FormattedPlural, } from 'react-intl';
import classNames from 'classnames';
import AlbumImage from '~/components/Album/Image';
import AlbumLink from '~/components/Album/Link';
import ArtistLink from '~/components/Artist/Link';
import Song from '~/components/Song';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import '~/scss/Album.scss';

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
			album = this.getAlbum();
			return album && album.id === store.album.id;
		}
	}

	getAlbum() {
		let albumId;

		if ( this.props.album ) {
			return this.props.album;
		}

		if ( this.props.params && this.props.params.albumId ) {
			albumId = this.props.params.albumId;
			return Store.albumById( albumId );
		}
	}

	render() {
		let audio = Store.getAudio(),
			album = this.getAlbum(),

			tracks = 0,
			className = classNames( 'Album', {
				'Album-paused': this.state.current && audio.paused,
				'Album-playing': this.state.current && ! audio.paused,
				'Album-not-playing': ! this.state.current
			} );

		album.discs.forEach( disc => tracks += disc.tracks.length );

		return (
			<div className={className}>
				<figure>
					<span className="dashicons dashicons-controls-play" onClick={Actions.toggleControl}></span>
					<span className="dashicons dashicons-controls-pause" onClick={Actions.toggleControl}></span>
					<AlbumImage album={album} />
					<figcaption>
						<FormattedNumber value={tracks} />
						&nbsp;<FormattedPlural value={tracks}
							one="song"
							other="songs"
						/>, {album.length}</figcaption>
				</figure>
				<div className="Album-info">
					<header>
						<h1><AlbumLink album={album} /></h1>
						<h2><ArtistLink artist={album.artist} /></h2>
						<div className="Album-info-meta">
							{album.genre} &bull; {album.year}
						</div>
					</header>
					{album.discs.map( ( disc, index ) => {
						return (
							<ol key={index}>
							{disc.tracks.map( song => <Song key={song.id} song={song} album={album} /> )}
							</ol>
						);
					} )}

				</div>
			</div>
		);
	}
}

export default Album;