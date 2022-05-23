const currentArg = function () {
  return this.args[this.index];
};

const isEnd = function () {
  return this.index > this.args.length - 1;
};

const restOfArgs = function () {
  return this.args.slice(this.index);
};

const nextArg = function () {
  this.index++;
  return this.args[this.index];
};

const createIterator = (args) => {
  const iterator = { args, index: 0 };
  iterator.currentArg = currentArg.bind(iterator);
  iterator.nextArg = nextArg.bind(iterator);
  iterator.isEnd = isEnd.bind(iterator);
  iterator.restOfArgs = restOfArgs.bind(iterator);
  return iterator;
};

exports.createIterator = createIterator;
exports.currentArg = currentArg;
exports.nextArg = nextArg;
