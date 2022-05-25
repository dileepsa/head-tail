const assert = require('assert');
const { getLines, getChars, tailMain } = require('../../src/tail/tailLib.js');

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
    const args = ['-n', '1', 'hi.txt'];
    const actual = tailMain(mockedReadFile, args);
    assert.strictEqual(actual, 'hi');
  });

  it('Should return last 1 character in a file', () => {
    const mockedReadFile = mockReadFile(['hi.txt'], ['h'], 'utf-8');
    const args = ['-c', '1', 'hi.txt'];
    const actual = tailMain(mockedReadFile, args);
    assert.strictEqual(actual, 'h');
  });
});
