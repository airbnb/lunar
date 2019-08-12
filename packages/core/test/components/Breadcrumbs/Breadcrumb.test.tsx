import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Breadcrumb from '../../../src/components/Breadcrumbs/Breadcrumb';
import ButtonOrLink from '../../../src/components/private/ButtonOrLink';

describe('<Breadcrumb/>', () => {
  it('renders a button', () => {
    const wrapper = shallowWithStyles(<Breadcrumb onClick={() => {}} label="Breadcrumb" />)
      .find(ButtonOrLink)
      .dive();

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders a link', () => {
    const wrapper = shallowWithStyles(<Breadcrumb href="#foo" label="Breadcrumb" />)
      .find(ButtonOrLink)
      .dive();

    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('renders selected with `aria-current` attribute', () => {
    const wrapper = shallowWithStyles(
      <Breadcrumb selected onClick={() => {}} label="Breadcrumb" />,
    );

    expect(wrapper.find(ButtonOrLink).prop('aria-current')).toBe('page');
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <Breadcrumb disabled onClick={() => {}} label="Breadcrumb" />,
    );

    expect(wrapper.find(ButtonOrLink).prop('disabled')).toBeTruthy();
  });

  it('renders a passed id for tracking', () => {
    const wrapper = shallowWithStyles(
      <Breadcrumb id="tracking-breadcrump" onClick={() => {}} label="Breadcrumb" />,
    );

    expect(wrapper.find(ButtonOrLink).prop('id')).toBe('tracking-breadcrump');
  });

  it('renders an icon', () => {
    const wrapper = shallowWithStyles(<Breadcrumb onClick={() => {}} label="Breadcrumb" />);

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBeTruthy();
  });

  it('doesnt render an icon with `hideIcon`', () => {
    const wrapper = shallowWithStyles(
      <Breadcrumb hideIcon onClick={() => {}} label="Breadcrumb" />,
    );

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBeFalsy();
  });

  it('doesnt render children', () => {
    const child = <div>Foo</div>;
    const wrapper = shallowWithStyles(
      // @ts-ignore Allow invalid children
      <Breadcrumb label="Breadcrumb" onClick={() => {}}>
        {child}
      </Breadcrumb>,
    );

    expect(wrapper.contains(child)).toBe(false);
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<Breadcrumb label="Breadcrumb" onClick={spy} />);

    wrapper.findWhere(child => child.prop('onClick')).simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
