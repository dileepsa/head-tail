const display = (log, error, contents) => {
  contents.forEach((record) => {
    if (record.isError) {
      error(record.content.message);
      return;
    }
    log(record.content);
  });
};

exports.display = display;
