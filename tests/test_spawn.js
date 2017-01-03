(() => {
  'use strict';
  const expect = require('chai').expect;
  const mock = require('mock-require');
  const sinon = require('sinon');
  let promiseProcess = require('../index');

  describe('Spawn invokation check', () => {
    let spawn;
    let eventObject;
    beforeEach(() => {
      eventObject = {'on': sinon.spy()};
      spawn = sinon.stub().returns(eventObject);
      mock('child_process', {'spawn': spawn});
      promiseProcess = mock.reRequire('../index');
    });
    afterEach(() => {
      mock.stopAll();
    });

    const testData = [
      {'name': 'Single command', 'command': 'test command'},
      {
        'name': 'Multiple command',
        'command': ['test command1', 'test command2'],
      },
    ];

    for (let item of testData) {
      describe(`${item.name} command`, () => {
        const expectedCommand = [].concat(item.command).join('&&');
        beforeEach(() => {
          promiseProcess(item.command);
        });
        it('Should call spawn with the command', () => {
          expect(spawn.callCount).to.equal(1);
          expect(spawn.calledWithExactly(expectedCommand)).is.true;
        });
        it('Should call eventObject.on ' +
           'twice with error/close argument.', () => {
             expect(eventObject.on.callCount).to.equal(2);
             expect(
               eventObject.on.args.map((el) => {
                 return el[0];
               })
             ).to.eql(['error', 'close']);
         });
      });
    }
  });
})();
