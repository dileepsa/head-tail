const usage = () => {
  return 'usage: head [-n lines | -c bytes] [file ...]';
};

const isOptionValid = (option) => {
  return option.name === '-n' || option.name === '-c';
};

const isValueInValid = (value) => value === 0;

const isEmpty = list => list.length < 1;

const error = (name, message) => {
  return { name, message };
};

const invalidOptionError = (option) => {
  return error('invalidOption', `head: illegal-option -- ${option}`);
};

const invalidValueError = (optionName, value) => {
  return error('illegal-count', `head: illegal ${optionName} count -- ${value}`
  );
};

const noFileSpecifiedError = () => {
  return error('noFilesSpecified', usage());
};

const invalidComboError = () => {
  return error('invalidOptions', "head: can't combine line and byte counts");
};

const assertIllegalOption = (option) => {
  if (!isOptionValid(option)) {
    throw invalidOptionError(option.name[1]);
  }

  if (isValueInValid(option.value)) {
    const options = { '-n': 'line', '-c': 'byte' };
    throw invalidValueError(options[option.name], option.value);
  }
};

const assertInvalidCombination = (flag1, flag2) => {
  if (flag1 !== flag2) {
    throw invalidComboError();
  }
};

const validateArgs = (args) => {
  const options = args.options;
  if (options.length < 1) {
    return;
  }

  if (isEmpty(args.fileNames)) {
    throw noFileSpecifiedError();
  }
  options.forEach(assertIllegalOption);
  const firstSwitch = options[0].name;
  options.forEach((option) =>
    assertInvalidCombination(firstSwitch, option.name));
};

exports.isOptionValid = isOptionValid;
exports.validateArgs = validateArgs;
exports.assertInvalidCombination = assertInvalidCombination;
exports.assertIllegalOption = assertIllegalOption;
exports.isValueInValid = isValueInValid;
