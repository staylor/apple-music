const rollup = require('rollup');
const rollupWatch = require('rollup-watch');
const {Monitor} = require('forever-monitor');
const options = require('./rollup.config');

// Keep app alive with forever.Monitor
const app = new Monitor(options.dest);

// Enable rollup cache
let cache;
options.cache = cache;

// Hack! Rollup complains about externals in watcher mode (todo: figure out why and remove this hack...)
options.external = Object.keys(
  require('./package.json').dependencies
).concat([
  "http","events","util","domain","cluster","buffer","stream","crypto","tls",
  "fs","string_decoder","path","net","dgram","dns","https","url","punycode",
  "readline","repl","vm","child_process","assert","zlib","tty","os","querystring"
]).concat([
  'request-promise/errors'
]);

// Start watching
rollupWatch(rollup, options).on('event', event => {
  if (event.code === 'ERROR') {
    console.log('Error!', event);
  }
  if (event.code === 'BUILD_END') {
    console.log(`Build finished in ${event.duration}ms`);
    // If the app is not yet running, start it.
    if (!app.child) {
      console.log('🙏  Starting server...');
      app.start();
    // else, restart it
    } else {
      console.log('🙏  Restaring server...');
      app.restart();
    }
  }
});
