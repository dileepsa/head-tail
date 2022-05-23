const isOptionValid = (option) => {
  return option.name === '-n' || option.name === '-c';
};

const throwIfIllegalOption = (option) => {
  if (!isOptionValid(option)) {
    throw {
      name: 'invalidOption',
      message: `head: illegal-option ${option.name}`
    };
  }
};

const validateArgs = (args) => {
  if (args.length < 1) {
    return;
  }
  args.forEach(throwIfIllegalOption);
  const firstSwitch = args[0].name;
  args.forEach((option) => {
    if (firstSwitch !== option.name) {
      throw {
        name: 'invalidOptions',
        message: "head: can't combine line and byte counts"
      };
    }
  });
};

// validateArgs([{ name: '-v', value: 10 }]);

exports.isOptionValid = isOptionValid;
exports.validateArgs = validateArgs;
