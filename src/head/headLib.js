const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs, seperateArgs } = require('./parseArgs.js');
const { display } = require('./display.js');

const createErrorObj = (name, message) => {
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

const headOfFile = (readFile, fileName, option, separator) => {
  const result = {};
  result.fileName = fileName;
  result.isError = false;
  try {
    result.content = readFile(fileName, 'utf-8');
  } catch (err) {
    result.isError = true;
    result.content = createErrorObj('fileReadError',
      `head: ${fileName}: No such file or directory`);
    return result;
  }
  result.content = head(result.content, option.value, separator);
  return result;
};

const headFiles = (readFile, fileNames, option) => {
  const seperator = selectSeperator(option.name);

  return fileNames.map((fileName) => {
    const record = headOfFile(readFile, fileName, option, seperator);
    if (record.isError) {
      return record;
    }
    record.content = format(record.content, record.fileName);
    return record;
  });
};

const getExitCode = headResults => + headResults.some(
  ({ isError }) => isError);

const headMain = (readFile, log, error, cmdArgs) => {
  const args = seperateArgs(cmdArgs);
  const { fileNames, option } = parseArgs(args);
  const headResults = headFiles(readFile, fileNames, option);
  display(log, error, headResults);
  return getExitCode(headResults);
};

exports.head = head;
exports.extract = extract;
exports.headMain = headMain;
exports.headFiles = headFiles;
exports.headOfFile = headOfFile;
exports.createErrorObj = createErrorObj;
exports.getExitCode = getExitCode;
