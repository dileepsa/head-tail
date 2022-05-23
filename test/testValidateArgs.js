const { validateArgs,
  validateFiles,
  validateInvalidCombination,
  validateIllegalOtion,
  isOptionValid
} = require('../src/validateArgs.js');
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

describe('validateFiles', () => {
  it('Should throw error if no files specified', () => {
    const actual = () => validateFiles([]);
    assert.throws(actual, {
      name: 'noFilesSpecified',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should return undefined if files present', () => {
    const actual = validateFiles(['hi']);
    assert.strictEqual(actual, undefined);
  });
});

describe('validateInvalidCombination', () => {
  it('Should throw error if two flags are not same', () => {
    const actual = () => validateInvalidCombination('-n', '-c');
    assert.throws(actual, {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    });
  });

  it('Should return undefined if flags are same', () => {
    const actual = validateInvalidCombination('-n', '-n');
    assert.strictEqual(actual, undefined);
  });
});

describe('validateIllegalOption', () => {
  it('Should throw error when option is -v', () => {
    const actual = () => validateIllegalOtion({ name: '-v', value: 10 });
    assert.throws(actual, {
      name: 'invalidOption',
      message: 'head: illegal-option -- v'
    });
  });
  it('Should return undefined if -n is given', () => {
    const actual = validateIllegalOtion({ name: '-n', value: '10' });
    assert.strictEqual(actual, undefined);
  });
});

describe('isOptionValid', () => {
  it('Should return true when -n is given', () => {
    const actual = isOptionValid({ name: '-n', value: '10' });
    assert.strictEqual(actual, true);
  });

  it('Should return true when -c is given', () => {
    const actual = isOptionValid({ name: '-c', value: '10' });
    assert.strictEqual(actual, true);
  });

  it('Should return false when -v is given', () => {
    const actual = isOptionValid({ name: '-v', value: '10' });
    assert.strictEqual(actual, false);
  });
});
