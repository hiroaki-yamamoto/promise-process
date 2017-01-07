(() => {
  'use strict';
  /**
   * Execute commands and returns a promise object of the process.
   * Note that args parameter works only when the command is a single command,
   * and the command runs in the shell-mode. By default the command runs in
   * shell-mode and you need to set {'shell': false} to disable shell mode.
   *
   * @param  {string | string[]} command   The command
   * @param  {Array}  [args=[]] command line argument to be passed to spawn
   * @param  {Object} [opt={}]  options to be passed to spawn
   * @return {Promise}          The promise object of the process
   */
  module.exports = (command, args=[], opt={}) => {
    const childProcess = require('child_process');
    const merge = require('merge');
    const defaultOptions = {
      'shell': true,
      'stdio': ['inherit', 'pipe', 'pipe'],
    };
    const finalOpt = merge(defaultOptions, opt);
    return new Promise((res, rej) => {
      const proc = childProcess.spawn(
        [].concat(command).join('&&'), args, finalOpt
      );
      let stdout = [];
      let stderr = [];
      proc.stdout.on('data', (msg) => {
        stdout = stdout.concat(msg);
      });
      proc.stderr.on('data', (msg) =>{
        stderr = stderr.concat(msg);
      });
      proc.on('error', rej);
      proc.on('close', (code, signal) => {
        if (code > 0) {
          rej({
            'stderr': stderr.join(''),
            'stdout': stdout.join(''),
            'code': code,
            'signal': signal,
          });
        } else {
          res({'stderr': stderr.join(''), 'stdout': stdout.join('')});
        }
      });
    });
  };
})();
