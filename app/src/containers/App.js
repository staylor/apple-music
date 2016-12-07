// @flow

import { connect } from 'react-redux';
import { setSearchTerm } from '~/actions';
import App from '~/components/App';

const mapStateToProps = state => ({
  locale: state.locale.code,
  messages: state.locale.messages,
});

const mapDispatchToProps = dispatch => ({
  onSearchChange: (term) => {
    dispatch(setSearchTerm(term));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
