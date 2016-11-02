import React, { Component } from 'react';
import { Link } from 'react-router';
import {
	IntlProvider,
	addLocaleData,
	FormattedMessage,
	FormattedNumber,
	FormattedPlural,
} from 'react-intl';
import Store from '~/flux/Store';
import Player from '~/components/Player';
import HomeLink from '~/components/HomeLink';
import '~/scss/App.scss';

class App extends Component {
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

		let { album, song, catalog } = this.state,
			enPath = location.pathname.replace( '/es', '' ),
			esPath = '/' === enPath ? '/es' : `/es${enPath}`;

		if ( ! enPath ) {
			enPath = '/';
		}

		return (
			<IntlProvider locale={locale} messages={messages}>
				<div className="App">
					<div className="App-header">
						<h2>
							<HomeLink />
							&nbsp;{'en' === locale ?
								<Link className="locale" to={esPath}>ES</Link> :
								<Link className="locale" to={enPath}>EN</Link>}
						</h2>
					</div>
					<p className="App-intro">
						<FormattedMessage id="app.intro" />
					</p>
					<p className="App-intro">Locale-specific:
						&nbsp;<FormattedNumber value={catalog.length} />
						&nbsp;<FormattedPlural value={catalog.length}
							one={messages['app.album']}
							other={messages['app.albums']}
						/></p>

					<Player album={album} song={song}/>
					{this.props.children}
				</div>
			</IntlProvider>
		);
	}
}

export default App;
