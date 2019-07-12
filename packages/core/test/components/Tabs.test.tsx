import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Tabs from '../../src/components/Tabs';
import Tab from '../../src/components/Tabs/Tab';
import GradientScroller from '../../src/components/GradientScroller';

function unwrap(element: any): Enzyme.ShallowWrapper {
  // Dont use shallowWithStyles because of TrackingBoundary
  return unwrapHOCs(shallow(element), 'Tabs', {}, { render: true });
}

describe('<Tabs/>', () => {
  it('errors if a tab does not have a `key`', () => {
    expect(() =>
      unwrap(
        <Tabs>
          <Tab label="One" />
        </Tabs>,
      ),
    ).toThrowErrorMatchingSnapshot();
  });

  it('sets selected key state using `defaultKey`', () => {
    const wrapper = unwrap(
      <Tabs defaultKey="c">
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.state('selectedKey')).toBe('c');
  });

  it('sets selected key state using hash', () => {
    location.hash = '#tab=c';

    const wrapper = unwrap(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.state('selectedKey')).toBe('c');
  });

  it('doesnt set selected key state using hash if names dont match', () => {
    location.hash = '#othertab=c';

    const wrapper = unwrap(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.state('selectedKey')).toBe('');
  });

  it('passes selected key state to each tab', () => {
    const wrapper = unwrap(
      <Tabs defaultKey="b">
        <Tab key="a" label="One" />
        <Tab key="b" label="Two" />
        <Tab key="c" label="Three" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(0)
        .prop('selected'),
    ).toBe(false);
    expect(
      wrapper
        .find(Tab)
        .at(1)
        .prop('selected'),
    ).toBe(true);
    expect(
      wrapper
        .find(Tab)
        .at(2)
        .prop('selected'),
    ).toBe(false);
  });

  it('adds `keyName`s to tabs', () => {
    const wrapper = unwrap(
      <Tabs>
        <Tab key="a" label="One" />
        <Tab key="b" label="Two" />
        <Tab key="c" label="Three" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(0)
        .prop('keyName'),
    ).toBe('a');
    expect(
      wrapper
        .find(Tab)
        .at(1)
        .prop('keyName'),
    ).toBe('b');
    expect(
      wrapper
        .find(Tab)
        .at(2)
        .prop('keyName'),
    ).toBe('c');
  });

  it('it renders a nav', () => {
    const wrapper = unwrap(
      <Tabs>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('it renders a stretched nav', () => {
    const wrapper = unwrap(
      <Tabs stretched>
        <Tab key="a" label="One" />
        <Tab key="b" label="Two" />
        <Tab key="c" label="Three" />
      </Tabs>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('it renders a section when a tab is active and has children', () => {
    const wrapper = unwrap(
      <Tabs>
        <Tab key="a" label="Label">
          Foo
        </Tab>
      </Tabs>,
    );

    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find('section').text()).toBe('Foo');
  });

  it('doesnt render a section if the tab has no children', () => {
    const wrapper = unwrap(
      <Tabs>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.find('section')).toHaveLength(0);
  });

  it('handles falsey tabs', () => {
    const wrapper = unwrap(
      <Tabs>
        {false && <Tab key="a" label="One" />}
        {null && <Tab key="b" label="Two" />}
        <Tab key="c" label="Three" />
      </Tabs>,
    );

    expect(wrapper.find(Tab)).toHaveLength(1);
  });

  it('updates state index when `defaultKey` changes', () => {
    const wrapper = unwrap(
      <Tabs defaultKey="c">
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.state('selectedKey')).toBe('c');

    wrapper.setProps({
      defaultKey: 'b',
    });

    expect(wrapper.state('selectedKey')).toBe('b');
  });

  it('triggers `onChange` when clicking', () => {
    const spy = jest.fn();
    const wrapper = unwrap(
      <Tabs onChange={spy}>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    wrapper.find(Tab).simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('wraps in scroller when using `scrollable`', () => {
    const wrapper = unwrap(
      <Tabs scrollable>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.find(GradientScroller)).toHaveLength(1);
  });

  it('updated hash when tab is clicked', () => {
    location.hash = '#tab=a';

    const wrapper = unwrap(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="Label" />
        <Tab key="b" label="Label" />
        <Tab key="c" label="Label" />
      </Tabs>,
    );

    expect(wrapper.state('selectedKey')).toBe('a');

    wrapper
      .find(Tab)
      .at(2)
      .simulate('click', 'c');

    expect(wrapper.state('selectedKey')).toBe('c');
    expect(location.hash).toBe('#tab=c');
  });

  it('it passes the borderless prop to Tab children', () => {
    const wrapper = unwrap(
      <Tabs borderless>
        <Tab key="a" label="One" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(0)
        .prop('borderless'),
    ).toBe(true);
  });
});
