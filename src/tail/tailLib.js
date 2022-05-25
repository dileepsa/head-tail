const { parseArgs } = require("./parseArgs");
const { parseOptions } = require('./tailOptions.js');

const getLines = (content, count) => {
  const lines = content.split('\n');
  return lines.slice(-count).join('\n');
};

const getChars = (content, count) => {
  const lines = content.split('');
  return lines.slice(-count).join('');
};

const tailMain = (readFile, args) => {
  const { fileNames, options } = parseArgs(parseOptions, args);
  let content;
  try {
    content = readFile(fileNames[0], 'utf-8');
  } catch (error) {
    throw `tail: ${fileNames[0]}: No such file or directory`;
  }
  const fn = options.name === '-n' ? getLines : getChars;
  return fn(content, options.value);
};

exports.tailMain = tailMain;
exports.getLines = getLines;
exports.getChars = getChars;
