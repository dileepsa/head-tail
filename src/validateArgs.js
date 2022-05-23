const isOptionValid = (option) => {
  return option.name === '-n' || option.name === '-c';
};

const throwIfIllegalOption = (option) => {
  if (!isOptionValid(option)) {
    throw {
      name: 'invalidOption',
      message: `head: illegal-option -- ${option.name[1]}`
    };
  }
};

const throwIfNoFiles = (files) => {
  if (files.length < 1) {
    throw {
      name: 'noFilesSpecified',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const validateArgs = (args) => {
  throwIfNoFiles(args.fileNames);
  if (args.options.length < 1) {
    return;
  }
  args.options.forEach(throwIfIllegalOption);
  const firstSwitch = args.options[0].name;
  args.options.forEach((option) => {
    if (firstSwitch !== option.name) {
      throw {
        name: 'invalidOptions',
        message: "head: can't combine line and byte counts"
      };
    }
  });
};

exports.isOptionValid = isOptionValid;
exports.validateArgs = validateArgs;
