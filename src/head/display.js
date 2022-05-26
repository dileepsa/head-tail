const display = (log, error, contents) => {
  let exitCode = 0;
  contents.forEach((record) => {
    if (record.isError) {
      error(record.content.message);
      exitCode = 1;
      return;
    }
    log(record.content);
  });
  return exitCode;
};

exports.display = display;
