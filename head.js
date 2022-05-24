const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    headMain(fs.readFileSync, console.log, console.error, process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  }
};

main();
