import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormattedNumber, FormattedPlural } from 'react-intl';
import classNames from 'classnames';
import AlbumImage from './Image';
import AlbumLink from './Link';
import ArtistLink from '../Artist/Link';
import Track from '../Track';
import Actions from '../../flux/Actions';
import Store from '../../flux/Store';
import styles from './Album.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

const trackCounts = {};

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.isCurrent(),
    };
  }

  componentDidMount() {
    this.subscription = Store.addListener('change', () => {
      this.setState({
        current: this.isCurrent(),
      });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  isCurrent() {
    let album;
    const store = Store.getData();

    if (store.album) {
      album = this.props.album;
      return album && album.albumId === parseInt(store.album, 10);
    }
    return false;
  }

  render() {
    const messages = Store.getMessages();
    const audio = Store.getAudio();
    const { album } = this.props;
    const playClass = `dashicons dashicons-controls-play ${styles['dashicons-controls-play']}`;
    const pauseClass = `dashicons dashicons-controls-pause ${styles['dashicons-controls-pause']}`;

    let tracks = 0;
    const className = classNames(styles.album, {
      [styles.paused]: this.state.current && (!audio || audio.paused),
      [styles.playing]: this.state.current && (audio && !audio.paused),
      [styles.notPlaying]: !this.state.current,
    });

    if (trackCounts[album.id]) {
      tracks = trackCounts[album.id];
    } else {
      album.discs.forEach(disc => (tracks += disc.tracks.edges.length));
      trackCounts[album.id] = tracks;
    }

    return (
      <div className={className}>
        <figure className={styles.artwork}>
          <span className={playClass} onClick={Actions.toggleControl} />
          <span className={pauseClass} onClick={Actions.toggleControl} />
          <AlbumImage album={album} />
          <figcaption
            className={styles.details}
          >
            <FormattedNumber value={tracks} />
            &nbsp;
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
  }
}

export default Relay.createContainer(Album, {
  fragments: {
    album: () => Relay.QL`
      fragment on Album {
        id,
        ${AlbumLink.getFragment('album')}
        ${AlbumImage.getFragment('album')}
        ${Track.getFragment('album')}
        genre,
        year,
        length,
        artist(first: 1) {
          edges {
            node {
              id
              ${ArtistLink.getFragment('artist')}
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
