// Given a search directory, this will return an object
// where the property names are the top-level sub-directories
// and the values are their fully resolved paths.

// Need to use ES5 imports because of kyt,
// https://github.com/NYTimes/kyt/issues/14
const fs = require('fs');
const path = require('path');

const aliasDirsSync = searchDir => {
  const obj = {};
  fs.readdirSync(searchDir)
      .filter(file => fs.statSync(`${searchDir}/${file}`).isDirectory())
      .forEach(dir => {
        obj[dir] = path.resolve(searchDir, dir);
      });
  return obj;
};

module.exports = aliasDirsSync;
