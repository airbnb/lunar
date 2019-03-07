import PropTypes from 'prop-types';

const componentName: PropTypes.Requireable<any> = (
  props: any,
  propName: string,
  compName: string,
) => {
  const value = props[propName];

  if (!value || (typeof value === 'string' && value.match(/^[A-Z][a-zA-Z/]*$/))) {
    return null;
  }

  return new Error(
    `Invalid \`${propName}\` for \`${compName}\`. Must be a component name in PascalCase.`,
  );
};

componentName.isRequired = (
  props: any,
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
