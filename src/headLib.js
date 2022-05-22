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
  const { fileNames, name, count } = parseArgs(args);

  if (fileNames.length < 1) {
    throw {
      name: 'FileReadError',
      message: 'No files specified',
    };
  }
  return fileNames.map((fileName) => {
    let content;
    try {
      content = readFile(fileName, 'utf-8');
    } catch (error) {
      throw {
        name: 'FileReadError',
        message: `Unable to read ${fileName}`,
        fileName: fileName
      };
    }
    const separator = selectSeperator(name);
    return head(content, count, separator);
  }).join('\n');

};

exports.head = head;
exports.extract = extract;
exports.headMain = headMain;
