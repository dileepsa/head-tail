const parseArgs = (args) => {
  return { fileName: args[args.length - 1], count: +args[1], separator: '\n' };
};

exports.parseArgs = parseArgs;
