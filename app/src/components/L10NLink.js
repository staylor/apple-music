import React from 'react';
import { Link } from 'react-router';
import Store from '../flux/Store';

/* eslint-disable react/prop-types */

function L10NLink(props) {
  const locale = Store.getLocale();
  const path = locale === 'en' ? '' : `/${locale}`;

  return <Link to={path + props.to}>{props.children}</Link>;
}

export default L10NLink;
