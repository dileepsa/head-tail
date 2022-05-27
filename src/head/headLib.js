const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs, seperateArgs } = require('./parseArgs.js');
const { display } = require('./display.js');

const createErrorObj = (name, message) => {
  return { name, message };
};
const identity = ({ content }) => content;

const decideFormatter = fileNames => fileNames.length < 2 ? identity : format;

const format = ({ content, fileName }) => `==> ${fileName} <==\n${content}\n`;

const extract = (lines, count) => lines.slice(0, count);

const hasError = ({ error }) => error;

const getExitCode = headResults => headResults.some(hasError) ? 1 : 0;

const head = (content, count, separator) => {
  const allLines = splitLines(content, separator);
  const lines = extract(allLines, count);
  return joinLines(lines, separator);
};

const selectSeperator = (option) => option === '-c' ? '' : '\n';

const headOfFile = (readFile, fileName, option, separator) => {
  let fileContent;
  try {
    fileContent = readFile(fileName, 'utf-8');
  } catch (err) {
    const error = createErrorObj('fileReadError',
      `head: ${fileName}: No such file or directory`);
    return { error, fileName };
  }
  const content = head(fileContent, option.value, separator);
  return { content, fileName };
};

const headFiles = (readFile, fileNames, option) => {
  const seperator = selectSeperator(option.name);
  const formatter = decideFormatter(fileNames);
  return fileNames.map((fileName) => {
    const record = headOfFile(readFile, fileName, option, seperator);
    if (record.error) {
      return record;
    }
    record.content = formatter(record, record.fileName);
    return record;
  });
};

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
