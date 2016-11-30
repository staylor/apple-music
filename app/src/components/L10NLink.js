// @flow

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */

export const getL10NPath = (locale, path) => {
  return locale === 'en' ? path : `/${locale}${path}`;
}

const L10NLink = ({ locale, to, children }) => {
  return <Link to={getL10NPath(locale, to)}>{children}</Link>;
};

const mapStateToProps = state => ({
  locale: state.locale.code,
});

export default connect(
  mapStateToProps
)(L10NLink);
