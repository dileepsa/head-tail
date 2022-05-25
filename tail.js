const { tailMain } = require('./src/tail/tailLib.js');
const fs = require('fs');

const main = () => {
  try {
    tailMain(fs.readFileSync, process.argv.slice(2));
  } catch (error) {
    console.error(error);
  }
};

main();
