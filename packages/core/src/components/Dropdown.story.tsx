import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import Menu, { Row } from './Menu';
import Text from './Text';
import Dropdown from './Dropdown';

class DropdownDemo extends React.Component<any, { open: boolean }> {
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
          <Dropdown {...props} visible onClickOutside={action('onClickOutside')} zIndex={5}>
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
  .add('Bottom-left dropdown.', () => <DropdownDemo>Toggle bottom-left (default)</DropdownDemo>)
  .add('Top-right dropdown.', () => (
    <DropdownDemo right="0" bottom="100%">
      Toggle top-right
    </DropdownDemo>
  ));
