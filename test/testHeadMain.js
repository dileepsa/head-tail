const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = (expFileName, content, expEncoding) => {
  return function (fileName, encoding) {
    assert.strictEqual(fileName, expFileName);
    assert.strictEqual(encoding, expEncoding);
    return content;
  };
};

describe('headMain', () => {
  it('Should display 1 line in a file', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'hi', 'utf-8');
    const actual = headMain(mockedReadFile, ['./hello.txt']);
    assert.strictEqual(actual, 'hi');
  });

  it('Should display 2 lines in a file', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'bye', 'utf-8');
    const actual = headMain(mockedReadFile, ['./hello.txt']);
    assert.strictEqual(actual, 'bye');
  });

  it('Should display 1 line in two files', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'bye', 'utf-8');
    const actual = headMain(mockedReadFile, ['./hello.txt', './hello.txt']);
    assert.strictEqual(actual, 'bye\nbye');
  });

  it('Should display 3 characters in a file', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'bye', 'utf-8');
    const actual = headMain(mockedReadFile, ['-c', '3', './hello.txt']);
    assert.strictEqual(actual, 'bye');
  });

  it('Should throw an error if file not found', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'bye');
    const actual = () => headMain(mockedReadFile, ['-c', '3', 'missingFile']);
    assert.throws(actual, {
      name: 'FileReadError',
      message: 'Unable to read missingFile',
      fileName: 'missingFile'
    });
  });

  it('Should throw an error if files are not specified ', () => {
    const mockedReadFile = mockReadFile('./hello', 'bye');
    const actual = () => headMain(mockedReadFile, ['-c', '3']);
    assert.throws(actual, {
      name: 'FileReadError',
      message: 'No files specified',
    });
  });
});
