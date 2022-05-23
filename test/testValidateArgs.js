const { validateArgs } = require('../src/validateArgs.js');
const assert = require('assert');

describe('validateArgs', () => {
  it('Should throw an error if 2 options are different', () => {
    const actual = () => validateArgs({ options: [{ name: '-n', value: 10 }, { name: '-c', value: 10 }], fileNames: ['wish.txt'] });
    assert.throws(actual, {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    });
  });

  it('Should throw an error if option is -v', () => {
    const actual = () => validateArgs({ options: [{ name: '-v', value: 10 }], fileNames: ['wish.txt'] });
    assert.throws(actual, {
      name: 'invalidOption',
      message: 'head: illegal-option -- v'
    });
  });

  it('Should throw an error if no files specified', () => {
    const actual = () => validateArgs({ options: [], fileNames: [] });
    assert.throws(actual, {
      name: 'noFilesSpecified',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should return undefined when no options specified', () => {
    const actual = validateArgs({ options: [], fileNames: ['hi'] });
    assert.strictEqual(actual, undefined);
  });
});
