import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  IntlProvider,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
} from 'react-intl';
import Player from '../Player';
import HomeLink from '../HomeLink';
import { setLocale } from '../../actions';
import styles from './App.scss';

/* eslint-disable react/prop-types */

class App extends Component {
  constructor(props) {
    super(props);

    let locale = 'en';
    if (props.params && props.params.locale) {
      locale = props.params.locale;
    }
    props.onSetLocale(locale);
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
  }

  render() {
    const { locale, messages, catalog } = this.props;

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

          <Player />
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  catalog: state.catalog,
  locale: state.locale.code,
  messages: state.locale.messages,
});

const mapDispatchToProps = dispatch => ({
  onSetLocale: (locale) => {
    dispatch(setLocale(locale));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
