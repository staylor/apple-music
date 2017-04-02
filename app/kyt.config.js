const path = require('path');
const webpack = require('webpack');
const aliasesConfig = require('./webpack.aliases.config.js');
const pkg = require('./package.json');
const nodeExternals = require('webpack-node-externals'); // provided via kyt
const autoprefixer = require('autoprefixer');

const DEBUG = false;

module.exports = {
  debug: DEBUG,
  reactHotLoader: true,
  modifyJestConfig(kytConfig) {
    const jestConfig = Object.assign({}, kytConfig);

    // For each moduleNameMapper, make sure the key starts with "^"
    jestConfig.moduleNameMapper = Object.keys(jestConfig.moduleNameMapper)
      .reduce((map, key) => {
        const value = jestConfig.moduleNameMapper[key];
        if (key.startsWith('^')) {
          map[key] = value;
        } else {
          // use starting char ^ and backreference ($1) everything after key
          map[`^${key}(.*)$`] = `${value}$1`;
        }
        return map;
      },
      // always mock Relay
      {
        '^react-relay$': path.resolve(__dirname, '__mocks__/react-relay.js'),
      });

    jestConfig.snapshotSerializers = ['enzyme-to-json/serializer'];

    return jestConfig;
  },
  modifyWebpackConfig(kytConfig, options) {
    const appConfig = Object.assign({}, kytConfig);

    // auto prefixer
    appConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer({ browsers: ['last 2 versions', 'ios 8'] })],
          context: '/',
        },
      })
    );

    // Create vendor bundle based on package.dependencies
    if (options.type === 'client' && options.environment === 'production') {
      appConfig.plugins.push(
        // Extract all 3rd party modules into a separate chunk
        // Only include vendor modules as needed,
        // https://github.com/webpack/webpack/issues/2372#issuecomment-213149173
        new webpack.optimize.CommonsChunkPlugin({
          name: '0_vendor',
          minChunks: ({ resource }) => /node_modules/.test(resource),
        }),

        // Modules should get deterministic ids so that they don't change between builds
        new webpack.HashedModuleIdsPlugin(),

        // Generate a 'manifest' chunk to be inlined
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', filename: 'manifest.js' }),

        // Merge bundles that would otherwise be negligibly small
        new webpack.optimize.AggressiveMergingPlugin()
      );
    }

    // Aliases
    appConfig.resolve.alias = Object.assign(
      {},
      appConfig.resolve.alias || {},
      aliasesConfig.resolve.alias
    );

    // Mock relay for proto
    if (process.env.npm_lifecycle_event === 'proto') {
      appConfig.resolve.alias['react-relay'] = path.join(__dirname, '/prototype/react-relay.js');
      appConfig.resolve.alias['real-react-relay'] = path.join(__dirname, '/node_modules/react-relay/');
    }

    // Use optimized version of React et al for the server build
    if (options.type === 'server' && options.environment === 'production') {
      const whitelist = Object.keys(pkg.dependencies)
        // include everything directly depended on besides these two
        .filter(x => !!x.indexOf('@google') && !!x.indexOf('express'));

      appConfig.externals = nodeExternals({ whitelist });

      // // Dead-code eliminate server build
      // // TODO: This should happen in kyt
      appConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
          },
          output: {
            comments: false,
          },
          sourceMap: true,
        })
      );
    }

    return appConfig;
  },
};
