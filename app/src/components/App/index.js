import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import {
  IntlProvider,
  addLocaleData,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
} from 'react-intl';
import Store from '../../flux/Store';
import Player from '../Player';
import HomeLink from '../HomeLink';
import styles from './App.scss';

/* eslint-disable react/prop-types */

class App extends Component {
  constructor(props) {
    super(props);

    const initialState = Object.assign({}, Store.getData(), {
      currentAlbum: props.currentAlbum,
      currentTrack: props.currentTrack,
    });

    this.state = initialState;

    Store.addListener('change', () => {
      this.setState(Store.getData());
    });
  }

  static addLocale(locale) {
    /* eslint-disable global-require */
    // eslint-disable-next-line import/no-dynamic-require
    const localeData = require(`react-intl/locale-data/${locale}`);
    addLocaleData(localeData);
  }

  componentWillMount() {
    let locale = 'en';
    if (this.props.params && this.props.params.locale) {
      locale = this.props.params.locale;
    }
    Store.set('locale', locale);
    App.addLocale(locale);
  }

  componentWillReceiveProps(nextProps) {
    let locale = Store.getLocale();

    if (nextProps.params && nextProps.params.locale) {
      if (nextProps.params.locale !== locale) {
        locale = nextProps.params.locale;
      }
    } else {
      locale = 'en';
    }

    Store.set('locale', locale);
    App.addLocale(locale);
  }

  render() {
    const locale = Store.getLocale();
    const messages = Store.getMessages();
    const { currentAlbum, currentTrack, catalog } = this.state;

    let enPath = this.props.location.pathname.replace('/es', '');
    const esPath = enPath === '/' ? '/es' : `/es${enPath}`;

    if (!enPath) {
      enPath = '/';
    }

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <h2>
              <HomeLink />
              &nbsp;{locale === 'en' ?
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
            &nbsp;
            <FormattedPlural
              value={catalog.albums.length}
              one={messages['app.album']}
              other={messages['app.albums']}
            />
          </p>
          <p className={styles.intro}>
            <strong><FormattedMessage id="app.artists" /></strong>:
            &nbsp;<FormattedNumber value={catalog.artists.length} />
            &nbsp;
            <FormattedPlural
              value={catalog.artists.length}
              one={messages['app.artist']}
              other={messages['app.artists']}
            />
          </p>

          <Player album={currentAlbum} track={currentTrack} />
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

App.defaultProps = {
  currentAlbum: null,
  currentTrack: null,
};

export default Relay.createContainer(App, {
  fragments: {
    currentAlbum: () => Relay.QL`
      fragment on Album {
        ${Player.getFragment('album')}
      }
    `,

    currentTrack: () => Relay.QL`
      fragment on Track {
        ${Player.getFragment('track')}
      }
    `,
  },
});
