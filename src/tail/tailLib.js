const { parseArgs } = require("./parseArgs");
const { parseOptions } = require('./tailOptions.js');
const { format } = require('./format.js');
const { display } = require('../head/display.js');

const getLines = (content, count) => {
  const lines = content.split('\n');
  return lines.slice(-count).join('\n');
};

const getChars = (content, count) => {
  const lines = content.split('');
  return lines.slice(-count).join('');
};

const tailFile = (readFile, fileName, fnToCall, option) => {
  let content;
  let isError = false;
  try {
    content = readFile(fileName, 'utf-8');
  } catch (error) {
    isError = true;
    return {
      fileName,
      content: {
        name: 'FileReadError',
        message: `tail: ${fileName}: No such file or directory`
      },
      isError
    };
  }
  return { fileName, content: fnToCall(content, option.value), isError };
};

const tailMain = (readFile, log, error, args) => {
  const { fileNames, options } = parseArgs(parseOptions, args);
  const fn = options.name === '-n' ? getLines : getChars;
  const contents = fileNames.map((fileName) => {
    return tailFile(readFile, fileName, fn, options);
  });

  const formatted = contents.map((record) => {
    if (record.isError) {
      return record;
    }
    record.content = format(record.content, record.fileName);
    return record;
  });
  return display(log, error, formatted);
};

exports.tailMain = tailMain;
exports.getLines = getLines;
exports.getChars = getChars;
