const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const aliasesConfig = require('./webpack.aliases.config.js');

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

    return jestConfig;
  },
  modifyWebpackConfig(kytConfig, options) {
    const appConfig = Object.assign({}, kytConfig);

    if (process.env.IS_SBX === '1' && options.type === 'client') {
      // HACKY workaround to hardcoded localhost:3001 in kyt config
      appConfig.entry.main[1] = 'webpack-hot-middleware/client?reload=true&path=https://vi.nytimes.com/__webpack_hmr';
      appConfig.output.publicPath = 'https://vi.nytimes.com/assets/';
    }

    const babelLoader = appConfig.module.rules.find(loader => loader.loader === 'babel-loader');
    // add Relay and other plugins
    babelLoader.options.plugins.push(
      path.resolve('./tools/babelRelayPlugin.js'),
      require.resolve('babel-plugin-transform-flow-strip-types'),
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread'),
      [
        require.resolve('babel-root-import'),
        { rootPathSuffix: 'src' }
      ]
    );

    // Production-only babel plugins
    if (options.environment === 'production') {
      // TODO: This should be added to kyt itself
      babelLoader.options.plugins.push(require.resolve('babel-plugin-transform-react-inline-elements'));
    }

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

        // Generate a 'manifest' chunk to be inlined
        new webpack.optimize.CommonsChunkPlugin('manifest'),

        // Need this plugin for deterministic hashing
        // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
        // for more info: https://webpack.js.org/how-to/cache/
        new WebpackMd5Hash(),

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
    return appConfig;
  },
};
