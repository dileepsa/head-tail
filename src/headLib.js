const { splitLines, joinLines } = require('./stringUtils.js');

const extract = (lines, count) => lines.slice(0, count);

const head = (content, { count, separator }) => {
  const allLines = splitLines(content, separator);
  const lines = extract(allLines, count);
  return joinLines(lines, separator);
};

exports.head = head;
exports.extractLines = extract;
exports.splitLines = splitLines;
exports.joinLines = joinLines;
