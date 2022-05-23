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
  const parsedArgs = { options: [], fileNames: [] };
  let currentArg = argsIterator.currentArg();

  while (!argsIterator.isEnd()) {
    if (currentArg.startsWith('-')) {
      parsedArgs.options.push(
        { name: currentArg, value: + argsIterator.nextArg() });
    } else {
      parsedArgs.fileNames = argsIterator.restOfArgs();
      return parsedArgs;
    }
    argsIterator.nextArg();
    currentArg = argsIterator.currentArg();
  }
  return parsedArgs;
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
