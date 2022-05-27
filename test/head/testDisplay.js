const assert = require('assert');
const { display } = require('../../src/head/display.js');

const mockConsole = function (expContents) {
  let index = 0;
  const log = function (content) {
    const expContent = expContents[index++];
    assert.strictEqual(content, expContent);
    log.count = index;
  };
  return log;
};

describe('display', () => {
  it('Should display to output stream ', () => {
    const mockedLog = mockConsole(['hi']);
    const mockedError = mockConsole(['hi']);
    const contents = [{ content: 'hi', isError: false }];
    display(mockedLog, mockedError, contents);
    assert.strictEqual(mockedLog.count, 1);
  });

  it('Should display 2 elements to output stream ', () => {
    const mockedLog = mockConsole(['hi', 'bye']);
    const mockedError = mockConsole([]);
    const contents = [{ content: 'hi', isError: false }, { content: 'bye', isError: false }];
    display(mockedLog, mockedError, contents);
    assert.deepStrictEqual(mockedLog.count, 2);
  });

  it('Should display to error stream ', () => {
    const mockedLog = mockConsole([]);
    const mockedError = mockConsole(['hi', 'bye']);
    const contents = [{ content: { message: 'hi' }, isError: true }];
    display(mockedLog, mockedError, contents);
    assert.deepStrictEqual(mockedError.count, 1);
  });

  it('Should display error and output stream ', () => {
    const mockedLog = mockConsole(['hi']);
    const mockedError = mockConsole(['bye']);
    const contents = [{ content: 'hi', isError: false }, { content: { message: 'bye' }, isError: true }];
    display(mockedLog, mockedError, contents);
    assert.deepStrictEqual(mockedLog.count, 1);
    assert.deepStrictEqual(mockedError.count, 1);
  });
});

exports.mockConsole = mockConsole;
