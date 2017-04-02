// @flow

import React from 'react';
import { FormattedMessage } from 'react-intl';
import L10NLink from 'components/L10NLink';

function HomeLink() {
  return <L10NLink to="/"><FormattedMessage id="app.title" /></L10NLink>;
}

export default HomeLink;
