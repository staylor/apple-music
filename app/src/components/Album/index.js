import React from 'react';
import Relay from 'react-relay';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import { connect } from 'react-redux';
import prettyMs from 'pretty-ms';
import classNames from 'classnames';
import AlbumImage from './Image';
import AlbumLink from './Link';
import ArtistLink from '../Artist/Link';
import AlbumTrack from '../Track/AlbumTrack';
import { toggleCurrentTrack } from '../../actions';
import { PLAYER_IDLE, PLAYER_ACTIVE } from '../../reducers/player';
import styles from './Album.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

let Album = ({ album, current, messages, playerState, bindClick }) => {
  const playClass = `dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`;
  const pauseClass = `dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`;

  const tracks = album.tracks.items.length;
  const totalMs = album.tracks.items.reduce((a, b) => a + b.duration_ms, 0);
  const totalTime = prettyMs(totalMs, {
    verbose: true,
    secDecimalDigits: 0,
  });

  const className = classNames(styles.album, {
    [styles.paused]: current && playerState === PLAYER_IDLE,
    [styles.playing]: current && playerState === PLAYER_ACTIVE,
    [styles.notplaying]: !current,
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
          , {totalTime}
        </figcaption>
      </figure>
      <div className={styles.info}>
        <header>
          <h1><AlbumLink album={album} /></h1>
          <h2>{album.artists.map(artist =>
            <ArtistLink key={artist.artist_id} artist={artist} />)}</h2>
          <div className={styles.meta}>
            {album.genres.length ? `${album.genres[0]} &bull; ` : ''}{album.release_date}
          </div>
        </header>
        <ol>
          {album.tracks.items.map(item =>
            <AlbumTrack key={item.track_id} track={item} album={album} />)}
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
    current: currentAlbum && currentAlbum.album_id === ownProps.album.album_id,
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
      fragment on AlbumInterface {
        album_id
        name
        artists {
          artist_id
          ${ArtistLink.getFragment('artist')}
        }
        ${AlbumLink.getFragment('album')}
        ${AlbumImage.getFragment('album')}
        ... on Album {
          genres
          release_date
          tracks {
            items {
              track_id
              duration_ms
              ${AlbumTrack.getFragment('track')}
            }
          }
        }
      }
    `,
  },
});
