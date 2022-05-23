const assert = require('assert');
const { headMain } = require('../src/headLib.js');

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
  it('Should display 1 line in a file', () => {
    const mockedReadFile = mockReadFile(['./hello.txt'], ['hi'], 'utf-8');
    const actual = headMain(mockedReadFile, ['./hello.txt']);
    assert.strictEqual(actual, 'hi');
  });

  it('Should display 2 lines in a file', () => {
    const mockedReadFile = mockReadFile(['./hello.txt'], ['bye\nhi'], 'utf-8');
    const actual = headMain(mockedReadFile, ['./hello.txt']);
    assert.strictEqual(actual, 'bye\nhi');
  });

  it('Should display 1 line in two files', () => {
    const mockedReadFile = mockReadFile(['./hello.txt', './bye.txt'], ['hi', 'bye'], 'utf-8');
    const actual = headMain(mockedReadFile, ['./hello.txt', './bye.txt']);
    const expected = '==> ./hello.txt <==\nhi\n\n==> ./bye.txt <==\nbye\n';
    assert.strictEqual(actual, expected);
  });

  it('Should display 3 characters in a file', () => {
    const mockedReadFile = mockReadFile(['./hello.txt'], ['bye'], 'utf-8');
    const actual = headMain(mockedReadFile, ['-c', '3', './hello.txt']);
    assert.strictEqual(actual, 'bye');
  });

  it('Should throw an error if file not found', () => {
    const mockedReadFile = mockReadFile(['./hello.txt'], ['bye']);
    const actual = () => headMain(mockedReadFile, ['-c', '3', 'missingFile']);
    assert.throws(actual, {
      name: 'FileReadError',
      message: 'Unable to read missingFile',
      fileName: 'missingFile'
    });
  });
});
