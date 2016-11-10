import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import Store from '~/flux/Store';

class Intl extends Component {
   constructor( props ) {
    super( props );

    this.state = {
      locale: 'en'
    };
  }

  setLocale( locale ) {
    const localeData = require( `react-intl/locale-data/${locale}` );
    addLocaleData( localeData );

    this.setState( { locale } );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  componentWillMount() {
    this.subscription = Store.addListener( 'change:locale', locale => {
      this.setLocale( locale );
    } );

    if ( this.props.locale ) {
      Store.set( 'locale', this.props.locale );
    }
  }

  componentWillReceiveProps( nextProps ) {
    let locale = this.state.locale;

    if ( nextProps.locale ) {

      if ( nextProps.locale !== this.state.locale ) {
        locale = nextProps.locale;
      }
    } else {
      locale = 'en';
    }

    Store.set( 'locale', locale );
  }

  render() {
    const  messages = Store.getMessages();

    return (
      <IntlProvider locale={this.state.locale} messages={messages}>{this.props.children}</IntlProvider>
    );
  }
}

export default Intl;