import React from 'react';
import Menu, { Item } from '@airbnb/lunar/src/components/Menu';
import Button from '@airbnb/lunar/src/components/Button';
import IconMenuDots from '@airbnb/lunar-icons/lib/interface/IconMenuDots';

export class InnerMenuRenderer extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick.bind(this));
  }

  handleClick() {
    this.setState({
      open: false,
    });
  }

  toggleClick = event => {
    event.stopPropagation();

    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const containerStyle = {
      width: 200,
      position: 'fixed',
      zIndex: 1000,
    };

    const innerStyle = {
      position: 'relative',
      right: '148px',
      bottom: '5px',
    };

    const menu = this.state.open && (
      <div style={containerStyle}>
        <div style={innerStyle}>
          <Menu accessibilityLabel="User menu">
            <Item>Download Model</Item>
            <Item>View Source</Item>
          </Menu>
        </div>
      </div>
    );

    return (
      <>
        <Button inverted small onClick={this.toggleClick}>
          <IconMenuDots decorative />
        </Button>
        {menu}
      </>
    );
  }
}

export default function MenuRenderer() {
  return <InnerMenuRenderer />;
}
