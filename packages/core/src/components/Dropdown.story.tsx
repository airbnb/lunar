import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import Menu, { Row } from './Menu';
import Text from './Text';
import Dropdown, { Props } from './Dropdown';

class DropdownDemo extends React.Component<Props, { open: boolean }> {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { children, ...props } = this.props;

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button onClick={this.handleToggle}>{children!}</Button>

        {this.state.open && (
          <Dropdown {...props} visible zIndex={5} onClickOutside={action('onClickOutside')}>
            <Menu accessibilityLabel="Dropdown demo">
              <Row>
                <Text>Dropdown menu is open!</Text>
              </Row>
            </Menu>
          </Dropdown>
        )}
      </div>
    );
  }
}

storiesOf('Core/Dropdown', module)
  .addParameters({
    happo: false,
    inspectComponents: [Dropdown],
  })
  .addDecorator(story => <div style={{ padding: 50, margin: 'auto' }}>{story()}</div>)
  .add('Bottom-left dropdown.', () => <DropdownDemo>Toggle bottom-left (default)</DropdownDemo>)
  .add('Top-right dropdown.', () => (
    <DropdownDemo right="0" bottom="100%">
      Toggle top-right
    </DropdownDemo>
  ));
