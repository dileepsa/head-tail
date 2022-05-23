const assert = require('assert');
const { parseArgs, validateArgs, parseOptions, seperateArgs, seperateNameValue } = require('../src/parseArgs.js');
const { createIterator } = require('../src/createIterator.js');

describe('parseArgs', () => {
  it('Should parse the args when -n is given', () => {
    assert.deepStrictEqual(parseArgs(['-n', '10', 'wish.txt']), {
      name: '-n',
      count: 10,
      fileNames: ['wish.txt'],
    });

    assert.deepStrictEqual(parseArgs(['-n', '2', 'wish.txt']), {
      name: '-n',
      count: 2,
      fileNames: ['wish.txt'],
    });
  });

  it('Should parse for -c option', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'wish.txt']), {
      name: '-c',
      count: 2,
      fileNames: ['wish.txt'],
    });

    assert.deepStrictEqual(parseArgs(['-c', '9', 'hello.txt']), {
      name: '-c',
      count: 9,
      fileNames: ['hello.txt'],
    });
  });

  it('Should return only filenames and count', () => {
    assert.deepStrictEqual(parseArgs(['wish.txt']), {
      name: '-n',
      count: 10,
      fileNames: ['wish.txt'],
    });

    assert.deepStrictEqual(parseArgs(['hi.txt', 'by.txt']), {
      name: '-n',
      count: 10,
      fileNames: ['hi.txt', 'by.txt'],
    });
  });

  it('Should consider the last value when the same option is repeated', () => {
    assert.deepStrictEqual(parseArgs(['-n', '10', '-n', '2', 'hi']), {
      name: '-n',
      count: 2,
      fileNames: ['hi']
    });
  });

  it('Should work when option and value are combined', () => {
    assert.deepStrictEqual(parseArgs(['-n3', 'hi']), {
      name: '-n',
      count: 3,
      fileNames: ['hi']
    });
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
    assert.deepStrictEqual(actual, { name: '-n', count: 10, fileNames: [] });
  });

  it('Should parse when option and filename is given', () => {
    const argsIterator = createIterator(['-n', '10', 'hi']);
    const actual = parseOptions(argsIterator);
    assert.deepStrictEqual(actual, { name: '-n', count: 10, fileNames: ['hi'] });
  });

  it('Should parse when multiple options are given', () => {
    const argsIterator = createIterator(['-c', '2', '-c', '5', 'hi']);
    const actual = parseOptions(argsIterator);
    assert.deepStrictEqual(actual, { name: '-c', count: 5, fileNames: ['hi'] });
  });

  it('Should parse when multiple files are given', () => {
    const argsIterator = createIterator(['-c', '5', 'hi', 'bye']);
    const actual = parseOptions(argsIterator);
    assert.deepStrictEqual(actual, { name: '-c', count: 5, fileNames: ['hi', 'bye'] });
  });
});
