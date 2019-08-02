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
    compact: boolean;
    gap: boolean;
    header: boolean;
    headerShadow: boolean;
    portal: boolean;
    visible: boolean;
  }
> {
  state = {
    animated: true,
    compact: false,
    gap: false,
    header: false,
    headerShadow: false,
    portal: false,
    visible: false,
  };

  handleClick = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };

  handleAnimatedChange = () => {
    this.setState(({ animated }) => ({ animated: !animated }));
  };

  handleCompactChange = () => {
    this.setState(({ compact }) => ({ compact: !compact }));
  };

  handleGapChange = () => {
    this.setState(({ gap }) => ({ gap: !gap }));
  };

  handleHeaderChange = () => {
    this.setState(({ header }) => ({ header: !header }));
  };

  handleHeaderShadowChange = () => {
    this.setState(({ headerShadow }) => ({ headerShadow: !headerShadow }));
  };

  handlePortalChange = () => {
    this.setState(({ portal }) => ({ portal: !portal }));
  };

  render() {
    const { animated, compact, gap, header, headerShadow, portal, visible } = this.state;

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
            noSpacing
            name="header"
            label="Show header"
            checked={header}
            onChange={this.handleHeaderChange}
          />

          <CheckBox
            noSpacing
            name="headerShadow"
            label="Show shadow on header"
            checked={headerShadow}
            onChange={this.handleHeaderShadowChange}
          />

          <CheckBox
            name="compact"
            label="Render with compact spacing"
            checked={compact}
            onChange={this.handleCompactChange}
          />

          <Sheet
            gap={gap}
            noAnimation={!animated}
            portal={portal}
            visible={visible}
            onClose={this.handleClick}
            header={header && <Text>This is the header!</Text>}
            headerShadow={headerShadow}
            compact={compact}
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
    happo: false,
    inspectComponents: [Sheet, SheetArea],
  })
  .add('A sheet that appears over content.', () => <SheetDemo />);
