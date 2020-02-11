import React from 'react';
import FieldAffix, { FieldAffixProps } from '../private/FieldAffix';

/** A suffix to display after an input within a form field. */
export default class Suffix extends React.PureComponent<FieldAffixProps> {
  render() {
    const { children, small, large, disabled } = this.props;

    return (
      <FieldAffix after small={small} large={large} disabled={disabled}>
        {children}
      </FieldAffix>
    );
  }
}
