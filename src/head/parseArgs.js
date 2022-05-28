const { createIterator } = require('./createIterator.js');
const { validateArgs } = require('./validateArgs.js');

const getOption = (options) => {
  options.unshift({ name: '-n', value: 10 });
  const option = options.pop();
  return option;
};

const isStartsWith = (text, symbol) => ('' + text).startsWith(symbol);

const isOption = text => {
  return (isStartsWith(text, '-') || isStartsWith(text, '+'))
    && text.length > 1;
};

const seperateNameValue = arg => {
  return isFinite(arg) ? ['-n', '' + Math.abs(arg)] :
    [arg.slice(0, 2), arg.slice(2)];
};

const seperateArg = arg => isOption(arg) ? seperateNameValue(arg) : arg;

const seperateArgs = args => {
  return args.flatMap(seperateArg).filter(arg => arg);
};

const createOptionObj = (name, value) => {
  return { name, value };
};

const parser = argsIterator => {
  const options = [];
  let currentArg = argsIterator.currentArg();

  while (isOption(currentArg)) {
    options.push(
      createOptionObj(currentArg, +argsIterator.nextArg()));
    currentArg = argsIterator.nextArg();
  }
  const fileNames = argsIterator.restOfArgs();
  return { fileNames, options };
};

const parseArgs = cmdArgs => {
  const args = seperateArgs(cmdArgs);
  const argsIterator = createIterator(args);
  const { fileNames, options } = parser(argsIterator);
  validateArgs({ fileNames, options });
  const option = getOption(options);
  return { fileNames, option };
};

exports.parseArgs = parseArgs;
exports.seperateArgs = seperateArgs;
exports.seperateNameValue = seperateNameValue;
exports.parser = parser;
