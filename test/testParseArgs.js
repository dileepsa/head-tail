const assert = require('assert');
const { parseArgs, validateArgs, parseOptions, seperateArgs, seperateNameValue } = require('../src/parseArgs.js');
const { createIterator } = require('../src/createIterator.js');

describe('parseArgs', () => {
  it('Should parse the args when -n is given', () => {
    const actual = parseArgs(['-n', '10', 'wish.txt']);
    const expected = { options: [{ name: '-n', value: 10 }], fileNames: ['wish.txt'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should parse for -c option', () => {
    const actual = parseArgs(['-c', '10', 'wish.txt']);
    const expected = { options: [{ name: '-c', value: 10 }], fileNames: ['wish.txt'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return only filenames', () => {
    let actual = parseArgs(['wish.txt']);
    let expected = { options: [], fileNames: ['wish.txt'] };
    assert.deepStrictEqual(actual, expected);

    actual = parseArgs(['wish.txt', 'hi.txt']);
    expected = { options: [], fileNames: ['wish.txt', 'hi.txt'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should work when option and value are combined', () => {
    const actual = parseArgs(['-c10', 'wish.txt']);
    const expected = { options: [{ name: '-c', value: 10 }], fileNames: ['wish.txt'] };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('validateArgs', () => {
  it('Should throw an error if 2 options are different', () => {
    const actual = () => validateArgs(['-n', '10', '-c', '10']);
    assert.throws(actual, {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    });
  });

  it('Should throw an error if option is -v', () => {
    const actual = () => validateArgs(['-v', '10']);
    assert.throws(actual, {
      name: 'invalidOption',
      message: 'head: illegal-option'
    });
  });
  it('Should throw an error if 2 options are specified without space', () => {
    const actual = () => validateArgs(['-n10', '-c10']);
    assert.throws(actual, { name: 'invalidOptions', message: "head: can't combine line and byte counts" });
  });
});

describe('seperateArgs', () => {
  it('Should seperate the combined args', () => {
    const actual = seperateArgs(['-n10']);
    assert.deepStrictEqual(actual, ['-n', '10']);
  });

  it('Should not seperate when options are seperated', () => {
    const actual = seperateArgs(['-n', '10']);
    assert.deepStrictEqual(actual, ['-n', '10']);
  });

  it('Should seperate when options -n10 -n 10 are given', () => {
    const actual = seperateArgs(['-n10', '-n', '10']);
    assert.deepStrictEqual(actual, ['-n', '10', '-n', '10']);
  });

  it('Should seperate when 2 combined options are given', () => {
    const actual = seperateArgs(['-n10', '-n10']);
    assert.deepStrictEqual(actual, ['-n', '10', '-n', '10']);
  });
});

describe('seperateNameValue', () => {
  it('Should seperate name and value', () => {
    const actual = seperateNameValue('-n10');
    assert.deepStrictEqual(actual, ['-n', '10']);
  });

  it('Should seperate the option', () => {
    const actual = seperateNameValue('-n');
    assert.deepStrictEqual(actual, ['-n', '']);
  });
});

describe('parseOptions', () => {
  it('Should parse when one option is given', () => {
    const argsIterator = createIterator(['-n', '10']);
    const actual = parseOptions(argsIterator);
    const expected = { options: [{ name: '-n', value: 10 }], fileNames: [] };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should parse when option and filename is given', () => {
    const argsIterator = createIterator(['-n', '10', 'hi']);
    const actual = parseOptions(argsIterator);
    const expected = { options: [{ name: '-n', value: 10 }], fileNames: ['hi'] };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should parse when multiple options are given', () => {
    const argsIterator = createIterator(['-c', '2', '-c', '5', 'hi']);
    const actual = parseOptions(argsIterator);
    const expected = {
      options: [{ name: '-c', value: 2 }, { name: '-c', value: 5 }], fileNames: ['hi']
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should parse when multiple files are given', () => {
    const argsIterator = createIterator(['-c', '5', 'hi', 'bye']);
    const actual = parseOptions(argsIterator);
    const expected = { options: [{ name: '-c', value: 5 }], fileNames: ['hi', 'bye'] };
    assert.deepStrictEqual(actual, expected);
  });
});
