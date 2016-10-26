import React, { Component } from 'react';
import './Album.css';
import Song from './Song';

class Album extends Component {
	render() {
		var album = this.props.album,
			tracks = 0;
			album.discs.forEach( ( disc ) => {
				tracks += disc.tracks.length;
			} );

		return (
			<div className="Album">
				<figure>
					<img role="presentation" src={'/images/' + album.image}/>
					<figcaption>{tracks} songs, {album.length}</figcaption>
				</figure>
				<div className="Album-info">
					<header>
						<h1>{album.name}</h1>
						<h2>{album.artist}</h2>
						<div className="Album-info-meta">
							{album.genre} &bull; {album.year}
						</div>
					</header>
					{album.discs.map( ( disc, index ) => {
						return (
							<ol key={index}>
							{disc.tracks.map( ( song ) => {
								return <Song app={this.props.app} key={song.name} song={song} />;
							})}
							</ol>
						);
					} )}

				</div>
			</div>
		);
	}
}

export default Album;