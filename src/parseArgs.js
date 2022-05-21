/* eslint-disable max-statements */

const validateArgs = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      name: 'invalidOptions',
      message: 'Cant be combined'
    };
  }
};

const isOption = (word) => word.match(/^-./);

const parseArgs = (args) => {
  validateArgs(args);
  const options = { name: '-n', count: 10, fileNames: [] };

  let index = 0;
  while (index < args.length) {
    if (isOption(args[index])) {
      options.name = args[index];
      options.count = +args[index + 1];
      index += 2;
    }
    if (!isOption(args[index])) {
      options.fileNames.push(args[index]);
      index++;
    }
  }
  return options;
};

exports.parseArgs = parseArgs;
exports.validateArgs = validateArgs;
