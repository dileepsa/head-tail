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
    const contents = { content: 'hi' };
    const fn = ({ content }) => content;
    display(mockedLog, mockedError, contents, fn);
    assert.strictEqual(mockedLog.count, 1);
  });

  it('Should display to error stream ', () => {
    const mockedLog = mockConsole([]);
    const mockedError = mockConsole(['hi']);
    const contents = { error: { message: 'hi' } };
    display(mockedLog, mockedError, contents);
    assert.deepStrictEqual(mockedError.count, 1);
  });
});

exports.mockConsole = mockConsole;
