const isOptionValid = (option) => {
  return option.name === '-n' || option.name === '-c';
};

const isValueInValid = (option) => option.value === 0;

const validateIllegalOption = (option) => {
  if (!isOptionValid(option)) {
    throw {
      name: 'invalidOption',
      message: `head: illegal-option -- ${option.name[1]}`
    };
  }

  if (isValueInValid(option)) {
    const options = { '-n': 'line', '-c': 'byte' };
    throw {
      name: 'illegal-count',
      message: `head: illegal ${options[option.name]} count -- ${option.value}`
    };
  }
};

const validateFiles = (files) => {
  if (files.length < 1) {
    throw {
      name: 'noFilesSpecified',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const validateInvalidCombination = (flag1, flag2) => {
  if (flag1 !== flag2) {
    throw {
      name: 'invalidOptions',
      message: "head: can't combine line and byte counts"
    };
  }
};

const validateArgs = (args) => {
  const options = args.options;
  if (options.length < 1) {
    return;
  }
  validateFiles(args.fileNames);
  options.forEach(validateIllegalOption);
  const firstSwitch = options[0].name;
  options.forEach((option) =>
    validateInvalidCombination(firstSwitch, option.name));
};

exports.isOptionValid = isOptionValid;
exports.validateArgs = validateArgs;
exports.validateFiles = validateFiles;
exports.validateInvalidCombination = validateInvalidCombination;
exports.validateIllegalOption = validateIllegalOption;
exports.isValueInValid = isValueInValid;
