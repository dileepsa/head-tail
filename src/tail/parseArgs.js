/* eslint-disable no-loop-func */
/* eslint-disable max-statements */
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

const parseOptions = [
  {
    flag: '-n',
    valueNeeded: true,
    headersRequired: true,
    parse: value => +value,
    validate: assertOptions(['-c']),
  },
  {
    flag: '-c',
    valueNeeded: true,
    headersRequired: true,
    parse: value => +value,
    validate: assertOptions(['-n']),
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

const isOption = (text) => {
  return (text.startsWith('-') || text.startsWith('+')) && text.length > 1;
};

const mergeOptions = function (option1, option2) {
  return { ...option1, ...option2 };
};

const parseArgs = (parseOptions) => {
  const args = ['-n', '10', '-r', '-n', '5', 'file'];
  let options = {};
  const prevOptions = [];
  let index = 0;
  while (isOption(args[index])) {
    const option = parseOptions.find(({ flag }) => flag === args[index]);
    if (!option) {
      throw `invalid option -- ${args[index]}`;
    }
    const flag = option.flag;
    let value = null;
    if (option.valueNeeded) {
      value = option.parse(args[index + 1]);
      index++;
    }
    option.validate(prevOptions);
    options = mergeOptions(options, { flag, value });
    prevOptions.push(flag);
    index++;
  }
  return options;
};

console.log(parseArgs(parseOptions));
