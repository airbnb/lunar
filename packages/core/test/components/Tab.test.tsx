import React from 'react';
import { shallow } from 'enzyme';
import Tab from '../../src/components/Tabs/Tab';
import TrackingBoundary from '../../src/components/TrackingBoundary';

describe('<Tab/>', () => {
  it('renders a button', () => {
    const wrapper = shallow(<Tab keyName="default" label="Tab" onClick={() => {}} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const wrapper = shallow(
      <Tab keyName="default" label="Tab" onClick={() => {}} disabled />,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders selected', () => {
    const wrapper = shallow(
      <Tab keyName="default" label="Tab" onClick={() => {}} selected />,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders stretched', () => {
    const wrapper = shallow(
      <Tab keyName="default" label="Tab" onClick={() => {}} stretched />,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('doesnt render children', () => {
    const child = <div>Foo</div>;
    const wrapper = shallow(
      <Tab keyName="default" label="Tab" onClick={() => {}}>
        {child}
      </Tab>,
    ).dive();

    expect(wrapper.contains(child)).toBe(false);
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Tab keyName="foo" label="Tab" onClick={spy} />).dive();
    wrapper.findWhere(child => child.prop('onClick')).simulate('click');

    expect(spy).toHaveBeenCalledWith('foo');
  });

  it('triggers `onSelected` when selected', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Tab keyName="foo" label="Tab" onClick={() => {}} onSelected={spy} />,
    ).dive();

    expect(spy).not.toHaveBeenCalled();

    wrapper.setProps({
      selected: true,
    });

    expect(spy).toHaveBeenCalledWith();
  });

  it('renders TrackingBoundary with formatted keyName', () => {
    const wrapper = shallow(<Tab keyName="fooName" label="Tab" />).dive();

    expect(wrapper.find(TrackingBoundary).prop('name')).toMatch(/FooName/);
  });

  it('defaults trackingName to Tab if keyName is blank', () => {
    const wrapper = shallow(<Tab label="Tab" />).dive();

    expect(wrapper.find(TrackingBoundary).prop('name')).toMatch('Tab');
  });
});
