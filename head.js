const { headMain } = require('./src/head/headLib.js');
const fs = require('fs');

const main = (args) => {
  let exitCode;
  try {
    exitCode = headMain(fs.readFileSync, console.log, console.error, args);
  } catch (error) {
    console.error(error.message);
    exitCode = 1;
  } finally {
    process.exitCode = exitCode;
  }
};

main(process.argv.slice(2));
