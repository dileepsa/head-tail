/* eslint-disable max-statements */
const { createIterator } = require('./createIterator.js');

const validateArgs = (args) => {
  if (/-[n]+/.test(args) && /-[c]+/.test(args)) {
    throw {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    };
  }

  if (args.some((arg) => /^-[^n,c]/.test(arg))) {
    throw {
      name: 'invalidOption',
      message: 'head: illegal-option'
    };
  }
};

const isOption = (word) => {
  const regEx = /^-[n,c]/;
  return regEx.test(word);
};

const seperateNameValue = (arg) => [arg.slice(0, 2), arg.slice(2)];

const seperateArgs = (args) => {
  return args.flatMap((arg) =>
    arg.startsWith('-') ? seperateNameValue(arg) : arg).filter((arg) => arg);
};

const parseArgs = (args) => {
  const modifiedArgs = seperateArgs(args);
  const options = { name: '-n', count: 10, fileNames: [] };
  validateArgs(modifiedArgs);

  const argsIterator = createIterator(modifiedArgs);
  let currentArg = argsIterator.currentArg();

  while (!argsIterator.isEnd()) {
    if (currentArg.startsWith('-')) {
      options.name = currentArg;
      options.count = + argsIterator.nextArg();
    } else {
      options.fileNames = argsIterator.restOfArgs();
      return options;
    }
    argsIterator.nextArg();
    currentArg = argsIterator.currentArg();
  }
  return options;
};

exports.parseArgs = parseArgs;
exports.validateArgs = validateArgs;
exports.isOption = isOption;
