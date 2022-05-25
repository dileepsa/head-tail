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

const parseNOption = (value) => {
  return { name: '-n', value };
};

const parseCOption = (value) => {
  return { name: '-c', value };
};

const createObject = (flag, valueNeeded, headersRequired, parse, validate) => {
  return { flag, valueNeeded, headersRequired, parse, validate };
};

const lineOption = () => {
  return createObject('-n', true, true, parseNOption, assertOptions(['-c']));
};

const byteOption = () => {
  return createObject('-c', true, true, parseCOption, assertOptions(['-n']));
};

const reverseOption = () => {
  return createObject('-r', false, true, parseROption, assertOptions([]));
};

const quietOption = () => {
  return createObject('-q', false, false, parseQOption, assertOptions([]));
};

const parseOptions =
  [lineOption(), byteOption(), reverseOption(), quietOption()];

exports.parseOptions = parseOptions;
exports.parseCOption = parseCOption;
exports.parseNOption = parseNOption;
