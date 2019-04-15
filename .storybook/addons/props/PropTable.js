import React from 'react';
import { Placeholder } from '@storybook/components';

export default class PropTable extends React.Component {
  render() {
    const { component, table } = this.props;

    if (!table) {
      return (
        <Placeholder>
          No props found for <b>{component.name}</b>.
        </Placeholder>
      );
    }

    console.log(table);

    return null;
  }
}
