import React, { Component } from 'react';
import { Link } from 'react-router';
import {
	IntlProvider,
	addLocaleData,
	FormattedMessage,
} from 'react-intl';
import Store from '~/flux/Store';
import HomeLink from '~/components/HomeLink';
import styles from '~/scss/App.scss';

class SpotifyApp extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			...Store.getData()
		};

		Store.addListener( 'change', () => {
			this.setState( {
				...Store.getData()
			} );
		} );
	}

	addLocale( locale ) {
		const localeData = require( `react-intl/locale-data/${locale}` );
		addLocaleData( localeData );
	}

	componentWillMount() {
		let locale = 'en';
		if ( this.props.params && this.props.params.locale ) {
			locale = this.props.params.locale;
		}
		Store.set( 'locale', locale );
		this.addLocale( locale );
	}

	// switching to-fro "/" and "/es" will trigger this
	componentWillReceiveProps( nextProps ) {
		let locale = Store.getLocale();

		if (
			nextProps.params &&
			nextProps.params.locale
		) {

			if ( nextProps.params.locale !== locale ) {
				locale = nextProps.params.locale;
			}
		} else {
			locale = 'en';
		}

		Store.set( 'locale', locale );
		this.addLocale( locale );
	}

	render() {
		const locale = Store.getLocale(),
			messages = Store.getMessages();

		let enPath = location.pathname.replace( '/es', '' ),
			esPath = '/' === enPath ? '/es' : `/es${enPath}`;

		if ( ! enPath ) {
			enPath = '/';
		}

		return (
			<IntlProvider locale={locale} messages={messages}>
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
						<FormattedMessage id="app.spotify_intro" />
					</p>
					{this.props.children}
				</div>
			</IntlProvider>
		);
	}
}

export default SpotifyApp;
