import {
  GraphQLInterfaceType,
} from 'graphql';

import AlbumFields from './AlbumFields';

const AlbumInterfaceType = new GraphQLInterfaceType({
  name: 'AlbumInterface',
  fields: () => ({
    ...AlbumFields,
  }),
});

export default AlbumInterfaceType;
