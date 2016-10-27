import React, { Component } from 'react';
import classNames from 'classnames';
import Song from './Song';
import './Album.css';

class Album extends Component {
	constructor( props ) {
		super( props );

		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		this.props.app.toggleControl();
	}

	render() {
		var album = this.props.album,
			state = this.props.app.state,
			currentAlbum = state.album === album,
			tracks = 0,
			className = classNames( 'Album', {
				'Album-paused': currentAlbum && state.audio.paused,
				'Album-playing': currentAlbum && ! state.audio.paused,
				'Album-not-playing': ! currentAlbum
			} );

		album.discs.forEach( ( disc ) => tracks += disc.tracks.length );

		return (
			<div className={className}>
				<figure>
					<span className="dashicons dashicons-controls-play" onClick={this.onClick}></span>
					<span className="dashicons dashicons-controls-pause" onClick={this.onClick}></span>
					<img role="presentation" src={'/images/' + album.image}/>
					<figcaption>{tracks} songs, {album.length}</figcaption>
				</figure>
				<div className="Album-info">
					<header>
						<h1>{album.name}</h1>
						<h2>{album.artist.name}</h2>
						<div className="Album-info-meta">
							{album.genre} &bull; {album.year}
						</div>
					</header>
					{album.discs.map( ( disc, index ) => {
						return (
							<ol key={index}>
							{disc.tracks.map( ( song ) =>
								<Song app={this.props.app}
									key={song.id}
									album={album}
									song={song} />
							)}
							</ol>
						);
					} )}

				</div>
			</div>
		);
	}
}

export default Album;