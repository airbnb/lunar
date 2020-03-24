import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import Tab from '../../src/components/Tabs/Tab';
import TrackingBoundary from '../../src/components/TrackingBoundary';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<Tab/>', () => {
  it('renders a button', () => {
    const wrapper = mountUseStyles(<Tab keyName="default" label="Tab" onClick={() => {}} />);

    expect(wrapper.find('span').at(0).prop('className')).toBe('tab');
  });

  it('renders a before icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = mountUseStyles(
      <Tab disabled keyName="default" label="Tab" beforeIcon={icon} onClick={() => {}} />,
    );

    expect(wrapper.find(ButtonOrLink).prop('beforeIcon')).toBe(icon);
  });

  it('renders a after icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = mountUseStyles(
      <Tab disabled keyName="default" label="Tab" afterIcon={icon} onClick={() => {}} />,
    );

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBe(icon);
  });

  it('renders disabled', () => {
    const wrapper = mountUseStyles(
      <Tab disabled keyName="default" label="Tab" onClick={() => {}} />,
    );

    expect(wrapper.find('span').at(0).prop('className')).toMatch('tab_disabled');
  });

  it('renders secondary', () => {
    const wrapper = mountUseStyles(
      <Tab secondary keyName="default" label="Tab" onClick={() => {}} />,
    );

    const className = wrapper.find('span').at(0).prop('className');
    expect(className).toMatch('tab_secondary');
    expect(className).toMatch('tab_noBorder');
  });

  it('renders selected', () => {
    const wrapper = mountUseStyles(
      <Tab selected keyName="default" label="Tab" onClick={() => {}} />,
    );

    expect(wrapper.find('span').at(0).prop('className')).toMatch('tab_selected');
  });

  it('renders stretched', () => {
    const wrapper = mountUseStyles(
      <Tab stretched keyName="default" label="Tab" onClick={() => {}} />,
    );

    expect(wrapper.find('span').at(0).prop('className')).toMatch('tab_stretched');
  });

  it('doesnt render children', () => {
    const child = <div>Foo</div>;
    const wrapper = mountUseStyles(
      <Tab keyName="default" label="Tab" onClick={() => {}}>
        {child}
      </Tab>,
    );

    expect(wrapper.contains(child)).toBe(false);
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = mountUseStyles(<Tab keyName="foo" label="Tab" onClick={spy} />);

    wrapper.find(ButtonOrLink).at(0).simulate('click');

    expect(spy).toHaveBeenCalledWith('foo');
  });

  it('triggers `onSelected` when selected', () => {
    const spy = jest.fn();
    const wrapper = mountUseStyles(
      <Tab keyName="foo" label="Tab" onClick={() => {}} onSelected={spy} />,
    );

    expect(spy).not.toHaveBeenCalled();

    wrapper.setProps({
      selected: true,
    });

    expect(spy).toHaveBeenCalledWith();
  });

  it('renders TrackingBoundary with formatted keyName', () => {
    const wrapper = mountUseStyles(<Tab keyName="fooName" label="Tab" />);

    expect(wrapper.find(TrackingBoundary).prop('name')).toMatch(/FooName/);
  });

  it('defaults trackingName to Tab if keyName is blank', () => {
    const wrapper = mountUseStyles(<Tab label="Tab" />);

    expect(wrapper.find(TrackingBoundary).prop('name')).toMatch('Tab');
  });
});
