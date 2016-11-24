import React from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { toggleCurrentTrack, setCurrentTrack } from '../../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../../reducers/player';
import styles from './Track.scss';

/* eslint-disable react/prop-types */

let Track = ({ track, current, playerState, bindClick }) => {
  const className = classNames(styles.item, {
    [styles.paused]: current && playerState === PLAYER_IDLE,
    [styles.playing]: current && playerState === PLAYER_ACTIVE,
    [styles.notPlaying]: !current,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <li
      className={className}
      onClick={bindClick(current, playerState)}
    >
      <span className={styles.control}>
        <span className={styles.text}>{track.track_number}</span>
        <span className={`dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`} />
        <span className={`dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`} />
      </span>
      <span className={styles.name}>{track.name}</span>
      <span className={styles.length}>{track.duration_ms}</span>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => ({
  current: state.currentTrack && state.currentTrack.id === ownProps.track.id,
  playerState: state.playerState,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  bindClick: (current, playerState) => () => {
    if (current) {
      dispatch(toggleCurrentTrack());
    } else {
      if (playerState === PLAYER_IDLE) {
        dispatch(toggleCurrentTrack());
      }
      dispatch(setCurrentTrack(ownProps.track));
    }
  },
});

Track = connect(
  mapStateToProps,
  mapDispatchToProps
)(Track);

export default Relay.createContainer(Track, {
  fragments: {
    track: () => Relay.QL`
      fragment on AlbumTrack {
        id
        name
        duration_ms
        track_number
      }
    `,
  },
});
