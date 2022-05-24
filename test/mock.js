const assert = require('assert');
const mockConsole = function (expContents) {
  let index = 0;
  const log = function (content) {
    const expContent = expContents[index++];
    assert.strictEqual(content, expContent);
    log.count = index;
  };
  return log;
};

// const log = mockConsole(['Hello']);
// log('Hello');
// // log('Hi');