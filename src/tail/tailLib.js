const getLines = (content, count) => {
  const lines = content.split('\n');
  return lines.slice(-count).join('\n');
};

const getChars = (content, count) => {
  const lines = content.split('');
  return lines.slice(-count).join('');
};

const tailMain = (readFile, option, fileName) => {

  const content = readFile(fileName, 'utf-8');
  const fn = option.name === '-n' ? getLines : getChars;
  return fn(content, option.count);
};

exports.tailMain = tailMain;
exports.getLines = getLines;
exports.getChars = getChars;
