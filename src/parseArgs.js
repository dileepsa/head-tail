const isIncludes = (word, character) => {
  return word.includes(character);
};

const parseArgs = (args) => {
  let [optionName, count, ...fileNames] = args;
  if (!isIncludes(optionName, '-')) {
    [...fileNames] = args;
    return { fileNames, count: 10 };
  }
  return { fileNames, optionName, count: +count };
};

exports.parseArgs = parseArgs;
