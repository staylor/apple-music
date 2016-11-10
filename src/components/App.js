import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import {
	FormattedMessage,
	FormattedNumber,
	FormattedPlural,
} from 'react-intl';
import Store from '~/flux/Store';
import Intl from '~/components/Intl';
import Player from '~/components/Player';
import HomeLink from '~/components/HomeLink';
import styles from '~/scss/App.scss';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			currentAlbum: props.currentAlbum,
			currentTrack: props.currentTrack,
			...Store.getData()
		};
	}

	render() {
		const messages = Store.getMessages(),
			{ currentAlbum, currentTrack, catalog } = this.state;

		let locale = 'en';
		if ( this.props.params && this.props.params.locale ) {
			locale = this.props.params.locale;
		}

		let enPath = location.pathname.replace( '/es', '' ),
			esPath = '/' === enPath ? '/es' : `/es${enPath}`;

		if ( ! enPath ) {
			enPath = '/';
		}

		return (
			<Intl locale={locale}>
				<div className={styles.wrap}>
					<div className={styles.header}>
						<h2>
							<HomeLink />
							&nbsp;{'en' === locale ?
								<Link className={styles.locale} to={esPath}>ES</Link> :
								<Link className={styles.locale} to={enPath}>EN</Link>}
						</h2>
					</div>
					<p className={styles.intro}>
						<FormattedMessage id="app.intro" />
					</p>
					<p className={styles.intro}>
						<strong><FormattedMessage id="app.albums" /></strong>:
						&nbsp;<FormattedNumber value={1000000} />
						&nbsp;<FormattedPlural value={catalog.albums.length}
							one={messages['app.album']}
							other={messages['app.albums']}
						/></p>
					<p className={styles.intro}>
						<strong><FormattedMessage id="app.artists" /></strong>:
						&nbsp;<FormattedNumber value={catalog.artists.length} />
						&nbsp;<FormattedPlural value={catalog.artists.length}
							one={messages['app.artist']}
							other={messages['app.artists']}
						/></p>

					<Player album={currentAlbum} track={currentTrack}/>
					{this.props.children}
				</div>
			</Intl>
		);
	}
}

App.defaultProps = {
	currentAlbum: null,
	currentTrack: null,
};

export default Relay.createContainer( App, {
	fragments: {
		currentAlbum: () => Relay.QL`
			fragment on Album {
				id,
				albumId,
				name,
				artist(first: 1) {
					edges {
						node {
							id,
							artistId,
							name
						}
					}
				}
			}
		`,

		currentTrack: () => Relay.QL`
			fragment on Track {
				id,
				trackId,
				number,
				name,
				length,
				src
			}
		`,
	}
} );
