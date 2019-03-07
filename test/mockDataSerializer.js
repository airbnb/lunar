exports.test = function test(value) {
  return value && value.hasOwnProperty('__jest_mock_label__');
};

exports.print = function print(value) {
  return `${value.__jest_mock_label__} Mock`;
};
