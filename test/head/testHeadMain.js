const assert = require('assert');
const { headMain } = require('../../src/head/headLib.js');
const { mockConsole } = require('./testDisplay.js');

const mockReadFile = (expFileNames, contents, expEncoding) => {
  let index = 0;
  return function (fileName, encoding) {
    assert.strictEqual(fileName, expFileNames[index]);
    assert.strictEqual(encoding, expEncoding);
    const content = contents[index];
    index++;
    return content;
  };
};

describe('headMain', () => {
  it('Should return 0 when there are no errors', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const mockedLog = mockConsole(['hi']);
    const mockedError = mockConsole([]);
    const args = ['hi.txt'];
    const actual = headMain(mockedReadFile, mockedLog, mockedError, args);
    assert.strictEqual(actual, 0);
  });

  it('Should return 1 when there are errors', () => {
    const mockedReadFile = mockReadFile(['bye.txt'], ['hi'], 'utf-8');
    const mockedLog = mockConsole(['']);
    const mockedError = mockConsole(['head: hi: No such file or directory']);
    const args = ['hi'];
    const actual = headMain(mockedReadFile, mockedLog, mockedError, args);
    assert.strictEqual(actual, 1);
  });
});
exports.mockReadFile = mockReadFile;
