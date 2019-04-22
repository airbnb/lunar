import React from 'react';
import Menu, { Item } from '../../../../packages/core/src/components/Menu';
import Button from '../../../../packages/core/src/components/Button';
import IconMenuDots from '@airbnb/lunar-icons/lib/interface/IconMenuDots';

export class MenuRenderer extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick.bind(this));
  }

  private handleClick() {
    this.setState({
      open: false,
    });
  }

  private toggleClick = (event: React.SyntheticEvent<EventTarget>) => {
    event.stopPropagation();

    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const containerStyle: React.CSSProperties = {
      width: 200,
      position: 'fixed',
      zIndex: 1000,
    };

    const innerStyle: React.CSSProperties = {
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
      <React.Fragment>
        <Button inverted small onClick={this.toggleClick}>
          <IconMenuDots />
        </Button>
        {menu}
      </React.Fragment>
    );
  }
}

export default function menuRenderer() {
  return <MenuRenderer />;
}
