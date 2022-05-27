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
    const mockedLog = mockConsole(['hi']);
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
      { content: 'hi', fileName: 'a.txt' };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return error record when fileName not exists', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headOfFile(mockedReadFile, 'hi.', option, '\n');
    const expected = {
      error: createErrorObj('fileReadError', "head: hi.: No such file or directory"),
      fileName: 'hi.'
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('headFiles', () => {
  it('Should return content without format when one file is given', () => {
    const mockedReadFile = mockReadFile(['a.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['a.txt'], option);
    const expected = [
      { content: 'hi', fileName: 'a.txt' }]
      ;
    assert.deepStrictEqual(actual, expected);
  });
  it('Should return content records when multiple fileName are given', () => {
    const mockedReadFile = mockReadFile(['a.txt', 'b.txt'], ['hi', 'bye'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['a.txt', 'b.txt'], option);
    const expected = [
      { content: '==> a.txt <==\nhi\n', fileName: 'a.txt' },
      { content: '==> b.txt <==\nbye\n', fileName: 'b.txt' }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return error record when fileName not exists', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['hi.'], option);
    const expected = [{
      error: createErrorObj('fileReadError', "head: hi.: No such file or directory"),
      fileName: 'hi.'
    }];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return content and error record when only one file exists', () => {
    const mockedReadFile = mockReadFile(['a.txt', 'b.txt'], ['hi', 'bye'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const actual = headFiles(mockedReadFile, ['a.txt', 'bye.txt'], option);
    const expected = [
      { content: '==> a.txt <==\nhi\n', fileName: 'a.txt' },
      {
        error: createErrorObj('fileReadError', "head: bye.txt: No such file or directory"),
        fileName: 'bye.txt'
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getExitCode', () => {
  it('Should return 1 when the object is error', () => {
    const actual = getExitCode([{ error: 'bye' }]);
    assert.strictEqual(actual, 1);
  });

  it('Should return 0 when the object is content', () => {
    const actual = getExitCode([{ content: 'hi' }]);
    assert.strictEqual(actual, 0);
  });
});
