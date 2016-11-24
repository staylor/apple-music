import React from 'react';
import Relay from 'react-relay';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AlbumImage from './Image';
import AlbumLink from './Link';
import ArtistLink from '../Artist/Link';
import Track from '../Track';
import { toggleCurrentTrack } from '../../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../../reducers/player';
import styles from './Album.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

let Album = ({ album, current, messages, playerState, bindClick }) => {
  const playClass = `dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`;
  const pauseClass = `dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`;

  const tracks = album.tracks.items.length;
  const className = classNames(styles.album, {
    [styles.paused]: current && playerState === PLAYER_IDLE,
    [styles.playing]: current && playerState === PLAYER_ACTIVE,
    [styles.notPlaying]: !current,
  });

  const boundClick = bindClick(current);

  return (
    <div className={className}>
      <figure className={styles.artwork}>
        <span className={playClass} onClick={boundClick} />
        <span className={pauseClass} onClick={boundClick} />
        <AlbumImage album={album} />
        <figcaption
          className={styles.details}
        >
          <FormattedNumber value={tracks} />
          {' '}
          <FormattedPlural
            value={tracks}
            one={messages['album.song']}
            other={messages['album.songs']}
          />
          , {100000}
        </figcaption>
      </figure>
      <div className={styles.info}>
        <header>
          <h1><AlbumLink album={album} /></h1>
          <h2>{album.artists.map(artist => <ArtistLink key={artist.id} artist={artist} />)}</h2>
          <div className={styles.meta}>
            {album.genres.length && album.genres[0]} &bull; {album.release_date}
          </div>
        </header>
        <ol>
          {album.tracks.items.map(item => <Track key={item.id} track={item} album={album} />)}
        </ol>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let currentAlbum = null;
  if (state.currentTrack && state.currentTrack.album) {
    currentAlbum = state.currentTrack.album;
  }
  return {
    current: currentAlbum && currentAlbum.id === ownProps.album.id,
    messages: state.locale.messages,
    playerState: state.playerState,
  };
};

const mapDispatchToProps = dispatch => ({
  bindClick: current => () => {
    if (current) {
      dispatch(toggleCurrentTrack());
    }
  },
});

Album = connect(
  mapStateToProps,
  mapDispatchToProps
)(Album);

export default Relay.createContainer(Album, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        id
        name
        genres
        release_date
        images {
          url
        }
        tracks {
          items {
            id
            name
            duration_ms
            track_number
          }
        }
      }
    `,
  },
});
