const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extract = (lines, count) => lines.slice(0, count);

const head = (content, count, separator) => {
  const allLines = splitLines(content, separator);
  const lines = extract(allLines, count);
  return joinLines(lines, separator);
};

const selectSeperator = (option) => option === '-c' ? '' : '\n';

const headMain = (readFile, args) => {
  const { fileNames, optionName, count } = parseArgs(args);
  let content;
  try {
    content = readFile(fileNames[0], 'utf-8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${fileNames[0]}`,
      fileName: fileNames[0]
    };
  }
  const separator = selectSeperator(optionName);
  return head(content, count, separator);
};

exports.head = head;
exports.extract = extract;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
exports.headMain = headMain;
