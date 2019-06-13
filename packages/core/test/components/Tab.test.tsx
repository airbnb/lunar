import React from 'react';
import { shallow } from 'enzyme';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import Tab from '../../src/components/Tabs/Tab';
import TrackingBoundary from '../../src/components/TrackingBoundary';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<Tab/>', () => {
  it('renders a button', () => {
    const wrapper = shallow(<Tab keyName="default" label="Tab" onClick={() => {}} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a before icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallow(
      <Tab keyName="default" label="Tab" onClick={() => {}} disabled beforeIcon={icon} />,
    ).dive();

    expect(wrapper.find(ButtonOrLink).prop('beforeIcon')).toBe(icon);
  });

  it('renders a after icon', () => {
    const icon = <IconCheck decorative />;
    const wrapper = shallow(
      <Tab keyName="default" label="Tab" onClick={() => {}} disabled afterIcon={icon} />,
    ).dive();

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBe(icon);
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
