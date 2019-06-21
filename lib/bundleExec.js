(() => {
  'use strict';
  const process = require('./process');
  module.exports = (command, opt={}) => {
    return process([].concat(command).map((el) => {
      return `bundle exec ${el}`;
    }), [], opt);
  };
})();
