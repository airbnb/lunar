import React from 'react';
import { shallow } from 'enzyme';
import IconChevronDown from '@airbnb/lunar-icons/lib/interface/IconChevronDown';
import ExpandableIcon from '../../src/components/ExpandableIcon';
import DirectionalIcon from '../../src/components/DirectionalIcon';
import Core from '../../src';

describe('<ExpandableIcon />', () => {
  it('renders `DirectionalIcon` when not expanded', () => {
    const wrapper = shallow(<ExpandableIcon expanded={false} size="3em" />);

    expect(wrapper.is(DirectionalIcon)).toBe(true);
    expect(wrapper.prop('size')).toBe('3em');
  });

  it('renders `IconChevronDown` when expanded', () => {
    const wrapper = shallow(<ExpandableIcon expanded size="3em" />);

    expect(wrapper.is(IconChevronDown)).toBe(true);
    expect(wrapper.prop('size')).toBe('3em');
  });

  it('renders LTR direction by default', () => {
    const wrapper = shallow(<ExpandableIcon expanded={false} />);

    expect(wrapper.prop('direction')).toBe('right');
  });

  describe('RTL', () => {
    beforeEach(() => {
      Core.settings.rtl = true;
    });

    afterEach(() => {
      Core.settings.rtl = false;
    });

    it('swaps RTL direction', () => {
      const wrapper = shallow(<ExpandableIcon expanded={false} />);

      expect(wrapper.prop('direction')).toBe('left');
    });
  });
});
