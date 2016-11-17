import clc from 'cli-color';

/* eslint-disable no-console */

export function logWarning(warning = {}) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(clc.bold(`⚠️  ${warning.name}`));
  console.log(warning.message);
  console.log('---');
}

export function logError(error = {}) {
  console.log(clc.bold(`❌  ${error.name}`));
  console.log(error.stack);
  console.log(clc.bold('path:'), error.path.join('.'));
  console.log(clc.bold('locations:'));
  error.locations.forEach((location) => {
    console.log(`  ${location.line}:${location.column}`);
  });
}

export function logInfo(msg) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(msg);
}
