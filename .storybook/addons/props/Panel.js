import React from 'react';
import { styled } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import Tabs from '@storybook/addon-a11y/dist/components/Tabs';
import PropTable from './PropTable';

// export const NoResults = styled.pre({
//   flex: 1,
//   margin: 0,
//   padding: '16px',
//   overflowY: 'auto',
//   color: '#666',
// });

export default class Panel extends React.Component {
  state = {
    components: [],
    propTables: {},
  };

  componentDidMount() {
    this.props.channel.on('SET_PROPS_DATA', this.handleSetProps);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('SET_PROPS_DATA', this.handleSetProps);
  }

  handleSetProps = data => {
    this.setState(data);
  };

  render() {
    const { components, propTables } = this.state;

    if (components.length === 0) {
      return <Placeholder>No components found to be inspected.</Placeholder>;
    }

    const tabs = components.map(component => {
      const propTable = Object.values(propTables).find(table => table.name === component);

      return {
        label: component,
        panel: <PropTable table={propTable} component={component} />,
      };
    });

    if (tabs.length === 1) {
      return tabs[0].panel;
    }

    return <Tabs key="tabs" tabs={tabs} />;
  }
}
