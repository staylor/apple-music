import React from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AlbumImage from '../Album/Image';
import ArtistLink from '../Artist/Link';
import { toggleCurrentTrack, setCurrentTrack } from '../../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../../reducers/player';
import styles from './Track.scss';

/* eslint-disable react/prop-types */

let Track = ({ track, current, playerState, bindClick }) => {
  const className = classNames(styles.track, {
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
      <AlbumImage album={track.album} />
      <span className={styles.name}>{track.name}</span>
      <span><ArtistLink artist={track.artists[0]} /></span>
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
      fragment on Track {
        id
        name
        album {
          ${AlbumImage.getFragment('album')}
        }
        artists {
          ${ArtistLink.getFragment('artist')}
        }
      }
    `,
  },
});
