const assert = require('assert');
const { getLines, getChars, tailMain, tailFile } = require('../../src/tail/tailLib.js');
const { mockConsole } = require('../head/testDisplay');
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

describe('getLines', () => {
  it('Should return last one line', () => {
    assert.strictEqual(getLines('hi', 1), 'hi');
    assert.strictEqual(getLines('by', 1), 'by');
  });

  it('Should return last two lines', () => {
    assert.strictEqual(getLines('hi\nbye', 2), 'hi\nbye');
    assert.strictEqual(getLines('bye\nhi', 2), 'bye\nhi');
  });

  it('Should return last 2 lines from 3 lines', () => {
    assert.strictEqual(getLines('hi\nbye\ntata', 2), 'bye\ntata');
    assert.strictEqual(getLines('hi\nbye\nhi', 2), 'bye\nhi');
  });

  it('Should return last 1 line from 3 lines', () => {
    assert.strictEqual(getLines('hi\nbye\ntata', 1), 'tata');
    assert.strictEqual(getLines('bye\nhi\nwish', 1), 'wish');
  });
});

describe('getChars', () => {
  it('Should return last one character', () => {
    assert.strictEqual(getChars('h', 1), 'h');
    assert.strictEqual(getChars('v', 1), 'v');
  });

  it('Should return last two characters', () => {
    assert.strictEqual(getChars('hi', 2), 'hi');
    assert.strictEqual(getChars('by', 2), 'by');
  });

  it('Should return last two characters from 3 charcters', () => {
    assert.strictEqual(getChars('hel', 2), 'el');
    assert.strictEqual(getChars('bye', 2), 'ye');
  });

  it('Should return last 1 character from 3 charcters', () => {
    assert.strictEqual(getChars('hel', 1), 'l');
    assert.strictEqual(getChars('bye', 1), 'e');
  });
});

describe('tailMain', () => {
  it('Should return last 1 line in a file', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const mockedLog = mockConsole(['==> hi.txt <==\nhi\n']);
    const mockedError = mockConsole(['bye']);
    const args = ['-n', '1', 'hi.txt'];
    tailMain(mockedReadFile, mockedLog, mockedError, args);
    assert.strictEqual(mockedLog.count, 1);
  });

  it('Should return last 1 character in a file', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['h'], 'utf-8');
    const mockedLog = mockConsole(['']);
    const mockedError = mockConsole(['tail: hi: No such file or directory']);
    const args = ['-c', '1', 'hi'];
    tailMain(mockedReadFile, mockedLog, mockedError, args);
    assert.strictEqual(mockedError.count, 1);
  });
});

describe('tailFile', () => {
  it('Should return obj with isError false with file hi.txt ', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['hi'], 'utf-8');
    const fn = (x) => x;
    const option = { name: '-n', value: 1 };
    const actual = tailFile(mockedReadFile, 'hi.txt', fn, option);
    const expected = { fileName: 'hi.txt', content: 'hi' };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return obj with isError true with file hi', () => {
    const mockedReadFile = mockReadFile(['hi'], ['hi'], 'utf-8');
    const fn = (x) => x;
    const option = { name: '-n', value: 1 };
    const actual = tailFile(mockedReadFile, 'hi.txt', fn, option);
    const expected = {
      fileName: 'hi.txt', error: {
        name: 'fileReadError',
        message: "tail: hi.txt: No such file or directory",
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return obj with isError true with file bye', () => {
    const mockedReadFile = mockReadFile(['bye'], ['hi'], 'utf-8');
    const fn = (x) => x;
    const option = { name: '-n', value: 1 };
    const actual = tailFile(mockedReadFile, 'bye.txt', fn, option);
    const expected = {
      fileName: 'bye.txt', error: {
        name: 'fileReadError',
        message: "tail: bye.txt: No such file or directory",
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});
