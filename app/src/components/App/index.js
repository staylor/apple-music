import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Intl from '../Intl';
import Player from '../Player';
import HomeLink from '../HomeLink';
import styles from './App.scss';

/* eslint-disable react/prop-types */

const App = ({
  location,
  locale,
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
        <Player />
        {children}
      </div>
    </Intl>
  );
};

const mapStateToProps = state => ({
  locale: state.locale.code,
  messages: state.locale.messages,
});

export default connect(
  mapStateToProps
)(App);
