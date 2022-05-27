const display = (log, error, contents) => {
  contents.forEach((record) => {
    if (record.error) {
      error(record.error.message);
      return;
    }
    log(record.content);
  });
};

exports.display = display;
