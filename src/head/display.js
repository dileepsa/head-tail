const display = (log, error, result, formatter) => {
  if (result.error) {
    error(result.error.message);
    return;
  }
  log(formatter(result));
};

exports.display = display;
