import React from 'react';
import FieldAffix, { FieldAffixProps } from '../private/FieldAffix';

/** A prefix to display before an input within a form field. */
export default class Prefix extends React.PureComponent<FieldAffixProps> {
  render() {
    const { children, small, large, disabled } = this.props;

    return (
      <FieldAffix before small={small} large={large} disabled={disabled}>
        {children}
      </FieldAffix>
    );
  }
}
