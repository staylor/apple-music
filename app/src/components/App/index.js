import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  IntlProvider,
  addLocaleData,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
} from 'react-intl';
import Player from '../Player';
import HomeLink from '../HomeLink';
import { setCurrentTime, setLocale } from '../../actions';
import styles from './App.scss';

/* eslint-disable react/prop-types */

class App extends Component {
  constructor(props) {
    super(props);

    this.audio = null;
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
    this.props.onSetLocale(locale);
    App.addLocale(locale);
  }

  componentWillReceiveProps(nextProps) {
    let locale = this.props.locale;

    if (nextProps.params && nextProps.params.locale) {
      if (nextProps.params.locale !== locale) {
        locale = nextProps.params.locale;
      }
    } else {
      locale = 'en';
    }

    nextProps.onSetLocale(locale);
    App.addLocale(locale);
  }

  render() {
    const isServerRender = typeof window === 'undefined';
    let { locale, messages } = this.props;
    const { params, catalog, currentTrack, onTimeUpdate } = this.props;

    if (isServerRender && params && params.locale && locale !== params.locale) {
      locale = params.locale;
      // eslint-disable-next-line
      messages = require(`../../langs/${locale}.js`).default;
    }

    if (!this.audio && !isServerRender) {
      this.audio = document.createElement('audio');
      this.audio.ontimeupdate = (event) => {
        onTimeUpdate(event.timeStamp);
      };
    }

    if (this.audio && currentTrack && currentTrack.src && !this.audio.src) {
      this.audio.src = `/audio/${currentTrack.src}`;
    }

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

          <Player audio={this.audio} />
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

App.defaultProps = {
  track: null,
};

const mapStateToProps = state => ({
  catalog: state.catalog,
  currentTrack: state.currentTrack,
  locale: state.locale.code,
  messages: state.locale.messages,
});

const mapDispatchToProps = dispatch => ({
  onTimeUpdate: (timeStamp) => {
    dispatch(setCurrentTime(timeStamp));
  },
  onSetLocale: (locale) => {
    dispatch(setLocale(locale));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
