const { parseArgs, seperateArgs } = require('./parseArgs.js');
const { display } = require('./display.js');

const createErrorObj = (name, message) => {
  return { name, message };
};
const identity = ({ content }) => content;

const decideFormatter = fileNames => fileNames.length < 2 ? identity : format;

const format = ({ content, fileName }) => `==> ${fileName} <==\n${content}\n`;

const hasError = ({ error }) => error;

const getExitCode = headResults => headResults.some(hasError) ? 1 : 0;

const getChars = (content, count) => {
  return content.slice(0, count);
};

const getLines = (content, count) => {
  const lines = content.split('\n');
  return lines.slice(0, count).join('\n');
};

const headOfFile = (readFile, fileName, option, fnToCall) => {
  let fileContent;
  try {
    fileContent = readFile(fileName, 'utf-8');
  } catch (err) {
    const error = createErrorObj('fileReadError',
      `head: ${fileName}: No such file or directory`);
    return { error, fileName };
  }
  const content = fnToCall(fileContent, option.value);
  return { content, fileName };
};

const headFiles = (readFile, fileNames, option) => {
  const fnToCall = option.name === '-n' ? getLines : getChars;
  const formatter = decideFormatter(fileNames);
  return fileNames.map((fileName) => {
    const record = headOfFile(readFile, fileName, option, fnToCall);
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

exports.headMain = headMain;
exports.headFiles = headFiles;
exports.headOfFile = headOfFile;
exports.createErrorObj = createErrorObj;
exports.getExitCode = getExitCode;
exports.getLines = getLines;
exports.getChars = getChars;
