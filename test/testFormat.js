const assert = require('assert');
const { format } = require('../src/format.js');

describe('format', () => {
  it('Should format when one file name is given', () => {
    const content = 'hi';
    const fileName = 'wish.txt';
    assert.strictEqual(format(content, fileName), '==> wish.txt <==\nhi\n');
  });
});
