const { createIterator } = require('./createIterator.js');
const { validateArgs } = require('./validateArgs.js');

const seperateNameValue = (arg) => [arg.slice(0, 2), arg.slice(2)];

const seperateArgs = (args) => {
  return args.flatMap((arg) =>
    arg.startsWith('-') ? seperateNameValue(arg) : arg).filter((arg) => arg);
};

const parseOptions = (argsIterator) => {
  const parsedArgs = { options: [], fileNames: [] };
  let currentArg = argsIterator.currentArg();

  while (!argsIterator.isEnd()) {
    if (!currentArg.startsWith('-')) {
      parsedArgs.fileNames = argsIterator.restOfArgs();
      return parsedArgs;
    }

    parsedArgs.options.push(
      { name: currentArg, value: + argsIterator.nextArg() });
    argsIterator.nextArg();
    currentArg = argsIterator.currentArg();
  }
  return parsedArgs;
};

const parseArgs = (args) => {
  const modifiedArgs = seperateArgs(args);
  const argsIterator = createIterator(modifiedArgs);
  const parsedArgs = parseOptions(argsIterator);
  validateArgs(parsedArgs);

  parsedArgs.options.unshift({ name: '-n', value: 10 });

  const { fileNames, options } = parsedArgs;
  const option = options.pop();
  return { fileNames, option };
};

exports.parseArgs = parseArgs;
exports.seperateArgs = seperateArgs;
exports.seperateNameValue = seperateNameValue;
exports.parseOptions = parseOptions;
