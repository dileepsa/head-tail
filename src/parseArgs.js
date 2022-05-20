const parseArgs = (args) => {
  const [optionName, count, fileName] = args;
  return { fileName, optionName, count: +count };
};

exports.parseArgs = parseArgs;
