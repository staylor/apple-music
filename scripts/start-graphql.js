process.env.NODE_ENV = 'development';

import graphql from '~/graphql';

graphql( 'http', 'localhost' );