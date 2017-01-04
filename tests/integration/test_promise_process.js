(() => {
  'use strict';
  const path = require('path');
  const expect = require('chai').expect;
  const processPromise = require('../../index');
  const successScript = path.join(__dirname, 'success.sh');
  const failureScript = path.join(__dirname, 'failure.sh');

  describe('Promise Process Integration Tests', () => {
    describe('Success Case', () => {
      it('Should be resolved properly.', (done) => {
        processPromise(successScript).then((std) => {
          expect(std.stdout).to.equal('This is not an error\n');
          expect(std.stderr).not.to.be.ok;
          done();
        }).catch(done);
      });
    });

    describe('Failure Case', () => {
      it('Should be rejected', (done) => {
        processPromise(failureScript).then(() => {
          done(new Error('Should raise an error in this case.'));
        }).catch((errObj) => {
          expect(errObj.code).to.equal(1);
          expect(errObj).to.have.ownProperty('signal');
          expect(errObj.stdout).not.to.be.ok;
          expect(errObj.stderr).to.equal('This is an error\n');
          done();
        }).catch(done);
      });
    });

    describe('Unknown command case on non-shell mode', () => {
      it('Should be rejected with Error', (done) => {
        processPromise(
          'jugemjugemgokohnosurikire',
          ['--kayjare=\'suygyo\''], {'shell': false}
        ).then(() => {
          done(new Error('Should raise an error in this case.'));
        }).catch((errObj) => {
          expect(errObj).to.be.an.instanceof(Error);
          done();
        }).catch(done);
      });
    });
  });
})();
