const { parseArgs } = require("./parseArgs");
const { parseOptions } = require('./tailOptions.js');
const { format } = require('./format.js');
const { display } = require('./display.js');
const { seperateArgs } = require("../head/parseArgs.js");

const createErrorObj = (name, message) => {
  return { name, message };
};

const getLines = (content, count) => {
  const lines = content.split('\n');
  return lines.slice(-count).join('\n');
};

const getChars = (content, count) => {
  const lines = content.split('');
  return lines.slice(-count).join('');
};

const tailFile = (readFile, fileName, fnToCall, option) => {
  let fileContent;
  try {
    fileContent = readFile(fileName, 'utf-8');
  } catch (err) {
    const error = createErrorObj('fileReadError',
      `tail: ${fileName}: No such file or directory`);
    return { error, fileName };
  }
  const content = fnToCall(fileContent, option.value);
  return { content, fileName };
};

const tailFiles = (readFile, fileNames, options) => {
  const fn = options.name === '-n' ? getLines : getChars;

  return fileNames.map((fileName) => {
    const record = tailFile(readFile, fileName, fn, options);
    if (record.error) {
      return record;
    }
    record.content = format(record.content, fileName);
    return record;
  });
};

const tailMain = (readFile, log, error, commandLineArgs) => {
  const args = seperateArgs(commandLineArgs);
  const { fileNames, options } = parseArgs(parseOptions, args);
  const tailResults = tailFiles(readFile, fileNames, options);
  return display(log, error, tailResults);
};

exports.tailMain = tailMain;
exports.getLines = getLines;
exports.getChars = getChars;
exports.tailFile = tailFile;
