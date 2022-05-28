const assert = require('assert');
const { getChars, getLines } = require('../../src/head/headLib.js');
const { splitLines, joinLines } = require('../../src/head/stringUtils.js');

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
