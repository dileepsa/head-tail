const isStartsWith = (word, character) => {
  return word.startsWith(character);
};

const validateArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      name: 'invalidOptions',
      message: 'Cant be combined'
    };
  }
};

const parseArgs = (args) => {
  validateArgs(args);
  let [optionName, count, ...fileNames] = args;
  if (!isStartsWith(optionName, '-')) {
    [...fileNames] = args;
    return { fileNames, count: 10 };
  }
  return { fileNames, optionName, count: +count };
};

exports.parseArgs = parseArgs;
exports.validateArgs = validateArgs;
