import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import L10NLink from '~/components/L10NLink';

class HomeLink extends Component {
	render() {
		return <L10NLink to="/"><FormattedMessage id="app.title" /></L10NLink>;
	}
}

export default HomeLink;
