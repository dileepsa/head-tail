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

const seperateNameValue = (arg) => [arg.slice(0, 2), arg.slice(2)];

const seperateArgs = (args) => {
  return args.flatMap((arg) =>
    arg.startsWith('-') ? seperateNameValue(arg) : arg).filter((arg) => arg);
};

const parseOptions = (argsIterator) => {
  const options = { name: '-n', count: 10, fileNames: [] };
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

const parseArgs = (args) => {
  const modifiedArgs = seperateArgs(args);
  validateArgs(modifiedArgs);

  const argsIterator = createIterator(modifiedArgs);
  const options = parseOptions(argsIterator);
  return options;
};

exports.parseArgs = parseArgs;
exports.validateArgs = validateArgs;
exports.seperateArgs = seperateArgs;
exports.seperateNameValue = seperateNameValue;
exports.parseOptions = parseOptions;
