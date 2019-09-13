import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';
import Chip from '../../src/components/Chip';
import ProfilePhoto from '../../src/components/ProfilePhoto';
import IconCheck from '../../../icons/src/interface/IconCheck';

describe('<Chip />', () => {
  it('renders as a <div /> when onClick is not provided', () => {
    const wrapper = shallowWithStyles(<Chip>Dorito</Chip>);
    expect(wrapper.type()).toBe('div');
  });

  it('renders as a <button /> when onClick is provided', () => {
    const onClick = () => {};
    const wrapper = shallowWithStyles(<Chip onClick={onClick}>Potato</Chip>);
    expect(wrapper.type()).toBe('button');
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper.prop('onClick')).toBe(onClick);
  });

  it('add data-tracking-name when clickable', () => {
    const onClick = () => {};
    const wrapper = shallowWithStyles(
      <Chip id="tracking-chip" trackingName="tracking-chip-name" onClick={onClick}>
        Potato
      </Chip>,
    );
    expect(wrapper.prop('id')).toBe('tracking-chip');
    expect(wrapper.find('button').prop('id')).toBe('tracking-chip');
    expect(wrapper.find('button').prop('data-tracking-name')).toBe('tracking-chip-name');
  });

  it('doesnt add data-tracking-name when not clickable', () => {
    const wrapper = shallowWithStyles(
      <Chip id="tracking-chip" trackingName="tracking-chip-name">
        Potato
      </Chip>,
    );
    expect(
      wrapper
        .find('div')
        .first()
        .prop('id'),
    ).toBe('tracking-chip');
    expect(
      wrapper
        .find('div')
        .find({ id: 'tracking-chip' })
        .prop('data-tracking-name'),
    ).toBeUndefined();
  });

  it('renders an after icon if provided', () => {
    const icon = <IconCheck />;
    const wrapper = shallowWithStyles(<Chip afterIcon={icon}>Sour Cream and Onion</Chip>);
    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders a before icon if provided', () => {
    const icon = <IconCheck />;
    const wrapper = shallowWithStyles(<Chip beforeIcon={icon}>Sour Cream and Onion</Chip>);
    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders the icon as a button if `onIconClick` is provided', () => {
    const icon = <IconCheck decorative />;
    const onClick = () => {};
    const wrapper = shallowWithStyles(
      <Chip afterIcon={icon} onIconClick={onClick}>
        Sour Cream and Onion
      </Chip>,
    );
    const iconButtonWrapper = wrapper.find(ButtonOrLink);
    expect(iconButtonWrapper).toHaveLength(1);
    expect(iconButtonWrapper.contains(icon)).toBe(true);
  });

  it('renders a profile photo if provided', () => {
    const wrapper = shallowWithStyles(<Chip profileImageSrc="foo">Baked Cheddar</Chip>);
    const photoWrapper = wrapper.find(ProfilePhoto);
    expect(photoWrapper).toHaveLength(1);
    expect(photoWrapper.props()).toMatchObject({
      imageSrc: 'foo',
      title: '',
    });
  });
});
