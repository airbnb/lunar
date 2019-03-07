import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import AccordionItem from '../../../src/components/Accordion/Item';

function unwrap(element: any): Enzyme.ShallowWrapper {
  return unwrapHOCs(shallow(element), 'AccordionItem', {}, { render: true });
}

describe('<AccordionItem />', () => {
  it('renders a button', () => {
    const wrapper = unwrap(<AccordionItem id=".0" index={0} title="Title" onClick={() => {}} />);

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders a section', () => {
    const wrapper = unwrap(<AccordionItem id=".0" index={0} title="Title" onClick={() => {}} />);

    expect(wrapper.find('section')).toHaveLength(1);
  });

  it('renders children', () => {
    const child = <div>Foo</div>;

    const wrapper = unwrap(
      <AccordionItem id=".0" index={0} title="Title" onClick={() => {}}>
        {child}
      </AccordionItem>,
    );

    expect(wrapper.contains(child)).toBe(true);
  });

  it('renders bordered', () => {
    const wrapper = shallow(
      <AccordionItem bordered id=".0" index={0} title="Title" onClick={() => {}} />,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders expanded', () => {
    const wrapper = shallow(
      <AccordionItem expanded id=".0" index={0} title="Title" onClick={() => {}} />,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = unwrap(<AccordionItem id=".0" index={1} title="Title" onClick={spy} />);

    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledWith(1);
  });
});
