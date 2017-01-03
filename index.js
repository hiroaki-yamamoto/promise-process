const childProcess = require('child_process');
module.exports = (command) => {
  'use strict';
  return new Promise((res, rej) => {
    const proc = childProcess.spawn([].concat(command).join('&&'));
    proc.on('error', rej);
    proc.on('close', (code, signal) => {});
  });
};
