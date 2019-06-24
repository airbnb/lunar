import React from 'react';
import { Placeholder } from '@storybook/components';
import { Tabs } from '@storybook/addon-a11y/dist/components/Tabs';
import About from './About';

export default class Panel extends React.Component {
  static defaultProps = {
    active: false,
  };

  state = {
    components: {},
    componentChangelogs: {},
    componentMetadata: {},
    section: '',
    storyPath: '',
  };

  componentDidMount() {
    this.props.channel.on('SET_PROPS_DATA', this.handleSetData);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('SET_PROPS_DATA', this.handleSetData);
  }

  handleSetData = ({ componentChangelogs, componentMetadata, ...data }) => {
    this.setState({
      componentChangelogs: JSON.parse(componentChangelogs),
      componentMetadata: JSON.parse(componentMetadata),
      ...data,
    });
  };

  render() {
    const { active } = this.props;
    const { components, componentChangelogs, componentMetadata, section, storyPath } = this.state;

    if (!active) {
      return null;
    }

    if (Object.keys(components).length === 0) {
      return <Placeholder>No components found to be inspected.</Placeholder>;
    }

    const tabs = Object.entries(components).map(([name, component]) => ({
      label: name,
      panel: (
        <About
          name={name}
          component={component}
          storyPath={storyPath}
          changelog={componentChangelogs[name]}
          metadata={Object.values(componentMetadata).find(
            meta => meta.name === name && meta.path.includes(section),
          )}
        />
      ),
    }));

    if (tabs.length === 1) {
      return tabs[0].panel;
    }

    return <Tabs key="tabs" tabs={tabs} />;
  }
}
