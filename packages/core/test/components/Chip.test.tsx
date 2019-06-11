import React from 'react';
import { shallow } from 'enzyme';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';
import Chip from '../../src/components/Chip';
import ProfilePhoto from '../../src/components/ProfilePhoto';
import IconCheck from '../../../icons/src/interface/IconCheck';

describe('<Chip />', () => {
  it('renders as a <div /> when onClick is not provided', () => {
    const wrapper = shallow(<Chip>Dorito</Chip>).dive();
    expect(wrapper.type()).toBe('div');
  });

  it('renders as a <button /> when onClick is provided', () => {
    const onClick = () => {};
    const wrapper = shallow(<Chip onClick={onClick}>Potato</Chip>).dive();
    expect(wrapper.type()).toBe('button');
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper.prop('onClick')).toBe(onClick);
  });

  it('renders an after icon if provided', () => {
    const icon = <IconCheck />;
    const wrapper = shallow(<Chip afterIcon={icon}>Sour Cream and Onion</Chip>).dive();
    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders a before icon if provided', () => {
    const icon = <IconCheck />;
    const wrapper = shallow(<Chip beforeIcon={icon}>Sour Cream and Onion</Chip>).dive();
    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders the icon as a button if `onIconClick` is provided', () => {
    const icon = <IconCheck decorative />;
    const onClick = () => {};
    const wrapper = shallow(
      <Chip afterIcon={icon} onIconClick={onClick}>
        Sour Cream and Onion
      </Chip>,
    ).dive();
    const iconButtonWrapper = wrapper.find(ButtonOrLink);
    expect(iconButtonWrapper).toHaveLength(1);
    expect(iconButtonWrapper.contains(icon)).toBe(true);
  });

  it('renders a profile photo if provided', () => {
    const wrapper = shallow(<Chip profileImageSrc="foo">Baked Cheddar</Chip>).dive();
    const photoWrapper = wrapper.find(ProfilePhoto);
    expect(photoWrapper).toHaveLength(1);
    expect(photoWrapper.props()).toMatchObject({
      imageSrc: 'foo',
      title: '',
    });
  });
});
