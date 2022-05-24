const assert = require('assert');
const { head, extract } = require('../../src/head/headLib.js');
const { splitLines, joinLines } = require('../../src/head/stringUtils.js');

describe('head', () => {
  it('Should give 1 line', () => {
    assert.deepStrictEqual(head('hi', 1, '\n'), 'hi');
    assert.deepStrictEqual(head('hello', 1, '\n'), 'hello');
  });

  it('Should give 2 lines', () => {
    assert.deepStrictEqual(head('hi\nhello', 2, '\n'), 'hi\nhello');
    assert.deepStrictEqual(head('hi\nhello\nbye', 2, '\n'), 'hi\nhello');
  });

  it('Should give 3 lines', () => {
    assert.deepStrictEqual(head('hi\nhello\nbye', 3, '\n'), 'hi\nhello\nbye');
    assert.deepStrictEqual(head('hi\nhello\nbye\nhi', 3, '\n'), 'hi\nhello\nbye');
  });

  it('Should give 1 character', () => {
    assert.deepStrictEqual(head('hi', 1, ''), 'h');
    assert.deepStrictEqual(head('bye', 1, ''), 'b');
  });

  it('Should give 2 characters', () => {
    assert.deepStrictEqual(head('hi', 2, ''), 'hi');
    assert.deepStrictEqual(head('bye', 2, ''), 'by');
  });

  it('Should give all lines when the count is greater than lines', () => {
    assert.equal(head('hi\nhello', 3, '\n'), 'hi\nhello');
    assert.equal(head('hi\nhello\nbye', 4, '\n'), 'hi\nhello\nbye');
  });
});

describe('extractLines', () => {
  it('Should give 1 line', () => {
    assert.deepStrictEqual(extract(['hi'], 1), ['hi']);
    assert.deepStrictEqual(extract(['hello'], 1), ['hello']);
  });

  it('Should return array back when count is greater than lines length', () => {
    assert.deepStrictEqual(extract(['hi', 'bye'], 3), ['hi', 'bye']);
    assert.deepStrictEqual(extract(['a', 'b', 'c'], 4), ['a', 'b', 'c']);
  });

  it('Should give 2 lines', () => {
    assert.deepStrictEqual(extract(['hi', 'bye'], 2), ['hi', 'bye']);
    assert.deepStrictEqual(extract(['hi', 'bye', 'h'], 2), ['hi', 'bye']);
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
