const assert = require('assert');
const { head,
  extractLines,
  splitLines,
  joinLines
} = require('../src/headLib.js');

describe('head', () => {
  it('Should give 1 line', () => {
    assert.deepStrictEqual(head('hi', 1), 'hi');
    assert.deepStrictEqual(head('hello', 1), 'hello');
  });

  it('Should give 2 lines', () => {
    assert.deepStrictEqual(head('hi\nhello', 2), 'hi\nhello');
    assert.deepStrictEqual(head('hi\nhello\nbye', 2), 'hi\nhello');
  });

  it('Should give 3 lines', () => {
    assert.deepStrictEqual(head('hi\nhello\nbye', 3), 'hi\nhello\nbye');
    assert.deepStrictEqual(head('hi\nhello\nbye\nhi', 3), 'hi\nhello\nbye');
  });

  it('Should give all lines when the count is greater than lines', () => {
    assert.deepStrictEqual(head('hi\nhello', 3), 'hi\nhello');
    assert.deepStrictEqual(head('hi\nhello\nbye', 4), 'hi\nhello\nbye');
  });
});

describe('extractLines', () => {
  it('Should give 1 line', () => {
    assert.deepStrictEqual(extractLines(['hi'], 1), ['hi']);
    assert.deepStrictEqual(extractLines(['hello'], 1), ['hello']);
  });

  it('Should return array back when count is greater than lines length', () => {
    assert.deepStrictEqual(extractLines(['hi', 'bye'], 3), ['hi', 'bye']);
    assert.deepStrictEqual(extractLines(['a', 'b', 'c'], 4), ['a', 'b', 'c']);
  });

  it('Should give 2 lines', () => {
    assert.deepStrictEqual(extractLines(['hi', 'bye'], 2), ['hi', 'bye']);
    assert.deepStrictEqual(extractLines(['hi', 'bye', 'h'], 2), ['hi', 'bye']);
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
