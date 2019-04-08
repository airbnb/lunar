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
    headerBar: boolean;
    portal: boolean;
    visible: boolean;
  }
> {
  state = {
    animated: true,
    gap: false,
    headerBar: false,
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

  handleHeaderBarChange() {
    this.setState(({ headerBar }) => ({ headerBar: !headerBar }));
  }

  handlePortalChange() {
    this.setState(({ portal }) => ({ portal: !portal }));
  }

  render() {
    const { animated, gap, headerBar, portal, visible } = this.state;

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
            noSpacing
            name="animated"
            label="Render with animation"
            checked={animated}
            onChange={this.handleAnimatedChange}
          />

          <CheckBox
            name="header"
            label="Show header bar"
            checked={headerBar}
            onChange={this.handleHeaderBarChange}
          />

          <Sheet
            gap={gap}
            noAnimation={!animated}
            portal={portal}
            visible={visible}
            onClose={this.handleClick}
            headerBar={headerBar && <Text>This is the header!</Text>}
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

storiesOf('Core/Sheet', module)
  .addParameters({
    inspectComponents: [Sheet, SheetArea],
  })
  .add('A sheet that appears over content.', () => <SheetDemo />);
