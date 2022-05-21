const assert = require('assert');
const { parseArgs, validateArgs, isOption } = require('../src/parseArgs.js');

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
      message: 'Cant be combined'
    });
  });

  it('Should throw an error if option is -v', () => {
    const actual = () => validateArgs(['-v', '10']);
    assert.throws(actual, {
      name: 'invalidOption',
      message: 'head: illegal-option'
    });
  });
});

describe('isOption', () => {
  it('Should return true when -n is given ', () => {
    assert.strictEqual(isOption('-n'), true);
    assert.strictEqual(isOption('-n1'), true);
  });

  it('Should return true when -c is given ', () => {
    assert.strictEqual(isOption('-c'), true);
    assert.strictEqual(isOption('-c1'), true);
  });

  it('Should return false when invalid option is given ', () => {
    assert.strictEqual(isOption('-v'), false);
    assert.strictEqual(isOption('-v1'), false);
  });
});
