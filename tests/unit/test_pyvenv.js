(() => {
  'use strict';
  describe('Python Virtual Environment Test', () => {
    const sinon = require('sinon');
    const expect = require('chai').expect;
    const mock = require('mock-require');
    const path = require('path');
    const testCommand = 'jugemjugemgokohnosurikire';

    let promiseProcessMock;
    let pyvenv = require('../../lib/pyvenv');

    beforeEach(() => {
      promiseProcessMock = sinon.stub().returns({});
      mock('../../lib/process', promiseProcessMock);
    });
    afterEach(() => {
      mock.stopAll();
    });

    describe('Command invokation without additional pyvenv', () => {
      let ret;
      beforeEach(() => {
        let fs = {'existsSync': sinon.stub().returns(false)};
        fs.existsSync.onFirstCall().returns(true);
        fs.existsSync.onSecondCall().returns(true);
        mock('fs', fs);
        pyvenv = mock.reRequire('../../lib/pyvenv');
        ret = pyvenv(testCommand);
      });
      it('Should call processCall with proper args.', () => {
        expect(promiseProcessMock.calledOnce).to.be.true;
        expect(promiseProcessMock.calledWithExactly([
          path.join(process.cwd(), 'venv', 'bin', 'activate'),
          testCommand, 'deactivate',
        ]));
      });
      it('The return value should be an instance of promise', () => {
        expect(ret).to.eql({});
      });
    });

    describe('Command invokation with additional pyvenv', () => {
      let ret;
      beforeEach(() => {
        let fs = {'existsSync': sinon.stub().returns(false)};
        fs.existsSync.onCall(5).returns(true);
        fs.existsSync.onCall(6).returns(true);
        mock('fs', fs);
        pyvenv = mock.reRequire('../../lib/pyvenv');
        ret = pyvenv(testCommand, ['test', 'test2']);
      });
      it('Should call processCall with proper args.', () => {
        expect(promiseProcessMock.calledOnce).to.be.true;
        expect(promiseProcessMock.calledWithExactly([
          path.join('test', 'bin', 'activate'),
          testCommand, 'deactivate',
        ]));
      });
      it('The return value should be an instance of promise', () => {
        expect(ret).to.eql({});
      });
    });
    describe('Command invokation with overwriting pyvenv', () => {
      let ret;
      beforeEach(() => {
        let fs = {'existsSync': sinon.stub().returns(false)};
        fs.existsSync.onFirstCall().returns(true);
        fs.existsSync.onSecondCall().returns(true);
        mock('fs', fs);
        pyvenv = mock.reRequire('../../lib/pyvenv');
        ret = pyvenv(testCommand, ['test', 'test2'], true);
      });
      it('Should call processCall with proper args.', () => {
        expect(promiseProcessMock.calledOnce).to.be.true;
        expect(promiseProcessMock.calledWithExactly([
          path.join('test', 'bin', 'activate'), testCommand, 'deactivate',
        ]));
      });
      it('The return value should be an instance of promise', () => {
        expect(ret).to.eql({});
      });
    });
  });
})();
