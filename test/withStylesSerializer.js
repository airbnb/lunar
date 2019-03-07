exports.test = function test(value) {
  return value && !value.withStyles && value.$$typeof === Symbol.for('react.test.json');
};

exports.print = function print(value, printer) {
  value.withStyles = true;

  if (value.props.theme) {
    delete value.props.theme;
  }

  if (value.props.styles) {
    value.props.withStylesClasses = Object.keys(value.props.styles);

    delete value.props.styles;
  }

  return printer(value);
};
