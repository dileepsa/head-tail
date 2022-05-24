const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { format } = require('./format.js');
const { display } = require('./display.js');

const extract = (lines, count) => lines.slice(0, count);

const head = (content, count, separator) => {
  const allLines = splitLines(content, separator);
  const lines = extract(allLines, count);
  return joinLines(lines, separator);
};

const selectSeperator = (option) => option === '-c' ? '' : '\n';

const headFile = (readFile, fileName, option) => {
  let content;
  let isError = false;
  try {
    content = readFile(fileName, 'utf-8');
  } catch (error) {
    isError = true;
    return {
      fileName, content: {
        name: 'FileReadError',
        message: `head: ${fileName}: No such file or directory`,
      }, isError
    };
  }
  const separator = selectSeperator(option.name);
  return { fileName, content: head(content, option.value, separator), isError };
};

const headMain = (readFile, log, error, args) => {
  const { fileNames, option } = parseArgs(args);

  const contents = fileNames.map((fileName) =>
    headFile(readFile, fileName, option));

  const formatted = contents.map((record) => {
    if (record.isError) {
      return record;
    }
    record.content = format(record.content, record.fileName);
    return record;
  });
  return display(log, error, formatted);
};

exports.head = head;
exports.extract = extract;
exports.headMain = headMain;
