import PropTypes from 'prop-types';

type Props = { [key: string]: unknown };

const componentName: PropTypes.Requireable<string> = (
  props: Props,
  propName: string,
  compName: string,
) => {
  const value = props[propName];

  if (!value || (typeof value === 'string' && value.match(/^[A-Z][/A-Za-z]*$/))) {
    return null;
  }

  return new Error(
    `Invalid \`${propName}\` for \`${compName}\`. Must be a component name in PascalCase.`,
  );
};

componentName.isRequired = (
  props: Props,
  propName: string,
  compName: string,
  location: string,
  propFullName: string,
) => {
  const value = props[propName];

  if (!value) {
    return new TypeError(
      `Required prop \`${propName}\` was not specified in \`${componentName}\`.`,
    );
  }

  return componentName(props, propName, compName, location, propFullName);
};

export default componentName;
