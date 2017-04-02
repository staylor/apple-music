// @flow

import React from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';

export const getL10NPath = (locale: string, path: string) => (
  locale === 'en' ? path : `/${locale}${path}`
);

const L10NLink = (props: Object) => (
  <Link to={getL10NPath(props.locale, props.to)}>{props.children}</Link>
);

const mapStateToProps = state => ({
  locale: state.locale.code,
});

export default connect(
  mapStateToProps
)(L10NLink);
