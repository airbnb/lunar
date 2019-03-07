Display a dropdown in different positions (default is bottom-left).

```jsx
import Button from '../Button';
import Menu, { Row } from '../Menu';
import Text from '../Text';

class DropdownDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button onClick={this.handleToggle}>{children}</Button>

        {this.state.open && (
          <Dropdown {...props} visible onClickOutside={debug('onClickOutside')} zIndex={5}>
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

<div>
  <DropdownDemo>Toggle bottom-left</DropdownDemo>{' '}
  <DropdownDemo right="0" bottom="100%">
    Toggle top-right
  </DropdownDemo>
</div>;
```
