/* eslint-disable complexity */
/* eslint-disable max-statements */

const isOptionValid = (option) => {
  return option.name === '-n' || option.name === '-c';
};

const validateArgs = (args) => {
  if (args.length < 1) {
    return { name: '-n', value: 10 };
  }

  const option = args[0];
  if (!isOptionValid(option)) {
    throw {
      name: 'invalidOption',
      message: `head: illegal-option ${option.name}`
    };
  }

  for (let index = 1; index < args.length; index++) {
    const options = args[index];
    if (options.name !== option.name) {
      throw {
        name: 'invalidOptions',
        message: "head: can't combine line and byte counts"
      };
    }
    option.value = options.value;
  }
  return option;
};

// validateArgs([{ name: '-n', value: 10 }, { name: '-c', value: 10 }]);

exports.isOptionValid = isOptionValid;
exports.validateArgs = validateArgs;
