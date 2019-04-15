import React from 'react';
import { Placeholder } from '@storybook/components';
import Tabs from '@storybook/addon-a11y/dist/components/Tabs';
import PropTable from './PropTable';

export default class Panel extends React.Component {
  state = {
    components: {},
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
    const { active } = this.props;
    const { components, propTables } = this.state;

    if (!active) {
      return null;
    }

    if (Object.keys(components).length === 0) {
      return <Placeholder>No components found to be inspected.</Placeholder>;
    }

    const tabs = Object.entries(components).map(([name, component]) => ({
      label: name,
      panel: (
        <PropTable
          name={name}
          component={component}
          table={Object.values(propTables).find(table => table.name === name)}
        />
      ),
    }));

    if (tabs.length === 1) {
      return tabs[0].panel;
    }

    return <Tabs key="tabs" tabs={tabs} />;
  }
}
