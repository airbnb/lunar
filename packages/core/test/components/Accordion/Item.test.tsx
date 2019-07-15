import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import AccordionItem from '../../../src/components/Accordion/Item';

describe('<AccordionItem />', () => {
  it('renders a button', () => {
    const wrapper = shallowWithStyles(
      <AccordionItem id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders a section', () => {
    const wrapper = shallowWithStyles(
      <AccordionItem id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.find('section')).toHaveLength(1);
  });

  it('renders the title as a string', () => {
    const wrapper = shallowWithStyles(
      <AccordionItem id=".0" index={0} title="unique string" onClick={() => {}} />,
    );

    expect(wrapper.find('button').html()).toMatch('unique string');
  });

  it('renders the title as a component', () => {
    function CustomTitleComponent() {
      return null;
    }

    const wrapper = shallowWithStyles(
      <AccordionItem id=".0" index={0} title={<CustomTitleComponent />} onClick={() => {}} />,
    );

    expect(wrapper.find(CustomTitleComponent)).toHaveLength(1);
  });

  it('renders children', () => {
    const child = <div>Foo</div>;

    const wrapper = shallowWithStyles(
      <AccordionItem id=".0" index={0} title="Title" onClick={() => {}}>
        {child}
      </AccordionItem>,
    );

    expect(wrapper.contains(child)).toBe(true);
  });

  it('renders bordered', () => {
    const wrapper = shallowWithStyles(
      <AccordionItem bordered id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.prop('className')).toMatch('item_bordered');
  });

  it('renders expanded', () => {
    const wrapper = shallowWithStyles(
      <AccordionItem expanded id=".0" index={0} title="Title" onClick={() => {}} />,
    );

    expect(wrapper.find('section').prop('className')).toMatch('body_expanded');
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(
      <AccordionItem id=".0" index={1} title="Title" onClick={spy} />,
    );

    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledWith(1);
  });
});
