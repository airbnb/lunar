import React from 'react';
import Enzyme from 'enzyme';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import Link from '@airbnb/lunar/lib/components/Link';
import Button from '@airbnb/lunar/lib/components/Button';
import Menu from '@airbnb/lunar/lib/components/Menu';
import Dropdown from '@airbnb/lunar/lib/components/Dropdown';
import SecondaryLink from '@airbnb/lunar/lib/components/SecondaryLink';
import FilterMenu, { Row } from '../../src/components/FilterMenu';

function openFilters(wrapper: Enzyme.ReactWrapper) {
  wrapper.find(Button).at(0).simulate('click');
}

function getDropdown(wrapper: Enzyme.ReactWrapper) {
  return wrapper.find(Dropdown).at(0);
}

function getMenu(wrapper: Enzyme.ReactWrapper) {
  return wrapper.find(Menu).at(0);
}

describe('<FilterMenu />', () => {
  const props = {
    accessibilityLabel: 'label',
  };

  it('renders a menu toggle', () => {
    const wrapper = mountUseStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(wrapper).toHaveLength(1);
  });

  it('clicking apply on a valid form closes the menu', () => {
    const wrapper = mountUseStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    wrapper.find(Link).at(0).simulate('click');

    expect(wrapper.find('div[aria-expanded=true]')).toHaveLength(1);
  });

  it('clicking clear calls reset', () => {
    const onClear = jest.fn();
    const wrapper = mountUseStyles(
      <FilterMenu {...props} onClear={onClear}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    wrapper.find(SecondaryLink).at(0).find('button').at(0).simulate('click');

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('clicking clear closes the menu', () => {
    const onHide = jest.fn();
    const wrapper = mountUseStyles(
      <FilterMenu {...props} onHide={onHide}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    wrapper.find(SecondaryLink).at(0).find('button').at(0).simulate('click');

    expect(onHide).toHaveBeenCalledTimes(1);
  });

  it('clicking clear keeps the menu open when keepOpenOnClear is passed', () => {
    const onHide = jest.fn();
    const wrapper = mountUseStyles(
      <FilterMenu keepOpenOnClear {...props} onHide={onHide}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    wrapper.find(SecondaryLink).at(0).simulate('click');

    expect(onHide).toHaveBeenCalledTimes(0);
  });

  it('right-aligns by default', () => {
    const wrapper = mountUseStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(getDropdown(wrapper).prop('right')).toBe(0);
    expect(getDropdown(wrapper).prop('left')).toBeUndefined();
  });

  it('optionally aligns to the left', () => {
    const wrapper = mountUseStyles(
      <FilterMenu {...props} dropdownProps={{ left: 0 }}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(getDropdown(wrapper).prop('left')).toBe(0);
    expect(getDropdown(wrapper).prop('right')).toBeUndefined();
  });

  it('optionally has visible overflow', () => {
    const wrapper = mountUseStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(getMenu(wrapper).prop('overflow')).toBeUndefined();

    wrapper.setProps({ menuProps: { overflow: true } });

    expect(getMenu(wrapper).prop('overflow')).toBe(true);
  });

  it('passes min width', () => {
    const wrapper = mountUseStyles(
      <FilterMenu {...props} menuProps={{ minWidth: 400 }}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(getMenu(wrapper).prop('minWidth')).toBe(400);
  });
});
