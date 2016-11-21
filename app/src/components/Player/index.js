import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toggleCurrentTrack } from '../../actions';
import AlbumLink from '../Album/Link';
import ArtistLink from '../Artist/Link';
import styles from './Player.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

const Player = ({ audio, track, onClick }) => {
  let artist = null;
  let album = null;
  let dashicon = 'play';
  const cssStyles = {
    width: '0%',
  };
  let details;

  if (track && track.name) {
    track.album.edges.map(({ node }) => (album = node));
    album.artist.edges.map(({ node }) => (artist = node));

    if (audio && audio.duration && audio.currentTime) {
      cssStyles.width = `${Math.floor((100 / audio.duration) * audio.currentTime)}%`;
      dashicon = audio.paused ? 'play' : 'pause';
    }
    details = (
      <div className={styles.details}>
        &#8220;{track.name}&#8221; <span><FormattedMessage id="player.from" /></span>
        {' '}
        <em><AlbumLink album={album} /></em>
        {' '}
        <span><FormattedMessage id="player.by" /></span>
        {' '}
        <ArtistLink artist={artist} />
      </div>
    );
  } else {
    details = <div className={styles.details}><FormattedMessage id="player.nothing" /></div>;
  }

  return (
    <div className={styles.wrap}>
      <div
        onClick={onClick}
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

Player.defaultProps = {
  track: null,
};

const mapStateToProps = state => ({
  track: state.currentTrack,
});

const mapDispatchToProps = dispatch => ({
  onClick: audio => dispatch(toggleCurrentTrack(audio)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
