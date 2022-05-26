const assert = require('assert');
const { headMain, headFiles } = require('../../src/head/headLib.js');
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
    const mockedLog = mockConsole(['==> hi.txt <==\nhi\n']);
    const mockedError = mockConsole(['bye']);
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

describe('headFiles', () => {
  it('Should return one record when one fileName is given', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['hi.txt'], option);
    const expected = [{ content: '==> hi.txt <==\nhi\n', fileName: 'hi.txt', isError: false }];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return one record when fileName not exists', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['hi.'], option);
    const expected = [{
      content:
        { name: 'fileReadError', message: "head: hi.: No such file or directory" },
      fileName: 'hi.', isError: true
    }];
    assert.deepStrictEqual(actual, expected);
  });
});
