import React from 'react';
import { shallow } from 'enzyme';
import Accordion from '../../src/components/Accordion';
import AccordionItem, { AccordionItemProps } from '../../src/components/Accordion/Item';
import proxyComponent from '../../src/utils/proxyComponent';

describe('<Accordion />', () => {
  it('does not error if a proxyComponent wrapping a AccordionItem is passed', () => {
    const ProxiedAccordionItem = proxyComponent(AccordionItem, (props: AccordionItemProps) => (
      <AccordionItem {...props} />
    ));

    expect(() =>
      shallow(
        <Accordion>
          <ProxiedAccordionItem title="Label" />
        </Accordion>,
      ),
    ).not.toThrow();
  });

  it('renders expected number of accordion items', () => {
    const wrapper = shallow(
      <Accordion defaultIndex={1}>
        <AccordionItem title="One" />
        <AccordionItem title="Two" />
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem)).toHaveLength(3);
  });

  it('renders bordered', () => {
    const wrapper = shallow(
      <Accordion bordered>
        <AccordionItem title="Label" />
      </Accordion>,
    );

    expect(wrapper.prop('className')).toMatch('container_bordered');
  });

  it('has accessibility role set', () => {
    const wrapper = shallow(
      <Accordion defaultIndex={2}>
        <AccordionItem title="One" />
        <AccordionItem title="Two" />
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.prop('role')).toBe('tablist');
  });

  it('sets expanded state to accordion item by index', () => {
    const wrapper = shallow(
      <Accordion defaultIndex={1}>
        <AccordionItem title="One" />
        <AccordionItem title="Two" />
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(false);

    expect(wrapper.find(AccordionItem).at(1).prop('expanded')).toBe(true);

    expect(wrapper.find(AccordionItem).at(2).prop('expanded')).toBe(false);
  });

  it('adds indices to items', () => {
    const wrapper = shallow(
      <Accordion>
        <AccordionItem title="One" />
        <AccordionItem title="Two" />
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem).at(0).prop('index')).toBe(0);

    expect(wrapper.find(AccordionItem).at(1).prop('index')).toBe(1);

    expect(wrapper.find(AccordionItem).at(2).prop('index')).toBe(2);
  });

  it('sets expanded state to false for all items if defaultIndex is negative', () => {
    const wrapper = shallow(
      <Accordion defaultIndex={-1}>
        <AccordionItem title="One" />
        <AccordionItem title="Two" />
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(false);

    expect(wrapper.find(AccordionItem).at(1).prop('expanded')).toBe(false);

    expect(wrapper.find(AccordionItem).at(2).prop('expanded')).toBe(false);
  });

  it('handles falsey items', () => {
    const wrapper = shallow(
      <Accordion>
        {false && <AccordionItem title="One" />}
        {null && <AccordionItem title="Two" />}
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem)).toHaveLength(1);
  });

  it('updates index when `handleClick` is triggered', () => {
    const wrapper = shallow(
      <Accordion defaultIndex={3}>
        <AccordionItem title="Label" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(false);

    wrapper.find(AccordionItem).at(0).prop('onClick')!(0);

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(true);
  });

  it('updates index to -1 when current index is clicked', () => {
    const wrapper = shallow(
      <Accordion defaultIndex={0}>
        <AccordionItem title="Label" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(true);

    wrapper.find(AccordionItem).at(0).prop('onClick')!(0);

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(false);
  });

  it('enables multiple items to be open when clicked', () => {
    const wrapper = shallow(
      <Accordion expandMultiple defaultIndex={-1}>
        <AccordionItem title="One" />
        <AccordionItem title="Two" />
        <AccordionItem title="Three" />
      </Accordion>,
    );

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(false);

    expect(wrapper.find(AccordionItem).at(1).prop('expanded')).toBe(false);

    expect(wrapper.find(AccordionItem).at(2).prop('expanded')).toBe(false);

    wrapper.find(AccordionItem).at(0).prop('onClick')!(0);

    expect(wrapper.find(AccordionItem).at(0).prop('expanded')).toBe(true);

    wrapper.find(AccordionItem).at(1).prop('onClick')!(1);

    expect(wrapper.find(AccordionItem).at(1).prop('expanded')).toBe(true);

    wrapper.find(AccordionItem).at(2).prop('onClick')!(2);

    expect(wrapper.find(AccordionItem).at(2).prop('expanded')).toBe(true);
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <Accordion onChange={spy}>
        <AccordionItem title="Label" />
        <AccordionItem title="Label" />
        <AccordionItem title="Label" />
      </Accordion>,
    );

    wrapper.find(AccordionItem).at(1).prop('onClick')!(1);

    expect(spy).toHaveBeenCalledWith(1);
  });
});
