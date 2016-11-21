import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

/* eslint-disable react/prop-types */

const L10NLink = ({ locale, to, children }) => {
  const path = locale === 'en' ? '' : `/${locale}`;
  return <Link to={path + to}>{children}</Link>;
};

const mapStateToProps = state => ({
  locale: state.locale.code,
});

export default connect(
  mapStateToProps
)(L10NLink);
