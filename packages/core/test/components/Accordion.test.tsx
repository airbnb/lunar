import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Accordion from '../../src/components/Accordion';
import AccordionItem, { Props as AccordionItemProps } from '../../src/components/Accordion/Item';
import proxyComponent from '../../src/utils/proxyComponent';

describe('<Accordion />', () => {
  it('does not error if a proxyComponent wrapping a AccordionItem is passed', () => {
    const ProxiedAccordionItem = proxyComponent(AccordionItem, (props: AccordionItemProps) => (
      <AccordionItem {...props} />
    ));

    expect(() =>
      shallowWithStyles(
        <Accordion>
          <ProxiedAccordionItem id="0" title="Label" />
        </Accordion>,
      ),
    ).not.toThrowError();
  });

  it('renders expected number of accordion items', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={1}>
        <AccordionItem id="0" title="One" />
        <AccordionItem id="1" title="Two" />
        <AccordionItem id="2" title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem)).toHaveLength(3);
  });

  it('renders bordered', () => {
    const wrapper = shallowWithStyles(
      <Accordion bordered>
        <AccordionItem id="0" title="Label" />
      </Accordion>,
    );

    // id is generated with uuid, need to manually set it for snapshots to match
    wrapper.setState({
      id: 0,
    });

    expect(wrapper.prop('className')).toMatch('container_bordered');
  });

  it('has accessibility role set', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={3}>
        <AccordionItem id="0" title="Label" />
      </Accordion>,
    );

    expect(wrapper.prop('role')).toBe('tablist');
  });

  it('sets index state using `defaultIndex`', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={3}>
        <AccordionItem id="0" title="Label" />
      </Accordion>,
    );

    expect(wrapper.state('index')).toBe(3);
  });

  it('sets expanded state to accordion item by index', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={1}>
        <AccordionItem id="0" title="One" />
        <AccordionItem id="1" title="Two" />
        <AccordionItem id="2" title="Three" />
      </Accordion>,
    );

    expect(
      wrapper
        .find(AccordionItem)
        .at(0)
        .prop('expanded'),
    ).toBe(false);

    expect(
      wrapper
        .find(AccordionItem)
        .at(1)
        .prop('expanded'),
    ).toBe(true);

    expect(
      wrapper
        .find(AccordionItem)
        .at(2)
        .prop('expanded'),
    ).toBe(false);
  });

  it('adds indices to items', () => {
    const wrapper = shallowWithStyles(
      <Accordion>
        <AccordionItem id="0" title="One" />
        <AccordionItem id="1" title="Two" />
        <AccordionItem id="2" title="Three" />
      </Accordion>,
    );

    expect(
      wrapper
        .find(AccordionItem)
        .at(0)
        .prop('index'),
    ).toBe(0);

    expect(
      wrapper
        .find(AccordionItem)
        .at(1)
        .prop('index'),
    ).toBe(1);

    expect(
      wrapper
        .find(AccordionItem)
        .at(2)
        .prop('index'),
    ).toBe(2);
  });

  it('sets expanded state to false for all items if defaultIndex is negative', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={-1}>
        <AccordionItem id="0" title="One" />
        <AccordionItem id="1" title="Two" />
        <AccordionItem id="2" title="Three" />
      </Accordion>,
    );

    expect(
      wrapper
        .find(AccordionItem)
        .at(0)
        .prop('expanded'),
    ).toBe(false);

    expect(
      wrapper
        .find(AccordionItem)
        .at(1)
        .prop('expanded'),
    ).toBe(false);

    expect(
      wrapper
        .find(AccordionItem)
        .at(2)
        .prop('expanded'),
    ).toBe(false);
  });

  it('handles falsey items', () => {
    const wrapper = shallowWithStyles(
      <Accordion>
        {false && <AccordionItem id="0" title="One" />}
        {null && <AccordionItem id="0" title="Two" />}
        <AccordionItem id="0" title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem)).toHaveLength(1);
  });

  it('updates state index when `defaultIndex` changes', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={3}>
        <AccordionItem id="0" title="Label" />
      </Accordion>,
    );

    expect(wrapper.state('index')).toBe(3);

    wrapper.setProps({
      defaultIndex: 1,
    });

    expect(wrapper.state('index')).toBe(1);
  });

  it('updates index when `handleClick` is triggered', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={3}>
        <AccordionItem id="0" title="Label" />
      </Accordion>,
    );

    expect(wrapper.state('index')).toBe(3);

    wrapper
      .find(AccordionItem)
      .at(0)
      .prop('onClick')!(0);

    expect(wrapper.state('index')).toBe(0);
  });

  it('updates index to -1 when current index is clicked', () => {
    const wrapper = shallowWithStyles(
      <Accordion defaultIndex={0}>
        <AccordionItem id="0" title="Label" />
      </Accordion>,
    );

    expect(wrapper.state('index')).toBe(0);

    wrapper
      .find(AccordionItem)
      .at(0)
      .prop('onClick')!(0);

    expect(wrapper.state('index')).toBe(-1);
  });
});
