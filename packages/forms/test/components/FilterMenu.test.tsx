import React from 'react';
import Enzyme from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Link from '@airbnb/lunar/lib/components/Link';
import Menu from '@airbnb/lunar/lib/components/Menu';
import Button from '@airbnb/lunar/lib/components/Button';
import Dropdown from '@airbnb/lunar/lib/components/Dropdown';
import T from '@airbnb/lunar/lib/components/Translate';
import FilterMenu, { Row } from '../../src/components/FilterMenu';

function openFilters(wrapper: Enzyme.ShallowWrapper) {
  wrapper
    .find(Button)
    .first()
    .simulate('Click');
}

describe('<FilterMenu />', () => {
  const props = {
    accessibilityLabel: 'label',
  };

  it('renders a button', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('renders a button with the currently active count', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(
      wrapper
        .find(Button)
        .find(T)
        .prop('phrase'),
    ).toBe('Open filters');

    wrapper.setProps({
      activeCount: 1,
    });

    expect(
      wrapper
        .find(Button)
        .find(T)
        .prop('phrase'),
    ).toBe('%{smartCount} Filter||||%{smartCount} Filters');
    expect(
      wrapper
        .find(Button)
        .find(T)
        .prop('smartCount'),
    ).toBe(1);
  });

  it('calls onShow when opened', () => {
    const onShow = jest.fn();
    const wrapper = shallowWithStyles(
      <FilterMenu {...props} onShow={onShow}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    wrapper.find(Button).simulate('click');

    expect(onShow).toHaveBeenCalled();
  });

  it('hides dropdown initially', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(false);
  });

  it('clicking outside hides dropdown', () => {
    const onHide = jest.fn();
    const wrapper = shallowWithStyles(
      <FilterMenu {...props} onHide={onHide}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    wrapper.find(Button).simulate('click');
    wrapper.find(Dropdown).simulate('clickOutside');

    expect(onHide).toHaveBeenCalled();
  });

  it('clicking outside does not hide dropdown if ignored', () => {
    const onHide = jest.fn();
    const wrapper = shallowWithStyles(
      <FilterMenu {...props} ignoreClickOutside onHide={onHide}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    wrapper.find(Button).simulate('click');
    wrapper.find(Dropdown).simulate('clickOutside');

    expect(onHide).not.toHaveBeenCalled();
  });

  it('clicking filters shows dropdown', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    wrapper.find(Button).simulate('click');

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(true);
    expect(wrapper.find(Dropdown)).toHaveLength(1);
  });

  it('clicking apply on a valid form closes the menu', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    wrapper
      .find(Link)
      .at(0)
      .simulate('click');

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(false);
  });

  it('clicking clear calls reset', () => {
    const onClear = jest.fn();
    const wrapper = shallowWithStyles(
      <FilterMenu {...props} onClear={onClear}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    wrapper
      .find(Link)
      .at(1)
      .simulate('click');

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('clicking clear closes the menu', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(true);

    wrapper
      .find(Link)
      .at(1)
      .simulate('click');

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(false);
  });

  it('clicking clear keeps the menu open when keepOpenOnClear is passed', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu keepOpenOnClear {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    openFilters(wrapper);

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(true);

    wrapper
      .find(Link)
      .at(1)
      .simulate('click');

    expect(
      wrapper
        .find('div')
        .at(1)
        .prop('aria-expanded'),
    ).toBe(true);
  });

  it('right-aligns by default', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(wrapper.find(Dropdown).prop('right')).toBe(0);
    expect(wrapper.find(Dropdown).prop('left')).toBeUndefined();
  });

  it('optionally aligns to the left', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props} dropdownProps={{ left: 0 }}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(wrapper.find(Dropdown).prop('left')).toBe(0);
    expect(wrapper.find(Dropdown).prop('right')).toBeUndefined();
  });

  it('optionally has visible overflow', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(wrapper.find(Menu).prop('overflow')).toBeUndefined();

    wrapper.setProps({ menuProps: { overflow: true } });

    expect(wrapper.find(Menu).prop('overflow')).toBe(true);
  });

  it('passes min width', () => {
    const wrapper = shallowWithStyles(
      <FilterMenu {...props} menuProps={{ minWidth: 400 }}>
        <Row>Foo</Row>
      </FilterMenu>,
    );

    expect(wrapper.find(Menu).prop('minWidth')).toBe(400);
  });

  describe('<Row />', () => {
    it('renders a row with spacious by default', () => {
      const wrapper = shallowWithStyles(<Row>Hello</Row>);

      expect(wrapper.prop('spacious')).toBe(true);
    });
  });
});
