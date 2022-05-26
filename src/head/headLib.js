const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs, seperateArgs } = require('./parseArgs.js');
const { display } = require('./display.js');

const error = (name, message) => {
  return { name, message };
};

const format = (content, fileName) => `==> ${fileName} <==\n${content}\n`;

const extract = (lines, count) => lines.slice(0, count);

const head = (content, count, separator) => {
  const allLines = splitLines(content, separator);
  const lines = extract(allLines, count);
  return joinLines(lines, separator);
};

const selectSeperator = (option) => option === '-c' ? '' : '\n';

const headFile = (readFile, fileName, option, separator) => {
  const result = {};
  result.fileName = fileName;
  result.isError = false;
  try {
    result.content = readFile(fileName, 'utf-8');
  } catch (err) {
    result.isError = true;
    result.content = error('fileReadError',
      `head: ${fileName}: No such file or directory`);
    return result;
  }
  result.content = head(result.content, option.value, separator);
  return result;
};

const headFiles = (readFile, fileNames, option) => {
  const seperator = selectSeperator(option.name);

  return fileNames.map((fileName) => {
    const record = headFile(readFile, fileName, option, seperator);
    if (record.isError) {
      return record;
    }
    record.content = format(record.content, record.fileName);
    return record;
  });
};

const headMain = (readFile, log, logError, commandLineArgs) => {
  const args = seperateArgs(commandLineArgs);
  const { fileNames, option } = parseArgs(args);
  const headResults = headFiles(readFile, fileNames, option);
  return display(log, logError, headResults);
};

exports.head = head;
exports.extract = extract;
exports.headMain = headMain;
