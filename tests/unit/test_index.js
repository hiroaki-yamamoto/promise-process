(() => {
  'use strict';
  describe('index.js module strucure test', () => {
    const expect = require('chai').expect;
    const index = require('../../index');
    describe('process check', () => {
      const process = require('../../lib/process');
      it('Index should point to process.', () => {
        expect(index).to.equal(process);
      });
    });
    describe('pyvenv check', () => {
      const pyvenv = require('../../lib/pyvenv');
      it('Index.pyvenv should point to pyvenv', () =>{
        expect(index.pyvenv).to.equal(pyvenv);
      });
    });
    describe('bundleExec check', () => {
      const bundleExec = require('../../lib/bundleExec');
      it('Index.bundleExec should point to bundleExec.', () => {
        expect(index.bundleExec).to.equal(bundleExec);
      });
    });
  });
})();
