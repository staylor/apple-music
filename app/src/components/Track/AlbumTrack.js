import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import withRedux from 'decorators/withRedux';
import classNames from 'classnames';
import { toggleCurrentTrack, setCurrentTrack } from 'actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from 'reducers/player';
import ArtistLink from '../Artist/Link';
import styles from './Track.scss';

/* eslint-disable react/prop-types */

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

@withRelay({
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
})
@withRedux(mapStateToProps, mapDispatchToProps)
export default class AlbumTrack extends PureComponent {
  static convertMsTime(ms) {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    const modSeconds = Math.floor(seconds % 60);
    const modMinutes = Math.floor(minutes % 60);
    return `${modMinutes}:${modSeconds > 9 ? modSeconds : `0${modSeconds}`}`;
  }

  render() {
    const {
      track,
      current,
      playerState,
      bindClick,
    } = this.props;

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
        <span className={styles.length}>{this.constructor.convertMsTime(track.duration_ms)}</span>
      </li>
    );
  }
}
