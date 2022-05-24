const { validateArgs,
  assertInvalidCombination,
  assertIllegalOption,
  isOptionValid, isValueInValid } = require('../../src/head/validateArgs.js');
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
    const actual = () => validateArgs({ options: [{ name: '-n', value: 10 }], fileNames: [] });
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

describe('assertInvalidCombination', () => {
  it('Should throw error if two flags are not same', () => {
    const actual = () => assertInvalidCombination('-n', '-c');
    assert.throws(actual, {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    });
  });

  it('Should return undefined if flags are same', () => {
    const actual = assertInvalidCombination('-n', '-n');
    assert.strictEqual(actual, undefined);
  });
});

describe('assertIllegalOption', () => {
  it('Should throw error when option is -v', () => {
    const actual = () => assertIllegalOption({ name: '-v', value: 10 });
    assert.throws(actual, {
      name: 'invalidOption',
      message: 'head: illegal-option -- v'
    });
  });

  it('Should throw error for flag -n and value 0', () => {
    const actual = () => assertIllegalOption({ name: '-n', value: 0 });
    assert.throws(actual, {
      name: 'illegal-count',
      message: 'head: illegal line count -- 0'
    });
  });

  it('Should throw error for flag -c and value 0', () => {
    const actual = () => assertIllegalOption({ name: '-c', value: 0 });
    assert.throws(actual, {
      name: 'illegal-count',
      message: 'head: illegal byte count -- 0'
    });
  });

  it('Should return undefined if -n is given', () => {
    const actual = assertIllegalOption({ name: '-n', value: 10 });
    assert.strictEqual(actual, undefined);
  });
});

describe('isOptionValid', () => {
  it('Should return true when -n is given', () => {
    const actual = isOptionValid({ name: '-n', value: 10 });
    assert.strictEqual(actual, true);
  });

  it('Should return true when -c is given', () => {
    const actual = isOptionValid({ name: '-c', value: 10 });
    assert.strictEqual(actual, true);
  });

  it('Should return false when -v is given', () => {
    const actual = isOptionValid({ name: '-v', value: 10 });
    assert.strictEqual(actual, false);
  });
});

describe('isValueInValid', () => {
  it('Should return true when value is 0', () => {
    const actual = isValueInValid(0);
    assert.strictEqual(actual, true);
  });

  it('Should return false when value is 10', () => {
    const actual = isValueInValid(10);
    assert.strictEqual(actual, false);
  });
});
