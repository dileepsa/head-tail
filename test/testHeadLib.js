const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should give 1 line', () => {
    assert.strictEqual(head('hi'), 'hi');
    assert.strictEqual(head('hello'), 'hello');
  });
});
