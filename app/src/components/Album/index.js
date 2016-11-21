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

const trackCounts = {};

let Album = ({ album, current, messages, playerState, bindClick }) => {
  const playClass = `dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`;
  const pauseClass = `dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`;

  let tracks = 0;
  const className = classNames(styles.album, {
    [styles.paused]: current && playerState === PLAYER_IDLE,
    [styles.playing]: current && playerState === PLAYER_ACTIVE,
    [styles.notPlaying]: !current,
  });

  if (trackCounts[album.id]) {
    tracks = trackCounts[album.id];
  } else {
    album.discs.forEach(disc => (tracks += disc.tracks.edges.length));
    trackCounts[album.id] = tracks;
  }

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
          , {album.length}
        </figcaption>
      </figure>
      <div className={styles.info}>
        <header>
          <h1><AlbumLink album={album} /></h1>
          <h2>{album.artist.edges.map(({ node }) =>
            <ArtistLink key={node.id} artist={node} />)}</h2>

          <div className={styles.meta}>
            {album.genre} &bull; {album.year}
          </div>
        </header>
        {album.discs.map((disc, index) => (
          <ol key={index}>
            {disc.tracks.edges.map(({ node }) =>
              <Track key={node.id} track={node} album={album} />)}
          </ol>
        ))}

      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let currentAlbum = null;
  if (state.currentTrack && state.currentTrack.album) {
    state.currentTrack.album.edges.map(({ node }) => (currentAlbum = node));
  }
  return {
    current: currentAlbum && currentAlbum.albumId === ownProps.album.albumId,
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
        albumId
        name
        genre
        year
        length
        image
        artist(first: 1) {
          edges {
            node {
              id
              artistId
              name
            }
          }
        },
        discs {
          tracks(first: 100) {
            edges {
              node {
                id
                ${Track.getFragment('track')}
              }
            }
          }
        }
      }
    `,
  },
});
