import React from 'react';
import { shallow } from 'enzyme';
import IconChevronDown from '@airbnb/lunar-icons/lib/interface/IconChevronDown';
import IconChevronUp from '@airbnb/lunar-icons/lib/interface/IconChevronUp';
import Button from '../../src/components/Button';
import IconButton from '../../src/components/IconButton';
import Dropdown from '../../src/components/Dropdown';
import MenuToggle from '../../src/components/MenuToggle';
import Menu, { Item } from '../../src/components/Menu';
import IconCheck from '../../../icons/src/interface/IconCheck';

describe('<MenuToggle />', () => {
  it('renders a menu with expected number of children', () => {
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo">
        <Item>Child</Item>
        {''}
      </MenuToggle>,
    ).dive();

    expect(wrapper.find(Menu)).toHaveLength(1);
    expect(wrapper.find(Menu).children()).toHaveLength(1);
  });

  it('renders arrow icons based on state', () => {
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo">
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    const iconDown = wrapper.find(Button).prop('afterIcon') as React.ReactElement;
    expect(iconDown).not.toBeNull();
    expect(iconDown.type).toBe(IconChevronDown);

    wrapper.setState({
      opened: true,
    });

    const iconUp = wrapper.find(Button).prop('afterIcon') as React.ReactElement;
    expect(iconUp).not.toBeNull();
    expect(iconUp.type).toBe(IconChevronUp);
  });

  it('renders regular icon size', () => {
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo">
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    expect((wrapper.find(Button).prop('afterIcon') as React.ReactElement).props.size).toBe('1.5em');
  });

  it('renders large icon size', () => {
    const wrapper = shallow(
      <MenuToggle large accessibilityLabel="Foo" toggleLabel="Foo">
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    expect((wrapper.find(Button).prop('afterIcon') as React.ReactElement).props.size).toBe('2em');
  });

  it('renders small icon size', () => {
    const wrapper = shallow(
      <MenuToggle small accessibilityLabel="Foo" toggleLabel="Foo">
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    expect((wrapper.find(Button).prop('afterIcon') as React.ReactElement).props.size).toBe('1em');
  });

  it('renders a list with max height', () => {
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" menuProps={{ maxHeight: 200 }} toggleLabel="Foo">
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    expect(wrapper.find(Menu).prop('maxHeight')).toBe(200);
  });

  it('renders a button with the given label', () => {
    const label = 'Foo';
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel={label}>
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    expect(
      wrapper
        .find(Button)
        .children()
        .text(),
    ).toBe(label);
  });

  it('can render an icon button', () => {
    const label = 'Foo';
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleIcon={<IconCheck />} toggleLabel={label}>
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(IconCheck)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('clicking outside hides dropdown', () => {
    const onHide = jest.fn();
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo" onHide={onHide}>
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    wrapper.find(Button).simulate('click');
    wrapper.find(Dropdown).simulate('clickOutside');

    expect(onHide).toHaveBeenCalled();
  });

  it('calls onClick on an Item', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo">
        <Item onClick={onClick}>Child</Item>
      </MenuToggle>,
    ).dive();

    wrapper.find(Item).simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('closes on click when closeOnClick is true', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <MenuToggle closeOnClick accessibilityLabel="Foo" toggleLabel="Foo">
        <Item onClick={onClick}>Child 1</Item>
        <Item>Child 2</Item>
      </MenuToggle>,
    ).dive();

    wrapper
      .find(Item)
      .at(0)
      .simulate('click');

    expect(onClick).toHaveBeenCalled();
    expect(wrapper.state('opened')).toBe(false);
  });

  it('calls onShow when opened', () => {
    const onShow = jest.fn();
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo" onShow={onShow}>
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    wrapper.find(Button).simulate('click');

    expect(onShow).toHaveBeenCalled();
  });

  it('calls onHide when closed', () => {
    const onHide = jest.fn();
    const wrapper = shallow(
      <MenuToggle accessibilityLabel="Foo" toggleLabel="Foo" onHide={onHide}>
        <Item>Child</Item>
      </MenuToggle>,
    ).dive();

    wrapper.setState({
      opened: true,
    });

    wrapper.find(Button).simulate('click');

    expect(onHide).toHaveBeenCalled();
  });
});
