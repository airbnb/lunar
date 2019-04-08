import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import CheckBox from './CheckBox';
import Text from './Text';
import Spacing from './Spacing';
import Sheet, { SheetArea } from './Sheet';

class SheetDemo extends React.Component<
  {},
  {
    animated: boolean;
    gap: boolean;
    portal: boolean;
    visible: boolean;
  }
> {
  state = {
    animated: true,
    gap: false,
    portal: false,
    visible: false,
  };

  handleClick = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };

  handleAnimatedChange = () => {
    this.setState(({ animated }) => ({ animated: !animated }));
  };

  handleGapChange = () => {
    this.setState(({ gap }) => ({ gap: !gap }));
  };

  handlePortalChange = () => {
    this.setState(({ portal }) => ({ portal: !portal }));
  };

  render() {
    const { animated, gap, portal, visible } = this.state;

    return (
      <SheetArea>
        <div style={{ height: 400 }}>
          <CheckBox
            noSpacing
            name="portal"
            label="Render in portal"
            checked={portal}
            onChange={this.handlePortalChange}
          />

          <CheckBox
            noSpacing
            name="gap"
            label="Render with gap"
            checked={gap}
            onChange={this.handleGapChange}
          />

          <CheckBox
            name="animated"
            label="Render with animation"
            checked={animated}
            onChange={this.handleAnimatedChange}
          />

          <Sheet
            gap={gap}
            noAnimation={!animated}
            portal={portal}
            visible={visible}
            onClose={this.handleClick}
          >
            <Spacing inner vertical={12}>
              <Text>This is in a sheet!</Text>
            </Spacing>

            <Spacing inner top={12}>
              <Button onClick={this.handleClick}>Close sheet</Button>
            </Spacing>
          </Sheet>

          <Button onClick={this.handleClick}>Show sheet</Button>
        </div>
      </SheetArea>
    );
  }
}

storiesOf('Core/Sheet', module).add('A sheet that appears over content.', () => <SheetDemo />);
