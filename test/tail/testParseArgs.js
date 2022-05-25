const { parseArgs } = require('../../src/tail/parseArgs.js');
const assert = require('assert');
const { parseNOption, parseCOption } = require('../../src/tail/tailOptions.js');

describe('parseArgs', () => {
  it('Should return obj when -n is given', () => {
    const args = ['-n', '2', 'file'];
    const parseOptions = [
      { flag: '-n', valueNeeded: true, headersRequired: true, parse: parseNOption, validate: () => { } }
    ];
    const actual = parseArgs(parseOptions, args);
    const expected = { fileNames: ['file'], options: { name: '-n', value: 2 } };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return obj when -c is given', () => {
    const args = ['-c', '2', 'file'];
    const parseOptions = [
      { flag: '-c', valueNeeded: true, headersRequired: true, parse: parseCOption, validate: () => { } }
    ];
    const actual = parseArgs(parseOptions, args);
    const expected = { fileNames: ['file'], options: { name: '-c', value: 2 } };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return obj when -c2 is given', () => {
    const args = ['-c2', 'file'];
    const parseOptions = [
      { flag: '-c', valueNeeded: true, headersRequired: true, parse: parseCOption, validate: () => { } }
    ];
    const actual = parseArgs(parseOptions, args);
    const expected = { fileNames: ['file'], options: { name: '-c', value: 2 } };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return obj when -n2 is given', () => {
    const args = ['-n2', 'file'];
    const parseOptions = [
      { flag: '-n', valueNeeded: true, headersRequired: true, parse: parseNOption, validate: () => { } }
    ];
    const actual = parseArgs(parseOptions, args);
    const expected = { fileNames: ['file'], options: { name: '-n', value: 2 } };
    assert.deepStrictEqual(actual, expected);
  });

  it('Should throw error when -x is given', () => {
    const args = ['-x', '2', 'file'];
    const parseOptions = [
      { flag: '-n', valueNeeded: true, headersRequired: true, parse: parseNOption, validate: () => { } }
    ];
    const actual = () => parseArgs(parseOptions, args);
    const expected = 'invalid option -- x';
    assert.throws(actual, expected);
  });

  it('Should throw error when -x2 is given', () => {
    const args = ['-x2', 'file'];
    const parseOptions = [
      { flag: '-n', valueNeeded: true, headersRequired: true, parse: parseNOption, validate: () => { } }
    ];
    const actual = () => parseArgs(parseOptions, args);
    const expected = 'invalid option -- x';
    assert.throws(actual, expected);
  });
});
