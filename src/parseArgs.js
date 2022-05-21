/* eslint-disable max-statements */
const validateArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      name: 'invalidOptions',
      message: 'Cant be combined'
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

const parseArgs = (args) => {
  const options = { name: '-n', count: 10, fileNames: [] };

  let index = 0;
  while (isOption(args[index])) {
    if (args[index].length === 2) {
      options.name = args[index];
      options.count = +args[index + 1];
      index += 2;
    } else {
      options.name = args[index].substring(0, 2);
      options.count = +args[index].substring(2);
      index++;
    }
  }
  options.fileNames = args.slice(index);
  validateArgs(args);
  return options;
};

exports.parseArgs = parseArgs;
exports.validateArgs = validateArgs;
exports.isOption = isOption;
