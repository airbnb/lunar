import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ButtonOrLink from '@airbnb/lunar/lib/components/private/ButtonOrLink';
import IconAdd from '../../../../icons/src/interface/IconAdd';
import SideBarItem from '../../../src/components/SideBar/Item';

describe('<SideBarItem />', () => {
  it('errors for invalid icon', () => {
    expect(() => {
      shallowWithStyles(<SideBarItem icon={<div />} />);
    }).toThrow();
  });

  it('renders a list item with accessibility', () => {
    const wrapper = shallowWithStyles(<SideBarItem icon={<IconAdd decorative />} />);

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toBe('none');
    expect(wrapper.find(ButtonOrLink).prop('role')).toBe('menuitem');
  });

  it('renders an icon and label', () => {
    const wrapper = shallowWithStyles(
      <SideBarItem icon={<IconAdd decorative />} label={<i>Label</i>} />,
    );

    expect(wrapper.find(IconAdd)).toHaveLength(1);
    expect(wrapper.find('i')).toHaveLength(1);
  });

  it('passes href and onClick', () => {
    const click = jest.fn();
    const wrapper = shallowWithStyles(
      <SideBarItem icon={<IconAdd decorative />} href="/test" onClick={click} />,
    );

    expect(wrapper.find(ButtonOrLink).prop('href')).toBe('/test');
    expect(wrapper.find(ButtonOrLink).prop('onClick')).toBe(click);
  });

  it('overrides icon props', () => {
    const wrapper = shallowWithStyles(<SideBarItem icon={<IconAdd decorative size="5em" />} />);

    expect(wrapper.find(IconAdd).props()).toEqual(
      expect.objectContaining({
        size: '2em',
      }),
    );
  });
});
