/* eslint-disable no-loop-func */
/* eslint-disable max-statements */

const isOption = (text) => {
  return (text.startsWith('-') || text.startsWith('+')) && text.length > 1;
};

const mergeOptions = function (option1, option2) {
  return { ...option1, ...option2 };
};

const seperateNameValue = (arg) => {
  return isFinite(arg) ? ['-n', '' + Math.abs(arg)] :
    [arg.slice(0, 2), arg.slice(2)];
};

const seperateArgs = (args) => {
  return args.flatMap((arg) =>
    arg.startsWith('-') ? seperateNameValue(arg) : arg).filter((arg) => arg);
};

const parseArgs = (parseOptions, args) => {
  const allOptions = seperateArgs(args);
  let options = { name: '-n', value: 10 };
  const prevOptions = [];
  let index = 0;
  while (isOption(allOptions[index])) {
    const option = parseOptions.find(({ flag }) => flag === allOptions[index]);
    if (!option) {
      throw `invalid option -- ${allOptions[index]}`;
    }
    const flag = option.flag;
    let value = null;
    if (option.valueNeeded) {
      value = +allOptions[index + 1];
      index++;
    }
    option.validate(prevOptions);
    options = mergeOptions(options, option.parse(value));
    prevOptions.push(flag);
    index++;
  }
  const fileNames = allOptions.slice(index);
  return { options, fileNames };
};

exports.parseArgs = parseArgs;
