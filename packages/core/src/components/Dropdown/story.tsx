import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../Button';
import Menu, { Row } from '../Menu';
import Text from '../Text';
import Dropdown, { Props } from '.';

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

export default {
  title: 'Core/Dropdown',
  decorators: [(story: Function) => <div style={{ padding: 50, margin: 'auto' }}>{story()}</div>],
  parameters: {
    happo: false,
    inspectComponents: [Dropdown],
  },
};

export function bottomLeftDropdown() {
  return <DropdownDemo>Toggle bottom-left (default)</DropdownDemo>;
}

bottomLeftDropdown.story = {
  name: 'Bottom-left dropdown.',
};

export function topRightDropdown() {
  return (
    <DropdownDemo right="0" bottom="100%">
      Toggle top-right
    </DropdownDemo>
  );
}

topRightDropdown.story = {
  name: 'Top-right dropdown.',
};
