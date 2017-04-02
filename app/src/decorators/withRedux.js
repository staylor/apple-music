import { connect } from 'react-redux';

export default (mapStateToProps, mapDispatchToProps) => Component => (
  connect(mapStateToProps, mapDispatchToProps)(Component)
);
