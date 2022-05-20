const { splitLines, joinLines } = require('./stringUtils.js');

const extractLines = (lines, count) => lines.slice(0, count);

const head = (content, count) => {
  const separator = '\n';
  const allLines = splitLines(content, separator);
  const lines = extractLines(allLines, count);
  return joinLines(lines, separator);
};

exports.head = head;
exports.extractLines = extractLines;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
