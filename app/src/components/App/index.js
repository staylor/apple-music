import React, { PureComponent } from 'react';
import Link from 'react-router/lib/Link';
import withRouter from 'react-router/lib/withRouter';
import { IntlProvider } from 'react-intl';
import Player from 'components/Player';
import HomeLink from 'components/HomeLink';
import { getL10NPath } from 'components/L10NLink';
import withRedux from 'decorators/withRedux';
import { setSearchTerm, setLocale } from 'actions';
import styles from './App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

const eventInterval = 600;

const mapStateToProps = ({ locale }) => ({
  locale: locale.code,
  messages: locale.messages,
});

const mapDispatchToProps = dispatch => ({
  onSetLocale: (locale) => {
    dispatch(setLocale(locale));
  },
  onSearchChange: (term) => {
    dispatch(setSearchTerm(term));
  },
});

@withRouter
@withRedux(mapStateToProps, mapDispatchToProps)
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    let locale = 'en';
    if (props.params && props.params.locale) {
      locale = props.params.locale;
    }
    props.onSetLocale(locale);
  }

  componentWillReceiveProps({ onSetLocale, params }) {
    let currentLocale = this.props.locale;

    if (params.locale) {
      if (params.locale !== currentLocale) {
        currentLocale = params.locale;
      }
    } else {
      currentLocale = 'en';
    }
    // console.log('SETTING TO: ', currentLocale);
    onSetLocale(currentLocale);
  }

  render() {
    const {
      location,
      locale,
      messages,
      router,
      onSearchChange,
      children,
    } = this.props;

    let enPath = location.pathname.replace('/es', '');
    let eventTimeout;
    const esPath = enPath === '/' ? '/es' : `/es${enPath}`;

    if (!enPath) {
      enPath = '/';
    }

    return (
      <IntlProvider locale={locale} messages={messages}>
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
                    router.push({
                      pathname: getL10NPath(locale, '/search'),
                      query: {
                        q: eventTarget.value,
                      },
                    });
                  }, eventInterval);
                }}
              />
            </form>
          </div>
          <Player />
          {children}
        </div>
      </IntlProvider>
    );
  }
}
