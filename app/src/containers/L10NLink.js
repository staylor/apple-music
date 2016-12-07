// @flow

import { connect } from 'react-redux';
import L10NLink from '~/components/L10NLink';

const mapStateToProps = state => ({
  locale: state.locale.code,
});

export default connect(
  mapStateToProps
)(L10NLink);
