import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import ScrollSection, { ScrollWrapper } from './ScrollSection';

class ScrollDemo extends React.Component<{}, { activeSection: string }> {
  state = {
    activeSection: '',
  };

  handleSectionChange = (activeSection: string) => {
    this.setState({
      activeSection,
    });
  };

  render() {
    return (
      <div>
        <Text large>Active section: {this.state.activeSection}</Text>
        <br />

        <div style={{ height: '150px' }}>
          <ScrollWrapper onChangeActiveScrollSection={this.handleSectionChange}>
            <ScrollSection id="one">
              <div style={{ height: '100px', background: '#e8eff7' }} />
            </ScrollSection>

            <ScrollSection id="two">
              <div style={{ height: '100px', background: '#faecee' }} />
            </ScrollSection>

            <ScrollSection id="three">
              <div style={{ height: '100px', background: '#e6f2e6' }} />
            </ScrollSection>

            <ScrollSection id="four">
              <div style={{ height: '100px', background: '#f5f1e6 ' }} />
            </ScrollSection>

            <ScrollSection id="five">
              <div style={{ height: '100px', background: '#f2f1f1 ' }} />
            </ScrollSection>
          </ScrollWrapper>
        </div>
      </div>
    );
  }
}

storiesOf('Core/ScrollSection', module).add(
  'Section scrolled to the top of the wrapper will be set as the active section.',
  () => <ScrollDemo />,
);
