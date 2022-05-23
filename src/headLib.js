const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { format } = require('./format.js');

const extract = (lines, count) => lines.slice(0, count);

const head = (content, count, separator) => {
  const allLines = splitLines(content, separator);
  const lines = extract(allLines, count);
  return joinLines(lines, separator);
};

const selectSeperator = (option) => option === '-c' ? '' : '\n';

const headMain = (readFile, args) => {
  const { fileNames, option } = parseArgs(args);

  if (fileNames.length < 1) {
    return 'usage: head [-n lines | -c bytes] [file ...]';
  }

  const contents = fileNames.map((fileName) => {
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
    const separator = selectSeperator(option.name);
    return head(content, option.value, separator);
  });

  return format(contents, fileNames);
};

exports.head = head;
exports.extract = extract;
exports.headMain = headMain;
