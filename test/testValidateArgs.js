const { validateArgs } = require('../src/validateArgs.js');
const assert = require('assert');

describe('validateArgs', () => {
  it('Should throw an error if 2 options are different', () => {
    const actual = () => validateArgs([{ name: '-n', value: 10 }, { name: '-c', value: 10 }]);
    assert.throws(actual, {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    });
  });

  it('Should throw an error if option is -v', () => {
    const actual = () => validateArgs([{ name: '-v', value: 10 }]);
    assert.throws(actual, {
      name: 'invalidOption',
      message: 'head: illegal-option -v'
    });
  });

  it('Should return option when -n and value is given', () => {
    const actual = validateArgs([{ name: '-n', value: 10 }]);
    const expected = { name: '-n', value: 10 };
    assert.deepStrictEqual(actual, expected);
  });
});
