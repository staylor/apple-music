// @flow

import React, { PureComponent } from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import RelatedArtist from '../Artist/Related';
import BrowseAlbum from '../Album/Browse';
import Track from '../Track';
import { getL10NPath } from '../L10NLink';
import { setSearchTerm } from '../../actions';
import styles from '../Artist/Artist.scss';
import catalogStyles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */

class Search extends PureComponent {
  state: Object;
  constructor(props) {
    super(props);

    this.state = {
      lastTerm: '',
    };
  }

  componentDidMount() {
    const { term, location: { query: { q } } } = this.props;
    const searchTerm = term || q || '';
    if (searchTerm) {
      this.props.onSearchChange(searchTerm);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextTerm = nextProps.location.query.q || nextProps.term;
    if (!nextTerm || nextTerm === this.state.lastTerm) {
      return;
    }
    this.setState({ lastTerm: nextTerm });
    this.props.onSearchChange(nextTerm);
  }

  render() {
    const { artistSearch, albumSearch, trackSearch, term } = this.props;

    return (
      <div className={styles.wrap}>
        <h1>Search Results {term ? ` for "${term}"` : ''}</h1>
        <section>
          <h2>Tracks</h2>
          {trackSearch.results.length ? (
            <ul className={catalogStyles.tracks}>
              {trackSearch.results.map(track =>
                <Track key={track.id} track={track} />)}
            </ul>
          ) : <p>No tracks found.</p>}
        </section>
        <section>
          <h2>Artists</h2>
          {artistSearch.results.length ? (
            <ul className={catalogStyles.artists}>
              {artistSearch.results.map(artist =>
                <RelatedArtist key={artist.id} artist={artist} />)}
            </ul>
          ) : <p>No artists found.</p>}
        </section>
        <section>
          <h2>Albums</h2>
          {albumSearch.results.length ? (
            <ul className={catalogStyles.albums}>
              {albumSearch.results.map(album =>
                <BrowseAlbum key={album.id} album={album} />)}
            </ul>
          ) : <p>No albums found.</p>}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.locale.code,
  term: state.search,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchChange: (term) => {
    dispatch(setSearchTerm(term));
    ownProps.relay.setVariables({
      q: term,
    });
  },
});

const ConnectedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default Relay.createContainer(ConnectedSearch, {
  initialVariables: {
    q: '',
  },
  fragments: {
    artistSearch: () => Relay.QL`
      fragment on ArtistCollection {
        results(type: "artistSearch", q: $q) {
          id
          ${RelatedArtist.getFragment('artist')}
        }
      }
    `,
    albumSearch: () => Relay.QL`
      fragment on AlbumCollection {
        results(type: "albumSearch", q: $q) {
          id
          ${BrowseAlbum.getFragment('album')}
        }
      }
    `,
    trackSearch: () => Relay.QL`
      fragment on TrackCollection {
        results(type: "trackSearch", q: $q) {
          id
          ${Track.getFragment('track')}
        }
      }
    `,
  },
});
