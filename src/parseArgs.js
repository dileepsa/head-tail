const parseArgs = (args) => {
  const delimiterKeys = { '-n': '\n', '-c': '' };
  const option = args[0];
  const separator = delimiterKeys[option];
  const fileName = args[args.length - 1];
  return { fileName, count: +args[1], separator };
};

exports.parseArgs = parseArgs;
