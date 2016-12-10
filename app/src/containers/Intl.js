// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { setLocale } from '../actions';

/* eslint-disable react/prop-types */

class Intl extends PureComponent {
  constructor(props) {
    super(props);

    let locale = 'en';
    if (props.params && props.params.locale) {
      locale = props.params.locale;
    }
    props.onSetLocale(locale);
  }

  componentWillReceiveProps({ onSetLocale, params: { locale } }) {
    let currentLocale = this.props.locale;

    if (locale) {
      if (locale !== currentLocale) {
        currentLocale = locale;
      }
    } else {
      currentLocale = 'en';
    }

    onSetLocale(currentLocale);
  }

  render() {
    const { locale, messages, children } = this.props;

    return (
      <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.locale.code,
  messages: state.locale.messages,
});

const mapDispatchToProps = dispatch => ({
  onSetLocale: (locale) => {
    dispatch(setLocale(locale));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intl);
