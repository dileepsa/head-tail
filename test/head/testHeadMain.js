const assert = require('assert');
const lib = require('../../src/head/headLib.js');
const { headMain, headFiles, headOfFile, createErrorObj, getExitCode } = lib;
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

describe('headOfFile', () => {
  it('Should return content record', () => {
    const mockedReadFile = mockReadFile(['a.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headOfFile(mockedReadFile, 'a.txt', option, '\n');
    const expected =
      { content: 'hi', fileName: 'a.txt', isError: false };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return error record when fileName not exists', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headOfFile(mockedReadFile, 'hi.', option, '\n');
    const expected = {
      content: createErrorObj('fileReadError', "head: hi.: No such file or directory"),
      fileName: 'hi.', isError: true
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('headFiles', () => {
  it('Should return content records when multiple fileName are given', () => {
    const mockedReadFile = mockReadFile(['a.txt', 'b.txt'], ['hi', 'bye'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['a.txt', 'b.txt'], option);
    const expected = [
      { content: '==> a.txt <==\nhi\n', fileName: 'a.txt', isError: false },
      { content: '==> b.txt <==\nbye\n', fileName: 'b.txt', isError: false }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return error record when fileName not exists', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['hi.'], option);
    const expected = [{
      content: createErrorObj('fileReadError', "head: hi.: No such file or directory"),
      fileName: 'hi.', isError: true
    }];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return content and error record when only one file exists', () => {
    const mockedReadFile = mockReadFile(['a.txt', 'b.txt'], ['hi', 'bye'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['a.txt', 'bye.txt'], option);
    const expected = [
      { content: '==> a.txt <==\nhi\n', fileName: 'a.txt', isError: false },
      {
        content: createErrorObj('fileReadError', "head: bye.txt: No such file or directory"),
        fileName: 'bye.txt', isError: true
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getExitCode', () => {
  it('Should return 1 when isError is set to true', () => {
    const actual = getExitCode([{ isError: true, content: 'bye' }]);
    assert.strictEqual(actual, 1);
  });

  it('Should return 0 when isError is set to false', () => {
    const actual = getExitCode([{ isError: false, content: 'hi' }]);
    assert.strictEqual(actual, 0);
  });
});
