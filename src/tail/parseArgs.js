/* eslint-disable no-loop-func */
/* eslint-disable max-statements */
const { parseOptions } = require('./tailOptions.js');

const isOption = (text) => {
  return (text.startsWith('-') || text.startsWith('+')) && text.length > 1;
};

const mergeOptions = function (option1, option2) {
  return { ...option1, ...option2 };
};

const parseArgs = (parseOptions) => {
  const args = ['-n', '10', '-r', '-q', '-n', '5', 'file'];
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
console.log(parseArgs(parseOptions));
