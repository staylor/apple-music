import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedNumber, FormattedPlural } from 'react-intl';
import Intl from '../Intl';
import Player from '../Player';
import HomeLink from '../HomeLink';
import styles from './App.scss';

/* eslint-disable react/prop-types */

const App = ({
  location,
  locale,
  messages,
  catalog,
  params,
  children,
}) => {
  let enPath = location.pathname.replace('/es', '');
  const esPath = enPath === '/' ? '/es' : `/es${enPath}`;

  if (!enPath) {
    enPath = '/';
  }

  return (
    <Intl params={params}>
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
        {children}
      </div>
    </Intl>
  );
};

const mapStateToProps = state => ({
  catalog: state.catalog,
  locale: state.locale.code,
  messages: state.locale.messages,
});

export default connect(
  mapStateToProps
)(App);
