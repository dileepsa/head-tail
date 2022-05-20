const isKeyPresent = (obj, key) => {
  const allKeys = Object.keys(obj);
  return allKeys.includes(key);
};

const parseArgs = (args) => {
  const fileName = args[args.length - 1];
  const separatorKeys = { '-n': '\n', '-c': '' };
  const option = args[0];
  let separator = separatorKeys[option];
  let count = +args[1];
  if (!isKeyPresent(separatorKeys, option)) {
    count = 10;
    separator = '\n';
  }
  return { fileName, count, separator };
};

exports.parseArgs = parseArgs;
