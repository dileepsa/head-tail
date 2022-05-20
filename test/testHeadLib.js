const assert = require('assert');
const { head, extractLines } = require('../src/headLib.js');

describe('head', () => {
  it('Should give 1 line', () => {
    assert.deepStrictEqual(head('hi'), 'hi');
    assert.deepStrictEqual(head('hello'), 'hello');
  });

  it('Should give 2 lines', () => {
    assert.deepStrictEqual(head('hi\nhello'), 'hi\nhello');
    assert.deepStrictEqual(head('hi\nhello\nbye'), 'hi\nhello');
  });
});

describe('extractLines', () => {
  it('Should give 1 line', () => {
    assert.deepStrictEqual(extractLines(['hi'], 1), ['hi']);
    assert.deepStrictEqual(extractLines(['hello'], 1), ['hello']);
  });

  it('Should give 2 lines', () => {
    assert.deepStrictEqual(extractLines(['hi', 'bye'], 2), ['hi', 'bye']);
    assert.deepStrictEqual(extractLines(['hi', 'bye', 'h'], 2), ['hi', 'bye']);
  });
});
