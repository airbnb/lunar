import React from 'react';
import { shallow } from 'enzyme';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import DirectionalIcon from '../../src/components/DirectionalIcon';
import Core from '../../src';

describe('<DirectionalIcon />', () => {
  it('passes props to underlying icon', () => {
    const wrapper = shallow(
      <DirectionalIcon
        direction="left"
        left={IconChevronLeft}
        right={IconChevronRight}
        size="1.5em"
        decorative
      />,
    );

    expect(wrapper.prop('size')).toBe('1.5em');
    expect(wrapper.prop('decorative')).toBe(true);
  });

  describe('LTR', () => {
    it('renders left icon when direction is left', () => {
      const wrapper = shallow(
        <DirectionalIcon
          direction="left"
          left={IconChevronLeft}
          right={IconChevronRight}
          size="1.5em"
          decorative
        />,
      );

      expect(wrapper.is(IconChevronLeft)).toBe(true);
    });

    it('renders right icon when direction is right', () => {
      const wrapper = shallow(
        <DirectionalIcon
          direction="right"
          left={IconChevronLeft}
          right={IconChevronRight}
          size="1.5em"
          decorative
        />,
      );

      expect(wrapper.is(IconChevronRight)).toBe(true);
    });
  });

  describe('RTL', () => {
    beforeEach(() => {
      Core.settings.rtl = true;
    });

    afterEach(() => {
      Core.settings.rtl = false;
    });

    it('renders right icon when direction is left', () => {
      const wrapper = shallow(
        <DirectionalIcon
          direction="left"
          left={IconChevronLeft}
          right={IconChevronRight}
          size="1.5em"
          decorative
        />,
      );

      expect(wrapper.is(IconChevronRight)).toBe(true);
    });

    it('renders left icon when direction is right', () => {
      const wrapper = shallow(
        <DirectionalIcon
          direction="right"
          left={IconChevronLeft}
          right={IconChevronRight}
          size="1.5em"
          decorative
        />,
      );

      expect(wrapper.is(IconChevronLeft)).toBe(true);
    });
  });
});
