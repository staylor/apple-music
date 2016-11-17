const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'src/server.js',
  dest: 'bundle.js',
  format: 'cjs',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
