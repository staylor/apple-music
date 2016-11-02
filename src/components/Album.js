import React, { Component } from 'react';
import classNames from 'classnames';
import Song from '~/components/Song';
import Actions from '~/flux/Actions';
import Store from '~/flux/Store';
import '~/css/Album.css';

class Album extends Component {
	render() {
		let store = Store.getData(),
			audio = Store.getAudio(),
			{ album } = this.props,
			currentAlbum = store.album && store.album.id === album.id,
			tracks = 0,
			className = classNames( 'Album', {
				'Album-paused': currentAlbum && audio.paused,
				'Album-playing': currentAlbum && ! audio.paused,
				'Album-not-playing': ! currentAlbum
			} );

		album.discs.forEach( ( disc ) => tracks += disc.tracks.length );

		return (
			<div className={className}>
				<figure>
					<span className="dashicons dashicons-controls-play" onClick={Actions.toggleControl}></span>
					<span className="dashicons dashicons-controls-pause" onClick={Actions.toggleControl}></span>
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
								<Song key={song.id} song={song} album={album} />
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