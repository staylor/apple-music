import React from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ArtistLink from '../Artist/Link';
import { toggleCurrentTrack, setCurrentTrack } from '../../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../../reducers/player';
import styles from './Track.scss';

const convertMsTime = (ms) => {
  const seconds = ms / 1000;
  const minutes = seconds / 60;
  const modSeconds = Math.floor(seconds % 60);
  const modMinutes = Math.floor(minutes % 60);
  return `${modMinutes}:${modSeconds > 9 ? modSeconds : `0${modSeconds}`}`;
};

/* eslint-disable react/prop-types */

let AlbumTrack = ({ track, current, playerState, bindClick }) => {
  const className = classNames(styles.item, {
    [styles.paused]: current && playerState === PLAYER_IDLE,
    [styles.playing]: current && playerState === PLAYER_ACTIVE,
    [styles.notplaying]: !current,
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
      <span className={styles.length}>{convertMsTime(track.duration_ms)}</span>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => ({
  current: state.currentTrack && state.currentTrack.track_id === ownProps.track.track_id,
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

AlbumTrack = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumTrack);

export default Relay.createContainer(AlbumTrack, {
  fragments: {
    track: () => Relay.QL`
      fragment on AlbumTrack {
        track_id
        name
        duration_ms
        track_number
        preview_url
        artists {
          ${ArtistLink.getFragment('artist')}
        }
      }
    `,
  },
});
