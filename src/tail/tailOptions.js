const assertOptions = (invalid) => {
  return function (options) {
    options.forEach((option) => {
      if (invalid.includes(option)) {
        throw 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      }
    });
  };
};
const parseROption = () => {
  return { reverse: true };
};

const parseQOption = () => {
  return { headersRequired: false };
};

const parseNoption = (value) => {
  return { name: '-n', value };
};

const parseCoption = (value) => {
  return { name: '-n', value };
};

const parseOptions = [
  {
    flag: '-n',
    valueNeeded: true,
    headersRequired: true,
    parse: parseNoption,
    validate: assertOptions(['-c'
    ]),
  },
  {
    flag: '-c',
    valueNeeded: true,
    headersRequired: true,
    parse: parseCoption,
    validate: assertOptions(['-n'
    ]),
  },
  {
    flag: '-r',
    headersRequired: true,
    valueNeeded: false,
    parse: parseROption,
    validate: assertOptions([]),
  },
  {
    flag: '-q',
    headersRequired: false,
    valueNeeded: false,
    parse: parseQOption,
    validate: assertOptions([]),
  }
];

exports.parseOptions = parseOptions;
