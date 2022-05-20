const extractLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const allLines = content.split('\n');
  const lines = extractLines(allLines, 2);
  return lines.join('\n');
};

exports.head = head;
exports.extractLines = extractLines;
