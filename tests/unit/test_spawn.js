(() => {
  'use strict';
  const expect = require('chai').expect;
  const mock = require('mock-require');
  const sinon = require('sinon');
  let promiseProcess = require('../../lib/process');

  describe('Spawn invokation check', () => {
    let spawn;
    let eventObject;
    let stdout;
    let stderr;
    beforeEach(() => {
      stdout = {'on': sinon.spy()};
      stderr = {'on': sinon.spy()};
      eventObject = {
        'on': sinon.stub(),
        'stdout': stdout,
        'stderr': stderr,
      };
      eventObject.on.withArgs('close').callsArgWith(1, 0);
      spawn = sinon.stub().returns(eventObject);
      mock('child_process', {'spawn': spawn});
      promiseProcess = mock.reRequire('../../index');
    });
    afterEach(() => {
      mock.stopAll();
    });

    it('The return value should be an instance of Promise', () => {
      const ret = promiseProcess();
      expect(ret).to.be.an.instanceof(Promise);
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
          return promiseProcess(item.command);
        });
        it('Should call spawn with the command', () => {
          expect(spawn.callCount).to.equal(1);
          expect(spawn.calledWithExactly(expectedCommand, [], {
            'shell': true,
          })).is.true;
        });
        it('Should assign stdout data event', () => {
          expect(stdout.on.args[0][0]).to.equal('data');
        });
        it('Should assign stderr data event', () => {
          expect(stderr.on.args[0][0]).to.equal('data');
        });
        it('Should call eventObject.on ' +
           'twice with error/close argument.', () => {
             expect(
               eventObject.on.args.map((el) => {
                 return el[0];
               })
             ).to.eql(['error', 'close']);
         });
      });
    }

    describe('stdio without pipeline tests', () => {
      const command = 'jugemjugemgokohnosurikire';
      beforeEach(() => {
        mock.stopAll();
        delete eventObject.stdout;
        delete eventObject.stderr;
        spawn = sinon.stub().returns(eventObject);
        mock('child_process', {'spawn': spawn});
        promiseProcess = mock.reRequire('../../index');
        return promiseProcess(command);
      });
      afterEach(() => {
        mock.stopAll();
      });
      it('Should call spawn with the command', () => {
        expect(spawn.callCount).to.equal(1);
        expect(spawn.calledWithExactly(command, [], {'shell': true})).is.true;
      });
    });

    describe('Non-shell mode with commandline arguments', () => {
      const testCommand = 'jugemjugemgokohnosurikire';
      const testArgs = ['--kayjare=\'suygyo\'', '--soygyo=\'matsu\''];
      beforeEach(() => {
        return promiseProcess(
          testCommand, testArgs, {'shell': false, 'stdio': 'pipe'}
        );
      });
      it('Should call spawn with the command', () => {
        expect(spawn.callCount).to.equal(1);
        expect(spawn.calledWithExactly(testCommand, testArgs, {
          'shell': false, 'stdio': 'pipe',
        })).is.true;
      });
      it('Should assign stdout data event', () => {
        expect(stdout.on.args[0][0]).to.equal('data');
      });
      it('Should assign stderr data event', () => {
        expect(stderr.on.args[0][0]).to.equal('data');
      });
      it('Should call eventObject.on ' +
         'twice with error/close argument.', () => {
           expect(
             eventObject.on.args.map((el) => {
               return el[0];
             })
           ).to.eql(['error', 'close']);
       });
    });
  });
})();
