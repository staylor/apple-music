const aliasDirsSync = require('./tools/aliasDirsSync');

// This config is used to map our webpack aliases.
// It's used by .eslintrc.json and kyt.config.js.
module.exports = {
  resolve: {
    alias: aliasDirsSync('./src'),
  }
};
