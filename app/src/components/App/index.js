// @flow

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setSearchTerm } from '~/actions';
import Intl from '../Intl';
import Player from '../Player';
import HomeLink from '../HomeLink';
import { getL10NPath } from '../L10NLink';
import styles from './App.scss';

/* eslint-disable react/prop-types */

const App = ({
  location,
  locale,
  messages,
  params,
  onSearchChange,
  children,
}) => {
  let enPath = location.pathname.replace('/es', '');
  let eventTimeout;
  const eventInterval = 600;
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
          <form
            action={getL10NPath(locale, '/search')}
          >
            <input
              type="search"
              name="q"
              placeholder={messages['search.placeholder']}
              onChange={(e) => {
                const eventTarget = e.target;
                window.clearTimeout(eventTimeout);
                eventTimeout = window.setTimeout(() => {
                  onSearchChange(eventTarget.value);
                }, eventInterval);
              }}
            />
          </form>
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

const mapDispatchToProps = dispatch => ({
  onSearchChange: (term) => {
    dispatch(setSearchTerm(term));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
