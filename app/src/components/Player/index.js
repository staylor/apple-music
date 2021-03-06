import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toggleCurrentTrack } from 'actions';
import { PLAYER_IDLE } from 'reducers/player';
import ArtistLink from '../Artist/Link';
import styles from './Player.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */

const Player = (props: Object) => {
  const {
    track,
    trackInfo,
    playerState,
    bindClick,
  } = props;

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

const mapStateToProps = ({
  locale,
  currentTrack,
  trackInfo,
  playerState,
}) => ({
  locale,
  track: currentTrack,
  trackInfo,
  playerState,
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
  mapDispatchToProps
)(Player);
