import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Spacing from '../../src/components/Spacing';

describe('<Spacing />', () => {
  it('renders with a side', () => {
    const wrapper = shallowWithStyles(<Spacing top={1}>Content</Spacing>);

    expect(wrapper.prop('className')).toBe('outerTop_1');
  });

  it('renders with many sides', () => {
    const wrapper = shallowWithStyles(
      <Spacing top={1} bottom={3} left={2} right={4}>
        Content
      </Spacing>,
    );

    expect(wrapper.prop('className')).toBe('outerTop_1 outerBottom_3 outerLeft_2 outerRight_4');
  });

  it('renders as inline', () => {
    const wrapper = shallowWithStyles(
      <Spacing vertical={2} inline>
        Content
      </Spacing>,
    );

    expect(wrapper.prop('className')).toMatch('spacing_inline');
  });

  it('renders with padding', () => {
    const wrapper = shallowWithStyles(
      <Spacing all={2} inner>
        Content
      </Spacing>,
    );

    expect(wrapper.prop('className')).toBe('innerTop_2 innerRight_2 innerBottom_2 innerLeft_2');
  });

  it('renders a <div /> by default', () => {
    const wrapper = shallowWithStyles(<Spacing>Content</Spacing>);

    expect(wrapper.type()).toEqual('div');
  });

  it('renders with the passed in tag type', () => {
    const wrapper = shallowWithStyles(<Spacing tag="footer">Footer content</Spacing>);

    expect(wrapper.type()).toEqual('footer');
  });
});
