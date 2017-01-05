const path = require('path');
const fs = require('fs');
const promiseProcess = require('./process');

/**
 * Run command in Python's virtual environemnt
 * @param  {string|string[]} command command or an array of commands.
 * @param  {string[]}        searchPath An array of paths to find virtualenv.
 * @param  {boolean}         overwriteDefaultSearchPath Set false *not*
 *  to search default path.
 * @return {Promise}        The prromise object returned by promise-process.
 */
module.exports = (command, searchPath, overwriteDefaultSearchPath) => {
  'use strict';
  const candidatePath = ((overwriteDefaultSearchPath) ? [] : [
    path.join(process.cwd(), 'venv'),
    path.join(process.cwd(), '.venv'),
    path.join(process.cwd(), 'env'),
    path.join(process.cwd(), '.env'),
    path.join(path.dirname(process.cwd())),
  ]).concat(searchPath || []).filter((el) => {
    return fs.existsSync(path.join(el, 'bin', 'activate'));
  });
  let commandToPass = [].concat(
    path.join(candidatePath[0], 'bin', 'activate'),
    command, 'deactivate'
  );
  return promiseProcess(commandToPass);
};
