const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
  }
};

main();
