const { tailMain } = require('./src/tail/tailLib.js');
const fs = require('fs');

const main = () => {
  try {
    tailMain(fs.readFileSync, console.log, console.error, process.argv.slice(2));
  } catch (error) {
    console.error(error);
  }
};

main();
