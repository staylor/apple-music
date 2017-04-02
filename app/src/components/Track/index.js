import React, { PureComponent } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import withRedux from 'decorators/withRedux';
import classNames from 'classnames';
import { toggleCurrentTrack, setCurrentTrack } from 'actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from 'reducers/player';
import AlbumImage from '../Album/Image';
import ArtistLink from '../Artist/Link';
import styles from './Track.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

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
      fragment on Track {
        track_id
        name
        album {
          ${AlbumImage.getFragment('album')}
        }
        artists {
          ${ArtistLink.getFragment('artist')}
        }
        preview_url
      }
    `,
  },
})
@withRedux(mapStateToProps, mapDispatchToProps)
export default class Track extends PureComponent {
  render() {
    const {
      track,
      current,
      playerState,
      bindClick,
    } = this.props;

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
        <AlbumImage album={track.album} size="small" />
        <span className={styles.searchName}>{track.name}</span>
        <ArtistLink artist={track.artists[0]} />
      </li>
    );
  }
}
