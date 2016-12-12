// @flow

import React, { Component } from 'react';
import Relay from 'react-relay';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import RelatedArtist from '../Artist/Related';
import BrowseAlbum from '../Album/Browse';
import Track from '../Track';
import { getL10NPath } from '../L10NLink';
import { setSearchTerm } from '../../actions';
import styles from '../Artist/Artist.scss';
import catalogStyles from '../Catalog/Catalog.scss';

/* eslint-disable react/prop-types */

class Search extends Component {
  state: Object;
  constructor(props) {
    super(props);

    this.state = {
      lastTerm: '',
    };
  }

  componentDidMount() {
    const { location: { query } } = this.props;
    let searchTerm = '';
    if (!searchTerm && query && query.q) {
      searchTerm = query.q
    }

    if (searchTerm) {
      this.props.onSearchChange(searchTerm);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location: { query } } = nextProps;
    let nextTerm = '';
    if (query && query.q) {
      nextTerm = query.q;
    }

    if (!nextTerm || nextTerm === this.state.lastTerm) {
      return;
    }
    this.setState({ lastTerm: nextTerm });
    this.props.onSearchChange(nextTerm);
  }

  render() {
    const {
      artistSearch,
      albumSearch,
      trackSearch,
      term,
    } = this.props;

    return (
      <div className={catalogStyles.wrap}>
        <h1>
          <FormattedMessage id="search.results" values={{ term }} />
        </h1>
        <section>
          <h2>
            <FormattedMessage id="search.tracks" />
          </h2>
          {trackSearch.results.length ? (
            <ul className={catalogStyles.tracks}>
              {trackSearch.results.map(track =>
                <Track key={track.id} track={track} />)}
            </ul>
          ) : (
            <p>
              <FormattedMessage id="search.no_tracks_found" />
            </p>
          )}
        </section>
        <section>
          <h2>
            <FormattedMessage id="search.artists" />
          </h2>
          {artistSearch.results.length ? (
            <ul className={catalogStyles.artists}>
              {artistSearch.results.map(artist =>
                <RelatedArtist key={artist.id} artist={artist} />)}
            </ul>
          ) : (
            <p>
              <FormattedMessage id="search.no_artists_found" />
            </p>
          )}
        </section>
        <section>
          <h2>
            <FormattedMessage id="search.albums" />
          </h2>
          {albumSearch.results.length ? (
            <ul className={catalogStyles.albums}>
              {albumSearch.results.map(album =>
                <BrowseAlbum key={album.id} album={album} />)}
            </ul>
          ) : (
            <p>
              <FormattedMessage id="search.no_albums_found" />
            </p>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
