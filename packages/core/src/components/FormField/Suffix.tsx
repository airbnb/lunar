import React from 'react';
import FieldAffix, { Props } from '../private/FieldAffix';

/** A suffix to display after an input within a form field. */
export default class Suffix extends React.PureComponent<Props> {
  render() {
    const { children, compact, disabled } = this.props;

    return (
      <FieldAffix after compact={compact} disabled={disabled}>
        {children}
      </FieldAffix>
    );
  }
}
