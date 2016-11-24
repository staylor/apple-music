import {
  GraphQLInterfaceType,
} from 'graphql';

import ArtistFields from './ArtistFields';

const ArtistInterfaceType = new GraphQLInterfaceType({
  name: 'ArtistInterface',
  fields: () => ({
    ...ArtistFields,
  }),
});

export default ArtistInterfaceType;
