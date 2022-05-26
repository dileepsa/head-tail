const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { format } = require('./format.js');
const { display } = require('./display.js');

const error = (name, message) => {
  return { name, message };
};

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
  } catch (err) {
    isError = true;
    return {
      fileName,
      content: error('fileReadError',
        `head: ${fileName}: No such file or directory`),
      isError
    };
  }
  const separator = selectSeperator(option.name);
  return { fileName, content: head(content, option.value, separator), isError };
};

const headFiles = (readFile, fileNames, option) => {
  return fileNames.map((fileName) => {
    const record = headFile(readFile, fileName, option);
    if (record.isError) {
      return record;
    }
    record.content = format(record.content, record.fileName);
    return record;
  });
};

const headMain = (readFile, log, logError, args) => {
  const { fileNames, option } = parseArgs(args);
  const headResults = headFiles(readFile, fileNames, option);
  return display(log, logError, headResults);
};

exports.head = head;
exports.extract = extract;
exports.headMain = headMain;
