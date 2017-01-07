(() => {
  'use strict';
  const expect = require('chai').expect;
  const sinon = require('sinon');
  const mock = require('mock-require');
  describe('bundleExec test', ()=>{
    const processMockReturnValue = {'test': 'ok'};
    let processMock;
    let bundleExec = require('../../lib/bundleExec');
    beforeEach(() => {
      processMock = sinon.stub().returns(processMockReturnValue);
      mock('../../lib/process', processMock);
      bundleExec = mock.reRequire('../../lib/bundleExec');
    });
    afterEach(() => {
      mock.stopAll();
    });
    describe('With a single command', () => {
      const testCommand = 'jugemjugemgokohnosurikire';
      let ret;
      beforeEach(() => {
        ret = bundleExec(testCommand);
      });
      it('The process should be called with proper parameters', () => {
        expect(processMock.calledOnce).to.be.true;
        expect(
          processMock.calledWithExactly([`bundle exec ${testCommand}`], [], {})
        ).to.be.true;
      });
      it('The return value should be proper', () => {
        expect(ret).to.be.equal(processMockReturnValue);
      });
    });
    describe('With multiple commands', () => {
      const testCommand = [
        'jugemjugemgokohnosurikire',
        'kayjaresuygyo', 'soygyomatsu',
      ];
      const expectedResult = testCommand.map((el) => {
        return `bundle exec ${el}`;
      });
      let ret;
      beforeEach(() => {
        ret = bundleExec(testCommand);
      });
      it('The process should be called with proper parameters', () => {
        expect(processMock.calledOnce).to.be.true;
        expect(
          processMock.calledWithExactly(expectedResult, [], {})
        ).to.be.true;
      });
      it('The return value should be proper', () => {
        expect(ret).to.be.equal(processMockReturnValue);
      });
    });
  });
})();
