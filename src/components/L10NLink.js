import React, { Component } from 'react';
import { Link } from 'react-router';
import Store from '~/flux/Store';

class L10NLink extends Component {
	render() {
		const locale = Store.getLocale(), path = 'en' === locale ? '' : ( '/' +  locale );

		return <Link to={path + this.props.to}>{this.props.children}</Link>;
	}
}

export default L10NLink;