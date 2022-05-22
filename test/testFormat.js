const assert = require('assert');
const { format } = require('../src/format.js');

describe('format', () => {
  it('Should format when one file name is given', () => {
    const contents = ['hi'];
    const fileNames = ['wish.txt'];
    assert.strictEqual(format(contents, fileNames), 'hi');
  });

  it('Should format when two file names are given', () => {
    const contents = ['hi', 'bye'];
    const fileNames = ['wish.txt', 'bye.txt'];
    const expected = "==> wish.txt <==\nhi\n\n==> bye.txt <==\nbye\n";
    assert.strictEqual(format(contents, fileNames), expected);
  });

  it('Should format when no content is given', () => {
    const contents = [];
    const fileNames = ['wish.txt', 'bye.txt'];
    assert.strictEqual(format(contents, fileNames), '');
  });

  it('Should format when content and files are not specified', () => {
    const contents = [];
    const fileNames = [];
    assert.strictEqual(format(contents, fileNames), '');
  });

});
