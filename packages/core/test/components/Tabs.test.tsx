import React from 'react';
import { act } from 'react-dom/test-utils';
import { mountUseStyles, mockResizeObserver } from '@airbnb/lunar-test-utils';
import Tabs from '../../src/components/Tabs';
import Tab from '../../src/components/Tabs/Tab';
import GradientScroller from '../../src/components/GradientScroller';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<Tabs/>', () => {
  let unmockObserver: () => void;

  beforeEach(() => {
    unmockObserver = mockResizeObserver();
  });

  afterEach(() => {
    unmockObserver();
  });

  it('sets selected key state using `defaultKey`', () => {
    const wrapper = mountUseStyles(
      <Tabs defaultKey="c">
        <Tab key="a" label="Label" />
        <Tab key="b" label="Label" />
        <Tab key="c" label="Label" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(2)
        .prop('selected'),
    ).toBe(true);
  });

  it('sets selected key state using hash', () => {
    location.hash = '#tab=c';

    const wrapper = mountUseStyles(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="Label" />
        <Tab key="b" label="Label" />
        <Tab key="c" label="Label" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(2)
        .prop('selected'),
    ).toBe(true);
  });

  it('doesnt set selected key state using hash if names dont match', () => {
    location.hash = '#othertab=c';

    const wrapper = mountUseStyles(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="Label" />
        <Tab key="b" label="Label" />
        <Tab key="c" label="Label" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(2)
        .prop('selected'),
    ).toBe(false);
  });

  it('passes selected key state to each tab', () => {
    const wrapper = mountUseStyles(
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
    const wrapper = mountUseStyles(
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

  it('renders a nav', () => {
    const wrapper = mountUseStyles(
      <Tabs>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('renders a stretched nav', () => {
    const wrapper = mountUseStyles(
      <Tabs stretched>
        <Tab key="a" label="One" />
        <Tab key="b" label="Two" />
        <Tab key="c" label="Three" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(0)
        .prop('stretched'),
    ).toBe(true);
  });

  it('renders a section when a tab is active and has children', () => {
    const wrapper = mountUseStyles(
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
    const wrapper = mountUseStyles(
      <Tabs>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.find('section')).toHaveLength(0);
  });

  it('handles falsey tabs', () => {
    const wrapper = mountUseStyles(
      <Tabs>
        {false && <Tab key="a" label="One" />}
        {null && <Tab key="b" label="Two" />}
        <Tab key="c" label="Three" />
      </Tabs>,
    );

    expect(wrapper.find(Tab)).toHaveLength(1);
  });

  it('triggers `onChange` when clicking', () => {
    const spy = jest.fn();
    const wrapper = mountUseStyles(
      <Tabs<'a' | 'b' | 'c'> onChange={spy}>
        <Tab key="a" label="Label" />
        <Tab key="b" label="Label" />
        <Tab key="c" label="Label" />
      </Tabs>,
    );

    wrapper
      .find(ButtonOrLink)
      .at(1)
      .simulate('click');

    expect(spy).toHaveBeenCalledWith('b');
  });

  it('wraps in scroller when using `scrollable`', () => {
    const wrapper = mountUseStyles(
      <Tabs scrollable>
        <Tab key="a" label="Label" />
      </Tabs>,
    );

    expect(wrapper.find(GradientScroller.WrappedComponent)).toHaveLength(1);
  });

  it('updated hash when tab is clicked', () => {
    location.hash = '#tab=a';

    const wrapper = mountUseStyles(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="Label" />
        <Tab key="b" label="Label" />
        <Tab key="c" label="Label" />
      </Tabs>,
    );

    wrapper
      .find(ButtonOrLink)
      .at(2)
      .simulate('click', 'c');

    expect(location.hash).toBe('#tab=c');
  });

  it('passes the borderless prop to Tab children', () => {
    const wrapper = mountUseStyles(
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

  it('passes the secondary prop to Tab children', () => {
    const wrapper = mountUseStyles(
      <Tabs secondary>
        <Tab key="a" label="One" />
      </Tabs>,
    );

    expect(
      wrapper
        .find(Tab)
        .at(0)
        .prop('secondary'),
    ).toBe(true);
  });

  it('persist with hash and back button.', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const rmSpy = jest.spyOn(window, 'removeEventListener');

    const wrapper = mountUseStyles(
      <Tabs persistWithHash="tab">
        <Tab key="a" label="One" />
        <Tab key="b" label="Two" />
      </Tabs>,
    );

    expect(addSpy).toHaveBeenCalledWith('popstate', expect.any(Function));

    wrapper
      .find(ButtonOrLink)
      .at(1)
      .simulate('click', 'b');

    expect(location.hash).toBe('#tab=b');

    // eslint-disable-next-line rut/no-act
    act(() => {
      location.hash = '#tab=a';
      window.dispatchEvent(new Event('popstate'));
    });

    wrapper.unmount();

    expect(rmSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
  });
});
