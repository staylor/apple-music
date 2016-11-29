import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toggleCurrentTrack } from '../../actions';
import ArtistLink from '../Artist/Link';
import { PLAYER_IDLE } from '../../reducers/player';
import styles from './Player.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

const Player = ({ track, trackInfo, playerState, bindClick }) => {
  const cssStyles = {
    width: '0%',
  };

  let dashicon = 'play';
  let details;

  if (track && track.name) {
    if (trackInfo.duration && trackInfo.currentTime) {
      cssStyles.width = `${Math.floor((100 / trackInfo.duration) * trackInfo.currentTime)}%`;
      dashicon = playerState === PLAYER_IDLE ? 'play' : 'pause';
    }
    details = (
      <div className={styles.details}>
        &#8220;{track.name}&#8221;
        {' '}
        <span><FormattedMessage id="player.by" /></span>
        {' '}
        <ArtistLink artist={track.artists[0]} />
      </div>
    );
  } else {
    details = <div className={styles.details}><FormattedMessage id="player.nothing" /></div>;
  }

  return (
    <div className={styles.wrap}>
      <div
        onClick={bindClick(track)}
        className={`${styles.control} dashicons dashicons-controls-${dashicon}`}
      />
      <div className={styles.metadata}>
        {details}
        <div className={styles.track}>
          <div className={styles.progress} style={cssStyles} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
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
