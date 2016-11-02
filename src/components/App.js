import React, { Component } from 'react';
import { Link } from 'react-router';
import { IntlProvider, addLocaleData, FormattedMessage, FormattedNumber, FormattedPlural, } from 'react-intl';
import Store from '~/flux/Store';
import Player from '~/components/Player';
import HomeLink from '~/components/HomeLink';
import '~/css/dashicons.css';
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
		const localeData = require( 'react-intl/locale-data/' + locale );
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

	getMessages( locale ) {
		const messages = {
			en: {
				'app.title': 'Apple Music',
				'app.intro': 'I am going to recreate the Apple Music UI in React. Then Flux. Then with Relay.'
			},
			es: {
				'app.title': 'Apple Música',
				'app.intro': 'Voy a recrear la Apple Music UI en React. Luego Flux. Luego con Relay.'
			}
		};

		return messages[ locale ] || messages.en;
	}

	render() {
		const locale = Store.getLocale(),
			{ album, song, catalog } = this.state,
			messages = this.getMessages( locale );

		return (
			<IntlProvider locale={locale} messages={messages}>
				<div className="App">
					<div className="App-header">
						<h2>
							<HomeLink />
							&nbsp;{'en' === locale ?
								<Link className="locale" to="/es">ES</Link> :
								<Link className="locale" to='/'>EN</Link>}
						</h2>
					</div>
					<p className="App-intro">
						<FormattedMessage id="app.intro" />
					</p>
					<p className="App-intro">Locale-specific:
						&nbsp;<FormattedNumber value={catalog.length} />
						&nbsp;<FormattedPlural value={catalog.length}
							one="album"
							other="albums"
						/></p>

					<Player album={album} song={song}/>
					{this.props.children}
				</div>
			</IntlProvider>
		);
	}
}

export default App;
