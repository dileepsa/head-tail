const extractLines = (lines, count) => lines.slice(0, count);

const splitLines = (lines) => lines.split('\n');

const joinLines = (lines) => lines.join('\n');

const head = (content) => {
  const allLines = splitLines(content);
  const lines = extractLines(allLines, 2);
  return joinLines(lines);
};

exports.head = head;
exports.extractLines = extractLines;
