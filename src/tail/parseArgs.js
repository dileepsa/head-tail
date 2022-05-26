/* eslint-disable max-statements */

const isOption = (text) => {
  return (text.startsWith('-') || text.startsWith('+')) && text.length > 1;
};

const mergeOptions = function (option1, option2) {
  return { ...option1, ...option2 };
};

const getOption = (options, arg) => {
  return options.find(({ flag }) => flag === arg);
};

const assertInvalidOption = (option) => {
  if (!option) {
    throw `invalid option -- ${option}`;
  }
};

const parseArgs = (parseOptions, args) => {
  let options = { name: '-n', value: 10 };
  const prevOptions = [];
  let index = 0;
  while (isOption(args[index])) {
    const option = getOption(parseOptions, args[index]);
    assertInvalidOption(option);
    const flag = option.flag;
    let value = null;
    if (option.valueNeeded) {
      value = +args[index + 1];
      index++;
    }
    option.validate(prevOptions);
    options = mergeOptions(options, option.parse(value));
    prevOptions.push(flag);
    index++;
  }
  const fileNames = args.slice(index);
  return { options, fileNames };
};

exports.parseArgs = parseArgs;
