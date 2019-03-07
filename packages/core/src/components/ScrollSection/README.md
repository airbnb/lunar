Section scrolled to the top of the wrapper will be set as the active section.

```jsx
import ScrollSection from '.';
import ScrollWrapper from './ScrollWrapper';
import Text from '../Text';

class ScrollDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      activeSection: '',
    };

    this.handleSectionChange = this.handleSectionChange.bind(this);
  }

  handleSectionChange(activeSection) {
    this.setState({
      activeSection,
    });
  }

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

<ScrollDemo />;
```
