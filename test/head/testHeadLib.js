const assert = require('assert');
const lib = require('../../src/head/headLib.js');
const { getChars, getLines, headFiles, headOfFile, getExitCode, createErrorObj } = lib;
const { splitLines, joinLines } = require('../../src/head/stringUtils.js');
const { mockReadFile } = require('./testHeadMain.js');

describe('getLines', () => {
  it('Should return one line from 2 lines', () => {
    const actual = getLines('hi\nbye', 1);
    assert.strictEqual(actual, 'hi');
  });

  it('Should return two lines from 2 lines', () => {
    const actual = getLines('hi\nbye', 2);
    assert.strictEqual(actual, 'hi\nbye');
  });

  it('Should return all lines when count is 3', () => {
    const actual = getLines('hi\nbye', 3);
    assert.strictEqual(actual, 'hi\nbye');
  });
});

describe('getChars', () => {
  it('Should return one character', () => {
    const actual = getChars('h', 1);
    assert.strictEqual(actual, 'h');
  });

  it('Should return two characters from 3 characters', () => {
    const actual = getChars('bye', 2);
    assert.strictEqual(actual, 'by');
  });

  it('Should return all characters when count is 4', () => {
    const actual = getChars('bye', 4);
    assert.strictEqual(actual, 'bye');
  });
});

describe('headOfFile', () => {
  it('Should return content record', () => {
    const mockedReadFile = mockReadFile(['a.txt'], ['hi'], 'utf-8');
    const option = { name: '-n', value: 1 };
    const fnToCall = (x) => x;
    const actual = headOfFile(mockedReadFile, 'a.txt', option, fnToCall);
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
      { content: 'hi', fileName: 'a.txt' },
      { content: 'bye', fileName: 'b.txt' }
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
      { content: 'hi', fileName: 'a.txt' },
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

describe('splitLines', () => {
  it('Should split data based on "|" ', () => {
    assert.deepStrictEqual(splitLines('bye|hi', '|'), ['bye', 'hi']);
    assert.deepStrictEqual(splitLines('hi|bye', '|'), ['hi', 'bye']);
  });

  it('Should split data based on new line ', () => {
    assert.deepStrictEqual(splitLines('bye\nhi', '\n'), ['bye', 'hi']);
    assert.deepStrictEqual(splitLines('hi\nbye', '\n'), ['hi', 'bye']);
  });
});

describe('joinLines', () => {
  it('Should join data based on "|" ', () => {
    assert.deepStrictEqual(joinLines(['bye', 'hi'], '|'), 'bye|hi');
  });

  it('Should join data based on new line', () => {
    assert.deepStrictEqual(joinLines(['bye', 'hi'], '\n'), 'bye\nhi');
  });
});
