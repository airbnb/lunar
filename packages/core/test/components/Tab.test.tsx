import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import Tab from '../../src/components/Tabs/Tab';
import TrackingBoundary from '../../src/components/TrackingBoundary';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<Tab/>', () => {
  it('renders a button', () => {
    const wrapper = shallowWithStyles(<Tab keyName="default" label="Tab" onClick={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a before icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallowWithStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}} disabled beforeIcon={icon} />,
    );

    expect(wrapper.find(ButtonOrLink).prop('beforeIcon')).toBe(icon);
  });

  it('renders a after icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallowWithStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}} disabled afterIcon={icon} />,
    );

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBe(icon);
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}} disabled />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders selected', () => {
    const wrapper = shallowWithStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}} selected />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders stretched', () => {
    const wrapper = shallowWithStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}} stretched />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('doesnt render children', () => {
    const child = <div>Foo</div>;
    const wrapper = shallowWithStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}}>
        {child}
      </Tab>,
    );

    expect(wrapper.contains(child)).toBe(false);
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<Tab keyName="foo" label="Tab" onClick={spy} />);
    wrapper.findWhere(child => child.prop('onClick')).simulate('click');

    expect(spy).toHaveBeenCalledWith('foo');
  });

  it('triggers `onSelected` when selected', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(
      <Tab keyName="foo" label="Tab" onClick={() => {}} onSelected={spy} />,
    );

    expect(spy).not.toHaveBeenCalled();

    wrapper.setProps({
      selected: true,
    });

    expect(spy).toHaveBeenCalledWith();
  });

  it('renders TrackingBoundary with formatted keyName', () => {
    const wrapper = shallowWithStyles(<Tab keyName="fooName" label="Tab" />);

    expect(wrapper.find(TrackingBoundary).prop('name')).toMatch(/FooName/);
  });

  it('defaults trackingName to Tab if keyName is blank', () => {
    const wrapper = shallowWithStyles(<Tab label="Tab" />);

    expect(wrapper.find(TrackingBoundary).prop('name')).toMatch('Tab');
  });
});
