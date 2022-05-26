const { parseArgs } = require("./parseArgs");
const { parseOptions } = require('./tailOptions.js');
const { format } = require('./format.js');
const { display } = require('../head/display.js');
const { seperateArgs } = require("../head/parseArgs.js");

const error = (name, message) => {
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
  const result = {};
  result.fileName = fileName;
  result.isError = false;
  try {
    result.content = readFile(fileName, 'utf-8');
  } catch (err) {
    result.isError = true;
    result.content = error('fileReadError',
      `tail: ${fileName}: No such file or directory`);
    return result;
  }
  result.content = fnToCall(result.content, option.value);
  return result;
};

const tailFiles = (readFile, fileNames, options) => {
  const fn = options.name === '-n' ? getLines : getChars;

  return fileNames.map((fileName) => {
    const record = tailFile(readFile, fileName, fn, options);
    if (record.isError) {
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
