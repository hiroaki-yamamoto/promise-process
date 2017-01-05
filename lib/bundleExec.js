(() => {
  'use strict';
  let process = require('./process');
  module.exports = (command) => {
    return process([].concat(command).map((el) => {
      return `bundle exec ${el}`;
    }));
  };
})();
