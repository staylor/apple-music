// @flow

import { connect } from 'react-redux';
import { toggleCurrentTrack } from '~/actions';
import Player from '~/components/Player';

const mapStateToProps = state => ({
  locale: state.locale,
  track: state.currentTrack,
  trackInfo: state.trackInfo,
  playerState: state.playerState,
});

const mapDispatchToProps = dispatch => ({
  bindClick: track => () => {
    if (track) {
      dispatch(toggleCurrentTrack());
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
